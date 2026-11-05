
import { useCallback, useEffect, useState } from "react";
import { getAdmins } from "../services/admin.service";

export default function useAdmins() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Initial fetch
  useEffect(() => {
    let ignore = false;

    const loadAdmins = async () => {
      try {
        const response = await getAdmins();

        if (ignore) return;

        const adminList = Array.isArray(response)
          ? response
          : response.admins || [];

        setAdmins(adminList);
        setError("");
      } catch (err) {
        if (ignore) return;

        setError(
          err.response?.data?.message ||
            "Unable to fetch admins. Please try again."
        );
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadAdmins();

    return () => {
      ignore = true;
    };
  }, []);

  // Manual refresh after an action
  const refetchAdmins = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getAdmins();

      const adminList = Array.isArray(response)
        ? response
        : response.admins || [];

      setAdmins(adminList);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to fetch admins. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    admins,
    loading,
    error,
    refetchAdmins,
  };
}
