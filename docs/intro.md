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
- **Styling:** Material Ui
- **State Management:** Redux
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

You can read the full documentation of Frontend [here](./client.md).

| npm package              | Version | Short Description                                      |
| ------------------------ | ------- | ------------------------------------------------------ |
| @emotion/react           | ^11.14.0| Library for writing css styles with JavaScript.        |
| @emotion/styled          | ^11.14.0| Styled component library for Emotion.                  |
| @mui/icons-material      | ^6.4.4  | Material Design icons for React.                       |
| @mui/material            | ^6.4.4  | React components that implement Google's Material Design.|
| @reduxjs/toolkit         | ^2.5.1  | Official, opinionated, batteries-included toolset for Redux.|
| @tanstack/react-query    | ^5.66.7 | Hooks for fetching, caching, and updating asynchronous data in React.|
| axios                    | ^1.7.9  | Promise-based HTTP client for making API requests.     |
| date-fns                 | ^4.1.0  | Modern JavaScript date utility library.                |
| react                    | ^19.0.0 | JavaScript library for building user interfaces.       |
| react-dom                | ^19.0.0 | Entry point of the DOM-related rendering paths.        |
| react-hook-form          | ^7.54.2 | Performant, flexible and extensible forms with easy-to-use validation.|
| react-redux              | ^9.2.0  | Official React bindings for Redux.                     |
| react-router             | ^7.1.5  | Declarative routing for React.                         |

| npm package for Dev only | Version | Short Description                                      |
| ------------------------ | ------- | ------------------------------------------------------ |
| @eslint/js               | ^9.19.0 | ESLint's JavaScript API.                               |
| @types/react             | ^19.0.8 | TypeScript definitions for React.                      |
| @types/react-dom         | ^19.0.3 | TypeScript definitions for React DOM.                  |
| @vitejs/plugin-react-swc | ^3.5.0  | Vite plugin to support React with SWC.                 |
| eslint                   | ^9.19.0 | Pluggable JavaScript linter.                           |
| eslint-plugin-react-hooks| ^5.0.0  | ESLint rules for React Hooks.                          |
| eslint-plugin-react-refresh| ^0.4.18| ESLint plugin for React Refresh.                       |
| globals                  | ^15.14.0| Global variables for various environments.             |
| typescript               | ~5.7.2  | Typed JavaScript at Any Scale.                         |
| typescript-eslint        | ^8.22.0 | Monorepo for all the tooling which enables ESLint to support TypeScript.|
| vite                     | ^6.1.0  | Next generation frontend tooling.                      |