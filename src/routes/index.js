const express = require("express");
const router = express.Router();
const userRoutes = require("./users"); // Import the users route

// Mount the user routes on /users
router.use("/users", userRoutes);

// Example route
router.get("/public", (req, res) => {
  res.json({ message: "Hello, world!" });
});

// Example route that throws an error
router.get("/error", (req, res) => {
  throw new Error("Test error");
});

module.exports = router;