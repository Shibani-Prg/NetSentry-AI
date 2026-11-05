import { Activity, ShieldAlert, Radio } from "lucide-react";

function SimulatorStats({ attempts }) {
  const stats = [
    {
      title: "Generated Events",
      value: attempts,
      icon: Activity,
      color: "text-cyan-600 dark:text-cyan-400",
      bg: "bg-cyan-500/10",
    },
    {
      title: "Simulation Status",
      value: "Active",
      icon: Radio,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Event Source",
      value: "LAN Demo",
      icon: ShieldAlert,
      color: "text-violet-600 dark:text-violet-400",
      bg: "bg-violet-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="theme-surface theme-border rounded-xl border p-5"
          >
            <div className="flex items-center justify-between">
              <p className="theme-text-secondary text-sm">{stat.title}</p>

              <div className={`rounded-lg p-2 ${stat.bg}`}>
                <Icon size={19} className={stat.color} />
              </div>
            </div>

            <h2 className="theme-text mt-4 text-2xl font-bold">
              {stat.value}
            </h2>
          </div>
        );
      })}
    </div>
  );
}

export default SimulatorStats;