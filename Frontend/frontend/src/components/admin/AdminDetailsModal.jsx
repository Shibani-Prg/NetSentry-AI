
import {
  X,
  UserRound,
  Mail,
  ShieldCheck,
  Calendar,
  CircleCheck,
} from "lucide-react";

import {
  formatAdminRole,
  formatAdminStatus,
  formatAdminDate,
} from "../../utils/admin/adminHelpers";

export default function AdminDetailsModal({
  isOpen,
  onClose,
  admin,
}) {
  if (!isOpen || !admin) return null;

  const details = [
    {
      label: "Full Name",
      value: admin.name || "N/A",
      icon: UserRound,
    },
    {
      label: "Email Address",
      value: admin.email || "N/A",
      icon: Mail,
    },
    {
      label: "Role",
      value: formatAdminRole(admin.role),
      icon: ShieldCheck,
    },
    {
      label: "Account Status",
      value: formatAdminStatus(admin.is_active),
      icon: CircleCheck,
    },
    {
      label: "Created At",
      value: formatAdminDate(admin.created_at),
      icon: Calendar,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="theme-surface theme-border w-full max-w-lg rounded-2xl border shadow-2xl">

        {/* Header */}
        <div className="theme-border flex items-center justify-between border-b p-5">
          <div>
            <h2 className="theme-text text-xl font-semibold">
              Administrator Details
            </h2>

            <p className="theme-text-secondary mt-1 text-sm">
              View administrator account information.
            </p>
          </div>

          <button
            onClick={onClose}
            className="theme-text-secondary rounded-lg p-2 transition hover:bg-black/5 hover:text-rose-500 dark:hover:bg-white/5"
          >
            <X size={20} />
          </button>
        </div>

        {/* Details */}
        <div className="space-y-4 p-5">
          {details.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="theme-surface-secondary theme-border flex items-center gap-4 rounded-xl border p-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400">
                  <Icon size={19} />
                </div>

                <div className="min-w-0">
                  <p className="theme-text-secondary text-xs">
                    {item.label}
                  </p>

                  <p className="theme-text mt-1 break-words font-medium">
                    {item.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="theme-border flex justify-end border-t p-5">
          <button
            onClick={onClose}
            className="rounded-lg bg-teal-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-teal-500"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
