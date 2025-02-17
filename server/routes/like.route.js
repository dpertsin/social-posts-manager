/**
 * This file defines the routes for the like entity (CRUD operations)
 * @requires express
 * @requires like.controller
 * @requires auth.middleware
 * @exports router
 */
const express = require("express");
const {
  likeEntityController,
  unlikeEntityController,
  getLikedEntitiesController,
  clearLikedEntitiesController,
} = require("../controllers/like.controller");

const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

/* Default router: "/api/likes" */

/* POST to like a specific entity */
router.post("/:id", authMiddleware, likeEntityController);
/* DELETE to unlike a specific entity */
router.delete("/:id", authMiddleware, unlikeEntityController);
/* GET to get all the liked entities */
router.get("/", authMiddleware, getLikedEntitiesController);
/* DELETE to clear all liked entities */
router.delete("/", authMiddleware, clearLikedEntitiesController);

module.exports = router;
