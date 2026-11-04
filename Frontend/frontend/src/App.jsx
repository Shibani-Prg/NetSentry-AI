import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthProvider";

import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Login";

import DashboardLayout from "./components/layout/DashboardLayout";

import Overview from "./pages/Overview";
import SecurityEvents from "./pages/SecurityEvents";
import Detections from "./pages/Detections";
import NetworkSources from "./pages/NetworkSources";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* Public route */}
          <Route path="/login" element={<Login />} />

          {/* Protected dashboard routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route index element={<Overview />} />
              <Route path="events" element={<SecurityEvents />} />
              <Route path="detections" element={<Detections />} />
              <Route path="sources" element={<NetworkSources />} />
              <Route path="reports" element={<Reports />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>

          {/* Fallback */}
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