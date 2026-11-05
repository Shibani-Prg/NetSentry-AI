
import { useState } from "react";
import {
  X,
  UserRound,
  Mail,
  Save,
  Loader2,
  AlertCircle,
} from "lucide-react";

import {
  validateAdminName,
  validateAdminEmail,
} from "../../utils/admin/adminValidators";

export default function EditAdminModal({
  isOpen,
  onClose,
  admin,
  onSubmit,
  loading = false,
}) {
  if (!isOpen || !admin) return null;

  return (
    <EditAdminForm
      key={admin.id}
      admin={admin}
      onClose={onClose}
      onSubmit={onSubmit}
      loading={loading}
    />
  );
}

function EditAdminForm({ admin, onClose, onSubmit, loading }) {
  const [formData, setFormData] = useState(() => ({
    name: admin.name || "",
    email: admin.email || "",
  }));

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const nameError = validateAdminName(formData.name);

    if (nameError) {
      setError(nameError);
      return;
    }

    const emailError = validateAdminEmail(formData.email);

    if (emailError) {
      setError(emailError);
      return;
    }

    if (!onSubmit) {
      setError("Update functionality is not connected yet.");
      return;
    }

    try {
      await onSubmit({
        id: admin.id,
        name: formData.name.trim(),
        email: formData.email.trim(),
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to update administrator."
      );
    }
  };

  const inputClasses =
    "theme-surface-secondary theme-text theme-border w-full rounded-xl border py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-teal-500 dark:focus:border-teal-400/50 disabled:opacity-60";

  const labelClasses =
    "theme-text mb-2 block text-sm font-medium";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="theme-surface theme-border w-full max-w-lg rounded-2xl border p-6 shadow-2xl transition-colors duration-200">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="theme-text text-xl font-semibold">
              Edit Administrator
            </h2>

            <p className="theme-text-secondary mt-1 text-sm">
              Update administrator information.
            </p>
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

        {/* Error */}
        {error && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className={labelClasses}>
              Full Name
            </label>

            <div className="relative">
              <UserRound
                size={18}
                className="theme-text-secondary absolute left-4 top-1/2 -translate-y-1/2"
              />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
                placeholder="Enter admin name"
                className={inputClasses}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className={labelClasses}>
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="theme-text-secondary absolute left-4 top-1/2 -translate-y-1/2"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                placeholder="Enter email address"
                className={inputClasses}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">
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
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
