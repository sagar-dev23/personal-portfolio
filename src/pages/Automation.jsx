import { Button, Scribble, SectionHead, Label, Tags, Img } from "../components/shared.jsx";
import { CtaBand } from "../components/Cards.jsx";
import { FlowLine, NodeCanvas, KindIcon } from "../components/Flow.jsx";
import { AUTOMATION_PROJECTS, LAB_PROJECTS } from "../content/projects.js";
import { AUTO_SERVICES, AUTO_STACK } from "../content/site.js";

const CANVAS_NODES = [
  { label: "Website form", note: "trigger", kind: "trigger", x: 2, y: 40, mx: 4, my: 4 },
  { label: "Webhook", note: "POST /lead", kind: "logic", x: 22, y: 14, mx: 52, my: 17 },
  { label: "Dedupe", note: "email · phone", kind: "logic", x: 24, y: 66, mx: 6, my: 31 },
  { label: "AI step", note: "summary + score", kind: "ai", x: 47, y: 38, mx: 44, my: 46 },
  { label: "CRM", note: "create / update", kind: "app", x: 72, y: 12, mx: 6, my: 62 },
  { label: "Google Sheets", note: "append row", kind: "app", x: 70, y: 66, mx: 42, my: 75 },
  { label: "Notify sales", note: "email / Slack", kind: "output", x: 86, y: 40, mx: 8, my: 89 },
];
const CANVAS_EDGES = [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5], [4, 6]];

// Reusable layout for one automation case study; add a project to
// AUTOMATION_PROJECTS and it appears here and gets its own /work page.
export function AutomationCase({ p, index }) {
  const shot = p.shots?.[0];
  return (
    <article className="ac reveal" aria-labelledby={`ac-${p.slug}`}>
      <header className="ac-head">
        <span className="ac-index">{String(index + 1).padStart(2, "0")}</span>
        <p className="ac-status"><span className="status-dot" aria-hidden="true" />Built · {p.platform}</p>
        <h3 id={`ac-${p.slug}`} className="ac-title">{p.name}</h3>
        <p className="ac-summary">{p.summary}</p>
      </header>
      <FlowLine nodes={p.flow} label={`${p.name} workflow`} />
      <div className="ac-grid">
        <div className="ac-col">
          <p className="ac-h">The problem</p>
          <p>{p.problem}</p>
          <p className="ac-h">Tools</p>
          <Tags items={p.stack} />
        </div>
        <pre className="code-card" aria-label="Workflow logic"><code>{p.workflow.join("\n")}</code></pre>
        {shot && (
          <a className="ac-shot" href={`/work/${p.slug}`}>
            <Img name={shot.img} alt={shot.alt} sizes="(max-width: 900px) 100vw, 380px" />
            <span>Screenshots + full case study →</span>
          </a>
        )}
      </div>
    </article>
  );
}

export default function Automation() {
  return (
    <>
      <section className="page-hero auto-hero" aria-labelledby="auto-title">
        <div className="wrap">
          <p className="crumbs reveal in"><a href="/">Home</a> / <span>Automation</span></p>
          <div className="auto-hero-grid">
            <div>
              <Label n="01">automation &amp; ai integrations</Label>
              <h1 id="auto-title" className="h1 h1-tech reveal in">
                Automate the Work. Connect the Systems. <span className="mark">Work Smarter.<Scribble type="underline" className="in" /></span>
              </h1>
            </div>
            <div className="auto-hero-side reveal in">
              <p className="hero-lede">I build intelligent workflows and integrations that connect business tools, reduce repetitive tasks, and make everyday operations more efficient.</p>
              <div className="hero-actions">
                <Button href="#projects" variant="light">Explore Automation Projects</Button>
              </div>
            </div>
          </div>
          <div className="reveal in">
            <NodeCanvas nodes={CANVAS_NODES} edges={CANVAS_EDGES} caption={<><span className="kbd">drag</span> the nodes around. This is roughly what a lead workflow looks like.</>} />
          </div>
        </div>
      </section>

      <section className="section auto-services" aria-labelledby="auto-services-title">
        <div className="wrap">
          <SectionHead n="02" label="services" id="auto-services-title" title={<>Where automation helps<span className="dot">.</span></>} intro="Four kinds of work. In practice they overlap: a lead workflow usually touches a form, an API, a CRM and sometimes an AI step." />
          <div className="node-cards">
            {AUTO_SERVICES.map((s, i) => (
              <article key={s.t} className="node-card reveal" style={{ "--i": i }}>
                <span className="port port-in" aria-hidden="true" /><span className="port port-out" aria-hidden="true" />
                <p className="node-card-n"><KindIcon kind={["ai", "logic", "app", "trigger"][i]} />{s.n}</p>
                <h3 className="node-card-t">{s.t}</h3>
                <ul>{s.items.map(it => <li key={it}>{it}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section auto-cases" id="projects" aria-labelledby="auto-cases-title">
        <div className="wrap">
          <SectionHead n="03" label="built projects" id="auto-cases-title" title={<>Automations I've built<span className="dot">.</span></>} intro="Real workflows, with the logic and screenshots from the builds. Client names are left out; staff names in screenshots are blurred." />
          <div className="ac-list">
            {AUTOMATION_PROJECTS.map((p, i) => <AutomationCase key={p.slug} p={p} index={i} />)}
          </div>
        </div>
      </section>

      <section className="section lab" aria-labelledby="lab-title">
        <div className="wrap">
          <SectionHead n="04" label="in the lab" id="lab-title" title={<>What I'm exploring next<span className="dot">.</span></>} intro="Personal experiments and ideas in progress, not client deployments. They build on the workflows above, mostly by adding AI steps." />
          <div className="lab-grid">
            {LAB_PROJECTS.map(l => (
              <article key={l.name} className="lab-card reveal">
                <p className="lab-tag">Exploring</p>
                <h3 className="lab-title">{l.name}</h3>
                <p className="lab-note">{l.note}</p>
                <FlowLine nodes={l.flow} compact wrap label={`${l.name} concept`} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="auto-stack-title">
        <div className="wrap">
          <SectionHead n="05" label="stack" id="auto-stack-title" title={<>Tools I automate with<span className="dot">.</span></>} />
          <ul className="chip-cloud reveal">{AUTO_STACK.map(t => <li key={t}>{t}</li>)}</ul>
        </div>
      </section>

      <CtaBand
        title="Let's automate something meaningful."
        text="Tell me which task your team keeps doing by hand. That's usually the best place to start."
        primary={{ href: "/contact", label: "Start an automation project" }}
        secondary={{ href: "/work?filter=automation", label: "All automation projects" }}
        flow={[{ label: "Your process", kind: "trigger" }, { label: "Map it", kind: "logic" }, { label: "Automate", kind: "ai" }, { label: "Hand back time", kind: "output" }]}
      />
    </>
  );
}
