function ReportStatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="theme-surface theme-border rounded-xl border p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="theme-text-secondary text-sm">{title}</p>

        {Icon && (
          <Icon
            size={19}
            className={color || "text-indigo-600 dark:text-indigo-300"}
          />
        )}
      </div>

      <p className="theme-text mt-4 text-3xl font-semibold">
        {Number(value ?? 0).toLocaleString()}
      </p>
    </div>
  );
}

export default ReportStatCard;