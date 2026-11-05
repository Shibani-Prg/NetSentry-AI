
import {
  X,
  ShieldCheck,
  ShieldAlert,
  Loader2,
  AlertTriangle,
} from "lucide-react";

export default function AdminStatusModal({
  isOpen,
  onClose,
  admin,
  onConfirm,
  loading = false,
}) {
  if (!isOpen || !admin) return null;

  const isActive = admin.is_active;
  const action = isActive ? "Deactivate" : "Activate";

  const handleConfirm = () => {
    if (!onConfirm || loading) return;
    onConfirm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="theme-surface theme-border w-full max-w-md rounded-2xl border p-6 shadow-2xl">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="theme-text text-lg font-semibold">
            Account Status
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="theme-text-secondary transition hover:text-rose-500 disabled:opacity-50"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Icon */}
        <div className="mb-5 flex justify-center">
          <div
            className={`rounded-full p-4 ${
              isActive
                ? "bg-red-500/10 text-red-600 dark:text-red-400"
                : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            }`}
          >
            {isActive ? (
              <ShieldAlert size={32} />
            ) : (
              <ShieldCheck size={32} />
            )}
          </div>
        </div>

        {/* Message */}
        <div className="text-center">
          <h3 className="theme-text text-lg font-semibold">
            {action} Administrator?
          </h3>

          <p className="theme-text-secondary mt-2 text-sm leading-6">
            Are you sure you want to {action.toLowerCase()} the
            account belonging to{" "}
            <span className="theme-text font-medium">
              {admin.name}
            </span>
            ?
          </p>
        </div>

        {/* Warning */}
        <div className="mt-5 flex gap-3 rounded-xl border border-amber-500/20 bg-amber-500/10 p-3">
          <AlertTriangle
            size={19}
            className="shrink-0 text-amber-600 dark:text-amber-400"
          />

          <p className="text-xs leading-5 text-amber-700 dark:text-amber-300">
            {isActive
              ? "This administrator may lose access to the NetSentry AI dashboard."
              : "This administrator will regain access to the dashboard."}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="theme-border theme-text-secondary rounded-xl border px-5 py-3 text-sm font-medium transition hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={loading || !onConfirm}
            className={`flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${
              isActive
                ? "bg-red-500 hover:bg-red-400"
                : "bg-emerald-500 hover:bg-emerald-400"
            }`}
          >
            {loading ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                Processing...
              </>
            ) : (
              <>
                {isActive ? (
                  <ShieldAlert size={17} />
                ) : (
                  <ShieldCheck size={17} />
                )}
                {action} Account
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
