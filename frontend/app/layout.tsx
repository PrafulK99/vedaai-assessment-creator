import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VedaAI - Assessment Creator",
  description: "Create and manage assessments with AI",
  icons: {
    icon: "https://res.cloudinary.com/dgqapabyw/image/upload/v1779559976/ChatGPT_Image_May_23_2026_11_41_50_PM_knbyae.png",
    shortcut: "https://res.cloudinary.com/dgqapabyw/image/upload/v1779559976/ChatGPT_Image_May_23_2026_11_41_50_PM_knbyae.png",
    apple: "https://res.cloudinary.com/dgqapabyw/image/upload/v1779559976/ChatGPT_Image_May_23_2026_11_41_50_PM_knbyae.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${inter.className} h-full antialiased`}
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
