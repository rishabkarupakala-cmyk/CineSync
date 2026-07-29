import { AnimatePresence, motion } from "framer-motion";
import { useHoverTrailer } from "../context/HoverTrailerContext";

function HoverTrailerPlayer() {
  const { hoveredMovie } = useHoverTrailer();

  return (
    <AnimatePresence>
      {hoveredMovie && (
        <motion.div
          key={hoveredMovie.movieId}
          initial={{
            opacity: 0,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            left: hoveredMovie.x,
            top: hoveredMovie.y,
          }}
          exit={{
            opacity: 0,
            scale: 0.96,
          }}
          transition={{
            duration: 0.25,
          }}
          className="fixed z-[9999] overflow-hidden rounded-3xl shadow-2xl border border-cyan-400/30 bg-black"
          style={{
            width: hoveredMovie.width,
            height: hoveredMovie.height,
            pointerEvents: "none",
          }}
        >
          <iframe
            title="Hover Trailer"
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${hoveredMovie.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${hoveredMovie.key}&modestbranding=1&rel=0`}
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="absolute inset-0"
          />

          {/* Dark Gradient */}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default HoverTrailerPlayer;