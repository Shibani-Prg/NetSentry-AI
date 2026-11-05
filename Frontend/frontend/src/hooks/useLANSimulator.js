
import { useState } from "react";
import lanSimulatorService from "../services/lanSimulatorService";
import { EVENT_TYPES } from "../constants/lanSimulator";

export const useLANSimulator = () => {
  const [username, setUsername] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("FAILED_LOGIN");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [attempts, setAttempts] = useState(0);
  const [eventHistory, setEventHistory] = useState([]);

  const generateEvent = async (e) => {
    e.preventDefault();

    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      setError("Please enter a demo username.");
      setMessage("");
      return;
    }

    if (trimmedUsername.length > 50) {
      setError("Username cannot exceed 50 characters.");
      setMessage("");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const data = await lanSimulatorService.generateEvent({
        username: trimmedUsername,
        eventType: selectedEvent,
      });

      const eventConfig = EVENT_TYPES.find(
        (event) => event.value === selectedEvent
      );

      const newEvent = {
        id: `${Date.now()}-${Math.random()}`,
        username: trimmedUsername,
        eventType: selectedEvent,
        eventLabel: eventConfig?.label || selectedEvent,
        severity: eventConfig?.severity || "LOW",
        timestamp: new Date().toLocaleString(),
        sourceIP: data?.event?.source_ip || data?.source_ip || "Captured by server",
      };

      setEventHistory((previous) => [
        newEvent,
        ...previous,
      ]);

      setAttempts((previous) => previous + 1);
      setMessage(data.message || "Demo event generated successfully!");
      setUsername("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Unable to generate event. Please check the backend connection."
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    username,
    setUsername,
    selectedEvent,
    setSelectedEvent,
    loading,
    message,
    error,
    attempts,
    eventHistory,
    generateEvent,
  };
};
