// socket.js

import { createServer } from "http";
import { Server } from "socket.io";
import { User } from "../models/User.js";

let io;

// Initialize Socket.IO server
export const init = (app) => {
  const httpServer = createServer(app);

  // Set up Socket.IO with the http server
  io = new Server(httpServer, {
    // Additional configuration options can be added here

    cors: {
      origin: ["http://localhost:3000", "http://localhost:5000", "http://localhost:5173"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    },
  });

  const onlineUsers = {};
  io.on("connection", (socket) => {
    socket.on('online', async function (data) {
      onlineUsers[socket.id] = data.userId;
      try {
        const doc = await User.findOneAndUpdate(
          { _id: data.userId },
          { online: true },
          { new: true }
        );
        console.log("User online: ", doc.username);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("callUser", ({ from, to }) => {
      socket.to(to).emit("callUser", { from, to });
    });

    socket.on("answerCall", ({ to, signal }) => {
      socket.to(to).emit("answerCall", { signal });
    });

    socket.on("iceCandidate", ({ to, candidate }) => {
      socket.to(to).emit("iceCandidate", { candidate });
    });

    socket.on("offline", async () => {
      const userId = onlineUsers[socket.id];
      if (userId) {
        delete onlineUsers[socket.id];
        try {
          const doc = await User.findOneAndUpdate(
            { _id: userId },
            { online: false },
            { new: true }
          );
          console.log("User offline: ", doc.username);
        } catch (error) {
          console.log(error);
        }
      }
    });
  });

  return httpServer;
};

// Access the Socket.IO instance
export const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO not initialized");
  }
  return io;
};
