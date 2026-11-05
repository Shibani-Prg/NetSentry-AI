
import api from "./api";

export const recordFailedLogin = async (username) => {
  const response = await api.post("/demo-login/attempt", {
    username,
  });

  return response.data;
};

export const generateDemoEvent = async (username, eventType) => {
  const response = await api.post("/demo-login/event", {
    username,
    event_type: eventType,
  });

  return response.data;
};

export const getDemoInfo = async () => {
  const response = await api.get("/demo-login/info");

  return response.data;
};
