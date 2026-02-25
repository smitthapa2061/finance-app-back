const express = require("express");
const {
  createTeam,
  findTeams,
  deleteTeam,
  updateTeam,
  addBookingToTeam,
  updateBookingInTeam,
  deleteBookingFromTeam,
} = require("../controllers/booking.controller.js");

const authMiddleware = require("../middleware/auth.middleware.js");

const router = express.Router();

// All booking routes require authentication
router.post("/", authMiddleware, createTeam);
router.get("/", authMiddleware, findTeams);
router.delete("/:teamName", authMiddleware, deleteTeam);
router.put("/:teamName", authMiddleware, updateTeam);
router.post("/:teamName/bookings", authMiddleware, addBookingToTeam);
router.put("/:teamName/bookings/:bookingIndex", authMiddleware, updateBookingInTeam);
router.delete("/:teamName/bookings/:bookingIndex", authMiddleware, deleteBookingFromTeam);

module.exports = router;
