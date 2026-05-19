"use client";

import { useState } from "react";

import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  loading: boolean;
}

export default function ChatInput({ onSend, loading }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    onSend(message);

    setMessage("");
  };

  return (
    <div className="relative">
      <textarea
        rows={1}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask the universe anything..."
        className="
          w-full
          resize-none
          rounded-3xl
          border border-white/10
          bg-white/4
          backdrop-blur-xl
          px-6 py-5 pr-16
          text-white
          placeholder:text-white/40
          outline-none
          focus:border-purple-500/40
        "
      />

      <button
        onClick={handleSend}
        disabled={loading}
        className="
          absolute right-3 bottom-3
          w-11 h-11
          rounded-2xl
          bg-linear-to-r
          from-fuchsia-600
          to-purple-600
          flex items-center justify-center
          hover:scale-105
          transition
        "
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
  );
}
