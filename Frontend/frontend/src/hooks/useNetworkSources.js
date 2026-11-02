
import { useCallback, useEffect, useState } from "react";
import api from "../services/api";

function useNetworkSources() {
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  // Manual refresh
  const fetchSources = useCallback(async () => {
    setRefreshing(true);
    setError("");

    try {
      const response = await api.get("/api/network-sources");

      if (!Array.isArray(response.data.sources)) {
        throw new Error("Unexpected response from network sources API.");
      }

      setSources(response.data.sources);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to load network sources."
      );
    } finally {
      setRefreshing(false);
    }
  }, []);

  // Initial API fetch
  useEffect(() => {
    let cancelled = false;

    async function loadSources() {
      try {
        const response = await api.get("/api/network-sources");

        if (!Array.isArray(response.data.sources)) {
          throw new Error("Unexpected response from network sources API.");
        }

        if (!cancelled) {
          setSources(response.data.sources);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              err.message ||
              "Unable to load network sources."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadSources();

    return () => {
      cancelled = true;
    };
  }, []);

  const totalEvents = sources.reduce(
    (sum, source) => sum + Number(source.total_events || 0),
    0
  );

  const criticalEvents = sources.reduce(
    (sum, source) => sum + Number(source.critical_events || 0),
    0
  );

  return {
    sources,
    loading,
    refreshing,
    error,
    totalEvents,
    criticalEvents,
    refreshSources: fetchSources,
  };
}

export default useNetworkSources;
