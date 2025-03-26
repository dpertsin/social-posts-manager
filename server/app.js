var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var helmet = require("helmet");

require("dotenv").config();

/* Import the routers */
var indexRouter = require("./routes/index.route");
var postRouter = require("./routes/post.route");
var authRouter = require("./routes/auth.route");
var likeRouter = require("./routes/like.route");

var connectDB = require("./database");

var app = express();

connectDB();

app.use(logger("dev")); 
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser()); 
app.use(express.static(path.join(__dirname, "public"))); 
app.use(cors()); 
app.use(helmet()); 

app.use("/", indexRouter);
app.use("/api/posts", postRouter);
app.use("/api/auth", authRouter);
app.use("/api/likes", likeRouter);

module.exports = app;
