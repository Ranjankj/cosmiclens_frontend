"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import CosmicBackground from "@/components/common/CosmicBackground";
import AuthCard from "@/components/auth/AuthCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerUser } from "@/services/auth.service";
import PublicRoute from "@/components/common/PublicRoute";

import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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

      const response = await registerUser(formData);

      localStorage.setItem("token", response.data.token);

      router.push("/profile");
    } catch (error: any) {
      alert(error?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicRoute>
      <main className="relative min-h-screen flex items-center justify-center px-6 py-10 overflow-hidden">
        <CosmicBackground />

        <div className="relative z-10 w-full flex justify-center">
          <AuthCard
            title="Begin Your Cosmic Journey"
            subtitle="Create your account and unlock AI-powered astrology insights tailored uniquely to your soul."
          >
            <div className="space-y-5">
              <Input
                placeholder="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="h-12 bg-white/5 border-white/10"
              />

              <Input
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="h-12 bg-white/5 border-white/10"
              />

              <Input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="h-12 bg-white/5 border-white/10"
              />

              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="
                w-full h-12 rounded-2xl
                bg-linear-to-r
                from-fuchsia-600
                to-purple-600
                hover:opacity-90
                text-white
              "
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </div>
            <div className="pt-2 text-center text-sm text-white/50">
              Already have an account?{" "}
              <Link
                href="/login"
                className="
                    text-purple-300
                    hover:text-purple-200
                    transition
                  "
              >
                Sign in
              </Link>
            </div>
          </AuthCard>
        </div>
      </main>
    </PublicRoute>
  );
}
