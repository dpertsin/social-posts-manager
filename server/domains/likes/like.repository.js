/**
 * Repository for Like entity - handles all database operations
 */
const Like = require("./like.model");
const Post = require("../posts/post.model");

class LikeRepository {
  async findOne(entityId, entityType, userId) {
    return Like.findOne({ entityId, entityType, userId });
  }

  async create(entityId, entityType, userId) {
    return Like.create({ entityId, entityType, userId });
  }

  async delete(entityId, entityType, userId) {
    return Like.findOneAndDelete({ entityId, entityType, userId });
  }

  async findByUserAndType(userId, entityType) {
    return Like.find({ userId, entityType });
  }

  async incrementLikeCount(entityId) {
    return Post.findByIdAndUpdate(entityId, { $inc: { likesCount: 1 } });
  }

  async decrementLikeCount(entityId) {
    return Post.findByIdAndUpdate(entityId, { $inc: { likesCount: -1 } });
  }

  async findPostsByIds(entityIds) {
    return Post.find({ _id: { $in: entityIds } })
      .populate("userId", "username createdAt")
      .sort({ createdAt: -1 });
  }
}

module.exports = new LikeRepository();
