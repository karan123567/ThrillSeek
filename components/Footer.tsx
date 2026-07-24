import { Mountain } from "lucide-react";

// --- Custom Brand SVG Icons ---
const Facebook = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Instagram = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Twitter = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Youtube = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

// --- Footer Data ---
const columns: Record<string, string[]> = {
  Explore: [
    "All Adventures",
    "Destinations",
    "Categories",
    "Last Minute Deals",
  ],
  Company: ["About Us", "Careers", "Blog", "Press Kit"],
  Support: ["Help Center", "Safety Policy", "Cancellation", "Contact Us"],
};

const socials = [Instagram, Twitter, Youtube, Facebook];

// --- Component ---
export default function Footer() {
  return (
    <footer className="py-16 border-t border-th-border-subtle bg-th-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-600 to-brand-500 flex items-center justify-center">
                <Mountain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold tracking-tighter text-th-text">
                Thrill<span className="text-brand-500">Seek</span>
              </span>
            </a>
            <p className="text-sm text-th-text-muted leading-relaxed max-w-sm mb-6">
              The world&apos;s most trusted adventure marketplace. Connecting
              thrill-seekers with verified experience providers since 2024.
            </p>
            <div className="flex gap-3">
              {socials.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-th-input flex items-center justify-center hover:bg-th-card-hover transition-colors"
                >
                  <Icon className="w-4 h-4 text-th-text-muted" />
                </a>
              ))}
            </div>
          </div>
          {Object.entries(columns).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-sm font-medium text-th-text mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-th-text-muted hover:text-brand-400 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-th-border-subtle flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-th-text-faint">
            © 2025 ThrillSeek. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-th-text-faint">
            <a
              href="#"
              className="hover:text-th-text-muted transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="hover:text-th-text-muted transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="hover:text-th-text-muted transition-colors"
            >
              Cookies
            </a>
            <span className="flex items-center gap-1.5 text-th-text-muted">
              Built with{" "}
              <svg
                width="14"
                height="14"
                viewBox="0 0 180 180"
                fill="none"
              >
                <mask
                  id="fmask"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="180"
                  height="180"
                >
                  <circle cx="90" cy="90" r="90" fill="black" />
                </mask>
                <g mask="url(#fmask)">
                  <circle cx="90" cy="90" r="90" fill="white" />
                  <path
                    d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
                    fill="black"
                  />
                  <rect
                    x="115"
                    y="54"
                    width="12"
                    height="72"
                    fill="black"
                  />
                </g>
              </svg>{" "}
              Next.js
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}