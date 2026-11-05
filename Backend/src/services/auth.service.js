const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const pool = require("../db");
const env = require("../config/env");

async function loginAdmin(email, password) {
  // Find admin by email
  const result = await pool.query(
    `SELECT id, name, email, password_hash, role, is_active
     FROM users
     WHERE email = LOWER($1)
     LIMIT 1`,
    [email]
  );

  const user = result.rows[0];

  if (!user || !user.is_active) {
    throw Object.assign(new Error("Invalid email or password"), {
      statusCode: 401,
    });
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(
    password,
    user.password_hash
  );

  if (!isPasswordValid) {
    throw Object.assign(new Error("Invalid email or password"), {
      statusCode: 401,
    });
  }

  if (!env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  // Generate JWT
  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    env.JWT_SECRET,
    {
      expiresIn: env.JWT_EXPIRES_IN,
    }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}


async function registerAdmin({ name, email, password }) {
  const normalizedEmail = email.toLowerCase().trim();

  // Check duplicate email
  const existingUser = await pool.query(
    `SELECT id FROM users
     WHERE LOWER(email) = $1
     LIMIT 1`,
    [normalizedEmail]
  );

  if (existingUser.rows.length > 0) {
    throw Object.assign(new Error("Email already registered"), {
      statusCode: 409,
    });
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 12);

  // Create admin
  const result = await pool.query(
    `INSERT INTO users
      (name, email, password_hash, role, is_active)
     VALUES ($1, $2, $3, 'admin', TRUE)
     RETURNING id, name, email, role, is_active, created_at`,
    [name.trim(), normalizedEmail, passwordHash]
  );

  return result.rows[0];
}


module.exports = { loginAdmin,  registerAdmin };