import { useEffect, useState } from "react";
import HeroCarousel from "../components/HeroCarousel";
import MovieCarousel from "../components/MovieCarousel";
import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getMoviesByGenre,
} from "../api/homeApi";

function Home() {
  const [loading, setLoading] = useState(true);

  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [action, setAction] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [horror, setHorror] = useState([]);
  const [romance, setRomance] = useState([]);
  const [sciFi, setSciFi] = useState([]);
  const [animation, setAnimation] = useState([]);

  useEffect(() => {
    loadHomeData();
  }, []);

  async function loadHomeData() {
    try {
      const [
        trendingMovies,
        popularMovies,
        topRatedMovies,
        upcomingMovies,
        actionMovies,
        comedyMovies,
        horrorMovies,
        romanceMovies,
        sciFiMovies,
        animationMovies,
      ] = await Promise.all([
        getTrendingMovies(),
        getPopularMovies(),
        getTopRatedMovies(),
        getUpcomingMovies(),
        getMoviesByGenre(28), // Action
        getMoviesByGenre(35), // Comedy
        getMoviesByGenre(27), // Horror
        getMoviesByGenre(10749), // Romance
        getMoviesByGenre(878), // Sci-Fi
        getMoviesByGenre(16), // Animation
      ]);

      setTrending(trendingMovies);
      setPopular(popularMovies);
      setTopRated(topRatedMovies);
      setUpcoming(upcomingMovies);
      setAction(actionMovies);
      setComedy(comedyMovies);
      setHorror(horrorMovies);
      setRomance(romanceMovies);
      setSciFi(sciFiMovies);
      setAnimation(animationMovies);
    } catch (err) {
      console.error("Failed to load homepage:", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <h2 className="text-3xl font-semibold text-white animate-pulse">
          Loading CineSync...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Hero Section */}
      <HeroCarousel movies={trending.slice(0, 8)} />

      {/* Main Content */}
      <main className="max-w-[1700px] mx-auto px-6 lg:px-10 xl:px-14 py-12 space-y-10">

        <MovieCarousel
          title="🔥 Trending"
          movies={trending}
        />

        <MovieCarousel
          title="⭐ Top Rated"
          movies={topRated}
        />

        <MovieCarousel
          title="❤️ Popular"
          movies={popular}
        />

        <MovieCarousel
          title="🚀 Coming Soon"
          movies={upcoming}
        />

        <MovieCarousel
          title="🎬 Action"
          movies={action}
        />

        <MovieCarousel
          title="😂 Comedy"
          movies={comedy}
        />

        <MovieCarousel
          title="👻 Horror"
          movies={horror}
        />

        <MovieCarousel
          title="💕 Romance"
          movies={romance}
        />

        <MovieCarousel
          title="🚀 Sci-Fi"
          movies={sciFi}
        />

        <MovieCarousel
          title="🎨 Animation"
          movies={animation}
        />

      </main>

    </div>
  );
}

export default Home;