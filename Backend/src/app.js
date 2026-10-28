
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const env = require("./config/env");

const app = express();

// Security headers
app.use(helmet());

// Allow frontend to communicate with backend
app.use(
  cors({
    origin: env.FRONTEND_URL,
  })
);

// Parse incoming JSON
app.use(express.json({ limit: "1mb" }));

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "NetSentry AI backend is running",
  });
});

// API routes
app.use("/api/events", require("./routes/events.routes"));
app.use("/api/detections", require("./routes/detections.routes"));

// Handle unknown routes
app.use(require("./middleware/notFound"));

// Centralized error handling
app.use(require("./middleware/errorHandler"));

module.exports = app;
