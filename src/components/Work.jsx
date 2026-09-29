import { Img, MagneticButton, SectionHead } from "./shared.jsx";

const PROJECTS = [
  { id:"phi", client:"Phi Designs", title:"Premium office interiors — marketing site.", sub:"A marketing engagement focused on Webflow CMS migration and portfolio architecture across 13 collections.", tags:["Webflow","CMS","Integrations & Automations"], year:"2025", metric:"90+ PageSpeed · 150+ pages", img:"work-phi", alt:"Phi Designs marketing website homepage built in Webflow, shown in a browser window", url:"https://www.phidesigns.in/" },
  { id:"devx", client:"DevX", title:"Managed office spaces — marketing website.", sub:"Landing page optimisation and GTM setup for call-button conversion tracking across campaigns.", tags:["Webflow","CMS","Integrations & Automations"], year:"2025", metric:"250+ blogs · 200+ pages", img:"work-devx", alt:"DevX managed office spaces website homepage built in Webflow, shown in a browser window", url:"https://www.devx.work" },
  { id:"momentum91", client:"Momentum91", title:"Digital product agency — marketing site.", sub:"Webflow site build, CMS structure and brand presence for the agency — plus client projects delivered across Webflow, automation and growth.", tags:["Webflow","Custom Code","Integrations & Automations"], year:"2026", metric:"90+ PageSpeed · 5+ client projects", img:"work-momentum91", alt:"Momentum91 digital product agency website homepage built in Webflow, shown in a browser window", url:"https://www.momentum91.com" },
  { id:"allevents", client:"AllEvents", title:"Ad landing page for global events platform.", sub:"A conversion-focused landing page built on Webflow for paid ad campaigns, optimised for speed and lead capture.", tags:["Webflow","Landing Page","Ads"], year:"2025", metric:"90+ PageSpeed", img:"work-allevents", alt:"AllEvents paid-ads landing page built in Webflow, shown in a browser window", url:"https://allevents-landing-page.webflow.io/" },
];

const CLIENTS = [
  { name:"Tixa",              img:"client-tixa" },
  { name:"AltiusHub",         img:"client-altiushub" },
  { name:"BestBid",           img:"client-bestbid" },
  { name:"Devyami",           img:"client-devyami" },
  { name:"Knockout Fight Club", img:"client-knockout" },
  { name:"Ironman Lifestyle", img:"client-ironman" },
];

// Rendered width of the screenshot column in the stacked card (1.1fr of a 1344px row).
const SHOT_SIZES = "(max-width: 880px) calc(100vw - 40px), min(52vw, 704px)";

function WorkStacked() {
  return (
    <div className="mosaic stacked reveal" style={{ gap:28 }}>
      {PROJECTS.map(p =>
        <a className="m" key={p.id} href={p.url} target="_blank" rel="nofollow noopener noreferrer">
          <div className="img" style={{ aspectRatio:"16/9" }}>
            <Img name={p.img} alt={p.alt} sizes={SHOT_SIZES} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
          </div>
          <div className="meta">
            <span className="mono">{p.client} · {p.year}</span>
            <h3 style={{ fontSize:"clamp(20px,2.4vw,36px)" }}>{p.title}</h3>
            <p style={{ margin:0, color:"var(--muted)", fontSize:15, maxWidth:460 }}>{p.sub}</p>
            <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>{p.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:16, borderTop:"0.5px solid var(--line)", marginTop:8, gap:16 }}>
              <span className="mono" style={{ color:"var(--accent)", letterSpacing:"0.02em" }}>{p.metric}</span>
              <span style={{ fontFamily:"var(--font-display)", fontSize:14, color:"var(--accent)", whiteSpace:"nowrap" }}>View project ↗</span>
            </div>
          </div>
        </a>
      )}
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className="section" style={{ borderTop:"0.5px solid var(--line)" }}>
      <div className="wrap">
        <SectionHead index="/ 03" label="Selected work" title={<>Things I've built<br />lately<span style={{ color:"var(--accent)" }}>.</span></>} sub="A cross-section of the past three years across enterprise CMS, marketing sites, landing pages, and platform migrations." />
        <WorkStacked />
        {/* Client logos marquee */}
        <div className="reveal" style={{ marginTop:72, borderTop:"0.5px solid var(--line)", borderBottom:"0.5px solid var(--line)", padding:"40px 0", overflow:"hidden" }}>
          <span className="mono" style={{ display:"block", marginBottom:32, textAlign:"center" }}>Clients &amp; brands I've worked with</span>
          <div style={{ overflow:"hidden", maskImage:"linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)", WebkitMaskImage:"linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)" }}>
            <div style={{ display:"flex", gap:0, animation:"marquee 28s linear infinite", width:"max-content" }}>
              {[0, 1].map(ri =>
                // The second copy only exists to make the loop seamless, so hide it from assistive tech.
                <div key={ri} aria-hidden={ri ? "true" : undefined} style={{ display:"flex", alignItems:"center", gap:0 }}>
                  {CLIENTS.map(c =>
                    <div key={c.name} style={{ display:"flex", alignItems:"center", justifyContent:"center", padding:"0 56px", height:64, borderRight:"0.5px solid var(--line)" }}>
                      <Img name={c.img} alt={ri ? "" : `${c.name} logo`} style={{ width:"auto", height:32, objectFit:"contain", display:"block", filter:"var(--logo-filter, none)" }} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="reveal" style={{ marginTop:40, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:16 }}>
          <span className="mono">Working with: Solo founders → Series C → Enterprise</span>
          <MagneticButton href="#contact" className="btn btn-secondary">Discuss your project <span className="arrow">↗</span></MagneticButton>
        </div>
      </div>
    </section>
  );
}
