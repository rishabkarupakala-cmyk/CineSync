const BASE_URL = 'http://localhost:5001';

export async function searchMovies(query) {
  const response = await fetch(`${BASE_URL}/api/search?q=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data.results || [];
}