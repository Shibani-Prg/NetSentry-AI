
import { SlidersHorizontal } from "lucide-react";
import SettingsToggle from "./SettingsToggle";

function DashboardPreferences({ settings, updateSetting }) {
  return (
    <section className="rounded-xl border border-white/[0.08] bg-[#10151e] p-5">
      <div className="flex items-center gap-3">
        <SlidersHorizontal size={21} className="text-indigo-300" />
        <div>
          <h2 className="font-medium text-white">Dashboard preferences</h2>
          <p className="mt-1 text-xs text-slate-500">
            Configure workspace display preferences
          </p>
        </div>
      </div>

      <div className="mt-4">
        <SettingsToggle
          label="Auto-refresh preference"
          description="Enable your preferred automatic refresh setting"
          checked={settings.autoRefresh}
          onChange={(value) => updateSetting("autoRefresh", value)}
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm text-slate-200">
          Refresh interval
        </label>
        <select
          value={settings.refreshInterval}
          disabled={!settings.autoRefresh}
          onChange={(event) =>
            updateSetting("refreshInterval", event.target.value)
          }
          className="mt-2 w-full rounded-lg border border-white/10 bg-[#0b1018] px-3 py-2.5 text-sm text-white outline-none focus:border-teal-300/50 disabled:opacity-50"
        >
          <option value="15">Every 15 seconds</option>
          <option value="30">Every 30 seconds</option>
          <option value="60">Every 60 seconds</option>
          <option value="300">Every 5 minutes</option>
        </select>
      </div>

      <div className="mt-5">
        <label className="block text-sm text-slate-200">Timezone</label>
        <select
          value={settings.timezone}
          onChange={(event) =>
            updateSetting("timezone", event.target.value)
          }
          className="mt-2 w-full rounded-lg border border-white/10 bg-[#0b1018] px-3 py-2.5 text-sm text-white outline-none focus:border-teal-300/50"
        >
          <option value="Asia/Kolkata">India — Asia/Kolkata</option>
          <option value="UTC">UTC</option>
          <option value="America/New_York">New York</option>
          <option value="Europe/London">London</option>
          <option value="Asia/Singapore">Singapore</option>
        </select>
      </div>

      <p className="mt-4 text-xs leading-5 text-slate-500">
        These are saved preferences. Other dashboard pages must read these
        settings before refreshing automatically or formatting dates with
        the selected timezone.
      </p>
    </section>
  );
}

export default DashboardPreferences;
