/**
 * Model for User collection in MongoDB database using Mongoose ODM
 * @description Defines the structure of documents in the User collection in MongoDB and hashes the password before saving the user to the database
 * @requires mongoose
 * @requires bcrypt
 * @exports User
 */
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // to track createdAt and updatedAt
  }
);

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
  /* If a user updates their profile (e.g., username or email), this prevents rehashing the already hashed password. */
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

/**
 * User model to perform CRUD operations on User collection in MongoDB
 */
const User = mongoose.model("User", userSchema);

module.exports = User;
