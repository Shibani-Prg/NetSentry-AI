
import { useState } from "react";

import {
  X,
  LockKeyhole,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  KeyRound,
} from "lucide-react";

import {
  validateAdminPassword,
} from "../../utils/admin/adminValidators";

export default function AdminPasswordModal({
  isOpen,
  onClose,
  admin,
  onSubmit,
  loading = false,
}) {
  if (!isOpen || !admin) return null;

  return (
    <PasswordForm
      key={admin.id}
      admin={admin}
      onClose={onClose}
      onSubmit={onSubmit}
      loading={loading}
    />
  );
}

function PasswordForm({
  admin,
  onClose,
  onSubmit,
  loading,
}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!password || !confirmPassword) {
      setError("Please fill in both password fields.");
      return;
    }

    const passwordError = validateAdminPassword(password);

    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!onSubmit) {
      setError("Password reset functionality is not connected yet.");
      return;
    }

    try {
      await onSubmit({
        id: admin.id,
        password,
      });

      setPassword("");
      setConfirmPassword("");
      setShowPassword(false);
      setShowConfirmPassword(false);

      onClose();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to reset password."
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="theme-surface theme-border w-full max-w-lg rounded-2xl border p-6 shadow-2xl">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-teal-500/10 p-3 text-teal-600 dark:text-teal-400">
              <KeyRound size={22} />
            </div>

            <div>
              <h2 className="theme-text text-lg font-semibold">
                Reset Password
              </h2>

              <p className="theme-text-secondary mt-1 text-sm">
                Set a new administrator password.
              </p>
            </div>
          </div>

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

        {/* Admin Information */}
        <div className="theme-surface-secondary theme-border mb-5 rounded-xl border p-4">
          <p className="theme-text-secondary text-xs">
            Administrator
          </p>

          <p className="theme-text mt-1 font-medium">
            {admin.name}
          </p>

          <p className="theme-text-secondary text-sm">
            {admin.email}
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400">
            <AlertCircle size={18} className="shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* New Password */}
          <div>
            <label className="theme-text-secondary mb-2 block text-sm font-medium">
              New Password
            </label>

            <div className="relative">
              <LockKeyhole
                size={18}
                className="theme-text-secondary absolute left-4 top-1/2 -translate-y-1/2"
              />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Enter new password"
                autoComplete="new-password"
                disabled={loading}
                className="theme-surface-secondary theme-border theme-text w-full rounded-xl border py-3 pl-11 pr-12 text-sm outline-none placeholder:text-slate-400 focus:border-teal-500 disabled:opacity-60"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                disabled={loading}
                className="theme-text-secondary absolute right-4 top-1/2 -translate-y-1/2 hover:text-teal-500"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="theme-text-secondary mb-2 block text-sm font-medium">
              Confirm Password
            </label>

            <div className="relative">
              <LockKeyhole
                size={18}
                className="theme-text-secondary absolute left-4 top-1/2 -translate-y-1/2"
              />

              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError("");
                }}
                placeholder="Confirm new password"
                autoComplete="new-password"
                disabled={loading}
                className="theme-surface-secondary theme-border theme-text w-full rounded-xl border py-3 pl-11 pr-12 text-sm outline-none placeholder:text-slate-400 focus:border-teal-500 disabled:opacity-60"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword((prev) => !prev)
                }
                disabled={loading}
                className="theme-text-secondary absolute right-4 top-1/2 -translate-y-1/2 hover:text-teal-500"
                aria-label={
                  showConfirmPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            <p className="theme-text-secondary mt-2 text-xs">
              Password must contain at least 8 characters.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="theme-border theme-text-secondary rounded-xl border px-5 py-3 text-sm font-medium transition hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-xl bg-teal-500 px-5 py-3 text-sm font-semibold text-[#06121a] transition hover:bg-teal-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Resetting...
                </>
              ) : (
                <>
                  <KeyRound size={18} />
                  Reset Password
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
