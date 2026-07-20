// import { ArrowRight, ArrowUpRight } from "lucide-react";

// export default function CTA() {
//   return (
//     <section className="py-24 relative overflow-hidden">
//       <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
//       <div className="absolute inset-0">
//         <img src="https://picsum.photos/seed/cta-adventure-bg/1920/600" className="w-full h-full object-cover opacity-15" alt="" />
//         <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]/80" />
//       </div>
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-brand-500/8 blur-[100px]" />
//       <div className="max-w-4xl mx-auto px-6 lg:px-12 relative text-center reveal-on-scroll">
//         <h2 className="text-4xl lg:text-6xl font-medium tracking-tighter mb-6">Ready for Your<br /><span className="gradient-text">Next Adventure?</span></h2>
//         <p className="text-lg text-neutral-400 font-light mb-10 max-w-xl mx-auto">Join 50,000+ adventurers who&apos;ve found their perfect thrill. Your next story starts here.</p>
//         <div className="flex flex-wrap gap-4 justify-center">
//           <a href="#adventures" className="btn-primary px-8 py-4 rounded-xl text-sm font-medium text-white inline-flex items-center gap-2">Start Exploring <ArrowRight className="w-4 h-4" /></a>
//           <a href="#adventures" className="btn-secondary px-8 py-4 rounded-xl text-sm font-medium text-neutral-300 inline-flex items-center gap-2">Become a Provider <ArrowUpRight className="w-4 h-4" /></a>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import ProviderModal from "./ProviderModal"; // Import your modal

export default function CTA() {
  const [isProviderModalOpen, setIsProviderModalOpen] = useState(false);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* ... background elements unchanged ... */}
      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative text-center reveal-on-scroll">
        <h2 className="text-4xl lg:text-6xl font-medium tracking-tighter mb-6">
          Ready for Your<br />
          <span className="gradient-text">Next Adventure?</span>
        </h2>
        <p className="text-lg text-neutral-400 font-light mb-10 max-w-xl mx-auto">
          Join 50,000+ adventurers who&apos;ve found their perfect thrill. Your next story starts here.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          {/* "Start Exploring" stays as a regular link */}
          <a
            href="#adventures"
            className="btn-primary px-8 py-4 rounded-xl text-sm font-medium text-white inline-flex items-center gap-2"
          >
            Start Exploring <ArrowRight className="w-4 h-4" />
          </a>

          {/* "Become a Provider" now opens the modal */}
          <button
            type="button"
            onClick={() => setIsProviderModalOpen(true)}
            className="btn-secondary px-8 py-4 rounded-xl text-sm font-medium text-neutral-300 inline-flex items-center gap-2 cursor-pointer"
          >
            Become a Provider <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Render the modal */}
      <ProviderModal
        isOpen={isProviderModalOpen}
        onClose={() => setIsProviderModalOpen(false)}
      />
    </section>
  );
}