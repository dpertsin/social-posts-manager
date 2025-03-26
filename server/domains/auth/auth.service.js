/**
 * Auth service - contains business logic for authentication
 */
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authRepository = require("./auth.repository");
const User = require("./user.model");

/**
 * Register a new user
 */
const registerUser = async (userData) => {
  const { username, password } = userData;

  // Check if username exists
  const existingUser = await authRepository.findByUsername(username);
  if (existingUser) {
    const error = new Error("🤔 Username already exists");
    error.status = 400;
    throw error;
  }

  // Validate password
  if (password.length < 6) {
    const error = new Error("🔐 Password should be at least 6 characters long");
    error.status = 400;
    throw error;
  }

  // Create user through repository
  const user = await authRepository.createUser(userData);

  // Generate JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "48h",
  });

  return { user, token };
};

/**
 * Login a user
 */
const loginUser = async (userData) => {
  const { username, password } = userData;

  // Validate input
  if (!username || !password) {
    const error = new Error("🙅 Username and password are required");
    error.status = 400;
    throw error;
  }

  // Get user through repository
  const user = await authRepository.findByUsername(username);
  if (!user) {
    const error = new Error("❓ Username doesn't exist");
    error.status = 400;
    throw error;
  }

  // Compare password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    const error = new Error("❌ Invalid password");
    error.status = 400;
    throw error;
  }

  // Generate JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "48h",
  });

  return { user, token };
};

/**
 * Remove test user and all associated data
 */
const removeTestUser = async (username) => {
  const result = await authRepository.removeTestUserAndData(username);

  if (!result) {
    const error = new Error("❓ Username doesn't exist");
    error.status = 400;
    throw error;
  }

  return result;
};

module.exports = {
  registerUser,
  loginUser,
  removeTestUser,
};
