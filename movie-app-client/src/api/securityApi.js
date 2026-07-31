const BASE_URL = "http://localhost:5001/api/security";

const getToken = () => localStorage.getItem("token");

export const setupTwoFactor = async () => {
  const res = await fetch(`${BASE_URL}/2fa/setup`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const verifyTwoFactor = async (token) => {
  const res = await fetch(`${BASE_URL}/2fa/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      token,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const disableTwoFactor = async () => {
  const res = await fetch(`${BASE_URL}/2fa/disable`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
};