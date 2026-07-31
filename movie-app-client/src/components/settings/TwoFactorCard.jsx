import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function TwoFactorCard({
  enabled,
  onEnable,
  onDisable,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-slate-800 bg-slate-900 p-7"
    >
      <div className="flex items-start justify-between">

        <div>

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
              <FaShieldAlt size={22} />
            </div>

            <div>

              <h2 className="text-xl font-semibold">
                Two-Factor Authentication
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Protect your account using an authenticator app.
              </p>

            </div>

          </div>

          <div className="mt-6">

            {enabled ? (

              <div className="inline-flex items-center gap-2 rounded-full bg-green-500/15 px-4 py-2 text-green-400">

                <FaCheckCircle />

                Enabled

              </div>

            ) : (

              <div className="inline-flex items-center gap-2 rounded-full bg-yellow-500/15 px-4 py-2 text-yellow-400">

                <FaExclamationTriangle />

                Disabled

              </div>

            )}

          </div>

        </div>

        {enabled ? (

          <button
            onClick={onDisable}
            className="rounded-xl bg-red-600 px-5 py-3 font-semibold transition hover:bg-red-700"
          >
            Disable
          </button>

        ) : (

          <button
            onClick={onEnable}
            className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-black transition hover:bg-cyan-400"
          >
            Enable
          </button>

        )}

      </div>

    </motion.div>
  );
}