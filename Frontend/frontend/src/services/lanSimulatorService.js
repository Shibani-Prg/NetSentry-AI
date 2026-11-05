
import api from "./api";

const generateEvent = async ({ username, eventType }) => {
  const response = await api.post("/demo-login/event", {
    username,
    event_type: eventType,
  });

  return response.data;
};

const lanSimulatorService = {
  generateEvent,
};

export default lanSimulatorService;
