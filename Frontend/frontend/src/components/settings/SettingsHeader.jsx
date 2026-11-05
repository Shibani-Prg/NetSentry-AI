import { Settings as SettingsIcon } from "lucide-react";

function SettingsHeader() {
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-xl border border-teal-500/20 bg-teal-500/10 p-3 text-teal-600 dark:text-teal-300">
        <SettingsIcon size={24} />
      </div>

      <div>
        <p className="text-xs tracking-widest text-teal-700 dark:text-teal-300">
          CONFIGURATION
        </p>
        <h1 className="theme-text mt-1 text-2xl font-semibold">
          Settings
        </h1>
        <p className="theme-text-secondary mt-1 text-sm">
          Manage your NetSentry AI workspace.
        </p>
      </div>
    </div>
  );
}

export default SettingsHeader;