import { About } from "@/components/main/about";
import { Contact } from "@/components/main/contact";
import { Encryption } from "@/components/main/encryption";
import { Faq } from "@/components/main/faq";
import { Hero } from "@/components/main/hero";
import { Projects } from "@/components/main/projects";
import { Skills } from "@/components/main/skills";

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-6 md:gap-10">
        <Hero />
        <About />
        <Skills />
        <Encryption />
        <Projects />
        <Contact />
        <Faq />
      </div>
    </main>
  );
}
