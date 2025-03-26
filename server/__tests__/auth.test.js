const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../domains/auth/user.model");
const Post = require("../domains/posts/post.model");

describe("🔏 User Authentication and Authorization Access", () => {
  let token; // Store the token to use it for Authorization header in valid requests
  let postId; // Store the post ID to delete it in the end

  const newUser = {
    username: "testuser",
    password: "password123",
  };

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await User.deleteMany({ username: "testuser" });
    await Post.deleteMany({ _id: postId });
    await mongoose.connection.close();
  });

  it("should register a new user", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send(newUser)
      .expect(201);

    expect(response.body.user).toHaveProperty("username", "testuser");
    expect(response.body).toHaveProperty("token");
  });

  it("should login a user", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send(newUser)
      .expect(200);

    expect(response.body).toHaveProperty("token");
    token = response.body.token; // Store the token to use it for Authorization header in valid requests
  });

  it("POST /api/posts --> should create a new post when the user is authenticated", () => {
    const newPost = { title: "Test Post", body: "This is a test post" };

    return request(app)
      .post("/api/posts")
      .set("Authorization", `Bearer ${token}`)
      .send(newPost)
      .expect("Content-Type", /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            title: expect.any(String),
            body: expect.any(String),
          })
        );
        postId = response.body._id; // Store the post ID to delete it in the end
      });
  });
});
