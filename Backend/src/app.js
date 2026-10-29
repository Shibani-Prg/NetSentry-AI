
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const env = require("./config/env");
const pool = require("./db");

const networkSourcesRoutes = require("./routes/networkSources.routes");
const eventsRoutes = require("./routes/events.routes");
const detectionsRoutes = require("./routes/detections.routes");
const reportsRoutes = require("./routes/reports.routes");
const detectionConfigRoutes = require("./routes/detectionConfig.routes");

const app = express();

// Security headers
app.use(helmet());

// CORS
app.use(
  cors({
    origin: env.FRONTEND_URL,
  })
);

// Parse JSON requests
app.use(express.json({ limit: "1mb" }));

app.use("/api/detection-config", detectionConfigRoutes);

// Basic backend health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    service: "NetSentry AI Backend",
    status: "running",
  });
});

// Live backend + database health check
app.get("/api/health", async (req, res) => {
  let database = "disconnected";

  try {
    await pool.query("SELECT 1");
    database = "connected";

    return res.status(200).json({
      success: true,
      backend: "connected",
      database,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return res.status(503).json({
      success: false,
      backend: "connected",
      database,
      message: "Database health check failed",
      timestamp: new Date().toISOString(),
    });
  }
});

// API routes
app.use("/api/network-sources", networkSourcesRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/detections", detectionsRoutes);
app.use("/api/reports", reportsRoutes);

// Handle unknown routes
app.use(require("./middleware/notFound"));

// Centralized error handling
app.use(require("./middleware/errorHandler"));

module.exports = app;
