import { LINKS } from "@/constants/links";

export default function Footer() {
  return (
    <footer className="relative px-4 pb-28 sm:px-8">
      <div className="mx-auto flex w-full max-w-[88rem] flex-col gap-4 border-y journal-rule py-5 font-mono text-[10px] uppercase text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Ayush Rameja / Bangalore, India</p>
        <p>
          Built with Next.js / Typeset with Newsreader / <a className="hover:text-[var(--cobalt)]" href={LINKS.github}>Source nearby</a>
        </p>
      </div>
    </footer>
  );
}
