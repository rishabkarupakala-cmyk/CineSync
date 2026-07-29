import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ================= AUTH =================

export const loginUser = async (email, password) => {
  const { data } = await API.post("/auth/login", {
    email,
    password,
  });

  return data;
};

export const registerUser = async ({
  name,
  username,
  email,
  password,
  isPrivate,
}) => {
  const { data } = await API.post("/auth/register", {
    name,
    username,
    email,
    password,
    isPrivate,
  });

  return data;
};

// ================= USER =================

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export default API;