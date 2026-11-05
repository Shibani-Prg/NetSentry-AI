import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import api from "../services/api";
import useAuth from "./useAuth";
import { useEnvironmentHealth } from "./useEnvironmentHealth";

const pageNames = {
  "/": "Security Overview",
  "/events": "Security Events",
  "/detections": "Threat Detections",
  "/sources": "Network Sources",
  "/reports": "Security Reports",
  "/settings": "Settings",
};

export default function useTopbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [searching, setSearching] = useState(false);

  const [environmentOpen, setEnvironmentOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  const { health, checking, checkHealth } = useEnvironmentHealth();

  const title = pageNames[location.pathname] || "NetSentry AI";
  const apiUrl = api.defaults.baseURL || "API URL not configured";

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setLogoutConfirmOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function updateSearchQuery(value) {
    setSearchQuery(value);
    setSearchStatus("");
  }

  async function handleSearch(event) {
    event.preventDefault();

    const query = searchQuery.trim();

    if (!query || searching) return;

    setSearching(true);
    setSearchStatus("");

    try {
      const response = await api.get("/api/events", {
        params: {
          page: 1,
          limit: 1,
          search: query,
        },
      });

      const total = Number(response.data?.pagination?.total);

      if (!Number.isFinite(total)) {
        throw new Error("Unexpected response from events API.");
      }

      if (total === 0) {
        setSearchStatus("notFound");
        return;
      }

      setSearchOpen(false);
      navigate(`/events?search=${encodeURIComponent(query)}`);
    } catch (error) {
      setSearchStatus(
        error.response?.data?.message || "Unable to search security events. Please try again."
      );
    } finally {
      setSearching(false);
    }
  }

  function toggleEnvironment() {
    const nextState = !environmentOpen;

    setEnvironmentOpen(nextState);

    if (nextState) {
      checkHealth();
    }
  }

  function goToDashboard() {
    setEnvironmentOpen(false);
    navigate("/");
  }

  function confirmLogout() {
    logout();
    setLogoutConfirmOpen(false);
    setEnvironmentOpen(false);
    navigate("/login", { replace: true });
  }

  return {
    title,
    apiUrl,
    health,
    checking,

    searchOpen,
    searchQuery,
    setSearchQuery: updateSearchQuery,
    setSearchOpen,
    handleSearch,
    searchStatus,
    searching,

    environmentOpen,
    setEnvironmentOpen,
    toggleEnvironment,
    checkHealth,
    goToDashboard,

    logoutConfirmOpen,
    setLogoutConfirmOpen,
    confirmLogout,

    navigate,
  };
}