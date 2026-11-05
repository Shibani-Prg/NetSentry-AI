
import { useState } from "react";

import DemoHeader from "../components/demo/DemoHeader";
import DemoStatus from "../components/demo/DemoStatus";
import LoginSimulation from "../components/demo/LoginSimulation";
import EventSimulator from "../components/demo/EventSimulator";

import {
  recordFailedLogin,
  generateDemoEvent,
} from "../services/demoService";

export default function DemoLogin() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeEvent, setActiveEvent] = useState(null);

  const [status, setStatus] = useState(null);

  const showStatus = (type, message) => {
    setStatus({ type, message });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const cleanUsername = username.trim();

    if (!cleanUsername || cleanUsername.length > 50) {
      showStatus("error", "Please enter a valid username.");
      return;
    }

    try {
      setLoading(true);
      setActiveEvent("FAILED_LOGIN");
      setStatus(null);

      const data = await recordFailedLogin(cleanUsername);

      showStatus(
        "success",
        data.message || "Failed login event recorded successfully!"
      );
    } catch (error) {
      showStatus(
        "error",
        error.response?.data?.message ||
          "Unable to record failed login event. Check backend connection."
      );
    } finally {
      setLoading(false);
      setActiveEvent(null);
    }
  };

  const handleGenerateEvent = async (eventType) => {
    const cleanUsername = username.trim();

    if (!cleanUsername || cleanUsername.length > 50) {
      showStatus("error", "Please enter a valid username first.");
      return;
    }

    try {
      setLoading(true);
      setActiveEvent(eventType);
      setStatus(null);

      const data = await generateDemoEvent(
        cleanUsername,
        eventType
      );

      showStatus(
        "success",
        data.message || `${eventType} event recorded successfully!`
      );
    } catch (error) {
      showStatus(
        "error",
        error.response?.data?.message ||
          "Unable to generate event. Check backend connection."
      );
    } finally {
      setLoading(false);
      setActiveEvent(null);
    }
  };

  return (
    <main className="min-h-screen theme-bg theme-text px-4 py-8 sm:py-12 transition-colors duration-300">
      <div className="max-w-2xl mx-auto space-y-5">

        <DemoHeader />

        <DemoStatus status={status} />

        <LoginSimulation
          username={username}
          setUsername={setUsername}
          onSubmit={handleLogin}
          loading={loading && activeEvent === "FAILED_LOGIN"}
        />

        <EventSimulator
          onGenerate={handleGenerateEvent}
          loading={loading}
          activeEvent={activeEvent}
        />

        <footer className="text-center theme-text-secondary text-xs pt-5">
          <p>NetSentry AI · LAN Security Monitoring</p>
          <p className="mt-2">
            Events are recorded by the connected backend.
          </p>
        </footer>

      </div>
    </main>
  );
}
