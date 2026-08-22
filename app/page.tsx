import { Hero } from "@/components/home/hero";
import { SelectedWork } from "@/components/home/selected-work";
import { MoreProjects } from "@/components/home/more-projects";
import { Capabilities } from "@/components/home/capabilities";
import { Stack } from "@/components/home/stack";
import { Philosophy } from "@/components/home/philosophy";
import { About } from "@/components/home/about";
import { GithubPanel } from "@/components/home/github-panel";
import { Contact } from "@/components/home/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <MoreProjects />
      <Capabilities />
      <Stack />
      <Philosophy />
      <About />
      <GithubPanel />
      <Contact />
    </>
  );
}
