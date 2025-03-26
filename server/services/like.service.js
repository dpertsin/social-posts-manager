/**
 * Like service - contains business logic for like-related operations
 */
const likeRepository = require("../repositories/like.repository");

class LikeService {
  /**
   * Like an entity if not already liked
   */
  async likeEntity(entityId, entityType, userId) {
    // Check if already liked before creating
    const existingLike = await likeRepository.findOne(
      entityId,
      entityType,
      userId
    );

    if (!existingLike) {
      await likeRepository.create(entityId, entityType, userId);

      // Only update counts for Post entities
      if (entityType === "Post") {
        await likeRepository.incrementLikeCount(entityId);
      }
    }
  }

  /**
   * Unlike an entity (Post, Comment, etc.) if already liked
   */
  async unlikeEntity(entityId, entityType, userId) {
    const deletedLike = await likeRepository.delete(
      entityId,
      entityType,
      userId
    );

    // Only update counts for Post entities if like existed
    if (deletedLike && entityType === "Post") {
      await likeRepository.decrementLikeCount(entityId);
    }
    // Add similar logic for other entity types if needed
  }

  /**
   * Get all liked entities of a specific type
   */
  async getLikedEntities(userId, entityType) {
    // Get likes and transform to entity IDs
    const likes = await likeRepository.findByUserAndType(userId, entityType);
    const entityIds = likes.map((like) => like.entityId);

    // Handle different entity types
    if (entityType === "Post") {
      return likeRepository.findPostsByIds(entityIds);
    }

    return [];
  }

  /**
   * Clear all liked entities of a specific type
   */
  async clearLikedEntities(userId, entityType) {
    // Get all likes and unlike each one
    const likes = await likeRepository.findByUserAndType(userId, entityType);

    // Process each like individually to ensure proper count updates
    const unlikePromises = likes.map((like) =>
      this.unlikeEntity(like.entityId, entityType, userId)
    );

    await Promise.all(unlikePromises);
  }
}

module.exports = new LikeService();
