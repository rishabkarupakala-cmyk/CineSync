import { NavLink, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaXmark,
  FaCircleUser,
} from "react-icons/fa6";
import navLinks from "./NavLinks";

function MobileMenu({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 30,
            }}
            className="
              fixed
              top-0
              right-0
              h-screen
              w-[320px]
              bg-slate-950/95
              backdrop-blur-2xl
              border-l
              border-white/10
              shadow-2xl
              z-50
              flex
              flex-col
            "
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <FaCircleUser className="text-4xl text-blue-400" />

                <div>
                  <h2 className="text-white font-semibold">
                    Guest
                  </h2>

                  <p className="text-xs text-slate-400">
                    Login to sync movies
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="
                  h-10
                  w-10
                  rounded-xl
                  bg-white/5
                  hover:bg-white/10
                  transition
                  flex
                  items-center
                  justify-center
                "
              >
                <FaXmark size={20} />
              </button>
            </div>

            {/* Navigation */}
            <div className="flex-1 px-4 py-6">
              <div className="space-y-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;

                  return (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      onClick={onClose}
                    >
                      {({ isActive }) => (
                        <motion.div
                          whileTap={{ scale: 0.98 }}
                          className={`
                            flex
                            items-center
                            gap-4
                            rounded-2xl
                            px-4
                            py-4
                            transition-all
                            duration-300
                            ${
                              isActive
                                ? "bg-gradient-to-r from-blue-600/30 to-cyan-500/20 border border-blue-400/20 text-white"
                                : "text-slate-300 hover:bg-white/5"
                            }
                          `}
                        >
                          <Icon className="text-lg" />

                          <span className="font-medium">
                            {link.name}
                          </span>
                        </motion.div>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-white/10 p-5">
              <Link
                to="/login"
                onClick={onClose}
              >
                <button
                  className="
                    w-full
                    rounded-2xl
                    bg-gradient-to-r
                    from-blue-600
                    to-cyan-500
                    py-3.5
                    font-semibold
                    text-white
                    hover:opacity-90
                    transition
                  "
                >
                  Login
                </button>
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default MobileMenu;