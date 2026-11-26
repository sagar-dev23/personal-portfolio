import { Img, Tags, Button, Scribble, Label, useTilt } from "./shared.jsx";
import { FlowLine } from "./Flow.jsx";
import { projectUrl } from "../content/projects.js";

const SHOT_SIZES = "(max-width: 760px) calc(100vw - 40px), (max-width: 1200px) 50vw, 620px";

function domain(url) {
  try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return ""; }
}

// Website screenshot inside a little browser window; the image drifts on hover.
export function BrowserShot({ p, eager }) {
  return (
    <div className="browser">
      <div className="browser-chrome" aria-hidden="true"><i /><i /><i /><span>{domain(p.url)}</span></div>
      <div className="browser-view"><Img name={p.img} alt={p.alt} sizes={SHOT_SIZES} eager={eager} /></div>
    </div>
  );
}

// No screenshot yet: a typographic placeholder instead of a stock image.
function NameThumb({ p }) {
  const initials = p.name.replace(/[^A-Za-z0-9 ]/g, "").split(" ").map(w => w[0]).join("").slice(0, 2);
  return (
    <div className="name-thumb" aria-hidden="true">
      <span className="name-thumb-initials">{initials}</span>
      <span className="name-thumb-name">{p.name}</span>
    </div>
  );
}

function AutomationThumb({ p }) {
  const shot = p.shots?.[0];
  return (
    <div className="auto-thumb">
      {shot && <Img name={shot.img} alt={shot.alt} sizes="(max-width: 760px) 100vw, 620px" />}
      <span className="auto-thumb-platform">{p.platform}</span>
    </div>
  );
}

export function ProjectCard({ p, eager, headingLevel = 3 }) {
  const ref = useTilt();
  const href = projectUrl(p);
  const H = `h${headingLevel}`;
  const isAuto = p.category === "automation";
  const body = (
    <>
      <div className="pc-media">
        {isAuto ? <AutomationThumb p={p} /> : p.img ? <BrowserShot p={p} eager={eager} /> : <NameThumb p={p} />}
      </div>
      <div className="pc-body">
        <p className="pc-meta">
          <span>{isAuto ? "Automation" : "Website"}</span>
          {p.year && <span>{p.year}</span>}
          {p.status === "built" && <span className="pc-built">Built</span>}
        </p>
        <H className="pc-title">{p.name}</H>
        {p.summary && <p className="pc-summary">{p.summary}</p>}
        {p.stack && <Tags items={p.stack.slice(0, 4)} />}
        <span className="pc-cta">{href ? <>View case study <span aria-hidden="true">→</span></> : "Case study coming soon"}</span>
      </div>
    </>
  );
  return href
    ? <a ref={ref} href={href} className={`pc ${isAuto ? "is-auto" : "is-web"}`}>{body}</a>
    : <div ref={ref} className="pc is-pending">{body}</div>;
}

// Projects that don't have a write-up yet: named, not padded out with empty cards.
export function MoreProjects({ projects }) {
  if (!projects.length) return null;
  return (
    <div className="more-projects reveal">
      <p className="more-projects-h">// also built</p>
      <ul aria-label="More website projects">{projects.map(p => <li key={p.slug}>{p.name}</li>)}</ul>
      <p className="more-projects-note">Case studies for these are on the way.</p>
    </div>
  );
}

export function ServiceCard({ n, title, items, href, cta, variant, children }) {
  const ref = useTilt();
  return (
    <article ref={ref} className={`svc svc-${variant} reveal`}>
      <div className="svc-top">
        <span className="svc-n">{n}</span>
        {children}
      </div>
      <h3 className="svc-title">{title}</h3>
      <ul className="svc-list">{items.map(i => <li key={i}>{i}</li>)}</ul>
      <Button href={href} variant="ghost">{cta}</Button>
    </article>
  );
}

export function Process({ steps, variant = "" }) {
  return (
    <ol className={`process ${variant} reveal`} style={{ "--n": steps.length }}>
      {steps.map((s, i) => (
        <li key={s.t} className="process-step" style={{ "--i": i }}>
          <span className="process-n">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="process-t">{s.t}</h3>
          <p className="process-d">{s.d}</p>
        </li>
      ))}
    </ol>
  );
}

export function StackGrid({ groups }) {
  return (
    <div className="stack reveal">
      {groups.map(g => (
        <div key={g.name} className="stack-group">
          <p className="stack-name">{g.name}</p>
          <ul className="stack-items">{g.items.map(i => <li key={i}>{i}</li>)}</ul>
        </div>
      ))}
    </div>
  );
}

export function CtaBand({ title, text, primary, secondary, flow }) {
  return (
    <section className="cta-band">
      <div className="wrap">
        <div className="cta-inner reveal">
          <Label>next step</Label>
          <h2 className="cta-title">{title}</h2>
          {text && <p className="cta-text">{text}</p>}
          <div className="cta-actions">
            <Button href={primary.href}>{primary.label}</Button>
            {secondary && <Button href={secondary.href} variant="ghost-light">{secondary.label}</Button>}
          </div>
          <Scribble type="arrow" className="cta-arrow" />
          {flow && <div className="cta-flow"><FlowLine nodes={flow} dark compact label="Your idea to launch" /></div>}
        </div>
      </div>
    </section>
  );
}
