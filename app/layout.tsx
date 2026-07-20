import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/Toast";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ThrillSeek — Adventure Marketplace",
  description:
    "Discover, book, and experience the world's most exciting outdoor adventures.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem("thrillseek-theme");if(!t)t=window.matchMedia("(prefers-color-scheme:light)").matches?"light":"dark";document.documentElement.setAttribute("data-theme",t)})()`,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}