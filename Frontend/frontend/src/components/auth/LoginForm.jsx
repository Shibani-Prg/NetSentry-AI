import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Loader2 } from "lucide-react";

import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
import useAuth from "../../hooks/useAuth";

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSubmitting(true);

    try {
      await login(
        formData.email.trim(),
        formData.password
      );

      navigate("/", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to login. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <AuthInput
        label="Admin Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="admin@netsentry.local"
      />

      <PasswordInput
        value={formData.password}
        onChange={handleChange}
      />

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Signing in...
          </>
        ) : (
          <>
            <ShieldCheck size={18} />
            Sign In to Dashboard
          </>
        )}
      </button>
    </form>
  );
}