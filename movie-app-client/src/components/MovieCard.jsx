import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaStar,
  FaPlay,
  FaHeart,
  FaCalendarAlt,
} from "react-icons/fa";

import TrailerModal from "./TrailerModal";
import { getMovieTrailer } from "../api/tmdbApi";

import { useWatchlist } from "../context/WatchlistContext";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

import { WATCHLIST_STATUS } from "../constants/watchlistStatus";

function MovieCard({ movie }) {
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loadingTrailer, setLoadingTrailer] = useState(false);

  const {
    addToWatchlist,
    removeFromWatchlist,
    isMovieSaved,
    getSavedMovie,
  } = useWatchlist();

  const { isAuthenticated } = useAuth();
  const { posterSize } = useTheme();

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://placehold.co/500x750?text=No+Poster";

  const rating = movie.vote_average?.toFixed(1) ?? "N/A";
  const year = movie.release_date?.slice(0, 4) ?? "N/A";
  const match = Math.round((movie.vote_average ?? 0) * 10);

  const saved = isMovieSaved(movie.id);

  const posterStyles = {
    compact: {
      card: "w-[200px]",
      image: "h-[300px]",
      title: "text-lg",
    },
    comfortable: {
      card: "w-[260px]",
      image: "h-[390px]",
      title: "text-xl",
    },
    large: {
      card: "w-[320px]",
      image: "h-[480px]",
      title: "text-2xl",
    },
  };

  const currentSize =
    posterStyles[posterSize] ??
    posterStyles.comfortable;

  const openTrailer = async (e) => {
    e.preventDefault();

    if (loadingTrailer) return;

    try {
      setLoadingTrailer(true);

      const key = await getMovieTrailer(movie.id);

      setTrailerKey(key);
      setShowTrailer(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingTrailer(false);
    }
  };

  const toggleWatchlist = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert("Please login first.");
      return;
    }

    try {
      if (saved) {
        const savedMovie = getSavedMovie(movie.id);

        await removeFromWatchlist(savedMovie.id);
      } else {
        await addToWatchlist({
          tmdbId: movie.id,
          title: movie.title,
          poster: movie.poster_path,
          backdrop: movie.backdrop_path,
          releaseDate: movie.release_date,
          overview: movie.overview,
          status: WATCHLIST_STATUS.PLANNED,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
        <>
      <motion.div
        whileHover={{
          y: -8,
          scale: 1.03,
        }}
        transition={{
          duration: 0.25,
        }}
        className={`group relative flex-shrink-0 ${currentSize.card}`}
      >
        <Link to={`/movie/${movie.id}`}>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-xl">

            <img
              src={poster}
              alt={movie.title}
              className={`${currentSize.image} w-full object-cover transition-transform duration-700 group-hover:scale-110`}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

            <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-black">
              <FaStar size={11} />
              {rating}
            </div>

            <div className="absolute right-3 top-3 rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white">
              {match}% Match
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4">

              <h3
                className={`truncate font-bold text-white ${currentSize.title}`}
              >
                {movie.title}
              </h3>

              <div className="mt-1 flex items-center gap-2 text-sm text-gray-300">
                <FaCalendarAlt size={10} />
                {year}
              </div>

              <div className="mt-4 flex gap-2">

                <button
                  onClick={openTrailer}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white py-2 font-semibold text-black transition hover:bg-gray-200"
                >
                  <FaPlay size={11} />
                  Trailer
                </button>

                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={toggleWatchlist}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${
                    saved
                      ? "bg-red-500 text-white"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  <FaHeart />
                </motion.button>

              </div>

            </div>

          </div>
        </Link>
      </motion.div>

      <TrailerModal
        isOpen={showTrailer}
        trailerKey={trailerKey}
        onClose={() => setShowTrailer(false)}
      />
    </>
  );
}

export default MovieCard;