const mongoose = require("mongoose");

const bookingDataSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    teamName: {
      type: String,
      required: [true, "Team name is required"],
    },
    bookings: [
      {
        customerName: {
          type: String,
          required: [false],
        },
        date: {
          type: String,
          required: [false],
        },
        time: {
          type: String,
          required: [false],
        },
        server: {
          type: String,
          required: [false],
        },
        entryFee: {
          type: Number,
          required: [false],
        },
        winning: {
          type: Number,
          required: [false],
        },
        discription: {
          type: String,
          required: [false],
        },
        caster: {
          type: String,
          required: [false],
        },
        casterCost: {
          type: Number,
          required: [false],
        },
        production: {
          type: String,
          required: [false],
        },
        productionCost: {
          type: Number,
          required: [false],
        },
        paid: {
          type: Boolean,
          default: false, // Default is unpaid
        },
      },
    ],
  },
  { timestamps: true }
);

const bookingData = mongoose.model("bookingData", bookingDataSchema);

module.exports = bookingData;
