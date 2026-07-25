// "use client";

// import { Flag } from "lucide-react";
// import ModalShell from "../ModalShell";
// import { useToast } from "../Toast";

// interface ReportModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   reviewId: string;
//   reviewName: string;
//   userName: string;
//   adventureName: string;
// }

// export default function ReportModal({
//   isOpen,
//   onClose,
//   reviewId,
//   reviewName,
//   adventureName,
// }: ReportModalProps) {
//   const { showToast } = useToast();

//   if (!isOpen) return null;

//   const [confirmingReport, setConfirmingReport] = useState(false);

//   const handleReport = async () => {
//     setConfirmingReport(true);
//   };

//   const confirmReport = async () => {
//     try {
//       const { doc, updateDoc } = await import("firebase/firestore");
//       await updateDoc(
//         getFirestore(),
//         `reviews/${review.adventureId}/${reviewId}`,
//         {
//           reportCount: (await import("@firebase/firestore").count("reportCount") + 1,
//           status: (await import("@firebase/firestore").count("reportCount") > 0 ? "flagged" : "published",
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
//     <ModalShell onClose={onClose} size="sm">
//       <div className="p-6">
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-2">
//             <Flag className="w-5 h-5 text-red-400 fill="currentColor" />
//             <span className="text-red-400 text-sm font-medium leading-none ml-2">
//               Report this review?
//             </span>
//           </div>
//           <button
//             onClick={() => {
//               setShowMenu(!showMenu)}
//             className="w-8 h-8 rounded-lg bg-th-input flex items-center justify-center hover:bg-red-500/10 hover:bg-red-500/20 transition-all border border-th-border"
//           >
//             <X className="w-4 h-4 text-red-400" />
//           </button>
//         </div>
//         </div>
//         <div className="mt-4 pt-3 border-t border-t border-th-border-subtle flex items-center justify-center gap-2 px-4 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded-xl transition-all">
//             <Flag className="w-4 h-4 text-red-400" />
//             Report
//           </button>
//         </div>
//         <div className="mt-3 pt-3 border-t border-t border-th-border-subtle flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-xl transition-all">
//             <Flag className="w-3.5 h-3.5 text-red-400" />
//             Report
//           </button>
//         </div>
//       </div>
//     </ModalShell>
//   );
// }

"use client";

import { useState } from "react";
import { Flag, X } from "lucide-react";
import ModalShell from "../ModalShell";
import { useToast } from "../Toast";
import { doc, updateDoc, getFirestore, getDoc } from "firebase/firestore";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviewId: string;
  reviewName: string;
  userName: string;
  adventureName: string;
}

export default function ReportModal({
  isOpen,
  onClose,
  reviewId,
  reviewName,
  adventureName,
}: ReportModalProps) {
  const { showToast } = useToast();
  const [confirmingReport, setConfirmingReport] = useState(false);

  if (!isOpen) return null;

  const handleReport = async () => {
    setConfirmingReport(true);
  };

  const confirmReport = async () => {
    try {
      const db = getFirestore();
      const reviewRef = doc(db, "reviews", adventureName, "reviews", reviewId);
      
      // Get current document to read reportCount
      const reviewSnap = await getDoc(reviewRef);
      const currentReportCount = reviewSnap.data()?.reportCount || 0;
      
      await updateDoc(reviewRef, {
        reportCount: currentReportCount + 1,
        status: "flagged",
      });
      
      setConfirmingReport(false);
      onClose();
      showToast("Report submitted. Our team will review it shortly.", "success");
    } catch (error) {
      console.error("Error reporting review:", error);
      showToast("Failed to report. Try again.", "error");
      setConfirmingReport(false);
    }
  };

  return (
    <ModalShell onClose={onClose} size="sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Flag className="w-5 h-5 text-red-400 fill-current" />
            <span className="text-red-400 text-sm font-medium leading-none ml-2">
              Report this review?
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-th-input flex items-center justify-center hover:bg-red-500/20 transition-all border border-th-border"
          >
            <X className="w-4 h-4 text-red-400" />
          </button>
        </div>

        {!confirmingReport ? (
          <button
            onClick={handleReport}
            className="w-full mt-4 pt-3 border-t border-th-border-subtle flex items-center justify-center gap-2 px-4 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
          >
            <Flag className="w-4 h-4 text-red-400" />
            Report
          </button>
        ) : (
          <div className="mt-4 space-y-3">
            <p className="text-sm text-th-text-secondary text-center">
              Are you sure you want to report this review?
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmingReport(false)}
                className="flex-1 px-4 py-2 text-sm text-th-text-secondary border border-th-border rounded-xl hover:bg-th-input transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmReport}
                className="flex-1 px-4 py-2 text-sm text-white bg-red-500 rounded-xl hover:bg-red-600 transition-all"
              >
                Confirm Report
              </button>
            </div>
          </div>
        )}
      </div>
    </ModalShell>
  );
}