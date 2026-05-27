"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import Footer from "../components/Footer";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    
    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    }, 1200);
  };

  return (
    <div className="flex-grow flex flex-col bg-zinc-50 text-zinc-900">
      
      {/* Header */}
      <section className="py-12 sm:py-16 px-6 sm:px-8 border-b border-zinc-200 bg-white w-full text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="p-2.5 bg-zinc-100 border border-zinc-200 rounded-md w-fit mb-4">
            <Mail className="h-5 w-5 text-zinc-900" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 leading-tight mb-2">
            Contact Us
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-md leading-relaxed">
            Have questions, feedback, or custom feature requests for PixelCode? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Content Area */}
      <section className="py-12 sm:py-16 px-6 sm:px-8 max-w-md mx-auto w-full flex-grow flex flex-col justify-center">
        {isSubmitted ? (
          <div className="p-8 bg-white border border-zinc-200 rounded-xl text-center flex flex-col items-center gap-4 animate-in fade-in duration-300 shadow-xs">
            <CheckCircle2 className="h-10 w-10 text-emerald-600" />
            <h2 className="text-lg font-bold text-zinc-900">Message Transmitted</h2>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Thank you for contacting us! We've received your request and our team will get back to you shortly.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-3 px-4 h-9 rounded-md bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold transition-all cursor-pointer"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full bg-white border border-zinc-200 rounded-xl p-6 shadow-xs">
            
            {/* Name Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="developer"
                className="h-10 px-3 bg-zinc-50 border border-zinc-200 rounded-md text-xs text-zinc-800 placeholder:text-zinc-400 focus:border-zinc-400 outline-none w-full transition-all"
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@example.com"
                className="h-10 px-3 bg-zinc-50 border border-zinc-200 rounded-md text-xs text-zinc-800 placeholder:text-zinc-400 focus:border-zinc-400 outline-none w-full transition-all"
              />
            </div>

            {/* Message Textarea */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                Your Message
              </label>
              <textarea
                id="message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your suggestions or inquiries here..."
                rows={4}
                className="p-3 bg-zinc-50 border border-zinc-200 rounded-md text-xs text-zinc-800 placeholder:text-zinc-400 focus:border-zinc-400 outline-none w-full transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-10 w-full bg-zinc-900 hover:bg-zinc-800 text-white rounded-md text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-zinc-900"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
              {!isSubmitting && <Send className="h-3.5 w-3.5" />}
            </button>

          </form>
        )}
      </section>

      {/* Global Footer */}
      <Footer />

    </div>
  );
}
