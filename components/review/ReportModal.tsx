
// "use client";

// import { useState } from "react";
// import { Flag, X } from "lucide-react";
// import ModalShell from "../ModalShell";
// import { useToast } from "../Toast";
// import { doc, updateDoc, getFirestore, getDoc } from "firebase/firestore";

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
//   const [confirmingReport, setConfirmingReport] = useState(false);

//   if (!isOpen) return null;

//   const handleReport = async () => {
//     setConfirmingReport(true);
//   };

//   const confirmReport = async () => {
//     try {
//       const db = getFirestore();
//       const reviewRef = doc(db, "reviews", adventureName, "reviews", reviewId);
      
//       // Get current document to read reportCount
//       const reviewSnap = await getDoc(reviewRef);
//       const currentReportCount = reviewSnap.data()?.reportCount || 0;
      
//       await updateDoc(reviewRef, {
//         reportCount: currentReportCount + 1,
//         status: "flagged",
//       });
      
//       setConfirmingReport(false);
//       onClose();
//       showToast("Report submitted. Our team will review it shortly.", "success");
//     } catch (error) {
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
//             <Flag className="w-5 h-5 text-red-400 fill-current" />
//             <span className="text-red-400 text-sm font-medium leading-none ml-2">
//               Report this review?
//             </span>
//           </div>
//           <button
//             onClick={onClose}
//             className="w-8 h-8 rounded-lg bg-th-input flex items-center justify-center hover:bg-red-500/20 transition-all border border-th-border"
//           >
//             <X className="w-4 h-4 text-red-400" />
//           </button>
//         </div>

//         {!confirmingReport ? (
//           <button
//             onClick={handleReport}
//             className="w-full mt-4 pt-3 border-t border-th-border-subtle flex items-center justify-center gap-2 px-4 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
//           >
//             <Flag className="w-4 h-4 text-red-400" />
//             Report
//           </button>
//         ) : (
//           <div className="mt-4 space-y-3">
//             <p className="text-sm text-th-text-secondary text-center">
//               Are you sure you want to report this review?
//             </p>
//             <div className="flex gap-2">
//               <button
//                 onClick={() => setConfirmingReport(false)}
//                 className="flex-1 px-4 py-2 text-sm text-th-text-secondary border border-th-border rounded-xl hover:bg-th-input transition-all"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmReport}
//                 className="flex-1 px-4 py-2 text-sm text-white bg-red-500 rounded-xl hover:bg-red-600 transition-all"
//               >
//                 Confirm Report
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </ModalShell>
//   );
// }


"use client";

import { useState } from "react";
import { Flag, X, AlertTriangle } from "lucide-react";
import ModalShell from "../ModalShell";
import { useToast } from "../Toast";
import { doc, updateDoc, getFirestore, getDoc } from "firebase/firestore";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviewId: string;
  reviewName?: string;
  userName?: string;
  adventureName?: string;
}

export default function ReportModal({
  isOpen,
  onClose,
  reviewId,
  reviewName,
  userName,
}: ReportModalProps) {
  const { showToast } = useToast();
  const [confirmingReport, setConfirmingReport] = useState(false);
  const [isReporting, setIsReporting] = useState(false);

  if (!isOpen) return null;

  const handleReport = async () => {
    setConfirmingReport(true);
  };

  const confirmReport = async () => {
    setIsReporting(true);
    try {
      const db = getFirestore();
      // FIXED: Changed to root collection path to match where reviews are actually saved
      const reviewRef = doc(db, "reviews", reviewId);
      
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
    } finally {
      setIsReporting(false);
    }
  };

  return (
    <ModalShell onClose={onClose} size="sm">
      {/* Responsive padding: tighter on very small screens */}
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-2.5 min-w-0"> {/* min-w-0 prevents text overflow */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
              <Flag className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 fill-current" />
            </div>
            <div className="min-w-0">
              <span className="text-red-400 text-sm sm:text-base font-medium leading-tight block">
                Report Review
              </span>
              {userName && (
                <span className="text-th-text-faint text-xs leading-tight block mt-0.5 truncate">
                  by {userName}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-th-input flex items-center justify-center hover:bg-red-500/20 transition-all border border-th-border shrink-0 ml-2"
          >
            <X className="w-4 h-4 text-th-text-sub" />
          </button>
        </div>

        {!confirmingReport ? (
          <div className="space-y-4">
            {/* Added context for better UX */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/10">
              <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-th-text-muted leading-relaxed">
                Reports are reviewed by our team. False reports may result in action against your account.
              </p>
            </div>

            <button
              onClick={handleReport}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-xl transition-all active:scale-[0.98]"
            >
              <Flag className="w-4 h-4" />
              Continue to Report
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-th-text-sub text-center px-2">
              Are you sure you want to flag this review{reviewName ? ` "${reviewName}"` : ""}?
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={() => setConfirmingReport(false)}
                disabled={isReporting}
                className="w-full px-4 py-3 text-sm font-medium text-th-text-sub border border-th-border rounded-xl hover:bg-th-input transition-all disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmReport}
                disabled={isReporting}
                className="w-full px-4 py-3 text-sm font-medium text-white bg-red-500 rounded-xl hover:bg-red-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isReporting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Reporting...
                  </>
                ) : (
                  "Yes, Report"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </ModalShell>
  );
}