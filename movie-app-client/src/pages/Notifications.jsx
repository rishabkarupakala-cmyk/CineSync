
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaBell, FaCheckDouble } from "react-icons/fa6";
import { Link } from "react-router-dom";

import {
  getNotifications,
  markAsRead,
  markAllAsRead,
} from "../api/notificationApi";

import {
  acceptFollowRequest,
  rejectFollowRequest,
} from "../api/followRequestApi";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAll = async () => {
    try {
      await markAllAsRead();
      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleAcceptRequest = async (notification) => {
    
  console.log(notification);
    
    try {
      if (!notification.followRequestId) return;

      await acceptFollowRequest(notification.followRequestId);

      setNotifications((prev) =>
        prev.filter((n) => n.id !== notification.id)
      );
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleRejectRequest = async (notification) => {
    try {
      if (!notification.followRequestId) return;

      await rejectFollowRequest(notification.followRequestId);

      setNotifications((prev) =>
        prev.filter((n) => n.id !== notification.id)
      );
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      try {
        await markAsRead(notification.id);

        setNotifications((prev) =>
          prev.map((n) =>
            n.id === notification.id ? { ...n, isRead: true } : n
          )
        );
      } catch (err) {
        console.error(err);
      }
    }
  };

  const formatTime = (date) => {
    const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000);

    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;

    return new Date(date).toLocaleDateString();
  };

  const getMessage = (notification) => {
    switch (notification.type) {
      case "FOLLOW":
        return "started following you";
      case "FOLLOW_REQUEST":
        return "requested to follow you";
      case "LIKE":
        return "liked your review";
      case "REPLY":
        return "replied to your review";
      default:
        return notification.message || "";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        Loading notifications...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-blue-600 p-4">
              <FaBell className="text-2xl text-white" />
            </div>

            <div>
              <h1 className="text-4xl font-black text-white">
                Notifications
              </h1>

              <p className="text-slate-400">
                Stay updated with everything happening.
              </p>
            </div>
          </div>

          <button
            onClick={handleMarkAll}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-700"
          >
            <FaCheckDouble />
            Mark all read
          </button>
        </div>

        <div className="space-y-5">
          {notifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 py-24"
            >
              <FaBell className="mb-6 text-6xl text-slate-600" />
              <h2 className="text-2xl font-bold text-white">
                No Notifications
              </h2>
              <p className="mt-2 text-slate-400">
                You're all caught up.
              </p>
            </motion.div>
          ) : (
            notifications.map((notification) => (
              <motion.div
                key={notification.id}
                whileHover={{ scale: 1.01 }}
                onClick={() => handleNotificationClick(notification)}
                className={`flex cursor-pointer items-start gap-5 rounded-3xl border p-6 transition-all duration-300 ${
                  notification.isRead
                    ? "border-white/10 bg-white/5"
                    : "border-blue-500/40 bg-blue-500/10"
                }`}
              >
                <Link
                  to={`/profile/${notification.sender.id}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {notification.sender.avatar ? (
                    <img
                      src={notification.sender.avatar}
                      alt={notification.sender.username}
                      className="h-14 w-14 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                      {notification.sender.username?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </Link>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/profile/${notification.sender.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="font-bold text-white hover:text-blue-400"
                    >
                      {notification.sender.username}
                    </Link>

                    <span className="text-slate-300">
                      {getMessage(notification)}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-slate-500">
                    {formatTime(notification.createdAt)}
                  </p>

                  {notification.type === "FOLLOW_REQUEST" && (
                    <div className="mt-5 flex gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAcceptRequest(notification);
                        }}
                        className="rounded-xl bg-blue-600 px-5 py-2 font-semibold transition hover:bg-blue-700"
                      >
                        Accept
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRejectRequest(notification);
                        }}
                        className="rounded-xl border border-white/10 px-5 py-2 font-semibold transition hover:bg-white/10"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>

                {!notification.isRead && (
                  <div className="mt-2 h-3 w-3 rounded-full bg-blue-500" />
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Notifications;