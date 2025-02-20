/**
 * Like service to perform CRUD operations on Like collection in MongoDB
 * @requires Like
 * @requires Post
 * @exports likeEntity
 * @exports unlikeEntity
 * @exports getLikedEntities
 * @exports clearLikedEntities
 */
const Like = require("../models/like.model");
const Post = require("../models/post.model");

/**
 * Like an entity (Post, Comment, etc.) by a user if not already liked
 * @param {string} entityId - The ID of the entity to unlike, we get this from parameter in the URL (:id)
 * @param {string} entityType - The type of the entity to unlike, we get this from the req.body
 * @param {string} userId - The ID of the user unliking the entity, we get the user id from the auth.middleware
 * @returns {Promise<void>}
 */
const likeEntity = async (entityId, entityType, userId) => {
  const like = await Like.findOne({ entityId, entityType, userId }); // Check if the user has already liked the entity
  if (!like) {
    await Like.create({ entityId, entityType, userId });

    if (entityType === "Post") {
      await Post.findByIdAndUpdate(entityId, { $inc: { likesCount: 1 } }); // Increment the likesCount of the post
    }
    // Add similar logic for other entity types if needed
  }
};

/**
 * Unlike an entity (Post, Comment, etc.) by a user if already liked
 * @param {string} entityId - The ID of the entity to unlike, we get this from parameter in the URL (:id)
 * @param {string} entityType - The type of the entity to unlike, we get this from the req.body
 * @param {string} userId - The ID of the user unliking the entity, we get the user id from the auth.middleware
 * @returns {Promise<void>}
 */
const unlikeEntity = async (entityId, entityType, userId) => {
  const like = await Like.findOneAndDelete({ entityId, entityType, userId });
  if (like && entityType === "Post") {
    await Post.findByIdAndUpdate(entityId, { $inc: { likesCount: -1 } }); // Decrement the likesCount of the post
  }
  // Add similar logic for other entity types if needed
};

/**
 * Get all liked entities of a particular type by a user
 * @param {string} userId - The ID of the user to get liked entities
 * @param {string} entityType - The type of the entity to get liked entities
 * @returns {Promise<Post[]|Comment[]|...>} - A promise that resolves to an array of Post or Comment or ... objects
 */
const getLikedEntities = async (userId, entityType) => {
  const likes = await Like.find({ userId, entityType });
  const entityIds = likes.map((like) => like.entityId);
  if (entityType === "Post") {
    const posts = await Post.find({ _id: { $in: entityIds } })
      .populate("userId", "username createdAt")
      .sort({ createdAt: -1 });
    return posts;
  }
  // Add similar logic for other entity types if needed
};

/**
 * Clear all liked entities of a particular type by a user
 * @param {string} userId - The ID of the user to clear liked entities
 * @param {string} entityType - The type of the entity to clear liked entities
 * @returns {Promise<void>}
 */
const clearLikedEntities = async (userId, entityType) => {
  const likes = await Like.find({ userId, entityType });
  for (const like of likes) {
    await unlikeEntity(like.entityId, entityType, userId);
  }
};

/**
 * Export the like service functions
 */
module.exports = {
  likeEntity,
  unlikeEntity,
  getLikedEntities,
  clearLikedEntities,
};
