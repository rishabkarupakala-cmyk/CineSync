import { FaCalendarAlt, FaClock, FaStar } from "react-icons/fa";

function MovieInfo({ movie }) {
  if (!movie) return null;

  const year = movie.releaseDate
    ? movie.releaseDate.slice(0, 4)
    : "N/A";

  const rating = movie.rating
    ? movie.rating.toFixed(1)
    : "N/A";

  return (
    <div className="space-y-4 px-5 py-4">
      <h2 className="text-2xl font-bold text-white">
        {movie.title}
      </h2>

      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
        <span className="flex items-center gap-2">
          <FaStar className="text-yellow-400" />
          {rating}
        </span>

        <span className="flex items-center gap-2">
          <FaClock />
          {movie.runtime || "--"} min
        </span>

        <span className="flex items-center gap-2">
          <FaCalendarAlt />
          {year}
        </span>
      </div>

      {movie.genres?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {movie.genres.map((genre) => (
            <span
              key={genre.id}
              className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300"
            >
              {genre.name}
            </span>
          ))}
        </div>
      )}

      <p className="line-clamp-4 text-sm leading-7 text-slate-300">
        {movie.overview || "No overview available."}
      </p>
    </div>
  );
}

export default MovieInfo;