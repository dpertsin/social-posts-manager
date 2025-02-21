/**
 * Post service to perform CRUD operations on Post collection in MongoDB
 * @requires axios
 * @requires Post
 * @exports fetchSamplePosts
 * @exports createPost
 * @exports getPosts
 */
const axios = require("axios");
const Post = require("../models/post.model");

/**
 * Fetch sample posts from JSONPlaceholder and populate the database
 */
const fetchSamplePosts = async (userRealId) => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const samplePosts = response.data
    .slice(0, 100)
    .map(({ id, userId, ...rest }) => ({
      ...rest,
      userId: userRealId,
    })); // Remove id field and keep other properties

  /* console.log("Sample posts:", JSON.stringify(samplePosts, null, 2)); */
  await Post.insertMany(samplePosts);
};

/**
 * Create a new post
 * @param {string} post.title - The title of the post
 * @param {string} post.body - The body of the post
 * @param {string} post.userId - The ID of the user creating the post
 * @returns {Promise<Post>} A promise that resolves to a Post object
 */
const createPost = async ({ title, body, userId }) => {
  const post = new Post({ title, body, userId });
  await post.save();
  return post;
};

/**
 * Get all posts with limit
 * @param {number} limit - Number of posts to return (default: 30)
 * @returns {Promise<Post[]>} A promise that resolves to an array of Post objects
 */
const getPosts = async (limit = 30) => {
  // Find all posts, sort by newest first, limit results, and populate user data
  const posts = await Post.find()
    .sort({ createdAt: -1 }) // Sort by newest posts first
    .limit(limit) // Limit number of returned posts
    .populate("userId", "username"); // Include from the userId only the username

  // Get total count of posts for "Load More" button visibility
  const total = await Post.countDocuments();

  return {
    posts,
    hasMore: total > posts.length, // Check if there are more posts to load
    total,
  };
};

module.exports = {
  fetchSamplePosts,
  createPost,
  getPosts,
};
