import { Server } from "socket.io";

let io;

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        process.env.CLIENT_URL,
      ],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`⚡ Doctor Connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`❌ Doctor Disconnected: ${socket.id}`);
    });
  });
};

export const getIO = () => io;