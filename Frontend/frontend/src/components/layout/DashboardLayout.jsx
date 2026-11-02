
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function closeSidebar() {
    setSidebarOpen(false);
  }

  return (
    <div className="min-h-screen bg-[#090d14] text-slate-200">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
      />

      <div className="min-h-screen lg:ml-[245px]">
        <Topbar
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="min-w-0 p-4 sm:p-7">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
