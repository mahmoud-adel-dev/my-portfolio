import type { Project } from "@/data/projects";
import type { Locale } from "@/lib/i18n";
import {
  EntryHighlights,
  EntryIndex,
  EntryLinks,
  EntrySummary,
  EntryTitle,
} from "@/components/projects/pieces";

const visualCopy = {
  en: {
    channelsLabel: "Channels",
    channels: ["Live chat", "WhatsApp", "Messenger", "Instagram", "Telegram", "Email"],
    inbox: "Unified inbox & routing",
    crm: "CRM · Tickets · Pipeline",
    ai: "AI agents · Hybrid RAG",
    foundation: "MongoDB · Redis · Queues & workers · Stripe billing",
  },
  ar: {
    channelsLabel: "القنوات",
    channels: ["محادثة مباشرة", "WhatsApp", "Messenger", "Instagram", "Telegram", "البريد"],
    inbox: "صندوق وارد موحد وتوجيه",
    crm: "CRM · تذاكر · مسار مبيعات",
    ai: "وكلاء ذكيون · Hybrid RAG",
    foundation: "MongoDB · Redis · طوابير وعمال · فوترة Stripe",
  },
} as const;

/** Composition 01 — platform stack: content column + condensed architecture. */
export function ChatziEntry({ project, locale }: { project: Project; locale: Locale }) {
  const copy = visualCopy[locale];

  return (
    <article className="border-t border-line py-14 md:py-20">
      <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_21rem]">
        <div>
          <EntryIndex project={project} />
          <EntryTitle
            slug={project.slug}
            title={project.title}
            positioning={project.positioning}
          />
          <EntrySummary>{project.summary}</EntrySummary>
          <EntryHighlights items={project.highlights.slice(0, 4)} />
          <EntryLinks slug={project.slug} repository={project.repository} />
        </div>

        {/* Condensed platform diagram — decorative abstraction of the real one */}
        <div aria-hidden="true" className="hidden lg:block">
          <div className="flex h-full flex-col justify-center gap-3 font-mono text-[10px] uppercase tracking-[0.12em] text-faint">
            <div className="border border-line px-4 py-3">
              <p className="mb-2">{copy.channelsLabel}</p>
              <div className="flex flex-wrap gap-1.5">
                {copy.channels.map((channel) => (
                  <span
                    key={channel}
                    className="border border-line px-2 py-1 text-muted"
                  >
                    {channel}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-center text-line-strong">↓</p>

            <div className="border border-line bg-surface px-4 py-3 text-muted">
              {copy.inbox}
            </div>

            <div className="flex gap-3">
              <div className="flex-1 border border-line px-4 py-3 text-muted">
                {copy.crm}
              </div>
              <div className="flex-1 border border-accent/50 px-4 py-3 text-accent">
                {copy.ai}
              </div>
            </div>

            <p className="text-center text-line-strong">↓</p>

            <div className="px-1 leading-relaxed">
              {copy.foundation}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
