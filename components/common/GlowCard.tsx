import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlowCard({ children, className }: GlowCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-3xl border border-white/10",
        "bg-white/5 backdrop-blur-xl",
        "shadow-[0_0_40px_rgba(168,85,247,0.15)]",
        "transition-all duration-300",
        "hover:border-purple-500/30",
        "hover:shadow-[0_0_60px_rgba(168,85,247,0.25)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
