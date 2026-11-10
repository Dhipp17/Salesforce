/* Ease of use, Why Salesforce, and proof points.
   Every number is from salesforce.com or the Manufacturing + Marketing Cloud overview deck,
   labelled Achieved or Projected exactly as the source describes it. */

/* ---------- Simple by design (ease of use) ---------- */
const SIMPLE = {
  headline: "Simple for the people who use it every day.",
  sub: "Your team asked for something easy to start with and big enough to grow into. This is how Chapin's Salesforce delivers both.",
  quote: ["“We're trying to get a CRM that's user-friendly and gets us off probably on a simple format first off and something we can grow with.”", "Executive sponsor, Chapin"],
  cards: [
    { icon: "people", title: "Built around each role", text: "Reps, service agents and marketers each get a home page with only what they need. Acquis designs these personas with your champions.", visual: "roles" },
    { icon: "spark", title: "Ask, don't search", text: "Type a question in plain English. The AI assistant finds the record, writes the summary, drafts the email or updates the deal.", visual: "ask" },
    { icon: "plug", title: "Works where you already work", text: "Outlook email and calendar sync both ways. RingCentral stays your phone. Reps on the road use the mobile app.", visual: "works" },
    { icon: "layers", title: "Ready-made for manufacturers", text: "Sales agreements, account forecasting and the service console come built in. Acquis sets them to your process, and later changes are clicks, not code.", visual: "ready" },
    { icon: "shield", title: "Nobody learns alone", text: "Champions in every team, role-based training, two weeks of hypercare and unlimited Premier coaching after that.", visual: "help" },
    { icon: "factory", title: "Start simple, grow when ready", text: "Phase one focuses on what Chapin needs first. Quoting, rebates and partner portals plug into the same platform later, with no migration.", visual: "grow" }
  ],
  tasks: [
    ["Log a customer email", "Automatic from Outlook"],
    ["Update a deal", "Ask the assistant"],
    ["Check an order", "Already on the account"],
    ["Send a price update", "One approved template"]
  ]
};

/* ---------- Why Salesforce ---------- */
const MFG_COUNT = { value: 20000, suffix: "+", label: "manufacturers run on Salesforce", sub: "The #1 AI CRM for manufacturing", src: "Source: salesforce.com/manufacturing" };

const WHY = {
  eyebrow: "Why Salesforce",
  headline: "A company founded in 1884 deserves a platform built for what comes next.",
  paras: [
    "Chapin began with a counter, a customer on one side and a problem worth solving on the other. You knew who walked in, what they needed and what you'd promised them. Four times larger today, those relationships live in spreadsheets, inboxes and people's memories.",
    "Salesforce gives Chapin that counter back, at the size the business has become: every account, agreement, forecast, order, case and campaign in one view, connected to your ERP and built specifically for manufacturers. More than 20,000 manufacturers already run on it."
  ],
  closer: "Chapin needs a platform with visibility into every part of the business, creating one trusted view of its customers and its operations."
};

const PILLARS = [
  { icon: "factory", title: "Built for manufacturers", text: "A purpose-built data model for sales agreements, account forecasting, warranties and assets, with new manufacturing features three times a year." },
  { icon: "layers", title: "One platform, first lead to last claim", text: "Sales, service, marketing and data share one customer view, so everyone works from the same facts." },
  { icon: "plug", title: "Open to the systems you trust", text: "Your ERP stays the system of record. MuleSoft connects it both ways and keeps Power BI and future systems in reach." }
];

/* tag: "Achieved" = reported result; "Projected" = customer's stated expectation; featured = shown before "See all" */
const PROOF = [
  { value: 354, suffix: "%", label: "ROI seen by manufacturers on Manufacturing Cloud", who: "Salesforce Manufacturing Cloud business value overview", tag: "Achieved", featured: true },
  { value: 166, suffix: "%", label: "rise in customer satisfaction score, with more demand and forecast visibility", who: "Kawasaki", tag: "Achieved", featured: true },
  { value: 60, suffix: "%", label: "of warranty claims automated", who: "A global manufacturer on Salesforce", tag: "Achieved", featured: true },
  { value: 21, suffix: "%", label: "faster case wrap-up", who: "Manufacturing Customer Success Survey", tag: "Achieved", featured: true },
  { value: 32, suffix: "%", label: "increase in overall marketing ROI", who: "Salesforce FY26 Customer Success Metrics", tag: "Achieved", featured: true },
  { value: 490, suffix: "", label: "annual hours saved per sales rep", who: "Salesforce Manufacturing Cloud business value overview", tag: "Achieved", featured: true },
  { value: 130, suffix: "", label: "processes automated", who: "Kawasaki Engines", tag: "Achieved" },
  { value: 29, suffix: "", label: "systems consolidated", who: "Chargeurs PCC", tag: "Achieved" },
  { value: 50, suffix: "%", label: "less manual scheduling", who: "MTI", tag: "Achieved" },
  { value: 30, suffix: "%", label: "lower cost to acquire new customers", who: "Salesforce FY26 Customer Success Metrics", tag: "Achieved" },
  { value: 33, suffix: "%", label: "increase in customer engagement and in customer lifetime value", who: "Salesforce FY26 Customer Success Metrics", tag: "Achieved" },
  { value: 65, suffix: "%", label: "expected self-service rate with AI-guided troubleshooting", who: "Fisher & Paykel", tag: "Projected" },
  { value: 212, suffix: "%", label: "projected ROI over three years from service and sales agents", who: "Endress+Hauser", tag: "Projected" },
  { value: 30, suffix: "%", label: "expected support productivity gain, with 47,500 inquiries a year handled by agents", who: "Endress+Hauser", tag: "Projected" },
  { value: 28, suffix: "%", label: "projected improvement in customer-support efficiency (20% for field technicians)", who: "Luminator", tag: "Projected" }
];

const PROOF_NOTE = "Results as reported by Salesforce and its customers; yours will vary. Expected and projected figures are customers\u2019 stated expectations. A Chapin-specific business case comes from the ROI working session. Sources: salesforce.com/manufacturing, Salesforce customer stories (Endress+Hauser, Luminator, Fisher & Paykel, Kawasaki) and the Salesforce Manufacturing + Marketing Cloud overview.";
