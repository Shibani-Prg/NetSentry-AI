const {
  loginAdmin,
  registerAdmin,
} = require("../services/auth.service");
const pool = require("../db");

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const result = await loginAdmin(email, password);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    if (error.statusCode === 401) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    next(error);
  }
}

async function getCurrentUser(req, res, next) {
  try {
    const result = await pool.query(
      `SELECT id, name, email, role
       FROM public.users
       WHERE id = $1 AND is_active = TRUE
       LIMIT 1`,
      [req.user.userId]
    );

    if (!result.rows.length) {
      return res.status(401).json({
        success: false,
        message: "User account is unavailable",
      });
    }

    return res.status(200).json({
      success: true,
      user: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
}


async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    const newAdmin = await registerAdmin({
      name,
      email,
      password,
    });

    return res.status(201).json({
      success: true,
      message: "Admin account created successfully",
      admin: newAdmin,
    });
  } catch (error) {
    if (error.statusCode === 409 || error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "Email is already registered",
      });
    }

    next(error);
  }
}

module.exports = {
  login,
  getCurrentUser,
  register,
};