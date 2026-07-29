import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaUsers } from "react-icons/fa";
import { searchUsers } from "../api/friendsApi";
import FriendCard from "../components/FriendCard";

export default function Friends() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const data = await searchUsers(query);

      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const timer = setTimeout(fetchUsers, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="min-h-screen bg-[#050816]">
      <div className="mx-auto max-w-7xl px-6 py-12">

        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-10"
        >
          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600">
              <FaUsers className="text-3xl text-white" />
            </div>

            <div>

              <h1 className="text-5xl font-bold text-white">
                Discover People
              </h1>

              <p className="mt-2 text-lg text-zinc-400">
                Find movie lovers and build your circle.
              </p>

            </div>

          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .15 }}
          className="mb-10"
        >
          <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-xl">

            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500" />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by username or name..."
              className="w-full bg-transparent py-5 pl-14 pr-5 text-white outline-none placeholder:text-zinc-500"
            />

          </div>

        </motion.div>
                {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-3xl border border-zinc-800 bg-zinc-900 p-8"
              >
                <div className="mx-auto h-24 w-24 rounded-full bg-zinc-800" />

                <div className="mx-auto mt-6 h-5 w-40 rounded bg-zinc-800" />

                <div className="mx-auto mt-3 h-4 w-28 rounded bg-zinc-800" />

                <div className="mx-auto mt-6 h-4 w-56 rounded bg-zinc-800" />

                <div className="mx-auto mt-2 h-4 w-40 rounded bg-zinc-800" />

                <div className="mt-8 h-12 rounded-xl bg-zinc-800" />
              </div>
            ))}
          </div>
        ) : users.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center rounded-3xl border border-zinc-800 bg-zinc-900/70 py-24 text-center"
          >
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-zinc-800 text-5xl">
              🔍
            </div>

            <h2 className="text-3xl font-bold text-white">
              No users found
            </h2>

            <p className="mt-3 max-w-md text-zinc-400">
              Try searching with another username or check back later.
            </p>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            {users.map((user) => (
              <FriendCard
                key={user.id}
                user={user}
                onUpdate={fetchUsers}
              />
            ))}
          </motion.div>
        )}

      </div>
    </div>
  );
}