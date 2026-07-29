import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBars, FaFilm } from "react-icons/fa6";

import DesktopNav from "./DesktopNav";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.45,
          ease: "easeOut",
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-slate-950/80 backdrop-blur-2xl border-b border-white/10 shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
          <div className="h-20 flex items-center justify-between">

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 shrink-0"
            >
              <motion.div
                whileHover={{
                  rotate: 12,
                  scale: 1.08,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="
                  h-12
                  w-12
                  rounded-2xl
                  bg-gradient-to-br
                  from-blue-600
                  via-cyan-500
                  to-blue-700
                  flex
                  items-center
                  justify-center
                  shadow-lg
                "
              >
                <FaFilm className="text-white text-xl" />
              </motion.div>

              <div>
                <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  CineSync
                </h1>

                <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
                  MOVIE UNIVERSE
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <DesktopNav />

            {/* Right Side */}
            <div className="hidden lg:flex items-center">
              <UserMenu />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="
                lg:hidden
                h-12
                w-12
                rounded-2xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                flex
                items-center
                justify-center
                hover:bg-white/10
                transition-all
                duration-300
              "
            >
              <FaBars size={20} />
            </button>

          </div>
        </div>
      </motion.header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Navbar Spacer */}
      <div className="h-20" />
    </>
  );
}

export default Navbar;