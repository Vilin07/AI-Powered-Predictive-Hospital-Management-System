import express from "express";
import dotenv from "dotenv";
import http from "http";

import connectDB from "./config/db.js";
import patientRoutes from "./routes/patientRoutes.js";
import vitalRoutes from "./routes/vitalRoutes.js";
import liveVitalRoutes from "./routes/liveVitalRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use(
  "/api/patients",
  patientRoutes
);

app.use(
  "/api/vitals",
  vitalRoutes
);

app.use(
  "/api/live-vitals",
  liveVitalRoutes
);

app.use(
  "/api/alerts",
  alertRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

const PORT =
  process.env.PORT || 8000;

const server = http.createServer(app);

import { initializeSocket } from "./socket/socket.js";

initializeSocket(server);

server.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});