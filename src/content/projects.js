// Every fact here comes from the previous version of the site or from Sagar directly.
// Leave a field out rather than guess: pages only render sections that have content.
//
// Website project fields:
//   slug, name, category: "web", year, url, img (key in images.json), alt,
//   summary (card), overview, role, scope[], stack[], outcome[] (real, stated metrics only)
//   caseStudy: false -> no /work/<slug> page; the card links to the live site instead
//
// Automation project fields:
//   slug, name, category: "automation", status: "built", platform, summary, overview, problem,
//   flow[] (diagram nodes), workflow[] (step text), stack[], shots[] ({ img, alt })

// Website projects. Descriptions come from each live site; the platform was read
// from the site itself (Webflow / WordPress markup, Next.js build files).
export const WEB_PROJECTS = [
  {
    slug: "shree-air-compressors",
    name: "Shree Air Compressors",
    category: "web",
    caseStudy: false,
    url: "https://shreeaircompressors.com/",
    img: "work-shree",
    alt: "Shree Air Compressors homepage: industrial air compressor manufacturer in India, with a product range bar and quote buttons",
    summary: "Website for an ISO 9001:2015 certified air compressor manufacturer and exporter in Ahmedabad, hand-coded in HTML, CSS and JavaScript.",
    overview: "Shree Air Compressors is an ISO 9001:2015 certified manufacturer and exporter of reciprocating and screw air compressors, vacuum pumps, air dryers and receiver tanks, based in Ahmedabad and exporting to 23+ countries. The site is hand-coded in HTML, CSS and JavaScript, with no website builder underneath.",
    stack: ["HTML", "CSS", "JavaScript"],
  },
  {
    slug: "downdating",
    name: "Downdating",
    category: "web",
    caseStudy: false,
    url: "http://downdating.co.in/",
    img: "work-downdating",
    alt: "Downdating homepage built in Webflow: 'Built for people who want real connection' with a chat-style coach panel",
    summary: "Webflow website for a dating coaching brand that helps people fix their profile, their texting and their confidence.",
    overview: "Downdating is a dating coaching service: it helps people improve their profile, their texting and their confidence so they meet people who fit them. The website is built in Webflow and covers plans, events and booking a call.",
    stack: ["Webflow"],
  },
  {
    slug: "dhyanam-digital",
    name: "Dhyanam Digital",
    category: "web",
    caseStudy: false,
    url: "http://dhyanamdigital.com/",
    img: "work-dhyanam",
    alt: "Dhyanam Digital Solution homepage: 'Grow your brand where customers search, scroll and ask AI'",
    summary: "Website for a full-service digital marketing agency in Gandhinagar, built with Next.js.",
    overview: "Dhyanam Digital Solution is a full-service digital marketing agency in Gandhinagar, India, helping businesses get found on Google and in AI answers, build their brand on social and turn attention into leads. The site is built with Next.js and includes services, case studies and a blog.",
    stack: ["Next.js"],
  },
  {
    slug: "bestbid",
    name: "BestBid",
    category: "web",
    caseStudy: false,
    url: "https://bestbid.store/",
    img: "work-bestbid",
    alt: "BestBid online store homepage: 'Essential Luxury - Watches, Cameras, Cellphones & Travel Gear' with category tiles",
    summary: "WooCommerce store on WordPress for luxury watches, cameras, phones and travel gear.",
    overview: "BestBid is an online store for 'essential luxury': watches, cameras, cellphones and travel gear. It runs on WordPress with WooCommerce, with shopping by category and brand.",
    stack: ["WordPress", "WooCommerce"],
  },
  // Approved by Sagar to mention; link and details still to come.
  { slug: "tixar", name: "Tixar", category: "web", caseStudy: false },
];

// Built projects: from Sagar's Notion project notes (overview, workflow, tools and
// screenshots are his; client names are not stated there, so none are shown).
export const AUTOMATION_PROJECTS = [
  {
    slug: "bi-directional-lead-sync",
    name: "Bi-Directional Lead Sync",
    category: "automation",
    status: "built",
    platform: "n8n",
    summary: "One lead, three places, always in sync: a master sheet, store-level sheets and GoHighLevel update each other in real time.",
    overview: "A centralised lead management system with bi-directional sync between a master sheet, store-level sheets and the CRM (GoHighLevel), so every platform shows the same, current lead status.",
    problem: "Leads were spread across a master sheet, a separate sheet for each store and the CRM. Without a sync, a status change in one place left the others out of date.",
    flow: [
      { label: "Form submission", kind: "trigger", note: "User submits form" },
      { label: "Master Sheet", kind: "app", note: "Lead added" },
      { label: "Postcode check", kind: "logic", note: "Which store?" },
      { label: "Store Sheet", kind: "app", note: "Routed lead" },
      { label: "GoHighLevel", kind: "output", note: "CRM sync" },
    ],
    workflow: [
      "User submits form",
      "→ Data added to Master Sheet",
      "→ Check Postcode",
      "→ Route lead to respective Store Sheet",
      "→ Sync lead to GHL (CRM)",
      "",
      "Bi-Directional Sync:",
      "→ If status updated in Master Sheet",
      "→ OR Store Sheet",
      "→ OR GHL",
      "→ Update reflects across all systems in real-time",
    ],
    syncNote: "Update any sheet → it updates the CRM and the Master Sheet. Update in the CRM → it updates the Master Sheet and the Store Sheet.",
    stack: ["n8n", "Google Sheets", "GoHighLevel", "Webhooks"],
    shots: [
      { img: "auto-lead-sync-2", alt: "n8n workflow canvas: a webhook and Switch node routing leads into many Google Sheets nodes" },
      { img: "auto-lead-sync-1", alt: "Overview of the full n8n lead sync workflow with its Google Sheets branches" },
    ],
  },
  {
    slug: "lead-automation-zapier",
    name: "Lead Automation with Duplicate Detection",
    category: "automation",
    status: "built",
    platform: "Zapier",
    summary: "Every Webflow form lead is checked for duplicates, created in the CRM if it's new, and the sales team hears about it straight away.",
    overview: "An automated lead handling system in Zapier that detects duplicate contacts, creates new leads and notifies the sales team instantly.",
    problem: "The same person often submits a form more than once. Without a check, the CRM fills with duplicates and sales follow up twice, or not at all.",
    flow: [
      { label: "Webflow form", kind: "trigger", note: "New submission" },
      { label: "Duplicate check", kind: "logic", note: "Email / phone" },
      { label: "Create lead", kind: "app", note: "If new" },
      { label: "Confirmation", kind: "output", note: "Email to user" },
      { label: "Sales alert", kind: "output", note: "Quick follow-up" },
    ],
    workflow: [
      "Form Submission",
      "→ Check Duplicate (Email/Phone)",
      "",
      "IF Duplicate:",
      "→ Mark as duplicate",
      "→ Send outbound email",
      "",
      "IF Not Duplicate:",
      "→ Create new lead",
      "",
      "→ Send confirmation email to user",
      "→ Notify sales team for quick follow-up",
    ],
    stack: ["Zapier", "Webflow Forms", "Freshsales", "Notion", "Gmail"],
    shots: [
      { img: "auto-lead-automation", alt: "Zapier workflow: Webflow form submission, filter, Freshsales contact lookups and three conditional paths" },
    ],
  },
  {
    slug: "time-based-lead-routing",
    name: "Lead Routing with Time-Based Assignment",
    category: "automation",
    status: "built",
    platform: "Zapier",
    summary: "New leads are de-duplicated, then assigned to the right salesperson depending on the time they arrive.",
    overview: "An automated lead management system with duplicate detection and time-based routing, so each lead is assigned to the right salesperson.",
    problem: "Leads need an owner the moment they arrive. Assigning them by hand depends on someone watching the inbox, and the team's shifts decide who should take each one.",
    flow: [
      { label: "Form submission", kind: "trigger", note: "Webhook" },
      { label: "Duplicate check", kind: "logic", note: "Email / phone" },
      { label: "Time condition", kind: "logic", note: "Before / after 2 PM" },
      { label: "Assign owner", kind: "app", note: "Salesperson 1 or 2" },
      { label: "Confirmation", kind: "output", note: "Email to user" },
    ],
    workflow: [
      "Form Submission",
      "→ Check Duplicate (Email/Phone)",
      "",
      "IF Duplicate:",
      "→ Mark as duplicate",
      "→ Send outbound email",
      "",
      "IF Not Duplicate:",
      "→ Create new lead",
      "→ Check Time Condition:",
      "",
      "IF Time < 2 PM:",
      "→ Assign to Sales Person 1",
      "",
      "IF Time ≥ 2 PM:",
      "→ Assign to Sales Person 2",
      "",
      "→ Send confirmation email to user",
    ],
    stack: ["Zapier", "Webflow Forms", "Google Sheets", "Freshsales", "Notion", "Gmail"],
    shots: [
      { img: "auto-lead-routing", alt: "Zapier workflow: webhook, Google Sheets, Freshsales lookup, formatters and time-based paths that assign the lead owner (staff names blurred)" },
    ],
  },
  {
    slug: "roi-calculator-report",
    name: "ROI Calculator with Automated Reports",
    category: "automation",
    status: "built",
    platform: "Webflow + Zapier",
    summary: "Visitors calculate their hiring cost savings in a Webflow calculator and get a personalised report by email; sales gets the lead instantly.",
    overview: "An automated system where users calculate hiring cost savings and receive a personalised report via email, while the sales team gets notified instantly.",
    problem: "A calculator on its own gives the visitor a number and nothing else: no report to share internally, and no lead for the sales team.",
    flow: [
      { label: "ROI calculator", kind: "trigger", note: "Built in Webflow" },
      { label: "Data captured", kind: "logic", note: "Zapier webhook" },
      { label: "Report", kind: "app", note: "Google Sheet / PDF" },
      { label: "Email to user", kind: "output", note: "Personal report" },
      { label: "Sales + database", kind: "output", note: "Lead details" },
    ],
    workflow: [
      "User fills ROI Calculator",
      "→ Data captured",
      "→ Generate report (Google Sheet / PDF)",
      "→ Send report to user via email",
      "→ Notify sales team with lead details",
      "→ Create lead entry in database",
    ],
    stack: ["Webflow", "Zapier", "Google Sheets", "Gmail"],
    shots: [
      { img: "auto-roi-calculator", alt: "India Talent ROI Calculator built in Webflow: team members, salaries and a cost savings analysis" },
      { img: "auto-roi-report", alt: "Generated staffing cost report in Google Sheets with investment summary and role breakdown" },
      { img: "auto-roi-zap", alt: "Zapier workflow behind the ROI calculator" },
    ],
  },
];

// Ideas Sagar is exploring. Shown in a separate "In the lab" section and never
// presented as deployed work.
export const LAB_PROJECTS = [
  { name: "AI lead qualification", flow: ["Website form", "n8n / Zapier", "AI qualification", "CRM", "Notification"], note: "Adds an AI scoring and summary step to the lead workflows above." },
  { name: "AI SEO reporting", flow: ["Search Console", "Data processing", "AI insights", "Google Sheets", "Report"], note: "Turns Search Console data into a plain-language report on a schedule." },
  { name: "PDF to Google Sheets", flow: ["PDF upload", "Extraction", "AI structuring", "Validation", "Google Sheets"], note: "Reads PDFs and writes checked, structured rows." },
  { name: "Automated call tracking", flow: ["Call tracking", "Lead data", "CRM", "Follow-up"], note: "Makes sure every tracked call becomes a CRM lead with a follow-up." },
  { name: "AI customer support", flow: ["Knowledge base", "AI assistant", "Response", "Human escalation"], note: "Answers from approved knowledge and hands anything unsure to a person." },
];

export const ALL_PROJECTS = [...WEB_PROJECTS, ...AUTOMATION_PROJECTS];
export const hasCaseStudy = p => p.caseStudy !== false;
export const projectUrl = p => (hasCaseStudy(p) ? `/work/${p.slug}` : null);
// Gets a full card: has its own case study, or at least a live site to link to.
export const hasCard = p => hasCaseStudy(p) || Boolean(p.url);
