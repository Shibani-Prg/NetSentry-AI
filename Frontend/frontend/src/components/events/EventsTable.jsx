import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Search,
  LoaderCircle,
} from "lucide-react";

import SeverityBadge from "./SeverityBadge";

function EventsTable({
  events = [],
  loading = false,
  page = 1,
  totalPages = 1,
  onPageChange,
}) {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handlePageChange = (nextPage) => {
    if (loading) return;
    onPageChange?.(nextPage);
  };

  // Initial loading state
  if (loading && events.length === 0) {
    return (
      <div className="theme-surface theme-border flex min-h-[300px] items-center justify-center rounded-xl border transition-colors duration-200">
        <div className="theme-text-secondary flex items-center gap-3 text-sm">
          <LoaderCircle
            size={20}
            className="animate-spin text-teal-600 dark:text-teal-300"
          />
          Loading security events...
        </div>
      </div>
    );
  }

  // Empty state
  if (!loading && events.length === 0) {
    return (
      <div className="theme-surface theme-border rounded-xl border p-8 text-center transition-colors duration-200 sm:p-10">
        <Search
          className="theme-text-secondary mx-auto"
          size={28}
        />

        <p className="theme-text mt-3 font-medium">
          No events found
        </p>

        <p className="theme-text-secondary mt-1 text-sm">
          Try changing your search or severity filter.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="theme-surface theme-border relative min-w-0 overflow-hidden rounded-xl border transition-colors duration-200">

        {/* Loading Overlay */}
        {loading && (
          <div className="theme-surface theme-border theme-text-secondary absolute right-4 top-4 z-10 flex items-center gap-2 rounded-lg border px-3 py-2 text-xs shadow-lg">
            <LoaderCircle
              size={14}
              className="animate-spin text-teal-600 dark:text-teal-300"
            />
            Updating events...
          </div>
        )}

        {/* Responsive Table */}
        <div className="w-full overflow-x-auto overscroll-x-contain">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="theme-border theme-surface-secondary theme-text-secondary border-b text-xs uppercase tracking-wider">
              <tr>
                <th className="whitespace-nowrap px-5 py-4">
                  Event
                </th>

                <th className="whitespace-nowrap px-5 py-4">
                  Source IP
                </th>

                <th className="whitespace-nowrap px-5 py-4">
                  Severity
                </th>

                <th className="whitespace-nowrap px-5 py-4">
                  Source
                </th>

                <th className="whitespace-nowrap px-5 py-4">
                  Timestamp
                </th>

                <th className="whitespace-nowrap px-5 py-4">
                  Details
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 dark:divide-white/[0.06]">
              {events.map((event) => (
                <tr
                  key={event.id}
                  className="transition-colors hover:bg-black/[0.025] dark:hover:bg-white/[0.025]"
                >
                  <td className="theme-text whitespace-nowrap px-5 py-4 font-medium">
                    {event.event_type || "Unknown event"}
                  </td>

                  <td className="theme-text-secondary whitespace-nowrap px-5 py-4 font-mono text-xs">
                    {event.source_ip || "—"}
                  </td>

                  <td className="px-5 py-4">
                    <SeverityBadge severity={event.severity} />
                  </td>

                  <td className="theme-text-secondary max-w-[180px] truncate px-5 py-4">
                    {event.source_name || event.source_id || "—"}
                  </td>

                  <td className="theme-text-secondary whitespace-nowrap px-5 py-4 text-xs">
                    {event.created_at
                      ? new Date(event.created_at).toLocaleString()
                      : "—"}
                  </td>

                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() => setSelectedEvent(event)}
                      className="theme-border theme-text-secondary inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs transition hover:border-teal-500/30 hover:text-teal-700 dark:hover:text-teal-300"
                    >
                      <Eye size={14} />
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Responsive Pagination */}
        <div className="theme-border flex flex-wrap items-center justify-between gap-3 border-t px-3 py-4 sm:px-5">
          <p className="theme-text-secondary text-xs">
            Page {page} of {Math.max(totalPages, 1)}
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              disabled={page <= 1 || loading}
              onClick={() => handlePageChange(page - 1)}
              className="theme-border theme-text-secondary rounded-lg border p-2 transition hover:bg-black/5 dark:hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              type="button"
              disabled={page >= totalPages || loading}
              onClick={() => handlePageChange(page + 1)}
              className="theme-border theme-text-secondary rounded-lg border p-2 transition hover:bg-black/5 dark:hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Next page"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm sm:p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="event-detail-title"
            className="theme-surface theme-border theme-text max-h-[90dvh] w-full max-w-2xl overflow-y-auto rounded-xl border p-4 shadow-2xl transition-colors duration-200 sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-widest text-teal-700 dark:text-teal-300">
                  Event investigation
                </p>

                <h2
                  id="event-detail-title"
                  className="theme-text mt-2 break-words text-lg font-semibold sm:text-xl"
                >
                  {selectedEvent.event_type}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="theme-text-secondary shrink-0 text-sm transition hover:text-teal-600 dark:hover:text-white"
              >
                Close
              </button>
            </div>

            <pre className="theme-surface-secondary theme-text-secondary theme-border mt-5 max-w-full overflow-x-auto whitespace-pre-wrap break-all rounded-lg border p-3 text-xs leading-6 sm:p-4">
              {JSON.stringify(selectedEvent, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </>
  );
}

export default EventsTable;