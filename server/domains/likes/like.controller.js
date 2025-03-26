/**
 * Controllers for like-related endpoints
 */
const likeService = require("./like.service");

/**
 * Like an entity
 */
const likeEntityController = async (req, res) => {
  try {
    await likeService.likeEntity(
      req.params.id,
      req.body.entityType,
      req.user.id
    );
    res.status(200).json({ message: "💖 Liked successfully" });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

/**
 * Unlike an entity
 */
const unlikeEntityController = async (req, res) => {
  try {
    await likeService.unlikeEntity(
      req.params.id,
      req.body.entityType,
      req.user.id
    );
    res.status(200).json({ message: "💔 Unliked successfully" });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

/**
 * Get liked entities by a user
 */
const getLikedEntitiesController = async (req, res) => {
  try {
    const entities = await likeService.getLikedEntities(
      req.user.id,
      req.query.entityType
    ); // req.query.entityType is the entity type from the URL (?entityType=)
    res.status(200).json(entities);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

/**
 * Clear all liked entities by a user of a particular type
 */
const clearLikedEntitiesController = async (req, res) => {
  try {
    await likeService.clearLikedEntities(req.user.id, req.body.entityType);
    res.status(200).json({
      message: `All liked ${req.body.entityType}s cleared. 🧹💨`,
    });
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
