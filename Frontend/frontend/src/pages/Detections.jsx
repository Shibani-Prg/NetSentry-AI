
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
    <section className="min-w-0 space-y-5 sm:space-y-6">

      {/* Page Heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex min-w-0 items-center gap-3">
          <div className="shrink-0 rounded-xl border border-rose-500/20 bg-rose-500/10 p-2.5 text-rose-600 dark:text-rose-400 sm:p-3">
            <ShieldAlert size={24} />
          </div>

          <div className="min-w-0">
            <p className="text-xs tracking-widest text-teal-600 dark:text-teal-300">
              THREAT MONITORING
            </p>

            <h1 className="theme-text mt-1 text-xl font-semibold sm:text-2xl">
              Threat Detections
            </h1>
          </div>
        </div>

        <button
          type="button"
          onClick={() => fetchDetections(true)}
          disabled={loading || refreshing}
          className="theme-border theme-text-secondary inline-flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-white/5 sm:w-auto"
        >
          <RefreshCw
            size={16}
            className={refreshing ? "animate-spin" : ""}
          />
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <p className="theme-text-secondary text-sm leading-6">
        Monitor failed-login detections and investigate suspicious
        IP addresses identified by your detection rules.
      </p>

      {/* Detection Summary */}
      <div className="theme-surface theme-border rounded-xl border p-4 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="theme-text-secondary text-sm">
              Active detections
            </p>

            <p className="theme-text mt-2 text-2xl font-semibold sm:text-3xl">
              {loading ? "—" : detections.length}
            </p>

            <p className="theme-text-secondary mt-2 text-xs">
              Based on the configured failed-login rule
            </p>
          </div>

          <div className="shrink-0 rounded-xl border border-rose-500/20 bg-rose-500/10 p-2.5 text-rose-600 dark:text-rose-400 sm:p-3">
            <Activity size={26} />
          </div>
        </div>
      </div>

      {/* Detection Results */}
      <div className="theme-surface theme-border min-w-0 overflow-hidden rounded-xl border">
        <div className="theme-border border-b p-4 sm:p-5">
          <h2 className="theme-text font-semibold">
            Detection Center
          </h2>

          <p className="theme-text-secondary mt-1 text-xs sm:text-sm">
            Suspicious IP addresses detected by NetSentry AI.
          </p>
        </div>

        {loading ? (
          <div className="theme-text-secondary p-8 text-center text-sm">
            Loading detection results...
          </div>
        ) : error ? (
          <div className="p-5 sm:p-6">
            <p className="break-words text-sm text-rose-600 dark:text-rose-400">
              {error}
            </p>

            <button
              type="button"
              onClick={() => fetchDetections(true)}
              className="mt-3 text-sm text-teal-600 hover:text-teal-500 dark:text-teal-300 dark:hover:text-teal-200"
            >
              Try again
            </button>
          </div>
        ) : detections.length === 0 ? (
          <div className="px-4 py-10 text-center sm:px-6">
            <ShieldAlert
              size={34}
              className="theme-text-secondary mx-auto"
            />

            <p className="theme-text mt-4 font-medium">
              No suspicious activity detected
            </p>

            <p className="theme-text-secondary mx-auto mt-2 max-w-md text-sm leading-6">
              No IP addresses currently meet the failed-login
              detection threshold in the last 5 minutes.
            </p>
          </div>
        ) : (
          <div className="w-full overflow-x-auto overscroll-x-contain">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="theme-surface-secondary">
                <tr className="theme-border border-b text-xs uppercase tracking-wide">
                  <th className="theme-text-secondary whitespace-nowrap px-4 py-4 sm:px-5">
                    Source IP
                  </th>
                  <th className="theme-text-secondary whitespace-nowrap px-4 py-4 sm:px-5">
                    Failed Attempts
                  </th>
                  <th className="theme-text-secondary whitespace-nowrap px-4 py-4 sm:px-5">
                    First Seen
                  </th>
                  <th className="theme-text-secondary whitespace-nowrap px-4 py-4 sm:px-5">
                    Last Seen
                  </th>
                  <th className="theme-text-secondary whitespace-nowrap px-4 py-4 sm:px-5">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {detections.map((detection) => (
                  <tr
                    key={detection.source_ip}
                    className="theme-border theme-text border-b transition last:border-0 hover:bg-slate-50 dark:hover:bg-white/[0.03]"
                  >
                    <td className="whitespace-nowrap px-4 py-4 font-mono font-medium sm:px-5">
                      {detection.source_ip}
                    </td>

                    <td className="px-4 py-4 sm:px-5">
                      <span className="font-semibold text-rose-600 dark:text-rose-400">
                        {detection.failed_attempts}
                      </span>
                    </td>

                    <td className="theme-text-secondary whitespace-nowrap px-4 py-4 text-xs sm:px-5">
                      {new Date(detection.first_seen).toLocaleString()}
                    </td>

                    <td className="theme-text-secondary whitespace-nowrap px-4 py-4 text-xs sm:px-5">
                      {new Date(detection.last_seen).toLocaleString()}
                    </td>

                    <td className="px-4 py-4 sm:px-5">
                      <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-1 text-xs font-medium text-rose-700 dark:text-rose-400">
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

      {/* Detection Rule Information */}
      <div className="rounded-xl border border-teal-500/20 bg-teal-500/5 p-4 sm:p-5">
        <p className="text-sm font-medium text-teal-700 dark:text-teal-300">
          Detection Rule
        </p>

        <p className="theme-text-secondary mt-2 text-sm leading-6">
          An IP address is flagged when it generates 5 or more
          FAILED_LOGIN events within a rolling 5-minute window.
        </p>
      </div>
    </section>
  );
}

export default Detections;
