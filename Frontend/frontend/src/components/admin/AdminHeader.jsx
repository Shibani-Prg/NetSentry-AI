
import { ShieldCheck, Plus } from "lucide-react";

export default function AdminHeader({ onCreateAdmin }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-cyan-500 dark:text-cyan-400" />

          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Admin Management
          </h1>
        </div>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage administrator accounts and access permissions.
        </p>
      </div>

      <button
        type="button"
        onClick={onCreateAdmin}
        className="inline-flex items-center justify-center gap-2 rounded-lg
          bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-slate-950
          transition hover:bg-cyan-400
          focus:outline-none focus:ring-2 focus:ring-cyan-500
          focus:ring-offset-2 dark:focus:ring-offset-slate-950"
      >
        <Plus size={18} />
        Create Admin
      </button>
    </div>
  );
}
