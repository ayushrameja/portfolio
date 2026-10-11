"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function PlayfulEffects() {
  const cursor = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    const dot = cursor.current;
    let frame = 0;
    const hide = () => {
      if (dot) dot.hidden = true;
      cancelAnimationFrame(frame);
    };
    const move = (event: PointerEvent) => {
      if (
        !dot ||
        reduced.matches ||
        !fine.matches ||
        event.pointerType !== "mouse"
      )
        return hide();
      const target = event.target instanceof Element ? event.target : null;
      const link = target?.closest("a, button");
      if (!link || target?.closest("input, textarea, select")) return hide();
      const { clientX: x, clientY: y } = event;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        dot.hidden = false;
        dot.textContent = link.getAttribute("data-cursor") || "GO";
        dot.style.transform = `translate3d(${Math.min(x + 16, innerWidth - 58)}px, ${Math.max(4, Math.min(y + 16, innerHeight - 58))}px, 0) rotate(-10deg)`;
      });
    };
    document.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    document.addEventListener("visibilitychange", hide);
    document.addEventListener("keydown", hide);
    window.addEventListener("scroll", hide, { passive: true });
    fine.addEventListener("change", hide);
    reduced.addEventListener("change", hide);

    const animations = new Map<Element, Animation>();
    const revealed = new WeakSet<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            animations.get(entry.target)?.cancel();
            animations.delete(entry.target);
            return;
          }
          if (revealed.has(entry.target)) return;
          revealed.add(entry.target);
          if (reduced.matches || document.hidden) return;
          const animation = entry.target.animate(
            [
              {
                filter: "blur(5px)",
                opacity: 0.85,
                transform: "translateY(8px)",
              },
              { filter: "blur(0)", opacity: 1, transform: "translateY(0)" },
            ],
            { duration: 460, easing: "cubic-bezier(.2,.7,.2,1)" },
          );
          animations.set(entry.target, animation);
          animation.onfinish = () => {
            animations.delete(entry.target);
            observer.unobserve(entry.target);
          };
        });
      },
      { threshold: 0.1 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((el) => observer.observe(el));
    const stop = () => {
      if (document.hidden || reduced.matches) {
        animations.forEach((animation) => animation.cancel());
        animations.clear();
      }
    };
    document.addEventListener("visibilitychange", stop);
    reduced.addEventListener("change", stop);
    return () => {
      hide();
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      document.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", hide);
      document.removeEventListener("visibilitychange", hide);
      document.removeEventListener("keydown", hide);
      window.removeEventListener("scroll", hide);
      fine.removeEventListener("change", hide);
      reduced.removeEventListener("change", hide);
      document.removeEventListener("visibilitychange", stop);
      reduced.removeEventListener("change", stop);
    };
  }, [pathname]);
  return (
    <span ref={cursor} className="play-cursor" aria-hidden="true" hidden />
  );
}
