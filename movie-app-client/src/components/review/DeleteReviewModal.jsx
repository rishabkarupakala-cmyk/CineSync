import { AnimatePresence, motion } from "framer-motion";

function DeleteReviewModal({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 text-5xl">🗑️</div>

              <h2 className="text-2xl font-bold text-white">
                Delete Review
              </h2>

              <p className="mt-3 text-slate-400">
                Are you sure you want to delete your review?
                This action cannot be undone.
              </p>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  onClick={onClose}
                  disabled={loading}
                  className="rounded-xl border border-white/10 px-5 py-2 text-white transition hover:bg-white/10"
                >
                  Cancel
                </button>

                <button
                  onClick={onConfirm}
                  disabled={loading}
                  className="rounded-xl bg-red-500 px-5 py-2 font-semibold text-white transition hover:bg-red-600 disabled:opacity-60"
                >
                  {loading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default DeleteReviewModal;