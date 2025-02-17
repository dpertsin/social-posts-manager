/**
 * Auth controller
 * @requires services/auth.service
 * @exports register
 * @exports login
 */
const { registerUser, loginUser } = require("../services/auth.service");

/**
 * Register a new user
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - Response object
 */
const register = async (req, res) => {
  try {
    const { user, token } = await registerUser(req.body);
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
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - Response object
 */
const login = async (req, res) => {
  try {
    const { user, token } = await loginUser(req.body);
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
 * Export controllers to be used in routes
 */
module.exports = {
  register,
  login,
};
