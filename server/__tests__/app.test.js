/**
 * Integration test for the server to check if it is running 
 * @requires supertest
 * @requires app
 */
const request = require("supertest");
const app = require("../app");

describe("Server is running", () => {
  it("should return 200 OK", (done) => {
    request(app).get("/").expect(200, done);
  });
});
