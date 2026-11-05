
const {
  getAllAdmins,
  createAdmin,
  deleteAdmin,
  promoteAdmin,
  demoteSuperAdmin,
} = require("../services/admins.service");

async function getAdmins(req, res, next) {
  try {
    const admins = await getAllAdmins();

    return res.status(200).json({
      success: true,
      total: admins.length,
      admins,
    });
  } catch (error) {
    next(error);
  }
}

async function createAdminAccount(req, res, next) {
  try {
    const admin = await createAdmin(req.body);

    return res.status(201).json({
      success: true,
      message: "Admin created successfully",
      admin,
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

async function promoteAdminAccount(req, res, next) {
  try {
    const adminId = Number(req.params.id);

    if (!Number.isInteger(adminId) || adminId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid admin ID",
      });
    }

    const admin = await promoteAdmin(adminId);

    return res.status(200).json({
      success: true,
      message: "Admin promoted to Super Admin successfully",
      admin,
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    next(error);
  }
}

async function demoteAdminAccount(req, res, next) {
  try {
    const adminId = Number(req.params.id);

    if (!Number.isInteger(adminId) || adminId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid admin ID",
      });
    }

    if (adminId === Number(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: "You cannot demote your own account",
      });
    }

    const admin = await demoteSuperAdmin(adminId);

    return res.status(200).json({
      success: true,
      message: "Super Admin demoted to Admin successfully",
      admin,
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    next(error);
  }
}

async function deleteAdminAccount(req, res, next) {
  try {
    const adminId = Number(req.params.id);

    if (!Number.isInteger(adminId) || adminId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid admin ID",
      });
    }

    if (adminId === Number(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: "You cannot delete your own account",
      });
    }

    const deletedAdmin = await deleteAdmin(adminId);

    return res.status(200).json({
      success: true,
      message: "Admin deleted successfully",
      admin: deletedAdmin,
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    next(error);
  }
}

module.exports = {
  getAdmins,
  createAdminAccount,
  promoteAdminAccount,
  demoteAdminAccount,
  deleteAdminAccount,
};
