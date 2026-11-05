import { SlidersHorizontal, Moon, Sun } from "lucide-react";
import SettingsToggle from "./SettingsToggle";
import useTheme from "../../hooks/useTheme";

function DashboardPreferences({ settings, updateSetting }) {
  const { theme, setTheme } = useTheme();

  return (
    <section className="theme-surface theme-border rounded-xl border p-5">
      <div className="flex items-center gap-3">
        <SlidersHorizontal size={21} className="text-indigo-600 dark:text-indigo-300" />
        <div>
          <h2 className="theme-text font-medium">
            Dashboard preferences
          </h2>
          <p className="theme-text-secondary mt-1 text-xs">
            Configure workspace display preferences
          </p>
        </div>
      </div>

      {/* Appearance */}
      <div className="mt-5">
        <label className="theme-text block text-sm">
          Appearance
        </label>

        <div className="mt-2 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setTheme("dark")}
            className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm transition ${
              theme === "dark"
                ? "border-teal-500/50 bg-teal-500/10 text-teal-700 dark:text-teal-300"
                : "theme-border theme-surface-secondary theme-text-secondary hover:border-teal-500/40"
            }`}
          >
            <Moon size={16} />
            Dark
          </button>

          <button
            type="button"
            onClick={() => setTheme("light")}
            className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm transition ${
              theme === "light"
                ? "border-teal-500/50 bg-teal-500/10 text-teal-700 dark:text-teal-300"
                : "theme-border theme-surface-secondary theme-text-secondary hover:border-teal-500/40"
            }`}
          >
            <Sun size={16} />
            Light
          </button>
        </div>
      </div>

      {/* Auto Refresh */}
      <div className="mt-5">
        <SettingsToggle
          label="Auto-refresh preference"
          description="Enable your preferred automatic refresh setting"
          checked={settings.autoRefresh}
          onChange={(value) => updateSetting("autoRefresh", value)}
        />
      </div>

      {/* Refresh Interval */}
      <div className="mt-4">
        <label className="theme-text block text-sm">
          Refresh interval
        </label>
        <select
          value={settings.refreshInterval}
          disabled={!settings.autoRefresh}
          onChange={(event) =>
            updateSetting("refreshInterval", event.target.value)
          }
          className="theme-surface-secondary theme-border theme-text mt-2 w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-teal-500/50 disabled:opacity-50"
        >
          <option value="15">Every 15 seconds</option>
          <option value="30">Every 30 seconds</option>
          <option value="60">Every 60 seconds</option>
          <option value="300">Every 5 minutes</option>
        </select>
      </div>

      {/* Timezone */}
      <div className="mt-5">
        <label className="theme-text block text-sm">
          Timezone
        </label>
        <select
          value={settings.timezone}
          onChange={(event) =>
            updateSetting("timezone", event.target.value)
          }
          className="theme-surface-secondary theme-border theme-text mt-2 w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-teal-500/50"
        >
          <option value="Asia/Kolkata">India — Asia/Kolkata</option>
          <option value="UTC">UTC</option>
          <option value="America/New_York">New York</option>
          <option value="Europe/London">London</option>
          <option value="Asia/Singapore">Singapore</option>
        </select>
      </div>

      <p className="theme-text-secondary mt-4 text-xs leading-5">
        These are saved preferences. Other dashboard pages must read these
        settings before refreshing automatically or formatting dates with
        the selected timezone.
      </p>
    </section>
  );
}

export default DashboardPreferences;