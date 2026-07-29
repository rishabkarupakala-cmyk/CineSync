import API from "./axios";

export const searchUsers = async (query) => {
  const { data } = await API.get("/friends/search", {
    params: { q: query },
  });
  return data;
};

export const followUser = async (id) => {
  const { data } = await API.post(`/friends/follow/${id}`);
  return data;
};

export const unfollowUser = async (id) => {
  const { data } = await API.delete(`/friends/unfollow/${id}`);
  return data;
};

export const getUserProfile = async (id) => {
  const { data } = await API.get(`/friends/profile/${id}`);
  return data;
};

export const getFollowers = async (id) => {
  const { data } = await API.get(`/friends/followers/${id}`);
  return data;
};

export const getFollowing = async (id) => {
  const { data } = await API.get(`/friends/following/${id}`);
  return data;
};

export const getMutuals = async (id) => {
  const { data } = await API.get(`/friends/mutuals/${id}`);
  return data;
};

export const getFollowRequests = async () => {
  const { data } = await API.get("/friends/follow-requests");
  return data;
};

export const acceptFollowRequest = async (requestId) => {
  const { data } = await API.post(
    `/friends/follow-requests/${requestId}/accept`
  );
  return data;
};

export const rejectFollowRequest = async (requestId) => {
  const { data } = await API.post(
    `/friends/follow-requests/${requestId}/reject`
  );
  return data;
};

export const cancelFollowRequest = async (receiverId) => {
  const { data } = await API.delete(
    `/friends/follow-requests/${receiverId}`
  );
  return data;
};