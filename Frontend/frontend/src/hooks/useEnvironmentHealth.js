
import { useCallback, useState } from "react";
import api from "../services/api";

export function useEnvironmentHealth() {
  const [health, setHealth] = useState({
    backend: "unknown",
    database: "unknown",
    timestamp: null,
    error: "",
  });

  const [checking, setChecking] = useState(false);

  const checkHealth = useCallback(async () => {
    setChecking(true);

    setHealth((previous) => ({
      ...previous,
      backend: "checking",
      database: "checking",
      error: "",
    }));

    try {
      const response = await api.get("/api/health", {
        timeout: 10000,
      });

      const data = response.data;

      setHealth({
        backend:
          data?.backend === "connected"
            ? "connected"
            : "disconnected",
        database:
          data?.database === "connected"
            ? "connected"
            : "disconnected",
        timestamp: data?.timestamp || new Date().toISOString(),
        error: "",
      });
    } catch (error) {
      const data = error.response?.data;

      setHealth({
        backend:
          data?.backend === "connected"
            ? "connected"
            : "disconnected",
        database:
          data?.database === "connected"
            ? "connected"
            : "disconnected",
        timestamp: data?.timestamp || new Date().toISOString(),
        error:
          data?.message ||
          (error.code === "ECONNABORTED"
            ? "Health check timed out."
            : error.message || "Health check failed."),
      });
    } finally {
      setChecking(false);
    }
  }, []);

  return { health, checking, checkHealth };
}
