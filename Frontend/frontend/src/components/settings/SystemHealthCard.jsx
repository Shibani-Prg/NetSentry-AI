import {
  Database,
  Server,
  RefreshCw,
  CheckCircle2,
  XCircle,
  CircleHelp,
} from "lucide-react";
import api from "../../services/api";

function HealthStatus({ status }) {
  if (status === "connected") {
    return (
      <span className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
        <CheckCircle2 size={15} /> Connected
      </span>
    );
  }

  if (status === "disconnected") {
    return (
      <span className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400">
        <XCircle size={15} /> Disconnected
      </span>
    );
  }

  if (status === "checking") {
    return (
      <span className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-300">
        <RefreshCw size={14} className="animate-spin" /> Checking
      </span>
    );
  }

  return (
    <span className="theme-text-secondary flex items-center gap-1.5 text-xs">
      <CircleHelp size={15} /> Not checked
    </span>
  );
}

function SystemHealthCard({ health, checking, onCheck }) {
  const apiUrl = api.defaults.baseURL || "Not configured";

  return (
    <section className="theme-surface theme-border rounded-xl border p-5">
      <div className="flex items-center gap-3">
        <Database size={21} className="text-teal-600 dark:text-teal-300" />
        <div>
          <h2 className="theme-text font-medium">System health</h2>
          <p className="theme-text-secondary mt-1 text-xs">
            Backend and database connectivity
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <span className="theme-text flex items-center gap-2 text-sm">
            <Server size={16} className="theme-text-secondary" />
            Backend API
          </span>
          <HealthStatus status={checking ? "checking" : health.backend} />
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="theme-text flex items-center gap-2 text-sm">
            <Database size={16} className="theme-text-secondary" />
            PostgreSQL
          </span>
          <HealthStatus status={checking ? "checking" : health.database} />
        </div>

        <div className="theme-surface-secondary theme-text-secondary break-all rounded-lg p-3 text-xs">
          API endpoint: {apiUrl}
        </div>

        {health.message && (
          <p role="alert" className="text-xs leading-5 text-rose-600 dark:text-rose-300">
            {health.message}
          </p>
        )}

        {health.timestamp && (
          <p className="theme-text-secondary text-xs">
            Last checked: {new Date(health.timestamp).toLocaleString()}
          </p>
        )}

        <button
          type="button"
          onClick={onCheck}
          disabled={checking}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-teal-500/20 bg-teal-500/10 px-4 py-2.5 text-sm text-teal-700 transition hover:bg-teal-500/15 disabled:opacity-50 dark:text-teal-300 dark:hover:bg-teal-300/10"
        >
          <RefreshCw
            size={15}
            className={checking ? "animate-spin" : ""}
          />
          {checking ? "Checking services..." : "Test Connection"}
        </button>
      </div>
    </section>
  );
}

export default SystemHealthCard;