import http from "http";
import express from "express";
import { Server } from "socket.io";

let app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://realtimechat-v65u.onrender.com"
  }
});

const userSocketMap = {};


io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId !== undefined) {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers",Object.keys(userSocketMap))
  

  socket.on("disconnect", () => {
    // Remove the disconnected user from the map
    for (const key in userSocketMap) {
      if (userSocketMap[key] === socket.id) {
        delete userSocketMap[key];
        break;
      }
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, server };
