const logger = require('../config/logger');

exports.getUsers = async (req, res, next) => {
  try {
    logger.info('Fetching all users');
    
    // Simulate data retrieval
    const users = [
      { id: 1, name: "Shivani", city: "Hubballi" },
      { id: 2, name: "Rahul", city: "Bangalore" }
    ];

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    next(error);   // Pass to error handler
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    logger.info(`Fetching user with id: ${id}`);

    if (id === '999') {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    res.json({
      success: true,
      data: { id, name: `User ${id}`, message: "User retrieved successfully" }
    });
  } catch (error) {
    next(error);
  }
};