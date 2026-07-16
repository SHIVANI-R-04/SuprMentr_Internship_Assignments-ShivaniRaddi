require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const logger = require('./config/logger');
const errorHandler = require('./middleware/errorHandler');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(morgan('combined'));   // HTTP request logging

// Routes
app.use('/api/users', userRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({
    message: "✅ Folder Architect API is running",
    architecture: "MVC + Error Handling + Winston Logging",
    assignment: "Folder Architect"
  });
});

// Global Error Handler (Must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`Server started on port ${PORT}`);
  console.log(`Logs are saved in /logs folder`);
});