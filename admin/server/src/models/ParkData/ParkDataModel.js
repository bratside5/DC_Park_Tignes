const mongoose = require("mongoose");

const schemaParkSignIn = mongoose.Schema(
  {
    first_name: { type: String, required: true },
    second_name: { type: String, required: true },
    email: { type: String, required: false },
    instagram: { type: String, required: false },
    isRegistered: { type: String, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("ParkSignIn", schemaParkSignIn);
