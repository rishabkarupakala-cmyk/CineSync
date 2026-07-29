import { motion } from "framer-motion";
import {
  FaHeart,
  FaPlay,
  FaPlus,
} from "react-icons/fa";

import { useTrailer } from "../../context/TrailerContext";

function MovieActions({ movieId }) {
  const { openTrailer, loading } = useTrailer();

  return (
    <div className="flex gap-3 px-5 pb-5">
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        disabled={loading}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          openTrailer(movieId);
        }}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white py-3 font-semibold text-black transition hover:bg-slate-200 disabled:opacity-50"
      >
        <FaPlay />
        {loading ? "Loading..." : "Play Trailer"}
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white backdrop-blur-md transition hover:border-cyan-400 hover:bg-cyan-500/20"
      >
        <FaPlus />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white backdrop-blur-md transition hover:border-red-500 hover:bg-red-500/20"
      >
        <FaHeart />
      </motion.button>
    </div>
  );
}

export default MovieActions;