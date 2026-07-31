import { motion } from "framer-motion";

export default function ToggleSwitch({
  enabled,
  setEnabled,
}) {
  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className={`relative w-16 h-9 rounded-full transition-colors duration-300 ${
        enabled
          ? "bg-cyan-500"
          : "bg-slate-700"
      }`}
    >
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        className="absolute top-1 left-1 h-7 w-7 rounded-full bg-white"
        animate={{
          x: enabled ? 28 : 0,
        }}
      />
    </button>
  );
}