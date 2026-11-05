const rateLimit = require("express-rate-limit");

const demoLoginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  limit: 10, // Maximum 10 requests per IP
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many demo login attempts. Please try again after 1 minute.",
  },
});

module.exports = {
  demoLoginLimiter,
};