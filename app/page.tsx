import CosmicBackground from "@/components/common/CosmicBackground";

import Navbar from "@/components/common/Navbar";
import PublicRoute from "@/components/common/PublicRoute";

import Link from "next/link";

export default function Home() {
  return (
    <PublicRoute>
      <main className="relative min-h-screen overflow-hidden">
        <CosmicBackground />
        <div className="relative z-10">
          <Navbar />
          {/* HERO */}
          <section className="max-w-300 mx-auto px-6 pt-16 sm:pt-20 md:pt-24 pb-20">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 text-sm text-fuchsia-200 mb-8">
                ✨ AI-Powered Cosmic Guidance
              </div>

              {/* Heading */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[96px] font-bold tracking-tighter leading-[0.95]">
                Unlock Your{" "}
                <span className="bg-linear-to-r from-fuchsia-500 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Cosmic
                </span>
                <br />
                Intelligence
              </h1>

              {/* Description */}
              <p className="mt-8 text-lg sm:text-xl text-white/60 leading-9 max-w-2xl">
                Discover personalized astrology insights, emotional guidance,
                and AI-powered cosmic readings tailored uniquely to your soul.
              </p>

              {/* CTA */}
              {/* <div className="mt-10 flex flex-col sm:flex-row items-start gap-5">
              <Link
                href="/register"
                className="
                  h-14 px-8
                  rounded-2xl
                  bg-gradient-to-r
                  from-fuchsia-600
                  to-purple-600
                  hover:scale-[1.02]
                  transition-all
                  duration-300
                  shadow-[0_0_40px_rgba(217,70,239,0.35)]
                  flex items-center justify-center
                  font-medium
                "
              >
                Start Your Journey
              </Link>

              <Link
                href="/login"
                className="
                  h-14 px-8
                  rounded-2xl
                  border border-white/10
                  bg-white/[0.03]
                  backdrop-blur-xl
                  hover:bg-white/[0.06]
                  transition-all
                  flex items-center justify-center
                "
              >
                Continue Journey
              </Link>
            </div> */}
            </div>
          </section>
        </div>
      </main>
    </PublicRoute>
  );
}
