import { Send, User, Zap } from "lucide-react";
import { EVENT_TYPES } from "../../constants/lanSimulator";

function EventGenerator({
  username,
  setUsername,
  selectedEvent,
  setSelectedEvent,
  loading,
  message,
  error,
  onSubmit,
}) {
  const selectedConfig = EVENT_TYPES.find(
    (event) => event.value === selectedEvent
  );

  return (
    <div className="theme-surface theme-border rounded-xl border p-5 sm:p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-cyan-500/10 p-2.5">
          <Zap className="text-cyan-500" size={20} />
        </div>

        <div>
          <h2 className="theme-text font-semibold">Generate Security Event</h2>
          <p className="theme-text-secondary text-xs">
            Create a simulated event for monitoring.
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label className="theme-text-secondary mb-2 block text-sm">
            Demo Username
          </label>

          <div className="relative">
            <User
              size={17}
              className="theme-text-secondary absolute left-3 top-1/2 -translate-y-1/2"
            />

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={50}
              placeholder="Enter a demo username"
              className="theme-surface-secondary theme-border theme-text w-full rounded-lg border py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500"
            />
          </div>
        </div>

        <div>
          <label className="theme-text-secondary mb-2 block text-sm">
            Event Type
          </label>

          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="theme-surface-secondary theme-border theme-text w-full rounded-lg border px-4 py-3 text-sm outline-none focus:border-cyan-500"
          >
            {EVENT_TYPES.map((event) => (
              <option key={event.value} value={event.value}>
                {event.label} — {event.severity}
              </option>
            ))}
          </select>

          <p className="theme-text-secondary mt-2 text-xs">
            {selectedConfig?.description}
          </p>
        </div>

        {error && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {message && (
          <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-600 dark:text-emerald-400">
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send size={16} />
          {loading ? "Generating Event..." : "Generate Event"}
        </button>
      </form>
    </div>
  );
}

export default EventGenerator;