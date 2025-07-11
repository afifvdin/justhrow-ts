import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import { Navbar } from "./_components/navbar";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Justhrow",
  description: "Upload and forget",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        <main className="wrapper flex min-h-screen flex-col">
          <Navbar />
          {children}
          <Toaster position="top-center" />
        </main>
      </body>
    </html>
  );
}
