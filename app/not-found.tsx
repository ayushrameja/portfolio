import Link from "next/link";

export default function NotFound() {
  return (
    <main className="status-page" data-palette="mist">
      <div>
        <p className="eyebrow">404 · Not found</p>
        <h1>This page is not part of the system.</h1>
        <p>The address may have changed, or the link has developed an independent career.</p>
        <Link href="/" className="site-button site-button--primary">Return home</Link>
      </div>
    </main>
  );
}
