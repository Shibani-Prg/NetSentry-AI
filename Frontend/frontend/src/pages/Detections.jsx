
import { useEffect, useState } from "react";
import {
  ShieldAlert,
  RefreshCw,
  AlertTriangle,
  Activity,
} from "lucide-react";
import api from "../services/api";

async function getDetections() {
  const response = await api.get("/api/detections/failed-logins");

  if (!Array.isArray(response.data.detections)) {
    throw new Error("Unexpected response from detections API.");
  }

  return response.data.detections;
}

function Detections() {
  const [detections, setDetections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

 async function fetchDetections(isRefresh = false) {
  if (isRefresh) {
    setRefreshing(true);
  }

  setError("");

  try {
    const data = await getDetections();
    setDetections(data);
  } catch (err) {
    setError(
      err.response?.data?.message ||
        err.message ||
        "Unable to load detections."
    );
  } finally {
    setLoading(false);
    setRefreshing(false);
  }
}

useEffect(() => {
  let ignore = false;

  async function loadDetections() {
    try {
      const data = await getDetections();

      if (!ignore) {
        setDetections(data);
      }
    } catch (err) {
      if (!ignore) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Unable to load detections."
        );
      }
    } finally {
      if (!ignore) {
        setLoading(false);
      }
    }
  }

  loadDetections();

  return () => {
    ignore = true;
  };
}, []);

  return (
    <section className="space-y-6">
      {/* Page heading */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-rose-400/20 bg-rose-400/10 p-3 text-rose-300">
            <ShieldAlert size={24} />
          </div>

          <div>
            <p className="text-xs tracking-widest text-teal-300">
              THREAT MONITORING
            </p>

            <h1 className="mt-1 text-2xl font-semibold text-white">
              Threat Detections
            </h1>
          </div>
        </div>

        <button
          type="button"
          onClick={() => fetchDetections(true)}
          disabled={loading || refreshing}
          className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw
            size={16}
            className={refreshing ? "animate-spin" : ""}
          />
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <p className="text-sm leading-6 text-slate-400">
        Monitor failed-login detections and investigate suspicious
        IP addresses identified by your detection rules.
      </p>

      {/* Detection summary */}
      <div className="rounded-xl border border-white/[0.08] bg-[#10151e] p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">
              Active detections
            </p>

            <p className="mt-2 text-3xl font-semibold text-white">
              {loading ? "—" : detections.length}
            </p>

            <p className="mt-2 text-xs text-slate-500">
              Based on the configured failed-login rule
            </p>
          </div>

          <div className="rounded-xl border border-rose-400/20 bg-rose-400/10 p-3 text-rose-300">
            <Activity size={26} />
          </div>
        </div>
      </div>

      {/* Detection results */}
      <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#10151e]">
        <div className="border-b border-white/[0.08] p-5">
          <h2 className="font-semibold text-white">
            Detection Center
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Suspicious IP addresses detected by NetSentry AI.
          </p>
        </div>

        {loading ? (
          <div className="p-8 text-center text-sm text-slate-400">
            Loading detection results...
          </div>
        ) : error ? (
          <div className="p-6">
            <p className="text-sm text-rose-400">{error}</p>

            <button
              type="button"
              onClick={() => fetchDetections(true)}
              className="mt-3 text-sm text-teal-300 hover:text-teal-200"
            >
              Try again
            </button>
          </div>
        ) : detections.length === 0 ? (
          <div className="p-10 text-center">
            <ShieldAlert
              size={34}
              className="mx-auto text-slate-500"
            />

            <p className="mt-4 font-medium text-slate-200">
              No suspicious activity detected
            </p>

            <p className="mt-2 text-sm text-slate-400">
              No IP addresses currently meet the failed-login
              detection threshold in the last 5 minutes.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="bg-white/[0.02]">
                <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-slate-400">
                  <th className="px-5 py-4">Source IP</th>
                  <th className="px-5 py-4">Failed Attempts</th>
                  <th className="px-5 py-4">First Seen</th>
                  <th className="px-5 py-4">Last Seen</th>
                  <th className="px-5 py-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {detections.map((detection) => (
                  <tr
                    key={detection.source_ip}
                    className="border-b border-white/[0.06] transition hover:bg-white/[0.02] last:border-0"
                  >
                    <td className="px-5 py-4 font-medium text-white">
                      {detection.source_ip}
                    </td>

                    <td className="px-5 py-4">
                      <span className="font-semibold text-rose-300">
                        {detection.failed_attempts}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-slate-400">
                      {new Date(
                        detection.first_seen
                      ).toLocaleString()}
                    </td>

                    <td className="px-5 py-4 text-slate-400">
                      {new Date(
                        detection.last_seen
                      ).toLocaleString()}
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-2 rounded-full border border-rose-400/20 bg-rose-400/10 px-3 py-1 text-xs font-medium text-rose-300">
                        <AlertTriangle size={13} />
                        Suspicious
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detection rule information */}
      <div className="rounded-xl border border-teal-400/10 bg-teal-400/[0.03] p-4">
        <p className="text-sm font-medium text-teal-300">
          Detection Rule
        </p>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          An IP address is flagged when it generates 5 or more
          FAILED_LOGIN events within a rolling 5-minute window.
        </p>
      </div>
    </section>
  );
}

export default Detections;
