import { Clock3, Activity } from "lucide-react";

function EventHistory({ events }) {
  return (
    <div className="theme-surface theme-border rounded-xl border p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <Activity size={19} className="text-cyan-500" />

        <div>
          <h2 className="theme-text font-semibold">Recent Generated Events</h2>
          <p className="theme-text-secondary text-xs">
            Events generated during this session.
          </p>
        </div>
      </div>

      {events.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <Clock3 size={30} className="theme-text-secondary mb-3" />
          <p className="theme-text-secondary text-sm">
            No events generated yet.
          </p>
          <p className="theme-text-secondary mt-1 text-xs">
            Your generated events will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="theme-surface-secondary theme-border flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="theme-text font-medium">
                  {event.eventLabel}
                </p>

                <p className="theme-text-secondary mt-1 text-xs">
                  User: {event.username} · IP: {event.sourceIP}
                </p>

                <p className="theme-text-secondary mt-1 text-xs opacity-75">
                  {event.timestamp}
                </p>
              </div>

              <span
                className={`w-fit rounded-md px-3 py-1 text-xs font-semibold ${
                  event.severity === "HIGH"
                    ? "bg-red-500/10 text-red-600 dark:text-red-400"
                    : event.severity === "MEDIUM"
                    ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                }`}
              >
                {event.severity}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EventHistory;