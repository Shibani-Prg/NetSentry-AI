
import api from "./api";

// Get All Admins
export const getAdmins = async () => {
  const response = await api.get("/api/admins");
  return response.data;
};

// Create New Admin
export const createAdmin = async (adminData) => {
  const response = await api.post("/api/admins", adminData);
  return response.data;
};

// Promote Admin to Super Admin
export const promoteAdmin = async (adminId) => {
  const response = await api.patch(
    `/api/admins/${adminId}/promote`
  );
  return response.data;
};

// Demote Super Admin to Admin
export const demoteAdmin = async (adminId) => {
  const response = await api.patch(
    `/api/admins/${adminId}/demote`
  );
  return response.data;
};

// Delete Admin
export const deleteAdmin = async (adminId) => {
  const response = await api.delete(
    `/api/admins/${adminId}`
  );
  return response.data;
};
