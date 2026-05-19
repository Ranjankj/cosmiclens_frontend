"use client";

import Link from "next/link";

import { Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl bg-black/20">
      <div className="max-w-300 mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center shadow-[0_0_40px_rgba(217,70,239,0.45)]">
            <Sparkles className="w-5 h-5 text-white" />
          </div>

          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              CosmicLens AI
            </h1>
          </div>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="
              hidden sm:block
              text-sm text-white/70
              hover:text-white
              transition
            "
          >
            Login
          </Link>

          <Link
            href="/register"
            className="
              h-12 px-6
              rounded-2xl
              bg-linear-to-r
              from-fuchsia-600
              to-purple-600
              hover:opacity-90
              transition-all
              flex items-center justify-center
              font-medium
              shadow-[0_0_40px_rgba(217,70,239,0.35)]
            "
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
