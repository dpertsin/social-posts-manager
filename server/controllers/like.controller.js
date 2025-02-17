/**
 * Like controller to handle requests related to likes
 * @description This module is responsible for handling like/unlike requests.
 * @requires services/like.service
 * @exports likeEntityController
 * @exports unlikeEntityController
 * @exports getLikedEntitiesController
 * @exports clearLikedEntitiesController
 */
const {
  likeEntity,
  unlikeEntity,
  getLikedEntities,
  clearLikedEntities,
} = require("../services/like.service");

/**
 * Like an entity
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - Response object
 */
const likeEntityController = async (req, res) => {
  try {
    await likeEntity(req.params.id, req.body.entityType, req.user.id); // req.params.id is the entity id from the URL (:id)
    res.status(200).json({ message: "💖 Liked successfully" });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

/**
 * Unlike an entity
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - Response object
 */
const unlikeEntityController = async (req, res) => {
  try {
    await unlikeEntity(req.params.id, req.body.entityType, req.user.id);
    res.status(200).json({ message: "💔 Unliked successfully" });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

/**
 * Get liked entities by a user
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - Response object
 */
const getLikedEntitiesController = async (req, res) => {
  try {
    const entities = await getLikedEntities(req.user.id, req.query.entityType); // req.query.entityType is the entity type from the URL (?entityType=)
    res.status(200).json(entities);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

/**
 * Clear all liked entities by a user of a particular type
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - Response object
 */
const clearLikedEntitiesController = async (req, res) => {
  try {
    await clearLikedEntities(req.user.id, req.body.entityType);
    res
      .status(200)
      .json({ message: `All liked ${req.body.entityType}s cleared. 🧹💨` });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

/**
 * Export controllers to be used in routes
 */
module.exports = {
  likeEntityController,
  unlikeEntityController,
  getLikedEntitiesController,
  clearLikedEntitiesController,
};
