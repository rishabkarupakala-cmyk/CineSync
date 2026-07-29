import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function MovieTrailer({ movie, active }) {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (!active) {
      setShowVideo(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 350);

    return () => clearTimeout(timer);
  }, [active, movie?.id]);

  if (!movie) return null;

  const backdrop = movie.backdrop
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop}`
    : movie.poster
    ? `https://image.tmdb.org/t/p/w780${movie.poster}`
    : "https://placehold.co/1280x720?text=No+Image";

  return (
    <div className="relative h-56 overflow-hidden rounded-t-3xl bg-slate-900">
      <img
        src={backdrop}
        alt={movie.title}
        className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ${
          showVideo ? "scale-110 opacity-0" : "scale-100 opacity-100"
        }`}
      />

      <AnimatePresence>
        {showVideo && movie.trailerKey && (
          <motion.iframe
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .35 }}
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${movie.trailerKey}?autoplay=1&mute=1&controls=0&playsinline=1&rel=0&loop=1&playlist=${movie.trailerKey}`}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={movie.title}
          />
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40" />
    </div>
  );
}

export default MovieTrailer;