
import {
  Bell,
  Search,
  ShieldCheck,
  LogOut,
} from "lucide-react";

export default function TopbarActions({
  health,
  environmentOpen,
  onToggleEnvironment,
  onSearch,
  onOpenDetections,
  onLogout,
}) {
  const backendStatus = health?.backend;

  const environmentClasses = environmentOpen
    ? "border-teal-500/40 bg-teal-500/10 text-teal-700 dark:text-teal-300"
    : "theme-border theme-text-secondary hover:border-teal-500/30 hover:text-teal-700 dark:hover:text-teal-300";

  return (
    <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">

      {/* Environment Status */}
      <button
        type="button"
        onClick={onToggleEnvironment}
        aria-expanded={environmentOpen}
        aria-controls="environment-panel"
        title="Toggle local environment panel"
        className={`flex shrink-0 items-center gap-2 rounded-lg border px-2 py-2 text-[9px] transition-colors duration-200 sm:px-3 sm:text-[10px] ${environmentClasses}`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            backendStatus === "connected"
              ? "bg-emerald-400"
              : backendStatus === "disconnected"
                ? "bg-rose-400"
                : "bg-teal-400"
          }`}
        />

        <span className="hidden sm:inline">
          LOCAL ENVIRONMENT
        </span>

        <span className="sm:hidden">ENV</span>
      </button>

      {/* Search */}
      <button
        type="button"
        aria-label="Search security events"
        title="Search security events"
        onClick={onSearch}
        className="theme-border theme-text-secondary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-colors duration-200 hover:bg-black/5 hover:text-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:hover:bg-white/[0.05] dark:hover:text-teal-300"
      >
        <Search size={18} />
      </button>

      {/* Notifications */}
      <button
        type="button"
        aria-label="Open threat detections"
        title="Open threat detections"
        onClick={onOpenDetections}
        className="theme-border theme-text-secondary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-colors duration-200 hover:bg-black/5 hover:text-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:hover:bg-white/[0.05] dark:hover:text-teal-300"
      >
        <Bell size={18} />
      </button>

      {/* Detection Shortcut */}
      <button
        type="button"
        aria-label="View threat detections"
        title="View threat detections"
        onClick={onOpenDetections}
        className="hidden shrink-0 rounded-lg border border-teal-500/20 bg-teal-500/5 p-2 text-teal-600 transition hover:bg-teal-500/10 sm:block dark:text-teal-300"
      >
        <ShieldCheck size={18} />
      </button>

      {/* Logout */}
      <button
        type="button"
        onClick={onLogout}
        title="Sign out"
        aria-label="Sign out"
        className="flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-rose-500/20 bg-rose-500/5 px-2.5 text-rose-600 transition hover:border-rose-500/40 hover:bg-rose-500/10 sm:px-3 dark:text-rose-400"
      >
        <LogOut size={17} />

        <span className="hidden text-xs font-medium sm:inline">
          Logout
        </span>
      </button>
    </div>
  );
}
