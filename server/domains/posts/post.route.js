var express = require("express");
const {
  populateSamplePosts,
  addPost,
  listPosts,
} = require("./post.controller");

const authMiddleware = require("../../common/middlewares/auth.middleware");

const router = express.Router();

/* Default router: "/api/posts" */
router.post("/populate", authMiddleware, populateSamplePosts);
router.post("/", authMiddleware, addPost);
router.get("/", listPosts);

module.exports = router;
