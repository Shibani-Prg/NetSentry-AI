import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
  loginAdmin,
  getCurrentUser,
} from "../services/authApi";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      const token = sessionStorage.getItem("netsentry_token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await getCurrentUser();
        setUser(response.user);
      } catch {
        sessionStorage.removeItem("netsentry_token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, []);

  const login = async (email, password) => {
    const response = await loginAdmin({ email, password });

    sessionStorage.setItem(
      "netsentry_token",
      response.token
    );

    setUser(response.user);
    return response;
  };

  const logout = () => {
    sessionStorage.removeItem("netsentry_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: Boolean(user),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}