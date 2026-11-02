
import {
  Server,
  Activity,
  ShieldCheck,
} from "lucide-react";

import useNetworkSources from "../hooks/useNetworkSources";

import NetworkSourcesHeader from "../components/network-sources/NetworkSourcesHeader";
import NetworkSummaryCard from "../components/network-sources/NetworkSummaryCard";
import NetworkSourcesTable from "../components/network-sources/NetworkSourcesTable";

function NetworkSources() {
  const {
    sources,
    loading,
    refreshing,
    error,
    totalEvents,
    criticalEvents,
    refreshSources,
  } = useNetworkSources();

  return (
    <section className="min-w-0 space-y-5 sm:space-y-6">

      <NetworkSourcesHeader
        loading={loading}
        refreshing={refreshing}
        onRefresh={refreshSources}
      />

      {error && (
        <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-3 sm:p-4">
          <p className="break-words text-sm text-rose-300">
            {error}
          </p>

          <button
            type="button"
            onClick={refreshSources}
            disabled={refreshing}
            className="mt-2 text-sm text-teal-300 hover:text-teal-200 disabled:opacity-50"
          >
            Try again
          </button>
        </div>
      )}

      <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">

        <NetworkSummaryCard
          icon={<Server size={20} />}
          title="Registered Sources"
          value={loading ? "—" : sources.length}
          color="text-teal-300"
        />

        <NetworkSummaryCard
          icon={<Activity size={20} />}
          title="Total Events"
          value={loading ? "—" : totalEvents.toLocaleString("en-IN")}
          color="text-indigo-300"
        />

        <NetworkSummaryCard
          icon={<ShieldCheck size={20} />}
          title="Critical Events"
          value={loading ? "—" : criticalEvents.toLocaleString("en-IN")}
          color="text-rose-300"
        />

      </div>

      <NetworkSourcesTable
        sources={sources}
        loading={loading}
        error={error}
      />

    </section>
  );
}

export default NetworkSources;
