/**
 * Post controller to handle requests related to posts
 * @requires services/post.service
 * @exports populateSamplePosts
 * @exports addPost
 * @exports listPosts
 */
const {
  createPost,
  fetchSamplePosts,
  getPosts,
} = require("../services/post.service");

/**
 * Populate 100 sample posts by fetching data from JSONPlaceholder
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - Response object
 */
const populateSamplePosts = async (req, res) => {
  try {
    const userId = req.user.id; // the user ID is stored in req.user by the auth middleware
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    await fetchSamplePosts(userId);
    res.status(201).json({ message: "💯 Sample posts populated" });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

/**
 * Add a post to the database
 * @description This function creates a new post in the database
 * @example /api/posts
 * @param {string} req.body.title - The title of the post
 * @param {string} req.body.body - The body of the post
 * @param {string} req.user.id - The ID of the user creating the post
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - Response object
 */
const addPost = async (req, res) => {
  try {
    const { title, body } = req.body;
    const userId = req.user.id; // the user ID is stored in req.user by the auth middleware
    if (!title || !body) {
      return res.status(400).json({ error: "Title and body are required." });
    }
    const post = await createPost({ title, body, userId });
    res.status(201).json(post);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

/**
 * List posts with limit
 * @param {Object} req - Request object
 * @param {number} req.query.limit - Number of posts to return (default: 30)
 * @param {Object} res - Response object
 * @returns {Object} Response containing posts and metadata
 */
const listPosts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 30;

    // Get posts with limit and metadata
    const { posts, hasMore, total } = await getPosts(limit);

    res.status(200).json({
      posts,
      metadata: {
        hasMore,
        total,
        limit,
      },
    });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

/**
 * Export controllers to be used in routes
 */
module.exports = {
  populateSamplePosts,
  addPost,
  listPosts,
};
