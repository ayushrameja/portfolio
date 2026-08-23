"use client";

import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => console.error(error), [error]);

  return (
    <main className="status-page" data-palette="mist">
      <div>
        <p className="eyebrow">Unexpected error</p>
        <h1>This page lost the plot.</h1>
        <p>The system hit an unexpected problem. A retry is cheaper than forming a committee.</p>
        <button type="button" onClick={reset} className="site-button site-button--primary">Try again</button>
      </div>
    </main>
  );
}
