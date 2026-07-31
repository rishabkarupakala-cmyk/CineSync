import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaCamera,
  FaUser,
} from "react-icons/fa6";

import {
  getMyProfile,
  updateProfile,
} from "../api/profileApi";

export default function EditProfileSettings() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    bio: "",
    profilePicture: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const user = await getMyProfile();

      console.log(user); // Remove after testing

      setForm({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        bio: user.bio || "",
        profilePicture:
          user.profilePicture ||
          user.avatar ||
          user.profilePic ||
          user.image ||
          "",
      });
    } catch (err) {
      console.error("Failed to load profile:", err);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setSaving(true);

    try {
      await updateProfile({
        name: form.name,
        username: form.username,
        email: form.email,
        bio: form.bio,
      });

      alert("Profile updated successfully!");

      navigate("/settings/account");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070b1a] text-white text-xl">
        Loading Profile...
      </div>
    );
  }

  return (
        <div className="min-h-screen bg-[#070b1a] text-white">
      <div className="mx-auto max-w-2xl px-6 py-12">

        <Link
          to="/settings/account"
          className="mb-8 inline-flex items-center gap-2 text-slate-400 transition hover:text-white"
        >
          <FaArrowLeft />
          Back
        </Link>

        <div className="mb-10 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/20 text-2xl text-blue-400">
            <FaUser />
          </div>

          <div>
            <h1 className="text-4xl font-bold">
              Edit Profile
            </h1>

            <p className="text-slate-400">
              Update your personal information and profile picture.
            </p>
          </div>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
        >

          <div className="flex flex-col items-center">

            <div className="relative">

              {form.profilePicture ? (
                <img
                  src={form.profilePicture}
                  alt="Profile"
                  className="h-28 w-28 rounded-full border-4 border-white/10 object-cover"
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-slate-800 text-5xl text-slate-500">
                  <FaUser />
                </div>
              )}

              <button
                type="button"
                className="absolute bottom-0 right-0 rounded-full bg-blue-600 p-3 transition hover:bg-blue-700"
              >
                <FaCamera />
              </button>

            </div>

            <button
              type="button"
              className="mt-4 text-blue-400 transition hover:text-blue-300"
            >
              Change Photo
            </button>

          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Username
            </label>

            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Bio
            </label>

            <textarea
              rows={4}
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Tell people about yourself..."
              className="w-full resize-none rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-2xl bg-blue-600 py-3 text-lg font-semibold transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

        </motion.form>

      </div>
    </div>
  );
}