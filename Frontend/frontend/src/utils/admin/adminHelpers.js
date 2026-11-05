
import { ADMIN_ROLES } from "../../constants/admin.constants";

// Format admin role for display
export const formatAdminRole = (role) => {
  const roles = {
    [ADMIN_ROLES.SUPER_ADMIN]: "Super Admin",
    [ADMIN_ROLES.ADMIN]: "Admin",
  };

  return roles[role] || "Unknown Role";
};

// Format active/inactive status
export const formatAdminStatus = (isActive) => {
  return isActive ? "Active" : "Inactive";
};

// Format date
export const formatAdminDate = (date) => {
  if (!date) return "N/A";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "N/A";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// Search admins by name or email
export const searchAdmins = (admins, search) => {
  const query = search.trim().toLowerCase();

  if (!query) return admins;

  return admins.filter(
    (admin) =>
      admin.name?.toLowerCase().includes(query) ||
      admin.email?.toLowerCase().includes(query)
  );
};

// Filter admins by role
export const filterAdminsByRole = (admins, role) => {
  if (role === "all") return admins;

  return admins.filter((admin) => admin.role === role);
};

// Calculate admin statistics
export const getAdminStats = (admins = []) => {
  return {
    total: admins.length,
    active: admins.filter((admin) => admin.is_active).length,
    inactive: admins.filter((admin) => !admin.is_active).length,
    superAdmins: admins.filter(
      (admin) => admin.role === ADMIN_ROLES.SUPER_ADMIN
    ).length,
  };
};
