import { Label, Scribble, SectionHead, Img } from "../components/shared.jsx";
import { StackGrid, CtaBand } from "../components/Cards.jsx";
import { STACK, TIMELINE, APPROACH, CLIENTS, INDUSTRIES } from "../content/site.js";

export default function About() {
  return (
    <>
      <section className="page-hero about-hero" aria-labelledby="about-title">
        <div className="wrap about-grid">
          <div>
            <p className="crumbs reveal in"><a href="/">Home</a> / <span>About</span></p>
            <Label n="01">about</Label>
            <h1 id="about-title" className="h1 reveal in">Hi, I'm Sagar<span className="dot">.</span></h1>
            <div className="about-copy reveal in">
              <p className="hero-lede">I'm a website development and automation specialist. I like building things that are useful: websites people enjoy using, and systems that quietly do the boring work in the background.</p>
              <p>I started with Webflow and have spent the last three years building marketing sites, landing pages and CMS builds in it, for SaaS and B2B companies, healthcare, and fashion and lifestyle brands. I've done that both freelance and in-house at Momentum91, a digital product agency.</p>
              <p>The automation side grew out of the websites. A form is only the start: the lead has to reach a CRM, someone has to follow up, and a report has to get made. So I started building those workflows too, in n8n, Zapier and Make.com, connected to tools like HubSpot, Freshsales, GoHighLevel and Google Sheets. Lately I've been experimenting with AI steps using the OpenAI and Claude APIs.</p>
              <p>I'm open to freelance projects and to remote, full-time roles in website development or AI automation.</p>
            </div>
          </div>
          <div className="about-photo reveal in">
            <div className="polaroid is-large">
              <Img name="portrait" alt="Portrait of Sagar Panchal" sizes="(max-width: 760px) 80vw, 420px" eager />
              <span className="polaroid-cap">Sagar, somewhere between a Webflow tab and an n8n tab</span>
            </div>
            <Scribble type="sparkle" className="in about-spark" />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="about-two-title">
        <div className="wrap">
          <SectionHead n="02" label="what I bring" id="about-two-title" title={<>Two skill sets, one person<span className="dot">.</span></>} />
          <div className="two-sides is-big reveal">
            <div className="side">
              <p className="side-h">Website development</p>
              <ul>
                <li>Webflow builds, from Figma or from scratch</li>
                <li>WordPress when it's the better fit</li>
                <li>CMS structure and content migrations</li>
                <li>Landing pages for campaigns and ads</li>
                <li>Interactions, custom code and performance</li>
                <li>Technical SEO, GA4 and Google Tag Manager</li>
              </ul>
            </div>
            <div className="side side-back">
              <p className="side-h">Automation &amp; integrations</p>
              <ul>
                <li>n8n, Zapier and Make.com workflows</li>
                <li>Form-to-CRM and lead routing</li>
                <li>Two-way sync between sheets and CRMs</li>
                <li>Webhooks, REST APIs and JSON</li>
                <li>Automated reports and emails</li>
                <li>AI steps with the OpenAI and Claude APIs</li>
              </ul>
            </div>
          </div>
          <ul className="industries reveal">{INDUSTRIES.map(i => <li key={i}>{i}</li>)}</ul>
        </div>
      </section>

      {TIMELINE.length > 0 && (
        <section className="section" aria-labelledby="timeline-title">
          <div className="wrap">
            <SectionHead n="03" label="experience" id="timeline-title" title={<>Where I've worked<span className="dot">.</span></>} />
            <ol className="timeline reveal">
              {TIMELINE.map(t => (
                <li key={t.when + t.what}>
                  <span className="tl-when">{t.when}</span>
                  <div><h3 className="tl-what">{t.what}</h3><p className="tl-where">{t.where}</p>{t.d && <p>{t.d}</p>}</div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="approach-title">
        <div className="wrap">
          <SectionHead n={TIMELINE.length ? "04" : "03"} label="how I like to work" id="approach-title" title={<>A few habits<span className="dot">.</span></>} />
          <div className="approach reveal">
            {APPROACH.map((a, i) => (
              <article key={a.t} className="approach-card" style={{ "--r": `${[-1.2, 0.8, -0.4, 1.1][i % 4]}deg` }}>
                <h3>{a.t}</h3>
                <p>{a.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="clients-title">
        <div className="wrap">
          <SectionHead n={TIMELINE.length ? "05" : "04"} label="clients & brands" id="clients-title" title={<>Some of the brands I've worked with<span className="dot">.</span></>} />
          <ul className="logo-row reveal">
            {CLIENTS.map(c => <li key={c.name}><Img name={c.img} alt={`${c.name} logo`} /></li>)}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="tools-title">
        <div className="wrap">
          <SectionHead n={TIMELINE.length ? "06" : "05"} label="toolbox" id="tools-title" title={<>Skills &amp; tools<span className="dot">.</span></>} />
          <StackGrid groups={STACK} />
        </div>
      </section>

      <CtaBand
        title="Working on something?"
        text="A project, a collaboration, or a remote role: I'd like to hear about it."
        primary={{ href: "/contact", label: "Say hello" }}
        secondary={{ href: "/work", label: "See my work" }}
      />
    </>
  );
}
