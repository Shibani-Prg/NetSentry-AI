
import { Settings as SettingsIcon, ShieldCheck, Database, Bell } from "lucide-react";

function Settings() {
  return (
    <section>
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
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-400">
        Review your NetSentry AI workspace configuration.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-white/[0.08] bg-[#10151e] p-5">
          <Database size={21} className="text-teal-300" />
          <h2 className="mt-4 text-sm font-medium text-white">
            Backend connection
          </h2>
          <p className="mt-2 text-xs leading-5 text-slate-500">
            API endpoint: http://localhost:5000
          </p>
          <p className="mt-2 text-[11px] text-slate-500">
            Connection status will be verified through an API request.
          </p>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-[#10151e] p-5">
          <ShieldCheck size={21} className="text-indigo-300" />
          <h2 className="mt-4 text-sm font-medium text-white">
            Security configuration
          </h2>
          <p className="mt-2 text-xs leading-5 text-slate-500">
            Authentication and access control will be configured in a later
            development phase.
          </p>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-[#10151e] p-5">
          <Bell size={21} className="text-amber-300" />
          <h2 className="mt-4 text-sm font-medium text-white">
            Alert preferences
          </h2>
          <p className="mt-2 text-xs leading-5 text-slate-500">
            Notification preferences will be added when alert management is
            implemented.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Settings;
