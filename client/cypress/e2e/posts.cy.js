describe("Social Posts Manager Flow", () => {
  const username = `cytestuser${Math.floor(Math.random() * 10000)}`;
  const password = "password123";

  beforeEach(() => {
    // Clear any existing session data
    cy.clearLocalStorage();
    cy.visit("http://localhost:5173/");
  });

  it("should register, create posts, like posts and remove like", () => {
    // Register new user
    cy.get('[data-testid="register-link"]').click();
    cy.url().should("include", "/register");
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should("eq", "http://localhost:5173/");

    // Create first post
    cy.get('input[name="title"]').type("Test Post 1");
    cy.get('textarea[name="body"]').type("This is test post 1");
    cy.get('button[type="submit"]').click();
    cy.contains("Test Post 1").should("be.visible");

    // Create second post
    cy.get('input[name="title"]').clear().type("Test Post 2");
    cy.get('textarea[name="body"]').clear().type("This is test post 2");
    cy.get('button[type="submit"]').click();
    cy.contains("Test Post 2").should("be.visible");

    // Like both posts
    cy.get('[data-testid="like-button"]').first().click();
    cy.get('[data-testid="like-button"]').last().click();

    // Go to liked posts page
    cy.get('[data-testid="liked-page-link"]').click();
    cy.url().should("include", "/liked-posts");
    cy.get('[data-testid="post-card"]').should("have.length", 2);

    // Unlike one post
    cy.get('[data-testid="like-button"]').first().click();
    cy.reload();
    cy.get('[data-testid="post-card"]').should("have.length", 1);
  });

  after(() => {
    // Clean up - delete the test user
    cy.request("DELETE", "http://localhost:3000/api/auth/cleanup", {
      username,
    });
  });
});
