/**
 * Model for Like collection in MongoDB database using Mongoose ODM
 * @description Defines the structure of documents in the Like collection in MongoDB
 * @requires mongoose
 * @exports Like
 */
const mongoose = require("mongoose");

/**
 * Like schema to define the structure of documents in the Like collection in MongoDB
 */
const likeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectID,
      ref: "User",
      required: true,
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectID,
      required: true,
    },
    entityType: {
      type: String,
      required: true,
      enum: ["Post", "Comment"], // Add more entity types as needed, we only need Post here but we can add more in the future like Comment, Ads etc.
    },
  },
  {
    timestamps: true, // to track createdAt and updatedAt
  }
);

/**
 * Like model to perform CRUD operations on Like collection in MongoDB
 */
const Like = mongoose.model("Like", likeSchema);

module.exports = Like;