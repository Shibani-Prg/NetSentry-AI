
import { ShieldCheck, Plus } from "lucide-react";

export default function AdminHeader({ onCreateAdmin }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
          <h1 className="theme-text text-2xl font-bold">
            Admin Management
          </h1>
        </div>

        <p className="theme-text-secondary mt-1 text-sm">
          Manage administrator accounts and access permissions.
        </p>
      </div>

      <button
        onClick={onCreateAdmin}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
      >
        <Plus size={18} />
        Create Admin
      </button>
    </div>
  );
}
