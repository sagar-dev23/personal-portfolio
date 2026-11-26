import { useEffect } from "react";
import HeroMachine from "../components/HeroMachine.jsx";
import DotGrid from "../components/DotGrid.jsx";
import { Button, Scribble, SectionHead, Label, Img } from "../components/shared.jsx";
import { ProjectCard, ServiceCard, Process, StackGrid, CtaBand } from "../components/Cards.jsx";
import { WEB_PROJECTS, AUTOMATION_PROJECTS } from "../content/projects.js";
import { PROCESS, STACK, WEB_SERVICES_SHORT, AUTO_SERVICES_SHORT } from "../content/site.js";

const bySlug = slug => [...WEB_PROJECTS, ...AUTOMATION_PROJECTS].find(p => p.slug === slug);
const SELECTED = ["shree-air-compressors", "bi-directional-lead-sync", "downdating", "roi-calculator-report", "bestbid", "time-based-lead-routing"].map(bySlug);

// Old one-page anchors (/#about, /#contact) now live on their own pages.
const MOVED = { "#about": "/about", "#contact": "/contact" };

export default function Home() {
  useEffect(() => {
    if (MOVED[location.hash]) location.replace(MOVED[location.hash]);
  }, []);

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <DotGrid />
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="hero-kicker reveal in"><span className="live-dot" aria-hidden="true" />Sagar Panchal · Website Development &amp; Automation</p>
            <h1 id="hero-title" className="h1 reveal in">
              Building Digital <span className="mark">Experiences<Scribble type="underline" className="in" /></span> &amp; Intelligent <span className="mark mark-circle">Automations.<Scribble type="circle" className="in" /></span>
            </h1>
            <p className="hero-lede reveal in">I help businesses build better websites, connect their tools, and automate workflows through thoughtful development and AI-powered solutions.</p>
            <div className="hero-actions reveal in">
              <Button href="/work">Explore My Work</Button>
              <Button href="/contact" variant="ghost">Let's Work Together</Button>
            </div>
          </div>
          <div className="hero-visual reveal in">
            <HeroMachine />
            <p className="hand-note hero-note"><Scribble type="arrowLeft" className="in" />the whole loop, website to CRM</p>
          </div>
        </div>
      </section>

      <section className="section intro" aria-labelledby="intro-title">
        <div className="wrap intro-grid">
          <div className="intro-photo reveal">
            <div className="polaroid">
              <Img name="portrait" alt="Portrait of Sagar Panchal" sizes="(max-width: 760px) 70vw, 360px" />
              <span className="polaroid-cap">that's me</span>
            </div>
          </div>
          <div className="intro-copy reveal">
            <Label n="01">hello</Label>
            <h2 id="intro-title" className="h2">I'm Sagar. I work on both sides of a business's website.</h2>
            <p className="lede">I've spent the last three years building in Webflow: marketing sites, landing pages, CMS builds and the tracking behind them. Along the way I started wiring those sites into the rest of the business, and automation has become a big part of what I do.</p>
            <div className="two-sides">
              <div className="side">
                <p className="side-h">The front</p>
                <p>Websites, landing pages, CMS and user experience, built to load fast and be easy to edit.</p>
              </div>
              <div className="side side-back">
                <p className="side-h">The back</p>
                <p>CRMs, APIs, webhooks and automation workflows, so leads and data go where they should without copy-paste.</p>
              </div>
            </div>
            <dl className="facts">
              <div><dt>3+</dt><dd>years with Webflow</dd></div>
              <div><dt>25+</dt><dd>projects shipped</dd></div>
              <div><dt>2</dt><dd>halves: build + automate</dd></div>
            </dl>
            <a className="text-link" href="/about">More about me →</a>
          </div>
        </div>
      </section>

      <section className="section services-home" id="services" aria-labelledby="services-title">
        <div className="wrap">
          <SectionHead n="02" label="what I do" id="services-title" title={<>Two things, done properly<span className="dot">.</span></>} intro="Most projects need a bit of both: a site that works, and systems behind it that don't need babysitting." />
          <div className="svc-pair">
            <ServiceCard n="01" title="Website Development" items={WEB_SERVICES_SHORT} href="/website-development" cta="Explore Website Development" variant="web">
              <span className="svc-visual svc-visual-web" aria-hidden="true"><i /><i /><i /><b /></span>
            </ServiceCard>
            <ServiceCard n="02" title="Automation & AI Integrations" items={AUTO_SERVICES_SHORT} href="/automation" cta="Explore Automation" variant="auto">
              <span className="svc-visual svc-visual-auto" aria-hidden="true"><i /><i /><i /><b /></span>
            </ServiceCard>
          </div>
        </div>
      </section>

      <section className="section work-home" id="work" aria-labelledby="work-title">
        <div className="wrap">
          <div className="head-row">
            <SectionHead n="03" label="selected work" id="work-title" title={<>Websites and the systems behind them<span className="dot">.</span></>} />
            <a className="text-link reveal" href="/work">View all projects →</a>
          </div>
          <div className="pc-grid">
            {SELECTED.map(p => <ProjectCard key={p.slug} p={p} />)}
          </div>
        </div>
      </section>

      <section className="section process-home" aria-labelledby="process-title">
        <div className="wrap">
          <SectionHead n="04" label="how I work" id="process-title" title={<>Five steps, every project<span className="dot">.</span></>} intro="Small or large, the order stays the same. It keeps surprises to a minimum." />
          <Process steps={PROCESS} />
        </div>
      </section>

      <section className="section stack-home" aria-labelledby="stack-title">
        <div className="wrap">
          <SectionHead n="05" label="toolbox" id="stack-title" title={<>The tools I reach for<span className="dot">.</span></>} />
          <StackGrid groups={STACK} />
        </div>
      </section>

      <CtaBand
        title="Have something to build or automate?"
        text="Whether it's a new website, a smarter workflow, or connecting your existing tools, let's make it happen."
        primary={{ href: "/contact", label: "Get in Touch" }}
        secondary={{ href: "/work", label: "See the work first" }}
        flow={["Your idea", "Plan", "Build", "Connect", "Launch"]}
      />
    </>
  );
}
