import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import patientRoutes from "./routes/patientRoutes.js";
import vitalRoutes from "./routes/vitalRoutes.js";

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

app.get("/", (req, res) => {
  res.send("Backend Running");
});

const PORT =
  process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});