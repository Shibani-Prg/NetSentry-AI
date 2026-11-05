
import { Menu } from "lucide-react";

export default function TopbarTitle({ title, onMenuClick }) {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-3">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open navigation menu"
        className="theme-border theme-text-secondary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-colors duration-200 hover:bg-black/5 hover:text-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 lg:hidden dark:hover:bg-white/[0.05] dark:hover:text-teal-300"
      >
        <Menu size={20} />
      </button>

      <div className="min-w-0">
        <p className="theme-text-secondary truncate text-[10px] sm:text-xs">
          NetSentry AI / Workspace
        </p>

        <h2 className="theme-text mt-1 truncate text-sm font-semibold sm:text-base md:text-lg">
          {title}
        </h2>
      </div>
    </div>
  );
}
