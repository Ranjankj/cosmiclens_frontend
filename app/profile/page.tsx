"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import CosmicBackground from "@/components/common/CosmicBackground";
import GlowCard from "@/components/common/GlowCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { createProfile } from "@/services/profile.service";

export default function ProfilePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    birthDate: "",
    birthTime: "",
    birthPlace: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await createProfile(formData);

      router.push("/personality");
    } catch (error: any) {
      alert(error?.response?.data?.message || "Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden flex items-center justify-center px-6 py-12">
      <CosmicBackground />

      <div className="relative z-10 w-full max-w-2xl">
        <GlowCard className="p-8 sm:p-10">
          {/* Heading */}
          <div>
            <div className="inline-flex px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/10 text-sm text-purple-200 mb-6">
              ✨ Cosmic Profile Setup
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight">
              Tell The Universe About Yourself
            </h1>

            <p className="mt-5 text-white/60 leading-7 max-w-xl">
              Your birth details help our AI astrologer generate deeply
              personalized cosmic guidance and emotional insights.
            </p>
          </div>

          {/* Form */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              placeholder="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="h-12 bg-white/5 border-white/10"
            />

            <Input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className="h-12 bg-white/5 border-white/10"
            />

            <Input
              type="time"
              name="birthTime"
              value={formData.birthTime}
              onChange={handleChange}
              className="h-12 bg-white/5 border-white/10"
            />

            <Input
              placeholder="Birth Place"
              name="birthPlace"
              value={formData.birthPlace}
              onChange={handleChange}
              className="h-12 bg-white/5 border-white/10"
            />
          </div>

          {/* CTA */}
          <div className="mt-10">
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="
                h-14 px-8 rounded-2xl
                bg-linear-to-r
                from-fuchsia-600
                to-purple-600
                hover:opacity-90
                shadow-[0_0_40px_rgba(217,70,239,0.35)]
              "
            >
              {loading ? "Analyzing Cosmic Energy..." : "Continue Journey"}
            </Button>
          </div>
        </GlowCard>
      </div>
    </main>
  );
}
