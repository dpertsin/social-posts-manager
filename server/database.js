/**
 * Connect to MongoDB database using Mongoose ODM
 * @requires mongoose
 * @exports connectDB
 */
const mongoose = require("mongoose");

/**
 * Connect to MongoDB database
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    if (process.env.NODE_ENV !== 'test') {
      console.log("🍃 MongoDB connected");
    }
  } catch (error) {
    console.error("📛 MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
