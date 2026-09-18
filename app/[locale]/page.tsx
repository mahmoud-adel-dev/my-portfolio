import { About } from "@/components/home/about";
import { Capabilities } from "@/components/home/capabilities";
import { Contact } from "@/components/home/contact";
import { GithubPanel } from "@/components/home/github-panel";
import { Hero } from "@/components/home/hero";
import { MoreProjects } from "@/components/home/more-projects";
import { Philosophy } from "@/components/home/philosophy";
import { SelectedWork } from "@/components/home/selected-work";
import { Stack } from "@/components/home/stack";
import { isLocale, translations } from "@/lib/i18n";
import { notFound } from "next/navigation";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <Hero locale={locale} copy={translations[locale].hero} />
      <SelectedWork locale={locale} />
      <MoreProjects locale={locale} />
      <Capabilities locale={locale} />
      <Stack locale={locale} />
      <Philosophy locale={locale} />
      <About locale={locale} />
      <GithubPanel locale={locale} />
      <Contact locale={locale} />
    </>
  );
}
