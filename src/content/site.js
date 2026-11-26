// Shared copy: services, process, toolbox. Descriptions say what each service is;
// they make no claims about results.

export const WEB_SERVICES_SHORT = [
  "Webflow Development", "WordPress Development", "Figma to Webflow", "Landing Pages",
  "CMS Development", "Custom Interactions", "Performance Optimization", "Technical SEO",
];

export const AUTO_SERVICES_SHORT = [
  "AI Workflow Automation", "n8n Automation", "Make.com & Zapier", "CRM Integrations",
  "API & Webhook Integrations", "Lead Management Automation", "Reporting Automation", "Business Process Automation",
];

export const PROCESS = [
  { t: "Understand", d: "Your goals, your audience, and the tools you already use. I ask a lot of questions here." },
  { t: "Plan", d: "Sitemap, page structure, data flow and integrations, mapped out before anything gets built." },
  { t: "Build", d: "Responsive builds in Webflow or WordPress, or the workflow itself in n8n, Zapier or Make.com." },
  { t: "Integrate", d: "Forms, CRM, analytics and APIs connected, so data lands where your team actually works." },
  { t: "Optimize", d: "Speed, SEO and tracking checked; workflows tested with real data before they go live." },
];

export const STACK = [
  { name: "Website Development", items: ["Webflow", "WordPress", "Figma", "HTML", "CSS", "JavaScript"] },
  { name: "Automation", items: ["n8n", "Zapier", "Make.com"] },
  { name: "AI", items: ["OpenAI API", "Claude API"] },
  { name: "Integrations", items: ["REST APIs", "Webhooks", "JSON"] },
  { name: "CRM", items: ["HubSpot", "Freshsales", "GoHighLevel", "Close CRM"] },
  { name: "Analytics", items: ["GA4", "Google Tag Manager", "Search Console"] },
];

export const WEB_SERVICES = [
  { t: "Webflow Development", d: "Marketing sites built properly in Webflow: a clean class system, reusable components and a structure your team can edit without breaking the layout.", tags: ["Webflow", "Components", "Clean class system"] },
  { t: "WordPress Development", d: "WordPress sites when that's the better fit for your team or existing content, with a sensible theme setup and only the plugins you need.", tags: ["WordPress", "Themes", "Plugins"] },
  { t: "Figma to Webflow", d: "Your designer's Figma file turned into a responsive build that matches it closely on every breakpoint, not just desktop.", tags: ["Figma", "Responsive", "Pixel-accurate"] },
  { t: "Landing Page Development", d: "Fast, focused pages for campaigns and paid ads, with forms and tracking wired up from day one.", tags: ["Campaigns", "Forms", "Tracking"] },
  { t: "CMS & Dynamic Websites", d: "Blogs, case studies, portfolios and directories set up as CMS collections, so new content is a form, not a developer task.", tags: ["Webflow CMS", "Collections", "Migrations"] },
  { t: "Custom Interactions & Animations", d: "Motion that helps people understand the page: scroll interactions, micro-interactions and GSAP where Webflow's built-in tools stop.", tags: ["Interactions", "GSAP", "Custom code"] },
  { t: "Website Optimization & Technical SEO", d: "Page speed, image optimisation, clean headings, metadata, schema, sitemaps and analytics set up correctly.", tags: ["Core Web Vitals", "Schema", "GA4 / GTM"] },
];

export const WEB_PROCESS = [
  { t: "Design", d: "Start from your Figma file, or shape the structure and look together." },
  { t: "Development", d: "Build with reusable components and a CMS where content changes often." },
  { t: "Responsiveness", d: "Check every breakpoint, from wide desktops to small phones." },
  { t: "Optimization", d: "Images, speed, SEO basics, forms and tracking." },
  { t: "Launch", d: "Domain, redirects, a final QA pass, and a handover your team can use." },
];

export const AUTO_SERVICES = [
  { n: "01", t: "AI Workflow Automation", items: ["AI-powered workflows", "AI agents", "OpenAI API integrations", "Claude API integrations", "AI-powered data processing"] },
  { n: "02", t: "Business Process Automation", items: ["Repetitive task automation", "Lead management", "Document processing", "Reporting automation", "Internal workflow automation"] },
  { n: "03", t: "CRM & Marketing Automation", items: ["HubSpot integrations", "Freshsales integrations", "GoHighLevel integrations", "Close CRM integrations", "Automated lead distribution", "Form-to-CRM integrations"] },
  { n: "04", t: "API & System Integrations", items: ["REST API integrations", "Webhooks", "Third-party integrations", "Data synchronization", "Custom JavaScript integrations"] },
];

export const AUTO_STACK = ["n8n", "Zapier", "Make.com", "OpenAI API", "Claude API", "JavaScript", "REST APIs", "Webhooks", "HubSpot", "Freshsales", "GoHighLevel", "Google Sheets"];

// Experience timeline. Left empty on purpose: dates and job titles weren't available,
// and the About page hides this section until it has entries.
// Shape: { when: "2024 – 2025", what: "Webflow Developer", where: "Company", d: "optional line" }
export const TIMELINE = [];

export const APPROACH = [
  { t: "Plain language", d: "I explain what I'm building and why, without the jargon, so you can make decisions quickly." },
  { t: "Built to be edited", d: "Sites and workflows should be easy for your team to change after I hand them over." },
  { t: "Test with real data", d: "Automations get run with real submissions and edge cases before anyone relies on them." },
  { t: "Small first", d: "Start with the one workflow or page that matters most, then grow from there." },
];

export const INDUSTRIES = ["SaaS & B2B platforms", "Pharma & healthcare", "Fashion & lifestyle"];

export const CLIENTS = [
  { name: "Tixa", img: "client-tixa" },
  { name: "AltiusHub", img: "client-altiushub" },
  { name: "BestBid", img: "client-bestbid" },
  { name: "Devyami", img: "client-devyami" },
  { name: "Knockout Fight Club", img: "client-knockout" },
  { name: "Ironman Lifestyle", img: "client-ironman" },
];
