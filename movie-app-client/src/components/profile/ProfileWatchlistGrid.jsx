import ProfileWatchlistCard from "./ProfileWatchlistCard";

function ProfileWatchlistGrid({ watchlist }) {
  if (!watchlist?.length) {
    return (
      <div className="rounded-3xl border border-dashed border-white/10 p-12 text-center">
        <h2 className="text-2xl font-bold">
          Watchlist Empty
        </h2>

        <p className="mt-3 text-slate-400">
          Save movies to your watchlist.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {watchlist.map((movie) => (
        <ProfileWatchlistCard
          key={movie.id}
          movie={movie}
        />
      ))}
    </div>
  );
}

export default ProfileWatchlistGrid;