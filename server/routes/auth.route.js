/**
 * The auth route is used to handle the authentication of users.
 * @requires express
 * @requires auth.controller
 * @exports router
 */
const express = require("express");
const { register, login, cleanupTestUser } = require("../controllers/auth.controller");

const router = express.Router();

/* POST to register a new user */
router.post("/register", register);
/* POST to login a user */
router.post("/login", login);
/* Test cleanup route - only for testing purposes */
router.delete("/cleanup", cleanupTestUser);

module.exports = router;
