
const express = require("express");

const {
  getAdmins,
  createAdminAccount,
  promoteAdminAccount,
  demoteAdminAccount,
  deleteAdminAccount,
} = require("../controllers/admins.controller");

const { createAdminSchema } = require("../validators/admins.schema");

const router = express.Router();

// List all admin accounts
router.get("/", getAdmins);

// Create a new admin account
router.post("/", (req, res, next) => {
  const validation = createAdminSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid admin details",
      errors: validation.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  req.body = validation.data;
  next();
}, createAdminAccount);

// Promote Admin to Super Admin
router.patch("/:id/promote", promoteAdminAccount);

// Demote Super Admin to Admin
router.patch("/:id/demote", demoteAdminAccount);

// Delete an admin account
router.delete("/:id", deleteAdminAccount);

module.exports = router;
