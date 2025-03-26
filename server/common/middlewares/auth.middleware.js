/**
 * Middleware to verify JWT authentication tokens
 */
const jwt = require("jsonwebtoken");

/**
 * Verifies the JWT token from Authorization header
 * Adds the decoded user info to req.user when valid
 */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ error: "🙅 Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // {"id":"67b24177469c6e13a1ea1baa","iat":1739735658,"exp":1739908458}
    req.user = decoded; // Add user to request object
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token." });
  }
};

module.exports = authMiddleware;
