import { io } from "socket.io-client";

const socket = io(
  "https://ai-powered-predictive-hospital-6n7v.onrender.com",
  {
    transports: ["websocket"],
  }
);

socket.on("connect", () => {
  console.log("✅ SOCKET CONNECTED");
  console.log(socket.id);
});

socket.on("disconnect", () => {
  console.log("❌ SOCKET DISCONNECTED");
});

export default socket;