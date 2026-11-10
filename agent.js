/* Ask assistant: answers from the curated knowledge base (KB) and surfaces overview slides.
   No external calls. See README for wiring to a live model. */

const STOP = new Set("a an the and or of to in on for with is are was be do does did how what why when where who which can could would should will we our us you your it its this that these those about me my i at as by from into tell give show please there their they them".split(" "));
const stem = w => w.replace(/(ing|ed|es|s)$/, "");

function tokens(q) {
  return q.toLowerCase().replace(/[^a-z0-9+\-\s]/g, " ").split(/\s+/).filter(w => w && !STOP.has(w));
}

function search(q) {
  const lq = " " + q.toLowerCase() + " ";
  const toks = tokens(q).map(stem);
  const scored = KB.map(e => {
    let score = 0;
    for (const k of e.kw) {
      const lk = k.toLowerCase();
      if (lk.includes(" ")) { if (lq.includes(lk)) score += 4; continue; }
      if (lk.length <= 3) { if (new RegExp("\\b" + lk + "\\b").test(lq)) score += 3; continue; }
      if (toks.includes(stem(lk))) score += 3;
      else if (lq.includes(lk)) score += 1.5;
    }
    if (q.toLowerCase().includes(e.title.toLowerCase())) score += 3;
    return { e, score };
  }).filter(x => x.score > 0).sort((a, b) => b.score - a.score);
  return scored;
}

/* salesforce.com FAQ matching */
const FAQ_STOP = new Set(["salesforce", "chapin", "my", "our", "business", "manufacturing"]);
function searchFaq(q) {
  const lq = " " + q.toLowerCase() + " ";
  const toks = tokens(q).filter(w => !FAQ_STOP.has(w)).map(stem);
  return FAQS.map((f, idx) => {
    let score = 0;
    const qt = new Set(tokens(f.q).filter(w => !FAQ_STOP.has(w)).map(stem));
    toks.forEach(t => { if (qt.has(t)) score += 2; });
    for (const k of f.kw || []) {
      const lk = k.toLowerCase();
      if (lk.includes(" ") || lk.includes("-")) { if (lq.includes(lk)) score += 3; }
      else if (toks.includes(stem(lk))) score += 2;
    }
    if (tokens(f.group).some(g => toks.includes(stem(g)))) score += 1;
    return { f, idx, score };
  }).filter(x => x.score >= 3).sort((a, b) => b.score - a.score);
}
function srcLink(key, text) {
  const s = SRC[key]; if (!s) return "";
  return `<a class="srclink" href="${s.url}" target="_blank" rel="noopener">${text || "Read more on salesforce.com"}: ${s.label} &#8599;</a>`;
}

const msgs = $("#msgs"), drawer = $("#drawer"), scrim = $("#scrim");
let busy = false, greeted = false;

function openDrawer() {
  drawer.hidden = false; scrim.hidden = false;
  requestAnimationFrame(() => { drawer.classList.add("open"); scrim.classList.add("open"); });
  if (!greeted) { greeted = true; greet(); }
  setTimeout(() => $("#d-q").focus(), 250);
}
function closeDrawer() {
  drawer.classList.remove("open"); scrim.classList.remove("open");
  setTimeout(() => { drawer.hidden = true; scrim.hidden = true; }, 250);
}
function scrollEnd() { msgs.scrollTo({ top: msgs.scrollHeight, behavior: "smooth" }); }

function addUser(text) {
  const d = document.createElement("div"); d.className = "m user"; d.textContent = text; msgs.appendChild(d); scrollEnd();
}
function addBot() {
  const d = document.createElement("div"); d.className = "m bot";
  d.innerHTML = '<div class="avatar"><span class="spark"></span></div><div class="mb"></div>';
  msgs.appendChild(d); scrollEnd(); return $(".mb", d);
}
const sleep = ms => new Promise(r => setTimeout(r, ms));

function greet() {
  const mb = addBot();
  mb.innerHTML = `<p>Hi, I’m your Chapin journey guide. Ask me about sales, service, marketing, integration or results, and I’ll answer from your program materials and pull up the matching overview slides.</p>`;
  setSuggest(SUGGESTED);
}
function setSuggest(list) {
  $("#d-suggest").innerHTML = list.map(s => `<button type="button" class="sug" data-q="${s.replace(/"/g, "&quot;")}">${s}</button>`).join("");
}

async function typeInto(el, text) {
  const paras = text.split("\n\n");
  for (const ptxt of paras) {
    const p = document.createElement("p"); el.appendChild(p);
    const words = ptxt.split(" ");
    for (let i = 0; i < words.length; i++) {
      p.textContent += (i ? " " : "") + words[i];
      if (i % 3 === 0) { scrollEnd(); await sleep(18); }
    }
  }
}

async function ask(q, opts = {}) {
  q = q.trim(); if (!q || busy) return;
  busy = true; openDrawer(); addUser(q); setSuggest([]);
  const mb = addBot();
  const results = opts.kb ? [{ e: KB.find(x => x.id === opts.kb), score: 99 }] : search(q);
  const faqs = opts.kb ? [] : searchFaq(q);
  const top = results[0], second = results[1], ftop = faqs[0];
  const faqFirst = ftop && (!top || ftop.score >= top.score + 2);
  const steps = ["Understanding your question", "Searching Chapin program notes", "Checking salesforce.com FAQs and Help articles"];
  if (!faqFirst && top && top.e.slides.length) steps.push("Pulling slides from the Manufacturing + Marketing Cloud overview");
  const trace = document.createElement("ul"); trace.className = "trace"; mb.appendChild(trace);
  for (const s of steps) {
    const li = document.createElement("li"); li.innerHTML = `<i class="dot"></i>${s}`; trace.appendChild(li); scrollEnd();
    await sleep(340); li.classList.add("done");
  }
  await sleep(120); trace.classList.add("collapsed");

  if (!top && !ftop) {
    await typeInto(mb, "I don\u2019t have that in the program materials or the salesforce.com FAQs yet. I can help with forecasting, sales agreements, pricing, service and RingCentral, marketing and trade shows, Slack, MuleSoft and ERP integration, Premier Success and Acquis, timeline and results. Try one of these:");
    setSuggest(SUGGESTED); busy = false; return;
  }

  const actions = document.createElement("div"); actions.className = "actions";

  if (faqFirst) {
    const f = ftop.f;
    const head = document.createElement("div"); head.className = "ans-title"; head.textContent = f.q; mb.appendChild(head);
    const tag = document.createElement("div"); tag.className = "from-sf"; tag.textContent = "From salesforce.com \u00b7 " + f.group; mb.appendChild(tag);
    await typeInto(mb, f.a);
    mb.insertAdjacentHTML("beforeend", srcLink(f.src));
    if (top) actions.innerHTML += `<button type="button" class="act" data-kb="${top.e.id}">What this means for Chapin: ${top.e.title}</button>`;
    const more = faqs.slice(1, 3).map(x => x.f.q);
    setSuggest(more.length ? more : SUGGESTED);
  } else {
    const e = top.e;
    const head = document.createElement("div"); head.className = "ans-title"; head.textContent = e.title; mb.appendChild(head);
    await typeInto(mb, e.answer);
    const rel = [...new Set([...(KB_LINKS[e.id] || []), ...(e.src ? [e.src] : [])])].filter(k => SRC[k]).slice(0, 3);
    if (rel.length) mb.insertAdjacentHTML("beforeend", `<div class="rel"><div class="rel-h">Related on salesforce.com</div>${rel.map(k => `<a class="rel-a${SRC[k].demo ? " demo" : ""}" href="${SRC[k].url}" target="_blank" rel="noopener">${SRC[k].label} &#8599;</a>`).join("")}</div>`);
    if (ftop) {
      const f = ftop.f;
      mb.insertAdjacentHTML("beforeend", `<div class="qa"><div class="qa-h">Quick answer from salesforce.com</div><b>${f.q}</b><p>${f.a}</p>${srcLink(f.src, "Source")}</div>`);
    }
    if (e.slides.length) {
      const lab = document.createElement("div"); lab.className = "row-label"; lab.textContent = "From the overview slides";
      const wrap = document.createElement("div"); wrap.className = "slides-row";
      wrap.innerHTML = e.slides.map(id => slideCard(slideById(id), true)).join("");
      mb.appendChild(lab); mb.appendChild(wrap);
    }
    const t = TABS.find(x => x.id === e.tab);
    if (t) actions.innerHTML += `<button type="button" class="act" data-tab="${t.id}">Open the ${t.verb} chapter &rarr;</button>`;
    if (second && second.score >= top.score * 0.6) actions.innerHTML += `<button type="button" class="act ghost" data-kb="${second.e.id}">Related: ${second.e.title}</button>`;
    setSuggest(e.follow || SUGGESTED);
  }
  mb.appendChild(actions); scrollEnd();
  busy = false;
}

/* Wiring */
$("#open-ask").addEventListener("click", openDrawer);
$("#close-ask").addEventListener("click", closeDrawer);
scrim.addEventListener("click", closeDrawer);
$("#d-form").addEventListener("submit", e => { e.preventDefault(); const i = $("#d-q"); const v = i.value; i.value = ""; ask(v); });
$("#hero-ask").addEventListener("submit", e => { e.preventDefault(); const i = $("#hero-q"); const v = i.value; i.value = ""; if (v.trim()) ask(v); else openDrawer(); });
document.addEventListener("click", e => {
  const k = e.target.closest("[data-kb]"); if (k) { const en = KB.find(x => x.id === k.dataset.kb); ask(en ? en.title : k.textContent, { kb: k.dataset.kb }); return; }
  const s = e.target.closest("[data-q]"); if (s) { ask(s.dataset.q); return; }
  const a = e.target.closest("[data-tab]"); if (a) { closeDrawer(); openTab(a.dataset.tab); }
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && !drawer.hidden) closeDrawer();
  if (e.key === "/" && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); $("#hero-q").focus(); }
});
