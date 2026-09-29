import { useEffect, useState } from "react";
import { CAL_URL } from "../config.js";

const LINKS = [
  { href:"#about", label:"About" },
  { href:"#services", label:"Services" },
  { href:"#work", label:"Work" },
  { href:"#contact", label:"Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const close = () => setMobileOpen(false);
  return (
    <>
      <nav className="nav" aria-label="Main" style={{ top: scrolled ? 12 : 18, transition:"top .3s ease" }}>
        <div className="nav-inner">
          <a href="#hero" className="nav-brand">
            <span className="glyph" aria-hidden="true"/>&nbsp;Sagar Panchal
          </a>
          <div className="nav-links">
            {LINKS.map(l => <a key={l.href} href={l.href} className="nav-link">{l.label}</a>)}
          </div>
          <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="nav-cta" data-magnetic>
            <span className="ndot" aria-hidden="true"/>Book a call
          </a>
          <button className="nav-hamburger" onClick={() => setMobileOpen(o => !o)} aria-label="Toggle menu" aria-expanded={mobileOpen} aria-controls="mobile-nav">
            <span className="ham-bar" style={mobileOpen ? { transform:"translateY(5.5px) rotate(45deg)" } : {}} />
            <span className="ham-bar" style={mobileOpen ? { opacity:0, transform:"scaleX(0)" } : {}} />
            <span className="ham-bar" style={mobileOpen ? { transform:"translateY(-5.5px) rotate(-45deg)" } : {}} />
          </button>
        </div>
      </nav>
      {mobileOpen && (
        <div className="mobile-nav" id="mobile-nav">
          {LINKS.map(l => <a key={l.href} href={l.href} className="mobile-nav-link" onClick={close}>{l.label}</a>)}
          <div className="mobile-nav-hair" />
          <div className="mobile-nav-cta">
            <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary" onClick={close}>Book a call <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      )}
    </>
  );
}
