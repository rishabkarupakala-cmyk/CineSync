import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import { searchMovies } from "../api/tmdbApi";
import { getTrendingMovies } from "../api/homeApi";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load trending movies when page opens
  useEffect(() => {
    loadTrending();
  }, []);

  async function loadTrending() {
    try {
      const movies = await getTrendingMovies();
      setTrending(movies);
    } catch (err) {
      console.error(err);
    }
  }

  // Live search with debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.trim()) {
        fetchMovies();
      } else {
        setResults([]);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  async function fetchMovies() {
    setLoading(true);

    try {
      const movies = await searchMovies(query);
      setResults(movies);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">

      <h1 className="text-5xl font-bold mb-8">
        Search Movies
      </h1>

      <SearchBar
        query={query}
        setQuery={setQuery}
      />

      {query.trim() === "" ? (
        <>
          <h2 className="text-3xl font-bold mt-12 mb-6">
            🔥 Trending This Week
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {trending.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          {loading && (
            <p className="text-gray-400 mt-8 text-lg">
              Searching...
            </p>
          )}

          {!loading && results.length === 0 && (
            <p className="text-red-400 mt-8 text-lg">
              No movies found.
            </p>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-10">
            {results.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Search;