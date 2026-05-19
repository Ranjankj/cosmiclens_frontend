"use client";

import { useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import CosmicBackground from "@/components/common/CosmicBackground";
import AuthCard from "@/components/auth/AuthCard";
import PublicRoute from "@/components/common/PublicRoute";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { loginUser } from "@/services/auth.service";

import { useAuth } from "@/providers/auth-provider";

export default function LoginPage() {
  const router = useRouter();

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
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

      const response = await loginUser(formData);

      // update global auth state
      login(response.data.token);

      router.replace("/chat");
    } catch (error: any) {
      alert(error?.response?.data?.message || "Login failed");
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
            title="Welcome Back"
            subtitle="Reconnect with your cosmic journey and continue exploring your destiny."
          >
            <div className="space-y-5">
              <Input
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="
                  h-12
                  bg-white/5
                  border-white/10
                  focus-visible:ring-purple-500/40
                "
              />

              <Input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="
                  h-12
                  bg-white/5
                  border-white/10
                  focus-visible:ring-purple-500/40
                "
              />

              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="
                  w-full
                  h-12
                  rounded-2xl
                  bg-linear-to-r
                  from-fuchsia-600
                  to-purple-600
                  hover:opacity-90
                  shadow-[0_0_40px_rgba(217,70,239,0.35)]
                  transition-all
                  duration-300
                "
              >
                {loading ? "Aligning Cosmic Energy..." : "Sign In"}
              </Button>

              <div className="pt-2 text-center text-sm text-white/50">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="
                    text-purple-300
                    hover:text-purple-200
                    transition
                  "
                >
                  Create one
                </Link>
              </div>
            </div>
          </AuthCard>
        </div>
      </main>
    </PublicRoute>
  );
}
