export async function onRequest(context) {
  return new Response(`
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Web Proxy</title>
        <meta name="description" content="This website helps you encode and fasten your download links.">
        <meta property="og:title" content="نیم بها کننده لینک">
        <meta property="og:description" content="با کمک این وب سایت لینک های دانلود خود را نیم بها کنید">
        <meta property="og:url" content="https://iminitor.ir">
        <meta property="og:type" content="website">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');
          body { 
            font-family: 'Roboto', sans-serif; 
            display: flex; 
            flex-direction: column; 
            justify-content: flex-start; 
            align-items: center; 
            height: 100vh; 
            margin: 0; 
            background-color: #ffecd2; 
            background-image: linear-gradient(to right, #ffecd2, #fcb69f);
          }
          .about {
            margin: 20px 0;
            padding: 20px;
            background-color: white;
            border-radius: 16px;
            box-shadow: 0 0 20px rgba(0,0,0,0.2);
            text-align: center;
            width: 80%;
          }
          .github-star {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
          }
          .github-star a {
            display: flex;
            align-items: center;
            text-decoration: none;
            color: inherit;
          }
          .github-star img {
            margin-right: 8px;
            width: 32px; /* Increased size */
            height: 32px; /* Increased size */
          }
          .star-button {
            background-color: #24292e; /* Reverted to black */
            color: white;
            border: none;
            border-radius: 8px;
            padding: 5px 10px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            display: flex;
            align-items: center;
            margin-left: 20px; /* Added space */
          }
          .star-button img {
            margin-right: 5px;
            width: 20px; /* Default size */
            height: 20px; /* Default size */
          }
          .star-button:hover {
            background-color: #444d56;
          }
          form { 
            background-color: white; 
            padding: 20px; 
            border-radius: 16px; 
            box-shadow: 0 0 20px rgba(0,0,0,0.2); 
            display: flex; 
            align-items: center;
            margin-top: 20px; /* Added space */
          }
          input[type="text"] { 
            width: 300px; 
            padding: 10px; 
            margin-right: 10px; 
            border: 1px solid #ddd; 
            border-radius: 8px; 
            padding-left: 40px; 
            background: url('https://upload.wikimedia.org/wikipedia/commons/6/6b/Internet_Icon.png') no-repeat 10px center;
            background-size: 20px 20px;
          }
          button { 
            padding: 10px 20px; 
            background-color: #007bff; 
            color: white; 
            border: none; 
            border-radius: 8px; 
            cursor: pointer; 
            transition: background-color 0.3s ease, transform 0.3s ease;
          }
          button:hover { 
            background-color: #0056b3; 
            transform: scale(1.05);
          }
          .contact-buttons {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 20px;
          }
          .contact-button, .telegram-button {
            width: 200px; /* Ensuring same size */
            margin: 5px 0;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px;
            border-radius: 8px;
            text-decoration: none;
            transition: background-color 0.3s ease, transform 0.3s ease;
          }
          .contact-button {
            background-color: #a9a9a9; /* Darker gray for email */
            color: black;
          }
          .contact-button:hover {
            background-color: #808080;
            transform: scale(1.05);
          }
          .telegram-button {
            background-color: #333; /* Dark gray for Telegram */
            color: white;
          }
          .telegram-button:hover {
            background-color: #555;
            transform: scale(1.05);
          }
          .contact-button img, .telegram-button img {
            margin-right: 5px;
            width: 20px; /* Default size */
            height: 20px; /* Default size */
          }
          .bottom-center {
            position: absolute;
            bottom: 8px;
            left: 50%;
            font-size: 18px;
            transform: translate(-50%, -50%);
            text-align: center;
          }
          .icon {
            width: 24px; /* Increased size */
            height: 24px; /* Increased size */
            vertical-align: middle;
          }
          footer {
            position: fixed; /* Changed to fixed */
            bottom: 0;
            width: 100%;
            text-align: center;
            padding: 10px;
            background-color: rgba(0, 0, 0, 0.1);
            border-top: 1px solid #ddd;
          }
          @media (max-width: 600px) {
            form {
              flex-direction: column;
            }
            input[type="text"] {
              width: 100%;
              margin-bottom: 10px;
            }
            button {
              width: 100%;
            }
          }
        </style>
      </head>
      <body>
        <div class="about">
          <h2>About</h2>
          <p>This website helps you encode and fasten your download links</p>
        </div>
        <div class="github-star">
          <a href="https://github.com/MinitorMHS/CF_web_proxy">
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="GitHub Icon" class="icon">
          </a>
          <button class="star-button" onclick="window.open('https://github.com/MinitorMHS/CF_Web_Proxy/stargazers')">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Plain_Yellow_Star.png" alt="Star Icon" class="icon"> Give a Star
          </button>
        </div>
        <form action="/proxy" method="get">
          <input type="text" name="url" placeholder="Enter URL" required aria-label="Enter URL">
          <button type="submit">Go</button>
        </form>
        <div class="contact-buttons">
          <a href="mailto:me@minitor.eu.org" class="contact-button"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/200px-Gmail_icon_%282020%29.svg.png" alt="Gmail Icon"> Email Me for <b>&nbsp;DMCA</b></a>
          <a href="https://t.me/Minitor" class="telegram-button"><img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" alt="Telegram Icon"> Contact me on Telegram</a>
        </div>
        <footer>
          <p> 2024 CF Web Proxy. All rights reserved.</p>
        </footer>
      </body>
    </html>
  `, { headers: { 'Content-Type': 'text/html' } });
}
