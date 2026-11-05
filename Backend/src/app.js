
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const env = require("./config/env");
const pool = require("./db");

const authenticateToken = require("./middleware/auth.middleware");

const networkSourcesRoutes = require("./routes/networkSources.routes");
const eventsRoutes = require("./routes/events.routes");
const detectionsRoutes = require("./routes/detections.routes");
const reportsRoutes = require("./routes/reports.routes");
const detectionConfigRoutes = require("./routes/detectionConfig.routes");
const authRoutes = require("./routes/auth.routes");
const demoRoutes = require("./routes/demo.routes");
const adminsRoutes = require("./routes/admins.routes");
const requireSuperAdmin = require("./middleware/requireSuperAdmin");

const app = express();

// Security headers
app.use(helmet());

// CORS - Allow multiple trusted frontend origins
const allowedOrigins = (env.FRONTEND_URL || "")
  .split(",")
  .map((url) => url.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Parse JSON requests
app.use(express.json({ limit: "1mb" }));

app.use(
  express.urlencoded({
    extended: false,
    limit: "10kb",
  })
);

// Public LAN demo routes
app.use("/demo-login", demoRoutes);

// Public backend health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    service: "NetSentry AI Backend",
    status: "running",
  });
});

// Public database health check
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

// Public authentication routes
app.use("/api/auth", authRoutes);

// Super Admin protected routes
app.use(
  "/api/admins",
  authenticateToken,
  requireSuperAdmin,
  adminsRoutes
);

// Protect all dashboard APIs below this middleware
app.use("/api", authenticateToken);

// Protected dashboard routes
app.use("/api/network-sources", networkSourcesRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/detections", detectionsRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/detection-config", detectionConfigRoutes);

// Handle unknown routes
app.use(require("./middleware/notFound"));

// Centralized error handling
app.use(require("./middleware/errorHandler"));

module.exports = app;
