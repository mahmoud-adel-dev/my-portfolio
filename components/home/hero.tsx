import { ArrowDown, ArrowUpRight, Blocks, Bot, Database, Workflow } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { ProjectIcon } from "@/components/projects/project-icon";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { localePath, type Locale, type Translation } from "@/lib/i18n";

export function Hero({ locale, copy }: { locale: Locale; copy: Translation["hero"] }) {
  const stats =
    locale === "ar"
      ? [
          ["05", "دراسات حالة"],
          ["08", "مشاريع عامة"],
          ["AR / EN", "لغتان"],
        ]
      : [
          ["05", "Case studies"],
          ["08", "Public builds"],
          ["AR / EN", "Two languages"],
        ];

  return (
    <section className="hero-shell relative overflow-hidden border-b border-line">
      <HeroSystem />

      <div className="container-site relative z-10 flex min-h-[46rem] flex-col justify-center pt-28 pb-10 md:min-h-[48rem] md:pt-32">
        <div className="max-w-4xl">
          <div className="hero-enter mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-400">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <span>
              {locale === "ar"
                ? "متاح لبناء الأنظمة المؤسسية ومنصات الذكاء الاصطناعي"
                : "Available for AI SaaS & Enterprise Infrastructure"}
            </span>
          </div>

          <p className="eyebrow hero-enter flex flex-wrap items-center gap-3">
            {copy.disciplines.map((discipline, index) => (
              <span key={discipline} className="contents">
                {index > 0 ? <span aria-hidden="true" className="text-accent">/</span> : null}
                <span>{discipline}</span>
              </span>
            ))}
          </p>

          <h1 className="display-1 hero-enter hero-enter-delay-1 mt-7 text-balance">
            <span className="block text-fg">{copy.name}</span>
            <span className="mt-2 block max-w-4xl text-muted">{copy.role}</span>
          </h1>

          <p className="lede hero-enter hero-enter-delay-2 mt-7 max-w-2xl">
            {copy.lede}
          </p>

          <div className="hero-enter hero-enter-delay-3 mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href={`${localePath(locale)}#work`}>
              {copy.explore}
              <ArrowDown size={16} strokeWidth={1.7} />
            </ButtonLink>
            <ButtonLink href={site.github.url} variant="secondary" external>
              {copy.github}
              <ArrowUpRight size={16} strokeWidth={1.7} />
            </ButtonLink>
          </div>
        </div>

        <dl className="mt-14 grid max-w-2xl grid-cols-3 border-y border-line sm:max-w-xl">
          {stats.map(([value, label]) => (
            <div key={label} className="border-e border-line px-3 py-4 first:ps-0 last:border-e-0 sm:px-5">
              <dt className="font-mono text-sm font-semibold text-fg">{value}</dt>
              <dd className="mt-1 text-[11px] leading-tight text-faint sm:text-xs">{label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="relative z-10 border-t border-line bg-background/85">
        <div className="container-site flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:gap-8">
          <p className="eyebrow shrink-0">{copy.currentlyBuilding}</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2" aria-label={copy.activeProjectsLabel}>
            {projects.map((project) => (
              <li key={project.slug}>
                <a
                  href={localePath(locale, `projects/${project.slug}`)}
                  className="inline-flex items-center gap-2 text-xs font-medium text-muted transition-colors hover:text-accent"
                >
                  <ProjectIcon id={project.slug} size={13} className="size-6 border-line" />
                  {project.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function HeroSystem() {
  const nodes = [
    { icon: Blocks, label: "Products", className: "start-[12%] top-[16%]" },
    { icon: Bot, label: "AI", className: "end-[8%] top-[34%]" },
    { icon: Database, label: "Data", className: "start-[3%] bottom-[22%]" },
    { icon: Workflow, label: "Ops", className: "end-[22%] bottom-[10%]" },
  ];

  return (
    <div aria-hidden="true" className="hero-system pointer-events-none absolute inset-y-0 end-0 hidden w-[46%] lg:block">
      <span className="hero-line absolute start-[18%] end-[18%] top-1/2 h-px" />
      <span className="hero-line absolute start-1/2 top-[18%] bottom-[18%] w-px" />
      <span className="hero-core absolute start-1/2 top-1/2 flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <span className="font-mono text-lg font-semibold text-accent">MA</span>
      </span>
      {nodes.map(({ icon: Icon, label, className }) => (
        <span key={label} className={`hero-node absolute ${className}`}>
          <Icon size={18} strokeWidth={1.5} />
          <span>{label}</span>
        </span>
      ))}
    </div>
  );
}
