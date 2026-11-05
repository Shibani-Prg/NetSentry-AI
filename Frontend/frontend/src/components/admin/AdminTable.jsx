
import {
  ShieldCheck,
  UserRound,
  Eye,
  Pencil,
  KeyRound,
  Power,
  Trash2,
  ArrowUpCircle,
  ArrowDownCircle,
} from "lucide-react";

import {
  formatAdminRole,
  formatAdminStatus,
  formatAdminDate,
} from "../../utils/admin/adminHelpers";

export default function AdminTable({
  admins = [],
  loading,
  currentUser,
  onView,
  onEdit,
  onPassword,
  onStatus,
  onDelete,
  onPromote,
  onDemote,
}) {
  if (loading) {
    return (
      <div className="theme-surface theme-border theme-text-secondary rounded-xl border p-8 text-center">
        Loading administrators...
      </div>
    );
  }

  if (admins.length === 0) {
    return (
      <div className="theme-surface theme-border theme-text-secondary rounded-xl border p-8 text-center">
        No administrators found.
      </div>
    );
  }

  return (
    <div className="theme-surface theme-border overflow-x-auto rounded-xl border">
      <table className="w-full text-left text-sm">
        <thead className="theme-surface-secondary theme-border theme-text-secondary border-b">
          <tr>
            <th className="px-5 py-4">Administrator</th>
            <th className="px-5 py-4">Role</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4">Created At</th>
            <th className="px-5 py-4">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y theme-border">
          {admins.map((admin) => {
            const isCurrentUser =
              String(currentUser?.id) === String(admin.id);

            const isSuperAdmin = admin.role === "super_admin";

            const isCurrentSuperAdmin =
              currentUser?.role === "super_admin";

            return (
              <tr
                key={admin.id}
                className="theme-text transition-colors hover:bg-black/[0.03] dark:hover:bg-white/[0.03]"
              >
                {/* Administrator */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="theme-surface-secondary theme-text-secondary flex h-9 w-9 items-center justify-center rounded-full">
                      <UserRound size={18} />
                    </div>

                    <div>
                      <p className="theme-text font-medium">
                        {admin.name}
                        {isCurrentUser && (
                          <span className="ml-2 text-xs text-cyan-600 dark:text-cyan-400">
                            (You)
                          </span>
                        )}
                      </p>

                      <p className="theme-text-secondary text-xs">
                        {admin.email}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Role */}
                <td className="theme-text-secondary px-5 py-4">
                  <span className="inline-flex items-center gap-1">
                    <ShieldCheck
                      size={15}
                      className="text-cyan-600 dark:text-cyan-400"
                    />
                    {formatAdminRole(admin.role)}
                  </span>
                </td>

                {/* Status */}
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      admin.is_active
                        ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                        : "bg-red-500/10 text-red-700 dark:text-red-400"
                    }`}
                  >
                    {formatAdminStatus(admin.is_active)}
                  </span>
                </td>

                {/* Created At */}
                <td className="theme-text-secondary whitespace-nowrap px-5 py-4">
                  {formatAdminDate(admin.created_at)}
                </td>

                {/* Actions */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">

                    <button
                      type="button"
                      onClick={() => onView?.(admin)}
                      title="View Details"
                      className="text-cyan-600 transition hover:text-cyan-500 dark:text-cyan-400 dark:hover:text-cyan-300"
                    >
                      <Eye size={17} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onEdit?.(admin)}
                      title="Edit Admin"
                      className="text-blue-600 transition hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <Pencil size={17} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onPassword?.(admin)}
                      title="Reset Password"
                      className="text-violet-600 transition hover:text-violet-500 dark:text-violet-400 dark:hover:text-violet-300"
                    >
                      <KeyRound size={17} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onStatus?.(admin)}
                      title={
                        admin.is_active
                          ? "Deactivate Admin"
                          : "Activate Admin"
                      }
                      className={`transition ${
                        admin.is_active
                          ? "text-amber-600 hover:text-amber-500 dark:text-amber-400 dark:hover:text-amber-300"
                          : "text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300"
                      }`}
                    >
                      <Power size={17} />
                    </button>

                    {/* Promote Admin */}
                    {isCurrentSuperAdmin &&
                      !isCurrentUser &&
                      !isSuperAdmin && (
                        <button
                          type="button"
                          onClick={() => onPromote?.(admin)}
                          title="Promote to Super Admin"
                          className="text-emerald-600 transition hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300"
                        >
                          <ArrowUpCircle size={17} />
                        </button>
                      )}

                    {/* Demote Super Admin */}
                    {isCurrentSuperAdmin &&
                      !isCurrentUser &&
                      isSuperAdmin && (
                        <button
                          type="button"
                          onClick={() => onDemote?.(admin)}
                          title="Demote to Admin"
                          className="text-amber-600 transition hover:text-amber-500 dark:text-amber-400 dark:hover:text-amber-300"
                        >
                          <ArrowDownCircle size={17} />
                        </button>
                      )}

                    {/* Delete Admin */}
                    {!isCurrentUser && (
                      <button
                        type="button"
                        onClick={() => onDelete?.(admin)}
                        title="Delete Admin"
                        className="text-red-600 transition hover:text-red-500 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <Trash2 size={17} />
                      </button>
                    )}

                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
