import ProfileReviewCard from "./ProfileReviewCard";

function ProfileReviewList({ reviews }) {
  if (!reviews?.length) {
    return (
      <div className="rounded-3xl border border-dashed border-white/10 p-12 text-center">
        <h2 className="text-2xl font-bold">
          No Reviews Yet
        </h2>

        <p className="mt-3 text-slate-400">
          Start reviewing movies to build your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {reviews.map((review) => (
        <ProfileReviewCard
          key={review.id}
          review={review}
        />
      ))}
    </div>
  );
}

export default ProfileReviewList;