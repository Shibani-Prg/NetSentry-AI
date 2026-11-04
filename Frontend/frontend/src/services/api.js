import axios from "axios";

const api = axios.create({
  baseURL: (
    import.meta.env.VITE_API_URL || "http://localhost:5000"
  ).replace(/\/+$/, ""),
});

// Attach JWT token to API requests
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("netsentry_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;