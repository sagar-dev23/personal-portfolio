import { useEffect, useRef, useState } from "react";
import { KindIcon } from "./Flow.jsx";

// The homepage visual: the two halves of the work in one loop.
// A website form is filled in and sent, the lead travels through an automation
// (webhook → n8n → AI → CRM) and arrives as a CRM record with an owner.
// Steps are driven by a timer; the loop pauses off screen and is static for
// reduced-motion users (the final, complete state is shown).
const STEPS = 8; // 0 typing name, 1 typing email, 2 press send, 3 webhook, 4 n8n, 5 AI, 6 CRM, 7 done
const NAME = "Alex Morgan";
const EMAIL = "alex@northwind.co";

function useTyped(text, active, done) {
  const [n, setN] = useState(done ? text.length : 0);
  useEffect(() => {
    if (done) { setN(text.length); return; }
    if (!active) { setN(0); return; }
    setN(0);
    let i = 0;
    const id = setInterval(() => { i++; setN(i); if (i >= text.length) clearInterval(id); }, 55);
    return () => clearInterval(id);
  }, [active, done, text]);
  return text.slice(0, n);
}

export default function HeroMachine() {
  const ref = useRef(null);
  // Server render shows the finished state, so the visual makes sense without JS.
  const [step, setStep] = useState(STEPS - 1);
  const [still, setStill] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setStill(false);
    setStep(0);
    let visible = true, t;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(ref.current);
    const durations = [1100, 1300, 700, 650, 750, 1100, 800, 2600];
    let s = 0;
    const next = () => {
      t = setTimeout(() => {
        if (visible && !document.hidden) { s = (s + 1) % STEPS; setStep(s); }
        next();
      }, durations[s]);
    };
    next();
    return () => { clearTimeout(t); io.disconnect(); };
  }, []);

  const name = useTyped(NAME, step === 0, still || step > 0);
  const email = useTyped(EMAIL, step === 1, still || step > 1);
  const at = k => (step >= k ? "is-on" : "");

  return (
    <div className={`machine step-${step}`} ref={ref} aria-hidden="true">
      {/* Website */}
      <div className="m-browser">
        <div className="m-chrome"><i /><i /><i /><span className="m-url">yourcompany.com/contact</span></div>
        <div className="m-page">
          <div className="m-hero-line w70" />
          <div className="m-hero-line w45" />
          <div className="m-form">
            <label className="m-field"><span>Name</span><b>{name}<i className={step === 0 ? "caret" : ""} /></b></label>
            <label className="m-field"><span>Work email</span><b>{email}<i className={step === 1 ? "caret" : ""} /></b></label>
            <span className={`m-send ${step === 2 ? "is-pressed" : ""} ${at(3)}`}>{step >= 3 ? "Sent ✓" : "Send brief"}</span>
          </div>
        </div>
      </div>

      {/* Automation */}
      <div className="m-pipe">
        {[
          { k: 3, kind: "trigger", label: "Webhook", note: "form.submitted" },
          { k: 4, kind: "logic", label: "n8n", note: "dedupe · enrich" },
          { k: 5, kind: "ai", label: "AI step", note: step === 5 ? "summarising…" : "summary + score" },
        ].map(n => (
          <div key={n.label} className={`m-node kind-${n.kind} ${at(n.k)} ${step === n.k ? "is-active" : ""}`}>
            <KindIcon kind={n.kind} />
            <span><b>{n.label}</b><small>{n.note}</small></span>
          </div>
        ))}
        <svg className="m-wire" viewBox="0 0 10 100" preserveAspectRatio="none"><path d="M5 0V100" /></svg>
        <span className={`m-packet p${Math.min(Math.max(step - 2, 0), 4)}`} />
      </div>

      {/* CRM */}
      <div className={`m-crm ${at(6)}`}>
        <div className="m-crm-head"><KindIcon kind="app" /><b>CRM</b><span className="m-badge">New lead</span></div>
        <div className="m-crm-row"><span className="m-avatar">AM</span><span><b>{NAME}</b><small>{EMAIL}</small></span></div>
        <div className="m-crm-meta">
          <span>Owner <b>Sales · Priya</b></span>
          <span>Source <b>Website</b></span>
        </div>
        <div className={`m-toast ${at(7)}`}>✓ Sales notified</div>
      </div>
    </div>
  );
}
