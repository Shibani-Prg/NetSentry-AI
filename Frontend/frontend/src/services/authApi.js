
import api from "./api";

// Admin Login
export const loginAdmin = async (credentials) => {
  const response = await api.post(
    "/api/auth/login",
    credentials
  );

  return response.data;
};

// Get Current User
export const getCurrentUser = async () => {
  const response = await api.get("/api/auth/me");

  return response.data;
};
