
import {
  X,
  Trash2,
  AlertTriangle,
  Loader2,
  ShieldAlert,
} from "lucide-react";

export default function DeleteAdminModal({
  isOpen,
  onClose,
  admin,
  onConfirm,
  loading = false,
}) {
  if (!isOpen || !admin) return null;

  const handleConfirm = () => {
    if (!onConfirm || loading) return;
    onConfirm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="theme-surface theme-border w-full max-w-md rounded-2xl border p-6 shadow-2xl transition-colors duration-200">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="theme-text text-lg font-semibold">
            Delete Administrator
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

        {/* Warning Icon */}
        <div className="mb-5 flex justify-center">
          <div className="rounded-full bg-red-500/10 p-4 text-red-600 dark:text-red-400">
            <ShieldAlert size={34} />
          </div>
        </div>

        {/* Confirmation Message */}
        <div className="text-center">
          <h3 className="theme-text text-lg font-semibold">
            Are you sure?
          </h3>

          <p className="theme-text-secondary mt-2 text-sm leading-6">
            You are about to delete the administrator account:
          </p>

          {/* Admin Details */}
          <div className="theme-surface-secondary theme-border mt-4 rounded-xl border p-4">
            <p className="theme-text font-semibold">
              {admin.name}
            </p>

            <p className="theme-text-secondary mt-1 text-sm">
              {admin.email}
            </p>

            <span className="mt-3 inline-block rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-700 dark:text-red-400">
              {admin.role === "super_admin"
                ? "Super Admin"
                : "Admin"}
            </span>
          </div>
        </div>

        {/* Warning */}
        <div className="mt-5 flex gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-3">
          <AlertTriangle
            size={19}
            className="shrink-0 text-red-600 dark:text-red-400"
          />

          <p className="text-xs leading-5 text-red-700 dark:text-red-300">
            This action may permanently remove the administrator's
            account and access. Make sure you have selected the
            correct account.
          </p>
        </div>

        {/* Buttons */}
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
            className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={18} />
                Delete Admin
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
