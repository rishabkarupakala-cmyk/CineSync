import { formatDistanceToNow } from "date-fns";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

import ReviewAvatar from "./ReviewAvatar";
import RatingBadge from "./RatingBadge";

export default function ReviewHeader({ review }) {
  return (
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-4">
        <ReviewAvatar user={review.user} />

        <div>
          <h3 className="font-semibold text-white">
            {review.user?.username}
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            @{review.user?.username} ·{" "}
            {formatDistanceToNow(new Date(review.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <RatingBadge rating={review.rating} />

        <button className="rounded-full p-2 transition hover:bg-slate-800">
          <HiOutlineDotsHorizontal className="text-xl text-slate-400" />
        </button>
      </div>
    </div>
  );
}