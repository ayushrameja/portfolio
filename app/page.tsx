import Footer from "./_components/Footer";
import HeroSection from "./_components/HeroSection";
import ContactSection from "./_components/ContactSection";
import ExperienceSection from "./_components/ExperienceSection";
import FeaturedCaseStudy from "./_components/FeaturedCaseStudy";
import FieldNotesSection from "./_components/FieldNotesSection";

export default function Home() {
  return (
    <main className="journal-shell">
      <HeroSection />
      <FeaturedCaseStudy />
      <ExperienceSection />
      <FieldNotesSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
