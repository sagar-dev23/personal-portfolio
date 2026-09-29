import { useEffect, useState } from "react";
import { CAL_URL, CONTACT_WEBHOOK, EMAIL, LINKEDIN_URL } from "../config.js";

function ContactRow({ label, value, href }) {
  return (
    <a href={href} style={{ display:"grid", gridTemplateColumns:"120px 1fr auto", gap:16, alignItems:"center", padding:"14px 0", borderTop:"0.5px solid var(--line)" }}>
      <span className="mono">{label}</span>
      <span style={{ fontFamily:"var(--font-display)", fontSize:"clamp(14px,1.6vw,19px)", letterSpacing:"-0.015em", color:"var(--fg)" }}>{value}</span>
      <span className="mono" style={{ color:"var(--fg-2)" }} aria-hidden="true">↗</span>
    </a>
  );
}

function ContactForm() {
  const [state, setState] = useState({ name:"", email:"", company:"", website:"", msg:"" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const inputStyle = { width:"100%", padding:"12px 14px", border:"0.5px solid var(--line)", borderRadius:10, background:"var(--bg)", color:"var(--fg)", fontFamily:"var(--font-body)", fontSize:14.5, outline:"none", transition:"border-color .2s", boxSizing:"border-box" };
  const labelStyle = { fontFamily:"var(--font-mono)", fontSize:10.5, letterSpacing:"0.06em", textTransform:"uppercase", color:"var(--muted)", marginBottom:6, display:"block" };

  async function submit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      await fetch(CONTACT_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:    state.name,
          email:   state.email,
          company: state.company,
          website: state.website,
          message: state.msg,
          submitted_at: new Date().toISOString(),
        }),
      });
      setStatus("sent");
    } catch (_) {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:16, padding:"40px 24px", textAlign:"center" }}>
        <div style={{ width:48, height:48, borderRadius:"50%", background:"var(--accent)", display:"grid", placeItems:"center" }}>
          <span style={{ color:"#fff", fontSize:22 }} aria-hidden="true">✓</span>
        </div>
        <h4 style={{ margin:0, fontFamily:"var(--font-display)", fontSize:20, fontWeight:500, letterSpacing:"-0.02em" }}>Message received!</h4>
        <p style={{ margin:0, color:"var(--muted)", fontSize:14.5, maxWidth:280, lineHeight:1.6 }}>
          Thanks for reaching out. I'll review your brief and get back to you within 24 hours.
        </p>
        <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ marginTop:8, fontSize:13 }}>
          Or book a 15-min call ↗
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <noscript>
        <p style={{ margin:0, color:"var(--muted)", fontSize:14 }}>This form needs JavaScript. Email <a href={`mailto:${EMAIL}`} style={{ textDecoration:"underline" }}>{EMAIL}</a> or <a href={CAL_URL} style={{ textDecoration:"underline" }}>book a call</a> instead.</p>
      </noscript>
      <div className="form-row">
        <label style={{ display:"flex", flexDirection:"column" }}>
          <span style={labelStyle}>Full name <span style={{ color:"var(--accent)" }}>*</span></span>
          <input required name="name" autoComplete="name" style={inputStyle} value={state.name} onChange={e => setState({...state,name:e.target.value})} placeholder="Your full name" />
        </label>
        <label style={{ display:"flex", flexDirection:"column" }}>
          <span style={labelStyle}>Work email <span style={{ color:"var(--accent)" }}>*</span></span>
          <input required name="email" autoComplete="email" type="email" style={inputStyle} value={state.email} onChange={e => setState({...state,email:e.target.value})} placeholder="you@company.com" />
        </label>
      </div>
      <div className="form-row">
        <label style={{ display:"flex", flexDirection:"column" }}>
          <span style={labelStyle}>Company / brand <span style={{ color:"var(--accent)" }}>*</span></span>
          <input required name="company" autoComplete="organization" style={inputStyle} value={state.company} onChange={e => setState({...state,company:e.target.value})} placeholder="Acme Inc." />
        </label>
        <label style={{ display:"flex", flexDirection:"column" }}>
          <span style={labelStyle}>Company website <span style={{ color:"var(--faint)" }}>(optional)</span></span>
          <input name="website" autoComplete="url" type="url" style={inputStyle} value={state.website} onChange={e => setState({...state,website:e.target.value})} placeholder="https://yoursite.com" />
        </label>
      </div>
      <label style={{ display:"flex", flexDirection:"column" }}>
        <span style={labelStyle}>Tell me about the project <span style={{ color:"var(--accent)" }}>*</span></span>
        <textarea required name="message" style={{ ...inputStyle, minHeight:110, resize:"vertical" }} value={state.msg} onChange={e => setState({...state,msg:e.target.value})} placeholder="What are you building, what's the goal, and what's getting in the way?" />
      </label>
      {status === "error" && (
        <p role="alert" style={{ margin:0, color:"#e53e3e", fontFamily:"var(--font-mono)", fontSize:11 }}>Something went wrong — try emailing me directly at {EMAIL}</p>
      )}
      <button type="submit" disabled={status==="sending"} className="btn btn-primary" style={{ marginTop:4, justifyContent:"space-between", opacity: status==="sending" ? 0.7 : 1 }}>
        {status === "sending" ? "Sending…" : "Send brief"}
        <span className="arrow" aria-hidden="true">↗</span>
      </button>
    </form>
  );
}

export default function Contact() {
  const [year, setYear] = useState(2026);
  useEffect(() => { setYear(new Date().getFullYear()); }, []);
  return (
    <section id="contact" className="section" style={{ borderTop:"0.5px solid var(--line)", paddingBottom:60 }}>
      <div className="wrap">
        <div className="reveal" style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:56, gap:24, flexWrap:"wrap" }}>
          <div className="mono" style={{ display:"flex", flexDirection:"column", gap:6 }}>
            <span>/ 04</span>
            <span style={{ color:"var(--fg-2)" }}>Contact</span>
          </div>
          <span className="pill"><span className="dot"/>Open for work</span>
        </div>

        <h2 className="contact-h reveal">
          Let's build<br />
          something <span className="acc">exceptional</span>.
        </h2>

        <div className="contact-inner reveal" style={{ marginTop:"clamp(36px, 6vw, 80px)" }}>
          <div>
            <p style={{ fontSize:18, color:"var(--muted)", maxWidth:540, margin:0 }}>
              Whether you're scaling a marketing site, replatforming a CMS, or wiring an automation stack — tell me the shape of the problem. Most replies inside 24 hours.
            </p>
            <div style={{ marginTop:36, display:"flex", flexDirection:"column", gap:18, maxWidth:540 }}>
              <ContactRow label="Email" value={EMAIL} href={`mailto:${EMAIL}`} />
              <ContactRow label="Schedule" value="cal.com/sagr-work/15min" href={CAL_URL} />
              <ContactRow label="LinkedIn" value="/in/sagar2310" href={LINKEDIN_URL} />
            </div>
          </div>
          <div style={{ background:"var(--card)", border:"0.5px solid var(--line)", borderRadius:"var(--radius-lg)", padding:32 }}>
            <div className="mono" style={{ marginBottom:16 }}>Quick brief</div>
            <ContactForm />
          </div>
        </div>

        {/* Wordmark */}
        <div className="reveal" aria-hidden="true" style={{ overflow:"hidden", borderTop:"0.5px solid var(--line)", marginTop:"clamp(60px, 10vw, 120px)", padding:"clamp(24px, 4vw, 40px) 0" }}>
          <div className="wordmark" style={{ letterSpacing:"-0.06em", whiteSpace:"nowrap", textAlign:"center" }}>
            Sagar&nbsp;Panchal<span style={{ color:"var(--accent)" }}>.</span>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer-grid" style={{ borderWidth:"0px" }}>
          <div className="foot-col">
            <h6>Sagar Panchal</h6>
            <p style={{ margin:0, color:"var(--muted)", fontSize:13.5, maxWidth:320 }}>Webflow developer &amp; designer building enterprise-grade marketing sites, CMS systems, and automations.</p>
          </div>
          <nav className="foot-col" aria-label="Footer">
            <h6>Sitemap</h6>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="foot-col">
            <h6>Connect</h6>
            <a href={`mailto:${EMAIL}`}>Email ↗</a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <a href={CAL_URL} target="_blank" rel="noopener noreferrer">Schedule a call ↗</a>
          </div>
        </footer>
        <div className="foot-bar" style={{ color:"var(--muted)", fontSize:12, fontFamily:"var(--font-mono)", letterSpacing:"0.04em" }}>
          <span>© {year} Sagar Panchal — All rights reserved.</span>
          <a href="#hero" className="totop" onClick={e => { e.preventDefault(); window.scrollTo({ top:0, behavior:"smooth" }); }}>
            Back to top <span className="tt-ic" aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </section>
  );
}
