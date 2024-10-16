const express = require("express");
const router = express.Router();

const { register, login, refresh,loginStudent } = require("../controllers/authController");

// Base route, can be removed if unnecessary
router.post("/", async (req, res) => {
    res.sendStatus(400); // Bad Request
});

// Register route
router.post("/register", register);

// Login route
router.post("/login", login);

// Refresh token route
router.post("/refresh", refresh);
 // Login Student route
router.post("/student/login", loginStudent);

module.exports = router;
