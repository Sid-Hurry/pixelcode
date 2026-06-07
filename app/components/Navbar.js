"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsOpen(false);
    } else {
      window.location.href = `/#${id}`;
    }
  };

  const handleScrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    setIsOpen(false);
  };

  return (
    <nav
      style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e4e4e7" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? "py-3 shadow-xs" : "py-4.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" onClick={handleScrollToTop} className="flex items-center gap-2 group">
            <span className="font-bold text-xl tracking-tight text-zinc-900">
              Pixel<span className="text-zinc-500 font-medium">Code</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              onClick={handleScrollToTop}
              className="text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              Home
            </Link>
            <a
              href="#features"
              onClick={(e) => handleScrollTo(e, "features")}
              className="text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              Features
            </a>
            <a
              href="#examples"
              onClick={(e) => handleScrollTo(e, "examples")}
              className="text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              Examples
            </a>
            <a
              href="#faq"
              onClick={(e) => handleScrollTo(e, "faq")}
              className="text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              FAQ
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-1 text-zinc-500 hover:text-zinc-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-zinc-200 px-6 py-6 flex flex-col gap-4 shadow-md">
          <Link
            href="/"
            onClick={handleScrollToTop}
            className="text-sm font-semibold text-zinc-600 hover:text-zinc-900"
          >
            Home
          </Link>
          <a
            href="#features"
            onClick={(e) => handleScrollTo(e, "features")}
            className="text-sm font-semibold text-zinc-600 hover:text-zinc-900"
          >
            Features
          </a>
          <a
            href="#examples"
            onClick={(e) => handleScrollTo(e, "examples")}
            className="text-sm font-semibold text-zinc-600 hover:text-zinc-900"
          >
            Examples
          </a>
          <a
            href="#faq"
            onClick={(e) => handleScrollTo(e, "faq")}
            className="text-sm font-semibold text-zinc-600 hover:text-zinc-900"
          >
            FAQ
          </a>
        </div>
      )}
    </nav>
  );
}
