import { useEffect, useState } from "react";
import { Label, Scribble } from "../components/shared.jsx";
import { ProjectCard, CtaBand, MoreProjects } from "../components/Cards.jsx";
import { ALL_PROJECTS, hasCaseStudy } from "../content/projects.js";

const FILTERS = [
  { id: "all", label: "All Projects" },
  { id: "web", label: "Website Development" },
  { id: "automation", label: "Automation & Integrations" },
];

const WITH_CASE = ALL_PROJECTS.filter(hasCaseStudy);
const PENDING = ALL_PROJECTS.filter(p => !hasCaseStudy(p));

export default function Work() {
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    const f = new URLSearchParams(location.search).get("filter");
    if (FILTERS.some(x => x.id === f)) setFilter(f);
  }, []);
  const choose = id => {
    setFilter(id);
    const url = new URL(location.href);
    id === "all" ? url.searchParams.delete("filter") : url.searchParams.set("filter", id);
    history.replaceState(null, "", url);
  };
  const count = id => (id === "all" ? ALL_PROJECTS.length : ALL_PROJECTS.filter(p => p.category === id).length);
  const shown = WITH_CASE.filter(p => filter === "all" || p.category === filter);
  const pending = PENDING.filter(p => filter === "all" || p.category === filter);

  return (
    <>
      <section className="page-hero work-hero" aria-labelledby="work-title">
        <div className="wrap">
          <p className="crumbs reveal in"><a href="/">Home</a> / <span>Work</span></p>
          <Label n="01">work</Label>
          <h1 id="work-title" className="h1 reveal in">Things I've built<span className="mark-inline">, <span className="mark">and wired up<Scribble type="underline" className="in" /></span></span>.</h1>
          <p className="hero-lede reveal in">Websites on one side, automations on the other. Every case study sticks to what actually happened on the project.</p>
          <div className="filters reveal in" role="group" aria-label="Filter projects">
            {FILTERS.map(f => (
              <button key={f.id} type="button" className="filter" aria-pressed={filter === f.id} onClick={() => choose(f.id)}>
                {f.label}<span className="filter-count">{count(f.id)}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="section work-list" aria-label="Projects">
        <div className="wrap">
          <div className="pc-grid is-filtered" key={filter}>
            {shown.map((p, i) => <ProjectCard key={p.slug} p={p} eager={i < 2} headingLevel={2} />)}
          </div>
          <MoreProjects projects={pending} />
        </div>
      </section>
      <CtaBand
        title="Want something like this?"
        text="A new site, a workflow, or both. Send me a short brief and I'll tell you how I'd approach it."
        primary={{ href: "/contact", label: "Get in Touch" }}
      />
    </>
  );
}
