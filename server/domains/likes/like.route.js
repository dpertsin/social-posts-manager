const express = require("express");
const {
  likeEntityController,
  unlikeEntityController,
  getLikedEntitiesController,
  clearLikedEntitiesController,
} = require("./like.controller");

const authMiddleware = require("../../common/middlewares/auth.middleware");

const router = express.Router();

/* Default router: "/api/likes" */
router.post("/:id", authMiddleware, likeEntityController);
router.delete("/:id", authMiddleware, unlikeEntityController);
router.get("/", authMiddleware, getLikedEntitiesController);
router.delete("/", authMiddleware, clearLikedEntitiesController);

module.exports = router;
