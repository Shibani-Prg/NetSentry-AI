
const bcrypt = require("bcryptjs");
const pool = require("../db");

const MAX_SUPER_ADMINS = 3;

async function getAllAdmins() {
  const result = await pool.query(
    `SELECT id, name, email, role, is_active, created_at
     FROM users
     ORDER BY created_at DESC`
  );

  return result.rows;
}

async function createAdmin({ name, email, password }) {
  const normalizedEmail = email.trim().toLowerCase();

  const existing = await pool.query(
    `SELECT id
     FROM users
     WHERE LOWER(email) = $1
     LIMIT 1`,
    [normalizedEmail]
  );

  if (existing.rows.length > 0) {
    throw Object.assign(new Error("Email already registered"), {
      statusCode: 409,
    });
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const result = await pool.query(
    `INSERT INTO users
      (name, email, password_hash, role, is_active)
     VALUES ($1, $2, $3, 'admin', TRUE)
     RETURNING id, name, email, role, is_active, created_at`,
    [name.trim(), normalizedEmail, passwordHash]
  );

  return result.rows[0];
}

// Promote Admin to Super Admin
async function promoteAdmin(adminId) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    await client.query("LOCK TABLE users IN EXCLUSIVE MODE");

    const target = await client.query(
      `SELECT id, role
       FROM users
       WHERE id = $1
       FOR UPDATE`,
      [adminId]
    );

    if (!target.rows.length) {
      throw Object.assign(new Error("Admin not found"), {
        statusCode: 404,
      });
    }

    if (target.rows[0].role === "super_admin") {
      throw Object.assign(
        new Error("Account is already a Super Admin"),
        { statusCode: 409 }
      );
    }

    const count = await client.query(
      `SELECT COUNT(*)::int AS total
       FROM users
       WHERE role = 'super_admin'`
    );

    if (count.rows[0].total >= MAX_SUPER_ADMINS) {
      throw Object.assign(
        new Error("Maximum of 3 Super Admins allowed"),
        { statusCode: 409 }
      );
    }

    const result = await client.query(
      `UPDATE users
       SET role = 'super_admin', updated_at = NOW()
       WHERE id = $1
       RETURNING id, name, email, role, is_active, created_at`,
      [adminId]
    );

    await client.query("COMMIT");
    return result.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

// Demote Super Admin to Admin
async function demoteSuperAdmin(adminId) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    await client.query("LOCK TABLE users IN EXCLUSIVE MODE");

    const target = await client.query(
      `SELECT id, role, is_active
       FROM users
       WHERE id = $1
       FOR UPDATE`,
      [adminId]
    );

    if (!target.rows.length) {
      throw Object.assign(new Error("Admin not found"), {
        statusCode: 404,
      });
    }

    if (target.rows[0].role !== "super_admin") {
      throw Object.assign(
        new Error("Account is not a Super Admin"),
        { statusCode: 409 }
      );
    }

    if (target.rows[0].is_active) {
      const count = await client.query(
        `SELECT COUNT(*)::int AS total
         FROM users
         WHERE role = 'super_admin'
         AND is_active = TRUE`
      );

      if (count.rows[0].total <= 1) {
        throw Object.assign(
          new Error("At least one active Super Admin must remain"),
          { statusCode: 409 }
        );
      }
    }

    const result = await client.query(
      `UPDATE users
       SET role = 'admin', updated_at = NOW()
       WHERE id = $1
       RETURNING id, name, email, role, is_active, created_at`,
      [adminId]
    );

    await client.query("COMMIT");
    return result.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

// Delete Admin or Super Admin
async function deleteAdmin(adminId) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    await client.query("LOCK TABLE users IN EXCLUSIVE MODE");

    const target = await client.query(
      `SELECT id, name, email, role, is_active
       FROM users
       WHERE id = $1
       FOR UPDATE`,
      [adminId]
    );

    if (!target.rows.length) {
      throw Object.assign(new Error("Admin not found"), {
        statusCode: 404,
      });
    }

    const admin = target.rows[0];

    // Protect the last active Super Admin
    if (admin.role === "super_admin" && admin.is_active) {
      const count = await client.query(
        `SELECT COUNT(*)::int AS total
         FROM users
         WHERE role = 'super_admin'
         AND is_active = TRUE`
      );

      if (count.rows[0].total <= 1) {
        throw Object.assign(
          new Error("Cannot delete the last active Super Admin"),
          { statusCode: 409 }
        );
      }
    }

    const result = await client.query(
      `DELETE FROM users
       WHERE id = $1
       RETURNING id, name, email, role`,
      [adminId]
    );

    await client.query("COMMIT");
    return result.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

module.exports = {
  getAllAdmins,
  createAdmin,
  promoteAdmin,
  demoteSuperAdmin,
  deleteAdmin,
};
