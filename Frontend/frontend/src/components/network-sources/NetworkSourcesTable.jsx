
import { Network, Server, AlertTriangle } from "lucide-react";

function NetworkSourcesTable({ sources, loading, error }) {
  return (
    <div className="theme-surface theme-border min-w-0 overflow-hidden rounded-xl border transition-colors duration-200">
      <div className="theme-border border-b p-4 sm:p-5">
        <h2 className="theme-text font-semibold">
          Registered Sources
        </h2>

        <p className="theme-text-secondary mt-1 text-xs leading-relaxed sm:text-sm">
          Source inventory and associated security events from PostgreSQL.
        </p>
      </div>

      {loading ? (
        <p className="theme-text-secondary p-8 text-center text-sm">
          Loading network sources...
        </p>
      ) : error ? (
        <div className="p-6 text-center">
          <p className="text-sm text-rose-500">
            Unable to display network sources.
          </p>
        </div>
      ) : sources.length === 0 ? (
        <div className="p-6 text-center sm:p-10">
          <Network size={32} className="theme-text-secondary mx-auto" />

          <p className="theme-text mt-3 font-medium">
            No registered sources found
          </p>

          <p className="theme-text-secondary mt-1 text-sm">
            Add a source record to your database to display it here.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto overscroll-x-contain">
          <table className="w-full min-w-[700px] table-fixed text-left text-sm">
            <thead className="theme-text-secondary bg-black/[0.03] text-xs uppercase tracking-wide">
              <tr className="theme-border border-b">
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
                  className="theme-border border-b last:border-0 hover:bg-black/[0.03]"
                >
                  <td className="px-4 py-4 sm:px-5">
                    <div className="flex items-center gap-3">
                      <div className="shrink-0 rounded-lg bg-teal-300/10 p-2 text-teal-600 dark:text-teal-300">
                        <Server size={17} />
                      </div>

                      <div className="min-w-0">
                        <p className="theme-text break-words font-medium">
                          {source.source_name}
                        </p>

                        <p className="theme-text-secondary mt-1 text-xs">
                          Source ID: {source.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="theme-text-secondary break-all px-4 py-4 font-mono sm:px-5">
                    {source.ip_address || "Not assigned"}
                  </td>

                  <td className="theme-text px-4 py-4 sm:px-5">
                    {Number(source.total_events || 0).toLocaleString("en-IN")}
                  </td>

                  <td className="px-4 py-4 sm:px-5">
                    <span className="theme-text inline-flex items-center gap-2">
                      {Number(source.critical_events || 0) > 0 && (
                        <AlertTriangle
                          size={15}
                          className="shrink-0 text-rose-500"
                        />
                      )}

                      {Number(source.critical_events || 0)}
                    </span>
                  </td>

                  <td className="theme-text-secondary break-words px-3 py-4 text-xs sm:px-5 sm:text-sm">
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
