
import { Network, Server, AlertTriangle } from "lucide-react";

function NetworkSourcesTable({ sources, loading, error }) {
  return (
    <div className="min-w-0 overflow-hidden rounded-xl border border-white/[0.08] bg-[#10151e]">
      <div className="border-b border-white/[0.08] p-4 sm:p-5">
        <h2 className="font-semibold text-white">
          Registered Sources
        </h2>

        <p className="mt-1 text-xs leading-relaxed text-slate-400 sm:text-sm">
          Source inventory and associated security events from PostgreSQL.
        </p>
      </div>

      {loading ? (
        <p className="p-8 text-center text-sm text-slate-400">
          Loading network sources...
        </p>
      ) : error ? (
        <div className="p-6 text-center">
          <p className="text-sm text-rose-300">
            Unable to display network sources.
          </p>
        </div>
      ) : sources.length === 0 ? (
        <div className="p-6 text-center sm:p-10">
          <Network size={32} className="mx-auto text-slate-500" />

          <p className="mt-3 font-medium text-slate-200">
            No registered sources found
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Add a source record to your database to display it here.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto overscroll-x-contain">
          <table className="w-full min-w-[700px] table-fixed text-left text-sm">
            <thead className="bg-white/[0.02] text-xs uppercase tracking-wide text-slate-400">
              <tr className="border-b border-white/10">
                <th className="px-4 py-4 sm:px-5">Source</th>
                <th className="px-4 py-4 sm:px-5">IP Address</th>
                <th className="px-4 py-4 sm:px-5">Total Events</th>
                <th className="px-4 py-4 sm:px-5">Critical Events</th>
                <th className="px-4 py-4 sm:px-5">Last Activity</th>
              </tr>
            </thead>

            <tbody>
              {sources.map((source) => (
                <tr
                  key={source.id}
                  className="border-b border-white/[0.06] last:border-0 hover:bg-white/[0.02]"
                >
                  <td className="px-4 py-4 sm:px-5">
                    <div className="flex items-center gap-3">
                      <div className="shrink-0 rounded-lg bg-teal-300/10 p-2 text-teal-300">
                        <Server size={17} />
                      </div>

                      <div className="min-w-0">
                        <p className="break-words font-medium text-white">
                          {source.source_name}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Source ID: {source.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="break-all px-4 py-4 font-mono text-slate-300 sm:px-5">
                    {source.ip_address || "Not assigned"}
                  </td>

                  <td className="px-4 py-4 text-slate-200 sm:px-5">
                    {Number(source.total_events || 0).toLocaleString("en-IN")}
                  </td>

                  <td className="px-4 py-4 sm:px-5">
                    <span className="inline-flex items-center gap-2 text-slate-200">
                      {Number(source.critical_events || 0) > 0 && (
                        <AlertTriangle
                          size={15}
                          className="shrink-0 text-rose-300"
                        />
                      )}

                      {Number(source.critical_events || 0)}
                    </span>
                  </td>

                  <td className="break-words px-3 py-4 text-xs text-slate-400 sm:px-5 sm:text-sm">
                    {source.last_event_at
                        ? new Date(source.last_event_at).toLocaleString()
                        : "No events yet"}
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default NetworkSourcesTable;
