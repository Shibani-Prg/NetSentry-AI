
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput({
  value,
  onChange,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <label
        htmlFor="password"
        className="theme-text block text-sm font-medium"
      >
        Password
      </label>

      <div className="relative">
        <input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder="Enter your password"
          autoComplete="current-password"
          required
          className="theme-surface-secondary theme-text theme-border w-full rounded-lg border px-4 py-3 pr-12 text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="theme-text-secondary absolute right-4 top-1/2 -translate-y-1/2 transition hover:text-cyan-500"
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
  );
}
