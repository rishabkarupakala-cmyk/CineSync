import { motion } from "framer-motion";

function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
}) {
  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white",

    secondary:
      "bg-white text-black hover:bg-gray-200",

    danger:
      "bg-red-600 hover:bg-red-700 text-white",

    ghost:
      "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20",

    dark:
      "bg-slate-800 hover:bg-slate-700 text-white",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.03 }}
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`
        px-6
        py-3
        rounded-xl
        font-semibold
        transition-all
        duration-300
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
}

export default Button;