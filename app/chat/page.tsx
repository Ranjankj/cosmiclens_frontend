"use client";

import { useEffect, useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import ReactMarkdown from "react-markdown";

import { Sparkles, LogOut, Plus, MoonStar } from "lucide-react";

import CosmicBackground from "@/components/common/CosmicBackground";

import AiOrb from "@/components/chat/AiOrb";
import ChatBubble from "@/components/chat/ChatBubble";
import ChatInput from "@/components/chat/ChatInput";

import {
  askAstrologyQuestion,
  getChatHistory,
  getTodayUsage,
} from "@/services/astrology.service";

import ProtectedRoute from "@/components/common/ProtectedRoute";

import { useAuth } from "@/providers/auth-provider";

interface Message {
  type: "user" | "ai";
  message: string;
}

interface ChatHistory {
  question: string;
  response: string;
  createdAt?: string;
}

export default function ChatPage() {
  const router = useRouter();

  const { logout } = useAuth();
  const { isAuthenticated, loading: authLoading } = useAuth();

  const [messages, setMessages] = useState<Message[]>([]);

  const [history, setHistory] = useState<ChatHistory[]>([]);

  const [loading, setLoading] = useState(false);

  const [selectedChat, setSelectedChat] = useState<number | null>(null);

  const [usage, setUsage] = useState({
    used: 0,
    limit: 5,
    remaining: 5,
  });

  useEffect(() => {
    if (authLoading || !isAuthenticated) {
      return;
    }

    fetchHistory();
    fetchUsage();
  }, [authLoading, isAuthenticated]);

  const fetchUsage = async () => {
    try {
      const response = await getTodayUsage();
      setUsage(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await getChatHistory();

      setHistory(response.data);

      const formattedMessages = response.data.flatMap((chat: ChatHistory) => [
        {
          type: "user",
          message: chat.question,
        },
        {
          type: "ai",
          message: chat.response,
        },
      ]);

      setMessages(formattedMessages);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSend = async (question: string) => {
    const updatedMessages = [
      ...messages,
      {
        type: "user" as const,
        message: question,
      },
    ];

    setMessages(updatedMessages);

    try {
      setLoading(true);

      const response = await askAstrologyQuestion(question);

      const aiMessage = {
        type: "ai" as const,
        message: response.data.response,
      };

      setMessages([...updatedMessages, aiMessage]);

      setHistory((prev) => [
        {
          question,
          response: response.data.response,
        },
        ...prev,
      ]);
    } catch (error: any) {
      alert(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const groupedHistory = useMemo(() => {
    return history.slice(0, 6);
  }, [history]);

  return (
    <ProtectedRoute>
      <main className="relative h-screen overflow-hidden bg-black text-white">
        <CosmicBackground />

        <div className="relative z-10 flex h-full">
          {/* SIDEBAR */}
          <aside className="hidden md:flex w-[320px] border-r border-white/10 bg-black/40 backdrop-blur-2xl flex-col">
            {/* Logo */}
            <div className="h-20 px-6 flex items-center border-b border-white/10">
              <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center shadow-[0_0_40px_rgba(217,70,239,0.45)]">
                <MoonStar className="w-5 h-5" />
              </div>

              <div className="ml-3">
                <h1 className="font-semibold text-lg">CosmicLens AI</h1>

                <p className="text-xs text-fuchsia-300">cosmic guide online</p>
              </div>
            </div>

            {/* New Chat */}
            <div className="p-5">
              <button
                onClick={() => {
                  setMessages([]);
                  setSelectedChat(null);
                }}
                className="
                  w-full h-14 rounded-2xl
                  bg-linear-to-r
                  from-fuchsia-600
                  to-purple-600
                  hover:opacity-90
                  transition-all
                  flex items-center justify-center gap-2
                  font-medium
                  shadow-[0_0_40px_rgba(217,70,239,0.35)]
                "
              >
                <Plus className="w-5 h-5" />
                New Conversation
              </button>
            </div>

            {/* History */}
            <div className="flex-1 overflow-y-auto px-5">
              <p className="text-xs tracking-[0.25em] text-white/30 uppercase mb-5">
                History
              </p>

              <div className="space-y-3">
                {groupedHistory.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedChat(index);

                      setMessages([
                        {
                          type: "user",
                          message: item.question,
                        },
                        {
                          type: "ai",
                          message: item.response,
                        },
                      ]);
                    }}
                    className={`
    w-full text-left
    rounded-2xl
    border transition
    px-4 py-4

    ${
      selectedChat === index
        ? "border-fuchsia-500/30 bg-fuchsia-500/10"
        : "border-white/5 bg-white/3 hover:bg-white/6"
    }
  `}
                  >
                    <p className="text-sm line-clamp-2">{item.question}</p>

                    <p className="mt-2 text-xs text-white/40">Cosmic reading</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-white/10">
              <div className="rounded-3xl border border-white/10 bg-white/4 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-white/70">
                    Today&apos;s Questions
                  </p>

                  <span className="text-sm font-semibold">
                    {usage.used}/{usage.limit}
                  </span>
                </div>

                <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-fuchsia-500 to-purple-500"
                    style={{ width: `${(usage.used / usage.limit) * 100}%` }}
                  />
                </div>

                <p className="mt-3 text-xs text-white/40">
                  {usage.remaining} cosmic whispers remain.
                </p>

                <button
                  onClick={() => {
                    logout();
                    router.replace("/login");
                  }}
                  className="
                    mt-5 w-full h-11
                    rounded-2xl
                    border border-white/10
                    bg-white/3
                    hover:bg-white/8
                    transition
                    flex items-center justify-center gap-2
                    text-sm
                  "
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </aside>

          {/* MAIN */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="h-20 border-b border-white/10 bg-black/20 backdrop-blur-2xl px-5 sm:px-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <AiOrb />

                <div>
                  <h2 className="font-semibold text-lg">Lyra</h2>

                  <p className="text-sm text-fuchsia-300">
                    your cosmic guide • online
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/4 text-sm text-white/60">
                <Sparkles className="w-4 h-4 text-fuchsia-400" />
                {usage.remaining} questions remaining
              </div>
            </div>

            {/* CHAT BODY */}
            <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-10">
              <div className="max-w-4xl mx-auto">
                {messages.length === 0 ? (
                  <div className="min-h-full flex flex-col items-center justify-center text-center pt-20">
                    <AiOrb />

                    <h1 className="mt-10 text-5xl sm:text-6xl font-bold tracking-tight leading-none">
                      Ask the{" "}
                      <span className="bg-linear-to-r from-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
                        stars
                      </span>
                    </h1>

                    <p className="mt-6 max-w-2xl text-white/55 text-lg leading-8">
                      Lyra reads your chart, your emotions, and your cosmic
                      patterns to reveal guidance tailored uniquely to your
                      soul.
                    </p>

                    {/* Suggested Prompts */}
                    <div className="mt-10 flex flex-wrap justify-center gap-3">
                      {[
                        "Will I succeed in my career?",
                        "What does my future look like?",
                        "How is my love life evolving?",
                        "What should I focus on this week?",
                      ].map((prompt) => (
                        <button
                          key={prompt}
                          onClick={() => handleSend(prompt)}
                          className="
                            px-5 py-3
                            rounded-2xl
                            border border-white/10
                            bg-white/4
                            hover:bg-white/8
                            transition
                            text-sm
                          "
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          message.type === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        {message.type === "user" ? (
                          <div className="max-w-2xl rounded-3xl bg-linear-to-r from-fuchsia-600/20 to-purple-600/20 border border-fuchsia-500/20 px-6 py-5">
                            <p className="leading-8 text-white/90">
                              {message.message}
                            </p>
                          </div>
                        ) : (
                          <div className="max-w-3xl rounded-3xl border border-white/10 bg-white/4 backdrop-blur-xl px-6 py-6">
                            <div className="prose prose-invert prose-p:leading-8 prose-headings:text-white prose-strong:text-fuchsia-300 max-w-none">
                              <ReactMarkdown>{message.message}</ReactMarkdown>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    {loading && (
                      <div className="flex items-center gap-3 text-white/50">
                        <div className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse" />
                        Cosmic energy is aligning...
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* INPUT */}
            <div className="border-t border-white/10 bg-black/20 backdrop-blur-2xl px-5 sm:px-8 py-5">
              <div className="max-w-4xl mx-auto">
                <ChatInput onSend={handleSend} loading={loading} />

                <p className="mt-4 text-center text-xs text-white/35">
                  Lyra weaves intuition with AI • 5 questions/day • midnight
                  refresh
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
