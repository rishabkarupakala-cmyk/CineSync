import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaLock,
  FaChevronRight,
  FaUserSlash,
} from "react-icons/fa6";

export default function PrivacySettings() {
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);

  const [privacy, setPrivacy] = useState({
    privateAccount: false,
    activityStatus: true,
    showWatchHistory: true,
    showWatchlist: true,
    showReviews: true,
  });

  const toggle = (field) => {
    setPrivacy((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      // TODO:
      // await updatePrivacySettings(privacy);

      setTimeout(() => {
        setSaving(false);
        alert("Privacy settings updated!");
        navigate("/settings");
      }, 800);
    } catch (err) {
      console.error(err);
      setSaving(false);
    }
  };

  const ToggleCard = ({
    title,
    description,
    value,
    onClick,
  }) => (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/60 p-5 transition hover:border-blue-500">

      <div>
        <h3 className="font-semibold text-white">
          {title}
        </h3>

        <p className="mt-1 text-sm text-slate-400">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={onClick}
        className={`relative h-7 w-14 rounded-full transition duration-300 ${
          value ? "bg-blue-600" : "bg-slate-600"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition duration-300 ${
            value ? "left-8" : "left-1"
          }`}
        />
      </button>
    </div>
  );

  return (
        <div className="min-h-screen bg-[#070b1a] text-white">
      <div className="mx-auto max-w-3xl px-6 py-12">

        <Link
          to="/settings"
          className="mb-8 inline-flex items-center gap-2 text-slate-400 transition hover:text-white"
        >
          <FaArrowLeft />
          Back
        </Link>

        <div className="mb-10 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/20 text-2xl text-blue-400">
            <FaLock />
          </div>

          <div>
            <h1 className="text-4xl font-bold">
              Privacy
            </h1>

            <p className="text-slate-400">
              Manage who can see your profile and activity.
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-5 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
        >

          <ToggleCard
            title="Private Account"
            description="Only approved followers can view your profile."
            value={privacy.privateAccount}
            onClick={() => toggle("privateAccount")}
          />

          <ToggleCard
            title="Activity Status"
            description="Let friends see when you're online."
            value={privacy.activityStatus}
            onClick={() => toggle("activityStatus")}
          />

          <ToggleCard
            title="Show Watch History"
            description="Allow friends to view your watched movies."
            value={privacy.showWatchHistory}
            onClick={() => toggle("showWatchHistory")}
          />

          <ToggleCard
            title="Show Watchlist"
            description="Allow friends to view your watchlist."
            value={privacy.showWatchlist}
            onClick={() => toggle("showWatchlist")}
          />

          <ToggleCard
            title="Show Reviews"
            description="Allow others to see your ratings and reviews."
            value={privacy.showReviews}
            onClick={() => toggle("showReviews")}
          />

        <Link
  to="/settings/privacy/friend-requests"
  className="block"
>
  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/60 p-5 transition hover:border-blue-500">

    <div>
      <h3 className="font-semibold">
        Friend Requests
      </h3>

      <p className="mt-1 text-sm text-slate-400">
        Choose who can send you friend requests.
      </p>
    </div>

    <FaChevronRight className="text-slate-400" />

  </div>
</Link>

          <Link
  to="/settings/privacy/blocked-users"
  className="block"
>
  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/60 p-5 transition hover:border-red-500">

    <div>
      <h3 className="flex items-center gap-2 font-semibold">
        <FaUserSlash />
        Blocked Users
      </h3>

      <p className="mt-1 text-sm text-slate-400">
        View and manage blocked accounts.
      </p>
    </div>

    <FaChevronRight className="text-slate-400" />

  </div>
</Link>

          <button
            onClick={handleSave}
            disabled={saving}
            className="mt-4 w-full rounded-2xl bg-blue-600 py-3 text-lg font-semibold transition hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

        </motion.div>

      </div>
    </div>
  );
}