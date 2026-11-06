
const bcrypt = require("bcryptjs");
const pool = require("../db");
const env = require("../config/env");

async function initializeAdmin() {
  // Validate bootstrap credentials
  if (!env.ADMIN_NAME || !env.ADMIN_EMAIL || !env.ADMIN_PASSWORD) {
    console.warn(
      "Initial admin setup skipped: credentials not configured."
    );
    return;
  }

  const normalizedEmail = env.ADMIN_EMAIL.trim().toLowerCase();

  // Check whether the configured Super Admin already exists
  const existingAdmin = await pool.query(
    `SELECT id
     FROM public.users
     WHERE LOWER(email) = $1
     LIMIT 1`,
    [normalizedEmail]
  );

  if (existingAdmin.rows.length > 0) {
    // Promote only the account configured in .env
    await pool.query(
      `UPDATE public.users
       SET role = 'super_admin',
           updated_at = NOW()
       WHERE id = $1`,
      [existingAdmin.rows[0].id]
    );

    console.log("Initial Super Admin verified successfully.");
    return;
  }

  // Create initial Super Admin if it does not exist
  const passwordHash = await bcrypt.hash(env.ADMIN_PASSWORD, 12);

  await pool.query(
    `INSERT INTO public.users
      (name, email, password_hash, role, is_active)
     VALUES ($1, $2, $3, 'super_admin', TRUE)`,
    [
      env.ADMIN_NAME,
      normalizedEmail,
      passwordHash,
    ]
  );

  console.log("Initial Super Admin created successfully.");
}

module.exports = { initializeAdmin };
