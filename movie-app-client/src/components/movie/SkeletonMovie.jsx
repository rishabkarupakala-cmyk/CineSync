export default function SkeletonMovie() {
  return (
    <div className="animate-pulse">

      {/* Hero */}
      <div className="h-[80vh] bg-zinc-900" />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="h-10 w-2/3 rounded bg-zinc-800 mb-6" />

        <div className="space-y-3 mb-12">
          <div className="h-4 rounded bg-zinc-800" />
          <div className="h-4 rounded bg-zinc-800 w-5/6" />
          <div className="h-4 rounded bg-zinc-800 w-3/4" />
        </div>

        <div className="grid md:grid-cols-3 gap-5">

          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="rounded-xl bg-zinc-900 h-32"
            />
          ))}

        </div>

      </div>
    </div>
  );
}