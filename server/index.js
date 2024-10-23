const express = require("express");
const app = express();
require("dotenv").config();
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require("./router/Auth");
const userRoutes = require("./router/User");

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);

database.connect();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on ${port} port`);
});

app.get("/", (req, res) => {
  res.send("<h1>This is home page</h1>");
});
