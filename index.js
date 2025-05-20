const express = require("express");
const mongoose = require("mongoose");

const bookingRoute = require("../back/route/bookingData.route.js");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use("/api/bookingData", bookingRoute);

// POST /api/teams

const mongoURI =
  "mongodb+srv://smiththapa57:7PfsAZuXyV1Qu0Lp@cluster0.znpbift.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Successfully connected  to MongoDB");
  })
  .catch((err) => {
    console.error("Connection error:", err.message);
    // Optionally: process.exit(1) to crash the app if  DB is essential
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
