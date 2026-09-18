import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";
import {
  BarChart3,
  Boxes,
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
  default: Boxes,
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
  const Icon = icons[id] ?? Boxes;

  return (
    <span
      aria-hidden="true"
      className={cn(
        "project-icon flex size-11 shrink-0 items-center justify-center border transition-colors",
        className,
      )}
    >
      <Icon size={size} strokeWidth={1.6} />
    </span>
  );
}
