
function formatDate(value) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleString();
}

function ReportEventsTable({ events = [] }) {
  const recentEvents = events.slice(0, 10);

  function severityClass(severity) {
    switch (String(severity || "").toUpperCase()) {
      case "CRITICAL":
        return "bg-red-500/10 text-red-400";
      case "HIGH":
        return "bg-orange-500/10 text-orange-400";
      case "MEDIUM":
        return "bg-yellow-500/10 text-yellow-400";
      case "LOW":
        return "bg-emerald-500/10 text-emerald-400";
      default:
        return "bg-slate-500/10 text-slate-300";
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#10151e]">
      <div className="flex flex-col gap-1 border-b border-white/[0.08] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-semibold text-white">
            Recent Security Events
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Latest events in the selected report period
          </p>
        </div>

        <span className="text-sm text-slate-400">
          {events.length} records
        </span>
      </div>

      {recentEvents.length === 0 ? (
        <div className="p-10 text-center">
          <p className="text-slate-300">No events found</p>
          <p className="mt-1 text-sm text-slate-500">
            Try selecting a different report period.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-white/[0.02] text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-4 font-medium">Time</th>
                <th className="px-5 py-4 font-medium">Source IP</th>
                <th className="px-5 py-4 font-medium">Event Type</th>
                <th className="px-5 py-4 font-medium">Severity</th>
                <th className="px-5 py-4 font-medium">Source</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/[0.06]">
              {recentEvents.map((event) => (
                <tr
                  key={event.id}
                  className="transition hover:bg-white/[0.02]"
                >
                  <td className="whitespace-nowrap px-5 py-4 text-slate-400">
                    {formatDate(event.created_at)}
                  </td>

                  <td className="px-5 py-4 font-mono text-slate-300">
                    {event.source_ip || "—"}
                  </td>

                  <td className="px-5 py-4 text-slate-300">
                    {event.event_type || "—"}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-md px-2 py-1 text-xs font-medium ${severityClass(event.severity)}`}
                    >
                      {event.severity || "UNKNOWN"}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-slate-400">
                    {event.source_name || "Unknown source"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ReportEventsTable;
