import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaFilm,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { loginUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await loginUser(email, password);

      console.log("LOGIN RESPONSE:", data);

      login(data.user, data.token);

      navigate("/");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to sign in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050816] px-6 py-12">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-[#0B1220] shadow-2xl lg:grid-cols-2">

        <div className="hidden flex-col justify-center bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 p-12 text-white lg:flex">

          <FaFilm className="mb-6 text-6xl" />

          <h1 className="text-5xl font-bold">
            Welcome Back
          </h1>

          <p className="mt-6 text-lg leading-8 text-blue-100">
            Continue discovering movies,
            <br />
            sharing reviews,
            <br />
            and connecting with friends.
          </p>

        </div>

        <div className="p-10 lg:p-14">

          <h2 className="text-4xl font-bold text-white">
            Sign In
          </h2>

          <p className="mb-8 mt-2 text-slate-400">
            Welcome back to CineSync.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div className="relative">

              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 py-4 pl-12 pr-4 text-white outline-none transition focus:border-blue-500"
                required
              />

            </div>

            <div className="relative">

              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 py-4 pl-12 pr-12 text-white outline-none transition focus:border-blue-500"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-white"
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

            <div className="flex items-center justify-between">

              <label className="flex items-center gap-2 text-sm text-slate-400">

                <input
                  type="checkbox"
                  className="accent-blue-600"
                />

                Remember me

              </label>

              <button
                type="button"
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                Forgot Password?
              </button>

            </div>

            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
                      </form>

          <div className="my-8 flex items-center">
            <div className="h-px flex-1 bg-slate-700" />

            <span className="px-4 text-sm text-slate-500">
              OR
            </span>

            <div className="h-px flex-1 bg-slate-700" />
          </div>

          <div className="space-y-4">

            <button
              type="button"
              className="flex w-full items-center justify-center rounded-xl border border-slate-700 bg-slate-900 py-4 font-medium text-white transition hover:border-slate-500 hover:bg-slate-800"
            >
              Continue as Guest
            </button>

          </div>

          <p className="mt-8 text-center text-slate-400">

            Don't have an account?

            <Link
              to="/register"
              className="ml-2 font-semibold text-blue-400 transition hover:text-blue-300"
            >
              Create one
            </Link>

          </p>

        </div>

      </div>
    </div>
  );
}