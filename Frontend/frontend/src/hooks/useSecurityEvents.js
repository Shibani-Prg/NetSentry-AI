
import { useEffect, useState } from "react";
import api from "../services/api";

export function useSecurityEvents() {
  const [events, setEvents] = useState([]);
  const [detections, setDetections] = useState([]);
  const [totalEvents, setTotalEvents] = useState(0);
  const [criticalTotal, setCriticalTotal] = useState(0);
  const [highTotal, setHighTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchSecurityData() {
      try {
        setError(null);

        const [eventsRes, criticalRes, highRes, detectionsRes] =
          await Promise.all([
            api.get("/api/events?page=1&limit=100"),
            api.get("/api/events?page=1&limit=1&severity=CRITICAL"),
            api.get("/api/events?page=1&limit=1&severity=HIGH"),
            api.get("/api/detections/failed-logins"),
          ]);

        if (cancelled) return;

        const eventsData = eventsRes.data;
        const criticalData = criticalRes.data;
        const highData = highRes.data;
        const detectionsData = detectionsRes.data;

        if (
          !Array.isArray(eventsData?.events) ||
          !criticalData?.pagination ||
          !highData?.pagination ||
          !Array.isArray(detectionsData?.detections)
        ) {
          throw new Error("Unexpected backend response format");
        }

        setEvents(eventsData.events);
        setTotalEvents(Number(eventsData.pagination.total));
        setCriticalTotal(Number(criticalData.pagination.total));
        setHighTotal(Number(highData.pagination.total));
        setDetections(detectionsData.detections);
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              err.message ||
              "Failed to load security data"
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchSecurityData();

    const intervalId = setInterval(fetchSecurityData, 15000);

    return () => {
      cancelled = true;
      clearInterval(intervalId);
    };
  }, []);

  return {
    events,
    detections,
    totalEvents,
    criticalTotal,
    highTotal,
    loading,
    error,
  };
}
