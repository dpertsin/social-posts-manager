/**
 * Model for Post collection in MongoDB database using Mongoose ODM
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

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
