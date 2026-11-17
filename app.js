(() => {
  "use strict";

  const app = document.getElementById("app");
  const waveWrap = document.getElementById("wave-wrap");
  const wave = document.getElementById("wave");
  const LETTERS = "ABCD";

  const decoder = document.createElement("textarea");
  function text(html) { decoder.innerHTML = html; return decoder.value; }

  /* ---------- question banks ---------- */
  const PARTNAME = {
    P1: "Part 1, ASIC flow", STA: "Part 2, STA",
    P3A: "Part 3A, RTL design", P3B: "Part 3B, verification",
  };
  const BANKS = {
    asic: {
      id: "asic",
      tab: "ASIC flow, STA, verification",
      data: window.QUIZ,
      key: "asic-mcq.v1",
      docTitle: "ASIC MCQ Practice",
      title: "ASIC flow, STA and verification",
      lede: "Every answer comes with a one-line solution and the topic or slide of the notes it is from. Pick a section below, or run all 200. Question numbers match the PDF practice sheet.",
      parts: [
        { id: "A", title: "ASIC design flow", src: "Part 1 of the notes: the 74 flow topics, from spec to production ramp." },
        { id: "B", title: "Static timing analysis", src: "Part 2: the 147-slide STA reference." },
        { id: "C", title: "RTL design and verification", src: "Part 3: RTL design basics and design-verification basics." },
      ],
      src: {
        a1: "Topics 01–10", a2: "Topics 11–16", a3: "Topics 17–20", a4: "Topics 21–25",
        a5: "Topics 26–36", a6: "Topics 37–48", a7: "Topics 49–74",
        b1: "Slides 2–25", b2: "Slides 27–33", b3: "Slides 34–49", b4: "Slides 51–61",
        b5: "Slides 63–73", b6: "Slides 74–91", b7: "Slides 93–119", b8: "Slides 121–128",
        b9: "Slides 130–137", b10: "Slides 139–147",
        c1: "Part 3A, topics 01–15", c2: "Part 3B, topics 01–18",
      },
      fmtRef(ref) {
        const r = text(ref);
        const m = r.match(/^(P1|STA|P3A|P3B)\s*·\s*(.*)$/);
        if (!m) return r;
        const rest = m[2]
          .replace(/\bT(\d+)/g, "topic $1")
          .replace(/\bS(\d+)/g, "slide $1")
          .replace("(notes)", "(speaker notes)");
        return `${PARTNAME[m[1]]}, ${rest}`;
      },
      qnote: (q) => `Question ${q.n} in the PDF.`,
      ok: "slack: met. Correct.",
      bad: (L) => `slack: violated. The answer is ${L}.`,
      clean: "Timing closed: zero violations.",
      extraBtn: "Where the slides are wrong",
      extraNote: "The questions use the correct values; this lists both versions.",
    },
    analog: {
      id: "analog",
      tab: "Analog design",
      data: window.QUIZ_ANALOG,
      key: "analog-mcq.v1",
      docTitle: "Analog Design MCQ Practice",
      title: "Analog design: requirements to GDS",
      lede: "200 of the most likely questions: device physics, parasitics, matching, latch-up, the LDO and the chip flow. More than half are small numericals with new numbers. Every answer has a one-line working and the section of the short notes it is from.",
      parts: [
        { id: "A", title: "Chip workflow: requirements to GDS", src: "Part I of the notes: the 18 flow chapters." },
        { id: "B", title: "Device physics and parasitics", src: "Part II: diode, MOSFET, second-order effects, interconnect and reliability." },
        { id: "C", title: "Advanced layout and the LDO", src: "Part III: latch-up, matching, WPE, STI/LOD and the low-dropout regulator." },
      ],
      src: null, // taken from each section's own src field
      fmtRef: (ref) => `Short notes §${text(ref)}`,
      qnote: (q) => `Question ${q.n} of the analog bank.`,
      ok: "In saturation. Correct.",
      bad: (L) => `Cut off. The answer is ${L}.`,
      clean: "Zero offset: no mistakes.",
      extraBtn: "Notation traps",
      extraNote: "Symbols the course uses for two different things.",
    },
    mock: {
      id: "mock",
      tab: "Mock exams (95 marks)",
      data: window.QUIZ_MOCK,
      key: "mock-mcq.v1",
      defaults: { mode: "test", shuffle: false },
      docTitle: "Mock Exams, 95 marks",
      title: "Mock exams in the real format",
      thin: "3 papers × 50 questions · 45 × 2 marks + 5 × 1 mark = 95 · no calculator",
      lede: "Each paper mixes digital (ASIC flow, STA, RTL and verification) and analog (devices, parasitics, layout and the LDO), as the test does. About 40% are short numericals, and the numbers are chosen so you can work them by hand. Test mode, a running clock and a score in marks, out of 95. These are new questions, not repeats from the two practice banks.",
      parts: [
        { id: "P1", title: "Paper 1", src: "Q1–22 digital, Q23–45 analog, Q46–50 one-mark." },
        { id: "P2", title: "Paper 2", src: "Q1–22 digital, Q23–45 analog, Q46–50 one-mark." },
        { id: "P3", title: "Paper 3", src: "Q1–22 digital, Q23–45 analog, Q46–50 one-mark." },
      ],
      partBtn: (count) => `Start paper (${count} Q · 95 marks)`,
      src: null,
      fmtRef: (ref) => text(ref),
      qnote: (q) => `Paper ${q.p}, question ${q.k}.`,
      ok: "Correct.",
      bad: (L) => `Wrong. The answer is ${L}.`,
      clean: "Full marks.",
      extraBtn: "No-calculator toolkit",
      extraNote: "Values and unit shortcuts that make the numericals quick by hand.",
    },
  };

  /* ---------- active bank + per-viewer progress (never required) ---------- */
  let B, D, Q, SEC, byN, secById, store, SRC, PARTS;
  function loadStore(key, defaults) {
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(key)) || {}; } catch (e) { /* private mode */ }
    return Object.assign({ mode: "learn", shuffle: true, hist: {} }, defaults || {}, saved);
  }
  function save() {
    try { localStorage.setItem(B.key, JSON.stringify(store)); } catch (e) { /* private mode */ }
  }
  function useBank(id) {
    B = BANKS[id] && BANKS[id].data ? BANKS[id] : BANKS.asic;
    D = B.data; Q = D.questions; SEC = D.sections;
    byN = new Map(Q.map((q) => [q.n, q]));
    secById = new Map(SEC.map((s) => [s.id, s]));
    store = loadStore(B.key, B.defaults);
    SRC = B.src || Object.fromEntries(SEC.map((s) => [s.id, s.src]));
    PARTS = B.parts;
    document.title = B.docTitle;
    try { localStorage.setItem("mcq.bank", B.id); } catch (e) { /* private mode */ }
    const want = B.id === "asic" ? "" : "#" + B.id;
    if (location.hash !== want) history.replaceState(null, "", location.pathname + location.search + want);
  }
  function initialBank() {
    const h = location.hash.replace("#", "");
    if (BANKS[h]) return h;
    try { const s = localStorage.getItem("mcq.bank"); if (BANKS[s]) return s; } catch (e) { /* ignore */ }
    return "asic";
  }
  useBank(initialBank());
  const fmtRef = (ref) => B.fmtRef(ref);
  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  const hist = (n) => store.hist[n];
  const missedIds = () => Q.filter((q) => hist(q.n) && !hist(q.n).ok).map((q) => q.n);
  const unseenIds = () => Q.filter((q) => !hist(q.n)).map((q) => q.n);
  function setView(html) {
    app.innerHTML = html;
    window.scrollTo(0, 0);
  }

  /* ---------- run state ---------- */
  let view = "home";
  let run = null;

  function start(ids, label, forceShuffle) {
    if (!ids.length) return;
    ids = ids.slice();
    if (store.shuffle || forceShuffle) shuffle(ids);
    const perm = {};
    ids.forEach((n) => { perm[n] = shuffle([0, 1, 2, 3]); });
    run = { ids, i: 0, mode: store.mode, label, perm, pick: {}, t0: Date.now() };
    renderQ();
    app.focus({ preventScroll: true });
  }

  /* ---------- marks and elapsed time (mock bank) ---------- */
  const marksOf = (n) => byN.get(n).m || 1;
  const hasMarks = () => Q.some((q) => q.m);
  function fmtTime(ms) {
    const s = Math.floor(ms / 1000), h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60);
    const ss = String(s % 60).padStart(2, "0");
    return h ? `${h}:${String(m).padStart(2, "0")}:${ss}` : `${m}:${ss}`;
  }
  setInterval(() => {
    const el = document.getElementById("clock");
    if (el && run && !run.done) el.textContent = fmtTime(Date.now() - run.t0);
  }, 1000);

  /* ---------- clock waveform: one cycle per question ---------- */
  function drawWave() {
    const N = run.ids.length;
    const W = 24, lo = 36, hi = 8, mid = 22, H = 44;
    let bands = "", paths = "";
    run.ids.forEach((n, i) => {
      const x = i * W, a = x + W * 0.2, b = x + W * 0.72, e = x + W;
      const p = run.pick[n];
      let cls = "idle", d = `M${x} ${lo}H${e}`;
      if (p !== undefined) {
        if (run.mode === "learn" || run.done) {
          const ok = p === byN.get(n).a;
          cls = ok ? "pass" : "fail";
          d = ok ? `M${x} ${lo}H${a}V${hi}H${b}V${lo}H${e}`   // clean pulse
                 : `M${x} ${lo}H${a}V${mid}H${b}V${lo}H${e}`; // stuck mid-rail: metastable
          if (!ok) bands += `<rect class="fail-band" x="${a}" y="0" width="${b - a}" height="${H}"/>`;
        } else {
          cls = "held";
          d = `M${x} ${lo}H${a}V${hi}H${b}V${lo}H${e}`;
        }
      }
      if (i === run.i && !run.done) bands += `<rect class="now" x="${x}" y="0" width="${W}" height="${H}"/>`;
      paths += `<path class="${cls}" d="${d}"/>`;
    });
    wave.setAttribute("viewBox", `0 0 ${N * W} ${H}`);
    wave.innerHTML = `<g>${bands}</g><g fill="none" stroke-width="2" stroke-linejoin="round" vector-effect="non-scaling-stroke">${paths.replace(/<path /g, '<path vector-effect="non-scaling-stroke" ')}</g>`;
    waveWrap.hidden = false;
  }
  wave.addEventListener("click", (ev) => {
    if (!run || view !== "q") return;
    const r = wave.getBoundingClientRect();
    const i = Math.floor(((ev.clientX - r.left) / r.width) * run.ids.length);
    if (i >= 0 && i < run.ids.length) { run.i = i; renderQ(); }
  });

  /* ---------- question view ---------- */
  function renderQ() {
    view = "q";
    const n = run.ids[run.i];
    const q = byN.get(n);
    const learn = run.mode === "learn";
    const picked = run.pick[n];
    const revealed = learn && picked !== undefined;
    const order = run.perm[n];
    const last = run.i === run.ids.length - 1;

    const opts = order.map((oi, k) => {
      let cls = "opt";
      if (revealed) {
        if (oi === q.a) cls += " right";
        else if (oi === picked) cls += " wrong";
        else cls += " dim";
      } else if (oi === picked) cls += " picked";
      return `<button class="${cls}" data-k="${k}" ${revealed ? "disabled" : ""}
        aria-pressed="${oi === picked}"><span class="k">${LETTERS[k]}</span><span>${q.o[oi]}</span></button>`;
    }).join("");

    let report = "";
    if (revealed) {
      const ok = picked === q.a;
      const correctLetter = LETTERS[order.indexOf(q.a)];
      report = `<div class="report${ok ? "" : " bad"}" role="status">
        <p class="verdict">${ok ? B.ok : B.bad(correctLetter)}</p>
        <p class="why">${q.why}</p>
        <p class="from"><span>From </span>${fmtRef(q.ref)}<span>. ${B.qnote(q)}</span></p>
      </div>`;
    }

    let nav;
    if (learn) {
      nav = `<span class="hint">Answer with <kbd>A</kbd>–<kbd>D</kbd> or <kbd>1</kbd>–<kbd>4</kbd>, then <kbd>Enter</kbd></span>
        <span class="actions">
          <button class="btn ghost" data-act="finish">End and see score</button>
          <button class="btn primary" data-act="next" ${revealed ? "" : "disabled"}>${last ? "See score" : "Next question"}</button>
        </span>`;
    } else {
      const left = run.ids.filter((x) => run.pick[x] === undefined).length;
      nav = `<span class="actions">
          <button class="btn" data-act="prev" ${run.i === 0 ? "disabled" : ""}>Previous</button>
          ${last ? "" : `<button class="btn primary" data-act="next">Next</button>`}
        </span>
        <button class="btn ${last ? "primary" : "ghost"}" data-act="finish">Submit test${left ? ` (${left} unanswered)` : ""}</button>`;
    }

    setView(`
      <div class="qhead">
        <p class="qcount">Question <b>${run.i + 1}</b> of ${run.ids.length}${q.m
          ? ` · <span title="Time since you started">⏱ <span id="clock">${fmtTime(Date.now() - run.t0)}</span></span>` : ""}</p>
        <button class="btn ghost" data-act="home">All sections</button>
      </div>
      <p class="qsec">${q.m ? `<span class="mk">${q.m} mark${q.m > 1 ? "s" : ""}</span> Paper ${q.p}, Q${q.k} · ` : ""}${secById.get(q.s).title}</p>
      <h1 class="stem">${q.q}</h1>
      <div class="opts" role="group" aria-label="Options">${opts}</div>
      ${report}
      <div class="qnav">${nav}</div>`);
    drawWave();
    if (revealed) {
      const nx = app.querySelector('[data-act="next"]');
      if (nx) nx.focus({ preventScroll: true });
    }
  }

  function choose(k) {
    const n = run.ids[run.i];
    const learn = run.mode === "learn";
    if (learn && run.pick[n] !== undefined) return;
    const oi = run.perm[n][k];
    run.pick[n] = oi;
    if (learn) {
      store.hist[n] = { ok: oi === byN.get(n).a };
      save();
    }
    renderQ();
  }
  function next() {
    const n = run.ids[run.i];
    if (run.mode === "learn" && run.pick[n] === undefined) return;
    if (run.i === run.ids.length - 1) { if (run.mode === "learn") finish(); return; }
    run.i++;
    renderQ();
  }
  function prev() {
    if (run.i > 0) { run.i--; renderQ(); }
  }

  /* ---------- results ---------- */
  function finish() {
    view = "results";
    run.done = true;
    const learn = run.mode === "learn";
    if (!learn) {
      run.ids.forEach((n) => {
        if (run.pick[n] !== undefined) store.hist[n] = { ok: run.pick[n] === byN.get(n).a };
      });
      save();
    }
    const attempted = run.ids.filter((n) => run.pick[n] !== undefined);
    const right = attempted.filter((n) => run.pick[n] === byN.get(n).a);
    const wrong = attempted.filter((n) => run.pick[n] !== byN.get(n).a);
    const skipped = learn ? [] : run.ids.filter((n) => run.pick[n] === undefined);
    const total = learn ? attempted.length : run.ids.length;
    const pct = total ? Math.round((100 * right.length) / total) : 0;

    const secRows = [];
    SEC.forEach((s) => {
      const ids = (learn ? attempted : run.ids).filter((n) => byN.get(n).s === s.id);
      if (!ids.length) return;
      const r = ids.filter((n) => run.pick[n] === byN.get(n).a).length;
      const multi = new Set((learn ? attempted : run.ids).map((n) => byN.get(n).p)).size > 1;
      const label = multi && byN.get(ids[0]).p ? `Paper ${byN.get(ids[0]).p}: ${s.title}` : s.title;
      secRows.push(`<tr><td>${label}</td><td class="n"><b>${r}</b> / ${ids.length}</td></tr>`);
    });

    const review = wrong.concat(skipped).sort((x, y) => run.ids.indexOf(x) - run.ids.indexOf(y));
    const misses = review.map((n) => {
      const q = byN.get(n);
      const p = run.pick[n];
      return `<div class="miss">
        <p class="mq">${q.q}</p>
        <p class="mrow yours"><span class="lab">You chose</span><span>${p === undefined ? "nothing (skipped)" : q.o[p]}</span></p>
        <p class="mrow ans"><span class="lab">Answer</span><span>${q.o[q.a]}</span></p>
        <p class="why">${q.why}</p>
        <p class="from">${fmtRef(q.ref)}. ${B.qnote(q)}</p>
      </div>`;
    }).join("");

    let slack;
    if (!total) slack = `<p class="slack">No questions answered yet.</p>`;
    else if (!review.length) slack = `<p class="slack">${B.clean}</p>`;
    else slack = `<p class="slack bad">${pct}% correct. ${wrong.length} wrong${skipped.length ? `, ${skipped.length} skipped` : ""}.</p>`;

    // marks view: score out of the paper's marks (test: every question counts; learn: answered ones)
    const marked = hasMarks();
    const pool = learn ? attempted : run.ids;
    const gotM = right.reduce((a, n) => a + marksOf(n), 0);
    const totM = pool.reduce((a, n) => a + marksOf(n), 0);
    const took = fmtTime(Date.now() - run.t0);
    if (marked) {
      for (const m of [2, 1]) {
        const ids = pool.filter((n) => marksOf(n) === m);
        if (!ids.length) continue;
        const r = ids.filter((n) => run.pick[n] === byN.get(n).a).length;
        secRows.push(`<tr><td>${m}-mark questions</td><td class="n"><b>${r * m}</b> / ${ids.length * m} marks</td></tr>`);
      }
    }

    setView(`
      <div class="qhead">
        <p class="qcount">${run.label}, ${learn ? "learn" : "test"} mode</p>
        <button class="btn ghost" data-act="home">All sections</button>
      </div>
      <div class="score">
        ${marked
          ? `<p class="big">${gotM}<small> / ${totM} marks</small></p>
             <p class="tally"><b>${right.length}</b> of ${total} questions right · time ${took}</p>`
          : `<p class="big">${right.length}<small> / ${total}</small></p>`}
        ${slack}
      </div>
      <div class="actions">
        ${review.length ? `<button class="btn primary" data-act="retry">Retry the ${review.length} you missed</button>` : ""}
        <button class="btn" data-act="again">Run this set again</button>
      </div>
      ${secRows.length ? `<table class="bysec"><tbody>${secRows.join("")}</tbody></table>` : ""}
      ${review.length ? `<section class="missed"><h2>Review what you missed</h2>${misses}</section>` : ""}`);
    drawWave();
    run.review = review;
  }

  /* ---------- home ---------- */
  let resetArmed = false;
  function renderHome() {
    view = "home";
    waveWrap.hidden = true;
    const answered = Object.keys(store.hist).length;
    const right = Object.values(store.hist).filter((h) => h.ok).length;
    const missed = missedIds().length;
    const unseen = unseenIds().length;

    const parts = PARTS.map((p) => {
      const secs = SEC.filter((s) => s.part === p.id).map((s) => {
        const qs = Q.filter((q) => q.s === s.id);
        const ok = qs.filter((q) => hist(q.n) && hist(q.n).ok).length;
        const done = qs.filter((q) => hist(q.n)).length;
        const ticks = qs.map((q) => {
          const h = hist(q.n);
          return `<i class="${h ? (h.ok ? "ok" : "no") : ""}"></i>`;
        }).join("");
        return `<li><button class="sec" data-sec="${s.id}">
          <span><span class="sec-title">${s.title}</span><br><span class="sec-src">${SRC[s.id]}</span></span>
          <span class="sec-meta">${done ? `${ok} of ${s.count} right` : `${s.count} questions`}</span>
          <span class="ticks" aria-hidden="true">${ticks}</span>
        </button></li>`;
      }).join("");
      const count = Q.filter((q) => secById.get(q.s).part === p.id).length;
      return `<section class="part">
        <div class="part-head"><h2>${p.title}</h2><button class="btn${B.partBtn ? " primary" : ""}" data-part="${p.id}">${B.partBtn ? B.partBtn(count) : `Run all ${count}`}</button></div>
        <p class="src">${p.src} ${count} questions.</p>
        <ul class="sections">${secs}</ul>
      </section>`;
    }).join("");

    const total = Q.length;
    const tabs = Object.values(BANKS).filter((b) => b.data).map((b) =>
      `<button data-bank="${b.id}" aria-pressed="${b.id === B.id}">${b.tab}<small>${b.data.questions.length} questions</small></button>`).join("");
    setView(`
      <nav class="seg banks" role="group" aria-label="Subject">${tabs}</nav>
      <header class="masthead">
        <h1>${B.title}<span class="thin">${B.thin || `${total} practice questions for the MCQ test`}</span></h1>
        <p class="lede">${B.lede}</p>
        <p class="tally">${answered
          ? `You have answered <b>${answered}</b> of ${total} and got <b>${right}</b> right. Progress is saved in this browser.`
          : "Your progress is saved in this browser."}</p>
      </header>
      <div class="controls">
        <div class="seg" role="group" aria-label="Mode">
          <button data-mode="learn" aria-pressed="${store.mode === "learn"}">Learn<small>See the answer after each question</small></button>
          <button data-mode="test" aria-pressed="${store.mode === "test"}">Test<small>See your score at the end</small></button>
        </div>
        <label class="check"><input type="checkbox" id="shuf" ${store.shuffle ? "checked" : ""}> Shuffle the question order</label>
        <div class="actions">
          <button class="btn primary" data-act="all">Start all ${total}</button>
          <button class="btn" data-act="quick">Random 25</button>
          <button class="btn" data-act="missed" ${missed ? "" : "disabled"}>Retry missed (${missed})</button>
          <button class="btn" data-act="unseen" ${unseen && unseen < total ? "" : "disabled"}>Not tried yet (${unseen})</button>
        </div>
      </div>
      ${parts}
      <footer class="foot">
        <p><button class="btn ghost" data-act="errata">${B.extraBtn}</button> ${B.extraNote}</p>
        <p><button class="btn ghost" data-act="reset" ${answered ? "" : "disabled"}>${resetArmed ? "Click again to erase all progress" : "Erase my progress"}</button></p>
      </footer>`);
  }

  /* ---------- errata ---------- */
  function renderErrata() {
    view = "errata";
    waveWrap.hidden = true;
    if (B.id === "analog") return renderTraps();
    if (B.id === "mock") return renderToolkit();
    setView(`
      <div class="qhead"><p class="qcount">Errata</p><button class="btn ghost" data-act="home">All sections</button></div>
      <section class="errata">
        <h1 class="stem">Where the STA slides are wrong</h1>
        <p class="lede">The quiz uses the correct values. If the test copies a slide word for word, it may expect the slide's version, so know both.</p>
        <ul>
          <li><b>Slide 24, f<sub>max</sub>:</b> 1/(5 + 0.05) ns is about 198 MHz. The slide prints 196 MHz.</li>
          <li><b>Slides 101–102, CRPR credit:</b> the slide divides by 2 and gets 0.04 ns. The credit is the full common delay × (late − early) = 0.08 ns, so the final hold slack is 0.752 ns, not 0.712. Slide 103 uses the correct form.</li>
          <li><b>Slide 80, MTBF:</b> the denominator 500×10<sup>6</sup> × 10<sup>9</sup> × 10<sup>−12</sup> is 5×10<sup>5</sup>, not 0.5. The conclusion still holds: two stages at τ = 0.2 ns are far too few.</li>
          <li><b>Slide 66, recovery example:</b> a de-assert at 3.3 ns is before the 3.8 ns deadline, so it meets recovery. The slide's −0.5 ns "violation" has the sign reversed.</li>
          <li><b>Slide 121:</b> labels same-direction switching as a setup issue and opposite as hold. That is swapped. Slides 123–124 are right: same direction makes the victim faster (hold risk), opposite makes it slower (setup risk).</li>
          <li><b>Slides 96 and 135, cause of temperature inversion:</b> the slides blame NBTI or falling mobility. Mobility rises in the cold; inversion happens because V<sub>th</sub> rises at low temperature, which outweighs the mobility gain at low overdrive.</li>
          <li><b>Slide 131, SF/FS gate examples:</b> swapped. NAND has series NMOS (stressed by SF); NOR has series PMOS (stressed by FS).</li>
          <li><b>Slide 144, NBTI:</b> stresses a PMOS when its gate is held low (device on), not high.</li>
          <li><b>Slide 146, V<sub>t</sub> order:</b> HVT (slow) → SVT (medium) → LVT (fast).</li>
          <li><b>Slides 110 and 113, "6σ = 99.99966 %":</b> that is the Six Sigma 3.4 ppm figure (4.5σ). A true 6σ is about 99.9999999 %.</li>
          <li><b>Slides 139 and 141:</b> GBA runtime is quoted as both O(n log n) and O(n). A topological traversal is O(n).</li>
          <li><b>Slide 147:</b> the signoff checklist has 37 items, not "40+".</li>
        </ul>
      </section>`);
    app.focus({ preventScroll: true });
  }

  function renderTraps() {
    setView(`
      <div class="qhead"><p class="qcount">Notation traps</p><button class="btn ghost" data-act="home">All sections</button></div>
      <section class="errata">
        <h1 class="stem">Symbols that mean two things</h1>
        <p class="lede">The course document reuses a few symbols. Read the context before you plug numbers in. Every worked numerical in the document was recomputed and is correct.</p>
        <ul>
          <li><b>V<sub>T</sub>:</b> the <i>thermal voltage</i> kT/q ≈ 25.85 mV in the diode chapters, but the <i>threshold voltage</i> in the MOSFET chapters, where the thermal voltage is written V<sub>Thermal</sub>.</li>
          <li><b>n:</b> the diode ideality factor (1–2), the subthreshold slope factor (S = 59.6n mV/dec), and the current-density exponent in Black's equation (MTTF ∝ J<sup>−n</sup>).</li>
          <li><b>LOD vs LDO:</b> length of diffusion is a layout-dependent effect; a low-dropout regulator is a circuit.</li>
          <li><b>β:</b> μC<sub>ox</sub>W/L in the MOSFET chapters, but the feedback factor R<sub>2</sub>/(R<sub>1</sub> + R<sub>2</sub>) in the LDO. And α in latch-up is the common-base gain, while α in P<sub>dyn</sub> = αCV²f is the switching activity.</li>
          <li><b>Junction capacitance:</b> written C<sub>j0</sub>/(1 − V<sub>D</sub>/V<sub>bi</sub>)<sup>m</sup> in Part II and C<sub>j0</sub>/(1 + V<sub>R</sub>/Φ)<sup>m</sup> in Part I. Same formula with V<sub>D</sub> = −V<sub>R</sub>.</li>
          <li><b>Miller:</b> C<sub>in</sub> = C<sub>gs</sub> + C<sub>gd</sub>(1 − A<sub>v</sub>). A<sub>v</sub> is negative for a common-source stage, so the factor is 1 + |A<sub>v</sub>|.</li>
          <li><b>Delays:</b> 0.69RC is the 50% step delay of a lumped RC; ½RC is the Elmore delay of a uniform distributed wire; plain RC is the time constant τ.</li>
          <li><b>Mismatch signs:</b> ΔI/I ≈ Δβ/β − 2ΔV<sub>T</sub>/V<sub>OV</sub> + ΔV<sub>DS</sub>/V<sub>A</sub>. A higher V<sub>T</sub> gives less current, hence the minus sign.</li>
        </ul>
      </section>`);
    app.focus({ preventScroll: true });
  }

  function renderToolkit() {
    setView(`
      <div class="qhead"><p class="qcount">No-calculator toolkit</p><button class="btn ghost" data-act="home">All sections</button></div>
      <section class="errata">
        <h1 class="stem">Numbers to carry into the exam</h1>
        <p class="lede">Every numerical in the mock papers can be done with these values. Learn the unit shortcuts and most of the arithmetic goes away.</p>
        <ul>
          <li><b>Unit shortcuts:</b> mA × Ω = mV · µA × kΩ = mV · kΩ × pF = ns · kΩ × fF = ps · Ω × pF = ps · nC ÷ A = ns · mA ÷ mV = S. So 26 mV / 2 mA = 13 Ω, and 50 kΩ × 100 fF = 5 ns.</li>
          <li><b>Thermal voltage:</b> kT/q ≈ 25.85 mV ≈ 26 mV at 300 K. 2.3 V<sub>T</sub> ≈ 60 mV: a diode with n = 1 changes 10× per 60 mV, and S = 59.6n mV/dec.</li>
          <li><b>Logs:</b> ln 10 ≈ 2.303, ln 2 ≈ 0.693, log<sub>10</sub>2 ≈ 0.301. 20 dB = 10×, 40 dB = 100×, 60 dB = 1000×, 6 dB ≈ 2×.</li>
          <li><b>Exponentials:</b> e<sup>−0.5</sup> ≈ 0.607, e<sup>−1</sup> ≈ 0.368, e<sup>−2</sup> ≈ 0.135, e<sup>−3</sup> ≈ 0.050, e<sup>3</sup> ≈ 20, e<sup>20</sup> ≈ 4.85×10<sup>8</sup>.</li>
          <li><b>Roots:</b> √2 ≈ 1.414, √3 ≈ 1.732, √5 ≈ 2.236, √10 ≈ 3.162, √0.7 ≈ 0.837, √1.7 ≈ 1.304. To halve σ ∝ 1/√(WL), quadruple the area.</li>
          <li><b>Poles:</b> 1/(2π) ≈ 0.159, so f = 0.159/RC. RC = 1 µs gives 159 kHz; RC = 1 ns gives 159 MHz; RC = 100 ns gives 1.59 MHz.</li>
          <li><b>Scaling laws:</b> P<sub>dyn</sub> ∝ V²f · wire delay ∝ L² · MTTF ∝ J<sup>−2</sup> · intrinsic gain = 2/(λV<sub>OV</sub>) · I<sub>D</sub> ∝ V<sub>OV</sub>² (square law) or ∝ V<sub>OV</sub> (velocity saturation) · delay ∝ (V<sub>ref</sub>/V)<sup>1.5</sup>, so 1% IR drop ≈ 1.5% slower.</li>
          <li><b>Lengths:</b> 1 nm = 10<sup>−7</sup> cm, 1 µm = 10<sup>−4</sup> cm, 1 µm² = 10<sup>−8</sup> cm². Squares = L/W.</li>
          <li><b>STA signs:</b> setup slack = RAT − AAT; hold slack = AAT − RHT. Uncertainty is subtracted from setup and added to the hold requirement. Positive skew helps setup and hurts hold. f<sub>max</sub> = 1/(T − WNS).</li>
          <li><b>Statistics:</b> N equal independent σ add as √N·σ. 3σ = 99.87%. CRPR credit = common delay × (late − early), with no ÷2.</li>
        </ul>
      </section>`);
    app.focus({ preventScroll: true });
  }

  /* ---------- events ---------- */
  app.addEventListener("click", (ev) => {
    const t = ev.target.closest("button");
    if (!t || t.disabled) return;
    if (t.dataset.k !== undefined) return choose(+t.dataset.k);
    if (t.dataset.bank) { if (t.dataset.bank !== B.id) { run = null; resetArmed = false; useBank(t.dataset.bank); } return renderHome(); }
    if (t.dataset.mode) { store.mode = t.dataset.mode; save(); return renderHome(); }
    if (t.dataset.sec) { const s = secById.get(t.dataset.sec); return start(Q.filter((q) => q.s === s.id).map((q) => q.n), s.title); }
    if (t.dataset.part) {
      const p = PARTS.find((x) => x.id === t.dataset.part);
      return start(Q.filter((q) => secById.get(q.s).part === p.id).map((q) => q.n), p.title);
    }
    const act = t.dataset.act;
    if (act !== "reset") resetArmed = false;
    switch (act) {
      case "all": return start(Q.map((q) => q.n), `All ${Q.length}`);
      case "quick": return start(shuffle(Q.map((q) => q.n)).slice(0, 25), "Random 25", true);
      case "missed": return start(missedIds(), "Missed questions");
      case "unseen": return start(unseenIds(), "Not tried yet");
      case "next": return next();
      case "prev": return prev();
      case "finish": return finish();
      case "retry": return start(run.review, "Retry of missed");
      case "again": return start(run.ids, run.label);
      case "errata": return renderErrata();
      case "home": run = null; return renderHome();
      case "reset":
        if (!resetArmed) { resetArmed = true; return renderHome(); }
        resetArmed = false; store.hist = {}; save(); return renderHome();
    }
  });
  app.addEventListener("change", (ev) => {
    if (ev.target.id === "shuf") { store.shuffle = ev.target.checked; save(); }
  });
  document.addEventListener("keydown", (ev) => {
    if (ev.ctrlKey || ev.metaKey || ev.altKey) return;
    if (view !== "q") return;
    const k = ev.key.toLowerCase();
    const onButton = ev.target.tagName === "BUTTON";
    let idx = "1234".indexOf(k);
    if (idx < 0) idx = "abcd".indexOf(k);
    if (k.length === 1 && idx >= 0) { ev.preventDefault(); return choose(idx); }
    if ((k === "enter" && !onButton) || k === "arrowright") { ev.preventDefault(); return next(); }
    if (k === "arrowleft") { ev.preventDefault(); return prev(); }
    if (k === "escape") { run = null; renderHome(); }
  });

  window.addEventListener("hashchange", () => {
    const h = location.hash.replace("#", "") || "asic";
    if (BANKS[h] && h !== B.id) { run = null; useBank(h); renderHome(); }
  });

  renderHome();
})();
