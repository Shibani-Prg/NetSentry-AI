
import { Settings as SettingsIcon } from "lucide-react";

function SettingsHeader() {
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-xl border border-teal-300/20 bg-teal-300/10 p-3 text-teal-300">
        <SettingsIcon size={24} />
      </div>

      <div>
        <p className="text-xs tracking-widest text-teal-300">
          CONFIGURATION
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-white">
          Settings
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Manage your NetSentry AI workspace.
        </p>
      </div>
    </div>
  );
}

export default SettingsHeader;
