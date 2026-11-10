/* Page rendering */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const ICON = {
  marketing: '<path d="M3 11l18-8-8 18-2-8z"/>',
  sales: '<path d="M4 20V10M10 20V4M16 20v-7M2 20h20"/>',
  mulesoft: '<path d="M3 12h5M16 12h5M8 8h8v8H8z"/>',
  service: '<path d="M4 5h16v11H9l-5 4z"/>',
  slack: '<path d="M4 9h16M4 15h16M10 3L8 21M16 3l-2 18"/>',
  premier: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  factory: '<path d="M3 21V10l6 4V10l6 4V6h6v15zM7 21v-3M12 21v-3M17 21v-3"/>',
  layers: '<path d="M12 3l9 5-9 5-9-5zM3 13l9 5 9-5"/>',
  spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
  plug: '<path d="M9 3v5M15 3v5M6 8h12v4a6 6 0 0 1-12 0zM12 18v3"/>',
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  people: '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.5 3-6 6-6s6 2.5 6 6M17 11a3 3 0 1 0 0-6M21 20c0-2.5-1.5-4.5-4-5"/>'
};
const svg = (name, cls = "") => `<svg class="ico ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[name] || ""}</svg>`;

/* Logo fallback */
$(".chapin-logo").addEventListener("error", e => {
  const w = document.createElement("span"); w.className = "chapin-wordmark"; w.textContent = "CHAPIN"; e.target.replaceWith(w);
}, { once: true });

$("#hero-suggest").innerHTML = SUGGESTED.slice(0, 4).map(s => `<button type="button" class="sug" data-q="${s}">${s}</button>`).join("");

/* ---------- Journey ---------- */
/* Hero chapter shortcuts + any link with data-chapter opens that chapter */
document.addEventListener("click", e => {
  const c = e.target.closest("[data-chapter]"); if (!c) return;
  e.preventDefault(); openTab(c.dataset.chapter);
});

$("#persona").textContent = PERSONA;
$("#hero-chapters").innerHTML = TABS.map((t, i) => `<span class="hchip" data-chapter="${t.id}">${i + 1}. ${t.verb}</span>`).join("");
const jmap = $("#jmap"), chapterEl = $("#chapter");
jmap.innerHTML = TABS.map((t, i) => `<li><button type="button" class="stop" role="tab" id="stop-${t.id}" data-id="${t.id}" aria-selected="false">
  <span class="sn">${svg(t.id)}<em>${i + 1}</em></span><b>${t.verb}</b><small>${t.label}${t.badge ? " · proposed" : ""}</small></button></li>`).join("");

let cur = { id: TABS[0].id, step: 0 };

function premierBlock(p) {
  const list = (title, arr, cls = "") => `<div class="mini ${cls}"><h5>${title}</h5><ul>${arr.map(i => `<li>${i}</li>`).join("")}</ul></div>`;
  return `<div class="premier">
    <h4 class="blk-h">What's in the Premier Success Plan</h4>
    <div class="pgroups">${p.groups.map(g => `<div class="pg"><h5>${g[0]}</h5>${g[1].map(f => `<div class="pf"><b>${f[0]}</b><span>${f[1]}</span></div>`).join("")}</div>`).join("")}</div>
    <div class="pquotes">${[p.quote, ...(p.quotes2 || [])].map(q => `<figure class="pquote"><blockquote>${q[0]}</blockquote><figcaption>${q[1]}</figcaption></figure>`).join("")}</div>
    ${p.slides ? `<div class="pslides">${p.slides.map(id => slideCard(libById(id), true)).join("")}</div>` : ""}
    <h4 class="blk-h">Three levels of Salesforce Success Plans</h4>
    <div class="tiers">${p.tiers.map(t => `<div class="tier${t[0] === "Premier" ? " on" : ""}">${t[0] === "Premier" ? '<span class="tier-flag">Chapin</span>' : ""}<h5>${t[0]}</h5><small>${t[1]}</small><ul>${t[2].map(x => `<li>${x}</li>`).join("")}</ul></div>`).join("")}</div>
    <a class="srclink" href="${p.src}" target="_blank" rel="noopener">Premier Success Plan on salesforce.com &#8599;</a>
    <details class="more"><summary>Your implementation partner: Acquis</summary>
      <p class="acq-note">${p.acquisNote}</p>
      <dl class="acq-dl">${p.acquis.items.map(i => `<dt>${i[0]}</dt><dd>${i[1]}</dd>`).join("")}</dl>
      <h5>What's in the Acquis statement of work</h5>
      <div class="sow">${p.sow.map(s => list(s[0], s[1])).join("")}</div>
      <div class="sow">${list("What Chapin provides", p.chapin, "chapin")}${list("Governance", p.governance, "gov")}${list("Not in phase one", p.notIncluded, "out")}</div>
    </details></div>`;
}

function renderChapter(id, opts = {}) {
  const idx = Math.max(0, TABS.findIndex(t => t.id === id)), t = TABS[idx];
  cur = { id: t.id, step: opts.step || 0 };
  $$(".stop", jmap).forEach((b, i) => {
    b.setAttribute("aria-selected", b.dataset.id === t.id);
    b.parentElement.classList.toggle("passed", i < idx);
  });
  jmap.style.setProperty("--prog", idx / (TABS.length - 1));
  const nextT = TABS[idx + 1];
  chapterEl.innerHTML = `
    <div class="ch-head">
      <span class="badge ${t.badge ? "proposed" : ""}">Chapter ${idx + 1} of ${TABS.length} · ${t.badge || t.kicker}</span>
      <h3>${t.title}</h3>
      <p>${t.intro}</p>
    </div>
    ${t.stats ? `<div class="ch-stats">${t.stats.map(x => `<div><b>${x[0]}</b><span>${x[1]}</span></div>`).join("")}${t.statsNote ? `<small>${t.statsNote}</small>` : ""}</div>` : ""}
    <div class="ba">
      <div class="ba-toggle" role="group" aria-label="Compare today and with Salesforce">
        <button type="button" class="bt" data-ba="today">Today</button>
        <button type="button" class="bt on" data-ba="future">With Salesforce</button>
      </div>
      <ul class="ba-list future">${t.after.map(x => `<li>${x}</li>`).join("")}</ul>
      <ul class="ba-list today" hidden>${t.before.map(x => `<li>${x}</li>`).join("")}</ul>
    </div>
    <div class="stepper">
      <ol class="steps">${t.steps.map((s, i) => `<li><button type="button" class="stp" data-i="${i}"><span class="st-t">${s.time}</span><span class="st-n">${s.title}</span><span class="st-w">${s.who}</span></button></li>`).join("")}</ol>
      <div class="stage">
        <div class="stage-screen" id="stage-screen"></div>
        <div class="stage-cap" id="stage-cap"></div>
        <div class="stage-nav">
          <button type="button" class="nav-b" id="st-prev">&larr; Back</button>
          <div class="pdots" id="pdots">${t.steps.map((_, i) => `<i data-i="${i}"></i>`).join("")}</div>
          <button type="button" class="nav-b pri" id="st-next">Next &rarr;</button>
        </div>
      </div>
    </div>
    ${t.premier ? premierBlock(t.premier) : ""}
    ${t.quotes.length ? `<div class="quotes">${t.quotes.map(q => `<blockquote>${q[0]}<cite>${q[1]}</cite></blockquote>`).join("")}</div>` : ""}
    <div class="ch-foot">
      <div class="outcomes">${t.outcomes.map(o => `<span class="outcome">${o}</span>`).join("")}</div>
      <details class="more"><summary>What's in phase one, and what's next</summary>
        <h5>Phase one</h5><div class="chips">${t.scope.now.map(c => `<span class="chip">${c}</span>`).join("")}</div>
        <h5>On the roadmap</h5><div class="chips">${t.scope.later.map(c => `<span class="chip later">${c}</span>`).join("")}</div>
      </details>
      <div class="ch-actions">
        <button class="ask-inline" type="button" data-q="Tell me more about ${t.kicker}"><span class="spark" aria-hidden="true"></span>Ask about ${t.label}</button>
        ${nextT ? `<button class="next-ch" type="button" data-next="${nextT.id}">Next chapter: ${nextT.verb} &rarr;</button>` : `<a class="next-ch" href="#simple">See why it stays simple &darr;</a>`}
      </div>
    </div>`;
  showStep(cur.step);
  if (opts.hash !== false && window.pagerSync) window.pagerSync(t.id);
}

function showStep(i) {
  const t = TABS.find(x => x.id === cur.id), n = t.steps.length;
  i = Math.max(0, Math.min(n - 1, i)); cur.step = i;
  const s = t.steps[i];
  const scr = $("#stage-screen");
  scr.classList.remove("in"); void scr.offsetWidth;
  const shot = s.shot || `${t.id}-step${i + 1}`;
  {
    scr.innerHTML = `<div class="shot-wrap"><img class="shot" src="assets/screens/${shot}.png" alt="${s.title}"><span class="real-tag">Product screen</span></div>`;
    $("img", scr).addEventListener("error", () => { scr.innerHTML = mockScreen(s.ui); }, { once: true });
  }
  scr.classList.add("in");
  $("#stage-cap").innerHTML = `<div class="cap-top"><span class="cap-time">${s.time}</span><span class="cap-who">${s.who}</span><span class="ease">${s.ease}</span></div>
    <h4>${s.title}</h4><p>${s.text}</p>${s.slide && libById(s.slide) ? `<button type="button" class="cap-slide" data-slide="${s.slide}">See it in the deck: ${libById(s.slide).title} &rarr;</button>` : ""}`;
  $$(".stp", chapterEl).forEach((b, k) => { b.classList.toggle("on", k === i); b.classList.toggle("done", k < i); b.setAttribute("aria-current", k === i ? "step" : "false"); });
  $$("#pdots i").forEach((d, k) => d.classList.toggle("on", k === i));
  $("#st-prev").disabled = i === 0;
  const next = $("#st-next"), idx = TABS.findIndex(x => x.id === cur.id);
  if (i === n - 1) { next.textContent = TABS[idx + 1] ? `Next chapter: ${TABS[idx + 1].verb} →` : "Done ✓"; next.dataset.end = "1"; }
  else { next.textContent = "Next →"; delete next.dataset.end; }
}

function goNextChapter() {
  const idx = TABS.findIndex(x => x.id === cur.id);
  if (window.pagerNext) return window.pagerNext();
  if (TABS[idx + 1]) renderChapter(TABS[idx + 1].id);
}

jmap.addEventListener("click", e => { const b = e.target.closest(".stop"); if (b) renderChapter(b.dataset.id); });
chapterEl.addEventListener("click", e => {
  const st = e.target.closest(".stp"); if (st) return showStep(+st.dataset.i);
  const d = e.target.closest("#pdots i"); if (d) return showStep(+d.dataset.i);
  if (e.target.closest("#st-prev")) return showStep(cur.step - 1);
  const nx = e.target.closest("#st-next"); if (nx) return nx.dataset.end ? goNextChapter() : showStep(cur.step + 1);
  if (e.target.closest("[data-next]")) return goNextChapter();
  const bt = e.target.closest(".bt");
  if (bt) {
    $$(".bt", chapterEl).forEach(x => x.classList.toggle("on", x === bt));
    $$(".ba-list", chapterEl).forEach(l => l.hidden = !l.classList.contains(bt.dataset.ba));
  }
});
chapterEl.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") { e.preventDefault(); showStep(cur.step + 1); }
  if (e.key === "ArrowLeft") { e.preventDefault(); showStep(cur.step - 1); }
});
function openTab(id) { if (window.pagerGoChapter) return window.pagerGoChapter(id); renderChapter(id); }
renderChapter(TABS[0].id, { hash: false });

/* ---------- Vision ---------- */
(function () {
  const col = (c, cls) => `<div class="vcol ${cls}"><div class="vhead"><h3>${c.title}</h3><span class="vtag">${c.tag}</span></div>
    ${c.rows.map(row => `<div class="vrow"><div class="vlabel">${row[0]}</div><div class="vboxes">${row[1].map(b => `<div class="vbox ${b[2]}"><b>${b[0]}</b><span>${b[1]}</span></div>`).join("")}</div></div>`).join("")}
    <ul class="vnotes">${c.notes.map(n => `<li>${n}</li>`).join("")}</ul></div>`;
  $("#vgrid").innerHTML = col(VISION.today, "today") + col(VISION.future, "future");
})();

/* ---------- Simple by design ---------- */
$("#simple-h").textContent = SIMPLE.headline;
$("#simple-sub").textContent = SIMPLE.sub;
$("#simple-quote").innerHTML = `<blockquote>${SIMPLE.quote[0]}</blockquote><figcaption>${SIMPLE.quote[1]}</figcaption>`;
$("#simple-cards").innerHTML = SIMPLE.cards.map(c => `<article class="scard2"><div class="svis">${MINI[c.visual] || ""}</div><h3>${svg(c.icon, "si")}${c.title}</h3><p>${c.text}</p></article>`).join("");
$("#simple-tasks").innerHTML = SIMPLE.tasks.map((t, i) => `<div class="task"><span class="tn">${i + 1}</span><b>${t[0]}</b><span>${t[1]}</span></div>`).join("");

/* ---------- Why + proof ---------- */
$("#why-eyebrow").textContent = WHY.eyebrow;
$("#why-headline").textContent = WHY.headline;
$("#why-text").innerHTML = WHY.paras.map(p => `<p>${p}</p>`).join("");
$("#why-pull").textContent = WHY.closer;
$("#mfg-square").innerHTML = `<b data-count="${MFG_COUNT.value}" data-suffix="${MFG_COUNT.suffix}">${MFG_COUNT.value.toLocaleString()}${MFG_COUNT.suffix}</b><span>${MFG_COUNT.label}</span><small>${MFG_COUNT.sub}</small><em>${MFG_COUNT.src}</em>`;
$("#pillars").innerHTML = PILLARS.map(p => `<article class="pillar">${svg(p.icon, "pi")}<h3>${p.title}</h3><p>${p.text}</p></article>`).join("");
const pcard = i => `<div class="pcard ${i.tag.toLowerCase()}${i.featured ? "" : " extra"}"${i.featured ? "" : " hidden"}>
  <div class="pval"><span data-count="${i.value}" data-suffix="${i.suffix}">${i.value.toLocaleString()}${i.suffix}</span></div>
  <p class="plabel">${i.label}</p><p class="pwho">${i.who}</p></div>`;
$("#proof-cards").innerHTML = PROOF.map(pcard).join("");
$("#proof-note").textContent = PROOF_NOTE;
$("#proof-more").addEventListener("click", e => {
  const ex = $$(".pcard.extra"), show = ex[0].hidden;
  ex.forEach(x => { x.hidden = !show; if (show) $$("[data-count]", x).forEach(countUp); });
  e.target.textContent = show ? "Show fewer" : "See all results";
});

/* ---------- Plan: phases + path ---------- */
$("#phases").innerHTML = `<div class="ph1"><span class="ph-tag">Phase 1 \u00b7 Recommended</span><h4>${PHASES.p1.title}</h4>
  <div class="ph-items">${PHASES.p1.items.map(i => `<button type="button" class="ph-item" data-slide="${i[2]}"><b>${i[0]}</b><span>${i[1]}</span><em>Details &rarr;</em></button>`).join("")}</div>
  <div class="ph-conn"><small>Connected to</small>${PHASES.p1.connected.map(c => `<span>${c}</span>`).join("")}</div></div>
  <div class="ph2"><span class="ph-tag two">Phase 2 \u00b7 Roadmap</span><h4>${PHASES.p2.title}</h4>
  <ul>${PHASES.p2.items.map(i => `<li><b>${i[0]}</b><span>${i[1]}</span></li>`).join("")}</ul>
  <button type="button" class="link-btn" data-slide="${PHASES.p2.slide}">See the Phase 2 slide &rarr;</button></div>`;
$("#path").innerHTML = PATH.map(p => `<li class="${p[2] ? "done" : "todo"}"><i></i><b>${p[0]}</b><span>${p[1]}</span></li>`).join("");

/* ---------- Plan (Gantt) ---------- */
(function () {
  const W = GANTT.weeks;
  const head = `<div class="gr gh"><div class="gl"></div><div class="gtrack" style="--w:${W}">${Array.from({ length: W }, (_, i) => `<span>${i + 1}</span>`).join("")}</div></div>`;
  const rows = GANTT.rows.map(r => `<div class="gr"><div class="gl"><b>${r.label}</b><span>${r.who}</span></div>
    <div class="gtrack" style="--w:${W}"><div class="gbar ${r.cls}${r.milestone ? " ms" : ""}${r.arrow ? " arrow" : ""}" style="grid-column:${r.start} / ${r.end + 1}">${r.ticks ? Array.from({ length: r.ticks }, (_, i) => `<i>S${i + 1}</i>`).join("") : ""}</div></div></div>`).join("");
  $("#gantt").innerHTML = `<div class="gwk">Week</div>${head}${rows}`;
  $("#gantt-note").textContent = GANTT.note;
})();
$("#next-list").innerHTML = NEXT.map((n, i) => `<li><span class="nn">${i + 1}</span><div><b>${n[0]}</b><p>${n[1]}</p></div></li>`).join("");

/* ---------- Go deeper: slides + FAQ ---------- */
function slideCard(s, compact) {
  if (!s) return "";
  return `<button type="button" class="lcard${compact ? " compact" : ""}" data-slide="${s.id}">
    <span class="lthumb"><img src="${libImg(s, true)}" alt="" loading="lazy"></span>
    <span class="lbody"><em>${(LIB_CATS.find(c => c[0] === s.cat) || [, ""])[1]}</em><b>${s.title}</b></span></button>`;
}
let libFilter = null, libList = [];
function renderLib() {
  const q = ($("#lib-search").value || "").toLowerCase().trim();
  if (!libFilter && !q) {
    libList = [];
    $("#slide-grid").innerHTML = `<p class="lib-prompt">Choose a topic above to see its slides, or search the whole library.</p>`;
    return;
  }
  libList = LIB.filter(s => (!libFilter || s.cat === libFilter) &&
    (!q || [s.title, s.sub || "", ...(s.points || []), ...(s.stats || []).flat(), ...(s.status || []).flat()].join(" ").toLowerCase().includes(q)));
  $("#slide-grid").innerHTML = libList.length ? libList.map(s => slideCard(s)).join("") : `<p class="faq-none">No slides match. Try Ask for a Chapin-specific answer.</p>`;
}
$("#slide-filters").innerHTML = LIB_CATS.map(c => `<button class="fbtn" data-f="${c[0]}">${c[1]} <small>${LIB.filter(s => s.cat === c[0]).length}</small></button>`).join("");
$("#slide-filters").addEventListener("click", e => {
  const b = e.target.closest(".fbtn"); if (!b) return;
  $("#lib-search").value = "";
  libFilter = b.dataset.f;
  $$(".fbtn").forEach(x => x.classList.toggle("on", x === b)); renderLib();
});
$("#lib-search").addEventListener("input", () => {
  if ($("#lib-search").value.trim()) { libFilter = null; $$(".fbtn").forEach(x => x.classList.remove("on")); }
  renderLib();
});
renderLib();

/* Slide viewer */
const sv = $("#sviewer"), svScrim = $("#sv-scrim");
let svList = [], svIdx = 0, svReturn = null;
function openSlide(id) {
  const inLib = libList.some(s => s.id === id);
  svList = inLib ? libList : [libById(id)]; svIdx = Math.max(0, svList.findIndex(s => s.id === id));
  svReturn = document.activeElement; sv.hidden = false; svScrim.hidden = false; document.body.classList.add("noscroll");
  showSlide(); $("#sv-close").focus();
}
function showSlide() {
  const s = svList[svIdx]; if (!s) return;
  $("#sv-img").src = libImg(s); $("#sv-img").alt = s.title;
  const cat = (LIB_CATS.find(c => c[0] === s.cat) || [, ""])[1];
  $("#sv-body").innerHTML = `<span class="sv-cat">${cat}</span><h3>${s.title}</h3>${s.sub ? `<p class="sv-sub">${s.sub}</p>` : ""}
    ${s.stats ? `<div class="sv-stats">${s.stats.map(x => `<div><b>${x[0]}</b><span>${x[1]}</span></div>`).join("")}</div>` : ""}
    ${s.points && s.points.length ? `<ul class="sv-pts">${s.points.map(p => `<li>${p}</li>`).join("")}</ul>` : ""}
    ${s.status ? `<div class="sv-status">${s.status.map(x => `<span><b>${x[0]}</b><em class="${/GA/.test(x[1]) ? "ga" : "soon"}">${x[1]}</em></span>`).join("")}</div>` : ""}
    ${s.note ? `<p class="sv-fl">${s.note}</p>` : ""}${s.fl ? `<p class="sv-fl">${FL_NOTE}</p>` : ""}
    <div class="sv-foot"><span>${libDeck(s)} \u00b7 slide ${s.id.split("-")[1]}</span>${svList.length > 1 ? `<span>${svIdx + 1} of ${svList.length}</span>` : ""}</div>
    <button type="button" class="ask-inline sv-ask" data-q="${s.title.replace(/"/g, "&quot;")}"><span class="spark" aria-hidden="true"></span>Ask about this</button>`;
  $("#sv-prev").hidden = $("#sv-next").hidden = svList.length < 2;
}
function closeSlide() { sv.hidden = true; svScrim.hidden = true; document.body.classList.remove("noscroll"); if (svReturn) svReturn.focus(); }
$("#sv-close").addEventListener("click", closeSlide);
svScrim.addEventListener("click", closeSlide);
$("#sv-prev").addEventListener("click", () => { svIdx = (svIdx - 1 + svList.length) % svList.length; showSlide(); });
$("#sv-next").addEventListener("click", () => { svIdx = (svIdx + 1) % svList.length; showSlide(); });
sv.addEventListener("click", e => { if (e.target.closest(".sv-ask")) closeSlide(); });
document.addEventListener("keydown", e => {
  if (sv.hidden) return;
  if (e.key === "Escape") { e.stopPropagation(); closeSlide(); }
  if (e.key === "ArrowRight" && svList.length > 1) $("#sv-next").click();
  if (e.key === "ArrowLeft" && svList.length > 1) $("#sv-prev").click();
}, true);
document.addEventListener("click", e => { const b = e.target.closest("[data-slide]"); if (b) { e.preventDefault(); openSlide(b.dataset.slide); } });

$$(".segb").forEach(b => b.addEventListener("click", () => {
  $$(".segb").forEach(x => { x.classList.toggle("on", x === b); x.setAttribute("aria-selected", x === b); });
  $("#pane-slides").hidden = b.dataset.pane !== "slides"; $("#pane-faq").hidden = b.dataset.pane !== "faq";
}));
/* FAQs: collapsed topic groups; each question opens on click */
const FAQ_GROUPS = [...new Set(FAQS.map(f => f.group))];
$("#faq-list").innerHTML = FAQ_GROUPS.map(g => {
  const items = FAQS.filter(f => f.group === g);
  return `<details class="fgrp" data-g="${g}"><summary><span>${g}</span><small>${items.length} questions</small></summary><div class="fgrp-body">${items.map(f => {
    const s = SRC[f.src];
    return `<details class="fq" data-g="${g}"><summary>${f.q}</summary><p>${f.a}</p>${s ? `<a class="srclink fsrc" href="${s.url}" target="_blank" rel="noopener">Source: ${s.label} &#8599;</a>` : ""}</details>`;
  }).join("")}</div></details>`;
}).join("") + `<p class="faq-none" hidden>No matching questions. Try Ask for a Chapin-specific answer.</p>`;
$("#faq-search").addEventListener("input", e => {
  const q = e.target.value.toLowerCase().trim(); let any = false;
  $$(".fgrp").forEach(g => {
    let n = 0;
    $$(".fq", g).forEach(d => { const m = !q || d.textContent.toLowerCase().includes(q); d.hidden = !m; if (m) n++; if (!q) d.open = false; });
    g.hidden = n === 0; g.open = !!q && n > 0; if (n) any = true;
  });
  $(".faq-none").hidden = any;
});

/* ---------- Reveal + count-up ---------- */
function countUp(el) {
  if (el.dataset.done) return; el.dataset.done = 1;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const end = +el.dataset.count, suf = el.dataset.suffix || "", t0 = performance.now();
  (function tick(t) { const p = Math.min(1, (t - t0) / 1100), e = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(end * e).toLocaleString() + suf; if (p < 1) requestAnimationFrame(tick); })(t0);
}
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return; e.target.classList.add("in");
  $$(".pcard:not([hidden]) [data-count], .mfg-square [data-count]", e.target).forEach(countUp); io.unobserve(e.target);
}), { threshold: .1 });
$$(".reveal").forEach(el => io.observe(el));
