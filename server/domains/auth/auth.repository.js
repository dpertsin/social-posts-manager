/**
 * Auth repository - handles all database operations related to authentication
 */
const User = require("./user.model");
const Like = require("../likes/like.model");
const Post = require("../posts/post.model");

class AuthRepository {
  /**
   * Find a user by username
   */
  async findByUsername(username) {
    return User.findOne({ username });
  }

  /**
   * Create a new user
   */
  async createUser(userData) {
    const user = new User(userData);
    return user.save();
  }

  /**
   * Remove a test user and all associated data
   */
  async removeTestUserAndData(username) {
    // Find the user first
    const user = await User.findOne({ username });
    if (!user) {
      return null;
    }

    // Get user id for cleanup
    const userId = user._id;

    // Delete all user's posts
    await Post.deleteMany({ userId });

    // Delete all user's likes
    await Like.deleteMany({ userId });

    // Delete the user
    await User.deleteOne({ _id: userId });

    return { success: true, userId };
  }
}

module.exports = new AuthRepository();
