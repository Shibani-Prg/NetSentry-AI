
import { NavLink } from "react-router-dom";
import {
  Activity,
  Crosshair,
  FileText,
  LayoutDashboard,
  Network,
  Settings,
  Shield,
  ShieldCheck,
} from "lucide-react";

const links = [
  { name: "Overview", path: "/", icon: LayoutDashboard },
  { name: "Security Events", path: "/events", icon: Activity },
  { name: "Detections", path: "/detections", icon: Crosshair },
  { name: "Network Sources", path: "/sources", icon: Network },
  { name: "Reports", path: "/reports", icon: FileText },
];

function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[245px] flex-col border-r border-white/[0.07] bg-[#0d121b] lg:flex">
      <div className="flex h-[76px] items-center gap-3 border-b border-white/[0.07] px-5">
        <div className="rounded-xl border border-teal-300/20 bg-teal-300/[0.09] p-2.5 text-teal-300">
          <Shield size={23} />
        </div>

        <div>
          <h1 className="text-base font-bold text-white">
            NetSentry <span className="text-teal-300">AI</span>
          </h1>
          <p className="mt-1 text-[9px] tracking-[0.2em] text-slate-500">
            SECURITY INTELLIGENCE
          </p>
        </div>
      </div>

      <div className="px-4 pt-7">
        <p className="mb-3 px-3 text-[10px] font-semibold tracking-[0.17em] text-slate-600">
          WORKSPACE
        </p>

        <nav className="space-y-1">
          {links.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-3 text-xs transition ${
                  isActive
                    ? "border border-teal-300/10 bg-teal-300/[0.09] font-medium text-teal-300"
                    : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                }`
              }
            >
              <Icon size={17} />
              {name}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-7 px-4">
        <p className="mb-3 px-3 text-[10px] font-semibold tracking-[0.17em] text-slate-600">
          SYSTEM
        </p>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-3 text-xs ${
              isActive
                ? "bg-teal-300/[0.09] text-teal-300"
                : "text-slate-400 hover:bg-white/[0.04]"
            }`
          }
        >
          <Settings size={17} />
          Settings
        </NavLink>
      </div>

      <div className="mt-auto p-4">
        <div className="rounded-xl border border-teal-300/10 bg-teal-300/[0.04] p-4">
          <div className="flex items-center gap-2 text-xs font-medium text-teal-200">
            <ShieldCheck size={16} />
            Security workspace
          </div>
          <p className="mt-2 text-[11px] leading-5 text-slate-500">
            Monitor ingested events and investigate suspicious activity.
          </p>
        </div>

        <div className="mt-4 flex items-center gap-3 border-t border-white/[0.07] pt-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 text-xs font-semibold">
            NS
          </div>
          <div>
            <p className="text-xs text-slate-200">Security Analyst</p>
            <p className="mt-1 text-[10px] text-slate-500">Local workspace</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
