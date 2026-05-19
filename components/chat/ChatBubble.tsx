import GlowCard from "@/components/common/GlowCard";

interface ChatBubbleProps {
  type: "user" | "ai";
  message: string;
}

export default function ChatBubble({ type, message }: ChatBubbleProps) {
  const isUser = type === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <GlowCard
        className={`
          max-w-[90%] sm:max-w-2xl
          px-5 py-4
          ${
            isUser
              ? "bg-linear-to-r from-fuchsia-600/20 to-purple-600/20"
              : "bg-white/4"
          }
        `}
      >
        <p className="text-sm sm:text-base leading-8 text-white/85 whitespace-pre-wrap">
          {message}
        </p>
      </GlowCard>
    </div>
  );
}
