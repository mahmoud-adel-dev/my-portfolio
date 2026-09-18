"use client";

import { useState } from "react";
import { ArrowUpRight, Code2, FolderGit2, ShieldCheck, Sparkles, Terminal } from "lucide-react";
import { site } from "@/data/site";
import { localePath, type Locale } from "@/lib/i18n";

type RepoItem = {
  name: string;
  repo: string;
  category: "ai" | "enterprise" | "saas" | "all";
  tech: string[];
  descriptionEn: string;
  descriptionAr: string;
  caseStudySlug?: string;
  highlight?: string;
};

const repos: RepoItem[] = [
  {
    name: "enterprise-it-network-manager",
    repo: "enterprise-it-network-manager",
    category: "enterprise",
    tech: ["Next.js 16", ".NET 8 C#", "SNMP", "WFP", "SQLite WAL"],
    descriptionEn: "On-premises enterprise network & endpoint infrastructure manager with .NET 8 agent, switch topology discovery, and WFP quarantine.",
    descriptionAr: "منظومة إدارة شبكات ونقاط نهاية مؤسسية (On-Premises) مع عميل C# خفيف، كشف طوبولوجيا السويتشات، وعزل فوري للأجهزة.",
    caseStudySlug: "netmanager",
    highlight: "New Flagship",
  },
  {
    name: "newchatziv-ai-crm",
    repo: "newchatziv-ai-crm",
    category: "ai",
    tech: ["Next.js 15", "Mastra AI", "MongoDB", "Redis", "Hybrid RAG"],
    descriptionEn: "Multi-tenant enterprise AI customer engagement platform with omnichannel inbox, ticketing, and hybrid RAG knowledge base.",
    descriptionAr: "منصة مشاركة عملاء مؤسسية ذكية متعددة المستأجرين مع Hybrid RAG ووكلاء ذكاء اصطناعي وصندوق وارد موحد.",
    caseStudySlug: "chatzi",
  },
  {
    name: "multi-tenant-ai-data-analyzer",
    repo: "multi-tenant-ai-data-analyzer",
    category: "ai",
    tech: ["Python", "FastAPI", "Polars", "scikit-learn", "Next.js"],
    descriptionEn: "Deterministic Python analytics engine with AI explanation, provenance-tagged KPIs, and Zod-validated contracts.",
    descriptionAr: "منصة تحليلات بيانات حتمية بمحرك بايثون وشرح بالذكاء الاصطناعي مع قيود أمان صارمة وتتبع لمصدر كل رقم.",
    caseStudySlug: "aidl",
  },
  {
    name: "EGYMarket_B2B_FlutterAPP",
    repo: "EGYMarket_B2B_FlutterAPP",
    category: "saas",
    tech: ["Flutter", "Dart", "Next.js", "MongoDB Atlas", "Caddy"],
    descriptionEn: "B2B wholesale marketplace client (Flutter) and transactional Next.js backend with local payment rail reconciliation.",
    descriptionAr: "سوق جملة B2B مبني بـ Flutter و Next.js مع معاملات MongoDB وقنوات دفع محلية وحجز مسبق للمخزون.",
    caseStudySlug: "seals",
  },
  {
    name: "multi-tenant-ecommerce-erp",
    repo: "multi-tenant-ecommerce-erp",
    category: "saas",
    tech: ["Next.js 15", "shadcn/ui", "MongoDB", "Upstash Redis"],
    descriptionEn: "Multi-tenant commerce platform unifying online storefront, merchant dashboard, and cashier POS with barcode scanner.",
    descriptionAr: "منصة تجارة وعمليات وإدارة مخزون ونقاط بيع POS وطباعة فواتير حرارية مع عزل المستأجرين على الحافة.",
    caseStudySlug: "lumora",
  },
  {
    name: "OmniConnect-Hub-Smart-Knowledge-Base",
    repo: "OmniConnect-Hub-Smart-Knowledge-Base",
    category: "ai",
    tech: ["Next.js", "Socket.IO", "Qdrant", "Mastra", "MongoDB"],
    descriptionEn: "Realtime omnichannel hub with knowledge base and hybrid RAG vector search over Qdrant.",
    descriptionAr: "صندوق محادثات فوري متعدد القنوات وقاعدة معرفة متقدمة مع محرك بحث متجهي RAG عبر Qdrant.",
  },
  {
    name: "ps_sys",
    repo: "ps_sys",
    category: "saas",
    tech: ["Next.js", "TypeScript", "MongoDB", "Thermal Print"],
    descriptionEn: "Gaming café management and device session billing across multiple modes with thermal receipt printing.",
    descriptionAr: "نظام تشغيل ومحاسبة صالات الألعاب وحساب أوقات الجلسات متعددة الأنماط وإدارة الطلبات.",
  },
  {
    name: "aibotofline",
    repo: "aibotofline",
    category: "ai",
    tech: ["React", "SQL Server", "Ollama", "JWT"],
    descriptionEn: "Offline AI student assistant powered by local Ollama models and hardened SQL Server backend with Arabic RTL.",
    descriptionAr: "مساعد طالب ذكي يعمل دون اتصال بالإنترنت بنماذج Ollama وقاعدة بيانات SQL Server ومظهر عربي كامل.",
  },
  {
    name: "my-portfolio",
    repo: "my-portfolio",
    category: "enterprise",
    tech: ["Next.js 16", "React 19", "Tailwind v4", "TypeScript"],
    descriptionEn: "High-performance editorial portfolio with bilingual i18n, motion design, and self-hosted admin analytics.",
    descriptionAr: "البورتفوليو الهندسي الحالي المبني بأحدث معايير الويب مع دعم اللغتين وتحليلات مستقلة بالكامل.",
  },
];

export function GithubExplorer({ locale }: { locale: Locale }) {
  const [activeTab, setActiveTab] = useState<"all" | "ai" | "enterprise" | "saas">("all");
  const isAr = locale === "ar";

  const tabs = [
    { id: "all", label: isAr ? "جميع المستودعات (9)" : "All Repositories (9)" },
    { id: "ai", label: isAr ? "الذكاء الاصطناعي وRAG" : "AI & RAG Systems" },
    { id: "enterprise", label: isAr ? "الأنظمة والشبكات" : "Enterprise & Systems" },
    { id: "saas", label: isAr ? "منصات SaaS وتطبيقات الهاتف" : "SaaS & Mobile" },
  ] as const;

  const filtered = activeTab === "all" ? repos : repos.filter((r) => r.category === activeTab);

  return (
    <section className="border-t border-line bg-surface/30 py-20">
      <div className="container-site">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-accent">
              <FolderGit2 className="size-3.5" />
              <span>{isAr ? "المستودعات المفتوحة على GitHub" : "Public GitHub Ecosystem"}</span>
            </div>
            <h2 className="display-2 mt-2">
              {isAr ? "كافة الأنظمة والمشاريع البرمجية" : "Verified Public Repositories"}
            </h2>
            <p className="lede mt-3 max-w-2xl">
              {isAr
                ? "كل سطر برمجي ونظام معروض هنا موثق ومتاح في المستودعات العامة عبر حساب mahmoud-adel-dev على GitHub."
                : "Every architecture claim on this site is verifiable in public source code on GitHub with zero fabricated metrics."}
            </p>
          </div>

          <a
            href={site.github.url}
            target="_blank"
            rel="noopener noreferrer"
            data-track-click="true"
            data-track-label="Visit GitHub Profile"
            className="control-button shrink-0 gap-2 px-4 text-xs font-semibold"
          >
            <Code2 className="size-4" />
            <span>{isAr ? "زيارة الحساب على GitHub" : "View on GitHub"}</span>
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>

        {/* Filter tabs */}
        <div className="mt-10 flex flex-wrap gap-2 border-b border-line pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded px-3.5 py-1.5 font-mono text-xs transition-colors ${
                activeTab === tab.id
                  ? "bg-accent font-bold text-on-accent"
                  : "border border-line text-muted hover:border-line-strong hover:text-fg"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Repositories Grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <div
              key={item.name}
              className="group relative flex flex-col justify-between rounded-lg border border-line bg-surface/60 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:bg-surface hover:shadow-lg hover:shadow-accent/5"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Terminal className="size-4 text-accent" />
                    <a
                      href={`${site.github.url}/${item.repo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-track-click="true"
                      data-track-label={`Repo: ${item.name}`}
                      className="font-mono text-xs font-semibold text-fg transition-colors hover:text-accent"
                    >
                      {item.name}
                    </a>
                  </div>
                  {item.highlight ? (
                    <span className="rounded bg-accent/15 px-2 py-0.5 font-mono text-[10px] font-bold text-accent">
                      {item.highlight}
                    </span>
                  ) : null}
                </div>

                <p className="mt-3 text-xs leading-relaxed text-muted">
                  {isAr ? item.descriptionAr : item.descriptionEn}
                </p>
              </div>

              <div className="mt-5 border-t border-line/50 pt-4">
                <div className="flex flex-wrap gap-1.5">
                  {item.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-background px-2 py-0.5 font-mono text-[10px] text-faint"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between text-xs">
                  {item.caseStudySlug ? (
                    <a
                      href={localePath(locale, `projects/${item.caseStudySlug}`)}
                      className="inline-flex items-center gap-1 font-mono text-[11px] text-accent transition-colors hover:underline"
                    >
                      <Sparkles className="size-3" />
                      <span>{isAr ? "دراسة الحالة الكاملة" : "Full Case Study"}</span>
                    </a>
                  ) : (
                    <span className="font-mono text-[10px] text-faint">
                      {isAr ? "مستودع مباشر" : "Direct Repo"}
                    </span>
                  )}

                  <a
                    href={`${site.github.url}/${item.repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track-click="true"
                    data-track-label={`Code: ${item.name}`}
                    className="inline-flex items-center gap-1 text-muted transition-colors hover:text-fg"
                  >
                    <span>Code</span>
                    <ArrowUpRight className="size-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
