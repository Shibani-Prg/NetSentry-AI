
import { useState } from "react";

import {
  createAdmin,
  promoteAdmin,
  demoteAdmin,
  deleteAdmin,
} from "../services/admin.service";

export default function useAdminActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Common API Action Handler
  const executeAction = async (apiFunction, successMessage) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await apiFunction();

      setSuccess(response.message || successMessage);

      return response;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";

      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Create Admin
  const handleCreateAdmin = (adminData) => {
    return executeAction(
      () => createAdmin(adminData),
      "Admin created successfully."
    );
  };

  // Promote Admin
  const handlePromoteAdmin = (adminId) => {
    return executeAction(
      () => promoteAdmin(adminId),
      "Admin promoted successfully."
    );
  };

  // Demote Super Admin
  const handleDemoteAdmin = (adminId) => {
    return executeAction(
      () => demoteAdmin(adminId),
      "Super Admin demoted successfully."
    );
  };

  // Delete Admin
  const handleDeleteAdmin = (adminId) => {
    return executeAction(
      () => deleteAdmin(adminId),
      "Admin deleted successfully."
    );
  };

  // Clear Messages
  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  return {
    loading,
    error,
    success,
    handleCreateAdmin,
    handlePromoteAdmin,
    handleDemoteAdmin,
    handleDeleteAdmin,
    clearMessages,
  };
}
