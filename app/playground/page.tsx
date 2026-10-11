import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Footer from "@/app/_components/Footer";

export const metadata: Metadata = {
  title: "Playground | Ayush Rameja",
  description:
    "Small tools, experiments, and archived projects by Ayush Rameja.",
  alternates: { canonical: "/playground" },
};
const experiments = [
  {
    name: "QRMint",
    status: "Live tool",
    summary: "Create and style QR codes for links, text, Wi-Fi, and more.",
    href: "https://qrmint.ayush.im/",
    glyph: "[::]",
  },
  {
    name: "Receipts",
    status: "Hosted utility",
    summary:
      "A small receipt-creation project. A useful job for a quiet corner of the web.",
    href: "https://receipts.lowhp.studio/",
    glyph: "≡",
  },
  {
    name: "Arveen",
    status: "Unofficial website",
    summary:
      "An independent website celebrating Arveen Poonia’s work. Not a commissioned client project.",
    href: "https://www.arveenpoonia.com/",
    glyph: "Aa",
  },
  {
    name: "KeyBrawl",
    status: "Prototype · source",
    summary: "An experiment in competitive typing, following TypeRush.",
    href: "https://github.com/ayushrameja/KeyBrawl",
    glyph: "{ }",
  },
];
export default function Playground() {
  return (
    <>
      <main className="portfolio-container directory-page">
        <header className="directory-heading">
          <p className="eyebrow">Small things / big curiosity</p>
          <h1 data-reveal>
            The
            <br />
            <span>Playground.</span>
          </h1>
          <p>Useful little tools and ideas that needed somewhere to go.</p>
        </header>
        <section className="playground-grid" aria-label="Experiments">
          <h2 className="sr-only">Tools and experiments</h2>
          {experiments.map((item) => (
            <article key={item.name}>
              <span className="playground-glyph" aria-hidden="true">
                {item.glyph}
              </span>
              <p className="eyebrow">{item.status}</p>
              <h3>
                <a href={item.href} data-cursor="PLAY">
                  {item.name}
                  <ArrowUpRight size={24} aria-hidden="true" />
                </a>
              </h3>
              <p>{item.summary}</p>
            </article>
          ))}
        </section>
        <section className="archive-section">
          <h2>The archive</h2>
          <a href="https://typerush.ayush.im/" className="archive-row">
            <strong>TypeRush</strong>
            <span>Archived typing game · Some features may be unavailable</span>
            <ArrowUpRight aria-hidden="true" />
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
