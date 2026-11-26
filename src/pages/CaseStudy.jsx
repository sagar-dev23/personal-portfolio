import { Label, Tags, Img, Button } from "../components/shared.jsx";
import { ProjectCard, CtaBand, BrowserShot } from "../components/Cards.jsx";
import { FlowLine } from "../components/Flow.jsx";
import { ALL_PROJECTS, hasCaseStudy } from "../content/projects.js";

// One template for every case study. Sections only render when the project has
// real content for them, so nothing is padded out or invented.
function sectionsFor(p) {
  const auto = p.category === "automation";
  const s = [];
  if (p.overview) s.push({ id: "overview", t: "Project overview", body: <p className="cs-lede">{p.overview}</p> });
  if (p.problem) s.push({ id: "challenge", t: "Business challenge", body: <p>{p.problem}</p> });
  if (p.goals) s.push({ id: "goals", t: "Goals & requirements", body: <ul className="cs-list">{p.goals.map(g => <li key={g}>{g}</li>)}</ul> });
  if (p.role || auto) s.push({ id: "role", t: "My role", body: <p>{p.role || `I designed and built this workflow in ${p.platform}, from the trigger to the last notification.`}</p> });
  if (auto) {
    s.push({
      id: "approach", t: "Approach & implementation", body: (
        <>
          <FlowLine nodes={p.flow} wrap label={`${p.name} workflow`} />
          <pre className="code-card"><code>{p.workflow.join("\n")}</code></pre>
          {p.syncNote && <p className="cs-note">{p.syncNote}</p>}
        </>
      ),
    });
  } else if (p.scope) {
    s.push({ id: "approach", t: "What I worked on", body: <ul className="cs-list">{p.scope.map(g => <li key={g}>{g}</li>)}</ul> });
  }
  if (p.stack) s.push({ id: "stack", t: "Technology stack", body: <Tags items={p.stack} /> });
  if (p.shots?.length) {
    s.push({
      id: "screens", t: "Screenshots", body: (
        <div className="cs-shots">
          {p.shots.map(sh => <figure key={sh.img} className="cs-shot"><Img name={sh.img} alt={sh.alt} sizes="(max-width: 900px) 100vw, 760px" /><figcaption>{sh.alt}</figcaption></figure>)}
        </div>
      ),
    });
  }
  if (p.outcome) s.push({ id: "outcome", t: "Final outcome", body: <ul className="outcome">{p.outcome.map(o => <li key={o}>{o}</li>)}</ul> });
  return s;
}

export default function CaseStudy({ slug }) {
  const p = ALL_PROJECTS.find(x => x.slug === slug);
  const auto = p.category === "automation";
  const sections = sectionsFor(p);
  const related = ALL_PROJECTS.filter(x => x.slug !== p.slug && hasCaseStudy(x) && x.category === p.category).slice(0, 2);

  return (
    <>
      <section className={`page-hero cs-hero ${auto ? "auto-hero is-short" : ""}`} aria-labelledby="cs-title">
        <div className="wrap">
          <p className="crumbs reveal in"><a href="/">Home</a> / <a href="/work">Work</a> / <span>{p.name}</span></p>
          <Label>{auto ? `automation · ${p.platform}` : `website · ${p.year}`}</Label>
          <h1 id="cs-title" className="h1 cs-title reveal in">{p.name}</h1>
          <p className="hero-lede reveal in">{p.summary}</p>
          <div className="cs-facts reveal in">
            <div><span>Type</span><b>{auto ? "Automation & integrations" : "Website development"}</b></div>
            {auto && <div><span>Status</span><b><span className="status-dot" aria-hidden="true" />Built</b></div>}
            {p.year && <div><span>Year</span><b>{p.year}</b></div>}
            {p.url && <div><span>Live site</span><b><a href={p.url} target="_blank" rel="noopener noreferrer">{new URL(p.url).hostname.replace(/^www\./, "")} ↗</a></b></div>}
          </div>
        </div>
      </section>

      {p.img && (
        <div className="wrap cs-cover reveal"><BrowserShot p={p} eager /></div>
      )}

      <section className="section cs-body">
        <div className="wrap cs-grid">
          <nav className="cs-toc" aria-label="On this page">
            <p className="footer-h">On this page</p>
            {sections.map((s, i) => <a key={s.id} href={`#${s.id}`}><span>{String(i + 1).padStart(2, "0")}</span>{s.t}</a>)}
          </nav>
          <div className="cs-sections">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="cs-section reveal" aria-labelledby={`${s.id}-t`}>
                <p className="cs-n">{String(i + 1).padStart(2, "0")}</p>
                <h2 id={`${s.id}-t`} className="cs-h">{s.t}</h2>
                <div className="cs-content">{s.body}</div>
              </section>
            ))}
            {p.url && <p className="cs-visit"><Button href={p.url} variant="ghost">Visit the live site</Button></p>}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section related" aria-labelledby="related-title">
          <div className="wrap">
            <Label>related projects</Label>
            <h2 id="related-title" className="h2 reveal">More {auto ? "automations" : "websites"}</h2>
            <div className="pc-grid">{related.map(r => <ProjectCard key={r.slug} p={r} />)}</div>
          </div>
        </section>
      )}

      <CtaBand
        title={auto ? "Got a process like this?" : "Need a site like this?"}
        text={auto ? "Tell me what your team keeps doing by hand, and which tools are involved." : "Send me a short brief: what the site is for, and what it needs to connect to."}
        primary={{ href: "/contact", label: "Get in Touch" }}
        secondary={{ href: "/work", label: "Back to all work" }}
      />
    </>
  );
}
