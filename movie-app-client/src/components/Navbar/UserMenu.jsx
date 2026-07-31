import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaCircleUser,
  FaUser,
  FaHeart,
  FaGear,
  FaArrowRightFromBracket,
  FaBell,
  FaChevronDown,
} from "react-icons/fa6";

import { useAuth } from "../../context/AuthContext";
import { getUnreadCount } from "../../api/notificationApi";

function UserMenu() {
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const menuRef = useRef(null);
  const navigate = useNavigate();

  const { user, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    const loadUnread = async () => {
      try {
        const data = await getUnreadCount();
        setUnreadCount(data.unread);
      } catch (err) {
        console.error(err);
      }
    };

    loadUnread();

    const interval = setInterval(loadUnread, 30000);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/login");
  };

  const menuItems = [
    {
      icon: <FaUser />,
      label: "Profile",
      to: "/profile",
    },
    {
      icon: <FaHeart />,
      label: "Watchlist",
      to: "/watchlist",
    },
    {
      icon: <FaGear />,
      label: "Settings",
      to: "/settings",
    },
  ];

  return (
    <div
      ref={menuRef}
      className="relative hidden lg:flex items-center"
    >
      <button
        onClick={() => navigate("/notifications")}
        className="
          relative
          mr-3
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-2xl
          border
          border-white/10
          bg-white/5
          text-slate-300
          transition-all
          duration-300
          hover:bg-white/10
          hover:text-white
        "
      >
        <FaBell />

        {unreadCount > 0 && (
          <span
            className="
              absolute
              -right-1
              -top-1
              flex
              h-5
              min-w-[20px]
              items-center
              justify-center
              rounded-full
              bg-red-500
              px-1
              text-[10px]
              font-bold
              text-white
              ring-2
              ring-slate-950
            "
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.03 }}
        onClick={() => setOpen((prev) => !prev)}
        className="
          flex
          items-center
          gap-3
          rounded-2xl
          border
          border-white/10
          bg-white/5
          px-3
          py-2
          backdrop-blur-xl
          transition-all
          duration-300
          hover:bg-white/10
        "
      >
        <FaCircleUser className="text-3xl text-blue-400" />

        <div className="text-left">
          <p className="text-sm font-semibold text-white">
            {isAuthenticated ? user.username : "Guest"}
          </p>

          <p className="text-xs text-slate-400">
            {isAuthenticated ? user.email : "Sign In"}
          </p>
        </div>

        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FaChevronDown className="text-slate-400" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="
              absolute
              right-0
              top-16
              w-72
              overflow-hidden
              rounded-3xl
              border
              border-white/10
              bg-slate-900/95
              backdrop-blur-2xl
              shadow-2xl
            "
          >
            <div className="border-b border-white/10 p-5">
              <div className="flex items-center gap-4">
                <FaCircleUser className="text-5xl text-blue-400" />

                <div>
                  <h3 className="font-bold text-white">
                    {isAuthenticated ? user.username : "Guest User"}
                  </h3>

                  <p className="text-sm text-slate-400">
                    {isAuthenticated
                      ? user.email
                      : "Login to sync your movies"}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3">
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="mb-3 flex items-center justify-center rounded-2xl bg-blue-600 px-4 py-3 font-semibold text-white transition-all hover:bg-blue-700"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center rounded-2xl border border-white/10 px-4 py-3 text-slate-300 transition-all hover:bg-white/10"
                  >
                    Create Account
                  </Link>
                </>
              ) : (
                <>
                  {menuItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="mb-1 flex items-center gap-4 rounded-2xl px-4 py-3 text-slate-300 transition-all duration-300 hover:bg-white/10 hover:text-white"
                    >
                      <span className="text-lg">{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}

                  <div className="my-3 border-t border-white/10" />

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-red-400 transition-all duration-300 hover:bg-red-500/10"
                  >
                    <FaArrowRightFromBracket />
                    Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default UserMenu;