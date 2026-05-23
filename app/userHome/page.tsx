"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import {
  ArrowRight,
  LogOut,
  MoonStar,
  Sparkles,
  Brain,
  Heart,
  Briefcase,
} from "lucide-react";

import CosmicBackground from "@/components/common/CosmicBackground";

import ProtectedRoute from "@/components/common/ProtectedRoute";

import { useAuth } from "@/providers/auth-provider";

import { getMyProfile } from "@/services/home.service";

interface Profile {
  fullName: string;
  birthDate: string;
  birthPlace: string;
  birthTime: string;
  zodiacSign: string;

  personalitySummary: {
    corePersonality: string;
    emotionalTendencies: string;
    hiddenStrengths: string[];
    weaknesses: string[];
    relationshipStyle: string;
    careerEnergy: string;
    growthAdvice: string;
  };
}

export default function UserHomePage() {
  const router = useRouter();

  const { isAuthenticated, loading: authLoading, logout } = useAuth();

  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (authLoading || !isAuthenticated) {
      return;
    }

    fetchProfile();
  }, [authLoading, isAuthenticated]);

  const fetchProfile = async () => {
    try {
      const response = await getMyProfile();

      setProfile(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const calculateAge = (birthDate: string) => {
    const dob = new Date(birthDate);

    const diff = Date.now() - dob.getTime();

    const ageDate = new Date(diff);

    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  // wait for auth hydration
  if (authLoading) {
    return <div className="min-h-screen bg-black" />;
  }

  // wait for profile loading
  if (isAuthenticated && loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-5">
          <div className="w-12 h-12 rounded-full border-2 border-fuchsia-500/20 border-t-fuchsia-500 animate-spin" />

          <p className="text-sm text-white/50">
            Loading your cosmic profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <main className="relative min-h-screen overflow-hidden bg-black text-white">
        <CosmicBackground />

        {/* TOP NAV */}
        <div className="sticky top-0 z-30 border-b border-white/10 bg-black/30 backdrop-blur-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            {/* LEFT */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center shadow-[0_0_40px_rgba(217,70,239,0.35)]">
                <MoonStar className="w-5 h-5" />
              </div>

              <div>
                <h1 className="text-sm sm:text-base font-semibold">Cosmira</h1>

                <p className="text-[11px] text-fuchsia-300">
                  your cosmic identity
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <button
              onClick={() => {
                logout();

                router.replace("/login");
              }}
              className="
                h-10 px-4 rounded-xl
                border border-white/10
                bg-white/[0.04]
                hover:bg-white/[0.08]
                transition-all
                flex items-center gap-2
                text-sm
              "
            >
              <LogOut className="w-4 h-4" />

              <span className="hidden sm:block">Logout</span>
            </button>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
          {/* HERO */}
          <div className="rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl overflow-hidden">
            <div className="relative p-6 sm:p-10">
              {/* glow */}
              <div className="absolute top-0 right-0 w-60 h-60 bg-fuchsia-500/10 blur-[120px]" />

              <div className="relative z-10">
                {/* badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 text-xs text-fuchsia-200">
                  ✨ Personalized Cosmic Dashboard
                </div>

                {/* content */}
                <div className="mt-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
                  <div className="max-w-3xl">
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-none">
                      Welcome back,
                      <br />
                      <span className="bg-gradient-to-r from-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
                        {profile?.fullName}
                      </span>
                    </h1>

                    <p className="mt-5 text-sm sm:text-lg text-white/60 leading-8 max-w-2xl">
                      Your emotional patterns, cosmic energy, and personal
                      strengths are aligning beautifully. Explore deeper
                      insights and connect with Cosmira for personalized
                      guidance.
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/chat"
                      className="
                        h-13 px-6 rounded-2xl
                        bg-gradient-to-r
                        from-fuchsia-600
                        to-purple-600
                        hover:opacity-90
                        transition-all
                        flex items-center justify-center gap-2
                        font-medium
                        shadow-[0_0_40px_rgba(217,70,239,0.35)]
                      "
                    >
                      Talk With Cosmira
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
            {/* LEFT COLUMN */}
            <div className="space-y-6">
              {/* PROFILE CARD */}
              <div className="rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-6">
                <h2 className="text-lg font-semibold">Cosmic Profile</h2>

                <div className="space-y-5 mt-6">
                  {[
                    {
                      label: "Zodiac Sign",
                      value: profile?.zodiacSign,
                    },
                    {
                      label: "Age",
                      value: calculateAge(profile?.birthDate || ""),
                    },
                    {
                      label: "Birth Time",
                      value: profile?.birthTime,
                    },
                    {
                      label: "Birth Place",
                      value: profile?.birthPlace,
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-3"
                    >
                      <p className="text-sm text-white/40">{item.label}</p>

                      <p className="text-sm font-medium text-right">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* STRENGTHS */}
              <div className="rounded-[28px] border border-fuchsia-500/20 bg-fuchsia-500/5 backdrop-blur-2xl p-6">
                <h2 className="text-lg font-semibold text-fuchsia-300">
                  Hidden Strengths
                </h2>

                <div className="mt-5 flex flex-wrap gap-3">
                  {profile?.personalitySummary?.hiddenStrengths?.map(
                    (item, index) => (
                      <div
                        key={index}
                        className="
                          px-4 py-2 rounded-full
                          bg-fuchsia-500/10
                          border border-fuchsia-500/20
                          text-xs sm:text-sm
                        "
                      >
                        {item}
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* WEAKNESSES */}
              <div className="rounded-[28px] border border-red-500/20 bg-red-500/5 backdrop-blur-2xl p-6">
                <h2 className="text-lg font-semibold text-red-300">
                  Areas To Improve
                </h2>

                <div className="mt-5 flex flex-wrap gap-3">
                  {profile?.personalitySummary?.weaknesses?.map(
                    (item, index) => (
                      <div
                        key={index}
                        className="
                          px-4 py-2 rounded-full
                          bg-red-500/10
                          border border-red-500/20
                          text-xs sm:text-sm
                        "
                      >
                        {item}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="xl:col-span-2 space-y-6">
              {/* CORE PERSONALITY */}
              <div className="rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <Brain className="w-5 h-5 text-fuchsia-400" />

                  <h2 className="text-xl sm:text-2xl font-semibold">
                    Core Personality
                  </h2>
                </div>

                <p className="mt-5 text-white/70 leading-8 text-sm sm:text-lg">
                  {profile?.personalitySummary?.corePersonality}
                </p>
              </div>

              {/* INSIGHTS */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* RELATIONSHIP */}
                <div className="rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-6">
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-pink-400" />

                    <h2 className="text-lg font-semibold">
                      Relationship Energy
                    </h2>
                  </div>

                  <p className="mt-5 text-white/70 leading-8 text-sm">
                    {profile?.personalitySummary?.relationshipStyle}
                  </p>
                </div>

                {/* CAREER */}
                <div className="rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-6">
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-5 h-5 text-blue-400" />

                    <h2 className="text-lg font-semibold">Career Energy</h2>
                  </div>

                  <p className="mt-5 text-white/70 leading-8 text-sm">
                    {profile?.personalitySummary?.careerEnergy}
                  </p>
                </div>
              </div>

              {/* GROWTH */}
              <div className="rounded-[28px] border border-purple-500/20 bg-purple-500/5 backdrop-blur-2xl p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-purple-300" />

                  <h2 className="text-xl sm:text-2xl font-semibold text-purple-300">
                    Personal Growth Advice
                  </h2>
                </div>

                <p className="mt-6 text-white/75 leading-8 text-sm sm:text-lg">
                  {profile?.personalitySummary?.growthAdvice}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
