
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthProvider";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

import Login from "./pages/Login";
import DashboardLayout from "./components/layout/DashboardLayout.jsx";

import Overview from "./pages/Overview";
import SecurityEvents from "./pages/SecurityEvents";
import Detections from "./pages/Detections";
import NetworkSources from "./pages/NetworkSources";
import LANSimulator from "./pages/LANSimulator";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import AdminManagement from "./pages/AdminManagement";
import DemoLogin from "./pages/DemoLogin";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* Public LAN Simulator - Phone / QR Access */}
          <Route
            path="/lan-demo"
            element={
              <div className="min-h-screen w-full px-4 py-6 sm:px-6 lg:px-10">
                <div className="mx-auto w-full max-w-7xl">
                  <LANSimulator />
                </div>
              </div>
            }
          />

          {/* Existing Demo Login Route */}
          <Route element={<DashboardLayout />}>
            <Route
              path="/demo-login"
              element={<DemoLogin />}
            />
          </Route>

          {/* Public Login Route */}
          <Route element={<PublicRoute />}>
            <Route
              path="/login"
              element={<Login />}
            />
          </Route>

          {/* Protected Dashboard Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>

              <Route
                index
                element={<Overview />}
              />

              <Route
                path="events"
                element={<SecurityEvents />}
              />

              <Route
                path="detections"
                element={<Detections />}
              />

              <Route
                path="sources"
                element={<NetworkSources />}
              />

              {/* LAN Simulator - Dashboard Access */}
              <Route
                path="lan-simulator"
                element={<LANSimulator />}
              />

              <Route
                path="reports"
                element={<Reports />}
              />

              <Route
                path="settings"
                element={<Settings />}
              />

              {/* Admin Management */}
              <Route
                path="admin-users"
                element={<AdminManagement />}
              />

            </Route>
          </Route>

          {/* Fallback Route */}
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
