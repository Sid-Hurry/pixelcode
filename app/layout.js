import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PixelCode — Turn Your Code Into Beautiful Screenshots",
  description:
    "A premium, minimalist code snippet to image generator for developers. Create elegant, high-resolution code screenshots for Instagram reels, LinkedIn, X, and blogs instantly.",
  keywords: [
    "code screenshot",
    "code to image",
    "carbon alternative",
    "ray.so alternative",
    "minimalist code editor",
    "share code online",
    "developer content creation",
  ],
  authors: [{ name: "PixelCode Team" }],
  openGraph: {
    title: "PixelCode — Turn Your Code Into Beautiful Screenshots",
    description:
      "A premium, minimalist code snippet to image generator for developers.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-900 selection:bg-zinc-200 selection:text-zinc-900">
        <Navbar />
        <main className="flex-1 flex flex-col pt-20">{children}</main>
      </body>

    </html>
  );
}


