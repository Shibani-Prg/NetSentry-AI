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
    <div className="theme-surface theme-border flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="theme-text-secondary flex items-center gap-2">
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
                ? "border-indigo-400 bg-indigo-500/20 text-indigo-700 dark:text-indigo-200"
                : "theme-border theme-text-secondary hover:border-indigo-400/40 hover:text-indigo-600 dark:hover:text-white"
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
          className="theme-border theme-text-secondary inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm transition hover:bg-slate-200 dark:hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
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