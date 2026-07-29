const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const BASE_URL = "https://api.themoviedb.org/3";

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json",
};

async function fetchFromTMDB(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers,
  });

  if (!response.ok) {
    throw new Error(`TMDB Error: ${response.status}`);
  }

  return response.json();
}

// ==============================
// Search Movies
// ==============================

export async function searchMovies(query) {
  const data = await fetchFromTMDB(
    `/search/movie?query=${encodeURIComponent(query)}`
  );

  return data.results;
}

// ==============================
// Movie Details
// ==============================

export async function getMovieDetails(id) {
  return await fetchFromTMDB(
    `/movie/${id}?append_to_response=credits,videos,recommendations`
  );
}

// ==============================
// Movie Trailer
// ==============================

export async function getMovieTrailer(movieId) {
  const data = await fetchFromTMDB(
    `/movie/${movieId}/videos?language=en-US`
  );

  const trailer =
    data.results.find(
      (video) =>
        video.site === "YouTube" &&
        video.type === "Trailer"
    ) ||
    data.results.find(
      (video) =>
        video.site === "YouTube" &&
        video.type === "Teaser"
    ) ||
    data.results.find(
      (video) => video.site === "YouTube"
    );

  return trailer?.key ?? null;
}

// ==============================
// Hover Preview Data
// ==============================

export async function getPreviewData(movieId) {
  const movie = await fetchFromTMDB(
    `/movie/${movieId}?append_to_response=videos`
  );

  const trailer =
    movie.videos.results.find(
      (video) =>
        video.site === "YouTube" &&
        video.type === "Trailer"
    ) ||
    movie.videos.results.find(
      (video) =>
        video.site === "YouTube" &&
        video.type === "Teaser"
    ) ||
    movie.videos.results.find(
      (video) => video.site === "YouTube"
    );

  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    runtime: movie.runtime,
    genres: movie.genres,
    rating: movie.vote_average,
    voteCount: movie.vote_count,
    releaseDate: movie.release_date,
    backdrop: movie.backdrop_path,
    poster: movie.poster_path,
    trailerKey: trailer?.key ?? null,
  };
}