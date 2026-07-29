import { motion } from "framer-motion";
import { FaPlay, FaHeart, FaStar } from "react-icons/fa";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";
const POSTER_BASE = "https://image.tmdb.org/t/p/w500";

export default function MovieHero({
    movie,
    onTrailer,
    onWatchlist,
    isInWatchlist,
}) {
    if (!movie) return null;

    return (
        <section className="relative h-[80vh] w-full overflow-hidden">

            {/* Backdrop */}
            <img
                src={`${IMAGE_BASE}${movie.backdrop_path}`}
                alt={movie.title}
                className="absolute inset-0 h-full w-full object-cover scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />

            {/* Content */}
            <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end gap-10 px-6 pb-14">

                {/* Poster */}
                <motion.img
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: .6 }}
                    src={`${POSTER_BASE}${movie.poster_path}`}
                    alt={movie.title}
                    className="hidden md:block w-72 rounded-3xl shadow-2xl"
                />

                {/* Text */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: .2 }}
                    className="max-w-3xl"
                >

                    <p className="text-red-500 font-semibold uppercase tracking-[0.3em] mb-3">
                        Featured Movie
                    </p>

                    <h1 className="text-5xl md:text-7xl font-black leading-tight text-white">
                        {movie.title}
                    </h1>

                    {movie.tagline && (
                        <p className="italic text-zinc-300 mt-3 text-lg">
                            "{movie.tagline}"
                        </p>
                    )}

                    {/* Stats */}
                    <div className="flex flex-wrap gap-4 mt-6 text-zinc-300">

                        <span className="flex items-center gap-2">
                            <FaStar className="text-yellow-400" />
                            {movie.vote_average?.toFixed(1)}
                        </span>

                        <span>
                            {movie.release_date?.split("-")[0]}
                        </span>

                        <span>
                            {movie.runtime} min
                        </span>

                    </div>

                    {/* Genres */}
                    <div className="flex flex-wrap gap-3 mt-6">

                        {movie.genres?.map((genre) => (
                            <span
                                key={genre.id}
                                className="rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md"
                            >
                                {genre.name}
                            </span>
                        ))}

                    </div>

                    {/* Buttons */}
                    <div className="mt-8 flex flex-wrap gap-4">

                        <button
                            onClick={onTrailer}
                            className="flex items-center gap-2 rounded-full bg-red-600 px-7 py-3 font-semibold text-white transition hover:bg-red-700"
                        >
                            <FaPlay />
                            Watch Trailer
                        </button>

                        <button
                            onClick={onWatchlist}
                            className={`flex items-center gap-2 rounded-full border px-7 py-3 font-semibold transition ${
                                isInWatchlist
                                    ? "border-red-500 bg-red-500 text-white"
                                    : "border-white text-white hover:bg-white hover:text-black"
                            }`}
                        >
                            <FaHeart />
                            {isInWatchlist
                                ? "In Watchlist"
                                : "Add to Watchlist"}
                        </button>

                    </div>

                </motion.div>

            </div>

        </section>
    );
}