var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var helmet = require("helmet");

require("dotenv").config();

/* Import the routers */
var postRouter = require("./domains/posts/post.route");
var authRouter = require("./domains/auth/auth.route");
var likeRouter = require("./domains/likes/like.route");

var connectDB = require("./config/database");

var app = express();

connectDB();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(helmet());

app.use("/api/posts", postRouter);
app.use("/api/auth", authRouter);
app.use("/api/likes", likeRouter);

module.exports = app;
