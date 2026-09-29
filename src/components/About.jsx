import { useEffect, useRef, useState } from "react";
import { Img, SectionHead } from "./shared.jsx";

// Server render shows the final number (so crawlers and no-JS visitors see it);
// on the client it resets to 0 and counts up once scrolled into view.
function AnimatedCounter({ to, duration = 1500 }) {
  const ref = useRef(null);
  const [val, setVal] = useState(to);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    setVal(0);
    let done = false;
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting && !done) {
          done = true;
          const start = performance.now();
          const step = now => {
            const t = Math.min((now - start)/duration, 1);
            setVal(Math.round((1 - Math.pow(1-t, 3)) * to));
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      });
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{val}</span>;
}

// Bar width is in the markup; `.js .skill-fill:not(.on)` collapses it until in view.
function SkillBar({ label, pct }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { setOn(true); io.disconnect(); } });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [pct]);
  return (
    <div className="skill" ref={ref}>
      <div className="skill-head">
        <span className="skill-label">{label}</span>
        <span className="skill-pct">{pct}%</span>
      </div>
      <div className="skill-track"><div className={on ? "skill-fill on" : "skill-fill"} style={{ width: pct + "%" }} /></div>
    </div>
  );
}

const TOOLS = [
  { name: "Webflow",   img: "logo-webflow" },
  { name: "GitHub",    img: "logo-github" },
  { name: "ClickUp",   img: "logo-clickup" },
  { name: "Notion",    img: "logo-notion" },
  { name: "Microsoft Clarity", img: "logo-clarity" },
  { name: "HubSpot",   img: "logo-hubspot" },
  { name: "Zapier",    img: "logo-zapier" },
  { name: "Make.com",  img: "logo-make" },
  { name: "n8n",       img: "logo-n8n" },
  { name: "Google Analytics 4", img: "logo-ga4" },
  { name: "Google Tag Manager", img: "logo-gtm" },
  { name: "Figma",     img: "logo-figma" },
];

export default function About() {
  return (
    <section id="about" className="section" style={{ background: "var(--bg)" }}>
      <div className="wrap">
        <SectionHead
          index="/ 01" label="About"
          title={<>A Webflow developer building<br />refined, scalable web systems.</>}
          sub="Three years deep in Webflow. I work with founders, marketing teams and agencies to design and ship marketing sites and the integrations that keep them running."
        />
        <div className="bento reveal">
          {/* Portrait + bio */}
          <div className="b" style={{ gridColumn:"span 5", gridRow:"span 2", padding:0, overflow:"hidden", display:"flex", flexDirection:"column" }}>
            <div style={{ flex:1, minHeight:280, borderRadius:0, overflow:"hidden", position:"relative" }}>
              <Img name="portrait" alt="Portrait of Sagar Panchal, freelance Webflow developer" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", position:"absolute", inset:0 }} />
            </div>
            <div style={{ padding:24, display:"flex", flexDirection:"column", gap:14 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline" }}>
                <h4 style={{ margin:0, fontSize:22, fontFamily:"var(--font-display)", fontWeight:500, letterSpacing:"-0.02em" }}>Sagar Panchal</h4>
                <span className="pill" style={{ height:24 }}><span className="dot"/>Open</span>
              </div>
              <p style={{ margin:0, color:"var(--muted)", fontSize:14.5 }}>Webflow developer &amp; designer building enterprise-grade marketing sites, CMS architectures, and automations that scale past launch.</p>
            </div>
          </div>

          {/* Counters */}
          <div className="b" style={{ gridColumn:"span 7", padding:0, justifyContent:"stretch" }}>
            <div className="counter-inner">
              {[
                { v:3, sup:"+", l:"Years building" },
                { v:25, sup:"+", l:"Projects shipped" },
                { v:98, sup:"", l:"Avg PageSpeed" },
              ].map((c, i) =>
                <div key={c.l} className="counter-cell" style={{ borderLeft: i ? "0.5px solid var(--line)" : "none" }}>
                  <span className="mono">{String(i+1).padStart(2,"0")}</span>
                  <div>
                    <div className="display cv" style={{ fontSize:"clamp(28px, 3.6vw, 46px)", lineHeight:0.9, letterSpacing:"-0.04em" }}>
                      <AnimatedCounter to={c.v}/><span style={{ color:"var(--accent)", fontSize:"0.5em", verticalAlign:"super" }}>{c.sup}</span>
                    </div>
                    <span className="mono" style={{ display:"block", marginTop:10 }}>{c.l}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Skill bars */}
          <div className="b" style={{ gridColumn:"span 4" }}>
            <span className="mono" style={{ marginBottom:16 }}>Where I'm strongest</span>
            <div>
              <SkillBar label="Webflow Development" pct={95} />
              <SkillBar label="Integrations & Automations" pct={90} />
              <SkillBar label="Performance & SEO" pct={85} />
            </div>
          </div>

          {/* Core craft chips */}
          <div className="b" style={{ gridColumn:"span 3" }}>
            <span className="mono" style={{ marginBottom:16 }}>Core craft</span>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              {["Webflow","CMS","Design","Custom Code","API Integrations","n8n / Make","AI Automations","SEO","GTM","Tracking"].map(t =>
                <span className="tag" key={t}>{t}</span>
              )}
            </div>
          </div>

          {/* Industries Shipped */}
          <div className="b" style={{ gridColumn:"span 7" }}>
            <span className="mono" style={{ marginBottom:16 }}>Industries Shipped</span>
            <div style={{ display:"flex", flexDirection:"column" }}>
              {[
                "SaaS & B2B platforms",
                "Pharma & healthcare",
                "Fashion & lifestyle",
              ].map((item, i, arr) =>
                <div key={item} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 0", borderBottom: i < arr.length - 1 ? "0.5px solid var(--line-soft)" : "none" }}>
                  <span style={{ fontFamily:"var(--font-display)", fontSize:15, fontWeight:500, color:"var(--fg-2)", letterSpacing:"-0.01em" }}>{item}</span>
                  <span className="mono" style={{ color:"var(--accent)" }} aria-hidden="true">✓</span>
                </div>
              )}
            </div>
          </div>

          {/* Approach card */}
          <div className="b" style={{ gridColumn:"span 5", background:"var(--fg)", color:"var(--bg)", borderColor:"var(--fg)" }}>
            <span className="mono" style={{ color:"rgba(200,200,200,0.7)" }}>Approach</span>
            <h4 style={{ color:"var(--bg)", fontSize:20, lineHeight:1.2 }}>Strategy, design, build and automation — one craftsman, end&nbsp;to&nbsp;end.</h4>
          </div>
        </div>

        {/* Tool wall */}
        <div className="reveal" style={{ marginTop:64 }}>
          <div style={{ marginBottom:20 }}>
            <span className="mono">Stack · tools &amp; platforms</span>
          </div>
          <div className="tools">
            {TOOLS.map(t =>
              <div className="tool" key={t.name}>
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "12px 16px" }}>
                  <Img name={t.img} alt={`${t.name} logo`} style={{ width: "100%", maxWidth: 150, height: 56, objectFit: "contain", display: "block" }} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
