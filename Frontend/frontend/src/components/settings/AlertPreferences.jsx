import { Bell } from "lucide-react";
import SettingsToggle from "./SettingsToggle";

function AlertPreferences({ settings, updateSetting }) {
  return (
    <section className="theme-surface theme-border rounded-xl border p-5">
      <div className="flex items-center gap-3">
        <Bell size={21} className="text-amber-600 dark:text-amber-300" />
        <div>
          <h2 className="theme-text font-medium">Alert preferences</h2>
          <p className="theme-text-secondary mt-1 text-xs">
            Choose severity levels to monitor in your preferences
          </p>
        </div>
      </div>

      <div className="theme-border mt-4 divide-y">
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

      <p className="theme-text-secondary mt-3 text-xs leading-5">
        These preferences are stored in this browser. Server-side alert
        delivery is not controlled by these toggles yet.
      </p>
    </section>
  );
}

export default AlertPreferences;