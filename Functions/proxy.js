export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  let originalUrl = searchParams.get('url');
  if (!originalUrl) {
    return new Response('URL parameter is missing', { status: 400 });
  }

  if (!/^https?:\/\//i.test(originalUrl)) {
    originalUrl = 'http://' + originalUrl;
  }

  // Fetch the blacklist from a remote text file
  let blockedDomains = [];
  try {
    const response = await fetch('https://raw.githubusercontent.com/MinitorMHS/Logo/main/blacklist.txt');
    if (response.ok) {
      const blacklistContent = await response.text();
      blockedDomains = blacklistContent.split('\n').filter(domain => domain.trim() !== '');
    } else {
      console.error('Error fetching blacklist:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching blacklist:', error);
  }
  
  const requestedDomain = new URL(originalUrl).hostname;
  if (blockedDomains.includes(requestedDomain)) {
    return new Response('This domain is not allowed to be proxied', { status: 403 });
  }

  const filename = originalUrl.split('/').pop();
  const encodedData = btoa(JSON.stringify({ url: originalUrl, filename: filename }));

  // Check the hostname and modify the links
  let proxiedUrl;
  let watchUrl;
  if (url.hostname === 'dl.fastgozar.space') {
    proxiedUrl = `https://edge05.66065.ir.cdn.ir/download?data=${encodedData}`;
    watchUrl = `https://edge05.66065.ir.cdn.ir/watch?data=${encodedData}`;
  } else {
    proxiedUrl = `${url.origin}/download?data=${encodedData}`;
    watchUrl = `${url.origin}/watch?data=${encodedData}`;
  }

  return new Response(`
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; margin: 0; background-color: #a9a9a9; }
          .container { background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); text-align: center; margin-bottom: 20px; }
          h1 { color: #333; }
          #downloadLink, #watchLink { word-break: break-all; color: #007bff; margin-bottom: 30px; }
          .button-container { display: flex; flex-direction: column; gap: 10px; margin-top: 20px; }
          .button { padding: 20px 40px; color: white; border: none; border-radius: 20px; cursor: pointer; text-decoration: none; font-size: 18px; width: 200px; }
          .download-button { background-color: #228b22; }
          .download-button:hover { background-color: #1e7b1e; }
          .watch-button { background-color: #4682b4; }
          .watch-button:hover { background-color: #3b6a8a; }
          .filename { font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Watch</h1>
          <p id="watchLink">${watchUrl}</p>
          <a href="${watchUrl}" class="button watch-button">Watch</a>
        </div>
        <div class="container">
          <h1>Download</h1>
          <p id="downloadLink">${proxiedUrl}</p>
          <a href="${proxiedUrl}" class="button download-button">Download</a>
        </div>
        <p class="filename">Filename: ${filename}</p>
      </body>
    </html>
  `, { headers: { 'Content-Type': 'text/html' } });
}
