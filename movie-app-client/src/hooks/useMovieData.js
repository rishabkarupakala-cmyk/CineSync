import { useEffect, useState } from "react";
import { getPreviewData } from "../api/tmdbApi";
import {
  getMovieCache,
  setMovieCache,
} from "../utils/movieCache";

export default function useMovieData(movieId, enabled = true) {
  const [movie, setMovie] = useState(() =>
    getMovieCache(movieId)
  );

  const [loading, setLoading] = useState(
    enabled && !getMovieCache(movieId)
  );

  useEffect(() => {
    if (!enabled || !movieId) return;

    let mounted = true;

    async function load() {
      const cached = getMovieCache(movieId);

      if (cached) {
        setMovie(cached);
        setLoading(false);
        return;
      }

      try {
        const data = await getPreviewData(movieId);

        setMovieCache(movieId, data);

        if (mounted) {
          setMovie(data);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [movieId, enabled]);

  return {
    movie,
    loading,
  };
}