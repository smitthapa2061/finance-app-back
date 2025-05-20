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

const router = express.Router();

router.post("/", createTeam);
router.get("/", findTeams);
router.delete("/:teamName", deleteTeam);
router.put("/:teamName", updateTeam);
router.post("/:teamName/bookings", addBookingToTeam);
router.put("/:teamName/bookings/:bookingIndex", updateBookingInTeam);
router.delete("/:teamName/bookings/:bookingIndex", deleteBookingFromTeam);

module.exports = router;
