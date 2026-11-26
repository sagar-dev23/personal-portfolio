import { useRef, useState } from "react";
import { Label, Scribble } from "../components/shared.jsx";
import { CAL_URL, EMAIL, LINKEDIN_URL, CONTACT_WEBHOOK } from "../content/config.js";

const TOPICS = [
  { id: "website", label: "Website development" },
  { id: "automation", label: "Automation / AI" },
  { id: "both", label: "Both" },
  { id: "collaboration", label: "Collaboration" },
  { id: "role", label: "Full-time role" },
];

function Form() {
  const [topic, setTopic] = useState("website");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const started = useRef(Date.now());

  async function submit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    // Spam checks: the hidden "company_url" field must stay empty, and real people
    // take more than a few seconds to fill the form in.
    if (data.company_url || Date.now() - started.current < 3000) { setStatus("sent"); return; }
    delete data.company_url;
    setStatus("sending");
    try {
      const res = await fetch(CONTACT_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, inquiry_type: TOPICS.find(t => t.id === topic)?.label, page: location.pathname, submitted_at: new Date().toISOString() }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="form-done" role="status">
        <span className="form-done-icon" aria-hidden="true">✓</span>
        <h2 className="h3">Got it, thanks!</h2>
        <p>I'll read your brief and get back to you within 24 hours. If it's urgent, grab a slot on my calendar.</p>
        <a className="btn btn-ghost" href={CAL_URL} target="_blank" rel="noopener noreferrer"><span className="btn-label">Book a 15-min call</span><span className="btn-icon">↗</span></a>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={submit}>
      <noscript><p className="form-note">This form needs JavaScript. Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> instead.</p></noscript>
      <fieldset className="topics">
        <legend>What's it about?</legend>
        {TOPICS.map(t => (
          <label key={t.id} className="topic">
            <input type="radio" name="topic" value={t.id} checked={topic === t.id} onChange={() => setTopic(t.id)} />
            <span>{t.label}</span>
          </label>
        ))}
      </fieldset>
      <div className="form-row">
        <label className="field"><span>Your name *</span><input name="name" required autoComplete="name" placeholder="Jane Doe" /></label>
        <label className="field"><span>Email *</span><input name="email" type="email" required autoComplete="email" placeholder="jane@company.com" /></label>
      </div>
      <div className="form-row">
        <label className="field"><span>Company</span><input name="company" autoComplete="organization" placeholder="Optional" /></label>
        <label className="field"><span>Website</span><input name="website" type="url" autoComplete="url" placeholder="https://" /></label>
      </div>
      <label className="field"><span>Tell me about it *</span><textarea name="message" required rows={5} placeholder={topic === "automation" ? "Which task do you want to automate, and which tools are involved?" : topic === "role" ? "The role, the team, and a link to the job description." : "What are you building, and what does it need to do?"} /></label>
      <label className="hp" aria-hidden="true">Leave this empty<input name="company_url" tabIndex={-1} autoComplete="off" /></label>
      {status === "error" && <p className="form-error" role="alert">That didn't go through. Please email me at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>}
      <button className="btn btn-primary form-submit" type="submit" disabled={status === "sending"}>
        <span className="btn-label">{status === "sending" ? "Sending…" : "Send message"}</span><span className="btn-icon" aria-hidden="true">→</span>
      </button>
    </form>
  );
}

export default function Contact() {
  return (
    <section className="page-hero contact-page" aria-labelledby="contact-title">
      <div className="wrap contact-grid">
        <div className="contact-side">
          <p className="crumbs reveal in"><a href="/">Home</a> / <span>Contact</span></p>
          <Label n="01">contact</Label>
          <h1 id="contact-title" className="h1 reveal in">Have a project in mind? <span className="mark">Let's talk.<Scribble type="underline" className="in" /></span></h1>
          <p className="hero-lede reveal in">Websites, automations, collaborations or a remote role: send a short note and I'll get back to you. No forms longer than they need to be.</p>
          <ul className="contact-links reveal in">
            <li><span>Email</span><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            <li><span>LinkedIn</span><a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">in/sagar2310 ↗</a></li>
            <li><span>Call</span><a href={CAL_URL} target="_blank" rel="noopener noreferrer">Book 15 minutes ↗</a></li>
          </ul>
          <p className="hand-note contact-note"><Scribble type="arrow" className="in" />or just use the form</p>
        </div>
        <div className="contact-card reveal in">
          <Form />
        </div>
      </div>
    </section>
  );
}
