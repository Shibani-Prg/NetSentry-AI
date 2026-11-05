
const dotenv = require("dotenv");
dotenv.config();

const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT || 5000),

  FRONTEND_URL:
    process.env.FRONTEND_URL || "http://localhost:5173",

  DB_HOST: process.env.DB_HOST,
  DB_PORT: Number(process.env.DB_PORT || 5432),
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,

  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
  ADMIN_NAME: process.env.ADMIN_NAME,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL?.toLowerCase().trim(),
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
};

if (env.NODE_ENV === "production" && !env.JWT_SECRET) {
  throw new Error("JWT_SECRET is required in production");
}

module.exports = env;
