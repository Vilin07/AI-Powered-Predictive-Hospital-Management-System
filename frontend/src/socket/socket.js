import { io } from "socket.io-client";

const socket = io("http://localhost:8000", {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("✅ SOCKET CONNECTED");
  console.log(socket.id);
});

socket.on("disconnect", () => {
  console.log("❌ SOCKET DISCONNECTED");
});

export default socket;