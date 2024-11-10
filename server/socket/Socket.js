const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
require("dotenv").config();
const User = require("../models/User");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

const users = {};
const currentPage = {};

const getReceiverSocket = (receiver) => {
  return users[receiver];
};

const getCurrentPage = (receiver) => {
  return currentPage[receiver];
};

io.on("connection", (socket) => {
  const { userId } = socket.handshake.query;

  users[userId] = socket.id;

  console.log("online user: ", users);

  io.emit("onlineUsers", Object.keys(users));

  socket.on("typing", ({ id, sender, isTyping }) => {
    const receiver = users[id];
    const receiverCurrentPage = currentPage[id];

    if (receiver && receiverCurrentPage === sender) {
      io.to(receiver).emit("isTyping", isTyping);
    }
  });

  socket.on("leavePage", ({ sender }) => {
    delete currentPage[sender];
  });

  socket.on("enterPage", ({ sender, receiver }) => {
    currentPage[sender] = receiver;
  });

  socket.on("disconnect", async () => {
    console.log("User disconnected: ", socket.id);
    delete users[userId];
    io.emit("onlineUsers", Object.keys(users));
    await User.findByIdAndUpdate(userId, { lastSeen: Date.now() });
  });
});

module.exports = { app, server, io, getReceiverSocket, getCurrentPage };
