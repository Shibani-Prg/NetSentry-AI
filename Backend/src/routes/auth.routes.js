const express = require("express");
const rateLimit = require("express-rate-limit");

const {
  login,
  getCurrentUser,
} = require("../controllers/auth.controller");

const authenticateToken = require("../middleware/auth.middleware");
const { loginSchema } = require("../validators/auth.schema");

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many login attempts. Please try again later.",
  },
});

router.post("/login", loginLimiter, (req, res, next) => {
  const validation = loginSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid login details",
      errors: validation.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  req.body = validation.data;
  next();
}, login);

router.get("/me", authenticateToken, getCurrentUser);

module.exports = router;