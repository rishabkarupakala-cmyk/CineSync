import { useEffect, useState } from "react";
import RatingStars from "./RatingStars";
import {
  getMyReview,
  upsertReview,
  deleteReview,
} from "../../api/reviewApi";
import toast from "react-hot-toast";

function ReviewForm({ movie, onReviewSubmitted }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [spoiler, setSpoiler] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasReview, setHasReview] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (movie?.id) {
      loadReview();
    }
  }, [movie?.id]);

  async function loadReview() {
    try {
      const data = await getMyReview(movie.id);

      if (data) {
        setHasReview(true);
        setEditing(false);
        setRating(data.rating);
        setReview(data.review);
        setSpoiler(data.spoiler);
      } else {
        setHasReview(false);
        setEditing(true);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load your review.");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please give a rating.");
      return;
    }

    if (!review.trim()) {
      toast.error("Please write a review.");
      return;
    }

    try {
      setLoading(true);

      await upsertReview({
        tmdbId: movie.id,

        title: movie.title,
        poster: movie.poster_path,
        backdrop: movie.backdrop_path,
        releaseDate: movie.release_date,
        overview: movie.overview,

        rating,
        review,
        spoiler,
      });

      const wasEditing = hasReview;

      setHasReview(true);
      setEditing(false);

      toast.success(
        wasEditing
          ? "Review updated successfully!"
          : "Review added successfully!"
      );

      onReviewSubmitted?.();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save review.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete your review?"
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      await deleteReview(movie.id);

      setHasReview(false);
      setEditing(true);
      setRating(0);
      setReview("");
      setSpoiler(false);

      toast.success("Review deleted successfully!");

      onReviewSubmitted?.();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete review.");
    } finally {
      setLoading(false);
    }
  }

  if (hasReview && !editing) {
    return (
      <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h2 className="mb-6 text-2xl font-bold">Your Review</h2>

        <RatingStars rating={rating} readOnly />

        {spoiler && (
          <span className="mt-4 inline-block rounded-full bg-red-500/20 px-3 py-1 text-xs font-medium text-red-400">
            Spoiler
          </span>
        )}

        <p className="mt-5 whitespace-pre-wrap leading-7 text-slate-300">
          {review}
        </p>

        <div className="mt-6 flex gap-4">
          <button
            onClick={() => setEditing(true)}
            className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400"
          >
            Edit Review
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="rounded-xl border border-red-500 px-6 py-3 font-semibold text-red-400 transition hover:bg-red-500/10 disabled:opacity-60"
          >
            Delete Review
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
    >
      <h2 className="mb-6 text-2xl font-bold">
        {hasReview ? "Edit Review" : "Your Review"}
      </h2>

      <RatingStars rating={rating} onChange={setRating} />

      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        rows={5}
        maxLength={1000}
        placeholder="What did you think about this movie?"
        className="mt-6 w-full rounded-xl border border-white/10 bg-slate-900 p-4 text-white outline-none focus:border-cyan-500"
      />

      <p className="mt-2 text-right text-sm text-slate-500">
        {review.length}/1000
      </p>

      <label className="mt-5 flex items-center gap-3">
        <input
          type="checkbox"
          checked={spoiler}
          onChange={(e) => setSpoiler(e.target.checked)}
          className="h-4 w-4"
        />
        <span className="text-slate-300">Contains spoilers</span>
      </label>

      <div className="mt-6 flex gap-4">
        <button
          type="submit"
          disabled={loading || rating === 0 || !review.trim()}
          className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Saving..."
            : hasReview
            ? "Update Review"
            : "Save Review"}
        </button>

        {hasReview && (
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="rounded-xl border border-white/10 px-6 py-3 transition hover:bg-white/10"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ReviewForm;