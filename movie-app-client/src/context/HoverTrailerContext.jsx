import { createContext, useContext, useRef, useState } from "react";
import { getMovieTrailer } from "../api/tmdbApi";

const HoverTrailerContext = createContext();

export function HoverTrailerProvider({ children }) {
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  // Cache trailer keys so we don't hit TMDB repeatedly
  const trailerCache = useRef({});

  async function loadTrailer(movieId, rect) {
    try {
      let key = trailerCache.current[movieId];

      if (!key) {
        setLoading(true);

        key = await getMovieTrailer(movieId);

        if (!key) {
          setLoading(false);
          return;
        }

        trailerCache.current[movieId] = key;
      }

      setHoveredMovie({
        movieId,
        key,
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY,
        width: rect.width,
        height: rect.height,
      });
    } catch (err) {
      console.error("Hover trailer error:", err);
    } finally {
      setLoading(false);
    }
  }

  function clearTrailer() {
    setHoveredMovie(null);
  }

  return (
    <HoverTrailerContext.Provider
      value={{
        hoveredMovie,
        loading,
        loadTrailer,
        clearTrailer,
      }}
    >
      {children}
    </HoverTrailerContext.Provider>
  );
}

export function useHoverTrailer() {
  return useContext(HoverTrailerContext);
}