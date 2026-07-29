import { useEffect, useMemo, useState } from "react";
import { getAverageRating, getMovieReviews } from "../../api/reviewApi";
import RatingStars from "./RatingStars";
import ReviewCard from "./ReviewCard";

function ReviewList({ tmdbId, refreshKey }) {
  const [reviews, setReviews] = useState([]);
  const [average, setAverage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    loadReviews();
  }, [tmdbId, refreshKey]);

  async function loadReviews() {
    try {
      setLoading(true);

      const [reviewsData, averageData] = await Promise.all([
        getMovieReviews(tmdbId),
        getAverageRating(tmdbId),
      ]);

      setReviews(reviewsData);
      setAverage(averageData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const distribution = useMemo(() => {
    const counts = {};

    for (let i = 1; i <= 10; i++) {
      counts[i] = 0;
    }

    reviews.forEach((review) => {
      counts[review.rating]++;
    });

    return counts;
  }, [reviews]);

  const sortedReviews = useMemo(() => {
    return [...reviews].sort((a, b) => {
      switch (sortBy) {
        case "highest":
          return b.rating - a.rating;

        case "lowest":
          return a.rating - b.rating;

        case "oldest":
          return (
            new Date(a.createdAt) -
            new Date(b.createdAt)
          );

        default:
          return (
            new Date(b.createdAt) -
            new Date(a.createdAt)
          );
      }
    });
  }, [reviews, sortBy]);

  if (loading) {
    return (
      <div className="mt-12 text-center text-slate-400">
        Loading reviews...
      </div>
    );
  }

  return (
    <section className="mt-16">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h2 className="text-2xl font-bold">
          Community Rating
        </h2>

        <div className="mt-5 flex items-center gap-4">
          <RatingStars
            rating={average?.averageRating || 0}
            readOnly
            allowHalf
          />

          <span className="text-2xl font-bold">
            {(average?.averageRating || 0).toFixed(1)}
          </span>

          <span className="text-slate-400">
            ({average?.totalReviews || 0} reviews)
          </span>
        </div>

        <div className="mt-8 space-y-3">
          {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((star) => {
            const count = distribution[star];
            const percentage =
              reviews.length === 0
                ? 0
                : (count / reviews.length) * 100;

            return (
              <div
                key={star}
                className="flex items-center gap-3"
              >
                <span className="w-8 text-sm font-medium">
                  {star}★
                </span>

                <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-700">
                  <div
                    className="h-full rounded-full bg-yellow-400 transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>

                <span className="w-10 text-right text-sm text-slate-400">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-12 mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold">
          Community Reviews
        </h2>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-xl border border-white/10 bg-slate-900 px-4 py-2 text-white outline-none"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="highest">Highest Rated</option>
          <option value="lowest">Lowest Rated</option>
        </select>
      </div>

      <div className="space-y-6">
        {sortedReviews.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-slate-400">
            <div className="text-5xl mb-4">⭐</div>

            <h3 className="text-xl font-semibold text-white">
              No reviews yet
            </h3>

            <p className="mt-2">
              Be the first person to review this movie.
            </p>
          </div>
        ) : (
          sortedReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default ReviewList;