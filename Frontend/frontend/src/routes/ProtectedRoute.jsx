import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080d18] flex items-center justify-center">
        <p className="text-slate-400">
          Verifying authentication...
        </p>
      </div>
    );
  }

  return isAuthenticated
    ? <Outlet />
    : <Navigate to="/login" replace />;
}