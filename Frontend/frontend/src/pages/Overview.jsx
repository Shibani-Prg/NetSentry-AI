
import StatCard from "../components/dashboard/StatCard";
import EventActivityChart from "../components/dashboard/EventActivityChart.jsx";
import SeverityChart from "../components/dashboard/SeverityChart.jsx";
import DetectionList from "../components/dashboard/DetectionList.jsx";
import { useSecurityEvents } from "../hooks/useSecurityEvents.js";

function Overview() {
  const {
    events,
    detections,
    totalEvents,
    criticalTotal,
    highTotal,
    loading,
    error,
  } = useSecurityEvents();

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
        <p className="animate-pulse text-sm text-slate-400">
          Loading security intelligence...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-5">
        <h2 className="font-semibold text-rose-300">
          Unable to load security data
        </h2>
        <p className="mt-2 text-sm text-slate-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-emerald-400">
          Security Operations Center
        </p>

        <h1 className="mt-2 text-2xl font-semibold text-white">
          Threat Intelligence
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Monitor security events and suspicious activity.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Events"
          value={totalEvents}
        />

        <StatCard
          title="Critical Events"
          value={criticalTotal}
        />

        <StatCard
          title="High Severity Events"
          value={highTotal}
        />

        <StatCard
          title="Failed Login Detections"
          value={detections.length}
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <EventActivityChart events={events} />
        <SeverityChart events={events} />
      </div>

      <DetectionList detections={detections} />
    </div>
  );
}

export default Overview;
