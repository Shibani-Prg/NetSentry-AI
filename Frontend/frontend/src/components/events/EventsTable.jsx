
import { useState } from "react";
import { ChevronLeft, ChevronRight, Eye, Search } from "lucide-react";
import SeverityBadge from "./SeverityBadge";

function EventsTable({
  events = [],
  loading = false,
  page = 1,
  totalPages = 1,
  onPageChange,
}) {
  const [selectedEvent, setSelectedEvent] = useState(null);

  if (loading) {
    return (
      <div className="rounded-xl border border-white/[0.08] bg-[#10151e] p-8 text-center text-sm text-slate-400">
        Loading security events...
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="rounded-xl border border-white/[0.08] bg-[#10151e] p-10 text-center">
        <Search className="mx-auto text-slate-500" size={28} />
        <p className="mt-3 font-medium text-white">No events found</p>
        <p className="mt-1 text-sm text-slate-500">
          Try changing your search or severity filter.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#10151e]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="border-b border-white/[0.08] bg-white/[0.02] text-xs uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-5 py-4">Event</th>
                <th className="px-5 py-4">Source IP</th>
                <th className="px-5 py-4">Severity</th>
                <th className="px-5 py-4">Source</th>
                <th className="px-5 py-4">Timestamp</th>
                <th className="px-5 py-4">Details</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/[0.06]">
              {events.map((event) => (
                <tr
                  key={event.id}
                  className="transition hover:bg-white/[0.025]"
                >
                  <td className="px-5 py-4 font-medium text-white">
                    {event.event_type || "Unknown event"}
                  </td>
                  <td className="px-5 py-4 font-mono text-xs text-slate-300">
                    {event.source_ip || "—"}
                  </td>
                  <td className="px-5 py-4">
                    <SeverityBadge severity={event.severity} />
                  </td>
                  <td className="px-5 py-4 text-slate-400">
                    {event.source_name || event.source_id || "—"}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-xs text-slate-400">
                    {event.created_at
                      ? new Date(event.created_at).toLocaleString()
                      : "—"}
                  </td>
                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() => setSelectedEvent(event)}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-300 hover:border-teal-300/30 hover:text-teal-300"
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

        <div className="flex items-center justify-between border-t border-white/[0.08] px-5 py-4">
          <p className="text-xs text-slate-500">
            Page {page} of {Math.max(totalPages, 1)}
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => onPageChange?.(page - 1)}
              className="rounded-lg border border-white/10 p-2 text-slate-300 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => onPageChange?.(page + 1)}
              className="rounded-lg border border-white/10 p-2 text-slate-300 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Next page"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="event-detail-title"
            className="max-h-[85vh] w-full max-w-2xl overflow-auto rounded-xl border border-white/10 bg-[#10151e] p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-teal-300">
                  Event investigation
                </p>
                <h2
                  id="event-detail-title"
                  className="mt-2 text-xl font-semibold text-white"
                >
                  {selectedEvent.event_type}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="text-sm text-slate-400 hover:text-white"
              >
                Close
              </button>
            </div>

            <pre className="mt-5 overflow-auto rounded-lg bg-black/30 p-4 text-xs leading-6 text-slate-300">
              {JSON.stringify(selectedEvent, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </>
  );
}

export default EventsTable;
