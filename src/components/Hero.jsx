import { useEffect, useRef } from "react";
import { MagneticButton } from "./shared.jsx";
import { CAL_URL } from "../config.js";

function GridCanvas() {
  const ref = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const targets = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf, w, h, dpr;
    const dots = [];
    const spacing = 28, radius = 1.1, influence = 180;
    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.scale(dpr, dpr);
      dots.length = 0;
      const cols = Math.ceil(w / spacing) + 1;
      const rows = Math.ceil(h / spacing) + 1;
      for (let i = 0; i < cols; i++)
        for (let j = 0; j < rows; j++)
          dots.push({ x: i*spacing, y: j*spacing, ox: i*spacing, oy: j*spacing });
    }
    function onMove(e) {
      const rect = canvas.parentElement.getBoundingClientRect();
      targets.current.x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      targets.current.y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    }
    function onLeave() { targets.current.x = -9999; targets.current.y = -9999; }
    function loop() {
      mouse.current.x += (targets.current.x - mouse.current.x) * 0.12;
      mouse.current.y += (targets.current.y - mouse.current.y) * 0.12;
      ctx.clearRect(0, 0, w, h);
      const mx = mouse.current.x, my = mouse.current.y;
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      const baseAlpha = isDark ? 0.18 : 0.14;
      for (let d of dots) {
        const dx = d.x - mx, dy = d.y - my;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < influence) {
          const t = 1 - dist / influence;
          const push = t * 14, ang = Math.atan2(dy, dx);
          d.x += (d.ox + Math.cos(ang)*push - d.x) * 0.18;
          d.y += (d.oy + Math.sin(ang)*push - d.y) * 0.18;
          const r = radius + t * 2.2;
          ctx.fillStyle = t > 0.55
            ? `rgba(20,110,245,${0.95 * (t - 0.4)})`
            : isDark ? `rgba(244,242,236,${baseAlpha + t*0.5})` : `rgba(10,10,10,${baseAlpha + t*0.5})`;
          ctx.beginPath(); ctx.arc(d.x, d.y, r, 0, Math.PI*2); ctx.fill();
        } else {
          d.x += (d.ox - d.x) * 0.08; d.y += (d.oy - d.y) * 0.08;
          ctx.fillStyle = isDark ? `rgba(244,242,236,${baseAlpha})` : `rgba(10,10,10,${baseAlpha})`;
          ctx.beginPath(); ctx.arc(d.x, d.y, radius, 0, Math.PI*2); ctx.fill();
        }
      }
      raf = requestAnimationFrame(loop);
    }
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseleave", onLeave); };
  }, []);
  return <canvas ref={ref} className="grid-canvas" aria-hidden="true" />;
}

function Capabilities() {
  const caps = ["Webflow Development","Enterprise Scale","Custom Code","CMS Architecture","Integrations","Zapier · Make · n8n","Performance","SEO & GA4","AI Automations","GTM & Tracking","ClickUp","Figma"];
  return (
    <div className="marquee-row" style={{ padding: "18px 0" }}>
      <div className="marquee">
        {[...caps, ...caps].map((c, i) =>
          <span key={i} className="mono" aria-hidden={i >= caps.length ? "true" : undefined} style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
            <span style={{ color: "var(--accent)" }} aria-hidden="true">●</span>{c}
          </span>
        )}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="hero" style={{ position: "relative", minHeight: "100svh", paddingTop: "clamp(80px, 14vw, 120px)", paddingBottom: "clamp(40px, 6vw, 60px)", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden", borderBottom: "0.5px solid var(--line)" }}>
      <GridCanvas />
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <div className="reveal in" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 80, gap: 16, flexWrap: "wrap" }}>
          <span className="eyebrow">Sagar Panchal · Webflow Developer</span>
          <span className="pill"><span className="dot" />Open for work</span>
        </div>
        <h1 className="display" style={{ margin: 0, maxWidth: "1180px", fontSize: "clamp(36px, 6.6vw, 96px)", color: "var(--fg)" }}>
          Websites that capture leads and route them to your CRM<span style={{ color: "var(--accent)" }}>.</span>
        </h1>
        <div className="hero-foot">
          <p style={{ margin: 0, fontSize: 18, lineHeight: 1.55, color: "var(--muted)", maxWidth: 560 }}>
            I'm <span style={{ fontWeight: 500, color: "var(--accent)" }}>Sagar Panchal</span>, a freelance Webflow developer for B2B SaaS and service businesses. I build the site, then the lead automation behind it: forms routed through Make, n8n or Zapier into HubSpot, GoHighLevel or Freshsales.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", flexWrap: "wrap" }}>
            <MagneticButton href={CAL_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Book a call <span className="arrow" aria-hidden="true">↗</span></MagneticButton>
            <MagneticButton href="#work" className="btn btn-secondary">View selected work</MagneticButton>
          </div>
        </div>
      </div>
      <div style={{ position: "relative", zIndex: 2, marginTop: 60, borderTop: "0.5px solid var(--line)", borderBottom: "0.5px solid var(--line)" }}>
        <Capabilities />
      </div>
    </section>
  );
}
