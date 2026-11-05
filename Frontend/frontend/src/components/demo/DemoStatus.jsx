
import {
  CheckCircle2,
  AlertCircle,
  Info,
} from "lucide-react";

export default function DemoStatus({ status }) {
  if (!status?.message) return null;

  const styles = {
    success:
      "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400",

    error:
      "bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400",

    info:
      "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400",
  };

  const icons = {
    success: <CheckCircle2 size={19} />,
    error: <AlertCircle size={19} />,
    info: <Info size={19} />,
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex items-start gap-3 p-4 rounded-xl border ${
        styles[status.type] || styles.info
      }`}
    >
      <span className="shrink-0">
        {icons[status.type] || icons.info}
      </span>

      <p className="text-sm leading-relaxed">
        {status.message}
      </p>
    </div>
  );
}
