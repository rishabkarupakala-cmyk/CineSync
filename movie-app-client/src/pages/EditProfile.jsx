import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { getMyProfile, updateProfile } from "../api/profileApi";
import { uploadImage } from "../utils/uploadImage";

function EditProfile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    avatar: "",
    bio: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const user = await getMyProfile();

      setForm({
        avatar: user.avatar || "",
        bio: user.bio || "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Couldn't load profile");
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

  async function handleImageChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    try {
      setUploading(true);

      toast.loading("Uploading image...", {
        id: "upload",
      });

      const imageUrl = await uploadImage(file);

      setForm((prev) => ({
        ...prev,
        avatar: imageUrl,
      }));

      toast.success("Image uploaded!", {
        id: "upload",
      });
    } catch (err) {
      console.error(err);

      toast.error("Upload failed", {
        id: "upload",
      });
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setSaving(true);

      await updateProfile(form);

      toast.success("Profile updated!");

      navigate("/profile");
    } catch (err) {
      console.error(err);

      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-xl text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl"
      >
        <h1 className="mb-8 text-center text-4xl font-bold">
          Edit Profile
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-8 flex justify-center">
            <label className="relative cursor-pointer group">
              <div className="h-40 w-40 overflow-hidden rounded-full border-4 border-cyan-500 shadow-xl">

                {form.avatar ? (
                  <img
                    src={form.avatar}
                    alt="Profile"
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-cyan-500 text-6xl font-bold text-black">
                    ?
                  </div>
                )}

              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              <div className="absolute bottom-2 right-2 rounded-full bg-cyan-500 px-3 py-1 text-xs font-bold text-black shadow-lg">
                {uploading ? "Uploading..." : "Change"}
              </div>
            </label>
          </div>

          <div className="mb-6">
            <label className="mb-2 block font-semibold">
              Bio
            </label>

            <textarea
              name="bio"
              rows={5}
              maxLength={250}
              value={form.bio}
              onChange={handleChange}
              placeholder="Tell everyone about yourself..."
              className="w-full resize-none rounded-xl bg-slate-800 p-4 text-white outline-none ring-1 ring-transparent transition focus:ring-cyan-500"
            />

            <p className="mt-2 text-right text-sm text-slate-400">
              {form.bio.length}/250
            </p>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="flex-1 rounded-xl border border-white/10 py-3 text-white transition hover:bg-white/10"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving || uploading}
              className="flex-1 rounded-xl bg-cyan-500 py-3 font-bold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : uploading
                ? "Uploading..."
                : "Save Changes"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default EditProfile;