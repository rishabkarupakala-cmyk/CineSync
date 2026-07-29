import { motion } from "framer-motion";
import { FaMagnifyingGlass } from "react-icons/fa6";

function SearchButton({ onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="
        hidden
        xl:flex
        items-center
        justify-between
        gap-4
        w-[340px]
        h-12
        px-5
        rounded-2xl
        border
        border-white/10
        bg-white/[0.04]
        hover:bg-white/[0.08]
        backdrop-blur-xl
        transition-all
        duration-300
        group
      "
    >
      <div className="flex items-center gap-3 text-slate-300">
        <FaMagnifyingGlass className="text-sm group-hover:text-white transition-colors" />

        <span className="text-sm font-medium">
          Search movies, actors, genres...
        </span>
      </div>

      <div
        className="
          flex
          items-center
          gap-1
          rounded-lg
          border
          border-white/10
          bg-black/20
          px-2
          py-1
          text-xs
          text-slate-400
        "
      >
        <span>Ctrl</span>

        <span>+</span>

        <span>K</span>
      </div>
    </motion.button>
  );
}

export default SearchButton;