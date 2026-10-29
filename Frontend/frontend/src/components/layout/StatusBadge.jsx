import {
  CheckCircle2,
  XCircle,
  LoaderCircle,
  CircleHelp,
} from "lucide-react";

function StatusBadge({ status }) {
  if (status === "checking") {
    return (
      <span className="flex shrink-0 items-center gap-1.5 text-xs text-slate-400">
        <LoaderCircle size={14} className="animate-spin" />
        Checking
      </span>
    );
  }

  if (status === "connected") {
    return (
      <span className="flex shrink-0 items-center gap-1.5 text-xs text-emerald-400">
        <CheckCircle2 size={14} />
        Connected
      </span>
    );
  }

  if (status === "disconnected") {
    return (
      <span className="flex shrink-0 items-center gap-1.5 text-xs text-rose-400">
        <XCircle size={14} />
        Disconnected
      </span>
    );
  }

  return (
    <span className="flex shrink-0 items-center gap-1.5 text-xs text-slate-500">
      <CircleHelp size={14} />
      Not checked
    </span>
  );
}

export default StatusBadge;