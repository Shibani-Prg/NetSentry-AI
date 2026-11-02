
import { ShieldAlert, Network, Activity } from "lucide-react";

function DetectionList({ detections = [] }) {
  const formatAttempts = (item) =>
    Number(item.attempts ?? item.failed_attempts ?? 0);

  const getSeverity = (attempts) => {
    if (attempts >= 20) return "CRITICAL";
    if (attempts >= 10) return "HIGH";
    if (attempts >= 5) return "MEDIUM";
    return "LOW";
  };

  const severityStyles = {
    CRITICAL: "border-rose-500/20 bg-rose-500/10 text-rose-300",
    HIGH: "border-orange-500/20 bg-orange-500/10 text-orange-300",
    MEDIUM: "border-amber-500/20 bg-amber-500/10 text-amber-300",
    LOW: "border-cyan-500/20 bg-cyan-500/10 text-cyan-300",
  };

  return (
    <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-800 bg-[#101722] p-4 sm:p-5">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-white sm:text-lg">
            Failed Login Detections
          </h2>

          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            Suspicious sources identified by the backend
          </p>
        </div>

        <span className="shrink-0 rounded-lg border border-rose-500/20 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-300">
          {detections.length} detected
        </span>
      </div>

      {detections.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-800 px-4 py-10 text-center">
          <ShieldAlert className="mb-3 h-8 w-8 text-slate-600" />

          <p className="text-sm font-medium text-slate-300">
            No failed-login detections returned
          </p>

          <p className="mt-1 max-w-sm text-xs text-slate-500">
            Detection results will appear when the backend reports suspicious sources.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {detections.map((item, index) => {
            const ip = item.source_ip ?? item.sourceIp ?? "Unknown IP";
            const attempts = formatAttempts(item);
            const severity = getSeverity(attempts);

            return (
              <div
                key={`${ip}-${index}`}
                className="flex min-w-0 flex-col gap-3 rounded-xl border border-slate-800/80 bg-slate-900/60 p-3 transition-colors hover:border-slate-700 sm:flex-row sm:items-center sm:justify-between sm:p-4"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="shrink-0 rounded-lg bg-rose-500/10 p-2.5">
                    <Network className="h-5 w-5 text-rose-400" />
                  </div>

                  <div className="min-w-0">
                    <p className="break-all font-mono text-sm font-medium text-slate-200">
                      {ip}
                    </p>

                    <p className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                      <Activity className="h-3.5 w-3.5 shrink-0" />
                      Failed authentication attempts
                    </p>
                  </div>
                </div>

                <div className="flex min-w-0 items-center justify-between gap-2 sm:justify-end sm:gap-3">
                  <span
                    className={`shrink-0 rounded-md border px-2.5 py-1 text-xs font-semibold ${
                      severityStyles[severity]
                    }`}
                  >
                    {severity}
                  </span>

                  <span className="whitespace-nowrap text-xs font-semibold text-white sm:text-sm">
                    {attempts.toLocaleString("en-IN")} attempts
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default DetectionList;
