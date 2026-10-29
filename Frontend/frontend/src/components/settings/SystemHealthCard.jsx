
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
      <span className="flex items-center gap-1.5 text-xs text-emerald-400">
        <CheckCircle2 size={15} /> Connected
      </span>
    );
  }

  if (status === "disconnected") {
    return (
      <span className="flex items-center gap-1.5 text-xs text-rose-400">
        <XCircle size={15} /> Disconnected
      </span>
    );
  }

  if (status === "checking") {
    return (
      <span className="flex items-center gap-1.5 text-xs text-amber-300">
        <RefreshCw size={14} className="animate-spin" /> Checking
      </span>
    );
  }

  return (
    <span className="flex items-center gap-1.5 text-xs text-slate-500">
      <CircleHelp size={15} /> Not checked
    </span>
  );
}

function SystemHealthCard({ health, checking, onCheck }) {
  const apiUrl = api.defaults.baseURL || "Not configured";

  return (
    <section className="rounded-xl border border-white/[0.08] bg-[#10151e] p-5">
      <div className="flex items-center gap-3">
        <Database size={21} className="text-teal-300" />
        <div>
          <h2 className="font-medium text-white">System health</h2>
          <p className="mt-1 text-xs text-slate-500">
            Backend and database connectivity
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 text-sm text-slate-300">
            <Server size={16} className="text-slate-500" />
            Backend API
          </span>
          <HealthStatus status={checking ? "checking" : health.backend} />
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 text-sm text-slate-300">
            <Database size={16} className="text-slate-500" />
            PostgreSQL
          </span>
          <HealthStatus status={checking ? "checking" : health.database} />
        </div>

        <div className="break-all rounded-lg bg-black/20 p-3 text-xs text-slate-400">
          API endpoint: {apiUrl}
        </div>

        {health.message && (
          <p role="alert" className="text-xs leading-5 text-rose-300">
            {health.message}
          </p>
        )}

        {health.timestamp && (
          <p className="text-xs text-slate-500">
            Last checked: {new Date(health.timestamp).toLocaleString()}
          </p>
        )}

        <button
          type="button"
          onClick={onCheck}
          disabled={checking}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-teal-300/20 bg-teal-300/[0.06] px-4 py-2.5 text-sm text-teal-300 transition hover:bg-teal-300/10 disabled:opacity-50"
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
