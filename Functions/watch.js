export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const encodedData = searchParams.get('data');

  if (!encodedData) {
    return new Response('Data parameter is missing', { status: 400 });
  }

  try {
    const { url: decodedUrl } = JSON.parse(atob(encodedData));
    const response = await fetch(decodedUrl, { headers: request.headers });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const newHeaders = new Headers(response.headers);
    const contentType = newHeaders.get('Content-Type');

    if (response.headers.get('Set-Cookie')) {
      newHeaders.append('Set-Cookie', response.headers.get('Set-Cookie'));
    }

    if (contentType && contentType.includes('text/html')) {
      const originalText = await response.text();
      const proxiedText = originalText
        .replace(/(href|src|action)="([^"]*)"/g, (match, p1, p2) => {
          if (p2.startsWith('http') || p2.startsWith('//')) {
            return `${p1}="/proxy/${encodeURIComponent(btoa(p2))}"`;
          } else {
            const newUrl = new URL(p2, decodedUrl).href;
            return `${p1}="/watch?data=${encodeURIComponent(btoa(JSON.stringify({ url: newUrl })))}"`;
          }
        })
        .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gi, (match, p1) => {
          return `<script>${p1.replace(/document\.location/g, 'window.location')}</script>`;
        });

      return new Response(proxiedText, {
        status: 200,
        headers: newHeaders,
      });
    } else {
      return new Response(response.body, {
        status: response.status,
        headers: newHeaders,
      });
    }
  } catch (error) {
    return new Response(`Error: ${error.message}`, { status: 400 });
  }
}
