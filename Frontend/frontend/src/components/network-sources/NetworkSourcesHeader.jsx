
import { Network, RefreshCw } from "lucide-react";

function NetworkSourcesHeader({ loading, refreshing, onRefresh }) {
  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div className="shrink-0 rounded-xl border border-teal-300/20 bg-teal-300/10 p-2.5 sm:p-3 text-teal-300">
            <Network size={22} />
          </div>

          <div>
            <p className="text-[10px] tracking-widest text-teal-300 sm:text-xs">
              INFRASTRUCTURE
            </p>
            <h1 className="mt-1 text-xl font-semibold text-white sm:text-2xl">
              Network Sources
            </h1>
          </div>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          disabled={loading || refreshing}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm text-slate-200 transition hover:bg-white/5 disabled:opacity-50 sm:w-auto"
        >
          <RefreshCw
            size={16}
            className={refreshing ? "animate-spin" : ""}
          />
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <p className="text-sm leading-relaxed text-slate-400">
        Monitor registered event sources and inspect their security activity.
      </p>
    </>
  );
}

export default NetworkSourcesHeader;
