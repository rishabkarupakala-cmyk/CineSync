import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUserPlus,
  FaUserCheck,
  FaLock,
  FaGlobe,
  FaFilm,
  FaStar,
  FaBookmark,
} from "react-icons/fa";

import {
  followUser,
  unfollowUser,
  cancelFollowRequest,
} from "../api/friendsApi";

const DEFAULT_AVATAR =
  "https://ui-avatars.com/api/?background=2563eb&color=fff&name=User";

export default function FriendCard({ user, onUpdate }) {
  const [isFollowing, setIsFollowing] = useState(
    user.isFollowing || false
  );

  const [requestSent, setRequestSent] = useState(
    user.requestSent || false
  );

  const [loading, setLoading] = useState(false);

  const handleFollow = async () => {
    if (loading) return;

    setLoading(true);

    try {
      if (isFollowing) {
        await unfollowUser(user.id);
        setIsFollowing(false);
      } else if (requestSent) {
        await cancelFollowRequest(user.id);
        setRequestSent(false);
      } else {
        const res = await followUser(user.id);

        if (res.requested) {
          setRequestSent(true);
        } else {
          setIsFollowing(true);
        }
      }

      onUpdate?.();
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
      className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-[#0b1120]/80 backdrop-blur-2xl p-8 shadow-lg transition-all duration-300 hover:border-blue-500/40 hover:shadow-[0_0_50px_rgba(37,99,235,0.18)]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-indigo-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <Link
        to={`/profile/${user.id}`}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-blue-500 blur-2xl opacity-30 group-hover:opacity-60 transition" />

          <motion.img
            whileHover={{
              scale: 1.08,
            }}
            transition={{
              duration: 0.25,
            }}
            src={user.avatar || DEFAULT_AVATAR}
            alt={user.username}
            className="relative h-24 w-24 rounded-full border-4 border-blue-500 object-cover shadow-xl"
          />
        </div>

        <h2 className="mt-6 text-2xl font-bold text-white">
          {user.name || user.username}
        </h2>

        <p className="mt-1 text-sm font-medium text-blue-400">
          @{user.username}
        </p>

        <p className="mt-5 h-12 overflow-hidden text-center text-sm leading-6 text-zinc-300">
          {user.bio || "Movie enthusiast 🍿"}
        </p>

        <div
          className={`mt-5 rounded-full px-4 py-2 text-xs font-semibold ${
            user.isPrivate
              ? "bg-amber-500/10 text-amber-400"
              : "bg-emerald-500/10 text-emerald-400"
          }`}
        >
          <div className="flex items-center gap-2">
            {user.isPrivate ? (
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
        </div>

        <div className="mt-8 flex w-full justify-between rounded-2xl border border-white/5 bg-white/5 px-5 py-4">
          <div className="flex flex-col items-center">
            <FaFilm className="mb-2 text-blue-400" />
            <span className="text-lg font-bold text-white">
              {user.reviewCount ?? 0}
            </span>
            <span className="text-xs text-zinc-500">
              Reviews
            </span>
          </div>

          <div className="flex flex-col items-center">
            <FaBookmark className="mb-2 text-purple-400" />
            <span className="text-lg font-bold text-white">
              {user.watchlistCount ?? 0}
            </span>
            <span className="text-xs text-zinc-500">
              Watchlist
            </span>
          </div>

          <div className="flex flex-col items-center">
            <FaStar className="mb-2 text-yellow-400" />
            <span className="text-lg font-bold text-white">
              {user.followersCount ?? user.followerCount ?? 0}
            </span>
            <span className="text-xs text-zinc-500">
              Followers
            </span>
          </div>
        </div>
      </Link>

      <motion.button
        whileHover={{
          scale: 1.03,
        }}
        whileTap={{
          scale: 0.97,
        }}
        onClick={handleFollow}
        disabled={loading}
        className={`relative z-10 mt-8 flex w-full items-center justify-center gap-2 rounded-2xl py-3 font-semibold transition-all duration-300 ${
          isFollowing
            ? "border border-zinc-700 bg-zinc-800 text-white hover:bg-zinc-700"
            : requestSent
            ? "border border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20"
            : "bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
        }`}
      >
        {loading ? (
          "Please wait..."
        ) : isFollowing ? (
          <>
            <FaUserCheck />
            Following
          </>
        ) : requestSent ? (
          <>
            <FaLock />
            Requested
          </>
        ) : (
          <>
            <FaUserPlus />
            Follow
          </>
        )}
      </motion.button>
    </motion.div>
  );
}