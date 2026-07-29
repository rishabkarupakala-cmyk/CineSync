import { useRef, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";
import MovieCard from "./MovieCard";

const SECTION_SUBTITLES = {
  "🔥 Trending": "The hottest movies everyone is watching",
  "⭐ Top Rated": "The highest-rated movies of all time",
  "❤️ Popular": "Movies loved by audiences worldwide",
  "🚀 Coming Soon": "Upcoming releases you won't want to miss",
  "🎬 Action": "Explosive action and adventure",
  "😂 Comedy": "Laugh-out-loud favorites",
  "👻 Horror": "Spine-chilling horror picks",
  "💕 Romance": "Heartwarming love stories",
  "🚀 Sci-Fi": "Explore futuristic worlds",
  "🎨 Animation": "Animated movies for everyone",
};

function MovieCarousel({ title, movies = [] }) {
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    if (!carouselRef.current) return;

    carouselRef.current.scrollBy({
      left: direction === "left" ? -1000 : 1000,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const slider = carouselRef.current;
    if (!slider) return;

    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        slider.scrollLeft += e.deltaY;
      }
    };

    slider.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      slider.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    const slider = carouselRef.current;
    if (!slider) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const down = (e) => {
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      slider.style.cursor = "grabbing";
    };

    const leave = () => {
      isDown = false;
      slider.style.cursor = "grab";
    };

    const up = () => {
      isDown = false;
      slider.style.cursor = "grab";
    };

    const move = (e) => {
      if (!isDown) return;

      e.preventDefault();

      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.8;

      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener("mousedown", down);
    slider.addEventListener("mouseleave", leave);
    slider.addEventListener("mouseup", up);
    slider.addEventListener("mousemove", move);

    return () => {
      slider.removeEventListener("mousedown", down);
      slider.removeEventListener("mouseleave", leave);
      slider.removeEventListener("mouseup", up);
      slider.removeEventListener("mousemove", move);
    };
  }, []);

  if (!movies.length) return null;

  return (
    <section className="relative">
      {/* Header */}
      <div className="flex items-end justify-between mb-5">
        <div>
          <motion.h2
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white"
          >
            {title}
          </motion.h2>

          <p className="mt-1 text-sm text-slate-400">
            {SECTION_SUBTITLES[title] ||
              "Discover your next favorite movie"}
          </p>
        </div>

        <div className="hidden md:flex gap-3">
          <button
            onClick={() => scroll("left")}
            className="w-11 h-11 rounded-full border border-white/10 bg-slate-900/70 backdrop-blur-xl flex items-center justify-center text-white hover:bg-blue-600 transition-all duration-300"
          >
            <FaChevronLeft />
          </button>

          <button
            onClick={() => scroll("right")}
            className="w-11 h-11 rounded-full border border-white/10 bg-slate-900/70 backdrop-blur-xl flex items-center justify-center text-white hover:bg-blue-600 transition-all duration-300"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/5 mb-7" />

      {/* Left Fade */}
      <div className="absolute left-0 top-24 bottom-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />

      {/* Right Fade */}
      <div className="absolute right-0 top-24 bottom-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

      {/* Movie List */}
      <div
        ref={carouselRef}
        className="flex gap-7 overflow-x-auto scroll-smooth scrollbar-hide cursor-grab pb-5"
      >
        {movies.map((movie, index) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.04,
              duration: 0.4,
            }}
            className="flex-shrink-0 w-[260px]"
          >
            <MovieCard movie={movie} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default MovieCarousel;