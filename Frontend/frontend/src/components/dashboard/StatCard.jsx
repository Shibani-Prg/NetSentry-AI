
import {
  Activity,
  ShieldAlert,
  LogIn,
  Radar,
} from "lucide-react";

const cardConfig = {
  "Total Events": {
    icon: Activity,
    color: "text-cyan-400",
    background: "bg-cyan-400/10",
    border: "group-hover:border-cyan-400/30",
  },
  "Critical Events": {
    icon: ShieldAlert,
    color: "text-rose-400",
    background: "bg-rose-400/10",
    border: "group-hover:border-rose-400/30",
  },
  "Failed Logins": {
    icon: LogIn,
    color: "text-amber-400",
    background: "bg-amber-400/10",
    border: "group-hover:border-amber-400/30",
  },
  "Detected IPs": {
    icon: Radar,
    color: "text-violet-400",
    background: "bg-violet-400/10",
    border: "group-hover:border-violet-400/30",
  },
};

function StatCard({ title, value = 0 }) {
  const config = cardConfig[title] ?? {
    icon: Activity,
    color: "text-cyan-400",
    background: "bg-cyan-400/10",
    border: "group-hover:border-cyan-400/30",
  };

  const Icon = config.icon;

  return (
    <div
      className={`group rounded-2xl border border-slate-800 bg-[#101722] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#141e2b] ${config.border}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-400">{title}</p>

          <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
            {Number(value).toLocaleString("en-IN")}
          </p>
        </div>

        <div className={`rounded-xl p-3 ${config.background}`}>
          <Icon className={`h-5 w-5 ${config.color}`} />
        </div>
      </div>

      <div className="mt-5 h-1 overflow-hidden rounded-full bg-slate-800">
        <div
          className={`h-full w-1/3 rounded-full opacity-70 transition-all duration-300 group-hover:w-2/3 ${config.color.replace("text-", "bg-")}`}
        />
      </div>
    </div>
  );
}

export default StatCard;
