
function ReportStatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#10151e] p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-slate-400">{title}</p>

        {Icon && (
          <Icon
            size={19}
            className={color || "text-indigo-300"}
          />
        )}
      </div>

      <p className="mt-4 text-3xl font-semibold text-white">
        {Number(value ?? 0).toLocaleString()}
      </p>
    </div>
  );
}

export default ReportStatCard;
