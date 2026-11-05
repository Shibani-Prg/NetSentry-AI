
import { ADMIN_TABS } from "../../constants/admin.constants";

export default function AdminTabs({ activeTab, onTabChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {ADMIN_TABS.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onTabChange(tab.value)}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            activeTab === tab.value
              ? "bg-teal-500 text-white"
              : "theme-surface-secondary theme-text-secondary theme-border border hover:border-teal-500/40 hover:text-teal-600 dark:hover:text-teal-400"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
