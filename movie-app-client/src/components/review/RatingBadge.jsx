import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

export default function RatingBadge({ rating }) {
  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      className="flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2"
    >
      <FaStar className="text-yellow-400" />

      <span className="font-semibold text-yellow-300">
        {Number(rating).toFixed(1)}
      </span>
    </motion.div>
  );
}