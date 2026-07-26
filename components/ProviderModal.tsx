// "use client";

// import { X } from "lucide-react";
// import ModalShell from "./ModalShell";
// import { useToast } from "./Toast";

// export default function ProviderModal({
//   isOpen,
//   onClose,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
// }) {
//   const { showToast } = useToast();
//   if (!isOpen) return null;

//   return (
//     <ModalShell onClose={onClose} size="md">
//       <div className="p-8">
//         <div className="flex items-center justify-between mb-6">
//           <h3 className="text-xl font-medium text-th-text">
//             Become a Provider
//           </h3>
//           <button
//             onClick={onClose}
//             className="w-8 h-8 rounded-lg bg-th-input flex items-center justify-center hover:bg-th-card-hover transition-all border border-th-border"
//           >
//             <X className="w-4 h-4 text-th-text-sub" />
//           </button>
//         </div>
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             onClose();
//             showToast(
//               "Application submitted! We'll review it within 48 hours.",
//               "success"
//             );
//           }}
//           className="space-y-4"
//         >
//           <div>
//             <label className="text-xs font-medium text-th-text-muted mb-1.5 block">
//               Business Name
//             </label>
//             <input
//               required
//               placeholder="e.g., Himalayan Adventures Co."
//               className="w-full bg-th-input border border-th-border rounded-xl px-4 py-3 text-sm text-th-text placeholder-th-text-faint focus:outline-none focus:border-brand-500/50 transition-colors"
//             />
//           </div>
//           <div>
//             <label className="text-xs font-medium text-th-text-muted mb-1.5 block">
//               Email
//             </label>
//             <input
//               type="email"
//               required
//               placeholder="you@company.com"
//               className="w-full bg-th-input border border-th-border rounded-xl px-4 py-3 text-sm text-th-text placeholder-th-text-faint focus:outline-none focus:border-brand-500/50 transition-colors"
//             />
//           </div>
//           <div>
//             <label className="text-xs font-medium text-th-text-muted mb-1.5 block">
//               What activities do you offer?
//             </label>
//             <textarea
//               required
//               rows={3}
//               placeholder="Trekking, rafting, camping..."
//               className="w-full bg-th-input border border-th-border rounded-xl px-4 py-3 text-sm text-th-text placeholder-th-text-faint focus:outline-none focus:border-brand-500/50 transition-colors resize-none"
//             />
//           </div>
//           <button
//             type="submit"
//             className="btn-primary w-full py-3.5 rounded-xl text-sm font-medium text-white"
//           >
//             Submit Application
//           </button>
//         </form>
//       </div>
//     </ModalShell>
//   );
// }


"use client";

import { useState } from "react";
import { X, Loader2, CheckCircle2, Mountain } from "lucide-react";
import ModalShell from "./ModalShell";
import { useToast } from "./Toast";
import { doc, setDoc, serverTimestamp, getFirestore } from "firebase/firestore";

export default function ProviderModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { showToast } = useToast();
  
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [activities, setActivities] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic Email Regex Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast("Please enter a valid email address", "error");
      return;
    }

    setSubmitting(true);

    try {
      const db = getFirestore();
      // Use email as document ID to prevent duplicate applications
      await setDoc(doc(db, "provider_applications", email), {
        businessName: businessName.trim(),
        email: email.toLowerCase().trim(),
        activities: activities.trim(),
        status: "pending", // Status for v1.0 manual review
        createdAt: serverTimestamp(),
      });

      setSubmitted(true);
      showToast("Application submitted! We'll review it within 48 hours.", "success");
      
      // Close modal after user sees success message
      setTimeout(() => {
        setSubmitted(false);
        setBusinessName("");
        setEmail("");
        setActivities("");
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error submitting application:", error);
      showToast("Failed to submit. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ModalShell onClose={onClose} size="md">
      <div className="p-5 sm:p-8">
        {submitted ? (
          /* --- Success State --- */
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-medium text-th-text mb-2">Application Received!</h3>
            <p className="text-sm text-th-text-muted max-w-xs mx-auto">
              Our team will review your details and get back to you at <span className="text-brand-400 font-medium">{email}</span> within 48 hours.
            </p>
          </div>
        ) : (
          /* --- Form State --- */
          <>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center">
                  <Mountain className="w-5 h-5 text-brand-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-th-text">
                  Become a Provider
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-lg bg-th-input flex items-center justify-center hover:bg-th-card-hover transition-all border border-th-border"
              >
                <X className="w-4 h-4 text-th-text-sub" />
              </button>
            </div>

            <p className="text-sm text-th-text-muted mb-6 -mt-2">
              Join thousands of operators growing their business on ThrillSeek.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-th-text-muted mb-1.5 block">
                  Business Name <span className="text-red-400">*</span>
                </label>
                <input
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g., Himalayan Adventures Co."
                  className="w-full bg-th-input border border-th-border rounded-xl px-3.5 sm:px-4 py-3 text-sm text-th-text placeholder-th-text-faint focus:outline-none focus:border-brand-500/50 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-th-text-muted mb-1.5 block">
                  Official Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full bg-th-input border border-th-border rounded-xl px-3.5 sm:px-4 py-3 text-sm text-th-text placeholder-th-text-faint focus:outline-none focus:border-brand-500/50 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-th-text-muted mb-1.5 block">
                  What activities do you offer? <span className="text-red-400">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={activities}
                  onChange={(e) => setActivities(e.target.value)}
                  placeholder="Trekking, rafting, paragliding..."
                  className="w-full bg-th-input border border-th-border rounded-xl px-3.5 sm:px-4 py-3 text-sm text-th-text placeholder-th-text-faint focus:outline-none focus:border-brand-500/50 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full py-3.5 rounded-xl text-sm font-medium text-white inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </ModalShell>
  );
}