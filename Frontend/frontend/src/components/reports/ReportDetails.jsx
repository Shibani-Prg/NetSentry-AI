
function ReportDetails({ range, events, generatedAt }) {
  const selectedPeriod =
    range === "24h"
      ? "Last 24 Hours"
      : range === "7d"
        ? "Last 7 Days"
        : "Last 30 Days";

  const details = [
    {
      label: "Selected period",
      value: selectedPeriod,
    },
    {
      label: "Records returned",
      value: events.length.toLocaleString("en-IN"),
    },
    {
      label: "Report generated",
      value: generatedAt
        ? new Date(generatedAt).toLocaleString()
        : "—",
    },
  ];

  return (
    <div className="min-w-0 overflow-hidden rounded-xl border border-white/[0.08] bg-[#10151e] p-4 sm:p-5">
      <h3 className="font-semibold text-white">
        Report Details
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        Metadata for this report
      </p>

      <div className="mt-5 space-y-4">
        {details.map((detail) => (
          <div
            key={detail.label}
            className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3"
          >
            <span className="text-sm text-slate-400">
              {detail.label}
            </span>

            <span className="break-words text-sm font-medium text-white sm:text-right">
              {detail.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReportDetails;
