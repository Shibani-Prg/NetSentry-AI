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
    <div className="theme-surface theme-border min-w-0 overflow-hidden rounded-xl border p-4 sm:p-5">
      <h3 className="theme-text font-semibold">
        Report Details
      </h3>

      <p className="theme-text-secondary mt-1 text-sm">
        Metadata for this report
      </p>

      <div className="mt-5 space-y-4">
        {details.map((detail) => (
          <div
            key={detail.label}
            className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3"
          >
            <span className="theme-text-secondary text-sm">
              {detail.label}
            </span>

            <span className="theme-text break-words text-sm font-medium sm:text-right">
              {detail.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReportDetails;