import Footer from "./_components/Footer";
import HeroSection from "./_components/HeroSection";
import BakbakShowcase from "./_components/BakbakShowcase";
import ContactSection from "./_components/ContactSection";
import ExperienceSection from "./_components/ExperienceSection";
import FeaturedCaseStudy from "./_components/FeaturedCaseStudy";
import FieldNotesSection from "./_components/FieldNotesSection";
import AsciiTransition from "./_components/AsciiTransition";

export default function Home() {
  return (
    <main className="site-shell">
      <HeroSection />
      <ExperienceSection />
      <AsciiTransition />
      <FeaturedCaseStudy />
      <BakbakShowcase />
      <FieldNotesSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
