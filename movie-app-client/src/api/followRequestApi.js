const BASE_URL = "http://localhost:5001/api/follow-requests";

const getToken = () => localStorage.getItem("token");

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

export const getPendingRequests = async () => {
  const res = await fetch(`${BASE_URL}/pending`, {
    headers: getHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch pending requests");
  }

  return res.json();
};

export const acceptFollowRequest = async (requestId) => {
  const res = await fetch(`${BASE_URL}/${requestId}/accept`, {
    method: "POST",
    headers: getHeaders(),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to accept follow request");
  }

  return res.json();
};

export const rejectFollowRequest = async (requestId) => {
  const res = await fetch(`${BASE_URL}/${requestId}/reject`, {
    method: "POST",
    headers: getHeaders(),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to reject follow request");
  }

  return res.json();
};