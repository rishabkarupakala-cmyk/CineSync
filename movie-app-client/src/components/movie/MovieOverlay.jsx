import { AnimatePresence, motion } from "framer-motion";

import useMovieData from "../../hooks/useMovieData";

import MovieTrailer from "./MovieTrailer";
import HoverMovieInfo from "./HoverMovieInfo";
import MovieActions from "./MovieActions";

function MovieOverlay({ movieId, open }) {
  const { movie, loading } = useMovieData(movieId, open);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
            scale: .96,
            y: 18,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: .96,
            y: 18,
          }}
          transition={{
            duration: .22,
          }}
          className="
            absolute
            inset-0
            z-40
            overflow-hidden
            rounded-3xl
            border
            border-cyan-400/20
            bg-slate-950/95
            backdrop-blur-xl
            shadow-[0_30px_80px_rgba(0,0,0,.6)]
          "
        >
          {loading ? (
            <div className="flex h-full items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent" />
            </div>
          ) : (
            <>
              <MovieTrailer
                movie={movie}
                active={open}
              />

              <HoverMovieInfo movie={movie} />

              <MovieActions
                movieId={movieId}
              />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MovieOverlay;