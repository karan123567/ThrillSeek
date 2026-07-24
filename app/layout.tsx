import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/Toast";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { WishlistProvider } from "@/components/wishlist/WishlistProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ThrillSeek — Adventure Marketplace",
  description: "Discover, book, and experience the world's most exciting outdoor adventures.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        {/* Theme: set before first paint to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem("thrillseek-theme");if(!t)t=window.matchMedia("(prefers-color-scheme:light)").matches?"light":"dark";document.documentElement.setAttribute("data-theme",t)})()`,
          }}
        />
        {/* Firebase SDK (required for phone auth reCAPTCHA) */}
        <script
          async
          src="https://www.google.com/recaptcha/api.js"
          defer
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <WishlistProvider>
            <ToastProvider>{children}</ToastProvider>
            </WishlistProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}