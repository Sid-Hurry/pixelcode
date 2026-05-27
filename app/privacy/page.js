"use client";

import Link from "next/link";
import { Shield } from "lucide-react";
import Footer from "../components/Footer";

export default function PrivacyPage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex-grow flex flex-col bg-zinc-50 text-zinc-900">
      
      {/* Page Header */}
      <section className="py-12 sm:py-16 px-6 sm:px-8 border-b border-zinc-200 bg-white w-full text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="p-2.5 bg-zinc-100 border border-zinc-200 rounded-md w-fit mb-4">
            <Shield className="h-5 w-5 text-zinc-900" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 leading-tight mb-2">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-md leading-relaxed">
            Last updated: May {currentYear}. Learn how PixelCode maintains 100% data security and user privacy.
          </p>
        </div>
      </section>

      {/* Main Privacy Body */}
      <section className="py-12 sm:py-16 px-6 sm:px-8 max-w-3xl mx-auto w-full flex-grow">
        <div className="flex flex-col gap-10 text-xs sm:text-sm leading-relaxed text-zinc-600">
          
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-bold text-zinc-900 tracking-tight">1. Zero Server-Side Data Collection</h2>
            <p>
              Your privacy is our core priority. Unlike typical SaaS tools, PixelCode does not employ database engines or remote servers to manage your code inputs. All text insertions, styling rendering, and image generation compile entirely locally within your web browser. No copy, text, snippet, or compiled screenshot is ever sent, transmitted, or stored on an external server. Your work is 100% private to your device.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-bold text-zinc-900 tracking-tight">2. Local Storage Usage</h2>
            <p>
              We may utilize standard HTML5 local storage (LocalStorage) on your local browser to save your styling preferences (e.g. your last selected theme, padding size, and canvas colors) so that your layout is preserved when you reload the page. This data remains securely contained within your local sandbox environment. No one else has access to this data, and you can clear it at any time by wiping your browser history.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-bold text-zinc-900 tracking-tight">3. Cookies Policy</h2>
            <p>
              PixelCode operates strictly without third-party tracking or advertising cookies. We do not place cookies on your system for behavioral profiling, re-marketing, or promotional distribution.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-bold text-zinc-900 tracking-tight">4. Third-Party Analytics</h2>
            <p>
              We do not integrate heavy third-party tracker scripts (such as Google Analytics or Facebook Pixels) to analyze your interactions. Any usage metrics we check are fully anonymous, aggregated, and compiled without tracking individual user sessions or exposing private IP addresses.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-bold text-zinc-900 tracking-tight">5. Absolute Data Protection</h2>
            <p>
              Because your code is never uploaded, there is zero risk of database breaches, server hacking, or data leaks. PixelCode is structurally designed to guarantee security. We encourage developers to style their secure API configurations, critical database credentials, or secret variables without fear of leakage.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-bold text-zinc-900 tracking-tight">6. Policy Updates</h2>
            <p>
              We may modify this privacy policy as we add features or adjust technical structures. Any update will be immediately recorded on this page. We suggest reviewing this page periodically to verify our ongoing commitment to 100% client-side privacy.
            </p>
          </div>

        </div>
      </section>

      {/* Global Footer */}
      <Footer />

    </div>
  );
}
