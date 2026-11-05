
import { ShieldCheck, Activity } from "lucide-react";

export default function DemoHeader() {
  return (
    <header className="text-center mb-8">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-500 text-xs font-bold tracking-[2px] mb-5">
        <ShieldCheck size={16} />
        NETSENTRY AI
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold theme-text mb-3">
        Security Demo
      </h1>

      <p className="theme-text-secondary text-sm max-w-md mx-auto leading-relaxed">
        Simulate security events and monitor suspicious
        activities through your NetSentry dashboard.
      </p>

      <div className="inline-flex items-center gap-2 mt-5 px-3 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs">
        <Activity size={14} />
        Demo Environment
      </div>
    </header>
  );
}
