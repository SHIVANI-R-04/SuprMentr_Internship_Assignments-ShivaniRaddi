const express = require("express");
const app = express();

const taskRoutes = require("./routes/taskRoutes");

// Middleware
app.use(express.json());

// Routes - Changed for MVC assignment
app.use("/tasksmvc", taskRoutes);

// Default route
app.get("/", (req, res) => {
    res.send("Task API is running - MVC Structure");
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});