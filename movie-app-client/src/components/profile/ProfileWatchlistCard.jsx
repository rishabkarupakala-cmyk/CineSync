import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const POSTER = "https://image.tmdb.org/t/p/w500";

function ProfileWatchlistCard({ movie }) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{ duration: 0.25 }}
      className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
    >
      <img
        src={
          movie.poster
            ? `${POSTER}${movie.poster}`
            : "https://placehold.co/500x750?text=No+Poster"
        }
        alt={movie.title}
        className="h-72 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="line-clamp-1 font-bold">
          {movie.title}
        </h3>

        <span className="mt-3 inline-block rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-semibold text-cyan-300">
          {movie.status}
        </span>

        <Link
          to={`/movie/${movie.tmdbId}`}
          className="mt-5 block rounded-xl bg-cyan-500 py-3 text-center font-semibold text-black transition hover:bg-cyan-400"
        >
          View Movie
        </Link>
      </div>
    </motion.div>
  );
}

export default ProfileWatchlistCard;