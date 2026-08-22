export const supportedLocales = ["en", "ar"] as const;

export type Locale = (typeof supportedLocales)[number];

export function isLocale(value: string | null): value is Locale {
  return value === "en" || value === "ar";
}

export const translations = {
  en: {
    languageName: "Arabic",
    direction: "ltr",
    nav: {
      work: "Work",
      expertise: "Expertise",
      about: "About",
      contact: "Contact",
      primaryLabel: "Primary navigation",
      mobileLabel: "Mobile navigation",
      menu: "Menu",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      switchLanguage: "Switch to Arabic",
      switchLanguageShort: "العربية",
      switchToLight: "Switch to light mode",
      switchToDark: "Switch to dark mode",
      selectedWork: "Selected work",
      selectedWorkMeta: "04 case studies",
      expertiseMeta: "Capabilities and stack",
      aboutMeta: "How I work",
      contactMeta: "Start a conversation",
    },
    hero: {
      disciplines: ["Full-stack", "AI", "SaaS"],
      name: "Mahmoud Adel.",
      role: "Full-Stack & AI SaaS Engineer",
      lede:
        "I design and build scalable SaaS products, AI-powered platforms, and production-ready business systems, from multi-tenant architecture to the interface on top of it.",
      explore: "Explore selected work",
      github: "GitHub",
      currentlyBuilding: "Currently building",
      activeProjectsLabel: "Active projects",
    },
    selectedWork: {
      eyebrow: "Selected work",
      title: "Four systems, built to be operated.",
      lead:
        "Not demos: multi-tenant platforms with queues, contracts, transactions and deployment stories. Each case study covers the architecture and the decisions behind it.",
    },
    moreProjects: {
      eyebrow: "Also on GitHub",
      title: "More builds.",
      lead:
        "Smaller systems with the same standards: real authentication, real data and real operations.",
      history: "Full project history on GitHub",
    },
    capabilities: {
      eyebrow: "What I build",
      title: "Engineering capabilities.",
      lead:
        "The through-line across every project: systems that hold up once real users, real money and real concurrency arrive.",
    },
    stack: {
      eyebrow: "Technical expertise",
      title: "Built with.",
      lead:
        "Organized by responsibility rather than hype cycles. Each tool earns its place by doing a job in a shipped system.",
    },
    philosophy: {
      eyebrow: "How I build",
      title: "Engineering notes.",
      lead:
        "Positions I hold after building platforms that have to survive real usage, stated clearly enough to be challenged.",
    },
    about: {
      eyebrow: "About",
      title: "Engineer for the whole product.",
      paragraphs: [
        "I build complete products: the tenant model underneath, the APIs in the middle, and the interface people actually use. My work centers on SaaS platforms, AI-powered systems and business applications, including CRM and engagement platforms, analytics engines, marketplaces, commerce and operations tools.",
        "The interesting problems are rarely the visible ones. They are how to isolate tenants so leakage is structurally impossible, keep inventory correct under concurrent orders, decide where an LLM adds value and where deterministic code must decide, and deploy the result so it can be monitored, backed up and operated.",
        "Everything on this site exists as working code on GitHub: repositories with CI pipelines, architecture documents and production runbooks, not screenshots of intentions.",
      ],
      focusAreas: "Focus areas",
      focusItems: [
        "Multi-tenant SaaS",
        "RAG and AI agents",
        "Deterministic analytics",
        "B2B and commerce systems",
        "Real-time operations",
      ],
      focusLabel: "Focus areas",
    },
    githubPanel: {
      eyebrow: "Open source of record",
      title: "Every project here lives on GitHub.",
      body:
        "Repositories include architecture documents, CI workflows and deployment runbooks. Read the code, not the marketing.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Have a product, platform, or engineering challenge worth solving?",
      body:
        "I take on serious builds: SaaS platforms, AI systems and business software that has to work in production. Choose the channel that suits you.",
      github: "GitHub",
      facebook: "Facebook",
      whatsapp: "WhatsApp",
      whatsappLabel: "Message Mahmoud on WhatsApp",
      facebookLabel: "Visit Mahmoud on Facebook",
    },
    footer: {
      role: "Full-Stack & AI SaaS Engineer",
      navigationLabel: "Social links",
    },
    projectActions: {
      readCaseStudy: "Read case study",
      viewRepository: "View repository",
    },
    caseStudy: {
      allWork: "All work",
      context: "Context",
      overview: "System overview",
      challenges: "Engineering challenges",
      architecture: "Architecture",
      diagramCaption: "System diagram",
      features: "Key features",
      decisions: "Technical direction",
      builtWith: "Built with",
      viewRepository: "View repository",
      next: "Next case study",
      nextLabel: "Next case study",
    },
    notFound: {
      title: "This page does not exist.",
      body:
        "The route you requested is not part of this site. Everything worth reading starts at the homepage.",
      back: "Back home",
    },
    skipToContent: "Skip to content",
  },
  ar: {
    languageName: "الإنجليزية",
    direction: "rtl",
    nav: {
      work: "المشاريع",
      expertise: "الخبرات",
      about: "نبذة",
      contact: "تواصل",
      primaryLabel: "التنقل الرئيسي",
      mobileLabel: "التنقل على الهاتف",
      menu: "القائمة",
      openMenu: "فتح القائمة",
      closeMenu: "إغلاق القائمة",
      switchLanguage: "التبديل إلى الإنجليزية",
      switchLanguageShort: "English",
      switchToLight: "التبديل إلى الوضع الفاتح",
      switchToDark: "التبديل إلى الوضع الداكن",
      selectedWork: "أبرز المشاريع",
      selectedWorkMeta: "٤ دراسات حالة",
      expertiseMeta: "القدرات والتقنيات",
      aboutMeta: "منهجية العمل",
      contactMeta: "ابدأ محادثة",
    },
    hero: {
      disciplines: ["تطوير متكامل", "ذكاء اصطناعي", "SaaS"],
      name: "محمود عادل.",
      role: "مهندس برمجيات متكامل ومنصات SaaS بالذكاء الاصطناعي",
      lede:
        "أصمم وأبني منتجات SaaS قابلة للتوسع، ومنصات مدعومة بالذكاء الاصطناعي، وأنظمة أعمال جاهزة للإنتاج، بدءاً من بنية تعدد المستأجرين وحتى الواجهة التي يستخدمها العميل.",
      explore: "استعرض أبرز المشاريع",
      github: "GitHub",
      currentlyBuilding: "أعمل حالياً على",
      activeProjectsLabel: "المشاريع النشطة",
    },
    selectedWork: {
      eyebrow: "أبرز المشاريع",
      title: "أربعة أنظمة صُممت للتشغيل الفعلي.",
      lead:
        "ليست نماذج تجريبية، بل منصات متعددة المستأجرين تشمل الطوابير والعقود والمعاملات وخطط النشر. توضح كل دراسة حالة البنية والقرارات الهندسية وراءها.",
    },
    moreProjects: {
      eyebrow: "مشاريع أخرى على GitHub",
      title: "المزيد من المشاريع.",
      lead:
        "أنظمة أصغر بالمعايير نفسها: مصادقة حقيقية، وبيانات حقيقية، وتشغيل فعلي.",
      history: "جميع المشاريع على GitHub",
    },
    capabilities: {
      eyebrow: "ما الذي أبنيه",
      title: "قدرات هندسية متكاملة.",
      lead:
        "القاسم المشترك بين كل مشروع: أنظمة تصمد عند وصول مستخدمين حقيقيين وأموال حقيقية وطلبات متزامنة.",
    },
    stack: {
      eyebrow: "الخبرة التقنية",
      title: "التقنيات المستخدمة.",
      lead:
        "منظمة حسب المسؤولية لا حسب الرواج؛ لكل أداة مكان لأنها تؤدي وظيفة واضحة في نظام تم بناؤه وتشغيله.",
    },
    philosophy: {
      eyebrow: "كيف أبني",
      title: "مبادئ هندسية.",
      lead:
        "مواقف توصلت إليها بعد بناء منصات يجب أن تتحمل الاستخدام الحقيقي، ومصاغة بوضوح يسمح بمناقشتها.",
    },
    about: {
      eyebrow: "نبذة",
      title: "مهندس يهتم بالمنتج كاملاً.",
      paragraphs: [
        "أبني منتجات كاملة: نموذج المستأجرين في الأساس، وواجهات API في المنتصف، والواجهة التي يستخدمها الناس فعلياً. يتركز عملي على منصات SaaS والأنظمة المدعومة بالذكاء الاصطناعي وتطبيقات الأعمال، ومنها منصات إدارة العملاء والتفاعل، ومحركات التحليلات، والأسواق الإلكترونية، وأدوات التجارة والتشغيل.",
        "المشكلات الأهم نادراً ما تكون ظاهرة. المهم هو عزل المستأجرين بحيث يصبح تسرب البيانات مستحيلاً بنيوياً، والحفاظ على صحة المخزون مع الطلبات المتزامنة، وتحديد أين يضيف نموذج اللغة قيمة وأين يجب أن يقرر الكود الحتمي، ثم نشر النظام بصورة تسمح بمراقبته ونسخه احتياطياً وتشغيله.",
        "كل ما في هذا الموقع موجود ككود عامل على GitHub: مستودعات تضم خطوط CI ووثائق للبنية وأدلة تشغيل للإنتاج، وليست مجرد صور لأفكار مستقبلية.",
      ],
      focusAreas: "مجالات التركيز",
      focusItems: [
        "منصات SaaS متعددة المستأجرين",
        "RAG ووكلاء الذكاء الاصطناعي",
        "التحليلات الحتمية",
        "أنظمة B2B والتجارة",
        "التشغيل في الوقت الفعلي",
      ],
      focusLabel: "مجالات التركيز",
    },
    githubPanel: {
      eyebrow: "الكود هو المرجع",
      title: "كل مشروع هنا متاح على GitHub.",
      body:
        "تتضمن المستودعات وثائق البنية ومسارات CI وأدلة النشر والتشغيل. اطلع على الكود مباشرة.",
    },
    contact: {
      eyebrow: "تواصل",
      title: "هل لديك منتج أو منصة أو تحدٍ هندسي يستحق الحل؟",
      body:
        "أعمل على منصات SaaS وأنظمة الذكاء الاصطناعي وبرمجيات الأعمال التي يجب أن تعمل بكفاءة في الإنتاج. اختر وسيلة التواصل الأنسب لك.",
      github: "GitHub",
      facebook: "فيسبوك",
      whatsapp: "واتساب",
      whatsappLabel: "مراسلة محمود عبر واتساب",
      facebookLabel: "زيارة صفحة محمود على فيسبوك",
    },
    footer: {
      role: "مهندس برمجيات متكامل ومنصات SaaS بالذكاء الاصطناعي",
      navigationLabel: "روابط التواصل",
    },
    projectActions: {
      readCaseStudy: "اقرأ دراسة الحالة",
      viewRepository: "عرض المستودع",
    },
    caseStudy: {
      allWork: "كل المشاريع",
      context: "السياق",
      overview: "نظرة عامة على النظام",
      challenges: "التحديات الهندسية",
      architecture: "البنية الهندسية",
      diagramCaption: "مخطط النظام",
      features: "الميزات الرئيسية",
      decisions: "القرارات التقنية",
      builtWith: "التقنيات المستخدمة",
      viewRepository: "عرض المستودع",
      next: "دراسة الحالة التالية",
      nextLabel: "دراسة الحالة التالية",
    },
    notFound: {
      title: "هذه الصفحة غير موجودة.",
      body:
        "المسار الذي طلبته ليس جزءاً من هذا الموقع. يمكنك الوصول إلى كل المحتوى من الصفحة الرئيسية.",
      back: "العودة للرئيسية",
    },
    skipToContent: "تجاوز إلى المحتوى",
  },
} as const;
