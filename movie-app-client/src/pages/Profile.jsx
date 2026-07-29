import { useEffect, useState } from "react";
import { getMyProfile } from "../api/profileApi";

import {
  ProfileHero,
  ProfileTabs,
  ProfileSkeleton,
} from "../components/profile";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const data = await getMyProfile();
      setProfile(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <ProfileSkeleton />;

  if (!profile) {
    return (
      <div className="flex h-screen items-center justify-center text-red-400">
        Failed to load profile.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <ProfileHero profile={profile} />
        <ProfileTabs profile={profile} />
      </div>
    </div>
  );
}

export default Profile;