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
    await fetchSamplePosts();
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
    const post = await createPost(req.body);
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
