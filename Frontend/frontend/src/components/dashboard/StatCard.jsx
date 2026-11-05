
import {
  Activity,
  ShieldAlert,
  LogIn,
  Radar,
} from "lucide-react";

const cardConfig = {
  "Total Events": {
    icon: Activity,
    color: "text-cyan-500 dark:text-cyan-400",
    background: "bg-cyan-400/10",
    border: "group-hover:border-cyan-400/30",
  },
  "Critical Events": {
    icon: ShieldAlert,
    color: "text-rose-500 dark:text-rose-400",
    background: "bg-rose-400/10",
    border: "group-hover:border-rose-400/30",
  },
  "Failed Logins": {
    icon: LogIn,
    color: "text-amber-500 dark:text-amber-400",
    background: "bg-amber-400/10",
    border: "group-hover:border-amber-400/30",
  },
  "Detected IPs": {
    icon: Radar,
    color: "text-violet-500 dark:text-violet-400",
    background: "bg-violet-400/10",
    border: "group-hover:border-violet-400/30",
  },
};

function StatCard({ title, value = 0 }) {
  const config = cardConfig[title] ?? {
    icon: Activity,
    color: "text-cyan-500 dark:text-cyan-400",
    background: "bg-cyan-400/10",
    border: "group-hover:border-cyan-400/30",
  };

  const Icon = config.icon;

  const progressColor = config.color
    .split(" ")
    .map((className) =>
      className.replace("text-", "bg-")
    )
    .join(" ");

  return (
    <div
      className={`theme-surface theme-border group min-w-0 rounded-2xl border p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5 ${config.border}`}
    >
      <div className="flex items-start justify-between gap-2 sm:gap-3">
        <div className="min-w-0">
          <p className="theme-text-secondary break-words text-xs sm:text-sm">
            {title}
          </p>

          <p className="theme-text mt-3 break-all text-2xl font-semibold tracking-tight sm:text-3xl">
            {Number(value).toLocaleString("en-IN")}
          </p>
        </div>

        <div
          className={`shrink-0 rounded-xl p-2.5 sm:p-3 ${config.background}`}
        >
          <Icon className={`h-5 w-5 ${config.color}`} />
        </div>
      </div>

      <div className="theme-border mt-4 h-1 overflow-hidden rounded-full border bg-slate-200 dark:bg-slate-800 sm:mt-5">
        <div
          className={`h-full w-1/3 rounded-full opacity-70 transition-all duration-300 group-hover:w-2/3 ${progressColor}`}
        />
      </div>
    </div>
  );
}

export default StatCard;
