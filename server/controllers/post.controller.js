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
    const userId = req.user.id // the user ID is stored in req.user by the auth middleware
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
 * List all posts from the database
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - Response object
 */
const listPosts = async (req, res) => {
  try {
    const posts = await getPosts();
    res.status(200).json(posts);
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
