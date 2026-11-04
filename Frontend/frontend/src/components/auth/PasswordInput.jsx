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
        className="block text-sm font-medium text-slate-300"
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
          className="w-full rounded-lg border border-slate-700 bg-[#111827] px-4 py-3 pr-12 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
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