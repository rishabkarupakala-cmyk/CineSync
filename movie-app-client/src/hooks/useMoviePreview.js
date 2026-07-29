import { useEffect, useState } from "react";
import { getPreviewData } from "../api/tmdbApi";
import {
  getMovieCache,
  setMovieCache,
} from "../utils/movieCache";

export default function useMoviePreview(movieId, hovered) {
  const [movie, setMovie] = useState(
    () => getMovieCache(movieId) || null
  );

  const [loading, setLoading] = useState(
    hovered && !getMovieCache(movieId)
  );

  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (!hovered) {
      setShowPreview(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowPreview(true);
    }, 180);

    return () => clearTimeout(timer);
  }, [hovered]);

  useEffect(() => {
    if (!showPreview) return;

    const cached = getMovieCache(movieId);

    if (cached) {
      setMovie(cached);
      setLoading(false);
      return;
    }

    let mounted = true;

    async function load() {
      try {
        setLoading(true);

        const data = await getPreviewData(movieId);

        setMovieCache(movieId, data);

        if (mounted) {
          setMovie(data);
        }
      } catch (err) {
        console.error(err);
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
  }, [movieId, showPreview]);

  return {
    movie,
    loading,
    showPreview,
  };
}