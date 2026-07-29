import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaInfoCircle,
  FaPlay,
  FaStar,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

import Button from "./ui/Button";
import { useTrailer } from "../context/TrailerContext";
import { useWatchlist } from "../context/WatchlistContext";
import { useAuth } from "../context/AuthContext";
import { WATCHLIST_STATUS } from "../constants/watchlistStatus";

function HeroCarousel({ movies }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const { openTrailer, loading } = useTrailer();

  const {
    addToWatchlist,
    removeFromWatchlist,
    isMovieSaved,
    getSavedMovie,
  } = useWatchlist();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!movies?.length || paused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [movies, paused]);

  if (!movies?.length) return null;

  const movie = movies[currentIndex];

  const saved = isMovieSaved(movie.id);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? movies.length - 1 : prev - 1
    );
  };

  async function toggleWatchlist() {
    if (!isAuthenticated) {
      toast.error("Please login first.");
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
      toast.error("Something went wrong.");
    }
  }

  return (
    <div
      className="relative h-[75vh] min-h-[550px] rounded-3xl overflow-hidden mb-16 shadow-2xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={movie.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <motion.img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 5,
              ease: "easeOut",
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

          <div className="absolute bottom-14 left-12 max-w-2xl">
            <motion.h1
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-black text-white mb-5"
            >
              {movie.title}
            </motion.h1>

            <motion.div
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-6 mb-6"
            >
              <span className="flex items-center gap-2 text-yellow-400 font-semibold text-lg">
                <FaStar />
                {movie.vote_average.toFixed(1)}
              </span>

              <span className="text-gray-300">
                {movie.release_date?.slice(0, 4)}
              </span>

              <span className="text-gray-300 uppercase">
                HD
              </span>
            </motion.div>

            <motion.p
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg leading-relaxed text-gray-300 line-clamp-4 mb-8"
            >
              {movie.overview}
            </motion.p>

            <motion.div
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                variant="primary"
                disabled={loading}
                onClick={() => openTrailer(movie.id)}
              >
                <span className="flex items-center gap-2">
                  <FaPlay />
                  {loading ? "Loading..." : "Watch Trailer"}
                </span>
              </Button>

              <Link to={`/movie/${movie.id}`}>
                <Button variant="secondary">
                  <span className="flex items-center gap-2">
                    <FaInfoCircle />
                    More Info
                  </span>
                </Button>
              </Link>

              <Button
                variant="ghost"
                onClick={toggleWatchlist}
              >
                <span className="flex items-center gap-2">
                  <FaHeart
                    className={
                      saved ? "text-red-500" : ""
                    }
                  />
                  {saved
                    ? "In Watchlist"
                    : "Watchlist"}
                </span>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 backdrop-blur-md p-4 rounded-full transition-all text-white"
      >
        <FaChevronLeft size={22} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 backdrop-blur-md p-4 rounded-full transition-all text-white"
      >
        <FaChevronRight size={22} />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-300 rounded-full ${
              currentIndex === index
                ? "bg-white w-8 h-3"
                : "bg-gray-500 w-3 h-3"
            }`}
          />
        ))}
      </div>

      {!paused && (
        <motion.div
          key={currentIndex}
          className="absolute bottom-0 left-0 h-1 bg-red-500"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{
            duration: 5,
            ease: "linear",
          }}
        />
      )}
    </div>
  );
}

export default HeroCarousel;