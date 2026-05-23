"use client";

import { useEffect, useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import ReactMarkdown from "react-markdown";

import {
  Sparkles,
  LogOut,
  Plus,
  MoonStar,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";

import CosmicBackground from "@/components/common/CosmicBackground";

import AiOrb from "@/components/chat/AiOrb";
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

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

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

      fetchUsage();
    } catch (error: any) {
      alert(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const groupedHistory = useMemo(() => {
    return history.slice(0, 8);
  }, [history]);

  return (
    <ProtectedRoute>
      <main className="relative h-screen overflow-hidden bg-black text-white">
        <CosmicBackground />

        <div className="relative z-10 flex h-full">
          {/* MOBILE SIDEBAR */}
          <div
            className={`
              fixed inset-0 z-50 lg:hidden transition-all duration-300
              ${mobileSidebarOpen ? "visible" : "invisible"}
            `}
          >
            {/* Overlay */}
            <div
              onClick={() => setMobileSidebarOpen(false)}
              className={`
                absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300
                ${mobileSidebarOpen ? "opacity-100" : "opacity-0"}
              `}
            />

            {/* Drawer */}
            <div
              className={`
                absolute left-0 top-0 h-full w-[290px]
                bg-black border-r border-white/10
                backdrop-blur-2xl
                transition-transform duration-300
                flex flex-col
                ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
              `}
            >
              {/* Header */}
              <div className="h-16 px-5 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center">
                    <MoonStar className="w-4 h-4" />
                  </div>

                  <div>
                    <h2 className="font-semibold">Cosmira</h2>

                    <p className="text-xs text-fuchsia-300">cosmic companion</p>
                  </div>
                </div>

                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="
                    w-9 h-9 rounded-xl
                    border border-white/10
                    bg-white/[0.04]
                    flex items-center justify-center
                  "
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* New Chat */}
              <div className="p-5">
                <button
                  onClick={() => {
                    setMessages([]);
                    setSelectedChat(null);

                    setMobileSidebarOpen(false);
                  }}
                  className="
                    w-full h-13 rounded-2xl
                    bg-gradient-to-r
                    from-fuchsia-600
                    to-purple-600
                    flex items-center justify-center gap-2
                    font-medium
                  "
                >
                  <Plus className="w-5 h-5" />
                  New Conversation
                </button>
              </div>

              {/* History */}
              <div className="flex-1 overflow-y-auto px-5">
                <p className="text-xs tracking-[0.25em] text-white/30 uppercase mb-5">
                  Recent Chats
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

                        setMobileSidebarOpen(false);
                      }}
                      className={`
                          w-full text-left rounded-2xl border px-4 py-4 transition
                          ${
                            selectedChat === index
                              ? "border-fuchsia-500/30 bg-fuchsia-500/10"
                              : "border-white/5 bg-white/[0.03]"
                          }
                        `}
                    >
                      <p className="text-sm line-clamp-2 leading-6">
                        {item.question}
                      </p>

                      <p className="mt-2 text-xs text-white/40">
                        Cosmic reading
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* DESKTOP SIDEBAR */}
          <aside className="hidden lg:flex w-[290px] border-r border-white/10 bg-black/40 backdrop-blur-2xl flex-col">
            {/* Logo */}
            <div className="h-18 px-5 flex items-center border-b border-white/10">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center shadow-[0_0_40px_rgba(217,70,239,0.45)]">
                <MoonStar className="w-4 h-4" />
              </div>

              <div className="ml-3">
                <h1 className="font-semibold text-base">Cosmira</h1>

                <p className="text-xs text-fuchsia-300">cosmic companion</p>
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
                  w-full h-13 rounded-2xl
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
                <Plus className="w-5 h-5" />
                New Conversation
              </button>
            </div>

            {/* History */}
            <div className="flex-1 overflow-y-auto px-5">
              <p className="text-xs tracking-[0.25em] text-white/30 uppercase mb-5">
                Recent Chats
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
                            : "border-white/5 bg-white/[0.03] hover:bg-white/[0.06]"
                        }
                      `}
                  >
                    <p className="text-sm line-clamp-2 leading-6">
                      {item.question}
                    </p>

                    <p className="mt-2 text-xs text-white/40">Cosmic reading</p>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* MAIN */}
          <div className="flex-1 flex flex-col">
            {/* HEADER */}
            <div className="sticky top-0 z-30 h-16 sm:h-20 border-b border-white/10 bg-black/40 backdrop-blur-2xl px-4 sm:px-8 flex items-center justify-between">
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                {/* Mobile Menu */}
                <button
                  onClick={() => setMobileSidebarOpen(true)}
                  className="
                    lg:hidden
                    h-10 w-10 rounded-xl
                    border border-white/10
                    bg-white/[0.04]
                    flex items-center justify-center
                    shrink-0
                  "
                >
                  <Menu className="w-4 h-4" />
                </button>

                {/* Back */}
                <button
                  onClick={() => router.push("/userHome")}
                  className="
                    h-10 w-10 rounded-xl
                    border border-white/10
                    bg-white/[0.04]
                    hover:bg-white/[0.08]
                    transition
                    flex items-center justify-center
                    shrink-0
                  "
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>

                {/* Orb */}
                <div className="scale-75 sm:scale-95">
                  <AiOrb />
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <h2 className="font-semibold text-base sm:text-lg truncate">
                    Cosmira
                  </h2>

                  <p className="text-xs sm:text-sm text-fuchsia-300 truncate">
                    your cosmic companion • online
                  </p>
                </div>
              </div>

              {/* Usage */}
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] text-sm text-white/60">
                <Sparkles className="w-4 h-4 text-fuchsia-400" />
                {usage.used}/{usage.limit} today
              </div>
            </div>

            {/* CHAT BODY */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 sm:py-10">
              <div className="max-w-4xl mx-auto">
                {messages.length === 0 ? (
                  <div className="min-h-full flex flex-col items-center justify-center text-center pt-10 sm:pt-16">
                    <div className="scale-90 sm:scale-100">
                      <AiOrb />
                    </div>

                    <h1 className="mt-8 text-4xl sm:text-6xl font-bold tracking-tight leading-none">
                      Ask the{" "}
                      <span className="bg-gradient-to-r from-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
                        stars
                      </span>
                    </h1>

                    <p className="mt-6 max-w-2xl text-white/55 text-base sm:text-lg leading-8">
                      Cosmira blends astrology, emotional intelligence, and AI
                      guidance to help you understand your emotions,
                      relationships, and future more clearly.
                    </p>

                    {/* Prompts */}
                    <div className="mt-10 flex flex-wrap justify-center gap-3">
                      {[
                        "Will I succeed in my career?",
                        "How is my love life evolving?",
                        "What should I focus on this week?",
                        "What energy surrounds me today?",
                      ].map((prompt) => (
                        <button
                          key={prompt}
                          onClick={() => handleSend(prompt)}
                          className="
                              px-5 py-3
                              rounded-2xl
                              border border-white/10
                              bg-white/[0.04]
                              hover:bg-white/[0.08]
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
                          <div className="max-w-[88%] sm:max-w-2xl rounded-3xl bg-gradient-to-r from-fuchsia-600/20 to-purple-600/20 border border-fuchsia-500/20 px-5 sm:px-6 py-4 sm:py-5">
                            <p className="leading-8 text-white/90 text-sm sm:text-base">
                              {message.message}
                            </p>
                          </div>
                        ) : (
                          <div className="max-w-[92%] sm:max-w-3xl rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl px-5 sm:px-6 py-5 sm:py-6">
                            <div className="prose prose-invert prose-p:leading-8 prose-headings:text-white prose-strong:text-fuchsia-300 max-w-none text-sm sm:text-base">
                              <ReactMarkdown>{message.message}</ReactMarkdown>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    {loading && (
                      <div className="flex items-center gap-3 text-white/50 text-sm">
                        <div className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse" />
                        Cosmira is reading your cosmic patterns...
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* INPUT */}
            <div className="border-t border-white/10 bg-black/20 backdrop-blur-2xl px-4 sm:px-8 py-4 pb-6">
              <div className="max-w-4xl mx-auto">
                <ChatInput onSend={handleSend} loading={loading} />

                <p className="mt-4 text-center text-xs text-white/35">
                  Cosmira blends intuition with AI • 5 questions/day • resets
                  daily
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
