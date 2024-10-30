const express = require("express");
const { Server } = require("socket.io");
const http = require("http");

const app = express();

// socket connection
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});
