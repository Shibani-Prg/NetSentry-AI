
import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

import { useSecurityReport } from "../hooks/userSecurityReport.js";

import ReportHeader from "../components/reports/ReportHeader.jsx";
import ReportDetails from "../components/reports/ReportDetails.jsx";
import ReportStatCard from "../components/reports/ReportStatCard.jsx";
import ReportFilters from "../components/reports/ReportFilters.jsx";
import SeverityBreakdown from "../components/reports/SeverityBreakdown.jsx";
import ReportEventsTable from "../components/reports/ReportEventsTable.jsx";

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

  // Summary statistics
  const stats = [
    {
      title: "Total Events",
      value: totalEvents,
      icon: Activity,
      color: "text-indigo-300",
    },
    {
      title: "Critical Events",
      value: summary.critical_events ?? 0,
      icon: ShieldAlert,
      color: "text-red-400",
    },
    {
      title: "High Severity",
      value: summary.high_events ?? 0,
      icon: AlertTriangle,
      color: "text-orange-300",
    },
    {
      title: "Failed Logins",
      value: summary.failed_logins ?? 0,
      icon: ShieldCheck,
      color: "text-teal-300",
    },
  ];

  // CSV Export
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
    <section className="min-w-0 space-y-5 sm:space-y-6">

      {/* Header */}
      <ReportHeader
        loading={loading}
        reportAvailable={!!report}
        onDownload={downloadCsv}
      />

      {/* Filters */}
      <ReportFilters
        range={range}
        onRangeChange={setRange}
        onRefresh={refresh}
        loading={loading}
      />

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-3 sm:p-4">
          <p className="font-medium text-red-400">
            Unable to load security report
          </p>

          <p className="mt-1 break-words text-sm text-slate-400">
            {error}
          </p>

          <button
            type="button"
            onClick={refresh}
            className="mt-3 rounded-lg border border-red-500/20 px-3 py-2 text-sm text-red-300 transition hover:bg-red-500/10"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Initial Loading */}
      {loading && !report && (
        <div className="rounded-xl border border-white/[0.08] bg-[#10151e] p-8 text-center sm:p-10">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-indigo-400 border-t-transparent" />

          <p className="mt-4 text-sm text-slate-400">
            Loading security report...
          </p>
        </div>
      )}

      {/* Report Content */}
      {!error && report && (
        <>
          {/* Statistics */}
          <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
            {stats.map((stat) => (
              <ReportStatCard
                key={stat.title}
                {...stat}
              />
            ))}
          </div>

          {/* Severity and Details */}
          <div className="grid min-w-0 gap-4 xl:grid-cols-2 sm:gap-5">

            <SeverityBreakdown
              items={severityBreakdown}
              total={totalEvents}
            />

            <ReportDetails
              range={range}
              events={events}
              generatedAt={report.generatedAt}
            />

          </div>

          {/* Events Table */}
          <ReportEventsTable events={events} />
        </>
      )}

    </section>
  );
}

export default Reports;
