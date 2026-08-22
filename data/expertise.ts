/**
 * Homepage content: capabilities, stack by responsibility, engineering
 * philosophy and about copy. Every technology listed is confirmed by the
 * public repositories on github.com/mahmoud-adel-dev.
 */

import type { Locale } from "@/lib/i18n";

export type Capability = {
  title: string;
  description: string;
  points: string[];
};

export const capabilities: Capability[] = [
  {
    title: "AI Systems",
    description:
      "AI built into product workflows — grounded in real data, constrained by contracts, never left to improvise numbers.",
    points: [
      "Hybrid RAG pipelines",
      "AI agents (Mastra, OpenAI-compatible)",
      "Enterprise knowledge bases & embeddings",
      "Deterministic analytics with AI explanation",
      "Local LLM integration (Ollama)",
    ],
  },
  {
    title: "SaaS Architecture",
    description:
      "Multi-tenant platforms designed so isolation, billing and permissions are structural — not bolted on later.",
    points: [
      "Tenant & organization isolation",
      "RBAC with multi-level roles",
      "Plans, quotas & usage ledgers",
      "Subscriptions & billing flows",
      "Feature flags & workspaces",
    ],
  },
  {
    title: "Full-Stack Engineering",
    description:
      "Complete products across web, mobile and API surfaces — typed end to end, from schema to interface.",
    points: [
      "Next.js App Router & React 19",
      "TypeScript in strict mode",
      "REST APIs & server-side validation (Zod)",
      "Flutter applications",
      "Real-time systems (Socket.IO)",
    ],
  },
  {
    title: "Infrastructure & Production",
    description:
      "Systems that survive contact with production: observable, recoverable, and documented well enough to operate.",
    points: [
      "Docker & Docker Compose",
      "MongoDB transactions & replica sets",
      "Redis caching & rate limiting",
      "Caddy / Nginx reverse proxies",
      "CI pipelines & PM2 orchestration",
    ],
  },
];

export type StackGroup = {
  label: string;
  note: string;
  items: string[];
};

export const stackGroups: StackGroup[] = [
  {
    label: "Interface",
    note: "Web, admin and mobile clients",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Flutter"],
  },
  {
    label: "Backend",
    note: "APIs, auth and domain logic",
    items: ["Node.js", "Express", "Python / FastAPI", "NextAuth", "Zod"],
  },
  {
    label: "Data",
    note: "Persistence, cache and search",
    items: ["MongoDB", "Mongoose", "SQL", "Redis", "Qdrant (vector search)"],
  },
  {
    label: "AI",
    note: "Retrieval, agents and guardrails",
    items: [
      "Hybrid RAG",
      "AI agents",
      "Embeddings & semantic search",
      "Mastra",
      "OpenAI-compatible APIs",
    ],
  },
  {
    label: "Infrastructure",
    note: "Deployment and operations",
    items: ["Docker", "Linux", "Nginx", "Caddy", "PM2", "GitHub Actions CI"],
  },
];

export type Principle = {
  title: string;
  detail: string;
};

export const principles: Principle[] = [
  {
    title: "Architecture before abstraction",
    detail:
      "Decide tenancy, boundaries and data flow before writing features. A clear control plane and compute plane is worth more than any clever pattern applied late.",
  },
  {
    title: "Deterministic where it matters",
    detail:
      "When output must be correct — analytics, money, inventory — computation belongs to deterministic code with provenance. AI explains verified results; it does not invent them.",
  },
  {
    title: "Isolation is a feature",
    detail:
      "Multi-tenancy is only real when every query, queue job and API key is scoped by tenant. Permissions are checked server-side, every time.",
  },
  {
    title: "Production before demos",
    detail:
      "Background jobs that retry, health endpoints, audit logs, backups and runbooks are part of the product — not cleanup for after the demo works.",
  },
  {
    title: "Concurrency is a correctness problem",
    detail:
      "Oversold inventory and double-charged quotas are design failures. Atomic conditional updates and transactions prevent them structurally.",
  },
  {
    title: "Simple to operate",
    detail:
      "A system someone can't debug at 2 a.m. isn't finished. Structured logs, monitoring dashboards and honest documentation keep operations boring.",
  },
];

const capabilitiesAr: Capability[] = [
  {
    title: "أنظمة الذكاء الاصطناعي",
    description:
      "ذكاء اصطناعي مدمج في مسارات عمل المنتج، مستند إلى بيانات حقيقية ومقيد بعقود واضحة، ولا يُترك لاختراع الأرقام.",
    points: [
      "مسارات Hybrid RAG",
      "وكلاء ذكاء اصطناعي (Mastra وواجهات متوافقة مع OpenAI)",
      "قواعد معرفة مؤسسية وEmbeddings",
      "تحليلات حتمية مع شرح بالذكاء الاصطناعي",
      "تكامل نماذج محلية عبر Ollama",
    ],
  },
  {
    title: "بنية منصات SaaS",
    description:
      "منصات متعددة المستأجرين تجعل العزل والفوترة والصلاحيات جزءاً بنيوياً من النظام منذ البداية.",
    points: [
      "عزل المستأجرين والمؤسسات",
      "صلاحيات RBAC متعددة المستويات",
      "الباقات والحصص وسجلات الاستخدام",
      "الاشتراكات ومسارات الفوترة",
      "Feature flags ومساحات العمل",
    ],
  },
  {
    title: "هندسة البرمجيات المتكاملة",
    description:
      "منتجات كاملة للويب والهاتف وواجهات API، بأنواع بيانات مترابطة من مخطط قاعدة البيانات حتى الواجهة.",
    points: [
      "Next.js App Router وReact 19",
      "TypeScript في الوضع الصارم",
      "REST APIs والتحقق على الخادم عبر Zod",
      "تطبيقات Flutter",
      "أنظمة فورية عبر Socket.IO",
    ],
  },
  {
    title: "البنية التحتية والإنتاج",
    description:
      "أنظمة جاهزة للإنتاج: قابلة للمراقبة والاستعادة وموثقة بما يكفي لتشغيلها بثقة.",
    points: [
      "Docker وDocker Compose",
      "معاملات MongoDB وReplica Sets",
      "Redis للتخزين المؤقت وتحديد المعدل",
      "Caddy وNginx كـ Reverse Proxy",
      "مسارات CI وإدارة العمليات عبر PM2",
    ],
  },
];

const stackGroupsAr: StackGroup[] = [
  {
    label: "الواجهات",
    note: "الويب ولوحات الإدارة وتطبيقات الهاتف",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Flutter"],
  },
  {
    label: "الخلفية",
    note: "واجهات API والمصادقة ومنطق المجال",
    items: ["Node.js", "Express", "Python / FastAPI", "NextAuth", "Zod"],
  },
  {
    label: "البيانات",
    note: "التخزين والذاكرة المؤقتة والبحث",
    items: ["MongoDB", "Mongoose", "SQL", "Redis", "Qdrant (vector search)"],
  },
  {
    label: "الذكاء الاصطناعي",
    note: "الاسترجاع والوكلاء وضوابط الأمان",
    items: [
      "Hybrid RAG",
      "AI agents",
      "Embeddings & semantic search",
      "Mastra",
      "OpenAI-compatible APIs",
    ],
  },
  {
    label: "البنية التحتية",
    note: "النشر والتشغيل",
    items: ["Docker", "Linux", "Nginx", "Caddy", "PM2", "GitHub Actions CI"],
  },
];

const principlesAr: Principle[] = [
  {
    title: "البنية قبل التجريد",
    detail:
      "حدد تعدد المستأجرين والحدود وتدفق البيانات قبل كتابة الميزات. وجود control plane وcompute plane واضحين أهم من أي نمط ذكي يُضاف متأخراً.",
  },
  {
    title: "الحتمية فيما يجب أن يكون صحيحاً",
    detail:
      "عندما يجب أن تكون النتيجة صحيحة، مثل التحليلات والأموال والمخزون، ينفذها كود حتمي مع مصدر قابل للتتبع. يشرح الذكاء الاصطناعي النتائج الموثقة ولا يخترعها.",
  },
  {
    title: "العزل ميزة أساسية",
    detail:
      "يصبح تعدد المستأجرين حقيقياً فقط عندما يكون كل استعلام ومهمة في الطابور ومفتاح API محدداً بمستأجر، وتُفحص الصلاحيات دائماً على الخادم.",
  },
  {
    title: "الإنتاج قبل العروض",
    detail:
      "المهام الخلفية التي تعيد المحاولة، ونقاط الصحة، وسجلات التدقيق، والنسخ الاحتياطية، وأدلة التشغيل كلها جزء من المنتج وليست أعمالاً مؤجلة لما بعد العرض.",
  },
  {
    title: "التزامن مسألة صحة",
    detail:
      "بيع مخزون زائد أو خصم الحصة مرتين أخطاء تصميم. تمنعها التحديثات الذرية المشروطة والمعاملات على المستوى البنيوي.",
  },
  {
    title: "بساطة التشغيل",
    detail:
      "النظام الذي لا يمكن تشخيصه ليلاً لم يكتمل. السجلات المنظمة ولوحات المراقبة والتوثيق الصريح تجعل التشغيل قابلاً للتوقع.",
  },
];

export function getCapabilities(locale: Locale): Capability[] {
  return locale === "ar" ? capabilitiesAr : capabilities;
}

export function getStackGroups(locale: Locale): StackGroup[] {
  return locale === "ar" ? stackGroupsAr : stackGroups;
}

export function getPrinciples(locale: Locale): Principle[] {
  return locale === "ar" ? principlesAr : principles;
}
