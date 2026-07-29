import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

import { useWatchlist } from "../context/WatchlistContext";

import {
  WATCHLIST_STATUS_LABELS,
  WATCHLIST_STATUS_COLORS,
} from "../constants/watchlistStatus";

function Watchlist() {
  const { movies, loading } = useWatchlist();

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <h2 className="text-xl text-slate-400">
          Loading your watchlist...
        </h2>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <FaHeart className="mb-6 text-6xl text-red-500" />

        <h1 className="mb-3 text-4xl font-bold text-white">
          Your Watchlist is Empty
        </h1>

        <p className="max-w-md text-slate-400">
          Start exploring movies and tap the heart icon to build your
          personal collection.
        </p>

        <Link
          to="/"
          className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Discover Movies
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-8 text-4xl font-bold text-white">
        My Watchlist
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {movies.map((movie) => (
          <motion.div
            key={movie.id}
            whileHover={{ y: -6 }}
            className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-xl"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
              alt={movie.title}
              className="h-[380px] w-full object-cover"
            />

            <div className="p-5">
              <h2 className="truncate text-xl font-bold text-white">
                {movie.title}
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                {movie.releaseDate?.slice(0, 4)}
              </p>

              <p className="mt-4 line-clamp-3 text-sm text-slate-300">
                {movie.overview}
              </p>

              <div
                className={`mt-5 inline-flex rounded-full px-4 py-2 text-sm font-semibold text-white ${
                  WATCHLIST_STATUS_COLORS[movie.status]
                }`}
              >
                {WATCHLIST_STATUS_LABELS[movie.status]}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Watchlist;