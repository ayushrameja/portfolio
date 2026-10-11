"use client";

import { useEffect, useRef, useState } from "react";
import AsciiLoader from "./AsciiLoader";

export default function Portrait() {
  const image = useRef<HTMLImageElement>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  useEffect(() => {
    let active = true;
    image.current
      ?.decode()
      .then(() => {
        if (active) setState("ready");
      })
      .catch(() => {
        if (active) setState("error");
      });
    return () => {
      active = false;
    };
  }, []);
  return (
    <figure className="portrait-wrap">
      <div
        className={`portrait-frame portrait-${state}`}
        aria-busy={state === "loading"}
      >
        {/* Pre-sized, locally compressed artwork avoids a layout shift or image-service dependency. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={image}
          src="/assets/image/portrait.jpg"
          alt="Illustrated portrait of Ayush Rameja wearing glasses and a striped shirt"
          width={1200}
          height={400}
          fetchPriority="high"
          onLoad={() => setState("ready")}
          onError={() => setState("error")}
        />
        {state === "loading" && <AsciiLoader label="Loading portrait…" />}
        {state === "error" && (
          <span className="portrait-fallback">Ayush Rameja</span>
        )}
      </div>
      <noscript>
        <style>{`.portrait-loading img { visibility: visible !important; } .portrait-loading .ascii-loader { display: none !important; }`}</style>
      </noscript>
      <figcaption>Yep, that&apos;s me.</figcaption>
    </figure>
  );
}
