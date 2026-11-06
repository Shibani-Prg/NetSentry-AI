
const jwt = require("jsonwebtoken");
const env = require("../config/env");
const pool = require("../db");

async function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication token required",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured");
    }

    const decoded = jwt.verify(token, env.JWT_SECRET);

    const result = await pool.query(
      `SELECT id, name, email, role, is_active
       FROM public.users
       WHERE id = $1
       LIMIT 1`,
      [decoded.userId]
    );

    const user = result.rows[0];

    if (!user || !user.is_active) {
      return res.status(401).json({
        success: false,
        message: "User is not authorized",
      });
    }

    req.user = {
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    next(error);
  }
}

module.exports = authenticateToken;
