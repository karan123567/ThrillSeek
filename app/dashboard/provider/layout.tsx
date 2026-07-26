"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, MapPinned, CalendarCheck, Star, Wallet, 
  Settings, Menu, X, Mountain, LogOut, Loader2, ShieldAlert, UserCircle
} from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";

const sidebarLinks = [
  { href: "/dashboard/provider", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/provider/listings", label: "Listings", icon: MapPinned },
  { href: "/dashboard/provider/bookings", label: "Bookings", icon: CalendarCheck },
  { href: "/dashboard/provider/reviews", label: "Reviews", icon: Star },
  { href: "/dashboard/provider/payouts", label: "Payouts", icon: Wallet },
  { href: "/dashboard/provider/settings", label: "Settings", icon: Settings },
];

export default function ProviderDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // --- SECURITY GUARD ---
  // If they aren't logged in, or their role isn't 'provider', kick them out
  useEffect(() => {
    if (!loading && (!user || user.role !== "provider")) {
      router.push("/");
    }
  }, [user, loading, router]);

  // --- LOADING STATE ---
  // Show spinner while checking Firestore for the user's role
  if (loading) {
    return (
      <div className="min-h-screen bg-th-bg flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
      </div>
    );
  }

  // --- ACCESS DENIED STATE ---
  // Fallback just in case the redirect takes a second
  if (!user || user.role !== "provider") {
    return (
      <div className="min-h-screen bg-th-bg flex items-center justify-center p-4">
        <div className="text-center p-8 bg-th-card rounded-2xl border border-th-border max-w-sm w-full">
          <ShieldAlert className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-th-text mb-2">Access Denied</h2>
          <p className="text-sm text-th-text-muted mb-6">
            You do not have permission to view this page. You must be an approved provider.
          </p>
          <Link href="/" className="text-sm text-brand-500 hover:underline font-medium">
            Return to Main Site
          </Link>
        </div>
      </div>
    );
  }

  // --- SECURE DASHBOARD LAYOUT ---
  return (
    <div className="min-h-screen bg-th-bg flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-th-surface-alt border-r border-th-border z-50 
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:z-auto
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-th-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mountain className="w-6 h-6 text-brand-500" />
              <span className="font-semibold text-th-text tracking-tight">Provider CMS</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-th-text-muted">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive 
                      ? "bg-brand-500/10 text-brand-500" 
                      : "text-th-text-muted hover:bg-th-card-hover hover:text-th-text"
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* User Profile Card at Bottom */}
          <div className="p-4 border-t border-th-border">
            <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-th-card mb-3">
              <div className="w-9 h-9 rounded-full bg-brand-500/20 flex items-center justify-center shrink-0">
                <UserCircle className="w-5 h-5 text-brand-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-th-text truncate">
                  {user.displayName || "Provider"}
                </p>
                <p className="text-[11px] text-th-text-muted truncate">
                  {user.email}
                </p>
              </div>
            </div>
            
            <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-th-text-muted hover:bg-th-card-hover transition-colors">
              <LogOut className="w-5 h-5" />
              Back to Main Site
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 h-16 bg-th-bg/80 backdrop-blur-xl border-b border-th-border flex items-center px-4 sm:px-6 lg:px-8">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-th-input">
            <Menu className="w-5 h-5 text-th-text" />
          </button>
          <div className="ml-4 lg:ml-0">
            <h2 className="text-sm font-medium text-th-text">
              {sidebarLinks.find(l => l.href === pathname)?.label || "Dashboard"}
            </h2>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}