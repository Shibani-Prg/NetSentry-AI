
import { Clock, RefreshCw } from "lucide-react";

const ranges = [
  { label: "Last 24 Hours", value: "24h" },
  { label: "Last 7 Days", value: "7d" },
  { label: "Last 30 Days", value: "30d" },
];

function ReportFilters({
  range,
  onRangeChange,
  onRefresh,
  loading,
}) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-white/[0.08] bg-[#10151e] p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 text-slate-300">
        <Clock size={18} />
        <span className="text-sm font-medium">
          Report Period
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {ranges.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => onRangeChange(item.value)}
            disabled={loading && range === item.value}
            className={`rounded-lg border px-3 py-2 text-sm transition ${
              range === item.value
                ? "border-indigo-400 bg-indigo-500/20 text-indigo-200"
                : "border-white/10 text-slate-400 hover:border-white/20 hover:text-white"
            }`}
          >
            {item.label}
          </button>
        ))}

        <button
          type="button"
          onClick={onRefresh}
          disabled={loading}
          title="Refresh report"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw
            size={16}
            className={loading ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>
    </div>
  );
}

export default ReportFilters;
