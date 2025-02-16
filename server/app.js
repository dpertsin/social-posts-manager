/**
 * This file is the entry point for the server. 
 * It sets up the server and mounts the routers.
 * @exports app
 */
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

require("dotenv").config();

/* Import the routers */
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var postRouter = require("./routes/post.route");
var connectDB = require("./database");

var app = express();

connectDB(); // Connect to the database

app.use(logger("dev")); // Log requests to the console
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse Cookie headers
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

/*  Mount the routers on the app */
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/posts", postRouter);

module.exports = app;
