
import { Bell } from "lucide-react";
import SettingsToggle from "./SettingsToggle";

function AlertPreferences({ settings, updateSetting }) {
  return (
    <section className="rounded-xl border border-white/[0.08] bg-[#10151e] p-5">
      <div className="flex items-center gap-3">
        <Bell size={21} className="text-amber-300" />
        <div>
          <h2 className="font-medium text-white">Alert preferences</h2>
          <p className="mt-1 text-xs text-slate-500">
            Choose severity levels to monitor in your preferences
          </p>
        </div>
      </div>

      <div className="mt-4 divide-y divide-white/[0.06]">
        <SettingsToggle
          label="Critical alerts"
          description="Highest-priority security events"
          checked={settings.criticalAlerts}
          onChange={(value) => updateSetting("criticalAlerts", value)}
        />

        <SettingsToggle
          label="High severity alerts"
          description="Potentially serious threats"
          checked={settings.highAlerts}
          onChange={(value) => updateSetting("highAlerts", value)}
        />

        <SettingsToggle
          label="Medium severity alerts"
          description="Events that need investigation"
          checked={settings.mediumAlerts}
          onChange={(value) => updateSetting("mediumAlerts", value)}
        />
      </div>

      <p className="mt-3 text-xs leading-5 text-slate-500">
        These preferences are stored in this browser. Server-side alert
        delivery is not controlled by these toggles yet.
      </p>
    </section>
  );
}

export default AlertPreferences;
