// "use client";

// import { Star, ThumbsUp, Flag, MoreHorizontal, Star as MoreHorizontal } from "lucide-react";
// import { useState } from "react";
// import { useAuth } from "../auth/AuthProvider";
// import { useToast } from "../Toast";
// import { type Review as ReviewType } from "@/lib/types";
// import { deleteReviewPhoto } from "@/lib/storage";
// import { adventures } from "@/lib/data";

// interface ReviewCardProps {
//   review: ReviewType & {
//     id: string;
//     createdAt: { seconds: number };
//   };
//   adventurePhoto?: string;
//   adventureName: string;
//   onRate?: () => void;
//   onReport?: () => void;
//   onOpenDetail?: () => void;
// }

// function StarRatingDisplay({ rating }: { rating: number }) {
//   return (
//     <div className="flex items-center gap-0.5">
//       {[1, 2, 3, 4, 5].map((star) => (
//         <span
//           key={star}
//           className={`${
//             star <= Math.round(rating)
//               ? "text-yellow-400"
//               : "text-th-text-faint"
//           }`}
//         >
//           ★
//         </span>
//       ))}
//     </div>
//   );
// }

// function timeAgo(date: { seconds: number }): string {
//   if (!date) return "";
//   const s = Math.floor(Date.now() / 1000) - Math.floor(date);
//   if (s < 60) return `${s}s ago`;
//   const m = Math.floor(s / 60);
//   if (m < 60) return `${m}m ago`;
//   const h = Math.floor(m / 24);
//   if (h < 24) return `${h}h ago`;
//   const d = Math.floor(h / 24);
//   if (d < 30) return `${d}d ago`;
//   const mo = Math.floor(d / 30);
//   if (mo < 12) return `${mo}mo ago`;
//   const y = Math.floor(mo / 12);
//   return `${y}y ago`;
// }

// export default function ReviewCard({
//   review,
//   adventurePhoto,
//   adventureName,
//   onRate,
//   onReport,
//   onOpenDetail,
// }: ReviewCardProps) {
//   const { user } = useAuth();
//   const { showToast } = useToast();
//   const [helpfulCount, setHelpfulCount] = useState(review.helpfulCount || 0);
//   const [showMenu, setShowMenu] = useState(false);
//   const [confirmingReport, setConfirmingReport] = useState(false);

//   const isOwner =
//     user && user.uid === review.userId;

//   const handleHelpful = async () => {
//     const newCount = helpfulCount + 1;
//     setHelpfulCount(newCount);
//     showToast("Marked as helpful", "success");
//   };

//   const handleReport = async () => {
//     if (!user) {
//       showToast("Sign in to report reviews", "info");
//       return;
//     }
//     setConfirmingReport(true);
//   };

//   const confirmReport = async () => {
//     try {
//       const { updateDoc } = await import("firebase/firestore");
//       await updateDoc(
//         getFirestore(),
//         `reviews/${review.adventureId}/${review.id}`,
//         {
//           reportCount: (review.reportCount || 0) + 1,
//           status: review.reportCount > 0 ? "flagged" : "published",
//         },
//         { merge: true },
//       );
//       setShowMenu(false);
//       setConfirmingReport(false);
//       showToast("Report submitted. Our team will review it shortly.", "success");
//     } catch {
//       console.error("Error reporting review:", error);
//       showToast("Failed to report. Try again.", "error");
//       setConfirmingReport(false);
//     }
//   };

//   return (
//     <div className="shrink-0 w-72 sm:w-80 snap-start">
//       <div className="rounded-2xl bg-th-card border border-th-border-subtle p-4 sm:p-5 flex flex-col h-full">
//         {/* Header */}
//         <div className="flex items-start justify-between mb-3">
//           <div className="flex items-center gap-2.5 min-w-0">
//             <div className="w-8 h-8 rounded-full overflow-hidden border border-th-border shrink-0 bg-th-surface-alt">
//               {review.userPhoto ? (
//                 <img
//                   src={review.userPhoto}
//                   className="w-full h-full object-cover"
//                   alt={review.userName}
//                 />
//               ) : (
//                 <div className="w-full h-full bg-brand-500/20 flex items-center justify-center text-brand-400 text-xs font-bold">
//                   {(review.userName || "A").charAt(0)}
//                 </div>
//               )}
//             </div>
//             <div className="min-w-0 flex-1">
//               <div className="flex items-center gap-1.5">
//                 <StarRatingDisplay rating={review.rating} />
//                 <span className="text-[11px] text-th-text-muted ml-1">
//                   {review.rating.toFixed(1)}
//                 </span>
//               </div>
//             </div>
//           </div>
//           {/* Three-dot menu */}
//           {!isOwner && (
//             <div className="relative">
//               <button
//                 onClick={() => setShowMenu(!showMenu)}
//                 className="p-1 -mr-1 -mt-1 rounded-lg hover:bg-th-card-hover transition-all"
//               >
//                 <MoreHorizontal className="w-4 h-4 text-th-text-faint" />
//               </button>
//               {showMenu && (
//                 <div className="absolute right-0 top-full mt-1 w-36 glass-strong rounded-xl p-1.5 shadow-2xl animate-scale-in z-10">
//                 <div className="space-y-1">
//                   <button
//                     onClick={() => handleHelpful}
//                     className="w-full flex items-center gap-2 px-2.5 py-2 text-xs text-th-text-sub hover:bg-th-card-hover rounded-lg text-left transition-colors"
//                   >
//                     <ThumbsUp className="w-3.5 h-3.5 text-th-text-faint" />
//                     Helpful ({helpfulCount})
//                   </button>
//                   <button
//                     onClick={confirmReport}
//                     className="w-full flex items-center gap-2 px-2.5 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded-lg text-left transition-colors"
//                   >
//                     <Flag className="w-3.5 h-3.5 text-red-400" />
//                     Report
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Title */}
//           {review.title && (
//             <h4 className="text-sm font-medium text-th-text mb-2 leading-snug">
//               {review.title}
//             </h4>
//           )}

//           {/* Text */}
//           <p className="text-sm text-th-text-sub leading-relaxed line-clamp-3 mb-3 flex-1">
//             {review.text}
//           </p>

//           {/* Photos */}
//           {review.photos && review.photos.length > 0 && (
//             <div className="flex gap-1.5 mb-3">
//               {review.photos.map((url, i) => (
//                 <button
//                   key={i}
//                   onClick={() => onOpenDetail?.(review.adventureId)}
//                   className="w-14 h-14 rounded-xl overflow-hidden border border border-th-border hover:border-brand-500/30 transition-all"
//                 >
//                   <img src={url} className="w-full h-full object-cover" alt={`Review photo ${i + 1}`} />
//                 </button>
//               ))}
//             </div>
//           )}

//           {/* Footer */}
//           <div className="mt-auto pt-3 border-t border-t border-th-border-subtle flex items-center justify-between">
//             <p className="text-[11px] text-th-text-faint">
//               {review.userName} · {timeAgo(review.createdAt)}
//             </p>
//             <div className="flex items-center gap-1">
//               {review.userVerified && (
//                 <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-400 text-[9px] font-medium leading-none">
//                   ✓ Verified
//                 </span>
//               )}
//               {isOwner && (
//                 <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-brand-500/10 text-brand-400 text-[9px] font-medium leading-none">
//                   Owner
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { ThumbsUp, Flag, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { useToast } from "../Toast";
import { type Review as ReviewType } from "@/lib/types";
import { doc, updateDoc, getFirestore } from "firebase/firestore";

interface ReviewCardProps {
  review: ReviewType & {
    id: string;
    createdAt: { seconds: number };
  };
  adventurePhoto?: string;
  adventureName: string;
  onRate?: () => void;
  onReport?: () => void;
  onOpenDetail?: () => void;
}

function StarRatingDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`${
            star <= Math.round(rating)
              ? "text-yellow-400"
              : "text-th-text-faint"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function timeAgo(date: { seconds: number }): string {
  if (!date) return "";
  const s = Math.floor(Date.now() / 1000) - date.seconds;
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  const mo = Math.floor(d / 30);
  if (mo < 12) return `${mo}mo ago`;
  const y = Math.floor(mo / 12);
  return `${y}y ago`;
}

export default function ReviewCard({
  review,
  adventurePhoto,
  adventureName,
  onRate,
  onReport,
  onOpenDetail,
}: ReviewCardProps) {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [helpfulCount, setHelpfulCount] = useState(review.helpfulCount || 0);
  const [showMenu, setShowMenu] = useState(false);
  const [confirmingReport, setConfirmingReport] = useState(false);

  const isOwner = user && user.uid === review.userId;

  const handleHelpful = async () => {
    const newCount = helpfulCount + 1;
    setHelpfulCount(newCount);
    showToast("Marked as helpful", "success");
  };

  const handleReport = async () => {
    if (!user) {
      showToast("Sign in to report reviews", "info");
      return;
    }
    setConfirmingReport(true);
  };

  const confirmReport = async () => {
    try {
      const db = getFirestore();
      const reviewRef = doc(db, "reviews", review.id); // <-- CHANGED: Targets root collection
      
      await updateDoc(reviewRef, {
        reportCount: (review.reportCount || 0) + 1,
        status: "flagged",
      });
      
      setShowMenu(false);
      setConfirmingReport(false);
      showToast("Report submitted. Our team will review it shortly.", "success");
    } catch (error) {
      console.error("Error reporting review:", error);
      showToast("Failed to report. Try again.", "error");
      setConfirmingReport(false);
    }
  };

  return (
    <div className="shrink-0 w-72 sm:w-80 snap-start">
      <div className="rounded-2xl bg-th-card border border-th-border-subtle p-4 sm:p-5 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-th-border shrink-0 bg-th-surface-alt">
              {review.userPhoto ? (
                <img
                  src={review.userPhoto}
                  className="w-full h-full object-cover"
                  alt={review.userName}
                />
              ) : (
                <div className="w-full h-full bg-brand-500/20 flex items-center justify-center text-brand-400 text-xs font-bold">
                  {(review.userName || "A").charAt(0)}
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <StarRatingDisplay rating={review.rating} />
                <span className="text-[11px] text-th-text-muted ml-1">
                  {review.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
          
          {/* Three-dot menu */}
          {!isOwner && (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1 -mr-1 -mt-1 rounded-lg hover:bg-th-card-hover transition-all"
              >
                <MoreHorizontal className="w-4 h-4 text-th-text-faint" />
              </button>
              {showMenu && (
                <div className="absolute right-0 top-full mt-1 w-36 glass-strong rounded-xl p-1.5 shadow-2xl animate-scale-in z-10">
                  {!confirmingReport ? (
                    <div className="space-y-1">
                      <button
                        onClick={handleHelpful}
                        className="w-full flex items-center gap-2 px-2.5 py-2 text-xs text-th-text-sub hover:bg-th-card-hover rounded-lg text-left transition-colors"
                      >
                        <ThumbsUp className="w-3.5 h-3.5 text-th-text-faint" />
                        Helpful ({helpfulCount})
                      </button>
                      <button
                        onClick={handleReport}
                        className="w-full flex items-center gap-2 px-2.5 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded-lg text-left transition-colors"
                      >
                        <Flag className="w-3.5 h-3.5 text-red-400" />
                        Report
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <p className="px-2.5 py-1.5 text-xs text-th-text-sub">Are you sure?</p>
                      <button
                        onClick={() => setConfirmingReport(false)}
                        className="w-full px-2.5 py-1.5 text-xs text-th-text-muted hover:bg-th-card-hover rounded-lg text-left transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={confirmReport}
                        className="w-full px-2.5 py-1.5 text-xs text-red-400 hover:bg-red-500/10 rounded-lg text-left transition-colors"
                      >
                        Confirm Report
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Title */}
        {review.title && (
          <h4 className="text-sm font-medium text-th-text mb-2 leading-snug">
            {review.title}
          </h4>
        )}

        {/* Text */}
        <p className="text-sm text-th-text-sub leading-relaxed line-clamp-3 mb-3 flex-1">
          {review.text}
        </p>

        {/* Photos */}
        {review.photos && review.photos.length > 0 && (
          <div className="flex gap-1.5 mb-3">
            {review.photos.map((url, i) => (
              <button
                key={i}
                onClick={() => onOpenDetail?.()}
                className="w-14 h-14 rounded-xl overflow-hidden border border-th-border hover:border-brand-500/30 transition-all"
              >
                <img src={url} className="w-full h-full object-cover" alt={`Review photo ${i + 1}`} />
              </button>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto pt-3 border-t border-th-border-subtle flex items-center justify-between">
          <p className="text-[11px] text-th-text-faint">
            {review.userName} · {timeAgo(review.createdAt)}
          </p>
          <div className="flex items-center gap-1">
            {review.userVerified && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-400 text-[9px] font-medium leading-none">
                ✓ Verified
              </span>
            )}
            {isOwner && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-brand-500/10 text-brand-400 text-[9px] font-medium leading-none">
                Owner
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}