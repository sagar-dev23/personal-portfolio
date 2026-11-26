import { SITE_URL, EMAIL, LINKEDIN_URL, PERSON } from "./content/config.js";
import { ALL_PROJECTS, hasCaseStudy } from "./content/projects.js";
import Home from "./pages/Home.jsx";
import WebsiteDevelopment from "./pages/WebsiteDevelopment.jsx";
import Automation from "./pages/Automation.jsx";
import Work from "./pages/Work.jsx";
import CaseStudy from "./pages/CaseStudy.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";

const PERSON_ID = `${SITE_URL}/#person`;

const person = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: PERSON.name,
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/og-image.jpg`,
  jobTitle: PERSON.title,
  email: `mailto:${EMAIL}`,
  sameAs: [LINKEDIN_URL],
  knowsAbout: ["Webflow", "WordPress", "Figma to Webflow", "Technical SEO", "n8n", "Zapier", "Make.com", "OpenAI API", "Claude API", "HubSpot", "Freshsales", "GoHighLevel", "REST APIs", "Webhooks"],
};

const crumbs = (...items) => ({
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
    "@type": "ListItem", position: i + 1, name: it.name, item: `${SITE_URL}${it.path === "/" ? "/" : it.path}`,
  })),
});

const service = (name, path, description, offers) => ({
  "@type": "Service",
  name,
  description,
  url: `${SITE_URL}${path}`,
  provider: { "@id": PERSON_ID },
  hasOfferCatalog: { "@type": "OfferCatalog", name, itemListElement: offers.map(o => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: o } })) },
});

export const ROUTES = [
  {
    path: "/",
    page: Home,
    theme: "home",
    title: "Sagar Panchal - Website Development & Automation Specialist",
    description: "Sagar Panchal builds high-performing websites, connects business tools and automates workflows with n8n, Zapier, Make.com and AI.",
    schema: [
      { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: PERSON.name, publisher: { "@id": PERSON_ID } },
      person,
      { "@type": "ProfessionalService", "@id": `${SITE_URL}/#service`, name: PERSON.name, url: `${SITE_URL}/`, image: `${SITE_URL}/og-image.jpg`, email: EMAIL, description: PERSON.description, founder: { "@id": PERSON_ID }, sameAs: [LINKEDIN_URL] },
    ],
  },
  {
    path: "/website-development",
    page: WebsiteDevelopment,
    theme: "web",
    title: "Webflow & Website Development - Sagar Panchal",
    description: "Webflow and WordPress websites, Figma to Webflow builds, landing pages, CMS, custom interactions and technical SEO, built for performance.",
    schema: [
      service("Website Development", "/website-development", "Marketing websites, landing pages and CMS builds in Webflow and WordPress.", ["Webflow Development", "WordPress Development", "Figma to Webflow", "Landing Page Development", "CMS & Dynamic Websites", "Custom Interactions & Animations", "Website Optimization & Technical SEO"]),
      crumbs({ name: "Website Development", path: "/website-development" }),
    ],
  },
  {
    path: "/automation",
    page: Automation,
    theme: "auto",
    title: "Automation & AI Integrations - Sagar Panchal",
    description: "Lead management, CRM sync and business process automation with n8n, Zapier and Make.com, plus AI workflows with the OpenAI and Claude APIs.",
    schema: [
      service("Automation & AI Integrations", "/automation", "Workflow automation, CRM and API integrations, and AI-powered workflows.", ["AI Workflow Automation", "Business Process Automation", "CRM & Marketing Automation", "API & System Integrations"]),
      crumbs({ name: "Automation", path: "/automation" }),
    ],
  },
  {
    path: "/work",
    page: Work,
    theme: "home",
    title: "Work - Websites & Automations by Sagar Panchal",
    description: "Selected Webflow websites and automation projects: lead sync, lead routing, CRM integrations and more, with case studies.",
    schema: [crumbs({ name: "Work", path: "/work" })],
  },
  ...ALL_PROJECTS.filter(hasCaseStudy).map(p => ({
    path: `/work/${p.slug}`,
    page: CaseStudy,
    props: { slug: p.slug },
    theme: p.category === "automation" ? "auto" : "web",
    title: `${p.name} - ${p.category === "automation" ? "Automation" : "Website"} case study`,
    description: p.summary,
    image: p.img ? `/images/${p.img}-1600.webp` : p.shots?.[0] ? `/images/${p.shots[0].img}.webp` : undefined,
    ogType: "article",
    schema: [
      { "@type": "CreativeWork", name: p.name, description: p.summary, url: `${SITE_URL}/work/${p.slug}`, creator: { "@id": PERSON_ID }, ...(p.year ? { dateCreated: p.year } : {}) },
      crumbs({ name: "Work", path: "/work" }, { name: p.name, path: `/work/${p.slug}` }),
    ],
  })),
  {
    path: "/about",
    page: About,
    theme: "home",
    title: "About Sagar Panchal - Website Developer & Automation Specialist",
    description: "I'm Sagar Panchal. I build websites in Webflow and WordPress and automate the work behind them with n8n, Zapier, Make.com, CRMs and AI.",
    schema: [{ "@type": "ProfilePage", mainEntity: person }, crumbs({ name: "About", path: "/about" })],
  },
  {
    path: "/contact",
    page: Contact,
    theme: "home",
    title: "Contact Sagar Panchal - Websites & Automation",
    description: "Have a website, automation or integration project in mind? Send a brief, email or book a 15-minute call with Sagar Panchal.",
    schema: [{ "@type": "ContactPage", url: `${SITE_URL}/contact`, about: { "@id": PERSON_ID } }, crumbs({ name: "Contact", path: "/contact" })],
  },
];

export const NOT_FOUND = {
  path: "/404",
  page: NotFound,
  theme: "home",
  noindex: true,
  title: "Page not found - Sagar Panchal",
  description: "This page doesn't exist.",
};

export function findRoute(pathname) {
  const clean = pathname.replace(/\.html$/, "").replace(/\/index$/, "/").replace(/(.)\/$/, "$1") || "/";
  return ROUTES.find(r => r.path === clean) || NOT_FOUND;
}
