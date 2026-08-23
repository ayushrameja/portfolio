import AsciiSystemMap from "@/components/AsciiSystemMap";

export default function AsciiTransition() {
  return (
    <section className="ascii-transition" data-palette="mist" aria-label="From experience to selected work">
      <div className="site-container ascii-transition__inner">
        <p className="eyebrow">Interface → service → cloud</p>
        <AsciiSystemMap />
        <p className="ascii-transition__caption">
          The strongest work is not a screen or an API. It is the system holding both together.
        </p>
      </div>
    </section>
  );
}
