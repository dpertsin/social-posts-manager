const express = require("express");
const { register, login, cleanupTestUser } = require("./auth.controller");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
/* Test cleanup route - only for testing purposes */
router.delete("/cleanup", cleanupTestUser);

module.exports = router;
