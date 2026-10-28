
function SeverityBadge({ severity }) {
  const value = String(severity || "UNKNOWN").toUpperCase();

  const styles = {
    LOW: "border-sky-400/20 bg-sky-400/10 text-sky-300",
    MEDIUM: "border-amber-400/20 bg-amber-400/10 text-amber-300",
    HIGH: "border-orange-400/20 bg-orange-400/10 text-orange-300",
    CRITICAL: "border-rose-400/20 bg-rose-400/10 text-rose-300",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-wider ${
        styles[value] || "border-slate-400/20 bg-slate-400/10 text-slate-300"
      }`}
    >
      {value}
    </span>
  );
}

export default SeverityBadge;
