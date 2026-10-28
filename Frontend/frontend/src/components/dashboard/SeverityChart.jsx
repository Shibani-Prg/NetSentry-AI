
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

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <section className="rounded-2xl border border-slate-800 bg-[#101722] p-5 transition-colors hover:border-slate-700">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">
          Events by Severity
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Distribution of recorded security events
        </p>
      </div>

      <div className="h-64">
        {total === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
            <p className="text-sm font-medium text-slate-300">
              No severity data available
            </p>
            <p className="text-xs text-slate-500">
              Severity distribution will appear when events are recorded.
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.filter((item) => item.value > 0)}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="45%"
                outerRadius={82}
                innerRadius={56}
                paddingAngle={4}
                stroke="none"
              >
                {data
                  .filter((item) => item.value > 0)
                  .map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
              </Pie>

              <text
                x="50%"
                y="41%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#94a3b8"
                fontSize={11}
              >
                TOTAL EVENTS
              </text>

              <text
                x="50%"
                y="51%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#f8fafc"
                fontSize={22}
                fontWeight={600}
              >
                {total.toLocaleString("en-IN")}
              </text>

              <Tooltip
                contentStyle={{
                  backgroundColor: "#101722",
                  border: "1px solid #334155",
                  borderRadius: "10px",
                  color: "#f8fafc",
                  fontSize: "12px",
                }}
                formatter={(value, name) => [
                  value,
                  name,
                ]}
              />

              <Legend
                verticalAlign="bottom"
                iconType="circle"
                formatter={(value) => (
                  <span style={{ color: "#cbd5e1", fontSize: 12 }}>
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
