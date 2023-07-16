// socket.js

import { createServer } from "http";
import { Server } from "socket.io";

let io;

// Initialize Socket.IO server
export const init = (app) => {
  const httpServer = createServer(app);

  // Set up Socket.IO with the http server
  io = new Server(httpServer, {
    // Additional configuration options can be added here

    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("callUser", ({ from, to }) => {
      socket.to(to).emit("callUser", { from, to });
    });
    socket.on("answerCall", ({ to, signal }) => {
      socket.to(to).emit("answerCall", { signal });
    });

    socket.on("iceCandidate", ({ to, candidate }) => {
      socket.to(to).emit("iceCandidate", { candidate });
    });

    socket.on("disconnect", () => {
      socket.broadcast.emit("callEnded");
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
