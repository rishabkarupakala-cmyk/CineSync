const BASE_URL = "http://localhost:5001/api/follows";

function getToken() {
  return localStorage.getItem("token");
}

export async function getFollowers(username) {
  const res = await fetch(`${BASE_URL}/${username}/followers`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch followers");
  }

  return res.json();
}

export async function getFollowing(username) {
  const res = await fetch(`${BASE_URL}/${username}/following`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch following");
  }

  return res.json();
}