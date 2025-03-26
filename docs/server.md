# Backend Documentation

I followed the TDD (Test-Driven Development) approach to build the backend of the Social Posts Manager application. The backend is built using Node.js with Express.js and MongoDB as the database. The following documentation provides an overview of the design decisions, API endpoints, authentication practices, and areas for improvements.

## Table of Contents

- [Overview of Design Decisions](#overview-of-design-decisions)
- [Structure of the Backend](#structure-of-the-backend)
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
- [Why did I choose to not use queues for the 100 sample posts?](#why-did-i-choose-to-not-use-queues-for-the-100-sample-posts)
- [Code Improvement](#code-improvement)
- [Repository Pattern Implementation](#repository-pattern-implementation)
- [Areas for Improvements](#areas-for-improvements)

## Overview of Design Decisions

The backend of the Social Posts Manager application is built using Express.js, a minimal and flexible Node.js web application framework. The following design decisions were made to ensure a robust, scalable, and maintainable backend:

1. **MVC Pattern**: The backend follows the Model-View-Controller (MVC) pattern to separate concerns and improve code organization. Models handle data, controllers and services handle business logic, and routes handle HTTP requests.

2. **MongoDB with Mongoose**: MongoDB is used as the database, and Mongoose is used as the Object Data Modeling (ODM) library to interact with MongoDB. This combination provides a flexible schema and powerful query capabilities.

3. **JWT Authentication**: JSON Web Tokens (JWT) are used for authentication. JWTs are signed with a secret key and have an expiration time to ensure secure and stateless authentication.

4. **Middleware**: Middleware functions are used to handle common tasks such as logging, parsing JSON bodies, handling CORS, and verifying authentication tokens.

5. **Environment Variables**: Sensitive information such as database connection strings and JWT secret keys are stored in environment variables to enhance security.

6. **Error Handling**: Custom error handling middleware is implemented to catch and handle errors in a consistent manner. Errors are returned as JSON responses with appropriate status codes.

7. **Load More Option**: Implemented a "load more" feature to improve performance and user experience. Instead of retrieving all posts at once, an endpoint is created to fetch posts in batches (e.g., 30 posts at a time). This allows the frontend to load only the visible posts initially and load more posts as the user scrolls or clicks a "load more" button.

8. **Repository Pattern**: Implemented a repository pattern to separate data access logic from business logic, improving testability and maintainability.

9. **Domain-Driven Design**: Organized the codebase by domain/feature rather than technical function, creating clear boundaries between different parts of the application.


## Structure of the Backend

The backend has been reorganized into a domain-driven structure with the following main directories:

- **__tests__**: Contains test files for unit and integration testing
- **bin**: Contains the server startup script.
- **common**: Contains shared utilities and middleware:
  - **middlewares**: Contains middleware functions for request processing
  - **utils**: Contains utility functions used across domains
- **config**: Contains configuration files (database connection, etc.)
- **domains**: Contains domain-specific modules organized by feature:
  - **auth**: Authentication-related files (controller, service, repository, model, routes)
  - **posts**: Post-related files (controller, service, repository, model, routes)
  - **likes**: Like-related files (controller, service, repository, model, routes)
- **app.js**: The entry point of the application where Express is configured

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
- **Description**: Populates the database with 100 sample posts. (Requires to be authenticated)
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
      "userId": {
        "_id": "user_id",
        "username": "user1",
      },
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

## Why did I choose to not use queues for the 100 sample posts?

I chose to populate the database with 100 sample posts synchronously instead of using queues for the following reasons:

1. **Simplicity**: For a small number of sample posts (100), a synchronous approach is simple and straightforward to implement. Using queues for such a small task may introduce unnecessary complexity.

2. **Performance**: For a small number of posts, the performance impact of a synchronous operation is minimal. The database can handle the insertion of 100 posts efficiently without the need for asynchronous processing. Especially since this is a one-time operation and with title and body being the only fields, the performance impact is negligible.

If I wanted to populate a large number of posts (e.g., thousands or millions), I would consider using queues to distribute the workload and optimize performance. Queues can help manage large-scale data processing tasks efficiently by distributing the workload across multiple workers and handling failures gracefully.

An example of using queues for populating a large number of posts could involve:

1. **Queue System**: Implementing a queue system (e.g., RabbitMQ, Redis) to manage the task of populating posts.
2. **Workers**: Creating worker processes to consume tasks from the queue and insert posts into the database asynchronously.

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

## Repository Pattern Implementation

The application now implements the repository pattern to achieve better separation of concerns:

1. **Repository Layer**: Each domain has a dedicated repository that handles all database operations:
   - `auth.repository.js`: Handles user-related database operations
   - `post.repository.js`: Handles post-related database operations
   - `like.repository.js`: Handles like-related database operations

2. **Service Layer**: Services contain business logic and use repositories for data access:
   ```javascript
   class LikeService {
     async likeEntity(entityId, entityType, userId) {
       // Business logic
       const existingLike = await likeRepository.findOne(entityId, entityType, userId);
       
       if (!existingLike) {
         await likeRepository.create(entityId, entityType, userId);
         
         // Only update counts for specific entity types
         if (entityType === "Post") {
           await likeRepository.incrementLikeCount(entityId);
         }
       }
     }
   }
   ```

## Areas for Improvements

To further enhance the backend of the Social Posts Manager application, the following improvements can be made:

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
