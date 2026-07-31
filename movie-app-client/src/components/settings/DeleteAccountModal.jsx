import { motion, AnimatePresence } from "framer-motion";

export default function DeleteAccountModal({
  open,
  onClose,
}) {
  if (!open) return null;

  return (
    <AnimatePresence>

      <motion.div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >

        <motion.div
          initial={{
            scale: .9,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          exit={{
            scale: .9,
            opacity: 0,
          }}
          className="w-[500px] rounded-3xl bg-slate-900 border border-red-500/30 p-8"
        >

          <h2 className="text-3xl font-bold text-red-400">
            Delete Account?
          </h2>

          <p className="mt-5 text-slate-300 leading-7">

            This action is permanent and cannot be undone.

            <br /><br />

            Your profile, reviews, watchlists,
            ratings and preferences will be
            permanently deleted.

          </p>

          <div className="flex justify-end gap-4 mt-8">

            <button
              onClick={onClose}
              className="px-5 py-3 rounded-xl bg-slate-700 hover:bg-slate-600"
            >
              Cancel
            </button>

            <button
              className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700"
            >
              Yes, Delete My Account
            </button>

          </div>

        </motion.div>

      </motion.div>

    </AnimatePresence>
  );
}