
export const ADMIN_ROLES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
};

export const ADMIN_ROLE_OPTIONS = [
  { label: "All Roles", value: "all" },
  { label: "Super Admin", value: ADMIN_ROLES.SUPER_ADMIN },
  { label: "Admin", value: ADMIN_ROLES.ADMIN },
];

export const ADMIN_TABS = [
  { label: "All Admins", value: "all" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

export const ADMIN_STATUS = {
  ACTIVE: true,
  INACTIVE: false,
};

export const ADMIN_VALIDATION = {
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 100,
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 72,
};

export const ADMIN_MESSAGES = {
  FETCH_ERROR: "Unable to fetch admins. Please try again.",
  CREATE_SUCCESS: "Admin created successfully.",
  CREATE_ERROR: "Unable to create admin. Please try again.",
  UPDATE_SUCCESS: "Admin updated successfully.",
  DELETE_SUCCESS: "Admin deleted successfully.",
};
