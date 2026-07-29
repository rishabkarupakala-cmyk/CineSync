import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import navLinks from "./NavLinks";

function DesktopNav() {
  return (
    <div className="hidden lg:flex items-center">
      <div
        className="
          flex
          items-center
          gap-2
          rounded-2xl
          border
          border-white/10
          bg-white/[0.04]
          backdrop-blur-xl
          p-2
        "
      >
        {navLinks.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink key={link.path} to={link.path}>
              {({ isActive }) => (
                <motion.div
                  whileHover={{
                    y: -2,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="
                    relative
                    flex
                    items-center
                    gap-2
                    overflow-hidden
                    rounded-xl
                    px-4
                    py-2.5
                    transition-all
                    duration-300
                  "
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active-pill"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 35,
                      }}
                      className="
                        absolute
                        inset-0
                        rounded-xl
                        border
                        border-blue-400/30
                        bg-gradient-to-r
                        from-blue-600/30
                        via-blue-500/20
                        to-cyan-500/20
                        shadow-[0_0_25px_rgba(37,99,235,0.35)]
                      "
                    />
                  )}

                  <span
                    className={`
                      relative z-10 text-sm transition-colors duration-300
                      ${
                        isActive
                          ? "text-blue-300"
                          : "text-slate-400 group-hover:text-white"
                      }
                    `}
                  >
                    <Icon />
                  </span>

                  <span
                    className={`
                      relative z-10 text-sm font-medium transition-colors duration-300
                      ${
                        isActive
                          ? "text-white"
                          : "text-slate-300"
                      }
                    `}
                  >
                    {link.name}
                  </span>
                </motion.div>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default DesktopNav;