import { useEffect, useState } from "react";
import { getFollowing } from "../api/followApi";
import UserCard from "../components/users/UserCard";

function Following() {
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    getFollowing(user.username)
      .then(setFollowing)
      .catch(console.error);
  }, []);

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-8 text-3xl font-bold">
        Following
      </h1>

      <div className="space-y-4">
        {following.map((user) => (
          <UserCard
            key={user.id}
            user={user}
          />
        ))}
      </div>
    </div>
  );
}

export default Following;