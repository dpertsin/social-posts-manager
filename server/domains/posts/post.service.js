/**
 * Post service - handles all business logic
 */
const axios = require("axios");
const postRepository = require("./post.repository");

class PostService {
  /**
   * Fetch sample posts from JSONPlaceholder and populate the database
   */
  async fetchSamplePosts(userRealId) {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );

    const samplePosts = response.data
      .slice(0, 100)
      .map(({ id, userId, ...rest }) => ({
        ...rest,
        userId: userRealId,
      })); // Remove id field and keep other properties

    // Database operation delegated to repository
    return postRepository.insertMany(samplePosts);
  }

  /**
   * Create a new post
   */
  async createPost({ title, body, userId }) {
    // Business logic can be added here (validation, formatting, etc.)
    return postRepository.create({ title, body, userId });
  }


  /**
   * Get all posts with limit
   */
  async getPosts(limit = 30) {
    // Limit and metadata handling
    const posts = await postRepository.findWithPagination(limit);
    const total = await postRepository.countDocuments();

    // Determine if more posts are available
    return {
      posts,
      metadata: {
        hasMore: total > posts.length,
        total,
      },
    };
  }
}

module.exports = new PostService();