import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  /** Two-digit index shown next to the eyebrow, e.g. "01". */
  index?: string;
  eyebrow: string;
  title: string;
  /** Optional supporting line, set in the right column of the heading grid. */
  lead?: string;
  children: ReactNode;
  className?: string;
  /** Heading level for the section title — h2 by default. */
  as?: "h2" | "h3";
};

export function Section({
  id,
  index,
  eyebrow,
  title,
  lead,
  children,
  className,
  as: Tag = "h2",
}: SectionProps) {
  return (
    <section id={id} className={cn("border-t border-line", className)}>
      <div className="container-site py-20 md:py-24 lg:py-28">
        <header
          className={cn(
            "mb-12 grid gap-x-10 gap-y-5 md:mb-14 md:grid-cols-[9rem_minmax(0,1fr)] lg:mb-16",
          )}
        >
          <p className="eyebrow flex items-center gap-2 pt-2 md:flex-col md:items-end md:text-end">
            {index ? `${index} / ` : ""}
            {eyebrow}
          </p>
          <div className="max-w-3xl">
            <Tag className="display-2 text-balance">{title}</Tag>
            {lead ? <p className="lede mt-5 max-w-2xl">{lead}</p> : null}
          </div>
        </header>
        {children}
      </div>
    </section>
  );
}
