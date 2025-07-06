const express = require("express");
const mongoose = require("mongoose");

const bookingRoute = require("./route/bookingData.route.js");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(express.json());
app.use(cors());

app.use("/api/bookingData", bookingRoute);

// POST /api/teams

const mongoURI =
  "mongodb+srv://smith:smiththapa121@cluster0.8gt3ica.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Successfully connected  to MongoDB");
  })
  .catch((err) => {
    console.error("Connection error:", err.message);
    // Optionally: process.exit(1) to crash the app if  DB is essential
  });
