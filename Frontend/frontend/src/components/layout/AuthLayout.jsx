import { ShieldCheck, Activity } from "lucide-react";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#080d18] flex items-center justify-center px-4 py-10 relative overflow-hidden">

      {/* Background effects */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="relative z-10 w-full max-w-md">

        <div className="text-center mb-8">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10">
            <ShieldCheck size={34} className="text-cyan-400" />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white">
            NetSentry <span className="text-cyan-400">AI</span>
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Intelligent Security Monitoring Platform
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#0f1726]/95 p-7 shadow-2xl shadow-black/30 sm:p-8">

          <div className="mb-7">
            <div className="flex items-center gap-2 text-cyan-400 mb-2">
              <Activity size={18} />
              <span className="text-xs font-semibold uppercase tracking-widest">
                Secure Admin Access
              </span>
            </div>

            <h2 className="text-2xl font-semibold text-white">
              Welcome back
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Sign in to access your security dashboard.
            </p>
          </div>

          {children}
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          NetSentry AI · Authorized access only
        </p>
      </div>
    </div>
  );
}