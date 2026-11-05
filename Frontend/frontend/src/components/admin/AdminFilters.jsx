
import { Search } from "lucide-react";
import { ADMIN_ROLE_OPTIONS } from "../../constants/admin.constants";

export default function AdminFilters({
  search,
  onSearchChange,
  roleFilter,
  onRoleChange,
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <Search className="theme-text-secondary absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />

        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name or email..."
          className="theme-surface theme-border theme-text w-full rounded-lg border py-2.5 pl-10 pr-4 text-sm outline-none placeholder:text-slate-400 focus:border-teal-500"
        />
      </div>

      <select
        value={roleFilter}
        onChange={(e) => onRoleChange(e.target.value)}
        className="theme-surface theme-border theme-text rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-teal-500"
      >
        {ADMIN_ROLE_OPTIONS.map((role) => (
          <option
            key={role.value}
            value={role.value}
            className="theme-surface theme-text"
          >
            {role.label}
          </option>
        ))}
      </select>
    </div>
  );
}
