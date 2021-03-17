const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;

const connectString = `mongodb+srv://${MONGO_URI}@dc-park.gjun0.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

const dbConnect = async () => {
  try {
    const db = await mongoose.connect(connectString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (db) {
      console.log("Connected to DB");
    }
  } catch (error) {
    console.log(error, "error connecting db");
  }
};

module.exports = dbConnect;
