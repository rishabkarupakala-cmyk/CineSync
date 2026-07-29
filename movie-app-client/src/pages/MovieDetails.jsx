import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaPlay,
  FaHeart,
  FaClock,
  FaCalendarAlt,
  FaStar,
  FaGlobe,
  FaExternalLinkAlt,
  FaShareAlt,
} from "react-icons/fa";

import MovieCarousel from "../components/MovieCarousel";
import { getMovieDetails } from "../api/tmdbApi";
import { useTrailer } from "../context/TrailerContext";
import { useWatchlist } from "../context/WatchlistContext";
import { useAuth } from "../context/AuthContext";
import { WATCHLIST_STATUS } from "../constants/watchlistStatus";
import toast from "react-hot-toast";

import ReviewForm from "../components/review/ReviewForm";
import ReviewList from "../components/review/ReviewList";
const BACKDROP = "https://image.tmdb.org/t/p/original";
const POSTER = "https://image.tmdb.org/t/p/w500";

function formatMoney(amount) {
  if (!amount || amount === 0) return "—";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function MovieDetails() {
  const { id } = useParams();
  const [reviewRefresh, setReviewRefresh] = useState(0);

function handleReviewSubmitted() {
  setReviewRefresh((prev) => prev + 1);
}

  const [movie, setMovie] = useState(null);
  const [loadingPage, setLoadingPage] = useState(true);

  const { openTrailer, loading } = useTrailer();

  const {
    addToWatchlist,
    removeFromWatchlist,
    isMovieSaved,
    getSavedMovie,
  } = useWatchlist();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    loadMovie();
  }, [id]);

  async function loadMovie() {
    try {
      setLoadingPage(true);

      const data = await getMovieDetails(id);

      setMovie(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingPage(false);
    }
  }

  if (loadingPage || !movie) {
    return (
      <div className="min-h-screen bg-slate-950 animate-pulse">

        <div className="relative h-[80vh] bg-slate-900 overflow-hidden">

          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950" />

        </div>

        <div className="max-w-7xl mx-auto px-6 -mt-40 relative z-20">

          <div className="flex flex-col lg:flex-row gap-10">

            <div className="w-72 h-[430px] rounded-3xl bg-slate-800 shadow-2xl" />

            <div className="flex-1 pt-24">

              <div className="h-12 w-80 rounded-xl bg-slate-800 mb-6" />

              <div className="h-6 w-64 rounded-xl bg-slate-800 mb-10" />

              <div className="space-y-4 mb-10">

                <div className="h-5 bg-slate-800 rounded" />

                <div className="h-5 bg-slate-800 rounded w-11/12" />

                <div className="h-5 bg-slate-800 rounded w-10/12" />

                <div className="h-5 bg-slate-800 rounded w-8/12" />

              </div>

              <div className="flex gap-4">

                <div className="h-14 w-48 rounded-xl bg-slate-800" />

                <div className="h-14 w-48 rounded-xl bg-slate-800" />

              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">

                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-2xl bg-slate-900 h-32"
                  />
                ))}

              </div>

            </div>

          </div>

        </div>

      </div>
    );
  }

  const trailer = movie.videos?.results?.find(
    (video) =>
      video.site === "YouTube" &&
      (video.type === "Trailer" || video.type === "Teaser")
  );

  const saved = isMovieSaved(movie.id);

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
    <motion.div
      className="min-h-screen bg-slate-950 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[700px] overflow-hidden">

        <motion.img
          src={`${BACKDROP}${movie.backdrop_path}`}
          alt={movie.title}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 8,
            ease: "easeOut",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />

      </section>

      <div className="relative z-20 max-w-7xl mx-auto px-6 -mt-52">

        <div className="flex flex-col lg:flex-row gap-12">

          {/* Poster */}

          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: .15 }}
            className="relative shrink-0"
          >

            <motion.img
              whileHover={{
                scale: 1.04,
                rotate: -1,
              }}
              transition={{ duration: .3 }}
              src={`${POSTER}${movie.poster_path}`}
              alt={movie.title}
              className="
                w-72
                rounded-3xl
                shadow-[0_30px_80px_rgba(0,0,0,.65)]
                border
                border-white/10
              "
            />

            <div
              className="
                absolute
                -inset-3
                -z-10
                rounded-[30px]
                bg-cyan-500/10
                blur-3xl
              "
            />

          </motion.div>

          {/* Movie Details */}

          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: .25 }}
            className="flex-1 lg:pt-40"
          >

            <p className="uppercase tracking-[0.3em] text-cyan-400 text-sm mb-4">
              Featured Movie
            </p>

            <h1 className="text-5xl lg:text-6xl font-black">
              {movie.title}
            </h1>

            {movie.tagline && (
              <p className="mt-4 italic text-cyan-300 text-xl">
                "{movie.tagline}"
              </p>
            )}

            {/* Stats */}

            <div className="flex flex-wrap gap-5 mt-8">

              <div className="rounded-full bg-white/10 backdrop-blur-xl border border-white/10 px-5 py-2 flex items-center gap-2">
                <FaStar className="text-yellow-400" />
                {movie.vote_average.toFixed(1)}
              </div>

              <div className="rounded-full bg-white/10 backdrop-blur-xl border border-white/10 px-5 py-2 flex items-center gap-2">
                <FaCalendarAlt />
                {movie.release_date?.slice(0, 4)}
              </div>

              <div className="rounded-full bg-white/10 backdrop-blur-xl border border-white/10 px-5 py-2 flex items-center gap-2">
                <FaClock />
                {movie.runtime} min
              </div>

              <div className="rounded-full bg-white/10 backdrop-blur-xl border border-white/10 px-5 py-2 flex items-center gap-2">
                <FaGlobe />
                {movie.original_language?.toUpperCase()}
              </div>

            </div>

            {/* Genres */}

            <div className="flex flex-wrap gap-3 mt-8">

              {movie.genres?.map((genre) => (

                <motion.span
                  key={genre.id}
                  whileHover={{
                    scale: 1.08,
                  }}
                  className="
                    rounded-full
                    bg-white/10
                    border
                    border-white/10
                    backdrop-blur-xl
                    px-4
                    py-2
                    text-sm
                    cursor-default
                  "
                >
                  {genre.name}
                </motion.span>

              ))}

            </div>

            {/* Overview */}

            <div className="mt-10">

              <h2 className="text-2xl font-bold mb-4">
                Overview
              </h2>

              <p className="text-slate-300 text-lg leading-8 max-w-4xl">
                {movie.overview}
              </p>

            </div>

            {/* Buttons */}

            <div className="mt-10 flex flex-wrap gap-4">

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: .97 }}
                disabled={loading}
                onClick={() => trailer && openTrailer(movie.id)}
                className="
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  bg-white
                  px-7
                  py-4
                  text-black
                  font-semibold
                "
              >
                <FaPlay />

                {loading ? "Loading..." : "Watch Trailer"}

              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: .97 }}
                onClick={toggleWatchlist}
                className={`flex items-center gap-3 rounded-xl px-7 py-4 border transition ${
                  saved
                    ? "bg-red-500 border-red-500 text-white"
                    : "border-white/10 bg-white/10 backdrop-blur-xl"
                }`}
              >
                <FaHeart />
                {saved ? "In Watchlist" : "Add to Watchlist"}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: .97 }}
                className="
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-white/10
                  bg-white/10
                  backdrop-blur-xl
                  px-7
                  py-4
                "
              >
                <FaShareAlt />
                Share
              </motion.button>

            </div>

            {/* Info Cards */}

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">

              <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                <p className="text-slate-400 text-sm">Status</p>
                <p className="mt-2 font-semibold">{movie.status}</p>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                <p className="text-slate-400 text-sm">Budget</p>
                <p className="mt-2 font-semibold">
                  {formatMoney(movie.budget)}
                </p>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                <p className="text-slate-400 text-sm">Revenue</p>
                <p className="mt-2 font-semibold">
                  {formatMoney(movie.revenue)}
                </p>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                <p className="text-slate-400 text-sm">Vote Count</p>
                <p className="mt-2 font-semibold">
                  {movie.vote_count?.toLocaleString()}
                </p>
              </div>

            </div>

            {movie.homepage && (
              <a
                href={movie.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  items-center
                  gap-2
                  mt-8
                  rounded-xl
                  bg-cyan-500
                  px-6
                  py-3
                  font-semibold
                  text-black
                  hover:bg-cyan-400
                  transition
                "
              >
                <FaExternalLinkAlt />
                Official Website
              </a>
            )}
                        {/* Production Companies */}

            {movie.production_companies?.length > 0 && (
              <div className="mt-12">

                <h2 className="text-2xl font-bold mb-5">
                  Production Companies
                </h2>

                <div className="flex flex-wrap gap-3">

                  {movie.production_companies.map((company) => (

                    <span
                      key={company.id}
                      className="
                        rounded-full
                        border
                        border-white/10
                        bg-white/10
                        backdrop-blur-xl
                        px-4
                        py-2
                        text-sm
                      "
                    >
                      {company.name}
                    </span>

                  ))}

                </div>

              </div>
            )}

          </motion.div>

        </div>
        <div className="mt-20">
  <ReviewForm
    movie={movie}
    onReviewSubmitted={handleReviewSubmitted}
  />

  <ReviewList
    tmdbId={id}
    refreshKey={reviewRefresh}
  />
</div>

        {/* Top Cast */}

        {movie.credits?.cast?.length > 0 && (

          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .5 }}
            className="mt-24"
          >

            <h2 className="text-3xl font-bold mb-8">
              Top Cast
            </h2>

            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">

              {movie.credits.cast
                .slice(0, 12)
                .map((actor) => (

                  <motion.div
                    key={actor.id}
                    whileHover={{
                      y: -10,
                      scale: 1.05,
                    }}
                    transition={{ duration: .25 }}
                    className="
                      min-w-[170px]
                      rounded-2xl
                      overflow-hidden
                      bg-white/5
                      border
                      border-white/10
                      backdrop-blur-xl
                    "
                  >

                    <img
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                          : "https://placehold.co/300x450?text=No+Image"
                      }
                      alt={actor.name}
                      className="h-64 w-full object-cover"
                    />

                    <div className="p-4">

                      <h3 className="font-semibold line-clamp-1">
                        {actor.name}
                      </h3>

                      <p className="mt-2 text-sm text-slate-400 line-clamp-2">
                        {actor.character}
                      </p>

                    </div>

                  </motion.div>

                ))}

            </div>

          </motion.section>

        )}

        {/* Recommendations */}

        {movie.recommendations?.results?.length > 0 && (

          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .5 }}
            className="mt-24 pb-24"
          >

            <MovieCarousel
              title="🎬 You May Also Like"
              movies={movie.recommendations.results.slice(0, 15)}
            />

          </motion.section>

        )}

      </div>

      {/* Background Glow */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [.25, .4, .25],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
          }}
          className="
            absolute
            top-0
            left-1/2
            h-[650px]
            w-[650px]
            -translate-x-1/2
            rounded-full
            bg-cyan-500/10
            blur-[180px]
          "
        />

        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [.18, .3, .18],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
          }}
          className="
            absolute
            bottom-0
            right-0
            h-[500px]
            w-[500px]
            rounded-full
            bg-blue-600/10
            blur-[170px]
          "
        />

      </div>

    </motion.div>
  );
}

export default MovieDetails;