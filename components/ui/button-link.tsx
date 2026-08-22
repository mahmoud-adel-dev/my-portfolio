import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 font-medium transition-colors duration-150 select-none";

const variants = {
  primary: "bg-accent text-on-accent hover:bg-accent-strong px-5 py-3 text-sm",
  secondary:
    "border border-line-strong text-fg hover:border-fg/40 hover:bg-surface px-5 py-3 text-sm",
  ghost: "text-muted hover:text-fg px-1 py-1 text-sm",
} as const;

type ButtonLinkProps = {
  href: string;
  variant?: keyof typeof variants;
  /** Forces target="_blank" semantics (implied for absolute URLs). */
  external?: boolean;
  children: ReactNode;
  className?: string;
};

/** Anchor styled as a button; renders an <a> for external targets. */
export function ButtonLink({
  href,
  variant = "primary",
  external = false,
  children,
  className,
}: ButtonLinkProps) {
  const classes = cn(base, variants[variant], className);

  if (external || href.startsWith("http")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
