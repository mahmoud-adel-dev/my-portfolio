"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import type { Locale } from "@/lib/i18n";

export function ProjectRequestForm({ locale }: { locale: Locale }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: locale === "ar" ? "أنظمة ووكلاء الذكاء الاصطناعي (AI SaaS)" : "AI Systems & Agents (AI SaaS)",
    budget: "$3,000 - $10,000",
    message: "",
  });

  const isAr = locale === "ar";

  const services = isAr
    ? [
        "أنظمة ووكلاء الذكاء الاصطناعي (AI SaaS)",
        "بنية وتطوير منصات SaaS متعددة المستأجرين",
        "تطوير الويب المتكامل وتطبيقات فلاتر",
        "أنظمة وشبكات البنية التحتية المحلية (On-Premises)",
        "استشارة تقنية وتدقيق معماري",
      ]
    : [
        "AI Systems & Agents (AI SaaS)",
        "Multi-Tenant SaaS Architecture",
        "Full-Stack Web & Flutter Apps",
        "On-Premises Network & Systems Infrastructure",
        "Technical Consultation & Architectural Audit",
      ];

  const budgets = ["$1,000 - $3,000", "$3,000 - $10,000", "$10,000+", isAr ? "غير محدد / استشارة" : "Not specified / Advisory"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError(isAr ? "يرجى ملء الاسم، البريد الإلكتروني، وتفاصيل المشروع." : "Please provide name, email, and project details.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Submission failed");
      }

      setSuccess(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error";
      setError(isAr ? `حدث خطأ أثناء الإرسال: ${msg}` : `Failed to submit: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-8 text-center">
        <CheckCircle2 className="mx-auto size-12 text-emerald-400" strokeWidth={1.7} />
        <h3 className="mt-4 font-mono text-lg font-bold text-fg">
          {isAr ? "تم استلام طلبك بنجاح!" : "Request Received Successfully!"}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {isAr
            ? "شكراً لتواصلك يا باشمهندس. سيقوم محمود بمراجعة تفاصيل المشروع والتواصل معك في أقرب وقت عبر البريد أو الواتساب."
            : "Thank you for reaching out. Mahmoud will review your project details and get back to you promptly."}
        </p>
        <button
          type="button"
          onClick={() => {
            setSuccess(false);
            setFormData({
              name: "",
              email: "",
              phone: "",
              serviceType: services[0]!,
              budget: budgets[1]!,
              message: "",
            });
          }}
          className="control-button mt-6 px-4 text-xs font-semibold"
        >
          {isAr ? "إرسال طلب آخر" : "Send another inquiry"}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-line bg-surface/50 p-6 md:p-8 backdrop-blur-sm">
      <div className="border-b border-line pb-4">
        <h3 className="font-mono text-base font-bold text-fg">
          {isAr ? "طلب مشروع أو استشارة معمارية" : "Request a Project or Architecture Advisory"}
        </h3>
        <p className="mt-1 text-xs text-muted">
          {isAr
            ? "أرسل تفاصيل مشروعك أو فكرتك وسأرد عليك بدراسة أولية وتقدير زمني."
            : "Send your system specs or idea, and I will reply with an architectural breakdown & estimate."}
        </p>
      </div>

      {error ? (
        <div className="rounded border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
          {error}
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-faint">
            {isAr ? "الاسم الكامل" : "Your Name"} *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder={isAr ? "م. أحمد علي" : "John Doe"}
            className="w-full rounded border border-line bg-background/80 px-3 py-2 text-sm text-fg placeholder:text-faint/60 focus:border-accent focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-faint">
            {isAr ? "البريد الإلكتروني" : "Email Address"} *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="eng@example.com"
            className="w-full rounded border border-line bg-background/80 px-3 py-2 text-sm text-fg placeholder:text-faint/60 focus:border-accent focus:outline-none"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-faint">
            {isAr ? "رقم الهاتف / واتساب (اختياري)" : "Phone / WhatsApp (Optional)"}
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+20 1..."
            className="w-full rounded border border-line bg-background/80 px-3 py-2 text-sm text-fg placeholder:text-faint/60 focus:border-accent focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-faint">
            {isAr ? "الميزانية المتوقعة" : "Estimated Budget"}
          </label>
          <select
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="w-full rounded border border-line bg-background/80 px-3 py-2 text-sm text-fg focus:border-accent focus:outline-none"
          >
            {budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-faint">
          {isAr ? "نوع الخدمة المطلوبة" : "Service Type"}
        </label>
        <select
          value={formData.serviceType}
          onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
          className="w-full rounded border border-line bg-background/80 px-3 py-2 text-sm text-fg focus:border-accent focus:outline-none"
        >
          {services.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-faint">
          {isAr ? "تفاصيل المشروع أو المتطلبات" : "Project Details & Scope"} *
        </label>
        <textarea
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder={
            isAr
              ? "اشرح باختصار فكرة المنصة أو التطبيق، التقنيات المفضلة، أو أي متطلبات خاصة بالبنية التحتية..."
              : "Describe your system goals, target platforms, timeline or architectural requirements..."
          }
          className="w-full rounded border border-line bg-background/80 px-3 py-2 text-sm text-fg placeholder:text-faint/60 focus:border-accent focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        data-track-click="true"
        data-track-label="Submit Project Request"
        data-track-category="form"
        className="flex w-full items-center justify-center gap-2 rounded bg-accent px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-on-accent transition-all hover:bg-accent-strong disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            <span>{isAr ? "جاري الإرسال..." : "Sending..."}</span>
          </>
        ) : (
          <>
            <Send className="size-4" />
            <span>{isAr ? "إرسال طلب المشروع الآن" : "Submit Project Request"}</span>
          </>
        )}
      </button>
    </form>
  );
}
