import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaBell,
} from "react-icons/fa6";

export default function NotificationSettings() {
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);

  const [notifications, setNotifications] = useState({
    likes: true,
    comments: true,
    replies: true,
    followers: true,

    friendRequests: true,
    friendAccepted: true,
    friendWatching: false,
    friendReviews: true,

    newReleases: true,
    trendingMovies: true,
    recommendations: true,

    emailDigest: false,
    productUpdates: true,

    pushNotifications: true,
  });

  const toggle = (field) => {
    setNotifications((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      // TODO:
      // await updateNotificationSettings(notifications);

      setTimeout(() => {
        setSaving(false);
        alert("Notification settings updated!");
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

  const Section = ({ title, children }) => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white border-b border-white/10 pb-2">
        {title}
      </h2>

      <div className="space-y-4">
        {children}
      </div>
    </div>
  );

  return (
        <div className="min-h-screen bg-[#070b1a] text-white">
      <div className="mx-auto max-w-4xl px-6 py-12">

        <Link
          to="/settings"
          className="mb-8 inline-flex items-center gap-2 text-slate-400 transition hover:text-white"
        >
          <FaArrowLeft />
          Back
        </Link>

        <div className="mb-10 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/20 text-2xl text-blue-400">
            <FaBell />
          </div>

          <div>
            <h1 className="text-4xl font-bold">
              Notifications
            </h1>

            <p className="text-slate-400">
              Choose which notifications you'd like to receive.
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
        >

          <Section title="Activity">

            <ToggleCard
              title="Likes on my reviews"
              description="Notify me when someone likes my review."
              value={notifications.likes}
              onClick={() => toggle("likes")}
            />

            <ToggleCard
              title="Comments on my reviews"
              description="Notify me when someone comments on my review."
              value={notifications.comments}
              onClick={() => toggle("comments")}
            />

            <ToggleCard
              title="Replies to my comments"
              description="Notify me when someone replies to my comment."
              value={notifications.replies}
              onClick={() => toggle("replies")}
            />

            <ToggleCard
              title="New Followers"
              description="Get notified when someone follows you."
              value={notifications.followers}
              onClick={() => toggle("followers")}
            />

          </Section>

          <Section title="Social">

            <ToggleCard
              title="Friend Requests"
              description="Receive notifications for new friend requests."
              value={notifications.friendRequests}
              onClick={() => toggle("friendRequests")}
            />

            <ToggleCard
              title="Friend Request Accepted"
              description="Know when someone accepts your friend request."
              value={notifications.friendAccepted}
              onClick={() => toggle("friendAccepted")}
            />

            <ToggleCard
              title="Friend Started Watching"
              description="See when friends start watching a movie."
              value={notifications.friendWatching}
              onClick={() => toggle("friendWatching")}
            />

            <ToggleCard
              title="Friend Posted a Review"
              description="Receive updates when friends post reviews."
              value={notifications.friendReviews}
              onClick={() => toggle("friendReviews")}
            />

          </Section>

          <Section title="Recommendations">

            <ToggleCard
              title="New Releases"
              description="Be notified about newly released movies."
              value={notifications.newReleases}
              onClick={() => toggle("newReleases")}
            />

            <ToggleCard
              title="Trending Movies"
              description="Get alerts for trending movies."
              value={notifications.trendingMovies}
              onClick={() => toggle("trendingMovies")}
            />

            <ToggleCard
              title="Personalized Recommendations"
              description="Receive movie recommendations based on your taste."
              value={notifications.recommendations}
              onClick={() => toggle("recommendations")}
            />

          </Section>

          <Section title="Email Notifications">

            <ToggleCard
              title="Weekly Digest"
              description="Receive a weekly email summary."
              value={notifications.emailDigest}
              onClick={() => toggle("emailDigest")}
            />

            <ToggleCard
              title="Product Updates"
              description="Receive emails about new CineSync features."
              value={notifications.productUpdates}
              onClick={() => toggle("productUpdates")}
            />

          </Section>

          <Section title="Push Notifications">

            <ToggleCard
              title="Enable Push Notifications"
              description="Receive notifications on your device."
              value={notifications.pushNotifications}
              onClick={() => toggle("pushNotifications")}
            />

          </Section>

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full rounded-2xl bg-blue-600 py-3 text-lg font-semibold transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

        </motion.div>

      </div>
    </div>
  );
}