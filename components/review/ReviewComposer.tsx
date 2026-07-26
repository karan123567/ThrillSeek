// // "use client";

// // import { useState, useRef } from "react";
// // import {
// //   Star,
// //   Upload,
// //   X,
// //   Loader2,
// //   CheckCircle2,
// // } from "lucide-react";
// // import StarRating from "./StarRating";
// // import { useAuth } from "../auth/AuthProvider";
// // import { useToast } from "../Toast";
// // import { uploadReviewPhoto } from "@/lib/storage";
// // import type { Review } from "@/lib/types";
// // import { adventures } from "@/lib/data";
// // import {
// //   doc,
// //   setDoc,
// //   updateDoc,
// //   serverTimestamp,
// //   getFirestore,
// // } from "firebase/firestore";

// // interface ReviewComposerProps {
// //   adventureId?: number;
// //   onSubmitted: () => void;
// //   onClose: () => void;
// // }

// // export default function ReviewComposer({
// //   adventureId,
// //   onSubmitted,
// //   onClose,
// // }: ReviewComposerProps) {
// //   const { user } = useAuth();
// //   const { showToast } = useToast();
// //   const fileInputRef = useRef<HTMLInputElement>(null);
// //   const [rating, setRating] = useState(0);
// //   const [title, setTitle] = useState("");
// //   const [text, setText] = useState("");
// //   const [photos, setPhotos] = useState<
// //     { file: File; preview: string; url: string; uploading: boolean }[]
// //   >([]);

// //   const [submitting, setSubmitting] = useState(false);
// //   const [submitted, setSubmitted] = useState(false);
// //   const [selectedAdventure, setSelectedAdventure] = useState<number | null>(adventureId || null);

// //   const targetAdventure = selectedAdventure
// //     ? adventures.find((a) => a.id === selectedAdventure)
// //     : null;

// //   const handlePhotoSelect = async (
// //     e: React.ChangeEvent<HTMLInputElement>
// //   ) => {
// //       const files = Array.from(e.target.files).slice(0, 4);
// //       for (const file of files) {
// //         const preview = URL.createObjectURL(file);
// //         setPhotos((prev) => [
// //           ...prev,
// //           { file, preview, url: "", uploading: true },
// //         ]);

// //         uploadReviewPhoto(file, selectedAdventure || 0)
// //           .then(({ url }) => {
// //             setPhotos((prev) =>
// //               prev.map((p) =>
// //                 p.file === file ? { ...p, url, uploading: false } : p
// //               );
// //           })
// //           .catch(() => {
// //             setPhotos((prev) =>
// //               prev.map((p) =>
// //                 p.file === file ? { ...p, uploading: false } : p
// //               );
// //             showToast("Failed to upload photo", "error");
// //           });
// //       }
// //     };

// //   const removePhoto = (index: number) => {
// //     setPhotos((prev) => prev.filter((_, i) => i !== index));
// //   };

// //   const handleSubmit = async () => {
// //     if (!user) {
// //       showToast("Sign in to write a review", "info");
// //       return;
// //     }
// //     if (!selectedAdventure) {
// //       showToast("Please select an adventure", "error");
// //       return;
// //     }
// //     if (rating === 0) {
// //       showToast("Please select a rating", "error");
// //       return;
// //     }
// //     if (!title.trim()) {
// //       showToast("Please add a title", "error");
// //       return;
// //     }
// //     if (!text.trim()) {
// //       showToast("Please write your experience", "error");
// //       return;
// //     }

// //     setSubmitting(true);

// //     try {
// //       const { writeBatch, doc, setDoc, serverTimestamp } = await import(
// //         "firebase/firestore"
// //       );

// //       const reviewId = `rev_${Date.now()}_${Math.random()
// //         .toString(36)
// //         .slice(2, 10)}`;

// //       const reviewDoc: Review = {
// //         id: reviewId,
// //         adventureId: selectedAdventure,
// //         userId: user.uid,
// //         userName: user.displayName || user.email?.split("@")[0] || "Anonymous",
// //         userPhoto: user.photoURL || "",
// //         userVerified: true,
// //         adventureName: selectedAdventure.name,
// //         rating,
// //         title: title.trim(),
// //         text: text.trim(),
// //         photos: photos.filter((p) => p.url),
// //         helpfulCount: 0,
// //         reportCount: 0,
// //         status: "published",
// //         createdAt: serverTimestamp(),
// //         updatedAt: serverTimestamp(),
// //       };

// //       await setDoc(
// //         doc(getFirestore()),
// //         `reviews/${selectedAdventure}/${reviewId}`,
// //         reviewDoc,
// //         { merge: true },
// //       );

// //       // Update adventure review count
// //       const adventureRef = doc(getFirestore(), `adventures/${selectedAdventure}`);
// //       await updateDoc(adventureRef, {
// //         reviewCount: (targetAdventure?.reviewCount || 0) + 1,
// //       });

// //       setSubmitted(true);
// //       showToast("Review submitted! Thank you for sharing.", "success");

// //       setTimeout(() => {
// //         onSubmitted();
// //         onClose();
// //       }, 1500);
// //     } catch (error) {
// //       console.error("Error submitting review:", error);
// //       showToast("Failed to submit review. Try again.", "error");
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   if (submitted) {
// //     return (
// //       <div className="text-center py-12">
// //         <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
// //           <CheckCircle2 className="w-8 h-8 text-green-500" />
// //         </div>
// //         <p className="text-lg font-medium text-th-text">Review Submitted!</p>
// //         <p className="text-sm text-th-text-muted mt-1">Your experience helps others decide</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="space-y-5">
// //       <div className="flex items-center justify-between mb-6">
// //         <h3 className="text-xl font-medium text-th-text flex items-center gap-2">
// //           <Star className="w-5 h-5 text-brand-400" />
// //           Write a Review
// //         </h3>
// //         <button
// //           onClick={onClose}
// //           className="w-8 h-8 rounded-lg bg-th-input flex items-center justify-center hover:bg-th-card-hover transition-all border border-th-border"
// //         >
// //           <X className="w-4 h-4 text-th-text-sub" />
// //         </button>
// //       </div>

// //       <div>
// //         <label className="text-xs font-medium text-th-text-muted mb-1.5 block">
// //           Which adventure?
// //         </label>
// //         <select
// //           value={selectedAdventure || ""}
// //           onChange={(e) => setSelectedAdventure(Number(e.target.value))}
// //           className="w-full bg-th-input border border-th-border rounded-xl px-4 py-3 text-sm text-th-text appearance-none cursor-pointer focus:outline-none focus:border-brand-500/50"
// //         >
// //           <option value="" className="bg-th-surface">
// //             Select an adventure...
// //           </option>
// //           {adventures.map((a) => (
// //             <option key={a.id} value={a.id} className="bg-th-surface">
// //               {a.name}
// //             </option>
// //           ))}
// //         </select>
// //       </div>

// //       <div>
// //         <label className="text-xs font-medium text-th-text-muted mb-1.5 block">
// //           Your Rating
// //         </label>
// //         <div className="flex items-center gap-4 p-3 rounded-xl bg-th-input border border-th-border">
// //           <StarRating rating={rating} onRate={setRating} size={28} />
// //           <span className="text-sm font-semibold text-th-text ml-2">
// //             {rating > 0 ? rating + ".0" : "Select rating"}
// //           </span>
// //         </div>
// //       </div>

// //       <div>
// //         <label className="text-xs font-medium text-th-text-muted mb-1.5 block">
// //           Share your experience
// //         </label>
// //         <textarea
// //           value={text}
// //           onChange={(e) => setText(e.target.value)}
// //           placeholder="What was your experience like? Be specific — it helps others decide..."
// //           className="w-full bg-th-input border border-th-border rounded-xl px-4 py-3 text-sm text-th-text placeholder-th-text-faint focus:outline-none focus:border-brand-500/50 resize-none h-32"
// //           disabled={submitting}
// //         />
// //       </div>

// //       {/* Photo Upload */}
// //       <div>
// //         <label className="text-xs font-medium text-th-text-muted mb-2 block">
// //           Photos
// //           <span className="text-[11px] text-th-text-faint font-normal ml-1">
// //             (optional · max 4)
// //           </span>
// //         </label>
// //         <div className="grid grid-cols-4 gap-2">
// //           {photos.map((photo, index) => (
// //             <div
// //               key={index}
// //               className="relative aspect-square rounded-xl overflow-hidden border border border-th-border bg-th-input group hover:border-brand-500/30 transition-all"
// //             >
// //               {photo.uploading ? (
// //                 <div className="absolute inset-0 flex items-center justify-center bg-th-card-hover opacity-0 group-hover:opacity-100">
// //                   <Loader2 className="w-5 h-5 animate-spin text-th-text-muted" />
// //                 </div>
// //               ) : (
// //                 <img
// //                   src={photo.url}
// //                   className="w-full h-full object-cover"
// //                   alt={`Review photo ${index + 1}`}
// //                 />
// //               )}
// //               {photo.uploading && (
// //                 <button
// //                   onClick={() => removePhoto(index)}
// //                   className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500/80 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100"
// //                 >
// //                   <svg
// //                     className="w-3 h-3 text-red-400"
// //                     fill="none"
// //                     viewBox="0 0 24 24"
// //                     stroke="currentColor"
// //                     strokeWidth="3"
// //                     strokeLinecap="round"
// //                     strokeLinejoin="round"
// //                   >
// //                     <path d="M18 6 6 6-6-6-6H6" />
// //                   </svg>
// //                 </button>
// //               )}
// //             </div>
// //           ))}
// //           <button
// //             onClick={() => fileInputRef.current?.click()}
// //             className="w-full aspect-square rounded-xl border-2 border-dashed border-th-border bg-th-input hover:border-brand-500/30 flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100"
// //           >
// //             <div className="w-8 h-8 rounded-xl bg-brand-500/20 flex items-center justify-center">
// //               <svg
// //                 className="w-4 h-4 text-white"
// //                 fill="none"
// //                 viewBox="0 0 24 24"
// //                 stroke="currentColor"
// //                 strokeWidth="2"
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //               >
// //                 <path d="M12 4.354a23.933 23.933 0 1 0 0 0 0 47.866 0 0 23.933-23.933 0 0 47.866z" />
// //               </svg>
// //             </div>
// //           </button>
// //           )}
// //         </div>
// //       </div>

// //       {/* Verified badge */}
// //       <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-green-500/10 border border-green-500/20 w-fit">
// //         <svg
// //           className="w-4 h-4 text-green-400"
// //           fill="currentColor"
// //           viewBox="0 0 24 24"
// //           stroke="currentColor"
// //           strokeWidth="2"
// //           strokeLinecap="round"
// //           strokeLinejoin="round"
// //         >
// //           <path d="M9 12l2 4.354a23.933 23.933 0 1 0 0 0 47.866 0 0 23.933-23.933 0 0 47.866z" />
// //         </svg>
// //         <div>
// //           <p className="text-xs font-medium text-green-400 leading-none">
// //             Verified Experience
// //           </p>
// //           <p className="text-[11px] text-green-500/70 leading-tight mt-0.5">
// //             Auto-verified for booked users
// //           </p>
// //         </div>
// //       </div>

// //       {/* Submit */}
// //       <button
// //         onClick={handleSubmit}
// //         disabled={submitting || submitted}
// //         className="btn-primary w-full py-3.5 rounded-xl text-sm font-medium text-white inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
// //       >
// //         {submitting ? (
// //           <>
// //             <Loader2 className="w-4 h-4 animate-spin" />
// //             Submitting...
// //           </>
// //         ) : submitted ? (
// //           <>
// //             <CheckCircle2 className="w-4 h-4" />
// //             Submitted
// //           </>
// //         )}
// //       </button>
// //     </div>
// //   );
// // }


// "use client";

// import { useState, useRef } from "react";
// import {
//   Star,
//   Upload,
//   X,
//   Loader2,
//   CheckCircle2,
// } from "lucide-react";
// import StarRating from "./StarRating";
// import { useAuth } from "../auth/AuthProvider";
// import { useToast } from "../Toast";
// import { uploadReviewPhoto } from "@/lib/storage";
// import type { Review } from "@/lib/types";
// import { adventures } from "@/lib/data";
// import {
//   doc,
//   setDoc,
//   serverTimestamp,
//   getFirestore,
// } from "firebase/firestore";

// interface ReviewComposerProps {
//   adventureId?: number;
//   onSubmitted: () => void;
//   onClose: () => void;
// }

// export default function ReviewComposer({
//   adventureId,
//   onSubmitted,
//   onClose,
// }: ReviewComposerProps) {
//   const { user } = useAuth();
//   const { showToast } = useToast();
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [rating, setRating] = useState(0);
//   const [title, setTitle] = useState("");
//   const [text, setText] = useState("");
//   const [photos, setPhotos] = useState<
//     { file: File; preview: string; url: string; uploading: boolean }[]
//   >([]);

//   const [submitting, setSubmitting] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [selectedAdventure, setSelectedAdventure] = useState<number | null>(adventureId || null);

//   const targetAdventure = selectedAdventure
//     ? adventures.find((a) => a.id === selectedAdventure)
//     : null;

//   const handlePhotoSelect = async (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const files = Array.from(e.target.files || []).slice(0, 4);
//     for (const file of files) {
//       const preview = URL.createObjectURL(file);
//       setPhotos((prev) => [
//         ...prev,
//         { file, preview, url: "", uploading: true },
//       ]);

//       uploadReviewPhoto(file, selectedAdventure || 0)
//         .then(({ url }) => {
//           setPhotos((prev) =>
//             prev.map((p) =>
//               p.file === file ? { ...p, url, uploading: false } : p
//             )
//           );
//         })
//         .catch(() => {
//           setPhotos((prev) =>
//             prev.map((p) =>
//               p.file === file ? { ...p, uploading: false } : p
//             )
//           );
//           showToast("Failed to upload photo", "error");
//         });
//     }
//   };

//   const removePhoto = (index: number) => {
//     setPhotos((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async () => {
//     if (!user) {
//       showToast("Sign in to write a review", "info");
//       return;
//     }
//     if (!selectedAdventure) {
//       showToast("Please select an adventure", "error");
//       return;
//     }
//     if (rating === 0) {
//       showToast("Please select a rating", "error");
//       return;
//     }
//     if (!title.trim()) {
//       showToast("Please add a title", "error");
//       return;
//     }
//     if (!text.trim()) {
//       showToast("Please write your experience", "error");
//       return;
//     }

//     setSubmitting(true);

//     try {
//       const db = getFirestore();
//       const reviewId = `rev_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

//       const reviewDoc: Review = {
//         id: reviewId,
//         adventureId: selectedAdventure,
//         userId: user.uid,
//         userName: user.displayName || user.email?.split("@")[0] || "Anonymous",
//         userPhoto: user.photoURL || "",
//         userVerified: true,
//         adventureName: targetAdventure?.name || "Unknown Adventure",
//         rating,
//         title: title.trim(),
//         text: text.trim(),
//         photos: photos.filter((p) => p.url).map((p) => p.url),
//         helpfulCount: 0,
//         reportCount: 0,
//         status: "published",
//         createdAt: serverTimestamp(),
//         updatedAt: serverTimestamp(),
//       } as any;

//       await setDoc(
//         doc(db, "reviews", reviewId), 
//         reviewDoc
//       );

//       setSubmitted(true);
//       showToast("Review submitted! Thank you for sharing.", "success");

//       setTimeout(() => {
//         onSubmitted();
//         onClose();
//       }, 1500);
//     } catch (error) {
//       console.error("Error submitting review:", error);
//       showToast("Failed to submit review. Try again.", "error");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (submitted) {
//     return (
//       <div className="text-center py-12">
//         <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
//           <CheckCircle2 className="w-8 h-8 text-green-500" />
//         </div>
//         <p className="text-lg font-medium text-th-text">Review Submitted!</p>
//         <p className="text-sm text-th-text-muted mt-1">Your experience helps others decide</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-5">
//       <div className="flex items-center justify-between mb-6">
//         <h3 className="text-xl font-medium text-th-text flex items-center gap-2">
//           <Star className="w-5 h-5 text-brand-400" />
//           Write a Review
//         </h3>
//         <button
//           onClick={onClose}
//           className="w-8 h-8 rounded-lg bg-th-input flex items-center justify-center hover:bg-th-card-hover transition-all border border-th-border"
//         >
//           <X className="w-4 h-4 text-th-text-sub" />
//         </button>
//       </div>

//       <div>
//         <label className="text-xs font-medium text-th-text-muted mb-1.5 block">
//           Which adventure?
//         </label>
//         <select
//           value={selectedAdventure || ""}
//           onChange={(e) => setSelectedAdventure(Number(e.target.value))}
//           className="w-full bg-th-input border border-th-border rounded-xl px-4 py-3 text-sm text-th-text appearance-none cursor-pointer focus:outline-none focus:border-brand-500/50"
//         >
//           <option value="" className="bg-th-surface">
//             Select an adventure...
//           </option>
//           {adventures.map((a) => (
//             <option key={a.id} value={a.id} className="bg-th-surface">
//               {a.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div>
//         <label className="text-xs font-medium text-th-text-muted mb-1.5 block">
//           Your Rating
//         </label>
//         <div className="flex items-center gap-4 p-3 rounded-xl bg-th-input border border-th-border">
//           <StarRating rating={rating} onRate={setRating} size={28} />
//           <span className="text-sm font-semibold text-th-text ml-2">
//             {rating > 0 ? rating + ".0" : "Select rating"}
//           </span>
//         </div>
//       </div>

//       <div>
//         <label className="text-xs font-medium text-th-text-muted mb-1.5 block">
//           Title
//         </label>
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Summarize your experience..."
//           className="w-full bg-th-input border border-th-border rounded-xl px-4 py-3 text-sm text-th-text placeholder-th-text-faint focus:outline-none focus:border-brand-500/50"
//           disabled={submitting}
//         />
//       </div>

//       <div>
//         <label className="text-xs font-medium text-th-text-muted mb-1.5 block">
//           Share your experience
//         </label>
//         <textarea
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           placeholder="What was your experience like? Be specific — it helps others decide..."
//           className="w-full bg-th-input border border-th-border rounded-xl px-4 py-3 text-sm text-th-text placeholder-th-text-faint focus:outline-none focus:border-brand-500/50 resize-none h-32"
//           disabled={submitting}
//         />
//       </div>

//       <div>
//         <label className="text-xs font-medium text-th-text-muted mb-2 block">
//           Photos
//           <span className="text-[11px] text-th-text-faint font-normal ml-1">
//             (optional · max 4)
//           </span>
//         </label>
//         <div className="grid grid-cols-4 gap-2">
//           {photos.map((photo, index) => (
//             <div
//               key={index}
//               className="relative aspect-square rounded-xl overflow-hidden border border-th-border bg-th-input group hover:border-brand-500/30 transition-all"
//             >
//               <img
//                 src={photo.uploading ? photo.preview : photo.url}
//                 className="w-full h-full object-cover"
//                 alt={`Review photo ${index + 1}`}
//               />
//               {photo.uploading && (
//                 <div className="absolute inset-0 flex items-center justify-center bg-black/40">
//                   <Loader2 className="w-5 h-5 animate-spin text-white" />
//                 </div>
//               )}
//               {!photo.uploading && (
//                 <button
//                   onClick={() => removePhoto(index)}
//                   className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
//                 >
//                   <X className="w-3 h-3 text-white" />
//                 </button>
//               )}
//             </div>
//           ))}
          
//           {photos.length < 4 && (
//             <button
//               onClick={() => fileInputRef.current?.click()}
//               className="w-full aspect-square rounded-xl border-2 border-dashed border-th-border bg-th-input hover:border-brand-500/30 flex flex-col items-center justify-center gap-1 transition-all"
//             >
//               <div className="w-8 h-8 rounded-xl bg-brand-500/20 flex items-center justify-center">
//                 <Upload className="w-4 h-4 text-brand-400" />
//               </div>
//             </button>
//           )}
//         </div>
//       </div>

//       <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-green-500/10 border border-green-500/20 w-fit">
//         <CheckCircle2 className="w-4 h-4 text-green-400" />
//         <div>
//           <p className="text-xs font-medium text-green-400 leading-none">
//             Verified Experience
//           </p>
//           <p className="text-[11px] text-green-500/70 leading-tight mt-0.5">
//             Auto-verified for booked users
//           </p>
//         </div>
//       </div>

//       <button
//         onClick={handleSubmit}
//         disabled={submitting || submitted}
//         className="btn-primary w-full py-3.5 rounded-xl text-sm font-medium text-white inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {submitting ? (
//           <>
//             <Loader2 className="w-4 h-4 animate-spin" />
//             Submitting...
//           </>
//         ) : submitted ? (
//           <>
//             <CheckCircle2 className="w-4 h-4" />
//             Submitted
//           </>
//         ) : (
//           "Submit Review"
//         )}
//       </button>
      
//       <input
//         type="file"
//         ref={fileInputRef}
//         onChange={handlePhotoSelect}
//         accept="image/*"
//         multiple
//         className="hidden"
//       />
//     </div>
//   );
// }



"use client";

import { useState, useRef } from "react";
import {
  Star,
  Upload,
  X,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import StarRating from "./StarRating";
import { useAuth } from "../auth/AuthProvider";
import { useToast } from "../Toast";
import { uploadReviewPhoto } from "@/lib/storage";
import type { Review } from "@/lib/types";
import { adventures } from "@/lib/data";
import {
  doc,
  setDoc,
  serverTimestamp,
  getFirestore,
} from "firebase/firestore";

interface ReviewComposerProps {
  adventureId?: number;
  onSubmitted: () => void;
  onClose: () => void;
}

export default function ReviewComposer({
  adventureId,
  onSubmitted,
  onClose,
}: ReviewComposerProps) {
  const { user } = useAuth();
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [photos, setPhotos] = useState<
    { file: File; preview: string; url: string; uploading: boolean }[]
  >([]);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedAdventure, setSelectedAdventure] = useState<number | null>(adventureId || null);

  const targetAdventure = selectedAdventure
    ? adventures.find((a) => a.id === selectedAdventure)
    : null;

  const handlePhotoSelect = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []).slice(0, 4);
    for (const file of files) {
      const preview = URL.createObjectURL(file);
      setPhotos((prev) => [
        ...prev,
        { file, preview, url: "", uploading: true },
      ]);

      uploadReviewPhoto(file, selectedAdventure || 0)
        .then(({ url }) => {
          setPhotos((prev) =>
            prev.map((p) =>
              p.file === file ? { ...p, url, uploading: false } : p
            )
          );
        })
        .catch(() => {
          setPhotos((prev) =>
            prev.map((p) =>
              p.file === file ? { ...p, uploading: false } : p
            )
          );
          showToast("Failed to upload photo", "error");
        });
    }
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!user) {
      showToast("Sign in to write a review", "info");
      return;
    }
    if (!selectedAdventure) {
      showToast("Please select an adventure", "error");
      return;
    }
    if (rating === 0) {
      showToast("Please select a rating", "error");
      return;
    }
    if (!title.trim()) {
      showToast("Please add a title", "error");
      return;
    }
    if (!text.trim()) {
      showToast("Please write your experience", "error");
      return;
    }

    setSubmitting(true);

    try {
      const db = getFirestore();
      const reviewId = `rev_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

      const reviewDoc: Review = {
        id: reviewId,
        adventureId: selectedAdventure,
        userId: user.uid,
        userName: user.displayName || user.email?.split("@")[0] || "Anonymous",
        userPhoto: user.photoURL || "",
        userVerified: true,
        adventureName: targetAdventure?.name || "Unknown Adventure",
        rating,
        title: title.trim(),
        text: text.trim(),
        photos: photos.filter((p) => p.url).map((p) => p.url),
        helpfulCount: 0,
        reportCount: 0,
        status: "published",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      } as any;

      await setDoc(
        doc(db, "reviews", reviewId), 
        reviewDoc
      );

      setSubmitted(true);
      showToast("Review submitted! Thank you for sharing.", "success");

      setTimeout(() => {
        onSubmitted();
        onClose();
      }, 1500);
    } catch (error) {
      console.error("Error submitting review:", error);
      showToast("Failed to submit review. Try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-10 sm:py-12 px-4">
        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        </div>
        <p className="text-lg font-medium text-th-text">Review Submitted!</p>
        <p className="text-sm text-th-text-muted mt-1">Your experience helps others decide</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg sm:text-xl font-medium text-th-text flex items-center gap-2">
          <Star className="w-5 h-5 text-brand-400" />
          Write a Review
        </h3>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-lg bg-th-input flex items-center justify-center hover:bg-th-card-hover transition-all border border-th-border"
        >
          <X className="w-4 h-4 text-th-text-sub" />
        </button>
      </div>

      {/* Adventure Select */}
      <div>
        <label className="text-xs font-medium text-th-text-muted mb-1.5 block">
          Which adventure?
        </label>
        <select
          value={selectedAdventure || ""}
          onChange={(e) => setSelectedAdventure(Number(e.target.value))}
          className="w-full bg-th-input border border-th-border rounded-xl px-3.5 sm:px-4 py-3 text-sm text-th-text appearance-none cursor-pointer focus:outline-none focus:border-brand-500/50"
        >
          <option value="" className="bg-th-surface">
            Select an adventure...
          </option>
          {adventures.map((a) => (
            <option key={a.id} value={a.id} className="bg-th-surface">
              {a.name}
            </option>
          ))}
        </select>
      </div>

      {/* Rating */}
      <div>
        <label className="text-xs font-medium text-th-text-muted mb-1.5 block">
          Your Rating
        </label>
        <div className="flex items-center gap-3 sm:gap-4 p-3 rounded-xl bg-th-input border border-th-border">
          <StarRating rating={rating} onRate={setRating} size={24} smSize={28} />
          <span className="text-sm font-semibold text-th-text">
            {rating > 0 ? rating + ".0" : "Select rating"}
          </span>
        </div>
      </div>

      {/* Title */}
      <div>
        <label className="text-xs font-medium text-th-text-muted mb-1.5 block">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Summarize your experience..."
          className="w-full bg-th-input border border-th-border rounded-xl px-3.5 sm:px-4 py-3 text-sm text-th-text placeholder-th-text-faint focus:outline-none focus:border-brand-500/50"
          disabled={submitting}
        />
      </div>

      {/* Textarea */}
      <div>
        <label className="text-xs font-medium text-th-text-muted mb-1.5 block">
          Share your experience
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What was your experience like? Be specific — it helps others decide..."
          className="w-full bg-th-input border border-th-border rounded-xl px-3.5 sm:px-4 py-3 text-sm text-th-text placeholder-th-text-faint focus:outline-none focus:border-brand-500/50 resize-none h-28 sm:h-32"
          disabled={submitting}
        />
      </div>

      {/* Photo Upload */}
      <div>
        <label className="text-xs font-medium text-th-text-muted mb-2 block">
          Photos
          <span className="text-[11px] text-th-text-faint font-normal ml-1">
            (optional · max 4)
          </span>
        </label>
        
        {/* Changed to 3 columns on mobile, 4 on desktop for better touch targets */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-2.5">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-xl overflow-hidden border border-th-border bg-th-input group hover:border-brand-500/30 transition-all"
            >
              <img
                src={photo.uploading ? photo.preview : photo.url}
                className="w-full h-full object-cover"
                alt={`Review photo ${index + 1}`}
              />
              {photo.uploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                </div>
              )}
              {/* Made always visible on mobile, hover-only on desktop */}
              {!photo.uploading && (
                <button
                  onClick={() => removePhoto(index)}
                  className="absolute top-1 right-1 w-6 h-6 sm:w-5 sm:h-5 rounded-full bg-black/60 backdrop-blur flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3.5 h-3.5 sm:w-3 sm:h-3 text-white" />
                </button>
              )}
            </div>
          ))}
          
          {photos.length < 4 && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full aspect-square rounded-xl border-2 border-dashed border-th-border bg-th-input hover:border-brand-500/30 active:border-brand-500/50 flex flex-col items-center justify-center gap-1 transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-brand-500/20 flex items-center justify-center">
                <Upload className="w-4 h-4 text-brand-400" />
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Verified Badge */}
      <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-green-500/10 border border-green-500/20 w-fit">
        <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
        <div>
          <p className="text-xs font-medium text-green-400 leading-none">
            Verified Experience
          </p>
          <p className="text-[11px] text-green-500/70 leading-tight mt-0.5">
            Auto-verified for booked users
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={submitting || submitted}
        className="btn-primary w-full py-3.5 rounded-xl text-sm font-medium text-white inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition-transform"
      >
        {submitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Submitting...
          </>
        ) : submitted ? (
          <>
            <CheckCircle2 className="w-4 h-4" />
            Submitted
          </>
        ) : (
          "Submit Review"
        )}
      </button>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handlePhotoSelect}
        accept="image/*"
        multiple
        className="hidden"
      />
    </div>
  );
}