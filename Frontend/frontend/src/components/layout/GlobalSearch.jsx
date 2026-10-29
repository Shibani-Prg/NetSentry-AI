import { ArrowRight, Search, X } from "lucide-react";

function GlobalSearch({
  open,
  query,
  setQuery,
  onClose,
  onSubmit,
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
        className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#10151e] p-4 shadow-2xl sm:p-5"
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2
              id="global-search-title"
              className="font-semibold text-white"
            >
              Search Security Events
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Search by IP address, event type or source.
            </p>
          </div>

          <button
            type="button"
            aria-label="Close search"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-3">
            <Search size={18} className="shrink-0 text-slate-500" />
            <input
              autoFocus
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="IP address or FAILED_LOGIN"
              className="min-w-0 flex-1 bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-slate-500"
            />
          </label>

          <button
            type="submit"
            disabled={!query.trim()}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-400 px-4 py-3 text-sm font-semibold text-[#07110f] transition hover:bg-teal-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Search Events
            <ArrowRight size={16} />
          </button>
        </form>

        <p className="mt-3 text-xs text-slate-500">
          Press Enter to search. Click outside to close.
        </p>
      </div>
    </div>
  );
}

export default GlobalSearch;