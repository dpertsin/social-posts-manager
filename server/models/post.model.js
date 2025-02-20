/**
 * Model for Post collection in MongoDB database using Mongoose ODM
 * @description Defines the structure of documents in the Post collection in MongoDB
 * @requires mongoose
 * @exports Post
 */
const mongoose = require("mongoose");

/**
 * Post schema to define the structure of documents in the Post collection in MongoDB
 */
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // to track createdAt and updatedAt
  }
);

/**
 * Post model to perform CRUD operations on Post collection in MongoDB
 */
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
