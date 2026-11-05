import { Wifi, ShieldCheck } from "lucide-react";

function SimulatorHeader() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="mb-2 flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
          <Wifi size={18} />
          <span className="text-xs font-semibold uppercase tracking-[0.2em]">
            Network Security Lab
          </span>
        </div>

        <h1 className="theme-text text-2xl font-bold sm:text-3xl">
          LAN Event Simulator
        </h1>

        <p className="theme-text-secondary mt-2 text-sm">
          Generate controlled security events and monitor their activity.
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3">
        <ShieldCheck size={18} className="text-emerald-600 dark:text-emerald-400" />
        <span className="text-sm text-emerald-600 dark:text-emerald-400">
          Simulation Mode
        </span>
      </div>
    </div>
  );
}

export default SimulatorHeader;