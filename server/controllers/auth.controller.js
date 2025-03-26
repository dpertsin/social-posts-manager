/**
 * Auth controller
 */
const authService = require("../services/auth.service");

/**
 * Register a new user
 */
const register = async (req, res) => {
  try {
    const { user, token } = await authService.registerUser(req.body);
    res.status(201).json({
      message: "🙋🏻‍♂️ User registered successfully",
      user: {
        _id: user._id,
        username: user.username,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      token,
    });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

/**
 * Login a user
 */
const login = async (req, res) => {
  try {
    const { user, token } = await authService.loginUser(req.body);
    res.status(200).json({
      message: "🔓 User logged in successfully",
      user: {
        _id: user._id,
        username: user.username,
      },
      token,
    });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

/**
 * Delete test user and all associated data
 */
const cleanupTestUser = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    await authService.removeTestUser(username);
    res.status(200).json({
      message: `Test user ${username} and all associated data deleted`,
    });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  cleanupTestUser,
};