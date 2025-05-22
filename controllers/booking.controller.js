const bookingData = require("../models/booking.model.js");

const createTeam = async (req, res) => {
  try {
    const { teamName } = req.body;

    // Check if team already exists
    const existing = await bookingData.findOne({
      teamName: { $regex: new RegExp(`^${teamName}$`, "i") },
    });

    if (existing) {
      return res.status(400).json({ message: "Team already exists" });
    }

    const newTeam = await bookingData.create(req.body);
    res.status(200).json(newTeam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findTeams = async (req, res) => {
  try {
    const teams = await bookingData.find(req.body);
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTeam = async (req, res) => {
  try {
    const { teamName } = req.params;

    const deletedTeam = await bookingData.findOneAndDelete({
      teamName: { $regex: new RegExp(`^${teamName}$`, "i") },
    });

    if (!deletedTeam) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.status(200).json({ message: "Team deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTeam = async (req, res) => {
  try {
    const { teamName } = req.params;

    const updatedTeam = await bookingData.findOneAndUpdate(
      { teamName: { $regex: new RegExp(`^${teamName}$`, "i") } },
      req.body,
      { new: true }
    );

    if (!updatedTeam) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.status(200).json(updatedTeam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addBookingToTeam = async (req, res) => {
  try {
    const { teamName } = req.params;
    const newBooking = req.body;
    const team = await bookingData.findOne({
      teamName: { $regex: new RegExp(`^${teamName.trim()}$`, "i") },
    });

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    // Check for duplicate booking based on date
    const isDuplicate = team.bookings.some(
      (booking) =>
        booking.date === newBooking.date && booking.time === newBooking.time
    );

    if (isDuplicate) {
      return res.status(400).json({
        message: `Booking for date ${newBooking.date} already exists.`,
      });
    }

    // Add the new booking
    team.bookings.push(newBooking);
    await team.save();

    res.status(200).json({ message: "Booking added successfully", team });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBookingInTeam = async (req, res) => {
  try {
    const { teamName, bookingIndex } = req.params;
    const updatedBooking = req.body;

    const team = await bookingData.findOne({
      teamName: { $regex: new RegExp(`^${teamName}$`, "i") },
    });
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    if (
      bookingIndex < 0 ||
      bookingIndex >= team.bookings.length ||
      isNaN(bookingIndex)
    ) {
      return res.status(400).json({ message: "Invalid booking index" });
    }

    // Update the booking at bookingIndex
    team.bookings[bookingIndex] = {
      ...team.bookings[bookingIndex]._doc,
      ...updatedBooking,
    };

    await team.save();

    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBookingFromTeam = async (req, res) => {
  try {
    const { teamName, bookingIndex } = req.params;

    const team = await bookingData.findOne({
      teamName: { $regex: new RegExp(`^${teamName}$`, "i") },
    });
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    if (
      bookingIndex < 0 ||
      bookingIndex >= team.bookings.length ||
      isNaN(bookingIndex)
    ) {
      return res.status(400).json({ message: "Invalid booking index" });
    }

    // Remove the booking at bookingIndex
    team.bookings.splice(bookingIndex, 1);

    await team.save();

    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTeam,
  findTeams,
  deleteTeam,
  updateTeam,
  addBookingToTeam,
  updateBookingInTeam,
  deleteBookingFromTeam,
};
