import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

import ReviewHeader from "./ReviewHeader";
import ReviewActions from "./ReviewActions";
import ReplyForm from "./ReplyForm";

export default function ReviewCard({ review }) {
  const [showSpoiler, setShowSpoiler] = useState(false);
  const [showReplyBox, setShowReplyBox] = useState(false);

  const [replies, setReplies] = useState(review.replies || []);

  const isSpoiler = review.spoiler;
  const hasReview = review.review?.trim().length > 0;

  function handleReplyAdded(reply) {
    setReplies((prev) => [...prev, reply]);
  }

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group rounded-3xl border border-slate-700 bg-slate-900/70 p-6 shadow-lg backdrop-blur-xl transition-all hover:border-cyan-500/40 hover:shadow-cyan-500/10"
    >
      <ReviewHeader review={review} />

      <div className="mt-6">
        {isSpoiler ? (
          <div className="overflow-hidden rounded-2xl border border-red-500/20 bg-red-500/5">
            <div className="flex items-center justify-between border-b border-red-500/10 px-5 py-4">
              <div>
                <h3 className="font-semibold text-red-400">
                  ⚠ Contains Spoilers
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  This review contains important plot details.
                </p>
              </div>

              <button
                onClick={() => setShowSpoiler(!showSpoiler)}
                className="flex items-center gap-2 rounded-full bg-red-500/10 px-4 py-2 text-sm text-red-300 hover:bg-red-500/20"
              >
                {showSpoiler ? (
                  <>
                    <HiEyeSlash />
                    Hide
                  </>
                ) : (
                  <>
                    <HiEye />
                    Reveal
                  </>
                )}
              </button>
            </div>

            <AnimatePresence mode="wait">
              {showSpoiler ? (
                <motion.div
                  key="visible"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-5"
                >
                  <p className="whitespace-pre-wrap leading-8 text-slate-300">
                    {review.review}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-5"
                >
                  <p className="select-none whitespace-pre-wrap leading-8 text-transparent blur-md">
                    {review.review}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="rounded-2xl bg-slate-800/40 p-5">
            {hasReview ? (
              <p className="whitespace-pre-wrap text-[15px] leading-8 text-slate-300">
                {review.review}
              </p>
            ) : (
              <p className="italic text-slate-500">
                Rated this movie {review.rating}/10.
              </p>
            )}
          </div>
        )}
      </div>

      <ReviewActions
        onReply={() => setShowReplyBox((prev) => !prev)}
      />

      <AnimatePresence>
        {showReplyBox && (
          <ReplyForm
            reviewId={review.id}
            onReplyAdded={handleReplyAdded}
            onCancel={() => setShowReplyBox(false)}
          />
        )}
      </AnimatePresence>

      {replies.length > 0 && (
        <div className="mt-6 space-y-4 border-l-2 border-slate-700 pl-5">
          {replies.map((reply) => (
            <div
              key={reply.id}
              className="rounded-xl bg-slate-800/50 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500 font-bold text-black">
                  {reply.user.username.charAt(0).toUpperCase()}
                </div>

                <div>
                  <p className="font-semibold text-white">
                    {reply.user.username}
                  </p>
                </div>
              </div>

              <p className="mt-3 whitespace-pre-wrap text-slate-300">
                {reply.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </motion.article>
  );
}