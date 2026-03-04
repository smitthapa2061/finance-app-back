const express = require("express");
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
const mongoose = require("mongoose");
require("dotenv").config();
const bookingRoute = require("./route/bookingData.route.js");
const authRoute = require("./route/auth.route.js");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(express.json());
app.use(cors());

// Auth routes (public)
app.use("/api/auth", authRoute);

// Booking routes
app.use("/api/bookingData", bookingRoute);

// MongoDB Connection - Using standard mongodb protocol with explicit options
// to avoid DNS SRV lookup issues
const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI, {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.error("Connection error:", err.message);
    console.error("Full error:", err);  
  });
