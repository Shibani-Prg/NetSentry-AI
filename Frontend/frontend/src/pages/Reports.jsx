
import { Download, FileText, ShieldCheck } from "lucide-react";

function Reports() {
  return (
    <section>
      <div className="flex items-center gap-3">
        <div className="rounded-xl border border-indigo-300/20 bg-indigo-300/10 p-3 text-indigo-300">
          <FileText size={24} />
        </div>

        <div>
          <p className="text-xs tracking-widest text-teal-300">
            SECURITY INTELLIGENCE
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-white">
            Security Reports
          </h1>
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-400">
        Review security activity and prepare reports from recorded events.
      </p>

      <div className="mt-6 rounded-xl border border-white/[0.08] bg-[#10151e] p-6">
        <ShieldCheck size={24} className="text-teal-300" />

        <h2 className="mt-4 text-sm font-medium text-white">
          Report center
        </h2>

        <p className="mt-2 text-xs leading-5 text-slate-500">
          Your report tools will appear here. CSV export can be added using
          the real security-event data from your backend.
        </p>

        <button
          type="button"
          disabled
          className="mt-5 flex cursor-not-allowed items-center gap-2 rounded-lg border border-white/[0.08] px-4 py-2 text-xs text-slate-500"
        >
          <Download size={15} />
          Report export — coming soon
        </button>
      </div>
    </section>
  );
}

export default Reports;
