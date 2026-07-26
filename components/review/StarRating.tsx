

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
//             key={star} // <-- ADDED THIS LINE
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
  smSize?: number; // Added to handle desktop sizing from ReviewComposer
  interactive?: boolean;
}

export default function StarRating({
  rating,
  onRate,
  size = 20,
  smSize,
  interactive = true,
}: StarRatingProps) {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  // Use smSize for desktop if provided, otherwise fallback to base size
  const desktopSize = smSize || size;

  return (
    <div className="flex items-center gap-1 sm:gap-1.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled =
          star <= rating ||
          (interactive && hoveredStar !== null && star <= hoveredStar);
        return (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onRate(star)}
            onMouseEnter={() => interactive && setHoveredStar(star)}
            onMouseLeave={() => interactive && setHoveredStar(null)}
            // Increased padding drastically for mobile (p-2.5 makes the tap target ~44px)
            // Added active:scale for tactile mobile feedback
            className={`p-2.5 sm:p-2 -m-1 sm:-m-0.5 rounded-lg transition-transform duration-100 ${
              interactive 
                ? "cursor-pointer active:scale-90 hover:scale-105" 
                : ""
            }`}
          >
            {/* Render two icons and hide/show based on screen size to handle responsive sizing cleanly */}
            <>
              {/* Mobile Star (always visible on small screens) */}
              <Star
                size={size}
                className={`sm:hidden transition-colors duration-150 ${
                  isFilled ? "text-yellow-400" : "text-th-text-faint"
                }`}
                fill={isFilled ? "currentColor" : "none"}
                strokeWidth={isFilled ? 0 : 2}
              />
              {/* Desktop Star (hidden on mobile, visible on sm+) */}
              <Star
                size={desktopSize}
                className={`hidden sm:block transition-colors duration-150 ${
                  isFilled ? "text-yellow-400" : "text-th-text-faint"
                }`}
                fill={isFilled ? "currentColor" : "none"}
                strokeWidth={isFilled ? 0 : 2}
              />
            </>
          </button>
        );
      })}
    </div>
  );
}