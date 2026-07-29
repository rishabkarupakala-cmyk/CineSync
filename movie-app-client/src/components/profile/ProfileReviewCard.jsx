import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStar, FaCalendarAlt, FaArrowRight } from "react-icons/fa";

const POSTER = "https://image.tmdb.org/t/p/w500";

function ProfileReviewCard({ review }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
      "
    >
     <img
  src={
    review.poster
      ? `${POSTER}${review.poster}`
      : "https://placehold.co/500x750?text=No+Poster"
  }
  alt={review.title || "Movie"}
  className="h-72 w-full object-cover"
/>

      <div className="p-5">
        <h3 className="line-clamp-1 text-xl font-bold">
          {review.title}
        </h3>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-yellow-400">
            <FaStar />
            <span className="font-semibold">
              {review.rating}/10
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-400">
            <FaCalendarAlt />
            {new Date(review.createdAt).toLocaleDateString()}
          </div>
        </div>

        <p className="mt-5 line-clamp-4 text-slate-300">
          {review.review}
        </p>

        {review.spoiler && (
          <span className="mt-4 inline-block rounded-full bg-red-500/20 px-3 py-1 text-xs font-medium text-red-400">
            Spoiler
          </span>
        )}

        <Link
          to={`/movie/${review.tmdbId}`}
          className="
            mt-6
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-cyan-500
            px-5
            py-3
            font-semibold
            text-black
            transition
            hover:bg-cyan-400
          "
        >
          View Movie
          <FaArrowRight />
        </Link>
      </div>
    </motion.div>
  );
}

export default ProfileReviewCard;