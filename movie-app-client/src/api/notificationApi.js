const BASE_URL = "http://localhost:5001/api/notifications";

const getToken = () => localStorage.getItem("token");

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

export const getNotifications = async () => {
  const res = await fetch(BASE_URL, {
    headers: getHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch notifications");
  }

  return res.json();
};

export const getUnreadCount = async () => {
  const res = await fetch(`${BASE_URL}/unread-count`, {
    headers: getHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch unread count");
  }

  return res.json();
};

export const markAsRead = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}/read`, {
    method: "PATCH",
    headers: getHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to mark notification as read");
  }

  return res.json();
};

export const markAllAsRead = async () => {
  const res = await fetch(`${BASE_URL}/read-all`, {
    method: "PATCH",
    headers: getHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to mark all notifications as read");
  }

  return res.json();
};

export const deleteNotification = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to delete notification");
  }

  return res.json();
};