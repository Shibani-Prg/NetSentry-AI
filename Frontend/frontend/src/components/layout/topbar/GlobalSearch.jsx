
import { ArrowRight, Search, X, AlertCircle } from "lucide-react";

function GlobalSearch({
  open,
  query,
  setQuery,
  onClose,
  onSubmit,
  searchStatus,
  searching,
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 px-3 pt-[15vh] backdrop-blur-sm sm:px-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="global-search-title"
        className="theme-surface theme-border theme-text w-full max-w-xl rounded-2xl border p-4 shadow-2xl transition-colors duration-200 sm:p-5"
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2
              id="global-search-title"
              className="font-semibold"
            >
              Search Security Events
            </h2>

            <p className="theme-text-secondary mt-1 text-xs">
              Search by IP address, event type or source.
            </p>
          </div>

          <button
            type="button"
            aria-label="Close search"
            onClick={onClose}
            disabled={searching}
            className="theme-text-secondary rounded-lg p-2 transition hover:bg-black/5 hover:text-teal-600 disabled:opacity-50 dark:hover:bg-white/5 dark:hover:text-teal-300"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <label className="theme-border theme-surface-secondary flex items-center gap-3 rounded-xl border px-3">
            <Search size={18} className="theme-text-secondary shrink-0" />

            <input
              autoFocus
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="IP address or FAILED_LOGIN"
              disabled={searching}
              className="theme-text min-w-0 flex-1 bg-transparent py-3.5 text-sm outline-none placeholder:text-slate-500"
            />
          </label>

          <button
            type="submit"
            disabled={!query.trim() || searching}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {searching ? "Searching..." : "Search Events"}
            <ArrowRight size={16} />
          </button>
        </form>

        {searchStatus === "notFound" && (
          <div
            role="status"
            className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4"
          >
            <div className="flex items-start gap-3">
              <Search size={19} className="mt-0.5 shrink-0 text-amber-500" />

              <div>
                <p className="text-sm font-medium text-amber-700 dark:text-amber-200">
                  No results found
                </p>

                <p className="theme-text-secondary mt-1 text-xs">
                  No security events matched "{query.trim()}". Try another IP
                  address, event type or source.
                </p>
              </div>
            </div>
          </div>
        )}

        {searchStatus && searchStatus !== "notFound" && (
          <div
            role="alert"
            className="mt-4 flex items-start gap-3 rounded-xl border border-rose-500/20 bg-rose-500/5 p-4"
          >
            <AlertCircle
              size={19}
              className="mt-0.5 shrink-0 text-rose-500"
            />

            <p className="text-sm text-rose-600 dark:text-rose-200">
              {searchStatus}
            </p>
          </div>
        )}

        <p className="theme-text-secondary mt-3 text-xs">
          Press Enter to search. Click outside to close.
        </p>
      </div>
    </div>
  );
}

export default GlobalSearch;
