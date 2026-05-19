import GlowCard from "@/components/common/GlowCard";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <GlowCard className="w-full max-w-md p-8 sm:p-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>

        <p className="mt-3 text-white/60 text-sm leading-6">{subtitle}</p>
      </div>

      <div className="mt-8">{children}</div>
    </GlowCard>
  );
}
