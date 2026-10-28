
import { useEffect, useState } from "react";
import { Activity, Search, RefreshCw, ShieldAlert } from "lucide-react";
import api from "../services/api";
import EventsTable from "../components/events/EventsTable";

const PAGE_SIZE = 10;

function SecurityEvents() {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [error, setError] = useState("");

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
        if (!cancelled) setLoading(false);
      }
    }

    fetchEvents();

    return () => {
      cancelled = true;
    };
  }, [page, severity, search, refreshKey]);

  // Search the events currently loaded from the API.
  const filteredEvents = events.filter((event) => {
    const query = search.trim().toLowerCase();

    if (!query) return true;

    return [
      event.source_ip,
      event.event_type,
      event.source_name,
      event.severity,
    ].some((value) => String(value ?? "").toLowerCase().includes(query));
  });

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  function handleSeverityChange(value) {
    setSeverity(value);
    setPage(1);
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-teal-300/20 bg-teal-300/10 p-3 text-teal-300">
            <Activity size={24} />
          </div>

          <div>
            <p className="text-xs tracking-widest text-teal-300">
              EVENT MONITORING
            </p>
            <h1 className="mt-1 text-2xl font-semibold text-white">
              Security Events
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Investigate events retrieved from your security database.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setRefreshKey((value) => value + 1)}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm text-slate-300 hover:border-teal-300/30 hover:text-teal-300 disabled:opacity-50"
        >
          <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-white/[0.08] bg-[#10151e] p-5">
          <p className="text-sm text-slate-400">Matching database events</p>
          <p className="mt-2 text-3xl font-semibold text-white">
            {total.toLocaleString()}
          </p>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-[#10151e] p-5">
          <p className="text-sm text-slate-400">Events on this page</p>
          <p className="mt-2 text-3xl font-semibold text-teal-300">
            {filteredEvents.length}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.08] bg-[#10151e] p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_220px]">
          <label className="flex items-center gap-3 rounded-lg border border-white/10 bg-black/20 px-3">
            <Search size={17} className="shrink-0 text-slate-500" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search IP, event type or source..."
              className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-slate-500"
            />
          </label>

          <select
            value={severity}
            onChange={(event) => handleSeverityChange(event.target.value)}
            className="rounded-lg border border-white/10 bg-[#151b26] px-3 py-3 text-sm text-slate-200 outline-none focus:border-teal-300/40"
          >
            <option value="">All severities</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="CRITICAL">Critical</option>
          </select>
        </div>

        <p className="mt-3 text-xs text-slate-500">
          Search filters the events on the current page. Severity filtering
          is applied by the backend across database records.
        </p>
      </div>

      {error ? (
        <div className="rounded-xl border border-rose-400/20 bg-rose-400/5 p-5">
          <div className="flex items-start gap-3">
            <ShieldAlert size={20} className="mt-0.5 text-rose-300" />
            <div>
              <h2 className="font-medium text-rose-200">
                Unable to load security events
              </h2>
              <p className="mt-1 text-sm text-slate-400">{error}</p>
              <button
                type="button"
                onClick={() => setRefreshKey((value) => value + 1)}
                className="mt-3 text-sm text-teal-300 hover:text-teal-200"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      ) : (
        <EventsTable
          events={filteredEvents}
          loading={loading}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}

      {!error && !loading && total > 0 && (
        <p className="text-xs text-slate-500">
          Showing page {page} of {totalPages}. Results are loaded from the
          backend API.
        </p>
      )}
    </section>
  );
}

export default SecurityEvents;
