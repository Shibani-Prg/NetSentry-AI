function SeverityBadge({ severity }) {
  const value = String(severity || "UNKNOWN").toUpperCase();

  const styles = {
    LOW: "border-sky-500/20 bg-sky-500/10 text-sky-700 dark:text-sky-300",
    MEDIUM: "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
    HIGH: "border-orange-500/20 bg-orange-500/10 text-orange-700 dark:text-orange-300",
    CRITICAL: "border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-300",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-wider ${
        styles[value] ||
        "border-slate-400/20 bg-slate-400/10 text-slate-600 dark:text-slate-300"
      }`}
    >
      {value}
    </span>
  );
}

export default SeverityBadge;