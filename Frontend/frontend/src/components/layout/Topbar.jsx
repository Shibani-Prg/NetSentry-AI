import { useState } from "react";
import { Bell, Search, ShieldCheck } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import api from "../../services/api";
import EnvironmentPanel from "./EnvironmentPanel";
import GlobalSearch from "./GlobalSearch";
import { useEnvironmentHealth } from "../../hooks/useEnvironmentHealth.js";

const pageNames = {
  "/": "Security Overview",
  "/events": "Security Events",
  "/detections": "Threat Detections",
  "/sources": "Network Sources",
  "/reports": "Security Reports",
  "/settings": "Settings",
};

function Topbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [environmentOpen, setEnvironmentOpen] = useState(false);

  const { health, checking, checkHealth } = useEnvironmentHealth();

  const title = pageNames[location.pathname] || "NetSentry AI";
  const apiUrl = api.defaults.baseURL || "API URL not configured";

  function handleSearch(event) {
    event.preventDefault();

    const query = searchQuery.trim();
    if (!query) return;

    navigate(`/events?search=${encodeURIComponent(query)}`);
    setSearchOpen(false);
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

  return (
    <>
      <header className="sticky top-0 z-30 flex min-h-[68px] w-full min-w-0 items-center justify-between gap-2 border-b border-white/[0.07] bg-[#090d14]/95 px-3 py-3 backdrop-blur-xl sm:min-h-[76px] sm:gap-4 sm:px-5 md:px-7">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[10px] text-slate-500 sm:text-xs">
            NetSentry AI / Workspace
          </p>
          <h2 className="mt-1 truncate text-sm font-semibold text-white sm:text-base md:text-lg">
            {title}
          </h2>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <button
            type="button"
            onClick={toggleEnvironment}
            aria-expanded={environmentOpen}
            aria-controls="environment-panel"
            title="Toggle local environment panel"
            className={`flex shrink-0 items-center gap-2 rounded-lg border px-2 py-2 text-[9px] transition sm:px-3 sm:text-[10px] ${
              environmentOpen
                ? "border-teal-300/40 bg-teal-300/10 text-teal-300"
                : "border-white/[0.08] text-slate-400 hover:border-teal-300/30 hover:text-teal-300"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                health.backend === "connected"
                  ? "bg-emerald-400"
                  : health.backend === "disconnected"
                    ? "bg-rose-400"
                    : "bg-teal-300"
              }`}
            />
            <span className="hidden sm:inline">LOCAL ENVIRONMENT</span>
            <span className="sm:hidden">ENV</span>
          </button>

          <button
            type="button"
            aria-label="Search security events"
            title="Search security events"
            onClick={() => setSearchOpen(true)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] text-slate-400 transition hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
          >
            <Search size={18} />
          </button>

          <button
            type="button"
            aria-label="Open threat detections"
            title="Open threat detections"
            onClick={() => navigate("/detections")}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] text-slate-400 transition hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
          >
            <Bell size={18} />
          </button>

          <button
            type="button"
            aria-label="View threat detections"
            title="View threat detections"
            onClick={() => navigate("/detections")}
            className="hidden shrink-0 rounded-lg border border-teal-300/10 bg-teal-300/[0.05] p-2 text-teal-300 transition hover:bg-teal-300/10 sm:block"
          >
            <ShieldCheck size={18} />
          </button>
        </div>
      </header>

      {environmentOpen && (
        <EnvironmentPanel
          health={health}
          checking={checking}
          checkHealth={checkHealth}
          apiUrl={apiUrl}
          onClose={() => setEnvironmentOpen(false)}
          onDashboard={goToDashboard}
        />
      )}

      <GlobalSearch
        open={searchOpen}
        query={searchQuery}
        setQuery={setSearchQuery}
        onClose={() => setSearchOpen(false)}
        onSubmit={handleSearch}
      />
    </>
  );
}

export default Topbar;