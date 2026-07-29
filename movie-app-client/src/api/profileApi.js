const BASE_URL = "http://localhost:5001/api/profile";

function getToken() {
  return localStorage.getItem("token");
}

export async function getMyProfile() {
  const res = await fetch(`${BASE_URL}/me`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch profile");

  return res.json();
}

export async function getUserProfile(username) {
  const res = await fetch(`${BASE_URL}/${username}`);

  if (!res.ok) throw new Error("Failed to fetch profile");

  return res.json();
}

export async function updateProfile(data) {
  const res = await fetch(BASE_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update profile");

  return res.json();
}