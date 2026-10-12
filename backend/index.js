import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import multer from "multer";

import { connectDB } from "./config/connectDB.js";
import skillsRouter from "./routes/skills.route.js";
import projectsRouter from "./routes/projects.route.js";

const app = express();
const port = process.env.PORT || 5000;

// Standard Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/skill", skillsRouter);
app.use("/api/project", projectsRouter);

// Multer & Global Error Handling Middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ error: "File too large. Maximum size is 5MB." });
    }
    return res.status(400).json({ error: err.message });
  } else if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
});

// Start Server
app.listen(port, "0.0.0.0", async () => {
  await connectDB();
  console.log(`Server is running at http://localhost:${port}`);
});
