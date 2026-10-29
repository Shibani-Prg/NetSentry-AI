import { ShieldCheck } from "lucide-react";

function DetectionSettings({ settings, updateSetting }) {
  return (
    <section className="rounded-xl border border-white/[0.08] bg-[#10151e] p-5">
      <div className="flex items-center gap-3">
        <ShieldCheck size={21} className="text-indigo-300" />
        <div>
          <h2 className="font-medium text-white">Detection configuration</h2>
          <p className="mt-1 text-xs text-slate-500">
            Failed-login detection preferences
          </p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between gap-3">
          <label className="text-sm text-slate-200">
            Failed-login threshold
          </label>
          <span className="font-semibold text-teal-300">
            {settings.failedLoginThreshold}
          </span>
        </div>

        <input
          type="range"
          min="3"
          max="20"
          value={settings.failedLoginThreshold}
          onChange={(event) =>
            updateSetting("failedLoginThreshold", Number(event.target.value))
          }
          className="mt-3 w-full accent-teal-400"
        />

        <p className="mt-2 text-xs text-slate-500">
          Number of failed login attempts that should trigger a detection.
        </p>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between gap-3">
          <label className="text-sm text-slate-200">
            Detection time window
          </label>
          <span className="font-semibold text-teal-300">
            {settings.detectionWindow} min
          </span>
        </div>

        <input
          type="range"
          min="1"
          max="30"
          value={settings.detectionWindow}
          onChange={(event) =>
            updateSetting("detectionWindow", Number(event.target.value))
          }
          className="mt-3 w-full accent-teal-400"
        />
      </div>

       <div className="mt-5 rounded-lg border border-teal-300/15 bg-teal-300/[0.04] p-3">
        <p className="flex items-center gap-2 text-xs font-medium text-teal-200">
            <ShieldCheck size={14} />
            Server-side detection enabled
        </p>
        <p className="mt-2 text-xs leading-5 text-slate-400">
            Saved threshold and detection window are applied by the backend
            detection engine.
        </p>
        </div>
    </section>
  );
}

export default DetectionSettings;
