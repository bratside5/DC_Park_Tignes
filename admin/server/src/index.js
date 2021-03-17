require("dotenv").config();

const path = require("path");
const express = require("express");
const dbConnect = require("../src/utils/dbConnect");
const cors = require("cors");

const parkRoutes = require("./routes/ParkData/ParkDataRoutes");

dbConnect();
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/park", parkRoutes);

// //Error handling, don't return stack trace to user, log in console.
app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send("Something went wrong, internal server error.");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
