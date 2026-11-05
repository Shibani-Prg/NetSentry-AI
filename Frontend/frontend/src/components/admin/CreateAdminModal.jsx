
import { useState } from "react";

import {
  UserPlus,
  Eye,
  EyeOff,
  X,
  Loader2,
  AlertCircle,
} from "lucide-react";

import {
  validateAdminName,
  validateAdminEmail,
  validateAdminPassword,
} from "../../utils/admin/adminValidators";

export default function CreateAdminModal({
  isOpen,
  onClose,
  onSubmit,
  loading = false,
  error = "",
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setValidationError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError("");

    const nameError = validateAdminName(formData.name);

    if (nameError) {
      setValidationError(nameError);
      return;
    }

    const emailError = validateAdminEmail(formData.email);

    if (emailError) {
      setValidationError(emailError);
      return;
    }

    const passwordError = validateAdminPassword(formData.password);

    if (passwordError) {
      setValidationError(passwordError);
      return;
    }

    try {
      await onSubmit({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      setShowPassword(false);
      onClose();
    } catch {
      // API error is handled by useAdminActions.
    }
  };

  const inputClasses =
    "theme-surface-secondary theme-text theme-border w-full rounded-xl border px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-teal-500 dark:focus:border-teal-400/50 disabled:opacity-60";

  const labelClasses =
    "theme-text mb-2 block text-sm font-medium";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="theme-surface theme-border w-full max-w-lg rounded-2xl border p-6 shadow-2xl transition-colors duration-200 sm:p-8">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-teal-500/10 p-3 text-teal-600 dark:text-teal-400">
              <UserPlus size={22} />
            </div>

            <div>
              <h2 className="theme-text text-lg font-semibold">
                Create New Admin
              </h2>

              <p className="theme-text-secondary mt-1 text-sm">
                Add a new administrator account.
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

        {/* Error Message */}
        {(validationError || error) && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400">
            <AlertCircle size={18} />
            {validationError || error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className={labelClasses}>
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter admin name"
              autoComplete="name"
              disabled={loading}
              className={inputClasses}
            />
          </div>

          {/* Email */}
          <div>
            <label className={labelClasses}>
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@example.com"
              autoComplete="email"
              disabled={loading}
              className={inputClasses}
            />
          </div>

          {/* Password */}
          <div>
            <label className={labelClasses}>
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a strong password"
                autoComplete="new-password"
                disabled={loading}
                className={`${inputClasses} pr-12`}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                disabled={loading}
                className="theme-text-secondary absolute right-4 top-1/2 -translate-y-1/2 transition hover:text-teal-500"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>
            </div>

            <p className="theme-text-secondary mt-2 text-xs">
              Minimum 8 characters.
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
                  Creating...
                </>
              ) : (
                <>
                  <UserPlus size={18} />
                  Create Admin
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
