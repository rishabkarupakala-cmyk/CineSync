import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AVATAR =
  "https://ui-avatars.com/api/?background=06b6d4&color=fff&name=";

function UserCard({ user }) {
  return (
    <Link
      to={`/profile/${user.id}`}
      className="block"
    >
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-lg transition-all hover:border-cyan-400/40 hover:bg-white/10"
      >
        <div className="flex items-center gap-4">
          <img
            src={
              user.avatar ||
              `${AVATAR}${encodeURIComponent(
                user.name || user.username
              )}`
            }
            alt={user.username}
            className="h-14 w-14 rounded-full object-cover"
          />

          <div>
            <h3 className="font-semibold text-white">
              {user.name || user.username}
            </h3>

            <p className="text-sm text-slate-400">
              @{user.username}
            </p>

            {user.bio && (
              <p className="mt-1 line-clamp-1 text-sm text-slate-500 line-clamp-1">
                {user.bio}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default UserCard;