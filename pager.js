/* Paged presentation flow: one section per page, #N in the address bar, Back/Next in the header and at the bottom. */
(function () {
  const SECS = ["cover", "summary", "why", "vision", "journey", "simple", "plan", "deeper"];
  const PAGES = [
    { sec: "cover", title: "Welcome" },
    { sec: "summary", title: "Executive summary" },
    { sec: "why", title: "Why Salesforce" },
    { sec: "vision", title: "The vision" },
    ...TABS.map((t, i) => ({ sec: "journey", chapter: t.id, title: t.id === "premier" ? "Premier Success" : `Journey ${i + 1}: ${t.verb}` })),
    { sec: "simple", title: "Simple by design" },
    { sec: "plan", title: "The plan" },
    { sec: "deeper", title: "FAQs & library" }
  ];
  const chapterPage = id => PAGES.findIndex(p => p.chapter === id);
  const GROUPS = [
    ["Overview", i => i <= 1, 0],
    ["Why Salesforce", i => PAGES[i].sec === "why", PAGES.findIndex(p => p.sec === "why")],
    ["The vision", i => PAGES[i].sec === "vision", PAGES.findIndex(p => p.sec === "vision")],
    ["The journey", i => PAGES[i].sec === "journey" && PAGES[i].chapter !== "premier", chapterPage(TABS[0].id)],
    ["Premier Success", i => PAGES[i].chapter === "premier", chapterPage("premier")],
    ["Simple by design", i => PAGES[i].sec === "simple", PAGES.findIndex(p => p.sec === "simple")],
    ["The plan", i => PAGES[i].sec === "plan", PAGES.findIndex(p => p.sec === "plan")],
    ["FAQs & library", i => PAGES[i].sec === "deeper", PAGES.findIndex(p => p.sec === "deeper")]
  ];
  let cur = 0;
  document.body.classList.add("paged");

  /* Executive summary */
  const target = t => t.startsWith("chapter:") ? `data-chapter="${t.slice(8)}" href="#journey"` : `href="#${t}"`;
  $("#sgrid").innerHTML = SUMMARY.blocks.map(b => `<article class="sblock"><h3><span class="sn2">${b.n}</span>${b.title}</h3>
    <ul>${b.points.map(p => `<li>${p}</li>`).join("")}</ul>
    <div class="slinks">${b.links.map(l => `<a ${target(l[1])}>${l[0]} &rarr;</a>`).join("")}</div></article>`).join("");

  /* Header section nav */
  $("#pnav").innerHTML = GROUPS.map((g, k) => `<a href="#${g[2] + 1}" data-g="${k}">${g[0]}</a>`).join("");

  function show(i, opts = {}) {
    i = Math.max(0, Math.min(PAGES.length - 1, i));
    const p = PAGES[i], changed = i !== cur || opts.force;
    cur = i;
    SECS.forEach(s => { const el = document.getElementById(s); if (el) el.hidden = s !== p.sec; });
    const sec = document.getElementById(p.sec);
    if (sec) { sec.classList.add("in"); $$(".reveal", sec).forEach(x => x.classList.add("in")); if (typeof countUp === "function") $$(".pcard:not([hidden]) [data-count], .mfg-square [data-count]", sec).forEach(countUp); }
    if (p.chapter && (typeof cur === "number") && (!window.__curChapter || window.__curChapter !== p.chapter || opts.force)) { window.__curChapter = p.chapter; renderChapter(p.chapter, { hash: false }); }
    // header
    $$("#pnav a").forEach((a, k) => a.classList.toggle("on", GROUPS[k][1](i)));
    $("#pg-count").textContent = `${i + 1} / ${PAGES.length}`;
    $("#pg-prev").disabled = i === 0; $("#pg-next").disabled = i === PAGES.length - 1;
    // bottom
    const prev = PAGES[i - 1], next = PAGES[i + 1];
    $("#pager-bottom").innerHTML = `${prev ? `<button type="button" class="pb prev" data-go="${i - 1}"><small>Back</small><b>&larr; ${prev.title}</b></button>` : "<span></span>"}
      ${next ? `<button type="button" class="pb next" data-go="${i + 1}"><small>Next</small><b>${next.title} &rarr;</b></button>` : `<button type="button" class="pb next" data-go="0"><small>Finished</small><b>Back to the start &#8634;</b></button>`}`;
    document.title = `${p.title} | Chapin + Salesforce`;
    if (opts.push !== false && location.hash !== `#${i + 1}`) history.pushState(null, "", `#${i + 1}`);
    if (changed && opts.scroll !== false) window.scrollTo({ top: 0, behavior: "auto" });
  }
  const go = (i, o) => show(i, o);

  /* hooks used by render.js and agent.js */
  window.pagerNext = () => go(cur + 1);
  window.pagerGoChapter = id => { const k = chapterPage(id); if (k >= 0) { window.__curChapter = null; go(k, { force: true }); } };
  window.pagerSync = id => { const k = chapterPage(id); if (k >= 0) { window.__curChapter = id; go(k, { scroll: false }); } };

  function fromHash(h) {
    h = (h || "").replace("#", "");
    if (/^\d+$/.test(h)) return Math.max(0, Math.min(PAGES.length - 1, +h - 1));
    if (SECS.includes(h)) return h === "journey" ? chapterPage(TABS[0].id) : PAGES.findIndex(p => p.sec === h);
    const k = chapterPage(h); return k >= 0 ? k : 0;
  }

  $("#pg-prev").addEventListener("click", () => go(cur - 1));
  $("#pg-next").addEventListener("click", () => go(cur + 1));
  document.addEventListener("click", e => {
    if (e.defaultPrevented) return;
    const b = e.target.closest("[data-go]"); if (b) { go(+b.dataset.go); return; }
    const a = e.target.closest('a[href^="#"]'); if (!a || a.dataset.chapter) return;
    const h = a.getAttribute("href").slice(1); if (!h) return;
    if (/^\d+$/.test(h) || SECS.includes(h) || chapterPage(h) >= 0) { e.preventDefault(); go(fromHash(h)); }
  });
  document.addEventListener("keydown", e => {
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
    if (!["ArrowRight", "ArrowLeft"].includes(e.key)) return;
    const t = e.target;
    if (/input|textarea|select/i.test(t.tagName) || t.closest("#chapter") || !$("#sviewer").hidden || !$("#drawer").hidden) return;
    go(cur + (e.key === "ArrowRight" ? 1 : -1));
  });
  window.addEventListener("popstate", () => go(fromHash(location.hash), { push: false }));

  go(fromHash(location.hash), { push: false, force: true });
  history.replaceState(null, "", `#${cur + 1}`);
})();
