// "use client";

// import { Star } from "lucide-react";
// import { useState } from "react";

// interface StarRatingProps {
//   rating: number;
//   onRate: (rating: number) => void;
//   size?: number;
//   interactive?: boolean;
// }

// export default function StarRating({
//     rating,
//     onRate,
//     size = 20,
//     interactive = true,
//   }: StarRatingProps) {
//   const [hoveredStar, setHoveredStar] = useState<number | null>(null);

//   return (
//     <div className="flex items-center gap-0.5">
//       {[1, 2, 3, 4, 5].map((star) => {
//         const isFilled =
//           star <= rating ||
//           (interactive && hoveredStar !== null && star <= hoveredStar);
//         return (
//           <button
//             type="button"
//             disabled={!interactive}
//             onClick={() => interactive && onRate(star)}
//             onMouseEnter={() => interactive && setHoveredStar(star)}
//             onMouseLeave={() => interactive && setHoveredStar(null)}
//             className={`p-0.5 ${interactive ? "cursor-pointer" : ""}`}
//           >
//             <Star
//               size={size}
//               className={`transition-colors duration-150 ${
//                 isFilled ? "text-yellow-400" : "text-th-text-faint"
//               }`}
//               fill={isFilled ? "currentColor" : "none"}
//               strokeWidth={isFilled ? 0 : 2}
//             />
//           </button>
//         );
//       })}
//     </div>
//   );
// }


"use client";

import { Star } from "lucide-react";
import { useState } from "react";

interface StarRatingProps {
  rating: number;
  onRate: (rating: number) => void;
  size?: number;
  interactive?: boolean;
}

export default function StarRating({
    rating,
    onRate,
    size = 20,
    interactive = true,
  }: StarRatingProps) {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled =
          star <= rating ||
          (interactive && hoveredStar !== null && star <= hoveredStar);
        return (
          <button
            key={star} // <-- ADDED THIS LINE
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onRate(star)}
            onMouseEnter={() => interactive && setHoveredStar(star)}
            onMouseLeave={() => interactive && setHoveredStar(null)}
            className={`p-0.5 ${interactive ? "cursor-pointer" : ""}`}
          >
            <Star
              size={size}
              className={`transition-colors duration-150 ${
                isFilled ? "text-yellow-400" : "text-th-text-faint"
              }`}
              fill={isFilled ? "currentColor" : "none"}
              strokeWidth={isFilled ? 0 : 2}
            />
          </button>
        );
      })}
    </div>
  );
}