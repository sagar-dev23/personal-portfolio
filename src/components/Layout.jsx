import { useEffect, useState } from "react";
import { NAV, EMAIL, LINKEDIN_URL, CAL_URL } from "../content/config.js";
import { LocalTime, useReveal } from "./shared.jsx";

function isActive(current, href) {
  return current === href || current.startsWith(href + "/");
}

function Nav({ path }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    const esc = e => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);
  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
      <div className="nav-bar">
        <a href="/" className="brand" aria-label="Sagar Panchal, home">
          <span className="brand-glyph" aria-hidden="true" />
          <span className="brand-name">Sagar Panchal</span>
        </a>
        <nav className="nav-links" aria-label="Main">
          {NAV.map(l => (
            <a key={l.href} href={l.href} className="nav-link" aria-current={isActive(path, l.href) ? "page" : undefined}>{l.label}</a>
          ))}
        </nav>
        <a href="/contact" className="nav-cta" aria-current={path === "/contact" ? "page" : undefined}>
          <span className="live-dot" aria-hidden="true" />Let's talk
        </a>
        <button className="nav-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(o => !o)}>
          <span /><span />
        </button>
      </div>
      <div className="mobile-menu" id="mobile-menu" hidden={!open}>
        {[{ href: "/", label: "Home" }, ...NAV, { href: "/contact", label: "Contact" }].map((l, i) => (
          <a key={l.href} href={l.href} className="mobile-link" style={{ "--i": i }} aria-current={(l.href === "/" ? path === "/" : isActive(path, l.href)) ? "page" : undefined} onClick={() => setOpen(false)}>
            <span className="mobile-n">0{i + 1}</span>{l.label}
          </a>
        ))}
        <p className="mobile-meta"><span className="live-dot" aria-hidden="true" />Open for work · <LocalTime /> IST</p>
      </div>
    </header>
  );
}

function Footer() {
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-intro">
            <p className="footer-hi">Sagar Panchal</p>
            <p className="muted">Website development &amp; automation. I build the site, then the systems behind it.</p>
            <p className="footer-time"><span className="live-dot" aria-hidden="true" />It's <LocalTime /> in India right now.</p>
          </div>
          <nav className="footer-col" aria-label="Pages">
            <p className="footer-h">Pages</p>
            <a href="/">Home</a>
            <a href="/work">Work</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </nav>
          <nav className="footer-col" aria-label="Services">
            <p className="footer-h">Services</p>
            <a href="/website-development">Website development</a>
            <a href="/automation">Automation &amp; AI</a>
            <a href="/work?filter=automation">Automation projects</a>
          </nav>
          <div className="footer-col">
            <p className="footer-h">Connect</p>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <a href={CAL_URL} target="_blank" rel="noopener noreferrer">Book a 15-min call ↗</a>
          </div>
        </div>
        <p className="wordmark" aria-hidden="true">Sagar Panchal<span>.</span></p>
        <div className="footer-bar">
          <span>© {year} Sagar Panchal</span>
          <span>Built with Vite + React · served from Cloudflare</span>
          <a href="#top" className="to-top" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}

export default function Layout({ route, children }) {
  useReveal(route.path);
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav path={route.path} />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
