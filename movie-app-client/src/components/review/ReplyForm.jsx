import { useState } from "react";
import { motion } from "framer-motion";
import { addReply } from "../../api/reviewApi";

export default function ReplyForm({
  reviewId,
  onReplyAdded,
  onCancel,
}) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!text.trim()) return;

    try {
      setLoading(true);

      const reply = await addReply(reviewId, text);

      setText("");

      onReplyAdded(reply);

      onCancel();

    } catch (err) {
      console.error(err);
      alert("Failed to post reply.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      onSubmit={handleSubmit}
      className="mt-5 rounded-2xl border border-slate-700 bg-slate-800/50 p-4"
    >
      <textarea
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a reply..."
        className="w-full resize-none rounded-xl bg-slate-900 p-3 text-white outline-none"
      />

      <div className="mt-4 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl bg-slate-700 px-4 py-2 text-white hover:bg-slate-600"
        >
          Cancel
        </button>

        <button
          disabled={loading}
          className="rounded-xl bg-cyan-500 px-5 py-2 font-semibold text-black hover:bg-cyan-400 disabled:opacity-60"
        >
          {loading ? "Posting..." : "Post Reply"}
        </button>
      </div>
    </motion.form>
  );
}