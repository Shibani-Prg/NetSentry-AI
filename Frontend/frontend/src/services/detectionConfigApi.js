
import api from "./api";

export async function getDetectionConfig() {
  const response = await api.get("/api/detection-config");
  return response.data.config;
}

export async function updateDetectionConfig(config) {
  const response = await api.put("/api/detection-config", {
    failedLoginThreshold: config.failedLoginThreshold,
    detectionWindow: config.detectionWindow,
  });

  return response.data.config;
}
