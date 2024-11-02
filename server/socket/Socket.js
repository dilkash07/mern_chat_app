const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

const users = {};

const getReceiverSocket = (reciever) => {
  return users[reciever];
};

io.on("connection", (socket) => {
  const { userId } = socket.handshake.query;

  users[userId] = socket.id;

  console.log("online user: ", users);
  // used to send the events to all connected users
  io.emit("onlineUsers", Object.keys(users));

  // socket.on("send_message", (data) => {
  //   io.to(data.receiverId).emit("receive_message", data);
  // });

  // socket.on("message_seen", (messageId) => {
  //   // io.to(data.receiverId).emit("receive_message", data);
  // });

  // socket.on("typing", (receiverId) => {
  //   io.to(receiverId).emit("typing", { senderId: socket.id });
  // });

  socket.on("disconnect", () => {
    console.log("User disconnected: ", socket.id);
    delete users[userId];
    io.emit("getOnlineUsers", Object.keys(users));
  });
});

module.exports = { app, server, io, getReceiverSocket };
