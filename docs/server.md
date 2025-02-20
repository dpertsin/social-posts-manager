# Backend Documentation

## Table of Contents

- [Overview of Design Decisions](#overview-of-design-decisions)
- [API Documentation](#api-documentation)
  - [User Registration & Authentication](#user-registration--authentication)
    - [Register a New User](#register-a-new-user)
    - [Login a User](#login-a-user)
  - [Posts Management](#posts-management)
    - [Populate Sample Posts](#populate-sample-posts)
    - [Create a New Post](#create-a-new-post)
    - [Get All Posts](#get-all-posts)
  - [Post Interaction](#post-interaction)
    - [Like a Post](#like-a-post)
    - [Unlike a Post](#unlike-a-post)
    - [Get All Liked Posts](#get-all-liked-posts)
    - [Clear All Liked Posts](#clear-all-liked-posts)
- [Authentication Practices](#authentication-practices)
- [Why did I choose to have the likes in new model and not inside the Post model?](#why-did-i-choose-to-have-the-likes-in-new-model-and-not-inside-the-post-model)
- [Areas for Improvements](#areas-for-improvements)

## Overview of Design Decisions

The backend of the Social Posts Manager application is built using Express.js, a minimal and flexible Node.js web application framework. The following design decisions were made to ensure a robust, scalable, and maintainable backend:

1. **MVC Pattern**: The backend follows the Model-View-Controller (MVC) pattern to separate concerns and improve code organization. Models handle data, controllers and services handle business logic, and routes handle HTTP requests.

2. **MongoDB with Mongoose**: MongoDB is used as the database, and Mongoose is used as the Object Data Modeling (ODM) library to interact with MongoDB. This combination provides a flexible schema and powerful query capabilities.

3. **JWT Authentication**: JSON Web Tokens (JWT) are used for authentication. JWTs are signed with a secret key and have an expiration time to ensure secure and stateless authentication.

4. **Middleware**: Middleware functions are used to handle common tasks such as logging, parsing JSON bodies, handling CORS, and verifying authentication tokens.

5. **Environment Variables**: Sensitive information such as database connection strings and JWT secret keys are stored in environment variables to enhance security.

## API Documentation

### User Registration & Authentication

#### Register a New User

- **Endpoint**: `POST /api/auth/register`
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "username": "testuser",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "🙋🏻‍♂️ User registered successfully",
    "user": {
      "_id": "user_id",
      "username": "testuser",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    },
    "token": "jwt_token"
  }
  ```

#### Login a User

- **Endpoint**: `POST /api/auth/login`
- **Description**: Logs in a user.
- **Request Body**:
  ```json
  {
    "username": "testuser",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "🔓 User logged in successfully",
    "user": {
      "_id": "user_id",
      "username": "testuser"
    },
    "token": "jwt_token"
  }
  ```

### Posts Management

#### Populate Sample Posts

- **Endpoint**: `POST /api/posts/populate`
- **Description**: Populates the database with 100 sample posts.
- **Response**:
  ```json
  {
    "message": "💯 Sample posts populated"
  }
  ```

#### Create a New Post

- **Endpoint**: `POST /api/posts`
- **Description**: Creates a new post. (Requires to be authenticated)
- **Request Body**:
  ```json
  {
    "title": "Test Post",
    "body": "This is a test post"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "post_id",
    "title": "Test Post",
    "body": "This is a test post",
    "userId": {
      "_id": "user_id",
      "username": "user1",
      "password": "$2b$10$m9M//MOfjvhdUp1zT9SBV.sWGgv7mhbaWht0GFQxIVIdZs6IeyeA.",
      "createdAt": "timestamp",
      "updatedAt": "timestamp",
      "__v": 0
    },
    "likesCount": 0,
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
  ```

#### Get All Posts

- **Endpoint**: `GET /api/posts`
- **Description**: Retrieves all posts.
- **Response**:
  ```json
  [
    {
      "_id": "post_id",
      "title": "Test Post",
      "body": "This is a test post",
      "userId": "user_id",
      "likesCount": 0,
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    },
    ...
  ]
  ```

### Post Interaction

#### Like a Post

- **Endpoint**: `POST /api/likes/:id`
- **Description**: Likes a specific post. (Requires to be authenticated)
- **Request Body**:
  ```json
  {
    "entityType": "Post"
  }
  ```
- **Response**:
  ```json
  {
    "message": "💖 Liked successfully"
  }
  ```

#### Unlike a Post

- **Endpoint**: `DELETE /api/likes/:id`
- **Description**: Unlikes a specific post. (Requires to be authenticated)
- **Request Body**:
  ```json
  {
    "entityType": "Post"
  }
  ```
- **Response**:
  ```json
  {
    "message": "💔 Unliked successfully"
  }
  ```

#### Get All Liked Posts

- **Endpoint**: `GET /api/likes`
- **Description**: Retrieves all liked posts. (Requires to be authenticated)
- **Query Parameters**:
  - `entityType`: The type of entity to retrieve (e.g., `Post`).
- **Response**:
  ```json
  [
    {
      "_id": "post_id",
      "title": "Test Post",
      "body": "This is a test post",
      "userId": "user_id",
      "likesCount": 1,
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    },
    ...
  ]
  ```

#### Clear All Liked Posts

- **Endpoint**: `DELETE /api/likes`
- **Description**: Clears all liked posts. (Requires to be authenticated)
- **Request Body**:
  ```json
  {
    "entityType": "Post"
  }
  ```
- **Response**:
  ```json
  {
    "message": "All liked Post cleared. 🧹💨"
  }
  ```

## Authentication Practices

1. **Password Hashing**: I am using bcrypt to hash passwords before storing them in the database. This is a good practice to protect user passwords.

   - `user.model.js`:
     ```javascript
     userSchema.pre("save", async function (next) {
       if (!this.isModified("password")) {
         return next();
       }
       const salt = await bcrypt.genSalt(10);
       this.password = await bcrypt.hash(this.password, salt);
       next();
     });
     ```

2. **JWT Authentication**: I am using JSON Web Tokens (JWT) for authentication. Tokens are signed with a secret key and have an expiration time.

   - `auth.service.js`:
     ```javascript
     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
       expiresIn: "48h",
     });
     ```

3. **Authentication Middleware**: You have middleware to verify the JWT token and protect routes that require authentication.
   - `auth.middleware.js`:
     ```javascript
     const authMiddleware = (req, res, next) => {
       const authHeader = req.headers["authorization"];
       const token = authHeader && authHeader.split(" ")[1];
       if (!token) {
         return res
           .status(401)
           .json({ error: "🙅 Access denied. No token provided." });
       }
       try {
         const decoded = jwt.verify(token, process.env.JWT_SECRET);
         req.user = decoded;
         next();
       } catch (error) {
         res.status(400).json({ error: "Invalid token." });
       }
     };
     ```

## Why did I choose to have the likes in new model and not inside the Post model?

At first, I builded the application with the likes inside the Post model. But then I realized that it would be better to have a separate model for likes.

I chose to have a separate `Like` model to store likes instead of embedding them directly in the `Post` model for the following reasons:

1. **Scalability**: By having a separate `Like` model, we can handle likes for multiple entities (e.g., posts, comments) without modifying the existing data model. This allows for greater flexibility and scalability.

2. **Data Integrity**: Storing likes in a separate model ensures data integrity and consistency. It prevents duplication of likes and simplifies querying and updating like-related data.

3. **Separation of Concerns**: Separating likes into their own model follows the principle of separation of concerns. It keeps the data model clean and focused on the core entity (e.g., posts) without mixing unrelated data.

4. **Performance**: Storing likes in a separate model can improve performance by reducing the size of the main entity (e.g., posts) and optimizing queries for like-related operations.

5. **Extensibility**: Having a separate `Like` model allows for easy extension of like-related functionality, such as tracking user-specific likes, timestamps, or additional metadata.

## Code Improvement

Now that I am thinking about it, I could use **Class-based** code for Controllers and Services. By using the **Class-based** pattern, we can have better maintainability for Service and Controllers logic. For example:

```javascript
const LikeService = require("../services/like.service");

class LikeController {

  async likeEntity(req, res) {
    try {
      await LikeService.likeEntity(req.params.id, req.body.entityType, req.user.id);
      res.status(200).json({ message: "💖 Liked successfully" });
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  }

  // the others controllers

}

module.exports = new LikeController();
```

This way we can export only the instance of the class and have a better organization of the code.

## Areas for Improvements

To further enhance the backend of the Social Posts Manager application, the following improvements can be made:

<!-- TODO: Add the load more option, we could make an endpoint to take let's say 50 posts and not all of them, then in the frontend we could load only the visible and when the user was scrolling then to load more or he could click the button to load more  -->

1. **HTTPS**: Ensure that the application uses HTTPS to encrypt data transmitted between the client and server. This prevents attackers from intercepting sensitive information, such as tokens and passwords. There is a free SSL certificate from **Let's Encrypt** that can be used to enable HTTPS.

2. **Secure JWT Storage**: JWT tokens are stored in HttpOnly cookies to prevent XSS attacks.

   - Use HttpOnly cookies to store tokens:
     ```javascript
     const login = async (req, res) => {
       try {
         const { user, token } = await loginUser(req.body);
         res.cookie("token", token, {
           httpOnly: true,
           secure: process.env.NODE_ENV === "production",
           sameSite: "strict",
         });
         res
           .status(200)
           .json({ message: "🔓 User logged in successfully", user });
       } catch (error) {
         res.status(error.status || 500).json({ error: error.message });
       }
     };
     ```

3. **CSRF Protection**: Implement Cross-Site Request Forgery (CSRF) protection, especially if using cookies for authentication. We can use `csurf` npm package.

   CSRF attacks occur when a malicious website tricks a user into making unintended requests to your API. If you're using cookies for authentication, you must protect against CSRF attacks.

4. **Rate Limiting**: Implement rate limiting on all endpoints to prevent abuse and ensure fair usage. We can use `express-rate-limit` npm package.

   Prevents excessive API calls that could lead to DDoS attacks or brute-force attempts.

   ```javascript
   const rateLimit = require("express-rate-limit");

   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100, // Limit each IP to 100 requests per window
     message: "Too many requests from this IP, please try again later",
   });

   app.use("/api", limiter, apiRouter);
   ```

5. **Input Validation**: Add input validation to all endpoints to ensure that the data being processed is valid and to prevent potential security vulnerabilities.

   I am already using `body-parser` to parse incoming requests as JSON, but additional validation can be added using a library like `express-validator`.

6. **Logging and Monitoring**: Implement logging and monitoring to track application performance, detect errors, and identify potential security threats.

7. **Account Lockout**: Implemented account lockout mechanisms after a certain number of failed login attempts to prevent brute-force attacks.

8. **Documentation**: Improve and maintain comprehensive documentation for the API, including detailed descriptions of endpoints, request/response formats, and example usage.

   I have a API documentation in Markdown but we can use `Swagger` and `JSDoc` to auto-generate good documentation. `Swagger` creates API documentation and `JSDoc` creates documentation for the code based on the comments.

9. **Testing**: Increase test coverage by adding more unit, integration, and end-to-end tests to ensure the reliability and stability of the application.

10. **Error Handling**: Implement comprehensive error handling to provide meaningful error messages and handle edge cases gracefully.

11. **Security Audits**: Conduct regular security audits to identify and fix potential vulnerabilities in the application.

12. **Password Complexity**: Enforced strong password policies to ensure secure user authentication. (In this case I only enforce to be over 6 characters, we can enforce more complex passwords, for example requiring a mix of uppercase, lowercase, numbers, and special characters).
