import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getUserProfile,
  followUser,
  unfollowUser,
} from "../api/friendsApi";
import { FaUserPlus, FaUserCheck } from "react-icons/fa";

const DEFAULT_AVATAR =
  "https://ui-avatars.com/api/?background=7c3aed&color=fff&name=User";

export default function UserProfile() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const data = await getUserProfile(id);
      setUser(data);
      setIsFollowing(data.isFollowing || false);
      setRequestSent(data.requestSent || false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, [id]);

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await unfollowUser(id);
      } else if (requestSent) {
        await unfollowUser(id);
      } else {
        const res = await followUser(id);
        if (res?.requested) {
          setRequestSent(true);
        } else {
          setIsFollowing(true);
        }
      }
      await loadProfile();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="text-center text-white mt-20">Loading...</div>;
  }

  if (!user) {
    return <div className="text-center text-red-500 mt-20">User not found.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-8">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <img
            src={user.avatar || DEFAULT_AVATAR}
            alt={user.username}
            className="w-36 h-36 rounded-full object-cover"
          />

          <div className="flex-1">
            <h1 className="text-4xl font-bold text-white">{user.username}</h1>

            <p className="text-gray-400 mt-3">{user.bio || "Movie lover"}</p>

            <div className="flex gap-8 mt-6 text-center">
              <div>
                <h2 className="text-2xl font-bold text-white">{user.followerCount}</h2>
                <p className="text-gray-400">Followers</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">{user.followingCount}</h2>
                <p className="text-gray-400">Following</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">{user.reviewCount}</h2>
                <p className="text-gray-400">Reviews</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">{user.watchlistCount}</h2>
                <p className="text-gray-400">Watchlist</p>
              </div>
            </div>

            <button
              onClick={handleFollow}
              className={`mt-8 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition ${
                isFollowing
                  ? "bg-zinc-700 hover:bg-zinc-600"
                  : requestSent
                  ? "bg-yellow-600 hover:bg-yellow-700"
                  : "bg-violet-600 hover:bg-violet-700"
              }`}
            >
              {isFollowing ? (
                <>
                  <FaUserCheck />
                  Following
                </>
              ) : requestSent ? (
                <>
                  <FaUserCheck />
                  Requested
                </>
              ) : (
                <>
                  <FaUserPlus />
                  Follow
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Recent Reviews</h2>

        {user.reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {user.reviews.map((review) => (
              <div key={review.id} className="border-b border-zinc-800 pb-4">
                <h3 className="text-white font-semibold">
                  TMDB ID: {review.tmdbId}
                </h3>
                <p className="text-yellow-400">⭐ {review.rating}/10</p>
                <p className="text-gray-300 mt-2">{review.review}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}