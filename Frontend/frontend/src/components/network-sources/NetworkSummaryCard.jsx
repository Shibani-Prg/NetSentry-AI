
function NetworkSummaryCard({ icon, title, value, color }) {
  return (
    <div className="theme-surface theme-border min-w-0 rounded-xl border p-4 transition-colors duration-200 sm:p-5">
      <div className={`mb-3 sm:mb-4 ${color}`}>
        {icon}
      </div>

      <p className="theme-text-secondary text-sm">
        {title}
      </p>

      <p className="theme-text mt-2 break-words text-2xl font-semibold sm:text-3xl">
        {value}
      </p>
    </div>
  );
}

export default NetworkSummaryCard;
