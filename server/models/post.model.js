/**
 * Model for Post collection in MongoDB database using Mongoose ODM
 * @requires mongoose
 * @exports Post
 */
const mongoose = require("mongoose");

/**
 * Post schema to define the structure of documents in the Post collection in MongoDB
 */
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

/**
 * Post model to perform CRUD operations on Post collection in MongoDB
 */
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
