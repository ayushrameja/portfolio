import AsciiLoader from "@/components/portfolio/AsciiLoader";
export default function Loading() {
  return (
    <main className="route-loading">
      <h1 className="sr-only">Loading page</h1>
      <AsciiLoader label="Getting things ready…" />
    </main>
  );
}
