import {
  X,
  Server,
  Database,
  Home,
  RefreshCw,
  Clock3,
} from "lucide-react";
import StatusBadge from "./StatusBadge";

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
        className="absolute right-3 top-[82px] max-h-[calc(100vh-100px)] w-[calc(100%-1.5rem)] max-w-sm overflow-y-auto rounded-xl border border-white/10 bg-[#10151e] p-5 shadow-2xl sm:right-7 sm:top-[90px]"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3
              id="environment-title"
              className="font-semibold text-white"
            >
              Local Environment
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Live service connectivity
            </p>
          </div>

          <button
            type="button"
            aria-label="Close environment panel"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-5 space-y-3">
          <div className="rounded-lg border border-white/[0.08] p-3">
            <div className="flex items-center gap-3">
              <Server size={19} className="shrink-0 text-teal-300" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white">Frontend</p>
                <p className="mt-1 text-xs text-slate-400">
                  React application
                </p>
              </div>
              <span className="text-xs text-emerald-400">Loaded</span>
            </div>
          </div>

          <div className="rounded-lg border border-white/[0.08] p-3">
            <div className="flex items-start gap-3">
              <Server size={19} className="mt-0.5 shrink-0 text-indigo-300" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white">Backend API</p>
                <p className="mt-1 break-all text-xs text-slate-400">
                  {apiUrl}
                </p>
              </div>
              <StatusBadge status={health.backend} />
            </div>
          </div>

          <div className="rounded-lg border border-white/[0.08] p-3">
            <div className="flex items-start gap-3">
              <Database size={19} className="mt-0.5 shrink-0 text-indigo-300" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white">PostgreSQL</p>
                <p className="mt-1 text-xs text-slate-400">
                  Database connectivity
                </p>
              </div>
              <StatusBadge status={health.database} />
            </div>
          </div>
        </div>

        {health.error && (
          <div
            role="alert"
            className="mt-3 rounded-lg border border-rose-400/20 bg-rose-400/[0.06] p-3 text-xs leading-relaxed text-rose-300"
          >
            {health.error}
          </div>
        )}

        {health.timestamp && (
          <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
            <Clock3 size={13} />
            Last checked: {new Date(health.timestamp).toLocaleString()}
          </p>
        )}

        <button
          type="button"
          onClick={checkHealth}
          disabled={checking}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-teal-300/20 bg-teal-300/[0.08] px-4 py-2.5 text-sm font-medium text-teal-300 transition hover:bg-teal-300/[0.15] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw
            size={16}
            className={checking ? "animate-spin" : ""}
          />
          {checking ? "Checking Services..." : "Refresh Status"}
        </button>

        <button
          type="button"
          onClick={onDashboard}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-teal-400 px-4 py-2.5 text-sm font-semibold text-[#07110f] transition hover:bg-teal-300"
        >
          <Home size={16} />
          Back to Dashboard
        </button>

        <p className="mt-3 text-xs leading-relaxed text-slate-500">
          Backend and database status comes from the health API. Frontend
          indicates that this page is loaded.
        </p>
      </section>
    </div>
  );
}

export default EnvironmentPanel;