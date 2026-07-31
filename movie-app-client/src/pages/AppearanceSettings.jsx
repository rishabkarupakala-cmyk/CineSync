import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaPalette } from "react-icons/fa6";
import { useTheme } from "../context/ThemeContext";

export default function AppearanceSettings() {
  const navigate = useNavigate();

  const {
    theme,
    setTheme,
    accent,
    setAccent,
    posterSize,
    setPosterSize,
    autoplayTrailers,
    setAutoplayTrailers,
    reduceAnimations,
    setReduceAnimations,
  } = useTheme();

  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);

    setTimeout(() => {
      setSaving(false);
      alert("Appearance updated!");
      navigate("/settings");
    }, 700);
  };

  const OptionButton = ({
    active,
    label,
    onClick,
  }) => (
    <button
      type="button"
      onClick={onClick}
      style={
        active
          ? {
              backgroundColor: "var(--accent-color)",
            }
          : {}
      }
      className={`rounded-xl px-5 py-3 font-medium transition-all duration-200 ${
        active
          ? "text-white shadow-lg"
          : "bg-slate-800 text-slate-300 hover:bg-slate-700"
      }`}
    >
      {label}
    </button>
  );

  const ToggleCard = ({
    title,
    value,
    onClick,
  }) => (
    <div
      className="flex items-center justify-between rounded-2xl border p-5"
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
      }}
    >
      <h3 className="font-semibold">
        {title}
      </h3>

      <button
        type="button"
        onClick={onClick}
        style={
          value
            ? {
                backgroundColor:
                  "var(--accent-color)",
              }
            : {}
        }
        className={`relative h-7 w-14 rounded-full transition ${
          value ? "" : "bg-slate-600"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
            value ? "left-8" : "left-1"
          }`}
        />
      </button>
    </div>
  );

  return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--text)] transition-colors duration-300">
      <div className="mx-auto max-w-4xl px-6 py-12">

        <Link
          to="/settings"
          className="mb-8 inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text)]"
        >
          <FaArrowLeft />
          Back
        </Link>

        <div className="mb-10 flex items-center gap-4">

          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl text-2xl text-white"
            style={{
              backgroundColor: "var(--accent-color)",
            }}
          >
            <FaPalette />
          </div>

          <h1 className="text-4xl font-bold">
            Appearance
          </h1>

        </div>

        <motion.div
          initial={{
            opacity: 0,
            y: reduceAnimations ? 0 : 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: reduceAnimations ? 0 : 0.3,
          }}
          className="space-y-8 rounded-3xl border p-8"
          style={{
            background: "var(--card)",
            borderColor: "var(--border)",
          }}
        >

          {/* Theme */}

          <div>

            <h2 className="mb-4 text-xl font-semibold">
              Theme
            </h2>

            <div className="flex flex-wrap gap-4">

              <OptionButton
                label="Dark"
                active={theme === "dark"}
                onClick={() => setTheme("dark")}
              />

              <OptionButton
                label="Light"
                active={theme === "light"}
                onClick={() => setTheme("light")}
              />

              <OptionButton
                label="System"
                active={theme === "system"}
                onClick={() => setTheme("system")}
              />

            </div>

          </div>

          {/* Accent Color */}

          <div>

            <h2 className="mb-4 text-xl font-semibold">
              Accent Color
            </h2>

            <div className="flex flex-wrap gap-4">

              <OptionButton
                label="Blue"
                active={accent === "blue"}
                onClick={() => setAccent("blue")}
              />

              <OptionButton
                label="Purple"
                active={accent === "purple"}
                onClick={() => setAccent("purple")}
              />

              <OptionButton
                label="Red"
                active={accent === "red"}
                onClick={() => setAccent("red")}
              />

              <OptionButton
                label="Green"
                active={accent === "green"}
                onClick={() => setAccent("green")}
              />

            </div>

          </div>

          {/* Poster Size */}

          <div>

            <h2 className="mb-4 text-xl font-semibold">
              Poster Size
            </h2>

            <div className="flex flex-wrap gap-4">

              <OptionButton
                label="Compact"
                active={posterSize === "compact"}
                onClick={() => setPosterSize("compact")}
              />

              <OptionButton
                label="Comfortable"
                active={posterSize === "comfortable"}
                onClick={() => setPosterSize("comfortable")}
              />

              <OptionButton
                label="Large"
                active={posterSize === "large"}
                onClick={() => setPosterSize("large")}
              />

            </div>

          </div>

          {/* Auto-play */}

          <ToggleCard
            title="Auto-play Trailers"
            value={autoplayTrailers}
            onClick={() =>
              setAutoplayTrailers(!autoplayTrailers)
            }
          />

          {/* Reduce Animations */}

          <ToggleCard
            title="Reduce Animations"
            value={reduceAnimations}
            onClick={() =>
              setReduceAnimations(!reduceAnimations)
            }
          />

          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              backgroundColor: "var(--accent-color)",
            }}
            className="w-full rounded-2xl py-3 text-lg font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

        </motion.div>

      </div>
    </div>
  );
}