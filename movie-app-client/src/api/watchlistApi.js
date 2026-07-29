import API from "./authApi";

export const getWatchlist = async () => {
  const { data } = await API.get("/watchlist");
  return data;
};

export const addMovie = async (movie) => {
  const { data } = await API.post("/watchlist", movie);
  return data;
};

export const updateMovie = async (id, updates) => {
  const { data } = await API.put(`/watchlist/${id}`, updates);
  return data;
};

export const deleteMovie = async (id) => {
  const { data } = await API.delete(`/watchlist/${id}`);
  return data;
};