import { Info, Smartphone, Server, ShieldCheck } from "lucide-react";

function SimulatorInfo() {
  return (
    <div className="theme-surface border border-cyan-500/20 p-5 rounded-xl">
      <div className="mb-4 flex items-center gap-2">
        <Info size={18} className="text-cyan-600 dark:text-cyan-400" />
        <h2 className="theme-text font-semibold">How LAN Simulation Works</h2>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div className="flex gap-3">
          <Smartphone className="shrink-0 text-cyan-600 dark:text-cyan-400" size={20} />
          <div>
            <h3 className="theme-text text-sm font-medium">Client Device</h3>
            <p className="theme-text-secondary mt-1 text-xs leading-5">
              A device on the same Wi-Fi network can access the demo endpoint.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Server className="shrink-0 text-cyan-600 dark:text-cyan-400" size={20} />
          <div>
            <h3 className="theme-text text-sm font-medium">Backend Server</h3>
            <p className="theme-text-secondary mt-1 text-xs leading-5">
              Express receives the request and records its source IP and event.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <ShieldCheck className="shrink-0 text-cyan-600 dark:text-cyan-400" size={20} />
          <div>
            <h3 className="theme-text text-sm font-medium">Security Monitoring</h3>
            <p className="theme-text-secondary mt-1 text-xs leading-5">
              Recorded events become available to the NetSentry dashboard.
            </p>
          </div>
        </div>
      </div>

      <p className="theme-text-secondary mt-5 border-t border-cyan-500/10 pt-4 text-xs leading-5">
        This is an application-level event simulator, not a Wi-Fi packet
        capture tool. Use demo usernames only; never enter real passwords.
      </p>
    </div>
  );
}

export default SimulatorInfo;