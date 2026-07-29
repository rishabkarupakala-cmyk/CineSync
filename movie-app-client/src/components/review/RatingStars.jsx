import { useState } from "react";
import { FaStar } from "react-icons/fa";

function RatingStars({
  rating,
  onChange,
  max = 10,
  size = "text-2xl",
  readOnly = false,
}) {
  const [hovered, setHovered] = useState(0);

  const activeRating = readOnly ? rating : hovered || rating;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }, (_, index) => {
        const value = index + 1;

        return (
          <button
            key={value}
            type="button"
            disabled={readOnly}
            onClick={() => onChange?.(value)}
            onMouseEnter={() => !readOnly && setHovered(value)}
            onMouseLeave={() => !readOnly && setHovered(0)}
            className={`transition duration-200 ${
              readOnly
                ? "cursor-default"
                : "hover:scale-125 active:scale-95"
            }`}
          >
            <FaStar
              className={`${size} ${
                value <= Math.round(activeRating)
                  ? "text-yellow-400"
                  : "text-slate-600"
              }`}
            />
          </button>
        );
      })}

      <span className="ml-3 text-sm text-slate-400">
        {Number(activeRating).toFixed(1)}/{max}
      </span>
    </div>
  );
}

export default RatingStars;