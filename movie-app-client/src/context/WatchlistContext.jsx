import { createContext, useContext, useEffect, useState } from "react";
import {
  getWatchlist,
  addMovie,
  deleteMovie,
} from "../api/watchlistApi";
import { useAuth } from "./AuthContext";

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  const { isAuthenticated } = useAuth();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const refreshWatchlist = async () => {
    if (!isAuthenticated) {
      setMovies([]);
      return;
    }

    try {
      setLoading(true);

      const data = await getWatchlist();

      setMovies(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshWatchlist();
  }, [isAuthenticated]);

  const addToWatchlist = async (movie) => {
    const savedMovie = await addMovie(movie);

    setMovies((prev) => [savedMovie, ...prev]);

    return savedMovie;
  };

  const removeFromWatchlist = async (id) => {
    await deleteMovie(id);

    setMovies((prev) =>
      prev.filter((movie) => movie.id !== id)
    );
  };

  const isMovieSaved = (tmdbId) => {
    return movies.some(
      (movie) => movie.tmdbId === tmdbId
    );
  };

  const getSavedMovie = (tmdbId) => {
    return movies.find(
      (movie) => movie.tmdbId === tmdbId
    );
  };

  return (
    <WatchlistContext.Provider
      value={{
        movies,
        loading,
        refreshWatchlist,
        addToWatchlist,
        removeFromWatchlist,
        isMovieSaved,
        getSavedMovie,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export const useWatchlist = () => useContext(WatchlistContext);