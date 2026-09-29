import { useEffect, useRef } from "react";
import images from "../images.json";

export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -10% 0px" });
    els.forEach(e => io.observe(e));
    return () => io.disconnect();
  });
}

// <img> backed by src/images.json so every image ships intrinsic width/height.
// Everything on this page sits below the hero, so lazy-loading is the default.
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
      {...rest}
    />
  );
}

export function SectionHead({ index, label, title, sub }) {
  return (
    <div className="reveal section-head-row">
      <div className="mono" style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 120 }}>
        <span>{index}</span>
        <span style={{ color: "var(--fg-2)" }}>{label}</span>
      </div>
      <div>
        <h2 className="display" style={{ margin: 0, maxWidth: 980, fontSize: "clamp(28px, 4.5vw, 60px)", lineHeight: 1 }}>{title}</h2>
        {sub && <p style={{ margin: "20px 0 0", color: "var(--muted)", fontSize: 17, maxWidth: 620 }}>{sub}</p>}
      </div>
    </div>
  );
}

export function MagneticButton({ href, onClick, className, children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    function onMove(e) {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width/2), y = e.clientY - (r.top + r.height/2);
      el.style.transform = `translate(${x*0.25}px,${y*0.25}px)`;
    }
    function onLeave() { el.style.transform = "translate(0,0)"; }
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, []);
  if (href) return <a ref={ref} href={href} className={className} {...rest}>{children}</a>;
  return <button ref={ref} onClick={onClick} className={className} {...rest}>{children}</button>;
}
