
import {
  LockKeyhole,
  User,
  AlertTriangle,
  Loader2,
} from "lucide-react";

export default function LoginSimulation({
  username,
  setUsername,
  onSubmit,
  loading,
}) {
  return (
    <section className="theme-surface theme-border border rounded-2xl p-5 sm:p-6 shadow-sm transition-colors duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-red-500/10 text-red-500">
          <LockKeyhole size={21} />
        </div>

        <div>
          <h2 className="theme-text font-semibold">
            Login Simulation
          </h2>

          <p className="theme-text-secondary text-xs mt-1">
            Generate a failed login security event
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit}>
        <label
          htmlFor="demo-username"
          className="block theme-text-secondary text-sm mb-2"
        >
          Demo Username
        </label>

        <div className="relative mb-4">
          <User
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 theme-text-secondary"
          />

          <input
            id="demo-username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            maxLength={50}
            autoComplete="off"
            required
            className="w-full pl-10 pr-4 py-3 rounded-xl theme-surface-secondary theme-text theme-border border outline-none focus:border-blue-500 text-sm transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !username.trim()}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 transition-colors"
        >
          {loading ? (
            <>
              <Loader2 size={17} className="animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <AlertTriangle size={17} />
              Simulate Failed Login
            </>
          )}
        </button>
      </form>

      <div className="flex items-center gap-2 mt-4 text-xs text-red-500">
        <span className="w-2 h-2 rounded-full bg-red-500" />
        HIGH SEVERITY
      </div>
    </section>
  );
}
