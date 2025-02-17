const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Like = require("../models/like.model");
const Post = require("../models/post.model");
const User = require("../models/user.model");

/*
TODO: I don't like that I have to create and delete a test user here and in auth tests, so I have to refactor them, combine them somehow.
*/
describe("💌 Like Routes Testing", () => {
  let token;
  let postId;
  let userId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);

    // Create a user and get the token
    const userResponse = await request(app)
      .post("/api/auth/register")
      .send({ username: "testuser", password: "password123" });
    token = userResponse.body.token;
    userId = userResponse.body.user._id;

    // Create a post
    const postResponse = await request(app)
      .post("/api/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Post", body: "This is a test post" });
    postId = postResponse.body._id;
  });

  afterAll(async () => {
    await User.deleteMany({ username: "testuser" });
    await Post.deleteMany({ _id: postId });
    await Like.deleteMany({ userId });
    await mongoose.connection.close();
  });

  it("should like a post", async () => {
    const response = await request(app)
      .post(`/api/likes/${postId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ entityType: "Post" })
      .expect(200);

    expect(response.body.message).toBe("💖 Liked successfully");

    const post = await Post.findById(postId);
    expect(post.likesCount).toBe(1);
  });

  it("should unlike a post", async () => {
    const response = await request(app)
      .delete(`/api/likes/${postId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ entityType: "Post" })
      .expect(200);

    expect(response.body.message).toBe("💔 Unliked successfully");

    const post = await Post.findById(postId);
    expect(post.likesCount).toBe(0);
  });

  it("should get all liked posts", async () => {
    // Like the post again
    await request(app)
      .post(`/api/likes/${postId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ entityType: "Post" });

    const response = await request(app)
      .get("/api/likes")
      .set("Authorization", `Bearer ${token}`)
      .query({ entityType: "Post" })
      .expect(200);
  });

  it("should clear all liked posts", async () => {
    const response = await request(app)
      .delete("/api/likes")
      .set("Authorization", `Bearer ${token}`)
      .send({ entityType: "Post" })
      .expect(200);

    expect(response.body.message).toBe("All liked Posts cleared. 🧹💨");

    const post = await Post.findById(postId);
    expect(post.likesCount).toBe(0);
  });
});
