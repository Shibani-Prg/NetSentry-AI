
import { ADMIN_VALIDATION } from "../../constants/admin.constants";

export const validateAdminName = (name) => {
  const value = name.trim();

  if (value.length < ADMIN_VALIDATION.MIN_NAME_LENGTH) {
    return "Name must contain at least 2 characters.";
  }

  if (value.length > ADMIN_VALIDATION.MAX_NAME_LENGTH) {
    return "Name cannot exceed 100 characters.";
  }

  return "";
};

export const validateAdminEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email.trim())) {
    return "Please enter a valid email address.";
  }

  return "";
};

export const validateAdminPassword = (password) => {
  if (password.length < ADMIN_VALIDATION.MIN_PASSWORD_LENGTH) {
    return "Password must contain at least 8 characters.";
  }

  if (password.length > ADMIN_VALIDATION.MAX_PASSWORD_LENGTH) {
    return "Password cannot exceed 72 characters.";
  }

  return "";
};
