require("dotenv").config();
const mongoose = require("mongoose");

// const URL = "mongodb://localhost:27017/mern_admin";
// mongoose.connect(URL);

const URL = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log("Successfully Connected to Database!");
  } catch (error) {
    console.error("Database Connection Failed!");
    process.exit(0);
  }
};

module.exports = connectDB;
