import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";
import {
  BarChart3,
  Gamepad2,
  GraduationCap,
  MessageSquare,
  Network,
  Radio,
  ShoppingCart,
} from "lucide-react";
import { cn } from "@/lib/utils";

const icons: Record<string, ComponentType<LucideProps>> = {
  chatzi: MessageSquare,
  aidl: BarChart3,
  seals: Network,
  lumora: ShoppingCart,
  omnichannel: Radio,
  gaming: Gamepad2,
  student: GraduationCap,
};

export function ProjectIcon({
  id,
  className,
  size = 20,
}: {
  id: string;
  className?: string;
  size?: number;
}) {
  const Icon = icons[id] ?? Network;

  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-11 shrink-0 items-center justify-center border border-accent/35 bg-accent/8 text-accent transition-colors group-hover:border-accent group-hover:bg-accent/12",
        className,
      )}
    >
      <Icon size={size} strokeWidth={1.6} />
    </span>
  );
}
