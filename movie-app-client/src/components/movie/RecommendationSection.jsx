import MovieCarousel from "../MovieCarousel";

export default function RecommendationSection({
  movies = [],
  loading = false,
}) {
  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-white mb-6">
          Recommended Movies
        </h2>

        <div className="flex gap-4 overflow-hidden">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="w-44 h-64 rounded-xl bg-zinc-800 animate-pulse flex-shrink-0"
            />
          ))}
        </div>
      </section>
    );
  }

  if (!movies.length) return null;

  return (
    <section className="py-12">
      <MovieCarousel
        title="Recommended Movies"
        movies={movies}
      />
    </section>
  );
}