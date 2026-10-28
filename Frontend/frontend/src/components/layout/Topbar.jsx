
import { Bell, Search, ShieldCheck } from "lucide-react";
import { useLocation } from "react-router-dom";

const pageNames = {
  "/": "Security Overview",
  "/events": "Security Events",
  "/detections": "Threat Detections",
  "/sources": "Network Sources",
  "/reports": "Security Reports",
  "/settings": "Settings",
};

function Topbar() {
  const location = useLocation();
  const title = pageNames[location.pathname] || "NetSentry AI";

  return (
    <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between gap-4 border-b border-white/[0.07] bg-[#090d14]/95 px-4 backdrop-blur-xl sm:px-7">
      <div>
        <p className="text-[10px] text-slate-500">
          NetSentry AI / Workspace
        </p>
        <h2 className="mt-1 text-sm font-semibold text-white sm:text-base">
          {title}
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-lg border border-white/[0.08] px-3 py-2 text-[10px] text-slate-400 sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-300" />
          LOCAL ENVIRONMENT
        </div>

        <button
          type="button"
          aria-label="Search"
          className="rounded-lg border border-white/[0.08] p-2 text-slate-400 hover:bg-white/[0.05]"
        >
          <Search size={17} />
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="rounded-lg border border-white/[0.08] p-2 text-slate-400 hover:bg-white/[0.05]"
        >
          <Bell size={17} />
        </button>

        <div className="hidden rounded-lg border border-teal-300/10 bg-teal-300/[0.05] p-2 text-teal-300 sm:block">
          <ShieldCheck size={17} />
        </div>
      </div>
    </header>
  );
}

export default Topbar;
