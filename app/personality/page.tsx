"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import CosmicBackground from "@/components/common/CosmicBackground";
import GlowCard from "@/components/common/GlowCard";

import { Button } from "@/components/ui/button";

import { getQuestions, submitAnswers } from "@/services/personality.service";
import { useAuth } from "@/providers/auth-provider";

interface Question {
  id: number;
  question: string;
}

export default function PersonalityPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [questions, setQuestions] = useState<Question[]>([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [answers, setAnswers] = useState<
    {
      question: string;
      answer: string;
    }[]
  >([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await getQuestions();

      setQuestions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAnswer = async (answer: string) => {
    const currentQuestion = questions[currentIndex];

    const updatedAnswers = [
      ...answers,
      {
        question: currentQuestion.question,
        answer,
      },
    ];

    setAnswers(updatedAnswers);

    // last question
    if (currentIndex === questions.length - 1) {
      try {
        login(localStorage.getItem("token") || "");
        setLoading(true);
        await submitAnswers(updatedAnswers);
        router.push("/userHome");
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }

      return;
    }

    setCurrentIndex((prev) => prev + 1);
  };

  const progress = ((currentIndex + 1) / questions.length) * 100;

  if (!questions.length) {
    return null;
  }

  return (
    <main className="relative min-h-screen overflow-hidden flex items-center justify-center px-6 py-12">
      <CosmicBackground />

      <div className="relative z-10 w-full max-w-3xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-white/60 mb-3">
            <span>Personality Analysis</span>

            <span>
              {currentIndex + 1}/{questions.length}
            </span>
          </div>

          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-linear-to-r from-fuchsia-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -30,
            }}
            transition={{
              duration: 0.35,
            }}
          >
            <GlowCard className="p-8 sm:p-12">
              <div className="inline-flex px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/10 text-sm text-purple-200 mb-8">
                ✨ AI Personality Reading
              </div>

              <h1 className="text-3xl sm:text-5xl font-bold leading-tight tracking-tight">
                {questions[currentIndex].question}
              </h1>

              <p className="mt-6 text-white/60 text-lg leading-8">
                Answer honestly to help our AI understand your emotional and
                cosmic patterns more deeply.
              </p>

              {/* Buttons */}
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button
                  onClick={() => handleAnswer("Yes")}
                  className="
                    h-14 rounded-2xl
                    bg-linear-to-r
                    from-fuchsia-600
                    to-purple-600
                    hover:opacity-90
                    text-base
                  "
                >
                  Yes
                </Button>

                <Button
                  onClick={() => handleAnswer("No")}
                  variant="outline"
                  className="
                    h-14 rounded-2xl
                    border-white/10
                    bg-white/5
                    hover:bg-white/10
                    text-base
                  "
                >
                  No
                </Button>
              </div>
            </GlowCard>
          </motion.div>
        </AnimatePresence>

        {/* Loading */}
        {/* FULLSCREEN LOADER */}
        <AnimatePresence>
        {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="
        fixed inset-0 z-50
        bg-black/80
        backdrop-blur-xl
        flex items-center justify-center
        px-6
      "
            >
              <div className="text-center">
                {/* Orb */}
                <div className="mx-auto mb-8">
                  <div className="relative w-24 h-24">
                    <div className="absolute inset-0 rounded-full bg-fuchsia-500/30 blur-2xl animate-pulse" />

                    <div
                      className="
                relative w-24 h-24 rounded-full
                border border-fuchsia-500/30
                bg-gradient-to-br
                from-fuchsia-500/20
                to-purple-500/20
                backdrop-blur-xl
                flex items-center justify-center
              "
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-400 to-purple-500 animate-pulse" />
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold">
                  Cosmira is analyzing your personality...
                </h2>

                <p className="mt-4 text-white/60 max-w-md leading-8">
                  Understanding your emotional patterns, relationship
                  tendencies, strengths, and cosmic personality traits.
                </p>
          </div>
            </motion.div>
        )}
        </AnimatePresence>
      </div>
    </main>
  );
}
