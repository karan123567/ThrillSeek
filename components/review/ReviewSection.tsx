// "use client";

// import { useRef, useCallback, useEffect } from "react";
// import { ChevronLeft, ChevronRight, PenLine, Star } from "lucide-react";
// import StarRating from "./review/StarRating";
// import ReviewCard from "./review/ReviewCard";
// import ReviewComposer from "./review/ReviewComposer";
// import { useAuth } from "./auth/AuthProvider";
// import { useToast } from "./Toast";
// import {
//   doc,
//   getDocs,
//   query,
//   collection,
//   where,
//   orderBy,
//   startAfter,
//   getFirestore,
// } from "firebase/firestore";
// import type { Review } from "@/lib/types";
// import { adventures } from "@/lib/data";

// interface ReviewWithMeta {
//   review: Review & {
//     id: string;
//     createdAt: { seconds: number };
//   };
//   adventurePhoto?: string;
//   adventureName: string;
// }

// export default function Reviews({
//   onOpenReview,
// }: {
//     onOpenReview?: (id: number) => void;
//   }) {
//   const { user } = useAuth();
//   const { showToast } = useToast();
//   const scrollerRef = useRef<HTMLDivElement>(null);

//   const [reviews, setReviews] = useState<Review[]>([]);
//   const [totalReviews, setTotalReviews] = useState(0);
//   const [lastDoc, setLastDoc] = useState<unknown>(null);

//   const fetchReviews = useCallback(async () => {
//     if (!user) return;
//     try {
//       const q = collection("reviews").where("status", "==", "published")
//         .orderBy("createdAt", "desc");

//       const q2 = lastDoc ? q.startAfter(lastDoc) : q;

//       const snap = await getDocs(q2, { pageSize: 6 });
//       const data = snap.docs.map((d) => ({
//         id: d.id,
//         ...(d.data() as Review),
//       }));
//       setReviews(data);
//       setLastDoc(snap.docs[snap.docs.length - 1]);
//       setTotalReviews(snap.size);
//     } catch {
//       console.error("Error fetching reviews:", error);
//       setReviews([]);
//     }
//   }, [user]);

//   useEffect(() => {
//     fetchReviews();
//   }, [user]);

//   const scroll = (dir: number) => {
//     scrollerRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
//   };

//   if (!user) {
//     const staticReviews = [
//       {
//         id: "s1", adventureId: 1, userId: "u1", userName: "Sarah Chen",
//         userPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
//         userVerified: true, adventureName: "Everest Base Camp Trek", rating: 5,
//         title: "Life-changing experience!", text: "The guides were incredibly knowledgeable and the scenery was beyond words.",
//         photos: [], helpfulCount: 12, reportCount: 0, status: "published",
//         createdAt: { seconds: Date.now() - 1209600 },
//       },
//       {
//         id: "s2", adventureId: 2, userId: "u2", userName: "Marcus Johnson",
//         userPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
//         userVerified: true, adventureName: "Bali Scuba Diving", rating: 5,
//         title: "As a first-time diver, I felt completely safe.",
//         text: "The coral reefs were absolutely stunning and we saw so many tropical fish.",
//         photos: [], helpfulCount: 8, reportCount: 0, status: "published",
//         createdAt: { seconds: Date.now() - 2592000 },
//       },
//       {
//         id: "s3", adventureId: 3, userId: "u3", userName: "Elena Rodriguez",
//         userPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
//         userVerified: true, adventureName: "Swiss Alps Paragliding", rating: 5,
//         title: "Pure magic.", text: "The most incredible feeling of freedom I've ever experienced.",
//         photos: [], helpfulCount: 15, reportCount: 0, status: "published",
//         createdAt: { seconds: Date.now() - 1814400 },
//       },
//       {
//         id: "s4", adventureId: 4, userId: "u4", userName: "James Park",
//         userPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face,
//         userVerified: false, adventureName: "Rishikesh Rafting", rating: 4,
//         title: "Great fun and amazing value!", text: "Only downside was the crowded starting point.",
//         photos: [], helpfulCount: 3, reportCount: 0, status: "published",
//         createdAt: { seconds: Date.now() - 5184000 },
//       },
//       {
//         id: "s5", adventureId: 7, userId: "u5", userName: "Aisha Patel",
//         userPhoto: "https://images.unsplash.com/photo-1534528232822-a0d7d1d8f2c?w=100&h=100&fit=crop&crop=face",
//         userVerified: true, adventureName: "Kenya Big Five Safari", rating: 5,
//         title: "We saw all the Big Five within two days!",
//         text: "Our guide had an incredible eye for spotting animals.",
//         photos: [], helpfulCount: 22, reportCount: 0, status: "published",
//         createdAt: { seconds: Date.now() - 604800 },
//       },
//     ];

//     return (
//       <>
//         <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 via-white/10 to-transparent" />
//         <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-brand-500/3 blur-[120px]" />
//         <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
//           <div className="flex items-end justify-between mb-12 reveal-on-scroll">
//             <div>
//               <span className="text-xs font-medium tracking-wider uppercase text-brand-500 mb-4 block">
//                 Testimonials
//               </span>
//               <h2 className="text-4xl lg:text-5xl font-medium tracking-tighter mb-4">
//                 Real <span className="gradient-text">Experiences</span>
//               </h2>
//             </div>
//             <div className="hidden lg:flex gap-2">
//               <button
//                 onClick={() => scroll(-1)}
//                 className="w-10 h-10 rounded-xl bg-th-input border border-th-border flex items-center justify-center hover:bg-th-card-hover transition-all"
//               >
//                 <ChevronLeft className="w-4 h-4" />
//               </button>
//               <button
//                 onClick={() => scroll(1)}
//                 className="w-10 h-10 rounded-xl bg-th-input border border-th-border flex items-center justify-center hover:bg-th-card-hover transition-all"
//               >
//                 <ChevronRight className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//           <div className="mt-12 glass rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 reveal-on-scroll">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 rounded-2xl bg-brand-500/10 flex items-center justify-center shrink-0">
//                 <PenLine className="w-6 h-6 text-brand-400" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-medium text-th-text">
//                   Share Your Adventure
//                 </h3>
//                 <p className="text-sm text-th-text-muted">
//                   Help others find their perfect thrill. Write a review.
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={() => {
//                 onOpenReview?.();
//               }}
//               className="btn-primary px-6 py-3 rounded-xl text-sm font-medium text-white inline-flex items-center gap-2 whitespace-nowrap"
//             >
//               <Star className="w-4 h-4" />
//               Write a Review
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
//   }
// }


"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, PenLine, Star } from "lucide-react";
import ReviewCard from "./review/ReviewCard";
import { useAuth } from "./auth/AuthProvider";
import { useToast } from "./Toast";
import {
  getDocs,
  query,
  collection,
  where,
  orderBy,
  startAfter,
  limit,
  getFirestore,
} from "firebase/firestore";
import type { Review } from "@/lib/types";

interface ReviewWithMeta {
  review: Review & {
    id: string;
    createdAt: { seconds: number };
  };
  adventurePhoto?: string;
  adventureName: string;
}

export default function Reviews({
  onOpenReview,
}: {
  onOpenReview?: (id: number) => void;
}) {
  const { user } = useAuth();
  const { showToast } = useToast();
  const scrollerRef = useRef<HTMLDivElement>(null);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [lastDoc, setLastDoc] = useState<unknown>(null);

  const fetchReviews = useCallback(async () => {
    if (!user) return;
    try {
      const db = getFirestore();
      const baseQuery = query(
        collection(db, "reviews"),
        where("status", "==", "published"),
        orderBy("createdAt", "desc"),
        limit(6)
      );

      const q = lastDoc ? query(baseQuery, startAfter(lastDoc)) : baseQuery;

      const snap = await getDocs(q);
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Review),
      }));
      
      setReviews(data);
      setLastDoc(snap.docs[snap.docs.length - 1] || null);
      setTotalReviews(snap.size);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews([]);
    }
  }, [user, lastDoc]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const scroll = (dir: number) => {
    scrollerRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  if (!user) {
    const staticReviews = [
      {
        id: "s1", adventureId: 1, userId: "u1", userName: "Sarah Chen",
        userPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        userVerified: true, adventureName: "Everest Base Camp Trek", rating: 5,
        title: "Life-changing experience!", text: "The guides were incredibly knowledgeable and the scenery was beyond words.",
        photos: [], helpfulCount: 12, reportCount: 0, status: "published",
        createdAt: { seconds: Date.now() / 1000 - 1209600 },
      },
      {
        id: "s2", adventureId: 2, userId: "u2", userName: "Marcus Johnson",
        userPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
        userVerified: true, adventureName: "Bali Scuba Diving", rating: 5,
        title: "As a first-time diver, I felt completely safe.",
        text: "The coral reefs were absolutely stunning and we saw so many tropical fish.",
        photos: [], helpfulCount: 8, reportCount: 0, status: "published",
        createdAt: { seconds: Date.now() / 1000 - 2592000 },
      },
      {
        id: "s3", adventureId: 3, userId: "u3", userName: "Elena Rodriguez",
        userPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
        userVerified: true, adventureName: "Swiss Alps Paragliding", rating: 5,
        title: "Pure magic.", text: "The most incredible feeling of freedom I've ever experienced.",
        photos: [], helpfulCount: 15, reportCount: 0, status: "published",
        createdAt: { seconds: Date.now() / 1000 - 1814400 },
      },
      {
        id: "s4", adventureId: 4, userId: "u4", userName: "James Park",
        userPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
        userVerified: false, adventureName: "Rishikesh Rafting", rating: 4,
        title: "Great fun and amazing value!", text: "Only downside was the crowded starting point.",
        photos: [], helpfulCount: 3, reportCount: 0, status: "published",
        createdAt: { seconds: Date.now() / 1000 - 5184000 },
      },
      {
        id: "s5", adventureId: 7, userId: "u5", userName: "Aisha Patel",
        userPhoto: "https://images.unsplash.com/photo-1534528232822-a0d7d1d8f2c?w=100&h=100&fit=crop&crop=face",
        userVerified: true, adventureName: "Kenya Big Five Safari", rating: 5,
        title: "We saw all the Big Five within two days!",
        text: "Our guide had an incredible eye for spotting animals.",
        photos: [], helpfulCount: 22, reportCount: 0, status: "published",
        createdAt: { seconds: Date.now() / 1000 - 604800 },
      },
    ];

    return (
      <>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-brand-500/3 blur-[120px]" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <div className="flex items-end justify-between mb-12 reveal-on-scroll">
            <div>
              <span className="text-xs font-medium tracking-wider uppercase text-brand-500 mb-4 block">
                Testimonials
              </span>
              <h2 className="text-4xl lg:text-5xl font-medium tracking-tighter mb-4">
                Real <span className="gradient-text">Experiences</span>
              </h2>
            </div>
            <div className="hidden lg:flex gap-2">
              <button
                onClick={() => scroll(-1)}
                className="w-10 h-10 rounded-xl bg-th-input border border-th-border flex items-center justify-center hover:bg-th-card-hover transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll(1)}
                className="w-10 h-10 rounded-xl bg-th-input border border-th-border flex items-center justify-center hover:bg-th-card-hover transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Added Missing Scroller and ReviewCard mapping */}
          <div ref={scrollerRef} className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide -mx-6 px-6 reveal-on-scroll">
            {staticReviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                adventureName={review.adventureName}
                onOpenDetail={() => onOpenReview?.(review.adventureId)}
              />
            ))}
          </div>

          <div className="mt-12 glass rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 reveal-on-scroll">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-500/10 flex items-center justify-center shrink-0">
                <PenLine className="w-6 h-6 text-brand-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-th-text">
                  Share Your Adventure
                </h3>
                <p className="text-sm text-th-text-muted">
                  Help others find their perfect thrill. Write a review.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                onOpenReview?.(0);
              }}
              className="btn-primary px-6 py-3 rounded-xl text-sm font-medium text-white inline-flex items-center gap-2 whitespace-nowrap"
            >
              <Star className="w-4 h-4" />
              Write a Review
            </button>
          </div>
        </div>
      </>
    );
  }

  // Added the return block for logged-in users so the component doesn't return undefined
  return (
    <>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-brand-500/3 blur-[120px]" />
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <div className="flex items-end justify-between mb-12 reveal-on-scroll">
          <div>
            <span className="text-xs font-medium tracking-wider uppercase text-brand-500 mb-4 block">
              Testimonials
            </span>
            <h2 className="text-4xl lg:text-5xl font-medium tracking-tighter mb-4">
              Real <span className="gradient-text">Experiences</span>
            </h2>
          </div>
          <div className="hidden lg:flex gap-2">
            <button
              onClick={() => scroll(-1)}
              className="w-10 h-10 rounded-xl bg-th-input border border-th-border flex items-center justify-center hover:bg-th-card-hover transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll(1)}
              className="w-10 h-10 rounded-xl bg-th-input border border-th-border flex items-center justify-center hover:bg-th-card-hover transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div ref={scrollerRef} className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide -mx-6 px-6 reveal-on-scroll">
          {reviews.map((review) => {
            const adventure = adventures.find((a) => a.id === review.adventureId);
            return (
              <ReviewCard
                key={review.id}
                review={review}
                adventureName={adventure?.name || "Unknown Adventure"}
                adventurePhoto={adventure?.image}
                onOpenDetail={() => onOpenReview?.(review.adventureId)}
              />
            );
          })}
        </div>

        <div className="mt-12 glass rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 reveal-on-scroll">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/10 flex items-center justify-center shrink-0">
              <PenLine className="w-6 h-6 text-brand-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-th-text">
                Share Your Adventure
              </h3>
              <p className="text-sm text-th-text-muted">
                Help others find their perfect thrill. Write a review.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              onOpenReview?.(0);
            }}
            className="btn-primary px-6 py-3 rounded-xl text-sm font-medium text-white inline-flex items-center gap-2 whitespace-nowrap"
          >
            <Star className="w-4 h-4" />
            Write a Review
          </button>
        </div>
      </div>
    </>
  );
}