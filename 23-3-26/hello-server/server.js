const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON (good practice)
app.use(express.json());

// Root Route
app.get('/', (req, res) => {
  res.json({
    message: "Hello Server! 👋",
    description: "Welcome to my Node.js Assignment",
    date: new Date().toLocaleDateString()
  });
});

// Hello Route
app.get('/hello', (req, res) => {
  res.json({
    message: "Hello from the Server! 🚀",
    status: "success",
    timestamp: new Date().toISOString()
  });
});

// Greeting with Name
app.get('/hello/:name', (req, res) => {
  const name = req.params.name;
  res.json({
    message: `Hello, ${name}! Welcome to the Node Server 🌟`,
    greeting: `Nice to meet you, ${name}`,
    tip: "You can change the name in the URL"
  });
});

// About Route
app.get('/about', (req, res) => {
  res.json({
    message: "About Hello Server",
    assignment: "Hello Server - Node.js Routing Assignment",
    features: [
      "Different responses on different routes",
      "Dynamic route with parameters",
      "JSON formatted responses",
      "Clean and modern code"
    ],
    created: "March 2026"
  });
});

// Status Route
app.get('/status', (req, res) => {
  res.json({
    status: "Server is running perfectly ✅",
    uptime: "Online",
    port: PORT,
    message: "All routes are working smoothly"
  });
});

// POST Route Example
app.post('/echo', (req, res) => {
  const body = req.body;
  res.json({
    message: "Echo from server",
    you_sent: body,
    received_at: new Date().toISOString()
  });
});

// 404 Route - Must be at the end
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    message: "The route you are looking for doesn't exist",
    available_routes: [
      "/",
      "/hello",
      "/hello/:name",
      "/about",
      "/status",
      "/echo (POST)"
    ]
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Hello Server is running on http://localhost:${PORT}`);
  console.log(`Try these routes:`);
  console.log(`   → http://localhost:${PORT}/`);
  console.log(`   → http://localhost:${PORT}/hello`);
  console.log(`   → http://localhost:${PORT}/hello/Shivani`);
  console.log(`   → http://localhost:${PORT}/about`);
});