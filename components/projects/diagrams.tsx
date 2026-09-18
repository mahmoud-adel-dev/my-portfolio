import type { ReactNode } from "react";
import type { DiagramId } from "@/data/projects";
import type { Locale } from "@/lib/i18n";

/* ---------------------------------------------------------------------------
   Shared primitives — hairline boxes, mono labels, amber only on boundaries.
   Rendered as pure HTML/CSS so they reflow cleanly and stay accessible text.
   --------------------------------------------------------------------------- */

function Node({
  label,
  sub,
  accent = false,
  dashed = false,
  className = "",
}: {
  label: string;
  sub?: string;
  accent?: boolean;
  dashed?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`px-4 py-3 ${
        accent
          ? "border border-accent/50"
          : dashed
            ? "border border-dashed border-line-strong"
            : "border border-line bg-surface"
      } ${className}`}
    >
      <p
        className={`font-mono text-[11px] uppercase tracking-[0.12em] ${
          accent ? "text-accent" : "text-fg"
        }`}
      >
        {label}
      </p>
      {sub ? (
        <p className="mt-1.5 text-[11px] leading-relaxed text-muted">{sub}</p>
      ) : null}
    </div>
  );
}

function Arrow({ direction = "down" }: { direction?: "down" | "right" }) {
  return (
    <p
      aria-hidden="true"
      className={`select-none font-mono text-sm leading-none text-line-strong ${
        direction === "down" ? "text-center" : "shrink-0 self-center px-1"
      }`}
    >
      {direction === "down" ? "↓" : <span className="directional-icon inline-block">→</span>}
    </p>
  );
}

function LaneLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
      {children}
    </p>
  );
}

export function Diagram({
  id,
  caption,
  locale,
}: {
  id: DiagramId;
  caption: string;
  locale: Locale;
}) {
  const diagrams: Record<DiagramId, ReactNode> = {
    chatzi: <ChatziDiagram locale={locale} />,
    aidl: <AidlDiagram locale={locale} />,
    seals: <SealsDiagram locale={locale} />,
    lumora: <LumoraDiagram locale={locale} />,
  };

  return (
    <figure>
      <div className="border border-line p-5 md:p-8">{diagrams[id]}</div>
      <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
        {caption}
      </figcaption>
    </figure>
  );
}

/* -------------------------------------------------------------------------- */
/* ChatZi Next — layered platform                                             */
/* -------------------------------------------------------------------------- */

const chatziCopy = {
  en: {
    lane: "Channel ingestion",
    channels: ["Live chat", "WhatsApp", "Messenger", "Instagram", "Telegram", "Email"],
    adapters: "extensible adapters",
    inbox: "Unified inbox & routing",
    inboxSub: "Conversation orchestration across every channel",
    crm: "CRM core",
    crmSub: "Customers · companies · tickets & SLA · sales pipeline",
    ai: "AI service layer",
    aiSub: "Mastra agents · hybrid RAG · knowledge base · prompt & model management",
    auth: "Auth & RBAC",
    authSub: "Super admin / tenant admin / agent tiers",
    billing: "Billing",
    billingSub: "Stripe plans · usage tracking · AI quotas",
    queues: "Queues & workers",
    queuesSub: "Jobs · scheduled tasks · webhooks · events",
  },
  ar: {
    lane: "استقبال القنوات",
    channels: ["محادثة مباشرة", "WhatsApp", "Messenger", "Instagram", "Telegram", "البريد"],
    adapters: "محولات قابلة للتوسعة",
    inbox: "صندوق وارد موحد وتوجيه",
    inboxSub: "تنسيق المحادثات عبر كل القنوات",
    crm: "نواة CRM",
    crmSub: "عملاء · شركات · تذاكر وSLA · مسار مبيعات",
    ai: "طبقة خدمات الذكاء الاصطناعي",
    aiSub: "وكلاء Mastra · Hybrid RAG · قاعدة معرفة · إدارة prompts والنماذج",
    auth: "المصادقة وRBAC",
    authSub: "مشرف عام / مشرف مستأجر / موظف دعم",
    billing: "الفوترة",
    billingSub: "باقات Stripe · تتبع الاستخدام · حصص الذكاء الاصطناعي",
    queues: "الطوابير والعمال",
    queuesSub: "مهام · جدولة · webhooks · أحداث",
  },
} as const;

function ChatziDiagram({ locale }: { locale: Locale }) {
  const copy = chatziCopy[locale];

  return (
    <div className="mx-auto max-w-2xl space-y-2 font-mono">
      <LaneLabel>{copy.lane}</LaneLabel>
      <div className="flex flex-wrap gap-1.5">
        {copy.channels.map((channel) => (
          <span
            key={channel}
            className="border border-line bg-surface px-2.5 py-1.5 text-[10px] uppercase tracking-[0.1em] text-muted"
          >
            {channel}
          </span>
        ))}
        <span className="border border-dashed border-line px-2.5 py-1.5 text-[10px] uppercase tracking-[0.1em] text-faint">
          {copy.adapters}
        </span>
      </div>

      <Arrow />

      <Node label={copy.inbox} sub={copy.inboxSub} />

      <Arrow />

      <div className="grid gap-2 md:grid-cols-2">
        <Node
          label={copy.crm}
          sub={copy.crmSub}
        />
        <Node
          label={copy.ai}
          sub={copy.aiSub}
          accent
        />
      </div>

      <Arrow />

      <div className="grid gap-2 md:grid-cols-3">
        <Node label={copy.auth} sub={copy.authSub} />
        <Node label={copy.billing} sub={copy.billingSub} />
        <Node label={copy.queues} sub={copy.queuesSub} />
      </div>

      <Arrow />

      <p className="border-t border-line pt-3 text-center text-[11px] uppercase tracking-[0.12em] text-faint">
        MongoDB · Redis · Linux · Nginx · PM2
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* AIDL — control plane vs compute plane                                      */
/* -------------------------------------------------------------------------- */

const aidlCopy = {
  en: {
    boundary: "contract boundary",
    control: "Control plane",
    web: "Next.js web app",
    webSub: "Uploads · dashboards · executive reports · ECharts",
    api: "REST API v1",
    apiSub: "Async submission · polling · idempotency keys · CORS",
    auth: "Auth & tenancy DAL",
    authSub: "Organizations · five roles · server-side membership checks",
    saas: "SaaS controls",
    saasSub: "Plans · atomic quota reservation · usage ledgers · hashed API keys",
    storage: "Object storage",
    storageSub: "Local or S3-compatible (S3 · R2 · MinIO)",
    compute: "Compute plane",
    engine: "FastAPI analytics engine",
    engineSub: "Deterministic Python — Polars · pandas · NumPy · SciPy · scikit-learn · statsmodels",
    contract: "Verified analysis contract",
    contractSub: "Every KPI provenance-tagged · methods eligibility-checked",
    llm: "LLM provider",
    llmSub: "Optional — explains verified results only; keys encrypted at rest",
    async: "Async processing",
    steps: ["Job queue (MongoDB)", "Atomic claims", "Worker (Node.js)", "Retry · backoff · heartbeats"],
  },
  ar: {
    boundary: "حد العقد",
    control: "طبقة التحكم",
    web: "تطبيق Next.js",
    webSub: "رفع · لوحات · تقارير تنفيذية · ECharts",
    api: "REST API v1",
    apiSub: "إرسال غير متزامن · تتبع · idempotency keys · CORS",
    auth: "المصادقة وطبقة بيانات المستأجرين",
    authSub: "مؤسسات · خمسة أدوار · فحص العضوية على الخادم",
    saas: "ضوابط SaaS",
    saasSub: "باقات · حجز حصص ذري · سجلات استخدام · مفاتيح API مشفرة",
    storage: "تخزين الملفات",
    storageSub: "محلي أو متوافق مع S3 مثل S3 وR2 وMinIO",
    compute: "طبقة الحساب",
    engine: "محرك تحليلات FastAPI",
    engineSub: "Python حتمي — Polars · pandas · NumPy · SciPy · scikit-learn · statsmodels",
    contract: "عقد تحليل موثق",
    contractSub: "كل KPI مرتبط بمصدر · فحص أهلية الطرق",
    llm: "مزود نموذج اللغة",
    llmSub: "اختياري — يشرح النتائج الموثقة فقط، والمفاتيح مشفرة أثناء التخزين",
    async: "المعالجة غير المتزامنة",
    steps: ["طابور مهام (MongoDB)", "حجز ذري", "عامل (Node.js)", "إعادة · backoff · heartbeats"],
  },
} as const;

function AidlDiagram({ locale }: { locale: Locale }) {
  const copy = aidlCopy[locale];

  return (
    <div className="space-y-6 font-mono">
      <div className="relative grid gap-6 lg:grid-cols-2 lg:gap-12">
        {/* Contract boundary */}
        <span
          aria-hidden="true"
          className="absolute top-0 bottom-0 hidden border-l border-dashed border-accent/60 lg:left-1/2 lg:block"
        />
        <span
          aria-hidden="true"
          className="absolute top-1/2 right-2 hidden -translate-y-1/2 rotate-90 bg-background px-2 text-[9px] uppercase tracking-[0.2em] text-accent lg:right-auto lg:left-1/2 lg:-translate-x-1/2 lg:block"
        >
          {copy.boundary}
        </span>

        <div>
          <LaneLabel>{copy.control}</LaneLabel>
          <div className="space-y-2">
            <Node label={copy.web} sub={copy.webSub} />
            <Node label={copy.api} sub={copy.apiSub} />
            <Node label={copy.auth} sub={copy.authSub} />
            <Node label={copy.saas} sub={copy.saasSub} />
            <Node label={copy.storage} sub={copy.storageSub} />
          </div>
        </div>

        <div>
          <LaneLabel>{copy.compute}</LaneLabel>
          <div className="space-y-2">
            <Node
              label={copy.engine}
              sub={copy.engineSub}
              accent
            />
            <Node label={copy.contract} sub={copy.contractSub} />
            <div className="border border-dashed border-line-strong px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.12em] text-muted">
                {copy.llm}
              </p>
              <p className="mt-1.5 text-[11px] leading-relaxed text-faint">
                {copy.llmSub}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-line pt-5">
        <LaneLabel>{copy.async}</LaneLabel>
        <div className="flex flex-wrap items-stretch gap-x-2 gap-y-2">
          {copy.steps.map((step) => (
            <span
              key={step}
              className="border border-line bg-surface px-3 py-2 text-[10px] uppercase tracking-[0.1em] text-muted"
            >
              {step}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SEALS — deployment topology                                                */
/* -------------------------------------------------------------------------- */

const sealsCopy = {
  en: {
    clients: "Clients",
    flutter: "Flutter app",
    flutterSub: "Mobile & web · Bloc · Dio · ar/en localization",
    admin: "Admin dashboard",
    adminSub: "Next.js App Router · TypeScript strict",
    edge: "Edge",
    edgeSub: "Caddy — TLS/HSTS termination · nginx serves Flutter web SPA",
    api: "Next.js API tier",
    apiSub: "Zod-validated surface · NextAuth HttpOnly cookie sessions",
    data: "Data & services",
    mongo: "MongoDB Atlas",
    mongoSub: "Replica set — transactions for order & inventory flows",
    cloudinary: "Cloudinary",
    cloudinarySub: "Media pipeline",
    email: "SMTP / Nodemailer",
    emailSub: "Transactional email",
    footer: "Docker Compose · GitHub Actions CI builds production images on every push",
  },
  ar: {
    clients: "العملاء",
    flutter: "تطبيق Flutter",
    flutterSub: "هاتف وويب · Bloc · Dio · تعريب عربي/إنجليزي",
    admin: "لوحة الإدارة",
    adminSub: "Next.js App Router · TypeScript strict",
    edge: "الحافة",
    edgeSub: "Caddy — إنهاء TLS/HSTS · nginx يقدم Flutter web SPA",
    api: "طبقة Next.js API",
    apiSub: "سطح متحقق بـZod · جلسات cookies من NextAuth وHttpOnly",
    data: "البيانات والخدمات",
    mongo: "MongoDB Atlas",
    mongoSub: "Replica set — معاملات لمسارات الطلب والمخزون",
    cloudinary: "Cloudinary",
    cloudinarySub: "مسار الوسائط",
    email: "SMTP / Nodemailer",
    emailSub: "بريد المعاملات",
    footer: "Docker Compose · يبني GitHub Actions CI صور الإنتاج عند كل push",
  },
} as const;

function SealsDiagram({ locale }: { locale: Locale }) {
  const copy = sealsCopy[locale];

  return (
    <div className="mx-auto max-w-2xl space-y-2 font-mono">
      <LaneLabel>{copy.clients}</LaneLabel>
      <div className="grid gap-2 md:grid-cols-2">
        <Node label={copy.flutter} sub={copy.flutterSub} />
        <Node label={copy.admin} sub={copy.adminSub} />
      </div>

      <Arrow />

      <Node label={copy.edge} sub={copy.edgeSub} />

      <Arrow />

      <Node
        label={copy.api}
        sub={copy.apiSub}
      />

      <Arrow />

      <LaneLabel>{copy.data}</LaneLabel>
      <div className="grid gap-2 md:grid-cols-3">
        <Node
          label={copy.mongo}
          sub={copy.mongoSub}
          accent
        />
        <Node label={copy.cloudinary} sub={copy.cloudinarySub} />
        <Node label={copy.email} sub={copy.emailSub} />
      </div>

      <p className="border-t border-line pt-3 text-center text-[11px] uppercase tracking-[0.12em] text-faint">
        {copy.footer}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Lumora — tenant isolation model                                            */
/* -------------------------------------------------------------------------- */

const lumoraCopy = {
  en: {
    middleware: "Edge middleware — Auth.js v5",
    middlewareSub: "Verifies user / merchant / staff tokens before any handler runs",
    storefront: "Storefront",
    storefrontSub: "Customer session",
    dashboard: "Merchant dashboard",
    dashboardSub: "Merchant session",
    pos: "POS terminal",
    posSub: "Staff session",
    tenant: "Tenant → Stores",
    tenantSub: "One inventory ledger across storefront, POS and delivery — automatic deduction at sale",
    footer: "Upstash Redis rate limiting · in-memory fallback · MongoDB via Mongoose",
  },
  ar: {
    middleware: "Edge middleware — Auth.js v5",
    middlewareSub: "تتحقق من tokens المستخدم والتاجر والموظف قبل تشغيل أي handler",
    storefront: "واجهة المتجر",
    storefrontSub: "جلسة العميل",
    dashboard: "لوحة التاجر",
    dashboardSub: "جلسة التاجر",
    pos: "نقطة البيع",
    posSub: "جلسة الموظف",
    tenant: "المستأجر ← المتاجر",
    tenantSub: "سجل مخزون واحد للمتجر وPOS والتوصيل، مع خصم تلقائي عند البيع",
    footer: "تحديد معدل عبر Upstash Redis · fallback داخل الذاكرة · MongoDB عبر Mongoose",
  },
} as const;

function LumoraDiagram({ locale }: { locale: Locale }) {
  const copy = lumoraCopy[locale];

  return (
    <div className="mx-auto max-w-2xl space-y-2 font-mono">
      <Node
        label={copy.middleware}
        sub={copy.middlewareSub}
        accent
      />

      <Arrow />

      <div className="grid gap-2 md:grid-cols-3">
        <Node label={copy.storefront} sub={copy.storefrontSub} />
        <Node label={copy.dashboard} sub={copy.dashboardSub} />
        <Node label={copy.pos} sub={copy.posSub} />
      </div>

      <Arrow />

      <Node
        label={copy.tenant}
        sub={copy.tenantSub}
      />

      <p className="border-t border-line pt-3 text-center text-[11px] uppercase tracking-[0.12em] text-faint">
        {copy.footer}
      </p>
    </div>
  );
}
