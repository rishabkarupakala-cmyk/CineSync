import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlay,
  FaHeart,
  FaStar,
  FaClock,
  FaCalendarAlt,
} from "react-icons/fa";

import { useTrailer } from "../../context/TrailerContext";

function MoviePreview({ movie, loading, visible }) {
  const { openTrailer } = useTrailer();

  if (!visible) return null;

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 240 }}
        exit={{ opacity: 0, height: 0 }}
        className="overflow-hidden rounded-b-3xl bg-slate-900"
      >
        <div className="flex h-full items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent" />
        </div>
      </motion.div>
    );
  }

  if (!movie) return null;

  const backdrop = movie.backdrop
    ? `https://image.tmdb.org/t/p/w780${movie.backdrop}`
    : `https://image.tmdb.org/t/p/w500${movie.poster}`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{
          opacity: 0,
          height: 0,
        }}
        animate={{
          opacity: 1,
          height: "auto",
        }}
        exit={{
          opacity: 0,
          height: 0,
        }}
        transition={{
          duration: .35,
        }}
        className="overflow-hidden rounded-b-3xl bg-slate-900"
      >
        {/* Backdrop */}

        <div className="relative h-48 overflow-hidden">

          <img
            src={backdrop}
            alt={movie.title}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-black/40 to-transparent"/>

        </div>

        {/* Content */}

        <div className="space-y-4 p-5">

          <h2 className="text-xl font-bold text-white">
            {movie.title}
          </h2>

          <div className="flex flex-wrap gap-4 text-sm text-slate-300">

            <span className="flex items-center gap-2">
              <FaStar className="text-yellow-400"/>
              {movie.rating.toFixed(1)}
            </span>

            <span className="flex items-center gap-2">
              <FaClock/>
              {movie.runtime} min
            </span>

            <span className="flex items-center gap-2">
              <FaCalendarAlt/>
              {movie.releaseDate.slice(0,4)}
            </span>

          </div>

          <div className="flex flex-wrap gap-2">

            {movie.genres.map((genre)=>(
              <span
                key={genre.id}
                className="rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 text-xs text-cyan-300"
              >
                {genre.name}
              </span>
            ))}

          </div>

          <p className="text-sm leading-7 text-slate-300 line-clamp-4">
            {movie.overview}
          </p>

          <div className="flex gap-3">

            <button
              onClick={() => openTrailer(movie.id)}
              className="flex-1 rounded-xl bg-white py-3 font-semibold text-black transition hover:bg-slate-200 flex items-center justify-center gap-2"
            >
              <FaPlay/>
              Play Trailer
            </button>

            <button
              className="h-12 w-12 rounded-xl bg-white/10 border border-white/10 text-white flex items-center justify-center hover:bg-red-500 transition"
            >
              <FaHeart/>
            </button>

          </div>

        </div>

      </motion.div>
    </AnimatePresence>
  );
}

export default MoviePreview;