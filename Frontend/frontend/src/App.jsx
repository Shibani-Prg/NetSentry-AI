
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import DashboardLayout from "./components/layout/DashboardLayout.jsx";
import AuthLayout from "./components/layout/AuthLayout.jsx";

import Overview from "./pages/Overview.jsx";
import SecurityEvents from "./pages/SecurityEvents";
import Detections from "./pages/Detections";
import NetworkSources from "./pages/NetworkSources";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Login from "./pages/Login.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Protected Dashboard Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Overview />} />
              <Route path="/events" element={<SecurityEvents />} />
              <Route path="/detections" element={<Detections />} />
              <Route path="/sources" element={<NetworkSources />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
