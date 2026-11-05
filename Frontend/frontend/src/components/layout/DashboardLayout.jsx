
import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar.jsx";
import Topbar from "./topbar/Topbar.jsx";
import Footer from "./Footer.jsx";

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function closeSidebar() {
    setSidebarOpen(false);
  }

  return (
    <div className="theme-bg theme-text min-h-screen transition-colors duration-200">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
      />

      {/* Main Dashboard Area */}
      <div className="flex min-h-screen min-w-0 flex-col lg:ml-64">

        {/* Top Navigation */}
        <Topbar
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Page Content */}
        <main className="theme-bg w-full min-w-0 flex-1 p-4 transition-colors duration-200 sm:p-6 xl:p-8">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />

      </div>
    </div>
  );
}

export default DashboardLayout;
