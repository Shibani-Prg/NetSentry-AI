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
        return "bg-red-500/10 text-red-600 dark:text-red-400";
      case "HIGH":
        return "bg-orange-500/10 text-orange-600 dark:text-orange-400";
      case "MEDIUM":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
      case "LOW":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
      default:
        return "bg-slate-500/10 text-slate-600 dark:text-slate-300";
    }
  }

  return (
    <div className="theme-surface theme-border overflow-hidden rounded-xl border">
      <div className="theme-border flex flex-col gap-1 border-b p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="theme-text font-semibold">
            Recent Security Events
          </h3>
          <p className="theme-text-secondary mt-1 text-sm">
            Latest events in the selected report period
          </p>
        </div>

        <span className="theme-text-secondary text-sm">
          {events.length} records
        </span>
      </div>

      {recentEvents.length === 0 ? (
        <div className="p-10 text-center">
          <p className="theme-text">No events found</p>
          <p className="theme-text-secondary mt-1 text-sm">
            Try selecting a different report period.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="theme-surface-secondary theme-text-secondary text-xs uppercase tracking-wider">
              <tr>
                <th className="px-5 py-4 font-medium">Time</th>
                <th className="px-5 py-4 font-medium">Source IP</th>
                <th className="px-5 py-4 font-medium">Event Type</th>
                <th className="px-5 py-4 font-medium">Severity</th>
                <th className="px-5 py-4 font-medium">Source</th>
              </tr>
            </thead>

            <tbody className="divide-y theme-border">
              {recentEvents.map((event) => (
                <tr
                  key={event.id}
                  className="transition hover:bg-slate-100 dark:hover:bg-white/[0.02]"
                >
                  <td className="theme-text-secondary whitespace-nowrap px-5 py-4">
                    {formatDate(event.created_at)}
                  </td>

                  <td className="theme-text px-5 py-4 font-mono">
                    {event.source_ip || "—"}
                  </td>

                  <td className="theme-text px-5 py-4">
                    {event.event_type || "—"}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-md px-2 py-1 text-xs font-medium ${severityClass(event.severity)}`}
                    >
                      {event.severity || "UNKNOWN"}
                    </span>
                  </td>

                  <td className="theme-text-secondary px-5 py-4">
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