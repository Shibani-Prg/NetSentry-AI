
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
  Wifi,
  X,
  Users,
} from "lucide-react";

const links = [
  { name: "Overview", path: "/", icon: LayoutDashboard },
  { name: "Security Events", path: "/events", icon: Activity },
  { name: "Detections", path: "/detections", icon: Crosshair },
  { name: "Network Sources", path: "/sources", icon: Network },
  { name: "LAN Simulator", path: "/lan-simulator", icon: Wifi },
  { name: "Reports", path: "/reports", icon: FileText },
];

const navClass = ({ isActive }) =>
  `group flex items-center gap-3 rounded-lg border px-3 py-2.5 text-[13px] font-medium transition-all duration-200 ${
    isActive
      ? "theme-nav-active"
      : "theme-nav-inactive"
  }`;

function Sidebar({ isOpen = false, onClose = () => {} }) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          theme-sidebar theme-sidebar-border
          fixed left-0 top-0 z-50 flex h-dvh w-64 flex-col
          border-r transition-transform duration-300
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Brand */}
        <div className="theme-sidebar-border flex h-[72px] shrink-0 items-center justify-between border-b px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-teal-400/15 bg-teal-400/[0.08] text-teal-400">
              <ShieldCheck size={21} />
            </div>

            <div>
              <h1 className="theme-text text-[16px] font-bold tracking-tight">
                NetSentry <span className="text-teal-400">AI</span>
              </h1>

              <p className="theme-text-secondary mt-0.5 text-[9px] font-medium uppercase tracking-[1.8px]">
                Security Operations
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="theme-text-secondary transition-colors hover:text-teal-500 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-6">
          <p className="theme-text-secondary mb-3 px-3 text-[10px] font-semibold uppercase tracking-[1.8px]">
            Workspace
          </p>

          <nav className="space-y-1">
            {links.map((link) => {
              const Icon = link.icon;

              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === "/"}
                  onClick={onClose}
                  className={navClass}
                >
                  <Icon
                    size={17}
                    className="shrink-0 transition-colors group-hover:text-teal-500"
                  />
                  <span>{link.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* System Section */}
        <div className="theme-sidebar-border shrink-0 border-t px-3 py-4">
          <p className="theme-text-secondary mb-3 px-3 text-[10px] font-semibold uppercase tracking-[1.8px]">
            System
          </p>

          <nav className="space-y-1">
            <NavLink
              to="/settings"
              onClick={onClose}
              className={navClass}
            >
              <Settings size={17} />
              <span>Settings</span>
            </NavLink>

            <NavLink
              to="/admin-users"
              onClick={onClose}
              className={navClass}
            >
              <Users size={17} />
              <span>Admin Management</span>
            </NavLink>
          </nav>

          {/* Status Card */}
          <div className="theme-sidebar-card mt-4 flex items-center gap-3 rounded-lg border p-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-400/[0.08] text-teal-500">
              <Shield size={18} />
            </div>

            <div className="min-w-0">
              <p className="theme-text truncate text-xs font-semibold">
                NetSentry Protected
              </p>

              <p className="mt-1 text-[10px] text-emerald-500">
                System Monitoring Active
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
