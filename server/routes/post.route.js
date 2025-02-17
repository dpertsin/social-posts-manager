/**
 * This file defines the routes for the post entity (CRUD operations)
 * @requires express
 * @requires post.controller
 * @exports router
 */
var express = require("express");
const {
  populateSamplePosts,
  addPost,
  listPosts,
} = require("../controllers/post.controller");

const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

/* Default router: "/api/posts" */

/* POST  to populate 100 sample posts */
router.post("/populate", populateSamplePosts);
/* POST to add a new post */
router.post("/", authMiddleware, addPost);
/* GET to get all the posts */
router.get("/", listPosts);

module.exports = router;
