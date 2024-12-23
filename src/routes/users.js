const express = require("express");
const router = express.Router();
const { User } = require("../models"); // Assuming your Sequelize models are in the models directory

// GET /users - Return all users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll(); // Fetch all users from the database
    res.status(200).json(users); // Respond with the user data
  } catch (error) {
    next(error); // Pass errors to the error-handling middleware
  }
});

module.exports = router;