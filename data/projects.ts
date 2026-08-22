/**
 * Curated project data.
 *
 * Every claim in this file is grounded in the public repositories at
 * github.com/mahmoud-adel-dev. No metrics, clients, employers or dates are
 * invented; if something is not verifiable from a repository, it is omitted.
 */

export type StackGroup = {
  label: string;
  items: string[];
};

export type DiagramId = "chatzi" | "aidl" | "seals" | "lumora";

export type CaseStudy = {
  intro: string;
  context: string[];
  overview: string;
  challenges: { title: string; detail: string }[];
  architecture: {
    summary: string;
    diagram: DiagramId;
    notes: string[];
  };
  featureGroups: { label: string; items: string[] }[];
  decisions: { title: string; detail: string }[];
  stack: StackGroup[];
};

export type Project = {
  slug: string;
  index: string;
  title: string;
  positioning: string;
  summary: string;
  highlights: string[];
  technologies: string[];
  status?: string;
  repository: string;
  featured: boolean;
  caseStudy?: CaseStudy;
};

export type SecondaryProject = {
  title: string;
  description: string;
  repository: string;
  stack: string;
  icon: "omnichannel" | "gaming" | "student";
};

const GITHUB = "https://github.com/mahmoud-adel-dev";

/* -------------------------------------------------------------------------- */
/* Featured projects                                                          */
/* -------------------------------------------------------------------------- */

const chatzi: Project = {
  slug: "chatzi",
  index: "01",
  title: "ChatZi Next",
  positioning: "Enterprise AI customer engagement platform",
  summary:
    "A multi-tenant SaaS platform that unifies omnichannel conversations, CRM, ticketing and sales pipelines around AI agents grounded in an enterprise knowledge base.",
  highlights: [
    "Multi-tenant SaaS core",
    "AI agents & hybrid RAG",
    "Omnichannel inbox",
    "CRM · ticketing · sales pipeline",
    "Queues & background jobs",
    "Billing with usage quotas",
  ],
  technologies: [
    "Next.js 15",
    "React 19",
    "TypeScript",
    "Mastra AI",
    "MongoDB",
    "Redis",
    "Nginx",
    "PM2",
  ],
  status: "In development — enterprise readiness phase",
  repository: `${GITHUB}/newchatziv-ai-crm`,
  featured: true,
  caseStudy: {
    intro:
      "ChatZi Next treats AI as part of the operating core of customer engagement — not a chat widget bolted onto a CRM. Conversations, customer relationships, help desk operations and sales pipelines share one workspace, and AI agents work inside that workspace with access to verified enterprise knowledge.",
    context: [
      "Support and sales teams usually run on disconnected tools: a live chat here, a shared inbox there, customer records somewhere else. Automation stays shallow because no system has the full context of the customer.",
      "ChatZi Next consolidates those surfaces into a single platform where every conversation is attached to customer history, tickets and pipeline state — and AI agents can act on all of it.",
    ],
    overview:
      "A modular, multi-tenant monolith built on Next.js API routes and server actions, backed by MongoDB and Redis. An AI service layer orchestrates agents (Mastra) over a hybrid RAG pipeline fed by an enterprise knowledge base. Queue workers handle background jobs, scheduled tasks, webhooks and event processing so user-facing requests stay fast.",
    challenges: [
      {
        title: "Tenant isolation everywhere",
        detail:
          "Complete tenant isolation across conversations, customers and configuration — enforced through RBAC with super admin, tenant admin and support agent tiers, plus per-tenant settings, branding and feature flags.",
      },
      {
        title: "Grounding AI in enterprise knowledge",
        detail:
          "Agents answer from a managed knowledge base rather than improvising: PDF processing, website crawling, embeddings and semantic search feed a hybrid retrieval-augmented generation pipeline.",
      },
      {
        title: "Keeping the request path light",
        detail:
          "Notifications, event processing, webhooks and scheduled tasks run through queue-based background processing, so AI calls and channel integrations never block the inbox.",
      },
      {
        title: "Operating the platform itself",
        detail:
          "A developer-operations dashboard exposes server monitoring, queue monitoring, backup management and system health — because an engagement platform must be operable by the team that runs it.",
      },
    ],
    architecture: {
      summary:
        "Channels converge into a unified inbox on top of the CRM core; the AI service layer reads enterprise knowledge through hybrid RAG; queues decouple all asynchronous work.",
      diagram: "chatzi",
      notes: [
        "Channel adapters are extensible by design — new providers plug into the same ingestion path.",
        "Redis backs caching, rate limiting and queue coordination alongside MongoDB persistence.",
        "Billing sits behind service boundaries: Stripe subscriptions, usage tracking and AI quotas.",
      ],
    },
    featureGroups: [
      {
        label: "Engagement",
        items: [
          "Unified omnichannel inbox — live chat, WhatsApp Business, Messenger, Instagram, Telegram, email",
          "Context-aware AI support conversations",
          "Notification engine & webhooks",
        ],
      },
      {
        label: "Customer operations",
        items: [
          "Customer profiles, companies, timelines, notes and custom fields",
          "Help desk ticketing with SLA support, priorities and escalation workflows",
          "Lead management and sales pipeline with opportunity tracking",
        ],
      },
      {
        label: "Platform & control",
        items: [
          "Super admin dashboard for tenants, billing and AI provider configuration",
          "Developer operations dashboard for queues, backups and system health",
          "Analytics for conversations, agent performance and AI usage",
        ],
      },
    ],
    decisions: [
      {
        title: "Agent orchestration with Mastra",
        detail:
          "Agents are built on a framework with workflow orchestration and tool use, instead of ad-hoc prompt chains scattered through route handlers.",
      },
      {
        title: "Hybrid retrieval over pure vector search",
        detail:
          "The knowledge base combines embeddings and semantic search with complementary retrieval paths — the pragmatic choice for enterprise content where keyword precision still matters.",
      },
      {
        title: "Quotas as first-class citizens",
        detail:
          "AI usage is metered per tenant with quotas enforced in the product surface, keeping provider costs aligned with subscription plans.",
      },
      {
        title: "Security hardening as a standing workstream",
        detail:
          "Audit logging, rate limiting, CSP headers, webhook verification and a secure file-upload pipeline are tracked explicitly in the repository's enterprise-readiness phase.",
      },
    ],
    stack: [
      { label: "Interface", items: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS"] },
      { label: "Backend", items: ["Node.js", "Next.js API routes", "Server Actions"] },
      { label: "AI", items: ["Mastra AI", "OpenAI-compatible providers", "Hybrid RAG", "Knowledge base"] },
      { label: "Data", items: ["MongoDB", "Redis"] },
      { label: "Infrastructure", items: ["Linux", "Nginx", "PM2"] },
    ],
  },
};

const aidl: Project = {
  slug: "aidl",
  index: "02",
  title: "AIDL Platform",
  positioning: "Multi-tenant AI data analyzer — deterministic analytics, explained by AI",
  summary:
    "Upload a dataset, get validated KPIs, trends, anomalies and forecasts computed by a deterministic Python engine — with an LLM constrained to explain results it is handed, never to invent them.",
  highlights: [
    "Python computes · AI explains",
    "Provenance-tagged KPIs",
    "Contract boundary (Zod-validated)",
    "MongoDB job queue with atomic claims",
    "Orgs, roles & quota ledgers",
    "Async developer REST API",
  ],
  technologies: [
    "Next.js 15",
    "TypeScript",
    "Python",
    "FastAPI",
    "Polars",
    "scikit-learn",
    "MongoDB",
    "Docker",
  ],
  status: "Actively developed — CI-gated",
  repository: `${GITHUB}/multi-tenant-ai-data-analyzer`,
  featured: true,
  caseStudy: {
    intro:
      "Most “AI analytics” products ask a language model to inspect raw rows and produce a plausible answer. AIDL deliberately refuses that shortcut: a deterministic Python engine validates and analyzes the data, every KPI carries provenance, and an optional LLM may only explain verified results within a guarded schema.",
    context: [
      "Business teams want convenient analytics without giving up traceability or tenant isolation. A number that cannot be traced to its computation is not analysis — it's a guess with good formatting.",
      "AIDL separates numerical computation from narrative generation at the architectural level, making the trust boundary explicit instead of hoping prompts behave.",
    ],
    overview:
      "Three planes: a Next.js control plane handling auth, organizations, quotas and uploads; a Node.js worker consuming a MongoDB-backed job queue; and an isolated FastAPI compute plane running the deterministic analytics engine (Polars, pandas, NumPy, SciPy, scikit-learn, statsmodels). Results cross back through a Zod-validated contract before anything is persisted or shown.",
    challenges: [
      {
        title: "A hard contract between two languages",
        detail:
          "Every analysis result must pass a typed, Zod-validated contract before it reaches the database or UI. Malformed engine output fails loudly instead of silently corrupting a dashboard.",
      },
      {
        title: "At-least-once jobs without duplicate damage",
        detail:
          "The MongoDB-backed queue uses atomic claims, heartbeats, retry/backoff and stalled-job recovery, while submission idempotency keys ensure a retried upload never double-spends a quota reservation.",
      },
      {
        title: "Statistical honesty",
        detail:
          "Advanced methods are eligibility-checked before running — forecasts require sufficient history and are baseline-validated; anomaly detection is robust to dirty real-world data.",
      },
      {
        title: "Tenancy under async load",
        detail:
          "Organizations carry five roles, invitations and fresh server-side membership checks; plans, atomic quota reservations, usage ledgers and hashed API keys keep consumption accountable per tenant.",
      },
    ],
    architecture: {
      summary:
        "A modular control plane (Next.js) plus an isolated compute plane (FastAPI). Ports-and-adapters isolate storage and AI providers; a contract boundary isolates Python analytics from TypeScript persistence.",
      diagram: "aidl",
      notes: [
        "Storage is pluggable: local filesystem or any S3-compatible service (AWS S3, Cloudflare R2, MinIO).",
        "The worker validates every engine response against the analysis contract before persisting runs, dashboards, reports and usage.",
        "The LLM call is optional and strictly downstream of verified results — prompt and schema guards constrain its output.",
      ],
    },
    featureGroups: [
      {
        label: "Analysis",
        items: [
          "CSV / TSV / XLSX / JSON ingestion with content-aware validation and parser safety ceilings",
          "Schema and semantic inference, column profiles, missingness and data-quality findings",
          "Trends, seasonality, correlations, robust anomalies, guarded segmentation, baseline-validated forecasting",
          "Auto-planned ECharts dashboards with selection rationale, adaptive executive reports, print-to-PDF",
        ],
      },
      {
        label: "Platform",
        items: [
          "Organizations, five org roles, invitations, active-org selection, tenant-scoped access",
          "Plans, subscriptions, atomic quota reservation, usage ledgers, audit events",
          "Developer API: async submission, job polling, CORS controls, idempotency keys, hashed API keys",
        ],
      },
      {
        label: "Operations",
        items: [
          "Structured logs, health and readiness endpoints",
          "PM2 orchestration, Docker Compose, production containers, GitHub Actions CI",
          "English and Arabic interfaces with RTL layout support",
        ],
      },
    ],
    decisions: [
      {
        title: "Compute lives outside the web app",
        detail:
          "Dataframes and statistical methods belong to Python. Keeping that engine isolated means heavier analysis scales independently of the UI and API.",
      },
      {
        title: "Provenance on every KPI",
        detail:
          "Each metric knows which method produced it and whether that method was eligible for the data — reviewers can audit conclusions, not just read them.",
      },
      {
        title: "The queue is the reliability story",
        detail:
          "Rather than trusting HTTP to complete long analyses, work is claimed atomically, heartbeated, retried with backoff, and recoverable after stalls.",
      },
      {
        title: "Provider keys encrypted at rest",
        detail:
          "LLM credentials are stored encrypted, and the AI layer is optional end to end — the platform remains fully functional as pure deterministic analytics.",
      },
    ],
    stack: [
      {
        label: "Web & API",
        items: ["Next.js 15 App Router", "React 19", "TypeScript", "NextAuth"],
      },
      {
        label: "Analytics engine",
        items: ["Python 3.12+", "FastAPI", "Polars", "pandas", "NumPy", "SciPy", "scikit-learn", "statsmodels"],
      },
      { label: "Worker & queue", items: ["Node.js", "esbuild", "MongoDB-backed atomic queue"] },
      { label: "Persistence", items: ["MongoDB", "Mongoose", "S3-compatible storage"] },
      { label: "Infrastructure", items: ["Docker Compose", "PM2", "GitHub Actions CI", "Optional Redis"] },
    ],
  },
};

const seals: Project = {
  slug: "seals",
  index: "03",
  title: "SEALS B2B Marketplace",
  positioning: "Production-oriented B2B wholesale marketplace — Flutter client, Next.js backend",
  summary:
    "A wholesale trading platform connecting wholesalers, retailers and shipping companies — with subscription-gated commerce, local payment rails handled without holding merchant funds, and inventory that stays correct under concurrent orders.",
  highlights: [
    "Flutter mobile & web client",
    "Reserve → commit inventory",
    "MongoDB transactions",
    "Subscription-gated organizations",
    "Payment proofs & reconciliation flows",
    "Caddy + Docker deployment",
  ],
  technologies: [
    "Flutter",
    "Dart",
    "Next.js",
    "TypeScript strict",
    "Zod",
    "MongoDB Atlas",
    "Docker Compose",
    "Caddy",
  ],
  status: "Built to production standards — audited, documented, deployable",
  repository: `${GITHUB}/EGYMarket_B2B_FlutterAPP`,
  featured: true,
  caseStudy: {
    intro:
      "SEALS is a wholesale marketplace where three kinds of organizations trade: wholesalers list stock, business buyers order it, shipping companies fulfill it. The engineering center of gravity is correctness — of money, of inventory, and of who is allowed to do what — under real transactional load.",
    context: [
      "B2B trade in this market moves over local payment rails — InstaPay, mobile wallets, bank transfers, cash receipts — not card processors. That means payment confirmation is a workflow, not an API callback.",
      "SEALS models those obligations explicitly: each order carries three separate payments (platform fee, merchandise value, shipping), each confirmed with proof uploads and beneficiary confirmation. The platform never holds merchant funds.",
    ],
    overview:
      "A Flutter application (mobile and web) talks to a Next.js backend that serves both the public API and an admin dashboard. MongoDB Atlas runs as a replica set so multi-document transactions are available for order and inventory flows. Deployment is Docker Compose fronted by Caddy for TLS/HSTS, with nginx serving the Flutter web build.",
    challenges: [
      {
        title: "Inventory that cannot oversell",
        detail:
          "Stock uses reserve → commit semantics protected by conditional atomic updates and MongoDB transactions — concurrent buyers cannot oversell the same unit, even under racing requests.",
      },
      {
        title: "Payments without a processor",
        detail:
          "Every monetary obligation is modeled as its own flow: proof upload, beneficiary confirmation, reconciliation states. Trust boundaries are explicit because the platform mediates but never custodies funds.",
      },
      {
        title: "Trading requires an organization in good standing",
        detail:
          "Wholesalers, retailers and shipping companies each require an active subscription (trial-supported) before they can transact — gating is structural, enforced in authorization rules rather than UI checks.",
      },
      {
        title: "Operating documentation as a deliverable",
        detail:
          "The repository ships a production runbook, deployment and backup/restore guides, an enterprise audit with remediation status, and CI that builds both production images on every push.",
      },
    ],
    architecture: {
      summary:
        "Two clients — a Flutter app for marketplace participants and a Next.js admin/API tier — converge on a transactional MongoDB replica set, deployed as containers behind Caddy.",
      diagram: "seals",
      notes: [
        "Auth uses NextAuth encrypted HttpOnly cookies — no third-party identity providers, no custom refresh-token machinery.",
        "Media and email run through dedicated services (Cloudinary, SMTP/Nodemailer) kept out of the request path.",
        "CI validates Docker Compose configuration and builds both production images on every push.",
      ],
    },
    featureGroups: [
      {
        label: "Marketplace",
        items: [
          "Three organization types with subscription-gated trading and trial support",
          "Order lifecycle spanning merchandise value, platform fee and shipping obligations",
          "Local payment rails: InstaPay, wallet, bank transfer, cash receipts with proof upload",
        ],
      },
      {
        label: "Engineering",
        items: [
          "Reserve → commit inventory with conditional atomic updates and MongoDB transactions",
          "Zod-validated API surface, TypeScript strict mode across the backend",
          "Arabic/English localization via easy_localization in the Flutter client",
        ],
      },
      {
        label: "Operations",
        items: [
          "Hourly maintenance cron and admin bootstrap procedures",
          "Backup and restore documentation, environment variable reference",
          "Production deployment via docker compose with TLS/HSTS termination at Caddy",
        ],
      },
    ],
    decisions: [
      {
        title: "Transactions over eventual consistency for stock",
        detail:
          "A replica set was chosen specifically so multi-document transactions could protect order-and-inventory flows — correctness beats convenience here.",
      },
      {
        title: "One backend, many surfaces",
        detail:
          "The same Next.js codebase serves the participant-facing API and the internal admin dashboard, keeping authorization rules and domain logic in exactly one place.",
      },
      {
        title: "Bloc on the client",
        detail:
          "The Flutter app uses Bloc for predictable state transitions across complex marketplace flows — orders, payments, inventory — where implicit state would rot quickly.",
      },
      {
        title: "Auditability as scope, not afterthought",
        detail:
          "An explicit enterprise audit document tracks findings and remediation status, treating security review as part of the definition of done.",
      },
    ],
    stack: [
      { label: "Mobile & web client", items: ["Flutter 3.x", "Dart", "Bloc", "Dio", "easy_localization"] },
      { label: "API & admin", items: ["Next.js App Router", "TypeScript strict", "Zod", "Mongoose", "NextAuth"] },
      { label: "Data", items: ["MongoDB Atlas (replica set)", "Cloudinary"] },
      { label: "Edge & delivery", items: ["Docker Compose", "Caddy", "nginx", "GitHub Actions CI"] },
    ],
  },
};

const lumora: Project = {
  slug: "lumora",
  index: "04",
  title: "Lumora SaaS",
  positioning: "Multi-tenant commerce & operations platform",
  summary:
    "Merchant dashboard, customer storefront and cashier POS in one tenant model — with barcode-driven checkout, thermal receipt printing, delivery tracking and edge-enforced tenant isolation.",
  highlights: [
    "Tenant + store isolation",
    "POS terminal & barcode workflows",
    "Thermal receipt printing (80mm)",
    "Real-time order tracking",
    "Delivery driver assignment",
    "Edge middleware route protection",
  ],
  technologies: [
    "Next.js 15",
    "React 19",
    "shadcn/ui",
    "MongoDB",
    "Auth.js v5",
    "Upstash Redis",
  ],
  repository: `${GITHUB}/multi-tenant-ecommerce-erp`,
  featured: true,
  caseStudy: {
    intro:
      "Lumora compresses an e-commerce operation into a single multi-tenant platform: merchants manage inventory and orders from a dashboard, customers buy from a storefront, and store staff run a POS terminal — all sharing one inventory truth.",
    context: [
      "Small merchants don't run separate systems for online sales, in-store checkout and delivery. When those live apart, inventory drifts, invoices disagree, and nobody trusts the numbers.",
      "Lumora keeps online orders, POS sales and delivery assignments on one ledger, with automatic inventory deduction at the moment of sale.",
    ],
    overview:
      "A Next.js 15 application serving three experience surfaces — merchant SaaS dashboard, customer storefront and cashier POS — on MongoDB with Mongoose. Auth.js v5 middleware runs at the edge, verifying standard user, merchant and staff tokens and protecting tenant routes before requests reach page handlers. Upstash Redis provides distributed rate limiting with an in-memory fallback.",
    challenges: [
      {
        title: "Isolation across tenants and stores",
        detail:
          "Data is scoped per merchant Tenant and per physical/digital Store. Edge middleware validates token type and staff role so data leakage across tenants is architecturally impossible — not just hidden in the UI.",
      },
      {
        title: "Checkout speed at the counter",
        detail:
          "Global barcode scanner support drives the POS flow for lightning-fast checkout, with split-second inventory deduction and automatic invoice numbering (storeId-YYMM-######) generated server-side.",
      },
      {
        title: "Receipts on real hardware",
        detail:
          "80mm thermal receipt printing via react-to-print handles the physical side of commerce most web platforms quietly ignore.",
      },
      {
        title: "Rate limiting that degrades gracefully",
        detail:
          "Upstash Redis rate limiting falls back to in-memory limits when Redis is unreachable — protection survives infrastructure hiccups.",
      },
    ],
    architecture: {
      summary:
        "Three product surfaces share one Next.js runtime and one database; tenancy is enforced at the middleware boundary before any page or handler executes.",
      diagram: "lumora",
      notes: [
        "Middleware distinguishes user, merchant and staff sessions and redirects accordingly at the edge.",
        "Orders update inventory atomically and emit real-time tracking status to customers.",
        "UI composition leans on shadcn/ui primitives over Radix, styled with Tailwind.",
      ],
    },
    featureGroups: [
      {
        label: "Commerce",
        items: [
          "Customer storefront for browsing, cart and checkout",
          "Point-of-sale terminal with global barcode scanning",
          "Automatic invoice numbering per store",
        ],
      },
      {
        label: "Operations",
        items: [
          "Inventory management with automatic deduction on sale",
          "Real-time order tracking and status updates",
          "Delivery driver assignment and tracking",
        ],
      },
      {
        label: "Platform",
        items: [
          "Merchant onboarding with per-store configuration",
          "Edge-runtime authentication and tenant route protection",
          "Distributed rate limiting with graceful fallback",
        ],
      },
    ],
    decisions: [
      {
        title: "Enforce tenancy at the edge",
        detail:
          "Route protection runs in middleware before handlers execute — authorization that depends on client-side checks is treated as nonexistent.",
      },
      {
        title: "One inventory, three surfaces",
        detail:
          "Storefront, POS and delivery all mutate the same stock records, eliminating the sync problems of split systems.",
      },
      {
        title: "Familiar primitives, strict types",
        detail:
          "shadcn/ui and Radix keep interface construction consistent, while TypeScript carries tenant context through the whole request path.",
      },
    ],
    stack: [
      { label: "Interface", items: ["Next.js 15", "React 19", "Tailwind CSS", "shadcn/ui + Radix"] },
      { label: "Backend", items: ["Next.js App Router", "Auth.js v5", "Mongoose"] },
      { label: "Data", items: ["MongoDB", "Upstash Redis"] },
      { label: "Tooling", items: ["react-to-print", "Lucide icons"] },
    ],
  },
};

export const projects: Project[] = [chatzi, aidl, seals, lumora];

/* -------------------------------------------------------------------------- */
/* Secondary projects — quieter index, equal honesty                          */
/* -------------------------------------------------------------------------- */

export const secondaryProjects: SecondaryProject[] = [
  {
    title: "OmniConnect Hub",
    description:
      "Multi-tenant omnichannel inbox with realtime collaboration (Socket.IO), a professional knowledge base, and a RAG engine over Qdrant vector search orchestrated with Mastra.",
    repository: `${GITHUB}/OmniConnect-Hub-Smart-Knowledge-Base`,
    stack: "Next.js · Express · Socket.IO · Qdrant · MongoDB · S3/R2",
    icon: "omnichannel",
  },
  {
    title: "PS Cafe Manager",
    description:
      "Operations system for gaming cafés: PS4/PS5 device sessions billed across multiple modes (open time, hourly, half-hour, matches), café orders, expense tracking and thermal printing.",
    repository: `${GITHUB}/ps_sys`,
    stack: "Next.js · TypeScript · MongoDB · NextAuth",
    icon: "gaming",
  },
  {
    title: "Smart Student Assistant",
    description:
      "Student platform with JWT authentication, offline AI chat via Ollama, analytics dashboards and Arabic RTL support — on a hardened SQL Server backend with rate limiting and parameterized queries.",
    repository: `${GITHUB}/aibotofline`,
    stack: "Next.js · React · SQL Server · JWT · Ollama",
    icon: "student",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Case studies in display order — used for prev/next navigation. */
export function getAdjacentProjects(slug: string): {
  previous?: Project;
  next?: Project;
} {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return {};
  return {
    previous:
      index > 0
        ? projects[index - 1]
        : projects[projects.length - 1],
    next:
      index < projects.length - 1
        ? projects[index + 1]
        : projects[0],
  };
}
