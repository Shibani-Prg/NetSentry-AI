
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#090d14] text-slate-200">
      <Sidebar />

      <div className="min-h-screen lg:ml-[245px]">
        <Topbar />

        <main className="p-4 sm:p-7">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
