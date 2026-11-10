/* Illustrative mock screens, drawn in HTML/CSS. mockScreen(ui) returns markup for one step. */

const APP_LABEL = { Sales: "Sales Console", Service: "Service Console", Marketing: "Marketing", Inbox: "Order center inbox", "Order center": "Order center assistant", "Document processing": "MuleSoft document processing", Knowledge: "Knowledge" };

function frame(type, app, body, cls = "") {
  return `<div class="mock m-${type} ${cls}" aria-hidden="true">
    <div class="mbar"><span class="dots"><i></i><i></i><i></i></span><span class="mapp">${APP_LABEL[app] || app || ""}</span><span class="msearch"></span></div>
    <div class="mbody">${body}</div></div>`;
}

const MOCK = {
  chat: u => frame("chat", u.app, `<div class="mchat">${u.msgs.map(m => m[0] === "u"
      ? `<div class="mb-u">${m[1]}</div>`
      : `<div class="mb-a"><span class="mav"><span class="spark"></span></span><div>${m[1]}</div></div>`).join("")}</div>
      <div class="minput">Ask anything...<span class="spark"></span></div>`),

  email: u => frame("email", u.app, `<div class="memail">
      <div class="mhdr"><b>Chapin</b><span>${u.subject}</span></div>
      ${u.lines.map(l => `<p>${l}</p>`).join("")}
      ${u.table ? `<table class="mtable">${u.table.map((r, i) => `<tr>${r.map(c => i ? `<td>${c}</td>` : `<th>${c}</th>`).join("")}</tr>`).join("")}</table>` : ""}
      <div class="mok"><span class="chk"></span>${u.cta}</div></div>`),

  record: u => frame("record", u.app, `<div class="mrec">
      <div class="mrh"><span class="mobj">${u.obj}</span><b>${u.name}</b><small>${u.sub || ""}</small></div>
      <div class="mfields">${u.fields.map(f => `<div><span>${f[0]}</span><b>${f[1]}</b></div>`).join("")}</div>
      ${u.related ? `<div class="mrel"><div class="mrelh">${u.related.h}</div>${u.related.rows.map(r => `<div class="mrow">${r.map((c, i) => `<span class="c${i}">${c}</span>`).join("")}</div>`).join("")}</div>` : ""}</div>`),

  flow: u => frame("flow", u.app, `<div class="mflow">
      <div class="fn start">${u.start}</div><div class="fl"></div>
      <div class="fn wait">${u.wait}</div><div class="fl"></div>
      <div class="fbr">${u.branches.map((b, i) => `<div class="fb b${i}"><span>${b[0]}</span><div class="fn">${b[1]}</div></div>`).join("")}</div></div>`),

  chart: u => frame("chart", u.app, `<div class="mchart"><div class="mch">${u.h}</div>
      <div class="bars">${u.bars.map(b => `<div class="bg"><div class="bb"><i class="b1" style="height:${b[1]}%"></i><i class="b2" style="height:${b[2]}%"></i></div><span>${b[0]}</span></div>`).join("")}</div>
      <div class="leg"><span><i class="b1"></i>${u.legend[0]}</span><span><i class="b2"></i>${u.legend[1]}</span></div></div>`),

  home: u => frame("home", u.app, `<div class="mhome">
      <div class="tiles">${u.tiles.map(t => `<div class="tile"><span>${t[0]}</span><b>${t[1]}</b><small>${t[2]}</small></div>`).join("")}</div>
      <div class="mlist">${u.list.map((l, i) => `<div class="li${i === 0 ? " hot" : ""}"><span class="cb"></span>${l}</div>`).join("")}</div></div>`),

  doc: u => frame("doc", u.app, `<div class="mdoc"><div class="pdf"><span>PDF</span>${u.file}</div>
      ${u.fields.map(f => { const c = f[2], cls = c === 0 ? "bad" : c < 80 ? "mid" : "ok";
        return `<div class="dx ${cls}"><span>${f[0]}</span><b>${f[1]}</b><em>${c === 0 ? "Needs review" : c + "%"}</em></div>`; }).join("")}</div>`),

  integration: u => frame("integration", "Integration", `<div class="mint">
      ${u.nodes.map((n, i) => `<div class="inode n${i}">${n}</div>${i < u.nodes.length - 1 ? '<div class="ia"><i></i></div>' : ""}`).join("")}
      <div class="mok wide"><span class="chk"></span>${u.status}</div></div>`),

  console: u => frame("console", u.app, `<div class="mcon">
      <div class="pres"><span class="pd"></span>${u.status}</div>
      ${u.caller ? `<div class="pop"><div class="ph">Incoming call · RingCentral</div><b>${u.caller}</b><div class="pbtn">Accept</div></div>` : ""}
      <div class="mfields one">${u.rows.map(f => `<div><span>${f[0]}</span><b>${f[1]}</b></div>`).join("")}</div></div>`),

  slack: u => `<div class="mock m-slack" aria-hidden="true">
      <div class="mbar slackbar"><span class="dots"><i></i><i></i><i></i></span><span class="mapp">Slack · ${u.channel}</span></div>
      <div class="mbody"><div class="sk">${u.msgs.map(m => `<div class="skm"><span class="ska ${m[0] === "Salesforce" || m[0] === "Slackbot" ? "bot" : ""}">${m[0][0]}</span><div><b>${m[0]}</b><p>${m[1]}</p>${m[2] ? `<div class="skb">${m[2].split("|").map(x => `<span>${x}</span>`).join("")}</div>` : ""}</div></div>`).join("")}</div></div></div>`,

  plan: u => {
    const P = [
      ["Onboarding", "Align your goals with the platform", ["Kickoff with a Salesforce expert", "Goals: one customer view, faster orders, February season", "Success Path created"], "Book onboarding"],
      ["Expert Coaching", "Unlimited 1-to-1 sessions", ["Sales agreement design review", "Omni-Channel routing for three queues", "Data migration readiness"], "Book a session"],
      ["Support", "24/7, 1-hour response for business-stopping issues", ["Help Agent: instant answers", "Chat, phone or case", "Developer Support: up to 200 lines"], "Get help now"],
      ["Training", "Instructor-led courses and workshops", ["Admin certification path", "Agentforce workshop", "25% off courses and certifications"], "Browse courses"],
      ["Customer Success Score", "Adoption, expertise and technical health", ["Adoption: 82 / 100", "Expertise: 74 / 100", "Technical health: 91 / 100"], "Review with an expert"],
      ["Success Review", "Update your Success Path", ["Wins since go-live", "Unused features to activate", "Phase two priorities"], "Schedule review"]
    ][u.active];
    return frame("plan", "Salesforce Help \u00b7 My Success Plan", `<div class="mplan">
      <div class="pnav">${PLAN_NAV.map((n, i) => `<span class="${i === u.active ? "on" : ""}">${n}</span>`).join("")}</div>
      <div class="pmain"><span class="ptier">Premier</span><b>${P[0]}</b><small>${P[1]}</small>
        <ul>${P[2].map(x => `<li><span class="chk"></span>${x}</li>`).join("")}</ul><div class="pbtn2">${P[3]}</div></div></div>`);
  }
};

function mockScreen(ui) { return (MOCK[ui.type] || (() => ""))(ui); }

/* Small illustrations for the Simple by design cards */
const MINI = {
  roles: `<div class="mini-roles"><span>Rep</span><span>Service</span><span>Marketing</span></div>`,
  ask: `<div class="mini-ask"><div class="q">Where is Ray's order?</div><div class="a"><span class="spark"></span>Shipped Tuesday. Tracking sent.</div></div>`,
  works: `<div class="mini-works"><span>Outlook</span><span>RingCentral</span><span>Mobile</span><span>Your ERP</span></div>`,
  ready: `<div class="mini-ready"><span><i class="chk"></i>Sales agreements</span><span><i class="chk"></i>Account forecasting</span><span><i class="chk"></i>Service console</span></div>`,
  help: `<div class="mini-help"><span class="h1">Champions</span><span class="h2">Training</span><span class="h3">Hypercare</span><span class="h4">Coaching</span></div>`,
  grow: `<div class="mini-grow"><i style="height:30%"></i><i style="height:50%"></i><i style="height:72%"></i><i style="height:100%"></i></div>`
};
