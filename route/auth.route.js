const express = require("express");
const router = express.Router();
const { register, login, getCurrentUser } = require("../controllers/auth.controller.js");
const authMiddleware = require("../middleware/auth.middleware.js");

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/me", authMiddleware, getCurrentUser);

module.exports = router;