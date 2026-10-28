
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function EventActivityChart({ events = [] }) {
  const grouped = {};

  events.forEach((event) => {
    if (!event.created_at) return;

    const timestamp = new Date(event.created_at);

    if (Number.isNaN(timestamp.getTime())) return;

    const dateKey = [
      timestamp.getFullYear(),
      String(timestamp.getMonth() + 1).padStart(2, "0"),
      String(timestamp.getDate()).padStart(2, "0"),
    ].join("-");

    if (!grouped[dateKey]) {
      grouped[dateKey] = {
        dateKey,
        date: timestamp.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
        }),
        count: 0,
      };
    }

    grouped[dateKey].count += 1;
  });

  const data = Object.values(grouped).sort((a, b) =>
    a.dateKey.localeCompare(b.dateKey)
  );

  return (
    <section className="rounded-2xl border border-slate-800 bg-[#101722] p-5 transition-colors hover:border-slate-700">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Security Event Activity
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Events recorded per day
          </p>
        </div>

        <span className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-medium text-cyan-300">
          {events.length.toLocaleString("en-IN")} events
        </span>
      </div>

      <div className="h-64">
        {data.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
            <p className="text-sm font-medium text-slate-300">
              No event activity available
            </p>
            <p className="text-xs text-slate-500">
              Activity will appear when timestamped events are available.
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 8, right: 8, left: -18, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="eventActivityGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#38bdf8"
                    stopOpacity={0.35}
                  />
                  <stop
                    offset="95%"
                    stopColor="#38bdf8"
                    stopOpacity={0.01}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke="#263244"
                strokeDasharray="3 5"
                vertical={false}
              />

              <XAxis
                dataKey="date"
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                minTickGap={20}
              />

              <YAxis
                allowDecimals={false}
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#101722",
                  border: "1px solid #334155",
                  borderRadius: "12px",
                  color: "#f8fafc",
                  fontSize: "12px",
                }}
                labelStyle={{ color: "#94a3b8", marginBottom: "4px" }}
                formatter={(value) => [value, "Events"]}
              />

              <Area
                type="monotone"
                dataKey="count"
                name="Events"
                stroke="#38bdf8"
                fill="url(#eventActivityGradient)"
                strokeWidth={2.5}
                activeDot={{
                  r: 5,
                  fill: "#38bdf8",
                  stroke: "#101722",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}

export default EventActivityChart;
