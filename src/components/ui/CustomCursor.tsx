"use client";

import { useEffect, useRef } from "react";

/*
 * Small glowing ring that follows the mouse. Only active on devices with a
 * fine pointer (mouse/trackpad), and hidden for users who prefer reduced motion.
 * The native cursor is kept, so this is purely decorative.
 */
export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!finePointer || reduceMotion) return;

    let targetX = -100;
    let targetY = -100;
    let x = targetX;
    let y = targetY;
    let frame = 0;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      ring.style.opacity = "1";
    };
    const onLeave = () => {
      ring.style.opacity = "0";
    };

    const tick = () => {
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;
      ring.style.transform = `translate3d(${x - 16}px, ${y - 16}px, 0)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ringRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-8 w-8 rounded-full border border-primary/70 opacity-0 shadow-[0_0_12px_hsl(var(--primary)/0.4)] transition-opacity duration-200 [@media(pointer:fine)]:block"
    />
  );
}
