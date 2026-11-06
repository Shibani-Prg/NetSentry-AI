
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Activity,
  Search,
  RefreshCw,
  ShieldAlert,
} from "lucide-react";

import api from "../services/api";
import EventsTable from "../components/events/EventsTable";

const PAGE_SIZE = 10;

function SecurityEvents() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read search query directly from URL.
  const search = searchParams.get("search") || "";

  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [severity, setSeverity] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [error, setError] = useState("");

  // Fetch events from backend.
  useEffect(() => {
    let cancelled = false;

    async function fetchEvents() {
      setLoading(true);
      setError("");

      try {
        const response = await api.get("/api/events", {
          params: {
            page,
            limit: PAGE_SIZE,
            ...(severity ? { severity } : {}),
            ...(search.trim() ? { search: search.trim() } : {}),
          },
        });

        if (cancelled) return;

        const data = response.data;

        if (!Array.isArray(data.events) || !data.pagination) {
          throw new Error("Unexpected response from events API.");
        }

        setEvents(data.events);
        setTotal(Number(data.pagination.total) || 0);
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              err.message ||
              "Unable to load security events."
          );

          setEvents([]);
          setTotal(0);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchEvents();

    return () => {
      cancelled = true;
    };
  }, [page, severity, search, refreshKey]);

  const totalPages = Math.max(
    1,
    Math.ceil(total / PAGE_SIZE)
  );

  // Handle severity filter.
  function handleSeverityChange(value) {
    setSeverity(value);
    setPage(1);
  }

  // Handle search using URL parameters.
  function handleSearchChange(value) {
    setPage(1);

    if (value.trim()) {
      setSearchParams(
        { search: value },
        { replace: true }
      );
    } else {
      setSearchParams({}, { replace: true });
    }
  }

  return (
    <section className="theme-text space-y-6">

      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="shrink-0 rounded-xl border border-teal-500/20 bg-teal-500/10 p-3 text-teal-600 dark:text-teal-300">
            <Activity size={24} />
          </div>

          <div>
            <p className="text-xs tracking-widest text-teal-600 dark:text-teal-300">
              EVENT MONITORING
            </p>

            <h1 className="theme-text mt-1 text-2xl font-semibold">
              Security Events
            </h1>

            <p className="theme-text-secondary mt-1 text-sm">
              Investigate events retrieved from your security database.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setRefreshKey((value) => value + 1)}
          disabled={loading}
          className="theme-border theme-text-secondary inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition hover:bg-slate-100 disabled:opacity-50 dark:hover:bg-white/5"
        >
          <RefreshCw
            size={15}
            className={loading ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {/* Event Statistics */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="theme-surface theme-border rounded-xl border p-5">
          <p className="theme-text-secondary text-sm">
            Matching database events
          </p>

          <p className="theme-text mt-2 text-3xl font-semibold">
            {total.toLocaleString()}
          </p>
        </div>

        <div className="theme-surface theme-border rounded-xl border p-5">
          <p className="theme-text-secondary text-sm">
            Events on this page
          </p>

          <p className="mt-2 text-3xl font-semibold text-teal-600 dark:text-teal-300">
            {events.length}
          </p>
        </div>
      </div>

      {/* Search and Severity Filters */}
      <div className="theme-surface theme-border rounded-xl border p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_220px]">

          <label className="theme-border theme-surface-secondary flex items-center gap-3 rounded-lg border px-3">
            <Search
              size={17}
              className="theme-text-secondary shrink-0"
            />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                handleSearchChange(event.target.value)
              }
              placeholder="Search IP, event type or source..."
              className="theme-text placeholder:text-slate-400 w-full bg-transparent py-3 text-sm outline-none dark:placeholder:text-slate-500"
            />
          </label>

          <select
            value={severity}
            onChange={(event) =>
              handleSeverityChange(event.target.value)
            }
            className="theme-border theme-surface theme-text rounded-lg border px-3 py-3 text-sm outline-none focus:border-teal-500 dark:focus:border-teal-300"
          >
            <option value="">All severities</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="CRITICAL">Critical</option>
          </select>
        </div>

        <p className="theme-text-secondary mt-3 text-xs">
          Search and severity filters are applied directly to database records.
        </p>
      </div>

      {/* Events Table / Error */}
      {error ? (
        <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-5">
          <div className="flex items-start gap-3">
            <ShieldAlert
              size={20}
              className="mt-0.5 shrink-0 text-rose-600 dark:text-rose-400"
            />

            <div>
              <h2 className="font-medium text-rose-700 dark:text-rose-300">
                Unable to load security events
              </h2>

              <p className="theme-text-secondary mt-1 text-sm">
                {error}
              </p>

              <button
                type="button"
                onClick={() =>
                  setRefreshKey((value) => value + 1)
                }
                className="mt-3 text-sm text-teal-600 hover:text-teal-500 dark:text-teal-300 dark:hover:text-teal-200"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      ) : (
        <EventsTable
          events={events}
          loading={loading}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}

      {/* Pagination Information */}
      {!error && !loading && total > 0 && (
        <p className="theme-text-secondary text-xs">
          Showing page {page} of {totalPages}. Results are loaded from the
          backend API.
        </p>
      )}

    </section>
  );
}

export default SecurityEvents;
