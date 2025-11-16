import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SkillBadgeProps {
  name: string;
  level?: "debutant" | "intermediaire" | "avance" | "expert" | "beginner" | "intermediate" | "advanced";
  category?: string;
}

const SkillBadge = ({ name, level = "intermediate", category }: SkillBadgeProps) => {
  const levelConfig: Record<string, any> = {
    debutant: {
      bg: "bg-muted hover:bg-muted/80",
      border: "border-muted-foreground/20",
      text: "text-muted-foreground",
      glow: "hover:shadow-[0_0_20px_rgba(150,150,150,0.3)]",
    },
    beginner: {
      bg: "bg-muted hover:bg-muted/80",
      border: "border-muted-foreground/20",
      text: "text-muted-foreground",
      glow: "hover:shadow-[0_0_20px_rgba(150,150,150,0.3)]",
    },
    intermediaire: {
      bg: "bg-secondary hover:bg-secondary/80",
      border: "border-secondary-foreground/30",
      text: "text-secondary-foreground",
      glow: "hover:shadow-[0_0_20px_rgba(120,120,255,0.4)]",
    },
    intermediate: {
      bg: "bg-secondary hover:bg-secondary/80",
      border: "border-secondary-foreground/30",
      text: "text-secondary-foreground",
      glow: "hover:shadow-[0_0_20px_rgba(120,120,255,0.4)]",
    },
    avance: {
      bg: "bg-primary/10 hover:bg-primary/20",
      border: "border-primary/40",
      text: "text-primary",
      glow: "hover:shadow-[0_0_25px_rgba(var(--primary),0.5)]",
    },
    advanced: {
      bg: "bg-primary/10 hover:bg-primary/20",
      border: "border-primary/40",
      text: "text-primary",
      glow: "hover:shadow-[0_0_25px_rgba(var(--primary),0.5)]",
    },
    expert: {
      bg: "bg-gradient-accent hover:opacity-90",
      border: "border-accent/50",
      text: "text-accent-foreground",
      glow: "hover:shadow-[0_0_30px_rgba(var(--accent),0.6)]",
    },
  };

  const config = levelConfig[level] || levelConfig.intermediaire;

  return (
    <Badge
      variant="outline"
      className={cn(
        "px-5 py-2.5 text-sm font-semibold transition-all duration-300 cursor-default",
        "hover:scale-110 hover:-translate-y-1",
        "active:scale-95",
        "border-2",
        config.bg,
        config.border,
        config.text,
        config.glow
      )}
    >
      {name}
    </Badge>
  );
};

export default SkillBadge;
