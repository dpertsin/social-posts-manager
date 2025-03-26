/**
 * Repository for Post entity - handles all database operations
 */
const Post = require("../models/post.model");

class PostRepository {
  /**
   * Create a new post
   */
  async create(postData) {
    const post = new Post(postData);
    return post.save();
  }

  /**
   * Insert multiple posts at once
   */
  async insertMany(postsData) {
    return Post.insertMany(postsData);
  }

  /**
   * Find posts with pagination
   */
  async findWithPagination(limit = 30) {
    return Post.find({})
      .populate("userId", "username createdAt")
      .sort({ createdAt: -1 })
      .limit(limit);
  }

  /**
   * Count all posts
   */
  async countDocuments() {
    return Post.countDocuments();
  }

  /**
   * Find a post by ID
   */
  async findById(postId) {
    return Post.findById(postId).populate("userId", "username createdAt");
  }

  /**
   * Delete a post
   */
  async deleteById(postId) {
    return Post.findByIdAndDelete(postId);
  }

  /**
   * Update post
   */
  async updateById(postId, updateData) {
    return Post.findByIdAndUpdate(postId, updateData, { new: true });
  }
}

module.exports = new PostRepository();