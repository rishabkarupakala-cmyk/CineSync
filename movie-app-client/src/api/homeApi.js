const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const headers = {
  Authorization: `Bearer ${TOKEN}`,
};

async function fetchMovies(endpoint) {
  const response = await fetch(
    `https://api.themoviedb.org/3${endpoint}`,
    {
      headers,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await response.json();
  return data.results;
}

// Trending
export function getTrendingMovies() {
  return fetchMovies("/trending/movie/week");
}

// Popular
export function getPopularMovies() {
  return fetchMovies("/movie/popular");
}

// Top Rated
export function getTopRatedMovies() {
  return fetchMovies("/movie/top_rated");
}

// Upcoming
export function getUpcomingMovies() {
  return fetchMovies("/movie/upcoming");
}

// Movies by Genre
export function getMoviesByGenre(genreId) {
  return fetchMovies(`/discover/movie?with_genres=${genreId}`);
}