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

/**
 * Editorial section frame: hairline top rule, mono eyebrow with index,
 * asymmetric two-column heading grid on desktop.
 */
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
      <div className="container-site py-20 md:py-28">
        <header
          className={cn(
            "mb-12 grid gap-x-10 gap-y-4 md:mb-16 md:grid-cols-[11rem_1fr]",
          )}
        >
          <p className="eyebrow pt-2 md:text-end">
            {index ? `${index} / ` : ""}
            {eyebrow}
          </p>
          <div className="max-w-2xl">
            <Tag className="display-2 text-balance">{title}</Tag>
            {lead ? <p className="lede mt-5">{lead}</p> : null}
          </div>
        </header>
        {children}
      </div>
    </section>
  );
}
