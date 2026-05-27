"use client";

import Link from "next/link";
import { Terminal, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-100 border-t border-zinc-200 py-12 px-6 sm:px-8 lg:px-12 mt-auto text-zinc-600">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 pb-8 border-b border-zinc-200">
          
          {/* Logo and Tagline */}
          <div className="flex flex-col gap-3 max-w-sm">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="p-1.5 bg-zinc-200 border border-zinc-300 rounded-md group-hover:border-zinc-400 transition-colors">
                <Terminal className="h-4 w-4 text-zinc-900" />
              </div>
              <span className="font-bold text-base tracking-tight text-zinc-900">
                Pixel<span className="text-zinc-500 font-medium">Code</span>
              </span>
            </Link>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Create premium, high-resolution code screenshots for your portfolios, blogs, and developer content instantly.
            </p>
          </div>

          {/* Nav Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-16">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Product</span>
              <Link href="/" className="text-xs text-zinc-600 hover:text-zinc-900 transition-colors">
                Editor Studio
              </Link>
              <Link href="/#examples" className="text-xs text-zinc-600 hover:text-zinc-900 transition-colors">
                Examples
              </Link>
              <Link href="/#features" className="text-xs text-zinc-600 hover:text-zinc-900 transition-colors">
                Features
              </Link>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Legal</span>
              <Link href="/terms" className="text-xs text-zinc-600 hover:text-zinc-900 transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-xs text-zinc-600 hover:text-zinc-900 transition-colors">
                Privacy Policy
              </Link>
            </div>

            <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Company</span>
              <Link href="/contact" className="text-xs text-zinc-600 hover:text-zinc-900 transition-colors">
                Contact
              </Link>
              <a href="mailto:support@pixelcode.com" className="text-xs text-zinc-600 hover:text-zinc-900 transition-colors">
                Support
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Area */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-[11px] text-zinc-500">
          <p>© {currentYear} PixelCode. All rights reserved. Made for developers.</p>
          
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/placeholder/pixelcode"
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
              href="https://linkedin.com/in/placeholder"
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
              href="mailto:hello@placeholder.com"
              className="text-zinc-400 hover:text-zinc-900 transition-colors"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
