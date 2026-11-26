import { useEffect, useRef, useState } from "react";
import images from "../images.json";

// Adds .in to every .reveal element (and .scribble) as it scrolls into view.
export function useReveal(dep) {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.in), .scribble:not(.in)");
    if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    els.forEach(e => io.observe(e));
    return () => io.disconnect();
  }, [dep]);
}

// <img> backed by src/images.json so every image ships intrinsic width/height.
export function Img({ name, alt, sizes, eager = false, ...rest }) {
  const im = images[name];
  if (!im) throw new Error(`Unknown image: ${name}`);
  return (
    <img
      src={im.src}
      srcSet={im.srcSet}
      sizes={im.srcSet ? sizes : undefined}
      width={im.width}
      height={im.height}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      fetchpriority={eager ? "high" : undefined}
      {...rest}
    />
  );
}

// Hand-drawn marks. The stroke draws itself in once the mark scrolls into view.
const SCRIBBLES = {
  underline: { vb: "0 0 300 24", d: "M3 15c40-6 80-9 122-8 46 1 84 6 124 2 17-2 33-5 48-8" },
  underline2: { vb: "0 0 300 30", d: "M4 18c55-9 115-12 176-9 40 2 77 5 116-1M40 26c50-5 110-6 170-3" },
  circle: { vb: "0 0 300 110", d: "M160 8C88 4 14 22 8 56c-6 36 72 50 150 48 76-2 138-20 136-52C292 22 230 4 150 10 110 13 70 22 50 30" },
  arrow: { vb: "0 0 120 90", d: "M6 10c30 2 62 14 80 36 10 12 16 24 18 38M88 70l16 14 8-20" },
  arrowLeft: { vb: "0 0 120 90", d: "M114 10C84 12 52 24 34 46 24 58 18 70 16 84M32 70 16 84 8 64" },
  sparkle: { vb: "0 0 40 40", d: "M20 3v12M20 25v12M3 20h12M25 20h12" },
};

export function Scribble({ type = "underline", className = "", ...rest }) {
  const s = SCRIBBLES[type];
  return (
    <svg className={`scribble scribble-${type} ${className}`} viewBox={s.vb} fill="none" aria-hidden="true" preserveAspectRatio="none" {...rest}>
      <path d={s.d} pathLength="1" />
    </svg>
  );
}

export function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>;
}

export function Button({ href, variant = "primary", children, external, ...rest }) {
  const ext = external ?? /^https?:/.test(href || "");
  return (
    <a href={href} className={`btn btn-${variant}`} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
      <span className="btn-label">{children}</span>
      <span className="btn-icon" aria-hidden="true">{ext ? "↗" : "→"}</span>
    </a>
  );
}

// "// 02 — services" style section label, like a code comment.
export function Label({ n, children, as: As = "p" }) {
  return (
    <As className="label">
      <span className="label-slash">//</span>{n && <span className="label-n">{n}</span>}<span>{children}</span>
    </As>
  );
}

export function SectionHead({ n, label, title, intro, align = "left", id }) {
  return (
    <header className={`section-head reveal ${align === "split" ? "is-split" : ""}`}>
      <Label n={n}>{label}</Label>
      <h2 id={id} className="h2">{title}</h2>
      {intro && <p className="lede">{intro}</p>}
    </header>
  );
}

export function Tags({ items, className = "" }) {
  return <ul className={`tags ${className}`}>{items.map(t => <li key={t} className="tag">{t}</li>)}</ul>;
}

// Live clock in Sagar's time zone (the previous site showed Asia/Kolkata too).
export function LocalTime() {
  const [t, setT] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata", hour12: false });
    const tick = () => setT(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return <span className="clock" suppressHydrationWarning>{t || "--:--"}</span>;
}

// Pointer-follow tilt for cards (desktop pointers only).
export function useTilt() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const move = e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--rx", `${(-y * 4).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${(x * 5).toFixed(2)}deg`);
      el.style.setProperty("--mx", `${((x + 0.5) * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${((y + 0.5) * 100).toFixed(1)}%`);
    };
    const leave = () => { el.style.setProperty("--rx", "0deg"); el.style.setProperty("--ry", "0deg"); };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); };
  }, []);
  return ref;
}
