
import { useEffect, useState } from "react";
import {
  Network,
  Server,
  ShieldCheck,
  RefreshCw,
  Activity,
  AlertTriangle,
} from "lucide-react";
import api from "../services/api";

function NetworkSources() {
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  async function fetchSources(isRefresh = false) {
    if (isRefresh) setRefreshing(true);
    setError("");

    try {
      const response = await api.get("/api/network-sources");
      const data = response.data;

      if (!Array.isArray(data.sources)) {
        throw new Error("Unexpected response from network sources API.");
      }

      setSources(data.sources);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to load network sources."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    let cancelled = false;

    async function loadSources() {
      try {
        const response = await api.get("/api/network-sources");

        if (!Array.isArray(response.data.sources)) {
          throw new Error("Unexpected response from network sources API.");
        }

        if (!cancelled) setSources(response.data.sources);
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              err.message ||
              "Unable to load network sources."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
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

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-teal-300/20 bg-teal-300/10 p-3 text-teal-300">
            <Network size={24} />
          </div>

          <div>
            <p className="text-xs tracking-widest text-teal-300">
              INFRASTRUCTURE
            </p>
            <h1 className="mt-1 text-2xl font-semibold text-white">
              Network Sources
            </h1>
          </div>
        </div>

        <button
          type="button"
          onClick={() => fetchSources(true)}
          disabled={loading || refreshing}
          className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-200 hover:bg-white/5 disabled:opacity-50"
        >
          <RefreshCw
            size={16}
            className={refreshing ? "animate-spin" : ""}
          />
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <p className="text-sm text-slate-400">
        Monitor registered event sources and inspect their security activity.
      </p>

      {error && (
        <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4">
          <p className="text-sm text-rose-300">{error}</p>
          <button
            type="button"
            onClick={() => fetchSources(true)}
            className="mt-2 text-sm text-teal-300"
          >
            Try again
          </button>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryCard
          icon={<Server size={20} />}
          title="Registered Sources"
          value={loading ? "—" : sources.length}
          color="text-teal-300"
        />

        <SummaryCard
          icon={<Activity size={20} />}
          title="Total Events"
          value={loading ? "—" : totalEvents.toLocaleString("en-IN")}
          color="text-indigo-300"
        />

        <SummaryCard
          icon={<ShieldCheck size={20} />}
          title="Critical Events"
          value={loading ? "—" : criticalEvents.toLocaleString("en-IN")}
          color="text-rose-300"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#10151e]">
        <div className="border-b border-white/[0.08] p-5">
          <h2 className="font-semibold text-white">Registered Sources</h2>
          <p className="mt-1 text-sm text-slate-400">
            Source inventory and associated security events from PostgreSQL.
          </p>
        </div>

        {loading ? (
          <p className="p-8 text-center text-sm text-slate-400">
            Loading network sources...
          </p>
        ) : !error && sources.length === 0 ? (
          <div className="p-10 text-center">
            <Network size={32} className="mx-auto text-slate-500" />
            <p className="mt-3 font-medium text-slate-200">
              No registered sources found
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Add a source record to your database to display it here.
            </p>
          </div>
        ) : (
          !error && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead className="bg-white/[0.02] text-xs uppercase tracking-wide text-slate-400">
                  <tr className="border-b border-white/10">
                    <th className="px-5 py-4">Source</th>
                    <th className="px-5 py-4">IP Address</th>
                    <th className="px-5 py-4">Total Events</th>
                    <th className="px-5 py-4">Critical Events</th>
                    <th className="px-5 py-4">Last Activity</th>
                  </tr>
                </thead>

                <tbody>
                  {sources.map((source) => (
                    <tr
                      key={source.id}
                      className="border-b border-white/[0.06] last:border-0 hover:bg-white/[0.02]"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-teal-300/10 p-2 text-teal-300">
                            <Server size={17} />
                          </div>
                          <div>
                            <p className="font-medium text-white">
                              {source.source_name}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              Source ID: {source.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 font-mono text-slate-300">
                        {source.ip_address || "Not assigned"}
                      </td>

                      <td className="px-5 py-4 text-slate-200">
                        {Number(source.total_events || 0).toLocaleString("en-IN")}
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-2 text-slate-200">
                          {Number(source.critical_events || 0) > 0 && (
                            <AlertTriangle
                              size={15}
                              className="text-rose-300"
                            />
                          )}
                          {Number(source.critical_events || 0)}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-slate-400">
                        {source.last_event_at
                          ? new Date(source.last_event_at).toLocaleString()
                          : "No events yet"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>
    </section>
  );
}

function SummaryCard({ icon, title, value, color }) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#10151e] p-5">
      <div className={`mb-4 ${color}`}>{icon}</div>
      <p className="text-sm text-slate-400">{title}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}

export default NetworkSources;
