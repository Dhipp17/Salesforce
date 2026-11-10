/* Journey content. TABS are the six chapters, in the order a Chapin customer moves through them.
   Each step has: time, who (role), title, text, ease (short "why it's simple" line) and ui (mock screen spec).
   Mock screens are illustrative; names like "Valley Farm & Hardware" and "Ray" are fictional. */

const PERSONA = "Follow Ray, a purchasing manager at a regional farm and hardware dealer, from the first hello at a trade show to a loyal, growing account.";

const TABS = [
  {
    id: "marketing", verb: "Attract", label: "Marketing", kicker: "Marketing Cloud",
    title: "Ray meets Chapin at a trade show, and the follow-up runs itself.",
    intro: "Price increases take days to prepare and still miss small accounts. Trade-show leads are worked by hand. Marketing Cloud gives your team segments, on-brand templates and journeys, on the same data your reps use.",
    before: ["Price increases need about three days of manual data pulls and still miss accounts", "Roughly 80 shows a year with no lead-ROI tracking", "Product registrations exported by hand into Mailchimp", "Reps can't see what customers were sent"],
    after: ["Campaigns segmented by channel, region and season, sent on a set date", "Branch-level lists from SyteLine ship-tos, with geo-targeted email", "Trade-show leads scored and routed within 48 hours", "Every send and response on the account record for reps and agencies"],
    steps: [
      { time: "Mon 9:00", who: "Marketing", shot: "mkt-campaign", slide: "ov-29", title: "Brief the campaign in plain English", text: "Agentforce builds the campaign from one prompt: goal, target audience, key message and brand, ready to review. No list exports.", ease: "One prompt, whole campaign",
        ui: { type: "chat", app: "Marketing", msgs: [["u", "Find Northeast dealers who bought SaltPro spreaders last winter"], ["a", "Found 412 accounts across hardware and farm-supply dealers. Want me to draft the pre-season email?"], ["u", "Yes, use the SaltPro template"]] } },
      { time: "Mon 10:30", who: "Marketing", shot: "mkt-content", slide: "ov-31", title: "Approve an on-brand email", text: "Agentforce drafts the copy inside the email builder. Every send starts from an approved Chapin template, and nothing goes out without the approval step you set.", ease: "No rogue emails",
        ui: { type: "email", app: "Marketing", subject: "Get ahead of winter with SaltPro", lines: ["Hi {First name},", "Winter is coming early to the Northeast. Here's how dealers are stocking up..."], cta: "Approved by Marketing lead" } },
      { time: "Show day", who: "Trade show team", shot: "mkt-scoring", slide: "ov-33", title: "Capture Ray, then score him automatically", text: "Ray lands in Salesforce as a lead with the show as his source. Scoring rules weigh fit, intent and engagement, so he is routed to the right rep within 48 hours.", ease: "Lead to rep in seconds",
        ui: { type: "record", app: "Sales", obj: "Lead", name: "Ray (fictional)", sub: "Purchasing Manager, Valley Farm & Hardware", fields: [["Source", "Northeast Dealer Show"], ["Score", "72 / 100"], ["Territory", "Northeast"], ["Owner", "Field rep"]] } },
      { time: "+48 hours", who: "Automatic", title: "The journey follows up for you", text: "A thank-you email goes out, then the journey branches on what Ray does. Clickers become a rep task; non-openers move to a lighter cadence.", ease: "Set it once",
        ui: { type: "flow", app: "Marketing", start: "Great meeting you email", wait: "Wait 48 hours", branches: [["Clicked", "Task for rep: call Ray"], ["Opened", "Send follow-up"], ["No open", "Low-frequency list"]] } },
      { time: "Price change", who: "Marketing", slide: "rb-9", title: "Tell every account at once", text: "Every account is notified the same day with old and new prices. Non-responders are flagged to their rep before orders go on hold, and reps see exactly what each customer received.", ease: "Same day, not three days",
        ui: { type: "email", app: "Marketing", subject: "Your 2027 Chapin pricing", lines: ["Here is what changes for your account on March 1:"], table: [["Item", "Now", "New"], ["SaltPro 80 lb", "$ —", "$ —"], ["TurfPro 100 lb", "$ —", "$ —"]], cta: "Sent to 1,140 accounts" } },
      { time: "Friday", who: "Marketing lead", shot: "mkt-dashboard", slide: "ov-32", title: "See which shows paid off", text: "Sends, opens, clicks and pipeline by campaign and channel on one dashboard, so you know which of the ~80 shows to keep.", ease: "ROI without a spreadsheet",
        ui: { type: "chart", app: "Marketing", h: "Pipeline by trade show", legend: ["Leads", "Pipeline"], bars: [["Dealer Show", 70, 90], ["Farm Expo", 55, 60], ["Hardware Mkt", 80, 45], ["Turf Summit", 40, 70]] } }
    ],
    quotes: [["\"We really were... a 'we make it and they will come' business.\"", "Marketing leader, Chapin"], ["\"That's exactly what I was visualizing in my head.\"", "Marketing, Chapin, on control over automation"]],
    outcomes: ["Price changes in hours, not days", "Show-to-opportunity ROI", "Faster lead response", "One brand standard"],
    scope: { now: ["Email journeys & nurture", "Controlled templates", "Segmentation & notifications", "Website lead capture", "Campaign ROI", "Google Analytics"], later: ["SMS and LinkedIn", "Social outbound", "Partner community"] }
  },
  {
    id: "sales", verb: "Win & plan", label: "Sales", kicker: "Manufacturing Cloud + Sales Cloud",
    title: "The rep wins Ray's business, and the forecast updates itself.",
    intro: "Today pipeline lives in spreadsheets and forecasts are stitched together in Power BI. Manufacturing Cloud gives every rep and manager one account-first view that stays in step with your ERP.",
    before: ["No shared customer or contact database", "Opportunities are guesses with no products or quantities", "Forecasts rebuilt account by account from last year", "Sales leaves for Power BI to answer simple questions"],
    after: ["Sales agreements hold each retailer's committed volumes and pricing", "Forecasts by account, product and month that roll up by channel", "Line reviews that become sales agreements when you win placement", "Agreement performance by distributor, ready for every QBR"],
    steps: [
      { time: "8:00 AM", who: "Field rep", shot: "sales-home", title: "Start the day on one screen", text: "Leads by source, pipeline by stage, recent accounts and anything waiting for approval, all on one home page. Ray shows up as a new trade-show lead, right next to the website leads.", ease: "Everything on one page",
        ui: { type: "home", app: "Sales", tiles: [["My pipeline", "$1.2M", "14 open deals"], ["Due today", "5 tasks", "1 hot lead"], ["Meetings", "3", "Synced from Outlook"]], list: ["Call Ray, Valley Farm & Hardware (clicked email)", "Prep line review: national account", "Follow up on SaltPro quote"] } },
      { time: "8:30 AM", who: "Field rep", shot: "sales-agentforce", slide: "mf-5", title: "Ask instead of searching", text: "The rep asks, \"What was the latest open line review I was working on?\" Agentforce searches the CRM, surfaces the Tractor Supply spring line review in Negotiation, lists every other open line review, and offers to pull up tasks and next steps.", ease: "Ask in plain English",
        ui: { type: "chat", app: "Sales", msgs: [["u", "What's my latest open line review?"], ["a", "Valley Farm & Hardware: spring line review, Negotiation stage, 3 products. Last touch: show email clicked yesterday. Open it?"]] } },
      { time: "10:00 AM", who: "Field rep", slide: "co-16", title: "Build the line review", text: "Add products and quantities. Prices come straight from your ERP, to the penny. Win the placement and the line review becomes a sales agreement.", ease: "Prices fill in for you",
        ui: { type: "record", app: "Sales", obj: "Opportunity", name: "Valley Farm & Hardware: Spring Line Review", sub: "Stage: Negotiation", fields: [["Close date", "Feb 14"], ["Type", "Line review"]], related: { h: "Products", rows: [["SaltPro 80 lb spreader", "40", "ERP price"], ["TurfPro 100 lb", "24", "ERP price"], ["Pump sprayer 2 gal", "120", "ERP price"]] } } },
      { time: "11:30 AM", who: "Field rep", shot: "sales-agreement", slide: "co-8", title: "Check plan vs. actual", text: "The sales agreement holds committed volumes and pricing, with planned vs. actual from SyteLine orders month by month and the gap to goal.", ease: "No exports",
        ui: { type: "chart", app: "Sales", h: "Sales agreement: plan vs. actual", legend: ["Planned", "Actual"], bars: [["Jan", 60, 58], ["Feb", 70, 64], ["Mar", 90, 72], ["Apr", 80, 30]] } },
      { time: "1:00 PM", who: "Field rep", shot: "sales-planning", slide: "co-3", title: "Catch deviations before they hit margin", text: "Agentforce summarizes the agreement, flags quantity and revenue deviations, recommends next steps and can schedule a visit or draft the email to the customer.", ease: "The agent spots it first",
        ui: { type: "chat", app: "Sales", msgs: [["u", "Summarize the Valley Farm agreement"], ["a", "Actuals are 18% behind plan on SaltPro for March. Recommend a visit before the season. Schedule one?"]] } },
      { time: "2:00 PM", who: "Field rep", title: "Answer \"where's my order?\"", text: "Ray calls about an order. Status from the ERP is already on his account, so there is no email to the back office.", ease: "Answer on the first call",
        ui: { type: "record", app: "Sales", obj: "Account", name: "Valley Farm & Hardware", sub: "Parent: Valley Farm Group · 3 ship-to locations", fields: [["ERP ID", "C601-0458"], ["Segment", "Hardware / farm dealer"]], related: { h: "Orders (from ERP)", rows: [["SO-88213", "Shipped", "Tracking sent"], ["SO-88190", "Delivered", "Feb 2"], ["SO-88102", "Delivered", "Jan 18"]] } } },
      { time: "4:30 PM", who: "Sales manager", shot: "sales-forecast", slide: "co-9", title: "Forecast rolls itself up", text: "Forecasts by account, product and month roll up by channel from last year's actuals plus agreements, and feed the seasonal build plan.", ease: "No chasing reps",
        ui: { type: "home", app: "Sales", tiles: [["2027 forecast", "On track", "Rolled up by SKU"], ["Stale deals", "2", "No activity 30 days"], ["Gap to plan", "-4%", "Northeast"]], list: ["Alert: national account line review idle 32 days", "SaltPro forecast up 12% after show season"] } }
    ],
    quotes: [["\"It puts everything in one place... it's real time. It's visible. I like it.\"", "Sales leader, Chapin"], ["\"That way we can monetize the opportunity accurately. We're not just putting a hypothetical number in there.\"", "Sales leader, Chapin"]],
    outcomes: ["No more Power BI hopping", "Faster, more accurate forecasts", "Pipeline that survives turnover", "Fewer pricing errors"],
    scope: { now: ["Accounts & territories", "Leads & conversion", "Opportunities by segment", "Products & price books", "Sales agreements & forecasting", "Orders", "Dashboards"], later: ["Revenue Cloud: quoting, rebates, co-op, chargebacks", "Partner / rep portal", "Sales performance management", "Salesforce Maps"] }
  },
  {
    id: "mulesoft", verb: "Fulfill", label: "Orders & ERP", kicker: "MuleSoft",
    title: "Ray emails a PO, and nobody has to type it twice.",
    intro: "Your ERP stays the source of truth. MuleSoft connects it to Salesforce in both directions and can read the POs that arrive as PDFs, spreadsheets and emails.",
    before: ["POs arrive as PDFs, images, spreadsheets and email text and are keyed by hand", "About 5 minutes for a standard PO, longer for a 40-line order", "EDI batches can lock the ERP for 15-20 minutes", "Little data flows back into the ERP"],
    after: ["Accounts, contract pricing and orders synced both ways through APIs", "AI reads emailed POs and creates orders", "Pricing checked before orders post, with exceptions flagged", "Reusable APIs, so each new system connects once"],
    steps: [
      { time: "7:30 AM", who: "Ray (customer)", title: "Ray emails a PO", text: "The PO lands in the order inbox as a PDF. That email starts the process. Nobody has to open it.", ease: "Nothing to open",
        ui: { type: "email", app: "Inbox", subject: "PO 4471, spring order", lines: ["From: Ray, Valley Farm & Hardware", "Attached: PO_4471.pdf (41 lines)"], cta: "Picked up by MuleSoft" } },
      { time: "7:31 AM", who: "Automatic", title: "AI reads every line", text: "The header and all 41 lines are extracted, whatever the layout. Each field gets a confidence score.", ease: "41 lines in seconds",
        ui: { type: "doc", app: "Document processing", file: "PO_4471.pdf", fields: [["Customer", "Valley Farm & Hardware", 98], ["Bill-to", "Valley Farm Group", 96], ["Ship-to", "Missing", 0], ["Lines", "41 items", 94]] } },
      { time: "7:32 AM", who: "Order center", title: "Missing ship-to? It stops and asks", text: "Low-confidence or missing fields go to a person, or a polite request goes back to Ray automatically.", ease: "Exceptions only",
        ui: { type: "chat", app: "Order center", msgs: [["a", "PO 4471 is missing a ship-to. Valley Farm has 3 locations. Which one?"], ["u", "North warehouse"], ["a", "Updated. Releasing the order to the ERP."]] } },
      { time: "8:05 AM", who: "Automatic", title: "Order created in your ERP", text: "Clean POs create the sales order in your ERP. Existing EDI orders keep flowing as they do today.", ease: "No re-keying",
        ui: { type: "integration", nodes: ["Salesforce", "MuleSoft", "ERP"], status: "Sales order SO-88240 created" } },
      { time: "8:06 AM", who: "Sales & service", title: "Everyone sees the status", text: "The order number and status appear on Ray's account, so sales and service can answer him right away.", ease: "One source of truth",
        ui: { type: "record", app: "Sales", obj: "Account", name: "Valley Farm & Hardware", sub: "Orders sync from your ERP", fields: [["Latest PO", "4471"], ["Ship-to", "North warehouse"]], related: { h: "Orders", rows: [["SO-88240", "Booked", "41 lines"], ["SO-88213", "Shipped", "Tracking sent"]] } } }
    ],
    quotes: [["\"Even just to do one PO... would probably take, you know, 5 minutes on a standard one... one that has 40 lines.\"", "Order center, Chapin"], ["\"The APIs for those existing modules are already written.\"", "IT lead, Chapin"]],
    outcomes: ["Most PO keying removed", "Fewer incomplete orders", "ERP stays the golden record", "Ready for AI with governance"],
    scope: { now: ["Two-way ERP integration", "Accounts, items, price books, orders", "EDI continues", "RingCentral via Salesforce Voice"], later: ["PO document processing (decision pending)", "PIM/DAM link", "Power BI & data platform"] }
  },
  {
    id: "service", verb: "Support", label: "Service", kicker: "Service Cloud",
    title: "Ray's customer calls with a problem, and it's solved on the first call.",
    intro: "Product support, order center and ship center work from Outlook and RingCentral today. Service Cloud puts calls, cases, orders and answers in one console. RingCentral stays your phone system.",
    before: ["Cases live in Outlook and RingCentral only; no SLAs", "Registrations exported to spreadsheets every few weeks", "Knowledge lives in specs, drawings and people's heads", "Order questions need the back office"],
    after: ["Phone, web and email in one queue with routing and full history", "Registered products as assets: model, purchase date and parts on every case", "Warranty registrations and claims tracked from intake to resolution", "RingCentral connected, reopening digital channels"],
    steps: [
      { time: "8:00 AM", who: "Service agent", title: "Set your status once", text: "Pick phone, email or both. Salesforce routes the work, and RingCentral follows the same status.", ease: "One status, both systems",
        ui: { type: "console", app: "Service", status: "Available: Phone + Email", caller: null, rows: [["Queue", "Product support"], ["Waiting", "3 cases"], ["SLA risk", "0"]] } },
      { time: "8:15 AM", who: "Service agent", shot: "service-console", slide: "ad-2", title: "The call pops with context", text: "Before saying hello, the agent sees who is calling, their open cases, recent orders and the products they own.", ease: "No \"can I get your account number?\"",
        ui: { type: "console", app: "Service", status: "On call", caller: "Valley Farm & Hardware", rows: [["Open cases", "1"], ["Last order", "SO-88213, shipped"], ["Registered products", "Pump sprayer 2 gal"]] } },
      { time: "10:00 AM", who: "Service agent", shot: "service-asset", slide: "ad-3", title: "See the registered product", text: "Registered products are stored as assets, so even when the customer can't find a model number, the agent sees the model, purchase date, warranties and service history.", ease: "Answer suggested for you",
        ui: { type: "record", app: "Service", obj: "Case", name: "Sprayer losing pressure", sub: "Photo attached · Model confirmed", fields: [["Product", "Pump sprayer 2 gal"], ["Warranty", "Active"]], related: { h: "Suggested knowledge", rows: [["Pressure loss: check the seal", "92% match", ""], ["Replacement seal kit", "Part", ""]] } } },
      { time: "11:00 AM", who: "Service agent", shot: "service-warranty", slide: "ad-4", title: "Settle the warranty claim by rules", text: "The claim is checked against the warranty terms and the payout is calculated by business rules. Dealers and customers can also submit claims themselves.", ease: "Rules do the checking",
        ui: { type: "doc", app: "Service", file: "Warranty claim", fields: [["Coverage", "Active", 100], ["Parts", "Seal kit", 100], ["Approval", "Auto-approved", 100]] } },
      { time: "12:30 PM", who: "Ship center", title: "Answer \"where's my shipment?\"", text: "Order status and tracking from the ERP are on the account. Reply from the console in one step.", ease: "One click reply",
        ui: { type: "record", app: "Service", obj: "Order", name: "SO-88213", sub: "Valley Farm & Hardware", fields: [["Status", "Shipped"], ["ETA", "Thursday"], ["Carrier", "LTL freight"]] } },
      { time: "2:30 PM", who: "Service lead", title: "Turn the fix into knowledge", text: "A new fix becomes a draft article. The lead approves it, and every agent, and later the website, can use it.", ease: "Learn once, reuse forever",
        ui: { type: "doc", app: "Knowledge", file: "Draft: Pressure loss on 2-gal sprayers", fields: [["Audience", "Internal + public", 100], ["Steps", "4", 100], ["Approval", "Approved by lead", 100]] } },
      { time: "4:00 PM", who: "Automatic", title: "Close the loop", text: "A satisfaction survey goes out when the case closes, and marketing sees the history before replying to any online review.", ease: "Feedback without effort",
        ui: { type: "chart", app: "Service", h: "This week", legend: ["Cases closed", "CSAT"], bars: [["Mon", 60, 88], ["Tue", 72, 90], ["Wed", 65, 92], ["Thu", 80, 91]] } }
    ],
    quotes: [["\"We just use Outlook, email, and RingCentral. Those are the only two things that we have.\"", "Service lead, Chapin"], ["\"Yeah, it's all in one, which is very nice.\"", "Service lead, Chapin"]],
    outcomes: ["Fewer touches per case", "Faster close, measured with SLAs", "Registrations captured automatically", "Knowledge that grows"],
    scope: { now: ["Case types & queues", "RingCentral screen pop", "Omni-Channel routing", "Email- & web-to-case", "Product registrations", "Knowledge with approvals", "Dashboards"], later: ["Website agent for first-line questions", "Photo-based product ID", "Social-to-case"] }
  },
  {
    id: "slack", verb: "Connect", label: "Slack", kicker: "Slack", badge: "Proposed · not yet in scope",
    title: "When something needs a person, the right people see it in seconds.",
    intro: "Slack came up lightly in discovery, so this chapter is a proposal: how Slack could connect sales, service and the order center around Salesforce data. Per salesforce.com, Slack is included with every new Salesforce org.",
    before: ["Account updates travel by email and word of mouth", "Order and pricing exceptions wait for someone to notice", "Teams hand work off by forwarding"],
    after: ["Channels per key account with live Salesforce records", "Alerts for PO exceptions, stale deals and escalations", "Approvals with approve/reject buttons in the channel", "Update records by telling Slackbot in plain language"],
    steps: [
      { time: "8:00 AM", who: "Field rep", shot: "slack-channels", slide: "sl-13", title: "Every key account gets a channel", text: "A Salesforce channel sits on the account record, so CRM data and the team's conversation about the customer live in one place.", ease: "One shared view",
        ui: { type: "slack", channel: "#acct-valley-farm", msgs: [["Salesforce", "Account: Valley Farm & Hardware \u00b7 Open line review in Negotiation", "View account"]] } },
      { time: "8:30 AM", who: "Field rep", shot: "slack-salesforce", slide: "sl-14", title: "Salesforce inside Slack", text: "Leads, accounts and deal channels sit in Slack's sidebar, and Slackbot can read and update Salesforce records for you.", ease: "Never switch tabs",
        ui: { type: "slack", channel: "Slackbot", msgs: [["Field rep", "What changed on my accounts overnight?", ""], ["Slackbot", "2 orders shipped, 1 case opened at Valley Farm, and a price exception needs approval.", ""]] } },
      { time: "9:16 AM", who: "Order center", title: "An exception lands in the channel", text: "Instead of an email chain, the order center channel gets one clear message with the customer, the order and what's missing.", ease: "Seen in seconds",
        ui: { type: "slack", channel: "#order-exceptions", msgs: [["Salesforce", "PO 4471 from Valley Farm & Hardware is missing a ship-to. 41 lines, $ — value.", "View order"]] } },
      { time: "9:20 AM", who: "Field rep", title: "Resolve it in the thread", text: "The rep who knows the account answers in the thread, and the order continues to the ERP.", ease: "No email chain",
        ui: { type: "slack", channel: "#order-exceptions", msgs: [["Salesforce", "PO 4471 is missing a ship-to.", ""], ["Field rep", "Ship to their North warehouse.", ""], ["Salesforce", "Updated. Order SO-88240 released.", ""]] } },
      { time: "11:00 AM", who: "Sales manager", title: "Approve without logging in", text: "A price exception posts with approve and reject buttons. The manager decides from their phone.", ease: "Approve in one tap",
        ui: { type: "slack", channel: "Approvals", msgs: [["Salesforce", "Price exception: Valley Farm line review, 3% off TurfPro. Requested by field rep.", "Approve|Reject"]] } },
      { time: "2:00 PM", who: "Field rep", title: "Update the record in plain language", text: "Tell Slackbot what changed. It confirms before saving, and admins control what it can edit.", ease: "Say it, confirm it",
        ui: { type: "slack", channel: "Slackbot", msgs: [["Field rep", "Move the Valley Farm line review to Closed Won", ""], ["Slackbot", "Update stage to Closed Won? Amount and close date stay the same.", "Confirm"]] } }
    ],
    stats: [["90%", "of Salesforce's own sellers use Salesforce through Slackbot"], ["20 hrs", "saved per week by the heaviest Slackbot users"], ["$15M+", "productivity savings at Wayfair"], ["30%", "of service cases resolved autonomously at Engine"]],
    statsNote: "Source: Meet Slack deck",
    quotes: [],
    outcomes: ["Fewer email hand-offs", "Exceptions fixed faster", "One place per account", "Data where people already work"],
    scope: { now: ["To be scoped with your team"], later: ["Account channels", "Order-exception alerts", "Approvals in Slack", "Slack Connect with rep agencies"] }
  },
  {
    id: "premier", verb: "Succeed", label: "Premier Success", kicker: "Premier Success Plan",
    title: "Salesforce experts on Chapin's side, for the life of your subscription.",
    intro: "The Premier Success Plan is included with Core, Advanced and Max licenses and starts at signature. It gives Chapin onboarding, unlimited 1-to-1 Expert Coaching, health checks, a Customer Success Score and 24/7 expedited support, so adoption keeps growing long after go-live. Acquis builds phase one; Premier keeps you getting more from it.",
    before: ["No in-house Salesforce admin yet", "Worry that adoption fades once the project team leaves", "Several big initiatives at once: ERP cloud move, data platform, PIM/DAM", "Past experience of buying one thing and receiving another"],
    after: ["Onboarding that aligns Chapin's goals with the platform from day one", "Unlimited 1-to-1 Expert Coaching on any topic", "Health checks, Success Reviews and a Customer Success Score", "24/7 support with a 1-hour response for business-stopping issues"],
    stats: [["115%", "return on investment for Premier customers"], ["$1.2M", "increased business impact from better technical health and adoption"], ["95%", "reduced mean time to issue resolution"], ["Unlimited", "1-to-1 Expert Coaching sessions"]],
    statsNote: "Source: The Total Economic Impact\u2122 of the Salesforce Premier Success Plan, a commissioned study by Forrester Consulting, September 2024 (composite organization).",
    premier: {
      src: "https://www.salesforce.com/services/success-plans/premier/",
      groups: [
        ["Start strong", [["Onboarding", "Salesforce experts align your business and AI goals with product capabilities and build a strategy to reach them."], ["Success Path & Success Reviews", "A roadmap to build expertise, drive adoption and keep the system healthy, reviewed with a Success Guide up to two times a year."], ["Customer Success Score", "Insights and AI-driven recommendations on adoption, your team's expertise and the technical health of your solution."]]],
        ["Keep improving", [["Expert Coaching, unlimited", "1-to-1 sessions with Salesforce experts on any topic. Gut-check an idea or validate a decision before you build it."], ["Health Checks & Assessments", "An expert reviews how you use Salesforce and gives personalized recommendations."], ["Training & certification", "60\u201390 minute workshops, plus 25% off instructor-led courses (1\u20135 days) and certifications for admins, developers, architects and analysts. Trailhead stays free."]]],
        ["Solve issues anytime", [["Expedited Technical Support", "Chat, phone and case support from certified experts 24/7, with a 1-hour response for business-stopping issues."], ["Help Agent", "Instant answers grounded in trusted Salesforce knowledge, from quick questions to proactive recommendations."], ["Developer Support", "Troubleshooting for up to 200 lines of custom code, including pro-code Agentforce solutions."]]]
      ],
      tiers: [
        ["Standard", "Included in all licenses", ["Help Agent, Trailhead and the Trailblazer Community", "Knowledge articles and documentation", "Case support"]],
        ["Premier", "Included with Core, Advanced and Max licenses", ["Onboarding, Success Path and Customer Success Score", "Success Reviews up to 2x a year", "Unlimited Expert Coaching, workshops and health checks", "25% off courses and certifications", "24/7 support with a 1-hour response; 200 lines of code review"]],
        ["Signature", "Available on request", ["Everything in Premier, plus a designated Customer Success Manager", "Success Reviews up to 4x a year", "Proactive monitoring, architect reviews, key event management", "35% off certifications; 5,000 lines of code review"]]
      ],
      quote: ["“The Premier Success Plan is not only support, but a proactive feature where you can get help with rolling out new features and learning from some of the best minds at Salesforce.”", "Salesforce Architect, BACA Systems (manufacturer)"],
      quotes2: [["\u201CI consider having Premier like having an extra team member.\u201D", "Salesforce Administrator, ecobee"], ["\u201CPremier is something that we should've had from the start because it's been very helpful. It's a way to get more done faster.\u201D", "Director of Business Systems, ChowNow"]],
      slides: ["pv-1", "ps-2", "ps-5"],
      acquisNote: "Acquis, your implementation partner, designs and builds phase one in about 13 weeks, then provides about two weeks of hypercare. Premier runs alongside from signature and continues after.",
      acquis: {"title": "Acquis implementation (per SOW)", "sub": "Embark method, about 13 weeks, then hypercare. Fixed-scope phase one.", "items": [["Team", "Engagement lead, Salesforce consultant, technical architect and Salesforce developer, working on Eastern time."], ["Discover & design (weeks 1-3)", "About seven sessions across sales, service, marketing, integration and data, producing user stories and the solution design."], ["Build (weeks 4-9)", "Six one-week sprints with a demo at the end of each. About an hour a week of Chapin time."], ["Test", "End-to-end testing by Acquis, then user acceptance testing by Chapin."], ["Train", "Role-based virtual training close to go-live, documentation, and separate admin training."], ["Deploy", "Sandbox to production, typically over a weekend."], ["Hypercare", "About two weeks of close support after go-live."], ["Evolve (optional)", "A bucket of support hours afterwards for admin help, backlog and next phases. Acquis can also help you hire an admin."]]},
      sow: [["Foundation", ["About 25 users in production and test environments", "Profiles, permission sets, roles and sharing rules as reusable personas"]], ["Sales / Manufacturing Cloud", ["Account record types and territory assignment", "Leads and conversion", "Opportunity processes by segment", "Products and price books", "Sales agreements and account forecasting", "Orders and order lines", "Reports and dashboards"]], ["Service Cloud", ["Case types and queues", "Voice with RingCentral screen pop and Omni-Channel", "Email-to-case, web-to-case and product registrations", "Knowledge, reports and dashboards"]], ["Marketing Cloud", ["Email journeys and nurture", "Templates and segment notifications", "Website lead capture", "Campaigns and campaign members for ROI", "Google Analytics connection"]], ["MuleSoft integration", ["Two-way ERP integration: accounts, items, prices, contract prices, orders", "Existing EDI flow continues", "PO document processing priced as an option or phase two"]], ["Data migration", ["Accounts", "2027 baseline forecast", "Service articles", "Trade-show leads and contacts"]]],
      chapin: ["A designated project manager", "Business leads from sales, service, marketing and IT", "A small group of champions in discovery and every demo", "Clean data, ERP API access and testing time"],
      governance: ["Weekly status meeting", "Executive alignment call every 3-4 weeks", "Sprint demos every week of the build"],
      notIncluded: ["SMS and social outbound", "Account manager targets, visit management, program-based business", "Experience Cloud / partner community", "On-site training (available with travel)", "Revenue Cloud: quoting, rebates, co-op, chargebacks (phase two)"]
    },
    steps: [
      { time: "Signature", who: "Premier", slide: "pv-1", title: "Onboarding with Salesforce experts", text: "Before the build starts, Premier onboarding lines up Chapin's goals (one view of the customer, faster orders, the February season) with the platform's capabilities.", ease: "Day-one strategy", ui: { type: "plan", active: 0 } },
      { time: "During the build", who: "Premier + Acquis", slide: "pv-1", title: "Gut-check decisions with Expert Coaching", text: "While Acquis builds, your project lead and champions can book unlimited 1-to-1 sessions with Salesforce experts to validate designs before they're built.", ease: "Unlimited sessions", ui: { type: "plan", active: 1 } },
      { time: "Go-live", who: "Premier", slide: "ps-4", title: "24/7 support from day one", text: "From go-live, chat, phone and case support are available around the clock, with a 1-hour response for business-stopping issues, plus the Help Agent for instant answers.", ease: "Help within the hour", ui: { type: "plan", active: 2 } },
      { time: "Month 1", who: "Your team", slide: "ps-4", title: "Train your people and your admin", text: "Live instructor-led courses and Agentforce workshops at 25% off, plus free Trailhead. Your new admin gets certified on the platform Chapin actually runs.", ease: "Skills that stay in-house", ui: { type: "plan", active: 3 } },
      { time: "Month 3", who: "Premier", slide: "ps-3", title: "Health check and Customer Success Score", text: "An expert reviews how Chapin uses Salesforce, scores adoption, expertise and technical health, and recommends what to improve.", ease: "Know where you stand", ui: { type: "plan", active: 4 } },
      { time: "Month 6", who: "Premier", shot: "premier-go", slide: "ad-1", title: "Turn on what you already own", text: "A Success Review updates your Success Path, and Salesforce Go shows the features and license value Chapin isn't using yet, so phase two starts with what you already have.", ease: "More value, no new purchase", ui: { type: "plan", active: 5 } }
    ],
    quotes: [["\"The adoption rate usually, when it's not part of a collective, ends up being pretty slim to none.\"", "Executive sponsor, Chapin"], ["\"We don't know what we don't know yet.\"", "Leadership, Chapin"]],
    outcomes: ["Adoption that keeps growing", "Experts on call 24/7", "An admin who's set up to succeed", "A clear path to phase two"],
    scope: { now: ["Premier Success Plan", "Onboarding & Success Path", "Unlimited Expert Coaching", "24/7 expedited support"], later: ["Signature Success Plan", "Acquis Evolve support hours", "Admin hiring support"] }
  }

];

const PLAN_NAV = ["Onboarding", "Expert Coaching", "Support & Help Agent", "Training", "Health check & Score", "Success Review"];

/* 13-week plan, drawn as a Gantt chart. start/end are week numbers. */
const GANTT = {
  weeks: 15,
  rows: [
    { label: "Discover & design", who: "Acquis + Chapin champions", start: 1, end: 3, cls: "g1" },
    { label: "Build: 6 weekly sprints", who: "Acquis, demo every week", start: 4, end: 9, cls: "g2", ticks: 6 },
    { label: "Test & UAT", who: "Acquis, then Chapin users", start: 10, end: 11, cls: "g3" },
    { label: "Train", who: "Role-based, virtual", start: 12, end: 12, cls: "g4" },
    { label: "Go-live", who: "Weekend cutover", start: 13, end: 13, cls: "g5", milestone: true },
    { label: "Hypercare", who: "Acquis + Premier", start: 14, end: 15, cls: "g6" },
    { label: "Premier Success", who: "From signature, ongoing", start: 1, end: 15, cls: "g7", arrow: true }
  ],
  note: "Start one to two weeks after signature. A mid-to-late November start points to a February go-live, ahead of your busy season. Holidays may add a week."
};

const NEXT = [
  ["Confirm scope", "Walk through the statement of work and settle the open items: contacts import, ERP API access and account scope."],
  ["Align leadership", "Review the journey with your executive team and agree on the path forward."],
  ["Kick off", "Name your project lead, business leads and champions. Discovery starts one to two weeks after signature."],
  ["Stay close", "Weekly status meetings, plus an executive check-in every three to four weeks."]
];

/* What we heard (readback deck, onsite business process review, Sept 21 2026) */
const WHYNOW = {
  kicker: "What we heard in Batavia",
  title: "The manual load peaks exactly when the season does",
  stats: [["80–120", "emailed POs keyed by hand per day in peak season (30–50 off-season)"], ["~5 min", "to enter one 40-line purchase order"], ["15–20 min", "the ERP tables lock every time EDI posts"], ["3 days", "to push a price increase, and it still doesn't reach every account"]],
  context: ["1,000+ active accounts", "8 channels", "6 big-box price books under contract", "11 rep agencies", "~80 trade shows a year", "No CRM"],
  line: "Every hour spent re-keying orders in February is an hour not spent with customers.",
  slide: "rb-5"
};

/* Recommendation (readback deck) */
const PHASES = {
  p1: { title: "Phase 1: one connected CRM, integrated with SyteLine", items: [
    ["Manufacturing Cloud: Sales + Service", "Sales agreements and account-based forecasts. Warranty, product and parts service.", "rb-7"],
    ["Marketing Cloud", "Trade-show leads, segmented launches, distributor campaigns and ROI.", "rb-9"],
    ["MuleSoft", "Two-way SyteLine sync, emailed-PO automation and reusable APIs.", "rb-10"]],
    connected: ["Infor SyteLine", "EDI", "Informatica PIM/DAM", "Power BI", "RingCentral"] },
  p2: { title: "Phase 2, on the same data", slide: "rb-11", items: [
    ["Revenue Cloud", "Rebates, co-op, volume discounts and big-box chargebacks"],
    ["Agentforce web agent", "24/7 product, parts and warranty answers on your website"],
    ["Partner portal", "Pricing, content and pipeline for the 11 rep agencies"],
    ["Sales Performance Management", "Territories, geo-targeting, quotas and SPIFFs"]] }
};

/* How we got here */
const PATH = [
  ["Sep 2", "Intro discovery", true], ["Sep 8", "Integrations discovery", true], ["Sep 21", "Onsite business process review", true],
  ["Oct 1", "Readback + recommendation", true], ["Oct 5", "RingCentral discovery", true], ["Oct 9", "Solution demo", true],
  ["Oct 13", "Demo feedback + partner scoping", true], ["Oct 19", "Pricing + SOW review", true], ["Oct 28", "Working-team sync", true],
  ["Next", "Decision", false], ["Then", "Kickoff with Acquis", false], ["Target", "Live before February", false]
];

/* Vision: today vs. with Salesforce, by layer. Box types: pain (today), plain, core (Salesforce product), dark (data layer), slack. */
const VISION = {
  today: { title: "Today", tag: "Many disconnected tools", rows: [
    ["Orders", [["Emailed POs", "80–120 a day keyed by hand in season", "pain"], ["EDI", "Locks ERP tables 15–20 min per post", "pain"]]],
    ["ERP", [["Infor SyteLine", "Golden record; data flows out, little comes back", ""]]],
    ["Customers", [["No CRM", "Contacts and history live with individuals", "pain"], ["Spreadsheets", "Pricing, forecasts and price increases", "pain"]]],
    ["Partners", [["Home-built rep portal", "8 of 11 agencies log in", "pain"]]],
    ["Marketing", [["Mailchimp", "Registrations exported by hand", "pain"], ["Website forms", "Gravity Forms on WordPress", ""], ["Trade-show leads", "On paper or in someone's head", "pain"]]],
    ["Service", [["Outlook + RingCentral", "No case history or SLAs; live chat removed", "pain"]]],
    ["Insight", [["Power BI", "The only shared view, built from ERP data", ""]]]
  ], notes: ["Forecasts are rebuilt by hand every week", "A price increase takes 3 days and still misses accounts", "No one sees the whole customer: sales, service and marketing each hold a piece"] },
  future: { title: "With Salesforce", tag: "One customer record, many teams", rows: [
    ["Orders", [["MuleSoft document processing", "Reads emailed POs and creates orders", "core"], ["EDI", "Unchanged, orders visible in Salesforce", ""]]],
    ["ERP", [["Infor SyteLine", "Stays the system of record; two-way sync via MuleSoft", ""]]],
    ["Unify", [["Customer 360 on the Salesforce Platform", "Accounts, ship-tos, contacts, agreements and orders on one record, with Data 360 underneath", "dark"]]],
    ["Sell & serve", [["Manufacturing Cloud: Sales + Service", "Sales agreements, account forecasts, cases, registered products and warranty", "core"]]],
    ["Marketing", [["Marketing Cloud", "Segments, journeys and campaign ROI on the same customer data; web forms feed in directly", "core"]]],
    ["Phone & email", [["RingCentral + Outlook", "Screen pop and two-way email and calendar sync", ""]]],
    ["Where people work", [["Agentforce", "AI answers, summaries and drafts in every app", "core"], ["Slack (proposed)", "Account channels, alerts and approvals", "slack"]]],
    ["Grow next", [["Phase 2 on the same data", "Revenue Cloud rebates, partner portal for 11 agencies, web agent", ""]]],
    ["Insight", [["Dashboards + Power BI", "Everyday answers in Salesforce; Power BI stays for deep analysis", ""]]]
  ], notes: ["One trusted customer record for every team", "SyteLine stays the golden record, always in sync", "Fewer hand-offs: orders, prices and leads move on their own", "Each new system or business connects once, on the same platform"] }
};

/* Executive summary page. Links: section id ("why") or chapter ("chapter:premier"). */
const SUMMARY = {
  blocks: [
    { n: 1, title: "Where Chapin is today", points: [
      "1,000+ accounts across eight channels, with no CRM or shared contact database",
      "Pricing, forecasts and price increases run on spreadsheets; emailed POs are keyed by hand",
      "Service works from Outlook and RingCentral, with registrations exported by hand",
      "Marketing reaches channels through reps, without campaigns or ROI tracking"],
      links: [["The vision", "vision"]] },
    { n: 2, title: "What changes with Salesforce", points: [
      "One 360° customer record for sales, service and marketing, synced both ways with SyteLine",
      "Sales agreements and account forecasts that roll up on their own",
      "Emailed POs read automatically, so prices and orders move without re-keying",
      "Campaigns, trade-show leads and price changes reach every account the same day"],
      links: [["The journey", "chapter:marketing"], ["The vision", "vision"]] },
    { n: 3, title: "Why it works for Chapin", points: [
      "Built for manufacturers: agreements, forecasting and warranty out of the box",
      "Easy to use: role-based home pages, natural language prompts, and all systems connected in one place",
      "Premier Success: onboarding, unlimited Expert Coaching and 24/7 support",
      "More than 20,000 manufacturers already run on Salesforce"],
      links: [["Why Salesforce", "why"], ["Simple by design", "simple"], ["Premier Success", "chapter:premier"]] },
    { n: 4, title: "The plan", points: [
      "Phase 1: Manufacturing Cloud Sales + Service, Marketing Cloud and MuleSoft",
      "About 13 weeks with Acquis, targeting go-live before the February season",
      "Phase 2 on the same data: rebates, partner portal, web agent",
      "Scope and timing confirmed together in the statement of work"],
      links: [["The plan", "plan"], ["FAQs & library", "deeper"]] }
  ]
};
