require("dotenv").config();
const express = require("express");
const dbConnect = require("../src/utils/dbConnect");
const parkRoutes = require("./routes/SignIn/ParkSignIn_Routes");
const cors = require("cors");

dbConnect();
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());

// //Error handling, don't return stack trace to user, log in console.
app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send("Something went wrong, internal server error.");
});

app.use("/api/park", parkRoutes);

app.get("/api", (req, res) => {
  res.send({ message: "api root" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
