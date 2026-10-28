
import { Network, Server, ShieldCheck } from "lucide-react";

function NetworkSources() {
  return (
    <section>
      <div className="flex items-center gap-3">
        <div className="rounded-xl border border-teal-300/20 bg-teal-300/10 p-3 text-teal-300">
          <Network size={24} />
        </div>

        <div>
          <p className="text-xs tracking-widest text-teal-300">
            INFRASTRUCTURE
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-white">
            Network Sources
          </h1>
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-400">
        Manage registered event sources and inspect their security activity.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-white/[0.08] bg-[#10151e] p-5">
          <Server size={20} className="text-teal-300" />
          <h2 className="mt-4 text-sm font-medium text-white">
            Registered sources
          </h2>
          <p className="mt-2 text-xs leading-5 text-slate-500">
            Your event-source records will be displayed here when connected
            to the backend.
          </p>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-[#10151e] p-5">
          <ShieldCheck size={20} className="text-indigo-300" />
          <h2 className="mt-4 text-sm font-medium text-white">
            Source monitoring
          </h2>
          <p className="mt-2 text-xs leading-5 text-slate-500">
            Review source identifiers, IP addresses and associated security
            events.
          </p>
        </div>
      </div>
    </section>
  );
}

export default NetworkSources;
