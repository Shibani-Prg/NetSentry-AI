
import {
  CheckCircle2,
  ShieldAlert,
  Activity,
  RefreshCw,
  Loader2,
} from "lucide-react";

const events = [
  {
    type: "SUCCESSFUL_LOGIN",
    title: "Successful Login",
    severity: "LOW",
    icon: CheckCircle2,
    style:
      "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/20",
  },
  {
    type: "SUSPICIOUS_ACCESS",
    title: "Suspicious Access",
    severity: "HIGH",
    icon: ShieldAlert,
    style:
      "text-red-600 dark:text-red-400 bg-red-500/10 border-red-500/20 hover:bg-red-500/20",
  },
  {
    type: "UNUSUAL_ACTIVITY",
    title: "Unusual Activity",
    severity: "MEDIUM",
    icon: Activity,
    style:
      "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20 hover:bg-amber-500/20",
  },
  {
    type: "MULTIPLE_REQUESTS",
    title: "Multiple Requests",
    severity: "MEDIUM",
    icon: RefreshCw,
    style:
      "text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/20",
  },
];

export default function EventSimulator({
  onGenerate,
  loading,
  activeEvent,
}) {
  return (
    <section className="theme-surface theme-border border rounded-2xl p-5 sm:p-6 shadow-sm transition-colors duration-300">
      <div className="mb-6">
        <h2 className="theme-text font-semibold text-lg">
          Security Event Simulator
        </h2>

        <p className="theme-text-secondary text-xs mt-1">
          Choose an event to simulate security activity
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {events.map((event) => {
          const Icon = event.icon;
          const isActive = activeEvent === event.type;

          return (
            <button
              key={event.type}
              type="button"
              disabled={loading}
              onClick={() => onGenerate(event.type)}
              className={`flex items-center gap-3 text-left p-4 rounded-xl border transition-all disabled:opacity-50 disabled:cursor-not-allowed ${event.style}`}
            >
              {isActive && loading ? (
                <Loader2 size={23} className="animate-spin shrink-0" />
              ) : (
                <Icon size={23} className="shrink-0" />
              )}

              <div>
                <p className="font-semibold text-sm">
                  {event.title}
                </p>

                <p className="text-xs mt-1 opacity-75">
                  {event.severity} SEVERITY
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
