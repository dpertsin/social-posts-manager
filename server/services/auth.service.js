/**
 * Auth service
 * @requires jsonwebtoken
 * @requires bcrypt
 * @requires models/user.model
 * @exports registerUser
 * @exports loginUser
 */
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

/**
 * Register a new user
 * @param {Object} userData - User data
 * @returns {Object} - Registered user
 */
const registerUser = async (userData) => {
  const { username, password } = userData;
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new Error("🤔 Username already exists");
  }
  if (password.length < 6) {
    throw new Error("🔐 Password should be at least 6 characters long");
  }
  const user = new User(userData);
  await user.save();
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "48h",
  });
  return { user, token };
};

/**
 * Login a user
 * @param {Object} userData - User data
 * @returns {String} - JWT token
 */
const loginUser = async (userData) => {
  const { username, password } = userData;
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("🙅 Invalid username or password");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("🙅 Invalid username or password");
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "48h",
  });
  return { user, token };
};

/**
 * Export services to be used in controllers
 */
module.exports = {
  registerUser,
  loginUser,
};
