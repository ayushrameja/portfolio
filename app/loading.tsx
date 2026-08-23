import AsciiSystemMap from "@/components/AsciiSystemMap";

export default function Loading() {
  return (
    <main className="loading-state" data-palette="paper">
      <p className="eyebrow">Loading portfolio</p>
      <AsciiSystemMap label="Loading portfolio" />
    </main>
  );
}
