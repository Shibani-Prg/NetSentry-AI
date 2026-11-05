
import {
  AlertTriangle,
  LogOut,
  X,
} from "lucide-react";

export default function LogoutConfirmationModal({
  isOpen,
  onCancel,
  onConfirm,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-title"
        aria-describedby="logout-description"
        onClick={(event) => event.stopPropagation()}
        className="theme-surface theme-border theme-text relative w-full max-w-md overflow-hidden rounded-2xl border p-6 shadow-2xl shadow-black/30 transition-colors duration-200"
      >
        <button
          type="button"
          onClick={onCancel}
          aria-label="Close confirmation"
          className="theme-text-secondary absolute right-4 top-4 rounded-lg p-2 transition hover:bg-black/5 hover:text-rose-500 dark:hover:bg-white/5"
        >
          <X size={18} />
        </button>

        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-rose-500/20 bg-rose-500/10">
          <AlertTriangle
            size={27}
            className="text-rose-500"
          />
        </div>

        <h2
          id="logout-title"
          className="text-xl font-semibold"
        >
          Confirm Logout
        </h2>

        <p
          id="logout-description"
          className="theme-text-secondary mt-3 text-sm leading-6"
        >
          Are you sure you want to log out of NetSentry AI?
          You will need to sign in again to access the security
          dashboard.
        </p>

        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="theme-border theme-text-secondary rounded-xl border px-5 py-2.5 text-sm font-medium transition hover:bg-black/5 hover:text-content dark:hover:bg-white/5"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="flex items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
          >
            <LogOut size={16} />
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );
}
