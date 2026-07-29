import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import {
  FaFilm,
  FaEye,
  FaEyeSlash,
  FaUser,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    isPrivate: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !form.name ||
      !form.username ||
      !form.email ||
      !form.password
    ) {
      return setError("Please fill all fields.");
    }

    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      setLoading(true);

      const data = await registerUser({
        name: form.name,
        username: form.username,
        email: form.email,
        password: form.password,
        isPrivate: form.isPrivate,
      });

      login(data.user, data.token);

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 overflow-hidden rounded-3xl border border-white/10 bg-[#0B1220] shadow-2xl">

        {/* Left Side */}

        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 p-12 text-white">

          <FaFilm className="text-6xl mb-6" />

          <h1 className="text-5xl font-bold leading-tight">
            Welcome to
            <br />
            CineSync
          </h1>

          <p className="mt-6 text-lg text-blue-100 leading-8">
            Discover movies.
            <br />
            Share reviews.
            <br />
            Connect with movie lovers.
          </p>

        </div>

        {/* Right Side */}

        <div className="p-10 lg:p-14">

          <h2 className="text-4xl font-bold text-white">
            Create Account
          </h2>

          <p className="text-slate-400 mt-2 mb-8">
            Join the CineSync community.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Full Name */}

            <div className="relative">

              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

              <input
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-xl bg-slate-900 border border-slate-700 pl-12 pr-4 py-4 text-white focus:border-blue-500 outline-none transition"
              />

            </div>

            {/* Username */}

            <div className="relative">

              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

              <input
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                className="w-full rounded-xl bg-slate-900 border border-slate-700 pl-12 pr-4 py-4 text-white focus:border-blue-500 outline-none transition"
              />

            </div>

            {/* Email */}

            <div className="relative">

              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-xl bg-slate-900 border border-slate-700 pl-12 pr-4 py-4 text-white focus:border-blue-500 outline-none transition"
              />

            </div>

            {/* Password */}

            <div className="relative">

              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-xl bg-slate-900 border border-slate-700 pl-12 pr-12 py-4 text-white focus:border-blue-500 outline-none transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>

            {/* Confirm Password */}

            <div className="relative">

              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-xl bg-slate-900 border border-slate-700 pl-12 pr-4 py-4 text-white focus:border-blue-500 outline-none transition"
              />

            </div>

            {/* Privacy */}

            <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">

              <p className="text-white font-medium mb-3">
                Account Privacy
              </p>

              <label className="flex items-center gap-3 cursor-pointer">

                <input
                  type="checkbox"
                  name="isPrivate"
                  checked={form.isPrivate}
                  onChange={handleChange}
                  className="accent-blue-600"
                />

                <span className="text-slate-300">
                  Make my account private
                </span>

              </label>

            </div>

            {error && (
              <p className="text-red-400 text-sm">
                {error}
              </p>
            )}

            <button
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 py-4 text-white font-semibold transition disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

          </form>

          <p className="text-center mt-8 text-slate-400">

            Already have an account?

            <Link
              to="/login"
              className="ml-2 text-blue-400 hover:text-blue-300 font-semibold"
            >
              Login
            </Link>

          </p>

        </div>

      </div>
    </div>
  );
}