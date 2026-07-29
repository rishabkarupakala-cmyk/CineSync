import { useEffect, useState } from "react";
import { getFollowers } from "../api/followApi";
import UserCard from "../components/users/UserCard";

function Followers() {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    getFollowers(user.username)
      .then(setFollowers)
      .catch(console.error);
  }, []);

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-8 text-3xl font-bold">
        Followers
      </h1>

      <div className="space-y-4">
        {followers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
          />
        ))}
      </div>
    </div>
  );
}

export default Followers;