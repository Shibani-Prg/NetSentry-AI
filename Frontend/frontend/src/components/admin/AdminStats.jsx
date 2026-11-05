
import { getAdminStats } from "../../utils/admin/adminHelpers";
import { Users, UserCheck, UserX } from "lucide-react";

export default function AdminStats({ admins = [] }) {
  const stats = getAdminStats(admins);

  const cards = [
    {
      title: "Total Admins",
      value: stats.total,
      icon: Users,
    },
    {
      title: "Active Admins",
      value: stats.active,
      icon: UserCheck,
    },
    {
      title: "Inactive Admins",
      value: stats.inactive,
      icon: UserX,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="theme-surface theme-border rounded-xl border p-5 transition-colors duration-200"
          >
            <div className="flex items-center justify-between">
              <p className="theme-text-secondary text-sm">
                {card.title}
              </p>

              <Icon className="h-5 w-5 text-teal-600 dark:text-teal-400" />
            </div>

            <h2 className="theme-text mt-3 text-3xl font-bold">
              {card.value}
            </h2>
          </div>
        );
      })}
    </div>
  );
}
