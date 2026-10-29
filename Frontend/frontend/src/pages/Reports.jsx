
import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  Download,
  FileText,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

import { useSecurityReport } from "../hooks/userSecurityReport.js";
import ReportStatCard from "../components/reports/ReportStatCard";
import ReportFilters from "../components/reports/ReportFilters";
import SeverityBreakdown from "../components/reports/SeverityBreakdown";
import ReportEventsTable from "../components/reports/ReportEventsTable";

function escapeCsv(value) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

function Reports() {
  const [range, setRange] = useState("7d");

  const { report, loading, error, refresh } =
    useSecurityReport(range);

  const summary = report?.summary ?? {};
  const events = report?.events ?? [];
  const severityBreakdown = report?.severityBreakdown ?? [];
  const totalEvents = Number(summary.total_events ?? 0);

  const stats = [
    {
      title: "Total Events",
      value: totalEvents,
      icon: Activity,
      color: "text-indigo-300",
    },
    {
      title: "Critical Events",
      value: summary.critical_events,
      icon: ShieldAlert,
      color: "text-red-400",
    },
    {
      title: "High Severity",
      value: summary.high_events,
      icon: AlertTriangle,
      color: "text-orange-300",
    },
    {
      title: "Failed Logins",
      value: summary.failed_logins,
      icon: ShieldCheck,
      color: "text-teal-300",
    },
  ];

  function downloadCsv() {
    if (!report) return;

    const headers = [
      "Event ID",
      "Source",
      "Source IP",
      "Event Type",
      "Severity",
      "Created At",
    ];

    const rows = events.map((event) => [
      event.id,
      event.source_name,
      event.source_ip,
      event.event_type,
      event.severity,
      event.created_at,
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCsv).join(","))
      .join("\r\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `netsentry-report-${range}.csv`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <FileText size={23} className="text-indigo-400" />
            <h1 className="text-2xl font-semibold text-white">
              Security Reports
            </h1>
          </div>

          <p className="mt-2 text-sm text-slate-400">
            Analyze security events and export reports from NetSentry AI.
          </p>
        </div>

        <button
          type="button"
          onClick={downloadCsv}
          disabled={!report || loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download size={17} />
          Download CSV
        </button>
      </div>

      <ReportFilters
        range={range}
        onRangeChange={setRange}
        onRefresh={refresh}
        loading={loading}
      />

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
          <p className="font-medium text-red-400">
            Unable to load security report
          </p>

          <p className="mt-1 break-words text-sm text-slate-400">
            {error}
          </p>

          <button
            type="button"
            onClick={refresh}
            className="mt-3 rounded-lg border border-red-500/20 px-3 py-2 text-sm text-red-300 hover:bg-red-500/10"
          >
            Try Again
          </button>
        </div>
      )}

      {loading && !report && (
        <div className="rounded-xl border border-white/[0.08] bg-[#10151e] p-10 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-indigo-400 border-t-transparent" />
          <p className="mt-4 text-sm text-slate-400">
            Loading security report...
          </p>
        </div>
      )}

      {!error && report && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <ReportStatCard key={stat.title} {...stat} />
            ))}
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            <SeverityBreakdown
              items={severityBreakdown}
              total={totalEvents}
            />

            <div className="rounded-xl border border-white/[0.08] bg-[#10151e] p-5">
              <h3 className="font-semibold text-white">
                Report Details
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Metadata for this report
              </p>

              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-slate-400">
                    Selected period
                  </span>
                  <span className="text-sm font-medium text-white">
                    {range === "24h"
                      ? "Last 24 Hours"
                      : range === "7d"
                        ? "Last 7 Days"
                        : "Last 30 Days"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-slate-400">
                    Records returned
                  </span>
                  <span className="text-sm font-medium text-white">
                    {events.length.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-slate-400">
                    Report generated
                  </span>
                  <span className="text-right text-sm text-white">
                    {report.generatedAt
                      ? new Date(report.generatedAt).toLocaleString()
                      : "—"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <ReportEventsTable events={events} />
        </>
      )}
    </section>
  );
}

export default Reports;
