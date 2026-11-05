
import {
  X,
  Server,
  Database,
  Home,
  RefreshCw,
  Clock3,
} from "lucide-react";

import StatusBadge from "../StatusBadge";

function EnvironmentPanel({
  health,
  checking,
  checkHealth,
  apiUrl,
  onClose,
  onDashboard,
}) {
  return (
    <div
      className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        id="environment-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="environment-title"
        className="theme-surface theme-border theme-text absolute right-3 top-[82px] max-h-[calc(100vh-100px)] w-[calc(100%-1.5rem)] max-w-sm overflow-y-auto rounded-xl border p-5 shadow-2xl transition-colors duration-200 sm:right-7 sm:top-[90px]"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3
              id="environment-title"
              className="font-semibold"
            >
              Local Environment
            </h3>

            <p className="theme-text-secondary mt-1 text-xs">
              Live service connectivity
            </p>
          </div>

          <button
            type="button"
            aria-label="Close environment panel"
            onClick={onClose}
            className="theme-text-secondary rounded-lg p-2 transition hover:bg-black/5 hover:text-teal-600 dark:hover:bg-white/5 dark:hover:text-teal-300"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-5 space-y-3">

          {/* Frontend */}
          <div className="theme-border rounded-lg border p-3">
            <div className="flex items-center gap-3">
              <Server size={19} className="shrink-0 text-teal-600 dark:text-teal-300" />

              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm">Frontend</p>

                <p className="theme-text-secondary mt-1 text-xs">
                  React application
                </p>
              </div>

              <span className="text-xs text-emerald-600 dark:text-emerald-400">
                Loaded
              </span>
            </div>
          </div>

          {/* Backend */}
          <div className="theme-border rounded-lg border p-3">
            <div className="flex items-start gap-3">
              <Server size={19} className="mt-0.5 shrink-0 text-indigo-500 dark:text-indigo-300" />

              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm">Backend API</p>

                <p className="theme-text-secondary mt-1 break-all text-xs">
                  {apiUrl}
                </p>
              </div>

              <StatusBadge status={health.backend} />
            </div>
          </div>

          {/* Database */}
          <div className="theme-border rounded-lg border p-3">
            <div className="flex items-start gap-3">
              <Database size={19} className="mt-0.5 shrink-0 text-indigo-500 dark:text-indigo-300" />

              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm">PostgreSQL</p>

                <p className="theme-text-secondary mt-1 text-xs">
                  Database connectivity
                </p>
              </div>

              <StatusBadge status={health.database} />
            </div>
          </div>
        </div>

        {/* Error */}
        {health.error && (
          <div
            role="alert"
            className="mt-3 rounded-lg border border-rose-500/20 bg-rose-500/5 p-3 text-xs leading-relaxed text-rose-600 dark:text-rose-300"
          >
            {health.error}
          </div>
        )}

        {/* Last Checked */}
        {health.timestamp && (
          <p className="theme-text-secondary mt-3 flex items-center gap-1.5 text-xs">
            <Clock3 size={13} />
            Last checked: {new Date(health.timestamp).toLocaleString()}
          </p>
        )}

        {/* Refresh Status */}
        <button
          type="button"
          onClick={checkHealth}
          disabled={checking}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-teal-500/20 bg-teal-500/5 px-4 py-2.5 text-sm font-medium text-teal-700 transition hover:bg-teal-500/10 disabled:cursor-not-allowed disabled:opacity-60 dark:text-teal-300"
        >
          <RefreshCw
            size={16}
            className={checking ? "animate-spin" : ""}
          />

          {checking ? "Checking Services..." : "Refresh Status"}
        </button>

        {/* Dashboard */}
        <button
          type="button"
          onClick={onDashboard}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
        >
          <Home size={16} />
          Back to Dashboard
        </button>

        <p className="theme-text-secondary mt-3 text-xs leading-relaxed">
          Backend and database status comes from the health API. Frontend
          indicates that this page is loaded.
        </p>
      </section>
    </div>
  );
}

export default EnvironmentPanel;
