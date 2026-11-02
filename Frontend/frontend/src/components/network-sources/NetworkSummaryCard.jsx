
function NetworkSummaryCard({ icon, title, value, color }) {
  return (
    <div className="min-w-0 rounded-xl border border-white/[0.08] bg-[#10151e] p-4 sm:p-5">
      <div className={`mb-3 sm:mb-4 ${color}`}>
        {icon}
      </div>

      <p className="text-sm text-slate-400">{title}</p>

      <p className="mt-2 break-words text-2xl font-semibold text-white sm:text-3xl">
        {value}
      </p>
    </div>
  );
}

export default NetworkSummaryCard;
