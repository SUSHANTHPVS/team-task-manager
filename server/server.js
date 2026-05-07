import express from "express";

import dotenv from "dotenv";

import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";

import projectRoutes from "./routes/projectRoutes.js";

import taskRoutes from "./routes/taskRoutes.js";
import dashboardRoutes
from "./routes/dashboardRoutes.js";


// Load environment variables
dotenv.config();


// Connect MongoDB
connectDB();


// Initialize app
const app = express();


// Middleware
app.use(cors({
  origin: "*",
}));

app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/tasks", taskRoutes);
app.use(
  "/api/dashboard",
  dashboardRoutes
);


// Test route
app.get("/", (req, res) => {

  res.send("API is running...");

});


// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});