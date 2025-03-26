/**
 * Post controller to handle HTTP requests related to posts
 */
const postService = require("../services/post.service");

/**
 * Populate 100 sample posts by fetching data from JSONPlaceholder
 */
const populateSamplePosts = async (req, res) => {
  try {
    const userId = req.user.id; // the user ID is stored in req.user by the auth middleware
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    await postService.fetchSamplePosts(userId);
    res.status(201).json({ message: "💯 Sample posts populated" });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

/**
 * Create a new post
 */
const addPost = async (req, res) => {
  try {
    const { title, body } = req.body;
    const userId = req.user.id;

    if (!title || !body) {
      return res.status(400).json({ error: "Title and body are required." });
    }

    const post = await postService.createPost({ title, body, userId });
    res.status(201).json(post);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

/**
 * List posts with pagination
 */
const listPosts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 30;
    const result = await postService.getPosts(limit);

    res.status(200).json({
      posts: result.posts,
      metadata: result.metadata,
    });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

module.exports = {
  populateSamplePosts,
  addPost,
  listPosts,
};
