
const severityConfig = [
  {
    name: "CRITICAL",
    color: "bg-red-500",
    text: "text-red-400",
  },
  {
    name: "HIGH",
    color: "bg-orange-500",
    text: "text-orange-400",
  },
  {
    name: "MEDIUM",
    color: "bg-yellow-500",
    text: "text-yellow-400",
  },
  {
    name: "LOW",
    color: "bg-emerald-500",
    text: "text-emerald-400",
  },
];

function SeverityBreakdown({ items = [], total = 0 }) {
  const counts = severityConfig.map((severity) => {
    const match = items.find(
      (item) =>
        String(item.severity).toUpperCase() === severity.name
    );

    return {
      ...severity,
      count: Number(match?.count ?? 0),
    };
  });

  const highestCount = Math.max(
    1,
    ...counts.map((item) => item.count)
  );

  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#10151e] p-5">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h3 className="font-semibold text-white">
            Severity Breakdown
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Events grouped by severity
          </p>
        </div>

        <span className="rounded-lg bg-white/5 px-3 py-1.5 text-sm text-slate-300">
          {Number(total).toLocaleString()} total
        </span>
      </div>

      <div className="space-y-5">
        {counts.map((item) => {
          const percentage =
            total > 0 ? (item.count / total) * 100 : 0;

          return (
            <div key={item.name}>
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className={`text-sm font-medium ${item.text}`}>
                  {item.name}
                </span>

                <span className="text-sm text-slate-300">
                  {item.count.toLocaleString()}
                  <span className="ml-2 text-slate-500">
                    ({percentage.toFixed(1)}%)
                  </span>
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                  style={{
                    width: `${(item.count / highestCount) * 100}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SeverityBreakdown;
