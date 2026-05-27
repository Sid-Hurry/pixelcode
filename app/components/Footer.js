"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState("2026");

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="bg-white border-t border-zinc-200 py-8 px-6 sm:px-8 lg:px-12 mt-auto text-zinc-500 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Rights Reserved */}
        <div className="order-3 md:order-1 text-center md:text-left select-none text-zinc-400">
          © {currentYear} PixelCode. All rights reserved.
        </div>
        
        {/* Middle: Legal and Contact Links */}
        <div className="order-1 md:order-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-semibold">
          <Link href="/terms" className="text-zinc-500 hover:text-zinc-900 transition-colors">
            Terms & Conditions
          </Link>
          <Link href="/privacy" className="text-zinc-500 hover:text-zinc-900 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/contact" className="text-zinc-500 hover:text-zinc-900 transition-colors">
            Contact
          </Link>
        </div>

        {/* Right Side: Three Social Media Icons */}
        <div className="order-2 md:order-3 flex items-center gap-4">
          <a
            href="https://github.com/Sid-Hurry"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-zinc-900 transition-colors"
            aria-label="GitHub"
          >
            <svg className="h-[16px] w-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/siddharth-hooda-188606324/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-zinc-900 transition-colors"
            aria-label="LinkedIn"
          >
            <svg className="h-[16px] w-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <a
            href="mailto:siddharthhooda0013@gmail.com"
            className="text-zinc-400 hover:text-zinc-900 transition-colors"
            aria-label="Email"
          >
            <Mail className="h-4.5 w-4.5" />
          </a>
        </div>

      </div>
    </footer>
  );
}
