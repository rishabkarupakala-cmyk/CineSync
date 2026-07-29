import API from "./authApi";


export const upsertReview = async (reviewData) => {
  const { data } = await API.post("/reviews", reviewData);
  return data;
};

export const getMovieReviews = async (tmdbId) => {
  const { data } = await API.get(`/reviews/${tmdbId}`);
  return data;
};

export const getMyReview = async (tmdbId) => {
  const { data } = await API.get(`/reviews/user/${tmdbId}`);
  return data;
};

export const deleteReview = async (tmdbId) => {
  const { data } = await API.delete(`/reviews/${tmdbId}`);
  return data;
};

export const getAverageRating = async (tmdbId) => {
  const { data } = await API.get(`/reviews/average/${tmdbId}`);
  return data;
};



export const addReply = async (reviewId, text) => {
  const { data } = await API.post(
    `/reviews/${reviewId}/replies`,
    { text }
  );

  return data;
};

export const getReplies = async (reviewId) => {
  const { data } = await API.get(
    `/reviews/${reviewId}/replies`
  );

  return data;
};

export const deleteReply = async (replyId) => {
  const { data } = await API.delete(
    `/reviews/replies/${replyId}`
  );

  return data;
};