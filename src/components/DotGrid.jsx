import { useEffect, useRef } from "react";

// The interactive dot grid from the original site: dots push away from the cursor
// and the closest ones turn blue. Touch and reduced-motion get one static frame,
// and the loop pauses while the grid is off screen.
export default function DotGrid() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const spacing = 28, radius = 1.1, influence = 170;
    const target = { x: -9999, y: -9999 }, mouse = { x: -9999, y: -9999 };
    let dots = [], w = 0, h = 0, raf = 0, running = false;

    function resize() {
      const r = canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (let i = 0; i <= Math.ceil(w / spacing); i++)
        for (let j = 0; j <= Math.ceil(h / spacing); j++)
          dots.push({ x: i * spacing, y: j * spacing, ox: i * spacing, oy: j * spacing });
    }
    function draw() {
      mouse.x += (target.x - mouse.x) * 0.12;
      mouse.y += (target.y - mouse.y) * 0.12;
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        const dx = d.x - mouse.x, dy = d.y - mouse.y, dist = Math.hypot(dx, dy);
        let r = radius, color = "rgba(10,10,10,0.13)";
        if (dist < influence) {
          const t = 1 - dist / influence, a = Math.atan2(dy, dx);
          d.x += (d.ox + Math.cos(a) * t * 14 - d.x) * 0.18;
          d.y += (d.oy + Math.sin(a) * t * 14 - d.y) * 0.18;
          r = radius + t * 2.2;
          color = t > 0.55 ? `rgba(20,110,245,${0.95 * (t - 0.4)})` : `rgba(10,10,10,${0.13 + t * 0.45})`;
        } else {
          d.x += (d.ox - d.x) * 0.08; d.y += (d.oy - d.y) * 0.08;
        }
        ctx.fillStyle = color;
        ctx.beginPath(); ctx.arc(d.x, d.y, r, 0, Math.PI * 2); ctx.fill();
      }
      if (running) raf = requestAnimationFrame(draw);
    }
    const staticOnly = window.matchMedia("(hover: none), (pointer: coarse), (prefers-reduced-motion: reduce)").matches;
    const start = () => { if (running || staticOnly) return; running = true; raf = requestAnimationFrame(draw); };
    const stop = () => { running = false; cancelAnimationFrame(raf); };
    const onMove = e => { const r = canvas.getBoundingClientRect(); target.x = e.clientX - r.left; target.y = e.clientY - r.top; };
    const onLeave = () => { target.x = target.y = -9999; };
    const onResize = () => { resize(); if (!running) draw(); };
    const io = new IntersectionObserver(([en]) => (en.isIntersecting ? start() : stop()));
    resize(); draw(); io.observe(canvas);
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => { stop(); io.disconnect(); window.removeEventListener("resize", onResize); window.removeEventListener("pointermove", onMove); document.removeEventListener("mouseleave", onLeave); };
  }, []);
  return <canvas ref={ref} className="dot-grid" aria-hidden="true" />;
}
