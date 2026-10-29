
import { useState } from "react";
import api from "../services/api";

export default function useSystemHealth() {
  const [health, setHealth] = useState({
    backend: "unknown",
    database: "unknown",
    message: "",
    timestamp: null,
  });

  const [checking, setChecking] = useState(false);

  async function checkConnection() {
    setChecking(true);

    try {
      const { data } = await api.get("/api/health", {
        timeout: 10000,
      });

      setHealth({
        backend:
          data?.backend === "connected" ? "connected" : "disconnected",
        database:
          data?.database === "connected" ? "connected" : "disconnected",
        message: data?.message || "",
        timestamp: data?.timestamp || new Date().toISOString(),
      });
    } catch (error) {
      const data = error.response?.data;

      setHealth({
        backend:
          data?.backend === "connected" ? "connected" : "disconnected",
        database:
          data?.database === "connected" ? "connected" : "disconnected",
        message:
          data?.message || error.message || "Health check failed.",
        timestamp: new Date().toISOString(),
      });
    } finally {
      setChecking(false);
    }
  }

  return { health, checking, checkConnection };
}
