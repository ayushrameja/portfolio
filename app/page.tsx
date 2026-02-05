import ContactSection from "./_components/ContactSection";
import Footer from "./_components/Footer";
import HeroSection from "./_components/HeroSection";
import ProjectsSection from "./_components/ProjectsSection";

export default function Home() {
  return (
    <main className="min-h-dvh pb-28">
      <HeroSection />

      <div className="px-6">
        <div className="mx-auto w-full max-w-6xl">
          <div className="h-px w-full bg-linear-to-r from-transparent via-zinc-300/60 to-transparent dark:via-zinc-700/60" />
        </div>
      </div>
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
