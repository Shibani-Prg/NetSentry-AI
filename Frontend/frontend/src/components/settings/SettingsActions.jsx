import { RotateCcw, Save, CheckCircle2 } from "lucide-react";

function SettingsActions({ onSave, onReset, saved, saveError }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {saved && (
        <span className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 size={15} />
          Saved
        </span>
      )}

      {saveError && (
        <span role="alert" className="text-xs text-rose-600 dark:text-rose-300">
          {saveError}
        </span>
      )}

      <button
        type="button"
        onClick={onReset}
        className="theme-border theme-text-secondary flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition hover:bg-slate-100 dark:hover:bg-white/5"
      >
        <RotateCcw size={15} />
        Reset
      </button>

      <button
        type="button"
        onClick={onSave}
        className="flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-500 dark:bg-teal-400 dark:text-slate-950 dark:hover:bg-teal-300"
      >
        <Save size={15} />
        Save Settings
      </button>
    </div>
  );
}

export default SettingsActions;