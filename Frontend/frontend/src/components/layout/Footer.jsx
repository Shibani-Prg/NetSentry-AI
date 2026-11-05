
import {
  Shield,
  Activity,
  LayoutDashboard,
  AlertTriangle,
  FileText,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";

const navigationLinks = [
  { name: "Overview", path: "/", icon: LayoutDashboard },
  { name: "Security Events", path: "/events", icon: Activity },
  { name: "Threat Detections", path: "/detections", icon: AlertTriangle },
  { name: "Reports", path: "/reports", icon: FileText },
  { name: "Settings", path: "/settings", icon: Settings },
];

const technologies = [
  "React",
  "Node.js",
  "Express",
  "PostgreSQL",
];

export default function Footer() {
  return (
    <footer className="theme-sidebar theme-sidebar-border mt-auto border-t transition-colors duration-200">
      <div className="mx-auto max-w-[1600px] px-5 py-10 sm:px-8">

        {/* Main Footer */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-teal-500/20 bg-teal-500/10">
                <Shield size={23} className="text-teal-600 dark:text-teal-300" />
              </div>

              <div>
                <h2 className="theme-text text-lg font-bold tracking-wide">
                  NetSentry <span className="text-teal-600 dark:text-teal-300">AI</span>
                </h2>

                <p className="theme-text-secondary text-[10px] uppercase tracking-[0.2em]">
                  Intelligent Security Monitoring
                </p>
              </div>
            </Link>

            <p className="theme-text-secondary mt-5 max-w-md text-sm leading-7">
              Monitor security events, detect suspicious activities, and
              gain visibility into your digital environment with
              NetSentry AI.
            </p>

            {/* System Status */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>

              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-300">
                Security Dashboard
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="theme-text mb-5 text-xs font-semibold uppercase tracking-[0.18em]">
              Quick Navigation
            </h3>

            <ul className="space-y-3">
              {navigationLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className="theme-text-secondary group inline-flex items-center gap-3 text-sm transition hover:text-teal-600 dark:hover:text-teal-300"
                    >
                      <Icon
                        size={15}
                        className="transition group-hover:text-teal-600 dark:group-hover:text-teal-300"
                      />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Technology Stack */}
          <div>
            <h3 className="theme-text mb-5 text-xs font-semibold uppercase tracking-[0.18em]">
              Built With
            </h3>

            <div className="flex flex-wrap gap-2">
              {technologies.map((technology) => (
                <span
                  key={technology}
                  className="theme-border theme-surface-secondary theme-text-secondary rounded-lg border px-3 py-2 text-xs transition hover:border-teal-500/30 hover:text-teal-600 dark:hover:text-teal-300"
                >
                  {technology}
                </span>
              ))}
            </div>

            <p className="theme-text-secondary mt-5 text-xs leading-6">
              Designed for security visibility, event monitoring,
              and threat investigation.
            </p>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="theme-border mt-10 flex flex-col justify-between gap-4 border-t pt-6 sm:flex-row sm:items-center">

          <p className="theme-text-secondary text-xs">
            © {new Date().getFullYear()} NetSentry AI. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <span className="theme-text-secondary text-xs">
              Version 1.0.0
            </span>

            <span className="theme-text-secondary flex items-center gap-2 text-xs">
              <Shield size={13} className="text-teal-600 dark:text-teal-300" />
              Security Monitoring Platform
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
