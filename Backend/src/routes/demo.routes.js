
const express = require("express");
const router = express.Router();

const {
  getDemoLoginPage,
  recordDemoLogin,
  generateDemoEvent,
  getDemoInfo,
} = require("../controllers/demo.controller");

const { demoLoginLimiter } = require("../middleware/rateLimiter");

// Demo API status
router.get("/", getDemoLoginPage);

// LAN connection information
router.get("/info", getDemoInfo);

// Failed login simulation
router.post("/attempt", demoLoginLimiter, recordDemoLogin);

// Security event simulator
router.post("/event", demoLoginLimiter, generateDemoEvent);

module.exports = router;
