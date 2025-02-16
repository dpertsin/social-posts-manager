/**
 * Post service to perform CRUD operations on Post collection in MongoDB 
 * @requires axios
 * @requires Post 
 * @exports fetchSamplePosts 
 * @exports createPost
 * @exports getPosts
 */
const axios = require('axios');
const Post = require('../models/post.model');

/**
 * Fetch sample posts from JSONPlaceholder and populate the database
 */
const fetchSamplePosts = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  const samplePosts = response.data.slice(0, 100);
  await Post.insertMany(samplePosts);
};

/**
 * Create a new post
 * @param {Object} postData
 * @returns {Promise<Post>} A promise that resolves to a Post object
 */
const createPost = async (postData) => {
  const post = new Post(postData);
  await post.save();
  return post;
};

/**
 * Get all posts
 * @returns {Promise<Post[]>} A promise that resolves to an array of Post objects
 */
const getPosts = async () => {
  return await Post.find();
};

module.exports = {
  fetchSamplePosts,
  createPost,
  getPosts
};