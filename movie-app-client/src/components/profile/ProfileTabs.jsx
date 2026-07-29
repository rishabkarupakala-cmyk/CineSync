import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaStar,
  FaHeart,
  FaHistory,
  FaFire,
} from "react-icons/fa";

import ProfileReviewList from "./ProfileReviewList";
import ProfileWatchlistGrid from "./ProfileWatchlistGrid";
const tabs = [
  {
    id: "reviews",
    label: "Reviews",
    icon: <FaStar />,
  },
  {
    id: "watchlist",
    label: "Watchlist",
    icon: <FaHeart />,
  },
  {
    id: "activity",
    label: "Activity",
    icon: <FaHistory />,
  },
  {
    id: "favorites",
    label: "Favorites",
    icon: <FaFire />,
  },
];

function ProfileTabs({ profile }) {
  const [activeTab, setActiveTab] = useState("reviews");

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      {/* Tabs */}
      <div className="mb-8 flex flex-wrap gap-3 border-b border-white/10 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex items-center gap-2 rounded-xl px-5 py-3 transition ${
              activeTab === tab.id
                ? "bg-cyan-500 text-black"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Reviews */}
          {activeTab === "reviews" && (
            <ProfileReviewList reviews={profile.reviews} />
          )}
           
           {activeTab === "watchlist" && (
  <ProfileWatchlistGrid
    watchlist={profile.watchlist}
  />
)}

          {/* Activity */}
          {activeTab === "activity" && (
            <EmptySection
              title="Activity"
              subtitle="Recent activity will appear here."
            />
          )}

          {/* Favorites */}
          {activeTab === "favorites" && (
            <EmptySection
              title="Favorites"
              subtitle="Favorite movies and genres coming soon."
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function EmptySection({ title, subtitle }) {
  return (
    <div className="flex h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 text-center">
      <h2 className="text-2xl font-bold">{title}</h2>

      <p className="mt-3 text-slate-400">
        {subtitle}
      </p>
    </div>
  );
}

export default ProfileTabs;