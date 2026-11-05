
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const SEVERITIES = [
  { name: "CRITICAL", color: "#fb7185" },
  { name: "HIGH", color: "#fb923c" },
  { name: "MEDIUM", color: "#fbbf24" },
  { name: "LOW", color: "#38bdf8" },
];

function SeverityChart({ events = [] }) {
  const data = SEVERITIES.map(({ name, color }) => ({
    name,
    color,
    value: events.filter(
      (event) =>
        String(event.severity ?? "").trim().toUpperCase() === name
    ).length,
  }));

  const chartData = data.filter((item) => item.value > 0);
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <section className="theme-surface theme-border min-w-0 overflow-hidden rounded-2xl border p-4 transition-colors duration-200 hover:border-slate-300 dark:hover:border-slate-700 sm:p-5">
      {/* Header */}
      <div className="mb-4 sm:mb-5">
        <h2 className="theme-text text-base font-semibold sm:text-lg">
          Events by Severity
        </h2>

        <p className="theme-text-secondary mt-1 text-xs sm:text-sm">
          Distribution of recorded security events
        </p>
      </div>

      {/* Chart */}
      <div className="h-64 min-w-0 w-full sm:h-64">
        {total === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
            <p className="theme-text text-sm font-medium">
              No severity data available
            </p>

            <p className="theme-text-secondary text-xs">
              Severity distribution will appear when events are recorded.
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="43%"
                outerRadius="65%"
                innerRadius="43%"
                paddingAngle={4}
                stroke="none"
              >
                {chartData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>

              {/* Center label */}
              <text
                x="50%"
                y="39%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="var(--text-secondary)"
                fontSize={10}
              >
                TOTAL EVENTS
              </text>

              <text
                x="50%"
                y="49%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="var(--text-primary)"
                fontSize={21}
                fontWeight={600}
              >
                {total.toLocaleString("en-IN")}
              </text>

              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "10px",
                  color: "var(--text-primary)",
                  fontSize: "12px",
                }}
                itemStyle={{
                  color: "var(--text-primary)",
                }}
                formatter={(value, name) => [value, name]}
              />

              <Legend
                verticalAlign="bottom"
                align="center"
                iconType="circle"
                iconSize={7}
                wrapperStyle={{
                  fontSize: "10px",
                  paddingTop: "5px",
                  width: "100%",
                }}
                formatter={(value) => (
                  <span
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: 10,
                    }}
                  >
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}

export default SeverityChart;
