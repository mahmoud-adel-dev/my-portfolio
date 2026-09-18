import {
  BarChart3,
  Bot,
  Boxes,
  Database,
  MessageSquare,
  PackageCheck,
  ScanBarcode,
  ShoppingBag,
  Store,
  Truck,
} from "lucide-react";
import type { Locale } from "@/lib/i18n";

const previewCopy = {
  en: {
    chatzi: ["Channels", "Unified inbox", "AI + CRM"],
    aidl: ["Dataset", "Python engine", "Verified insight"],
    seals: ["Supplier", "Transaction core", "Delivery"],
    lumora: ["Storefront", "Shared inventory", "POS + Ops"],
  },
  ar: {
    chatzi: ["القنوات", "صندوق موحد", "ذكاء + CRM"],
    aidl: ["البيانات", "محرك Python", "نتيجة موثقة"],
    seals: ["المورد", "نواة المعاملة", "التوصيل"],
    lumora: ["المتجر", "مخزون موحد", "POS + تشغيل"],
  },
} as const;

const icons = {
  chatzi: [MessageSquare, Bot, Database],
  aidl: [BarChart3, Database, PackageCheck],
  seals: [Boxes, ShoppingBag, Truck],
  lumora: [Store, ScanBarcode, PackageCheck],
} as const;

export function ProjectPreview({ slug, locale }: { slug: string; locale: Locale }) {
  const projectSlug = slug as keyof (typeof previewCopy)["en"];
  const labels = previewCopy[locale][projectSlug] ?? previewCopy[locale].chatzi;
  const projectIcons = icons[projectSlug] ?? icons.chatzi;

  return (
    <div className="project-preview relative aspect-[16/7] overflow-hidden border-b border-line">
      <span className="preview-axis absolute inset-x-[12%] top-1/2 h-px" />
      <div className="absolute inset-0 grid grid-cols-3 items-center px-[7%]">
        {labels.map((label, index) => {
          const Icon = projectIcons[index] ?? Database;
          return (
            <div key={label} className="relative flex flex-col items-center gap-2 text-center">
              <span className="preview-node flex size-11 items-center justify-center sm:size-12">
                <Icon size={19} strokeWidth={1.55} />
              </span>
              <span className="max-w-24 text-[10px] font-semibold leading-tight text-muted sm:text-[11px]">
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
