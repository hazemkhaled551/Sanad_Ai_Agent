import { t } from "i18next";
import { Scale, Globe } from "lucide-react";
import React, { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import ChangeLanguageButton from "../components/UI/ChangeLanguageButton";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const userId = searchParams.get("userId") || "";
  const token = decodeURIComponent(searchParams.get("token") || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    if (message) setMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ تحقق من أن الرابط صالح
    if (!userId || userId.trim() === "") {
      setMessage("Invalid reset link. Please request a new password reset email.");
      setSuccess(false);
      return;
    }

    if (!token || token.trim() === "") {
      setMessage("Invalid or missing token. Please request a new reset email.");
      setSuccess(false);
      return;
    }

    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match");
      setSuccess(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        "https://sanad-backend-production-cbbc.up.railway.app/api/Auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
<<<<<<< HEAD
            userId: userId,
            token: token,
            newPassword: form.password,
=======
            UserId: userId,
            Token: token,
            NewPassword: form.password,
>>>>>>> 511808c13623a511c0e2b7efa952839fe3857fd6
          }),
        }
      );

      let errorMessage = "Reset failed.";

      try {
        const result = await response.json();

        if (response.ok) {
          setMessage(result?.message || "Password reset successfully!");
          setSuccess(true);
          setForm({ password: "", confirmPassword: "" });
          setTimeout(() => navigate("/login"), 2000);
        } else {
          // ✅ نعرض أول خطأ من قائمة errors لو موجود
          if (result?.errors) {
            const firstKey = Object.keys(result.errors)[0];
            if (firstKey && result.errors[firstKey].length > 0) {
              errorMessage = result.errors[firstKey][0];
            }
          } else if (result?.message) {
            errorMessage = result.message;
          }
          setMessage(errorMessage);
          setSuccess(false);
        }
      } catch {
        const text = await response.text();
        setMessage(text || "Reset failed.");
        setSuccess(false);
      }
    } catch (err: any) {
      setMessage(err?.message || "Error connecting to server");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-purple-800 via-indigo-900 to-gray-950 min-h-screen flex flex-col">
      {/* ===== Header ===== */}
      <header className="px-6 py-4 bg-gradient-to-r from-purple-800 via-indigo-900 to-gray-900 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-white flex items-center space-x-2 space-x-reverse">
            <span className="font-semibold text-4xl text-white">
              {t("brand")}
            </span>
          </div>
          <ChangeLanguageButton />
        </div>
      </header>

      {/* ===== Main Content ===== */}
      <main className="flex flex-1 items-center justify-center px-4">
<<<<<<< HEAD
        <div className="w-full max-w-sm p-6 bg-white/10 rounded-2xl bg-gradient-to-b from-purple-700 to-gray-900">
          <h1 className="mt-4 text-xl font-semibold text-white text-center">
            Sanad
          </h1>
          <p className="text-gray-300 text-sm text-center mt-2">
            Reset Your Password
          </p>
=======
        <div className="w-full max-w-md bg-white dark:bg-neutral-darker shadow-lg rounded-2xl p-6 text-center">
          <h3 className="text-2xl font-bold text-primary mb-2">Sanad</h3>
          <h5 className="text-lg font-medium mb-6">Reset Your Password</h5>
>>>>>>> 511808c13623a511c0e2b7efa952839fe3857fd6

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Password */}
            <div>
<<<<<<< HEAD
=======
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                New Password
              </label>
>>>>>>> 511808c13623a511c0e2b7efa952839fe3857fd6
              <input
                type="password"
                id="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none dark:bg-neutral-dark dark:border-gray-600"
              />
            </div>

            {/* Confirm Password */}
            <div>
<<<<<<< HEAD
=======
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                Confirm Password
              </label>
>>>>>>> 511808c13623a511c0e2b7efa952839fe3857fd6
              <input
                type="password"
                id="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none dark:bg-neutral-dark dark:border-gray-600"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition disabled:opacity-50 flex items-center justify-center"
            >
              {loading && (
                <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 mr-2"></span>
              )}
              {loading ? "Processing..." : "Reset Password"}
            </button>
          </form>

          {message && (
            <div
              className={`mt-3 text-center text-sm ${
                success
                  ? "text-green-600"
                  : "bg-red-500/20 text-red-300 px-3 py-2 rounded-md"
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </main>

      {/* ===== Footer ===== */}
      <footer className="px-6 py-8 bg-neutral-darker text-white mt-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Scale className="w-6 h-6 text-accent-purple" />
              <span>{t("landingPage.appName")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              <span>{t("landingPage.footer.location")}</span>
            </div>
          </div>
          <p className="text-sm">{t("landingPage.footer.copyright")}</p>
          <div className="flex gap-4 mt-2 text-sm">
            <Link to="/privacy" className="hover:underline">
              {t("landingPage.footer.privacyPolicy")}
            </Link>
            <Link to="/terms" className="hover:underline">
              {t("landingPage.footer.terms")}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
