const express = require("express");
const app = express();

const taskRoutes = require("./routes/taskRoutes");

// Middleware
app.use(express.json());

// Routes
app.use("/tasks", taskRoutes);

// Default route
app.get("/", (req, res) => {
    res.send("Task API is running...");
});

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});