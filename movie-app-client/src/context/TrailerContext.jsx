import { createContext, useContext, useMemo, useState } from "react";
import { getMovieTrailer } from "../api/tmdbApi";
import TrailerModal from "../components/TrailerModal";

const TrailerContext = createContext(null);

export function TrailerProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(false);

  // Cache trailer keys so TMDB is only called once per movie
  const trailerCache = useMemo(() => new Map(), []);

  const openTrailer = async (movieId) => {
    try {
      setLoading(true);

      let key = trailerCache.get(movieId);

      if (!key) {
        key = await getMovieTrailer(movieId);

        if (key) {
          trailerCache.set(movieId, key);
        }
      }

      if (!key) {
        alert("Trailer not available.");
        return;
      }

      setTrailerKey(key);
      setIsOpen(true);
    } catch (err) {
      console.error(err);
      alert("Unable to load trailer.");
    } finally {
      setLoading(false);
    }
  };

  const closeTrailer = () => {
    setIsOpen(false);
    setTrailerKey(null);
  };

  return (
    <TrailerContext.Provider
      value={{
        openTrailer,
        closeTrailer,
        loading,
      }}
    >
      {children}

      <TrailerModal
        isOpen={isOpen}
        trailerKey={trailerKey}
        onClose={closeTrailer}
      />
    </TrailerContext.Provider>
  );
}

export function useTrailer() {
  const context = useContext(TrailerContext);

  if (!context) {
    throw new Error("useTrailer must be used inside TrailerProvider");
  }

  return context;
}