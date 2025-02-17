/**
 * Integration tests for the Post API endpoints
 * @requires supertest
 * @requires app
 * @requires postService
 */
const request = require("supertest");
const app = require("../app");
const postService = require("../services/post.service");

/**
 * Mocking the post service to avoid making actual API calls
 */
jest.mock("../services/post.service");
// TODO: Maybe trasnfer the POST APIs to __mocks__ and do the tests there: https://jestjs.io/docs/manual-mocks
// TODO: When I finish the project, then connect the tests with the actual database, and test the actual database operations.
describe("Post API", () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods
    postService.fetchSamplePosts.mockClear();
    postService.createPost.mockClear();
    postService.getPosts.mockClear();
  });

  it("POST /api/posts/populate --> should populate 100 sample posts by fetching data from JSONPlaceholder", () => {
    postService.fetchSamplePosts.mockResolvedValue(); // Useful to mock async functions in async tests
    return request(app)
      .post("/api/posts/populate")
      .expect("Content-Type", /json/)
      .expect(201)
      .then((response) => {
        // expect(response.body.length).toBe(100);
        // response.body.forEach((post) => {
        //   expect(post).toEqual(
        //     expect.objectContaining({
        //       id: expect.any(Number),
        //       title: expect.any(String),
        //       body: expect.any(String),
        //       userId: expect.any(Number),
        //     })
        //   );
        // });
        expect(postService.fetchSamplePosts).toHaveBeenCalledTimes(1);
        expect(response.body.message).toBe("💯 Sample posts populated");
      });
  });

  it("POST /api/posts --> should not create a new post because the user isn't authenticated", () => {
    const newPost = { title: "Test Post", body: "This is a test post" };
    postService.createPost.mockResolvedValue(newPost);

    return request(app)
      .post("/api/posts")
      .send(newPost)
      .expect("Content-Type", /json/)
      .expect(401);
  });

  it("GET /api/posts --> should return all posts", () => {
    const samplePosts = [
      {
        _id: "67b0e075043cf084ab2471ca",
        title: "Test Post 1",
        body: "This is a test post 1",
        __v: 0,
      },
      {
        _id: "67b0e075043cf084ab2471cb",
        title: "Test Post 2",
        body: "This is a test post 2",
        __v: 0,
      },
    ];
    postService.getPosts.mockResolvedValue(samplePosts);

    return request(app)
      .get("/api/posts")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              _id: expect.any(String),
              title: expect.any(String),
              body: expect.any(String),
              __v: expect.any(Number),
            }),
          ])
        );
      });
  });
});
