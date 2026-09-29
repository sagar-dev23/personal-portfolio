import { SectionHead } from "./shared.jsx";

export const SERVICES = [
  { n:"01", t:"Enterprise Webflow Development", d:"Multi-region marketing sites and complex CMS architectures, engineered for scale. Style systems, component libraries, and editorial workflows your team can actually operate.", tags:["Webflow","CMS","Multi-region","Localization","Style Systems"] },
  { n:"02", t:"Marketing Sites & Landing Pages", d:"Conversion-focused marketing sites for SaaS and product launches. Custom interactions, performance-tuned, A/B test-ready and tightly integrated with your stack.", tags:["SaaS","Conversion","A/B Testing","Webflow"] },
  { n:"03", t:"Custom Code & Integrations", d:"Bespoke JavaScript modules, custom code, GSAP animations, marketing attribution, and clean API integrations that connect your site to the tools your team actually runs on.", tags:["JavaScript","Finsweet Attributes","Cookies Consent","Webhooks","API"] },
  { n:"04", t:"Automation & Workflow Systems", d:"Zapier, Make.com and n8n workflows that connect your CMS to CRM, billing, ops and analytics. Lead routing, content sync, form intelligence — wired end-to-end.", tags:["Zapier","Make.com","n8n","GA4","GTM"] },
];

export default function Services() {
  return (
    <section id="services" className="section" style={{ borderTop:"0.5px solid var(--line)" }}>
      <div className="wrap">
        <SectionHead index="/ 02" label="Services" title={<>What I ship<span style={{ color:"var(--accent)" }}>.</span></>} sub="Four practices, woven together. Every engagement is custom — the throughline is craft, performance and a Webflow build that holds up at scale." />
        <div className="reveal">
          {SERVICES.map(s =>
            <div className="svc-row" key={s.n}>
              <div className="svc-num">{s.n}</div>
              <h3 className="svc-title" style={{ margin: 0 }}>{s.t}</h3>
              <div>
                <p className="svc-desc">{s.d}</p>
                <div className="svc-tags">{s.tags.map(tg => <span key={tg} className="tag">{tg}</span>)}</div>
              </div>
              <a href="#contact" className="ulink mono" style={{ alignSelf:"center", justifySelf:"start", paddingTop:8, color:"var(--fg-2)", whiteSpace:"nowrap" }}>Enquire ↗</a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
