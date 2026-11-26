import { Button, Scribble, SectionHead, Label, Tags } from "../components/shared.jsx";
import { ProjectCard, Process, CtaBand, BrowserShot, MoreProjects } from "../components/Cards.jsx";
import { WEB_PROJECTS, hasCard } from "../content/projects.js";
import { WEB_SERVICES, WEB_PROCESS } from "../content/site.js";

const FAN = ["dhyanam-digital", "bestbid", "shree-air-compressors"].map(s => WEB_PROJECTS.find(p => p.slug === s));

export default function WebsiteDevelopment() {
  return (
    <>
      <section className="page-hero web-hero" aria-labelledby="web-title">
        <div className="wrap web-hero-grid">
          <div className="web-hero-copy">
            <p className="crumbs reveal in"><a href="/">Home</a> / <span>Website Development</span></p>
            <Label n="01">website development</Label>
            <h1 id="web-title" className="h1 h1-editorial reveal in">
              Websites Built for Performance, <span className="mark">Experience<Scribble type="underline2" className="in" /></span> &amp; Growth.
            </h1>
            <p className="hero-lede reveal in">From marketing websites to conversion-focused landing pages, I build responsive digital experiences that look great, perform well, and support business goals.</p>
            <div className="hero-actions reveal in">
              <Button href="/work?filter=web">Explore My Work</Button>
              <Button href="/contact" variant="ghost">Start a website project</Button>
            </div>
          </div>
          <div className="fan reveal in" aria-hidden="true">
            {FAN.map((p, i) => <div key={p.slug} className="fan-card" style={{ "--i": i }}><BrowserShot p={p} eager={i === 0} /></div>)}
            <p className="hand-note fan-note"><Scribble type="arrowLeft" className="in" />a few recent builds</p>
          </div>
        </div>
      </section>

      <section className="section web-services" aria-labelledby="web-services-title">
        <div className="wrap web-services-grid">
          <div className="sticky-col">
            <SectionHead n="02" label="services" id="web-services-title" title={<>What I build<span className="dot">.</span></>} intro="Seven ways I can help with a website. Most projects combine a few of them." />
          </div>
          <ol className="editorial-list">
            {WEB_SERVICES.map((s, i) => (
              <li key={s.t} className="el-item reveal">
                <span className="el-n">{String(i + 1).padStart(2, "0")}</span>
                <div className="el-body">
                  <h3 className="el-title">{s.t}</h3>
                  <p className="el-desc">{s.d}</p>
                  <Tags items={s.tags} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="web-work-title">
        <div className="wrap">
          <div className="head-row">
            <SectionHead n="03" label="featured projects" id="web-work-title" title={<>Recent websites<span className="dot">.</span></>} />
            <a className="text-link reveal" href="/work?filter=web">All website projects →</a>
          </div>
          <div className="pc-grid">
            {WEB_PROJECTS.filter(hasCard).map(p => <ProjectCard key={p.slug} p={p} />)}
          </div>
          <MoreProjects projects={WEB_PROJECTS.filter(p => !hasCard(p))} />
        </div>
      </section>

      <section className="section" aria-labelledby="web-process-title">
        <div className="wrap">
          <SectionHead n="04" label="process" id="web-process-title" title={<>Design → Launch<span className="dot">.</span></>} intro="The route every website takes, whether it's one landing page or a full CMS build." />
          <Process steps={WEB_PROCESS} variant="process-line" />
        </div>
      </section>

      <CtaBand
        title="Need a website that does more than just look good?"
        text="Let's build it: fast, easy to edit, and connected to the tools you already use."
        primary={{ href: "/contact", label: "Let's build it" }}
        secondary={{ href: "/automation", label: "See the automation side" }}
      />
    </>
  );
}
