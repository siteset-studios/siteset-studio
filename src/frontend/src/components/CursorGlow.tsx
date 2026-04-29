import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -200, y: -200 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      if (glow) {
        const { x, y } = posRef.current;
        glow.style.transform = `translate(${x - 150}px, ${y - 150}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const handleMouseEnterInteractive = () => {
      if (glow) {
        glow.style.opacity = "1";
        glow.style.width = "320px";
        glow.style.height = "320px";
      }
    };

    const handleMouseLeaveInteractive = () => {
      if (glow) {
        glow.style.opacity = "0.5";
        glow.style.width = "300px";
        glow.style.height = "300px";
      }
    };

    const interactiveEls = document.querySelectorAll<HTMLElement>(
      "button, a, [data-cursor-glow]",
    );

    for (const el of interactiveEls) {
      el.addEventListener("mouseenter", handleMouseEnterInteractive);
      el.addEventListener("mouseleave", handleMouseLeaveInteractive);
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    const timeout = setTimeout(() => {
      const refreshedEls = document.querySelectorAll<HTMLElement>(
        "button, a, [data-cursor-glow]",
      );
      for (const el of refreshedEls) {
        el.addEventListener("mouseenter", handleMouseEnterInteractive);
        el.addEventListener("mouseleave", handleMouseLeaveInteractive);
      }
    }, 1000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
      clearTimeout(timeout);
      for (const el of interactiveEls) {
        el.removeEventListener("mouseenter", handleMouseEnterInteractive);
        el.removeEventListener("mouseleave", handleMouseLeaveInteractive);
      }
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="cursor-glow"
      aria-hidden="true"
      style={{
        width: "300px",
        height: "300px",
        background:
          "radial-gradient(circle, oklch(0.6 0.23 265 / 0.12) 0%, oklch(0.6 0.23 265 / 0.04) 50%, transparent 70%)",
        opacity: "0.5",
        transition: "opacity 0.3s ease, width 0.3s ease, height 0.3s ease",
      }}
    />
  );
}
