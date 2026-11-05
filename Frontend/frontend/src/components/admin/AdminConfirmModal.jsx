
import {
  X,
  ArrowUpCircle,
  ArrowDownCircle,
  ShieldCheck,
  AlertTriangle,
  Loader2,
} from "lucide-react";

export default function AdminConfirmModal({
  isOpen,
  onClose,
  admin,
  action,
  onConfirm,
  loading = false,
}) {
  if (!isOpen || !admin || !action) return null;

  const isPromote = action === "promote";

  const handleConfirm = () => {
    if (!loading) onConfirm?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="theme-surface theme-border w-full max-w-md rounded-2xl border p-6 shadow-2xl">

        <div className="mb-5 flex items-center justify-between">
          <h2 className="theme-text text-lg font-semibold">
            {isPromote ? "Promote Administrator" : "Demote Super Admin"}
          </h2>

          <button
            onClick={onClose}
            disabled={loading}
            className="theme-text-secondary transition-colors hover:text-rose-500 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-5 flex justify-center">
          {isPromote ? (
            <ArrowUpCircle size={54} className="text-emerald-500 dark:text-emerald-400" />
          ) : (
            <ArrowDownCircle size={54} className="text-amber-500 dark:text-amber-400" />
          )}
        </div>

        <div className="mb-5 text-center">
          <p className="theme-text font-medium">{admin.name}</p>
          <p className="theme-text-secondary mt-1 text-sm">{admin.email}</p>
        </div>

        <div className="theme-surface-secondary theme-border mb-5 rounded-xl border p-4">
          <div className="flex items-center justify-center gap-3 text-sm">
            <span className="theme-text-secondary">
              {isPromote ? "Admin" : "Super Admin"}
            </span>
            <span className="theme-text-secondary">→</span>
            <span className="theme-text font-medium">
              {isPromote ? "Super Admin" : "Admin"}
            </span>
          </div>
        </div>

        <div className="mb-6 flex gap-3 rounded-lg bg-amber-500/10 p-3 text-sm text-amber-700 dark:text-amber-300">
          <AlertTriangle size={19} className="shrink-0" />
          <p>
            {isPromote
              ? "This administrator will receive Super Admin privileges."
              : "This account will lose its Super Admin privileges."}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="theme-border theme-text-secondary flex-1 rounded-lg border py-2.5 transition-colors hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            disabled={loading}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 font-medium text-white transition-colors disabled:opacity-50 ${
              isPromote
                ? "bg-emerald-600 hover:bg-emerald-500"
                : "bg-amber-600 hover:bg-amber-500"
            }`}
          >
            {loading ? (
              <Loader2 size={17} className="animate-spin" />
            ) : (
              <ShieldCheck size={17} />
            )}
            {loading ? "Processing..." : "Confirm"}
          </button>
        </div>

      </div>
    </div>
  );
}
