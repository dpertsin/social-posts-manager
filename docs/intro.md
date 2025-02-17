# Full-Stack Web Application: Social Posts Manager

**Overview:**
Your task is to build a full-stack web application that integrates user-created content with interactive features. The application will allow users to create and manage posts, register and log in, and “like” posts.

## Technical Details

### Technology Stack:

- **Language:** Typescript
- **Backend:** Express.js
- **Frontend:** React with Vite
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Styling:** Tailwind CSS
- **State Management:** React Context 
- **Formatting:** ESLint + Prettier
- **Testing Tools:** Jest + Supertest
- **e2e Test:** Cypress

### Project Setup:

You can read the README file [here](../README.md)

### Code Quality:

The project will follow **Test-Driven Development (TDD)** principles to ensure robust and reliable code. This involves writing tests before implementing the actual functionality.

The project will use a **polyrepo structure** with a `client` folder for the frontend, a `server` folder for the backend and a `doc` folder for the documentation.

The backend will follow the **MVC (Model-View-Controller) pattern** to ensure a clean separation of concerns.

ESLint and Prettier will be used to maintain **code quality and consistency**.

**Secure authentication** practices will be implemented using JWT.

**Comments** will be added throughout the codebase to ensure clarity and maintainability. Each function and significant code block will include comments explaining its purpose and functionality.

**Unit and integration tests** will be written using Jest and Supertest.

**End-to-end tests** will be conducted using Cypress.

### Features:

Refer to the [requirements document](../docs/requirements.md) for detailed feature requirements, including:

- Posts Management
- Post Interaction
- User Registration & Authentication
- Data Persistence

### Project Structure

TODO: Add the project structure

```json
social-posts-manager/
├── client/                 # React frontend
└── server/             # Express backend
```

## Backend

You can read the full documentation of Backend [here](./server.md).

| npm package   | Version | Short Description                                   |
| ------------- | ------- | --------------------------------------------------- |
| axios         | ^1.7.9  | Promise-based HTTP client for making API requests.  |
| bcrypt        | ^5.1.1  | Library for hashing passwords securely.             |
| cookie-parser | ~1.4.4  | Middleware for parsing cookies in Express.          |
| cors          | ^2.8.5  | Middleware to enable Cross-Origin Resource Sharing. |
| debug         | ~2.6.9  | Small debugging utility for Node.js applications.   |
| dotenv        | ^16.4.7 | Loads environment variables from a `.env` file.     |
| express       | ~4.21.2 | Fast, unopinionated, minimalist web framework.      |
| helmet        | ^8.0.0  | Helps secure Express apps by setting HTTP headers.  |
| jest-mock     | ^29.7.0 | Mocking utilities for Jest testing framework.       |
| jsonwebtoken  | ^9.0.2  | Library for creating and verifying JWTs.            |
| mongodb       | ^6.13.0 | Official MongoDB driver for Node.js.                |
| mongoose      | ^8.10.1 | ODM for MongoDB and Node.js.                        |
| morgan        | ~1.9.1  | HTTP request logger middleware for Express.         |
| nodemon       | ^3.1.9  | Utility to monitor and restart Node.js apps.        |

| npm package for Dev only | Version | Short Description                              |
| ------------------------ | ------- | ---------------------------------------------- |
| @shelf/jest-mongodb      | ^4.3.2  | Jest preset for testing MongoDB with Jest.     |
| @types/express           | ^5.0.0  | TypeScript definitions for Express.            |
| jest                     | ^29.7.0 | JavaScript testing framework by Facebook.      |
| supertest                | ^7.0.0  | Library for testing HTTP servers with Node.js. |

## Frontend
