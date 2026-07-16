const http = require("http");
 
const PORT = 3000;
 
const routes = {
  "/": "Hello, World! Welcome to the Home Page 🏠",
  "/about": "About Us: We are learning Node.js servers! 📖",
  "/contact": "Contact Us: reach us at hello@example.com 📬",
  "/greet": "Hey there! Greetings from the server 👋",
};
 
const server = http.createServer((req, res) => {
  const url = req.url;
 
  if (routes[url]) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(routes[url]);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 - Page Not Found ❌");
  }
});
 
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log("Available routes:");
  Object.keys(routes).forEach((route) => {
    console.log(`  http://localhost:${PORT}${route}`);
  });
});