import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaUserEdit,
  FaLock,
  FaGlobe,
  FaCalendarAlt,
  FaUsers,
  FaUserFriends,
  FaStar,
  FaHeart,
} from "react-icons/fa";

function ProfileHero({ profile }) {
  const joinedDate = new Date(profile.createdAt).toLocaleDateString(
    "en-US",
    {
      month: "long",
      year: "numeric",
    }
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
    >
      {/* Banner */}
      <div className="h-44 bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600" />

      <div className="px-8 pb-8">
        <div className="-mt-20 flex flex-col gap-8 lg:flex-row lg:items-end">
          {/* Avatar */}
          <div className="relative">
            <div className="h-40 w-40 overflow-hidden rounded-full border-4 border-slate-950 bg-slate-800 shadow-2xl shadow-cyan-500/30">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.username}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-cyan-500 text-6xl font-bold text-black">
                  {profile.username.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-4xl font-bold">
                  {profile.username}
                </h1>

                <p className="mt-1 text-lg text-slate-400">
                  @{profile.username.toLowerCase()}
                </p>

                <p className="mt-5 max-w-3xl text-slate-300">
                  {profile.bio || "Movie lover. Tell the world about yourself."}
                </p>

                <div className="mt-5 flex flex-wrap gap-5 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    {profile.isPrivate ? (
                      <>
                        <FaLock />
                        Private Account
                      </>
                    ) : (
                      <>
                        <FaGlobe />
                        Public Account
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <FaCalendarAlt />
                    Joined {joinedDate}
                  </div>
                </div>
              </div>

              <Link
                to="/profile/edit"
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-black transition hover:bg-cyan-400"
              >
                <FaUserEdit />
                Edit Profile
              </Link>
            </div>

            {/* Stats */}
            {/* Stats */}
<div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
  <StatCard
    icon={<FaStar />}
    value={profile._count?.reviews ?? 0}
    label="Reviews"
  />

  <StatCard
    icon={<FaHeart />}
    value={profile._count?.watchlist ?? 0}
    label="Watchlist"
  />

  <Link to="/followers">
    <StatCard
      clickable
      icon={<FaUsers />}
      value={profile._count?.followers ?? 0}
      label="Followers"
    />
  </Link>

  <Link to="/following">
    <StatCard
      clickable
      icon={<FaUserFriends />}
      value={profile._count?.following ?? 0}
      label="Following"
    />
  </Link>
</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StatCard({ icon, value, label, clickable = false }) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.03 }}
      className={`rounded-2xl border p-5 text-center transition ${
        clickable
          ? "cursor-pointer border-cyan-500/30 bg-slate-900/70 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20"
          : "border-white/10 bg-slate-900/70"
      }`}
    >
      <div className="mb-3 flex justify-center text-xl text-cyan-400">
        {icon}
      </div>

      <h2 className="text-3xl font-bold">{value}</h2>

      <p className="mt-2 text-sm text-slate-400">{label}</p>
    </motion.div>
  );
}

export default ProfileHero;