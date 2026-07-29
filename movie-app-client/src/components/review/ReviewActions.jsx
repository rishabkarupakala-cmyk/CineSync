import { motion } from "framer-motion";
import {
  FaHeart,
  FaRegHeart,
  FaRegCommentDots,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";
import { HiHandThumbUp } from "react-icons/hi2";
import { useState } from "react";

export default function ReviewActions({ onReply }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [helpful, setHelpful] = useState(false);

  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-700 pt-4">
      <div className="flex items-center gap-3">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setLiked(!liked)}
          className={`flex items-center gap-2 rounded-full px-4 py-2 transition ${
            liked
              ? "bg-red-500/15 text-red-400"
              : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
          }`}
        >
          {liked ? <FaHeart /> : <FaRegHeart />}
          <span>Like</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setHelpful(!helpful)}
          className={`flex items-center gap-2 rounded-full px-4 py-2 transition ${
            helpful
              ? "bg-cyan-500/15 text-cyan-400"
              : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
          }`}
        >
          <HiHandThumbUp />
          <span>Helpful</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onReply}
          className="flex items-center gap-2 rounded-full bg-slate-800 px-4 py-2 text-slate-400 transition hover:bg-slate-700 hover:text-white"
        >
          <FaRegCommentDots />
          <span>Reply</span>
        </motion.button>
      </div>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setSaved(!saved)}
        className={`rounded-full p-3 transition ${
          saved
            ? "bg-yellow-500/15 text-yellow-400"
            : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
        }`}
      >
        {saved ? <FaBookmark /> : <FaRegBookmark />}
      </motion.button>
    </div>
  );
}