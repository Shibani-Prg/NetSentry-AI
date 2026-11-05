
import { Network, RefreshCw } from "lucide-react";

function NetworkSourcesHeader({ loading, refreshing, onRefresh }) {
  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div className="shrink-0 rounded-xl border border-teal-500/20 bg-teal-500/10 p-2.5 text-teal-600 transition-colors duration-200 sm:p-3 dark:text-teal-300">
            <Network size={22} />
          </div>

          <div>
            <p className="text-[10px] tracking-widest text-teal-600 sm:text-xs dark:text-teal-300">
              INFRASTRUCTURE
            </p>

            <h1 className="theme-text mt-1 text-xl font-semibold sm:text-2xl">
              Network Sources
            </h1>
          </div>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          disabled={loading || refreshing}
          className="theme-border theme-text flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition-colors duration-200 hover:bg-black/5 disabled:opacity-50 sm:w-auto dark:hover:bg-white/5"
        >
          <RefreshCw
            size={16}
            className={refreshing ? "animate-spin" : ""}
          />
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <p className="theme-text-secondary text-sm leading-relaxed">
        Monitor registered event sources and inspect their security activity.
      </p>
    </>
  );
}

export default NetworkSourcesHeader;
