import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getUserProfile,
  followUser,
  unfollowUser,
} from "../api/friendsApi";

import ProfileHero from "../components/profile/ProfileHero";
import ProfileTabs from "../components/profile/ProfileTabs";

export default function UserProfile() {
  const { id } = useParams();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    try {
      setLoading(true);
const data = await getUserProfile(id);

console.log("PROFILE DATA:", data);
console.log("PROFILE USER:", data?.user);

setProfile(data);
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
      if (profile.relationship.isFollowing) {
        await unfollowUser(id);
      } else if (profile.relationship.requestSent) {
        // Cancel follow request
        await unfollowUser(id);
      } else {
        await followUser(id);
      }

      await loadProfile();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="mt-20 text-center text-white">
        Loading...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="mt-20 text-center text-red-500">
        User not found.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-6 py-8">
      <ProfileHero
        profile={profile.user}
        isOwnProfile={false}
        relationship={profile.relationship}
        permissions={profile.permissions}
        onFollow={handleFollow}
        onUnfollow={handleFollow}
      />

      <ProfileTabs
        profile={{
          ...profile.user,
          reviews: profile.reviews,
          watchlist: profile.watchlist,
          favoriteMovies: profile.favoriteMovies,
          reviewCount: profile.user.reviewCount,
          watchlistCount: profile.user.watchlistCount,
          favoriteCount: profile.user.favoriteCount,
        }}
        permissions={profile.permissions}
        isOwnProfile={false}
      />
    </div>
  );
}