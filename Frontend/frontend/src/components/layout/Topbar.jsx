
import { useEffect, useState } from "react";
import {
  Bell,
  Search,
  ShieldCheck,
  Menu,
  LogOut,
  X,
  AlertTriangle,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import api from "../../services/api";
import EnvironmentPanel from "./EnvironmentPanel";
import GlobalSearch from "./GlobalSearch";
import { useEnvironmentHealth } from "../../hooks/useEnvironmentHealth.js";
import useAuth from "../../hooks/useAuth";

const pageNames = {
  "/": "Security Overview",
  "/events": "Security Events",
  "/detections": "Threat Detections",
  "/sources": "Network Sources",
  "/reports": "Security Reports",
  "/settings": "Settings",
};

function Topbar({ onMenuClick }) {
  const location = useLocation();
  const navigate = useNavigate();

  const { logout } = useAuth();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [environmentOpen, setEnvironmentOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  const { health, checking, checkHealth } = useEnvironmentHealth();

  const title = pageNames[location.pathname] || "NetSentry AI";
  const apiUrl = api.defaults.baseURL || "API URL not configured";

  // Close confirmation modal with Escape key
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

  // Open confirmation modal instead of logging out immediately
  function handleLogout() {
    setLogoutConfirmOpen(true);
  }

  // Logout only after confirmation
  function confirmLogout() {
    logout();
    setLogoutConfirmOpen(false);
    setEnvironmentOpen(false);
    navigate("/login", { replace: true });
  }

  return (
    <>
      <header className="sticky top-0 z-30 flex min-h-[68px] w-full min-w-0 items-center justify-between gap-2 border-b border-white/[0.07] bg-[#090d14]/95 px-3 py-3 backdrop-blur-xl sm:min-h-[76px] sm:gap-4 sm:px-5 md:px-7">

        {/* Page title and mobile menu */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open navigation menu"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] text-slate-300 transition hover:bg-white/[0.05] hover:text-teal-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 lg:hidden"
          >
            <Menu size={20} />
          </button>

          <div className="min-w-0">
            <p className="truncate text-[10px] text-slate-500 sm:text-xs">
              NetSentry AI / Workspace
            </p>
            <h2 className="mt-1 truncate text-sm font-semibold text-white sm:text-base md:text-lg">
              {title}
            </h2>
          </div>
        </div>

        {/* Header actions */}
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
            <span className="hidden sm:inline">
              LOCAL ENVIRONMENT
            </span>
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

          {/* Admin logout */}
          <button
            type="button"
            onClick={handleLogout}
            title="Sign out"
            aria-label="Sign out"
            className="flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-rose-400/20 bg-rose-400/[0.05] px-2.5 text-rose-400 transition hover:border-rose-400/40 hover:bg-rose-400/10 sm:px-3"
          >
            <LogOut size={17} />
            <span className="hidden text-xs font-medium sm:inline">
              Logout
            </span>
          </button>
        </div>
      </header>

      {/* Environment panel */}
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

      {/* Global search */}
      <GlobalSearch
        open={searchOpen}
        query={searchQuery}
        setQuery={setSearchQuery}
        onClose={() => setSearchOpen(false)}
        onSubmit={handleSearch}
      />

      {/* Logout confirmation modal */}
      {logoutConfirmOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
          onClick={() => setLogoutConfirmOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-title"
            aria-describedby="logout-description"
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#101722] p-6 shadow-2xl shadow-black/50"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setLogoutConfirmOpen(false)}
              aria-label="Close confirmation"
              className="absolute right-4 top-4 rounded-lg p-2 text-slate-500 transition hover:bg-white/5 hover:text-white"
            >
              <X size={18} />
            </button>

            {/* Warning icon */}
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-rose-400/20 bg-rose-400/10">
              <AlertTriangle
                size={27}
                className="text-rose-400"
              />
            </div>

            <h2
              id="logout-title"
              className="text-xl font-semibold text-white"
            >
              Confirm Logout
            </h2>

            <p
              id="logout-description"
              className="mt-3 text-sm leading-6 text-slate-400"
            >
              Are you sure you want to log out of NetSentry AI?
              You will need to sign in again to access the security
              dashboard.
            </p>

            {/* Action buttons */}
            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setLogoutConfirmOpen(false)}
                className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmLogout}
                className="flex items-center justify-center gap-2 rounded-xl border border-rose-400/30 bg-rose-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
              >
                <LogOut size={16} />
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Topbar;
