import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Admin Panel | Mahmoud Adel Portfolio",
  description: "Management dashboard for visits, link clicks, session durations and project requests",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} dark`} data-theme="dark">
      <body className="min-h-screen bg-[#090a0c] text-[#e8ebed] antialiased selection:bg-[#ffb454] selection:text-[#241300]">
        {children}
      </body>
    </html>
  );
}
