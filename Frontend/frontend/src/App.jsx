
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout.jsx";
import Overview from "./pages/Overview.jsx";
import SecurityEvents from "./pages/SecurityEvents";
import Detections from "./pages/Detections";
import NetworkSources from "./pages/NetworkSources";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="events" element={<SecurityEvents />} />
          <Route path="detections" element={<Detections />} />
          <Route path="sources" element={<NetworkSources />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
