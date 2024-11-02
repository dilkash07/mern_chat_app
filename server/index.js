const express = require("express");
require("dotenv").config();
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const { app, server } = require("./socket/Socket");

const authRoutes = require("./router/Auth");
const userRoutes = require("./router/User");
const messageRoutes = require("./router/Message");

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/message", messageRoutes);

database.connect();

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server running on ${port} port`);
});

app.get("/", (req, res) => {
  res.send("<h1>This is home page</h1>");
});
