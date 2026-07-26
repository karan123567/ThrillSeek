
// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation"; // Added for Provider routing
// import {
//   Mountain,
//   Search,
//   Heart,
//   Menu,
//   X,
//   LogIn,
//   LogOut,
//   LayoutDashboard, // Added for Provider icon
// } from "lucide-react";
// import { useToast } from "./Toast";
// import { useAuth } from "./auth/AuthProvider";
// import { useWishlist } from "./wishlist/WishlistProvider";
// import ThemeToggle from "./ThemeToggle";

// interface NavbarProps {
//   onOpenSearch: () => void;
//   onOpenProfile: () => void;
//   onOpenAuth: () => void;
//   onOpenWishlist: () => void;
// }

// export default function Navbar({
//   onOpenSearch,
//   onOpenProfile,
//   onOpenAuth,
//   onOpenWishlist,
// }: NavbarProps) {
//   const router = useRouter(); // Added router
//   const [scrolled, setScrolled] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const { showToast } = useToast();
//   const { user, logout, loading: authLoading } = useAuth();
//   const { count: wishlistCount } = useWishlist();

//   useEffect(() => {
//     const handler = () => setScrolled(window.scrollY > 80);
//     window.addEventListener("scroll", handler);
//     return () => window.removeEventListener("scroll", handler);
//   }, []);

//   useEffect(() => {
//     const handler = () => onOpenAuth();
//     window.addEventListener("open-auth", handler);
//     return () => window.removeEventListener("open-auth", handler);
//   }, [onOpenAuth]);

//   const links = [
//     { label: "Adventures", href: "#adventures" },
//     { label: "Destinations", href: "#destinations" },
//     { label: "Providers", href: "#providers" },
//     { label: "Reviews", href: "#reviews" },
//   ];

//   const closeMobile = () => setMobileOpen(false);

//   return (
//     <>
//       <nav
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
//           scrolled ? "glass-strong" : ""
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-4 lg:py-5 flex items-center justify-between gap-3">
//           {/* Logo */}
//           <a href="#" className="flex items-center gap-2 shrink-0">
//             <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-600 to-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/20">
//               <Mountain className="w-5 h-5 text-white" />
//             </div>
//             <span className="text-xl font-semibold tracking-tighter text-th-text hidden xs:inline">
//               Thrill<span className="text-brand-500">Seek</span>
//             </span>
//           </a>

//           {/* Desktop nav links */}
//           <div className="hidden lg:flex items-center gap-1">
//             {links.map((l) => (
//               <a
//                 key={l.href}
//                 href={l.href}
//                 className="px-4 py-2 text-sm text-th-text-sub hover:text-th-text transition-colors rounded-lg hover:bg-th-card-hover"
//               >
//                 {l.label}
//               </a>
//             ))}
//           </div>

//           {/* Right side buttons */}
//           <div className="flex items-center gap-2 sm:gap-3">
//             <ThemeToggle />

//             {/* Desktop search bar */}
//             <button
//               onClick={onOpenSearch}
//               className="hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-th-input border border-th-border text-sm text-th-text-sub hover:text-th-text hover:bg-th-card-hover transition-all min-w-[200px]"
//             >
//               <Search className="w-4 h-4 shrink-0" />
//               <span>Search...</span>
//               <kbd className="ml-auto px-1.5 py-0.5 text-[10px] bg-th-surface-alt rounded text-th-text-muted shrink-0">
//                 ⌘K
//               </kbd>
//             </button>

//             {/* Mobile search icon */}
//             <button
//               onClick={onOpenSearch}
//               className="lg:hidden w-10 h-10 rounded-xl bg-th-input border border-th-border flex items-center justify-center hover:bg-th-card-hover transition-all shrink-0"
//             >
//               <Search className="w-4 h-4 text-th-text-sub" />
//             </button>

//             {/* Wishlist — only when logged in */}
//             {user && !authLoading && (
//               <button
//                 onClick={onOpenWishlist}
//                 className="relative w-10 h-10 rounded-xl bg-th-input border border-th-border flex items-center justify-center hover:bg-th-card-hover transition-all shrink-0"
//               >
//                 <Heart className="w-4 h-4 text-th-text-sub" />
//                 {wishlistCount > 0 && (
//                   <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] rounded-full bg-brand-500 text-[9px] font-bold flex items-center justify-center text-white">
//                     {wishlistCount}
//                   </span>
//                 )}
//               </button>
//             )}

//             {/* ── PROVIDER CMS BUTTON ── */}
//             {/* Beautiful branded button, ONLY visible if role is 'provider' */}
//             {user?.role === "provider" && (
//               <button
//                 onClick={() => router.push("/dashboard/provider")}
//                 className="hidden sm:flex items-center gap-2 px-3 py-2.5 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-medium hover:bg-brand-500/20 hover:border-brand-500/40 transition-all shrink-0 active:scale-95"
//                 title="Provider Dashboard"
//               >
//                 <LayoutDashboard className="w-4 h-4 shrink-0" />
//                 {/* Text hidden on small-medium screens, shown on md+ */}
//                 <span className="hidden md:inline">Provider CMS</span>
//               </button>
//             )}

//             {/* ── LOGGED IN: User section ── */}
//             {user && !authLoading && (
//               <div className="flex items-center gap-1.5 sm:gap-2">
//                 {/* Profile button */}
//                 <button
//                   onClick={onOpenProfile}
//                   className="flex items-center gap-2 rounded-xl hover:bg-th-card-hover transition-all py-1 px-2 sm:px-3"
//                 >
//                   {user.photoURL ? (
//                     <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg overflow-hidden border border-th-border shrink-0 bg-th-surface-alt">
//                       <img
//                         src={user.photoURL}
//                         alt={user.displayName || "Profile"}
//                         className="w-full h-full object-cover"
//                         ref={(el) => {
//                           if (el && user.photoURL) {
//                             el.onerror = () => {
//                               el.style.display = "none";
//                               el.parentElement!.innerHTML = `<span class="w-full h-full flex items-center justify-center text-brand-400 text-xs font-bold bg-brand-500/20">${user.displayName?.charAt(0) || "U"}</span>`;
//                             };
//                           }
//                         }}
//                       />
//                     </div>
//                   ) : (
//                     <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-brand-500/20 flex items-center justify-center text-brand-400 text-xs sm:text-sm font-bold shrink-0 border border-th-border">
//                       {user.displayName?.charAt(0) || user.email?.charAt(0) || "U"}
//                     </div>
//                   )}
//                   <span className="hidden xs:inline sm:inline text-sm text-th-text-sub max-w-[60px] sm:max-w-[100px] truncate leading-tight">
//                     {user.displayName || user.email?.split("@")[0]}
//                   </span>
//                 </button>

//                 {/* Logout — hidden on small screens */}
//                 <button
//                   onClick={logout}
//                   className="hidden sm:flex w-10 h-10 rounded-xl bg-th-input border border-th-border items-center justify-center hover:bg-red-500/10 hover:border-red-500/30 transition-all group shrink-0"
//                   title="Sign out"
//                 >
//                   <LogOut className="w-4 h-4 text-th-text-sub group-hover:text-red-400 transition-colors" />
//                 </button>
//               </div>
//             )}

//             {/* ── LOGGED OUT: Sign In button ── */}
//             {!user && !authLoading && (
//               <button
//                 onClick={onOpenAuth}
//                 className="btn-primary px-3 sm:px-4 py-2.5 rounded-xl text-sm font-medium text-white inline-flex items-center gap-2 shrink-0"
//               >
//                 <LogIn className="w-4 h-4 shrink-0" />
//                 <span className="hidden xs:inline">Sign In</span>
//               </button>
//             )}

//             {/* Loading placeholder */}
//             {authLoading && (
//               <div className="w-10 h-10 rounded-xl bg-th-input border border-th-border animate-pulse shrink-0" />
//             )}

//             {/* Mobile hamburger */}
//             <button
//               onClick={() => setMobileOpen(!mobileOpen)}
//               className="lg:hidden w-10 h-10 rounded-xl bg-th-input border border-th-border flex items-center justify-center hover:bg-th-card-hover transition-all shrink-0"
//               aria-label="Menu"
//             >
//               {mobileOpen ? (
//                 <X className="w-4 h-4 text-th-text-sub" />
//               ) : (
//                 <Menu className="w-4 h-4 text-th-text-sub" />
//               )}
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* ── MOBILE MENU ── */}
//       {mobileOpen && (
//         <div className="lg:hidden fixed inset-x-0 top-[72px] bottom-0 z-40 overflow-y-auto scrollbar-hide">
//           <div
//             className="mx-3 sm:mx-4 mb-4 glass-strong rounded-2xl p-4 animate-slide-down"
//             onClick={(e) => {
//               if (e.target === e.currentTarget) closeMobile();
//             }}
//           >
//             {/* Nav links */}
//             {links.map((l) => (
//               <a
//                 key={l.href}
//                 href={l.href}
//                 onClick={closeMobile}
//                 className="flex items-center gap-3 px-4 py-3.5 text-sm text-th-text-sub hover:text-th-text hover:bg-th-card-hover rounded-xl transition-all"
//               >
//                 {l.label}
//               </a>
//             ))}

//             <div className="h-px bg-th-border-subtle mx-4 my-2" />

//             {user ? (
//               <>
//                 {/* User info card */}
//                 <div className="flex items-center gap-3 px-4 py-3">
//                   {user.photoURL ? (
//                     <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-th-border shrink-0 bg-th-surface-alt">
//                       <img
//                         src={user.photoURL}
//                         alt={user.displayName || "Profile"}
//                         className="w-full h-full object-cover"
//                         ref={(el) => {
//                           if (el && user.photoURL) {
//                             el.onerror = () => {
//                               el.style.display = "none";
//                               el.parentElement!.innerHTML = `<span class="w-full h-full flex items-center justify-center text-brand-400 text-lg font-bold bg-brand-500/20">${user.displayName?.charAt(0) || "U"}</span>`;
//                             };
//                           }
//                         }}
//                       />
//                     </div>
//                   ) : (
//                     <div className="w-12 h-12 rounded-xl bg-brand-500/20 flex items-center justify-center text-brand-400 text-lg font-bold shrink-0 border-2 border-th-border">
//                       {user.displayName?.charAt(0) || user.email?.charAt(0) || "U"}
//                     </div>
//                   )}
//                   <div className="min-w-0 flex-1">
//                     <p className="text-sm font-medium text-th-text truncate">
//                       {user.displayName || "User"}
//                     </p>
//                     <p className="text-xs text-th-text-muted truncate">
//                       {user.email}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Mobile Wishlist */}
//                 <button
//                   onClick={() => {
//                     onOpenWishlist();
//                     closeMobile();
//                   }}
//                   className="w-full flex items-center gap-3 px-4 py-3.5 text-sm text-th-text-sub hover:bg-th-card-hover rounded-xl transition-all"
//                 >
//                   <Heart className="w-4 h-4 shrink-0" />
//                   <span>Wishlist</span>
//                   {wishlistCount > 0 && (
//                     <span className="ml-auto text-xs bg-brand-500/20 text-brand-400 px-2.5 py-0.5 rounded-full font-medium">
//                       {wishlistCount}
//                     </span>
//                   )}
//                 </button>

//                 {/* ── MOBILE PROVIDER CMS BUTTON ── */}
//                 {user?.role === "provider" && (
//                   <button
//                     onClick={() => {
//                       router.push("/dashboard/provider");
//                       closeMobile();
//                     }}
//                     className="w-full flex items-center gap-3 px-4 py-3.5 text-sm text-brand-400 hover:bg-brand-500/10 rounded-xl transition-all font-medium"
//                   >
//                     <LayoutDashboard className="w-4 h-4 shrink-0" />
//                     <span>Provider Dashboard</span>
//                   </button>
//                 )}

//                 <div className="h-px bg-th-border-subtle mx-4 my-2" />

//                 {/* Sign out */}
//                 <button
//                   onClick={() => {
//                     logout();
//                     closeMobile();
//                   }}
//                   className="w-full flex items-center gap-3 px-4 py-3.5 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
//                 >
//                   <LogOut className="w-4 h-4 shrink-0" />
//                   <span>Sign Out</span>
//                 </button>
//               </>
//             ) : (
//               <button
//                 onClick={() => {
//                   onOpenAuth();
//                   closeMobile();
//                 }}
//                 className="w-full flex items-center gap-3 px-4 py-3.5 text-sm text-brand-400 hover:bg-brand-500/10 rounded-xl transition-all"
//               >
//                 <LogIn className="w-4 h-4 shrink-0" />
//                 <span>Sign In</span>
//               </button>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }



"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Mountain,
  Search,
  Heart,
  Menu,
  X,
  LogIn,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { useAuth } from "./auth/AuthProvider";
import { useWishlist } from "./wishlist/WishlistProvider";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenProfile: () => void;
  onOpenAuth: () => void;
  onOpenWishlist: () => void;
}

export default function Navbar({
  onOpenSearch,
  onOpenProfile,
  onOpenAuth,
  onOpenWishlist,
}: NavbarProps) {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout, loading: authLoading } = useAuth();
  const { count: wishlistCount } = useWishlist();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handler = () => onOpenAuth();
    window.addEventListener("open-auth", handler);
    return () => window.removeEventListener("open-auth", handler);
  }, [onOpenAuth]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const links = [
    { label: "Adventures", href: "#adventures" },
    { label: "Destinations", href: "#destinations" },
    { label: "Providers", href: "#providers" },
    { label: "Reviews", href: "#reviews" },
  ];

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/70 backdrop-blur-2xl border-b border-white/[0.04]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 h-16 lg:h-[72px] flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 shrink-0 group"
          >
            <Mountain className="w-6 h-6 text-white group-hover:text-brand-400 transition-colors" />
            <span className="text-lg font-semibold tracking-tight text-white hidden sm:block">
              Thrill<span className="text-brand-400">Seek</span>
            </span>
          </a>

          {/* Desktop links — uppercase, spaced, no pills */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[13px] font-medium text-white/50 hover:text-white transition-colors tracking-wide uppercase"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Right actions — bare icons, no borders */}
          <div className="flex items-center gap-0.5">
            <ThemeToggle />

            {/* Search */}
            <button
              onClick={onOpenSearch}
              className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-white transition-colors rounded-full hover:bg-white/5"
              aria-label="Search"
            >
              <Search className="w-[18px] h-[18px]" />
            </button>

            {/* Wishlist — logged in only */}
            {user && !authLoading && (
              <button
                onClick={onOpenWishlist}
                className="relative w-10 h-10 flex items-center justify-center text-white/40 hover:text-white transition-colors rounded-full hover:bg-white/5"
                aria-label="Wishlist"
              >
                <Heart className="w-[18px] h-[18px]" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 min-w-[14px] h-[14px] rounded-full bg-brand-500 text-[8px] font-bold flex items-center justify-center text-white leading-none px-1">
                    {wishlistCount}
                  </span>
                )}
              </button>
            )}

            {/* Provider CMS — pill style */}
            {user?.role === "provider" && (
              <button
                onClick={() => router.push("/dashboard/provider")}
                className="hidden md:flex items-center gap-2 ml-2 px-4 py-2 rounded-full bg-white/[0.08] text-white/60 text-xs font-medium hover:bg-white/[0.12] hover:text-white/80 transition-all"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                Dashboard
              </button>
            )}

            {/* ── Logged in: avatar + logout ── */}
            {user && !authLoading && (
              <div className="flex items-center gap-1 ml-1.5">
                <button
                  onClick={onOpenProfile}
                  className="rounded-full p-0.5 hover:bg-white/5 transition-all"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt=""
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-white/10"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = "none";
                        if (target.nextElementSibling)
                          target.nextElementSibling.classList.remove("hidden");
                      }}
                    />
                  ) : null}
                  {(!user.photoURL) && (
                    <div className="w-8 h-8 rounded-full bg-white/[0.08] ring-2 ring-white/10 flex items-center justify-center text-white text-xs font-bold">
                      {user.displayName?.charAt(0) || user.email?.charAt(0) || "U"}
                    </div>
                  )}
                  {/* Fallback if image fails */}
                  {user.photoURL && (
                    <div className="hidden w-8 h-8 rounded-full bg-white/[0.08] ring-2 ring-white/10 flex items-center justify-center text-white text-xs font-bold">
                      {user.displayName?.charAt(0) || "U"}
                    </div>
                  )}
                </button>
                <button
                  onClick={logout}
                  className="hidden sm:flex w-8 h-8 items-center justify-center text-white/20 hover:text-red-400 transition-colors rounded-full hover:bg-white/5"
                  title="Sign out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* ── Logged out: white pill CTA ── */}
            {!user && !authLoading && (
              <button
                onClick={onOpenAuth}
                className="ml-2 px-5 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors active:scale-[0.97]"
              >
                Sign In
              </button>
            )}

            {/* Loading */}
            {authLoading && (
              <div className="ml-2 w-8 h-8 rounded-full bg-white/[0.06] animate-pulse" />
            )}

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors rounded-full hover:bg-white/5 ml-0.5"
              aria-label="Menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE MENU — full-screen immersive ── */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-3xl"
            onClick={closeMobile}
          />

          {/* Content */}
          <div className="relative h-full flex flex-col px-6 sm:px-7 pt-20 pb-10 overflow-y-auto">
            {/* Large nav links */}
            <div className="flex flex-col">
              {links.map((l, i) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={closeMobile}
                  className="text-4xl sm:text-5xl font-semibold text-white/15 hover:text-white py-4 border-b border-white/[0.04] transition-all duration-300 animate-fade-in-up opacity-0 cursor-pointer"
                  style={{ animationDelay: `${i * 0.06}s` }}
                >
                  {l.label}
                </a>
              ))}
            </div>

            {/* Bottom section — pushed to bottom */}
            <div
              className="mt-auto pt-10 animate-fade-in-up opacity-0"
              style={{ animationDelay: "0.3s" }}
            >
              {user ? (
                <div className="flex flex-col">
                  {/* User card */}
                  <div className="flex items-center gap-3 px-1 py-4">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt=""
                        className="w-11 h-11 rounded-full object-cover ring-2 ring-white/10"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          if (e.currentTarget.nextElementSibling)
                            e.currentTarget.nextElementSibling.classList.remove(
                              "hidden"
                            );
                        }}
                      />
                    ) : null}
                    {(!user.photoURL) && (
                      <div className="w-11 h-11 rounded-full bg-white/[0.08] ring-2 ring-white/10 flex items-center justify-center text-white font-bold">
                        {user.displayName?.charAt(0) || "U"}
                      </div>
                    )}
                    {user.photoURL && (
                      <div className="hidden w-11 h-11 rounded-full bg-white/[0.08] ring-2 ring-white/10 flex items-center justify-center text-white font-bold">
                        {user.displayName?.charAt(0) || "U"}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white truncate">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-xs text-white/30 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {/* Wishlist row */}
                  <button
                    onClick={() => {
                      onOpenWishlist();
                      closeMobile();
                    }}
                    className="flex items-center justify-between px-1 py-3.5 text-sm text-white/40 hover:text-white transition-colors"
                  >
                    <span>Wishlist</span>
                    {wishlistCount > 0 && (
                      <span className="text-xs bg-white/[0.06] text-white/50 px-2.5 py-0.5 rounded-full">
                        {wishlistCount}
                      </span>
                    )}
                  </button>

                  {/* Provider row */}
                  {user?.role === "provider" && (
                    <button
                      onClick={() => {
                        router.push("/dashboard/provider");
                        closeMobile();
                      }}
                      className="flex items-center gap-2.5 px-1 py-3.5 text-sm text-brand-400/70 hover:text-brand-400 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Provider Dashboard</span>
                    </button>
                  )}

                  <div className="h-px bg-white/[0.04] my-2 mx-1" />

                  {/* Sign out */}
                  <button
                    onClick={() => {
                      logout();
                      closeMobile();
                    }}
                    className="flex items-center gap-2.5 px-1 py-3.5 text-sm text-red-400/50 hover:text-red-400 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                /* Logged out — big CTA */
                <button
                  onClick={() => {
                    onOpenAuth();
                    closeMobile();
                  }}
                  className="w-full py-3.5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors active:scale-[0.97]"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}