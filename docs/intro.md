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
- **State Management:** Redux
- **Formatting:** ESLint + Prettier
- **Testing Tools:** Jest + Supertest
- **e2e Test:** Cypress

### Project Setup:

You can read the README file [here](../README.md)

### Code Quality:

The project will follow **Test-Driven Development (TDD)** principles to ensure robust and reliable code. This involves writing tests before implementing the actual functionality.

The project will use a **monorepo structure** with a `client` folder for the frontend and a `server` folder for the backend.

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
- Bonus Features (Optional)

### Project Structure

TODO: Add the project structure

```json
social-posts-manager/
├── client/                 # React frontend
└── server/             # Express backend
```

### Backend

- **express:** framework for our app
- **body-parser:** middleware to handle incoming requests as JSON
- **jest:** testing framework for unit and integration tests
- **supertest:** library for testing HTTP endpoints
- **nodemon:** to auto restart server automatically when files change
- **dotenv:** to manage environment variables
- **jsonwebtoken:** to generate the JWT
- **axios:** promise-based HTTP client for the browser and Node.js
- **cookie-parser:** middleware to parse cookies
- **debug:** debugging utility
- **morgan:** HTTP request logger middleware for Node.js
- **jest-mock:** to mock functions for testing
- **mongoose:** MongoDB object modeling tool
- **mongodb:** MongoDB driver for Node.js

### Frontend
