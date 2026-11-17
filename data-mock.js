// Mock exams in the real test format: 45 questions × 2 marks + 5 questions × 1 mark = 95 marks.
// Sources: "spintronics asic.pdf" (ASIC flow T01–74, STA slides 1–147, RTL + DV basics) and
// "spintronics analog.pdf" (Semiconductor Chip Design, Parts I–III). All numbers are chosen so the
// arithmetic works by hand (no calculator in the exam). The CORRECT option is listed first in every
// q(...) call; the app shuffles options on screen.
window.QUIZ_MOCK = (() => {
  const sections = [];
  const questions = [];
  let paper = 0, k = 0;
  const PAPERS = [];
  function startPaper(title) {
    paper++; k = 0;
    PAPERS.push({ id: "P" + paper, title });
    sections.push(
      { id: `p${paper}d`, part: "P" + paper, title: "Digital: ASIC flow, STA, RTL and verification", src: "Questions 1–22 · 2 marks each" },
      { id: `p${paper}a`, part: "P" + paper, title: "Analog: devices, parasitics, layout and the LDO", src: "Questions 23–45 · 2 marks each" },
      { id: `p${paper}o`, part: "P" + paper, title: "One-mark questions", src: "Questions 46–50 · 1 mark each" },
    );
  }
  // d = digital 2-mark, a = analog 2-mark, o = one-mark
  const q = (kind, ref, stem, o, why) => {
    k++;
    questions.push({ n: questions.length + 1, s: `p${paper}${kind}`, m: kind === "o" ? 1 : 2,
      p: paper, k, q: stem, o, a: 0, why, ref });
  };

  /* ================================ PAPER 1 ================================ */
  startPaper("Paper 1");

  q("d", "STA slides 20–21",
    "Launch clock latency 0.3 ns, capture clock latency 0.4 ns, t<sub>cq</sub> = 0.15 ns, combinational delay 1.5 ns, t<sub>su</sub> = 0.1 ns, T = 2 ns. The setup slack is",
    ["+0.35 ns", "+0.25 ns", "+0.45 ns", "−0.35 ns"],
    "RAT = 0.4 + 2 − 0.1 = 2.3 ns. AAT = 0.3 + 0.15 + 1.5 = 1.95 ns. Slack = 2.3 − 1.95 = +0.35 ns. (+0.25 ignores the 0.1 ns of positive skew.)");
  q("d", "STA slides 22, 25",
    "Launch latency 0.2 ns, t<sub>cq,min</sub> = 0.08 ns, min combinational delay 0.05 ns, capture latency 0.4 ns, t<sub>hold</sub> = 0.04 ns. The hold check gives",
    ["−0.11 ns: violated", "+0.09 ns: met", "+0.11 ns: met", "−0.31 ns: violated"],
    "AAT = 0.2 + 0.08 + 0.05 = 0.33 ns. Required hold time = 0.4 + 0.04 = 0.44 ns. Slack = 0.33 − 0.44 = −0.11 ns. The 0.2 ns of positive skew is what breaks hold.");
  q("d", "STA slide 14; ASIC flow T40",
    "Which statement about setup and hold is correct?",
    ["Setup is a max-delay check that a longer clock period helps; hold is a min-delay check that no clock period can fix",
     "Both checks are fixed by lowering the clock frequency",
     "Hold is checked at the slow corner (SS, low V<sub>DD</sub>, 125 °C)",
     "Hold slack = RAT − AAT, the same as setup"],
    "Setup limits how slow the logic can be and the period helps. Hold limits how fast it can be, and only added delay fixes it. Hold is checked at FF, high V<sub>DD</sub>, −40 °C, and hold slack = AAT − RHT.");
  q("d", "STA slide 24",
    "The clock period is 5 ns and the worst setup slack in the design is +1 ns. The maximum clock frequency is",
    ["250 MHz", "200 MHz", "167 MHz", "333 MHz"],
    "f<sub>max</sub> = 1/(T − WNS) = 1/(5 − 1) ns = 1/4 ns = 250 MHz.");
  q("d", "STA slides 44–45",
    "A path is given <code>set_multicycle_path -setup 4</code>. What <code>-hold</code> value moves the hold check back to the launch edge?",
    ["3", "4", "1", "0"],
    "Rule: -setup N ⇒ -hold N − 1. Without it, the hold check moves with the capture edge and reports false hold violations.");
  q("d", "STA slide 85",
    "An asynchronous FIFO pointer has the binary value 0110 (decimal 6). Its Gray-coded value is",
    ["0101", "0110", "0111", "1010"],
    "G<sub>3</sub> = B<sub>3</sub> = 0; G<sub>2</sub> = 0⊕1 = 1; G<sub>1</sub> = 1⊕1 = 0; G<sub>0</sub> = 1⊕0 = 1 → 0101.");
  q("d", "STA slides 76, 85; RTL T10",
    "<b>Assertion:</b> each bit of a multi-bit bus crossing clock domains should get its own 2-FF synchronizer.<br><b>Reason:</b> a 2-FF synchronizer makes metastability on one bit improbable.",
    ["A is false, R is true",
     "Both true, and R explains A",
     "Both true, but R does not explain A",
     "A is true, R is false"],
    "R is true, but A is false: bits synchronised separately can be sampled from different source cycles, so the bus tears. Use Gray code, an async FIFO or a handshake.");
  q("d", "STA slide 103",
    "Launch and capture clock paths share a 0.6 ns common segment. The late derate is 1.10 and the early derate 0.90. The CRPR credit is",
    ["0.12 ns", "0.06 ns", "0.66 ns", "0.54 ns"],
    "Credit = common delay × (late − early) = 0.6 × 0.20 = 0.12 ns. (0.06 is the slide-101 ÷2 slip.)");
  q("d", "STA slide 99",
    "In a flat-OCV setup check, which derates are applied?",
    ["Launch clock and data path late, capture clock early",
     "Launch clock and data path early, capture clock late",
     "All paths late",
     "Data path late, both clock paths unchanged"],
    "Setup: data as slow as possible, clock as fast as possible. The launch clock takes the same side as the data. Hold is the reverse.");
  q("d", "STA slides 109–110",
    "A path has 9 cells, each with σ = 0.01 ns and independent variation. In POCV the path σ is",
    ["0.03 ns", "0.09 ns", "0.01 ns", "0.0033 ns"],
    "σ<sub>path</sub> = √(Σσ<sub>i</sub>²) = √9 × 0.01 = 0.03 ns. Adding them (0.09 ns) is the over-pessimistic stacking.");
  q("d", "STA slides 130, 137",
    "A design has 4 modes. Each is signed off at 3 PVT corners, and each PVT corner is paired with 2 RC corners. The number of timing scenarios is",
    ["24", "9", "12", "20"],
    "Scenarios = modes × corners = 4 × (3 × 2) = 24. Every one must pass.");
  q("d", "STA slides 121–122",
    "C<sub>c</sub> = 5 fF, C<sub>g</sub> = 12 fF and C<sub>load</sub> = 3 fF, and the aggressor swings 0.8 V. The glitch on a quiet victim is about",
    ["0.20 V", "0.27 V", "0.33 V", "0.25 V"],
    "K<sub>r</sub> = C<sub>c</sub>/(C<sub>c</sub> + C<sub>g</sub> + C<sub>load</sub>) = 5/20 = 0.25. V<sub>g</sub> = 0.25 × 0.8 = 0.20 V.");
  q("d", "STA slides 123–124; ASIC flow T43",
    "A victim net switches at the same moment as a strongly coupled aggressor that switches in the <i>opposite</i> direction. The effect is",
    ["The victim slows down: a setup risk",
     "The victim speeds up: a hold risk",
     "Only a glitch, with no change in delay",
     "No effect, because the charges cancel"],
    "An opposite-direction aggressor slows the victim (setup). A same-direction one speeds it up (hold). Slide 121 swaps these labels.");
  q("d", "Analog §I.11; RTL T14",
    "Activity α = 0.1, switched capacitance 50 pF, V<sub>DD</sub> = 1.0 V, f = 200 MHz. The dynamic power is",
    ["1 mW", "10 mW", "0.1 mW", "2 mW"],
    "P = αCV²f = 0.1 × 50×10<sup>−12</sup> × 1 × 2×10<sup>8</sup> = 10<sup>−3</sup> W = 1 mW.");
  q("d", "ASIC flow T52",
    "A metal net of area 1200 µm² connects to a gate area of 3 µm² before any upper layer joins it. The foundry antenna limit is 300. The ratio and verdict are",
    ["400: violation, so add an antenna diode, a jumper to upper metal, or a buffer",
     "400: passes",
     "0.0025: passes",
     "3600: violation"],
    "Antenna ratio = metal area / gate area = 1200/3 = 400, which is above 300. The fixes are a jumper, a diode or a buffer.");
  q("d", "ASIC flow T51",
    "A layout passes DRC and LVS, but some n-wells have no taps. Which check flags this, and what is the risk?",
    ["ERC: latch-up",
     "DRC: a short to VSS",
     "LVS: a missing device",
     "Antenna: gate-oxide damage"],
    "Well and tap problems are electrical-rule checks. A missing tap raises well resistance and invites latch-up. ERC errors often pass DRC and LVS.");
  q("d", "STA slide 66",
    "The clock edge is at 5.0 ns, the recovery time is 0.2 ns, and the async reset de-asserts at 4.5 ns. The recovery check gives",
    ["+0.3 ns: met", "−0.3 ns: violated", "+0.5 ns: met", "+0.7 ns: met"],
    "Slack = (edge − T<sub>rec</sub>) − de-assert = (5.0 − 0.2) − 4.5 = +0.3 ns. The release comes before the 4.8 ns deadline.");
  q("d", "ASIC flow T18",
    "In a scan design, SE = 1 and then one pulse with SE = 0 means",
    ["Shift the pattern in through SI, then capture the logic response into the flops",
     "Capture the response, then shift the pattern in",
     "Reset all flops, then run MBIST",
     "Run functional mode, then compare with ATPG"],
    "SE = 1: the flops form a shift register (SI → SO). SE = 0: one functional clock captures the response, which is then shifted out and compared.");
  q("d", "DV T10",
    "Property <code>req |-> ##2 ack</code>. req is high at clock 5. The assertion passes only if ack is high at clock",
    ["7", "5", "6", "any of 5, 6 or 7"],
    "|-> is overlapping implication, so counting starts at 5. ##2 waits two cycles, which gives cycle 7.");
  q("d", "DV T12",
    "Which UVM statement is correct?",
    ["build_phase runs top-down, and run_phase is the only phase that consumes simulation time",
     "All phases run bottom-up and every phase consumes time",
     "uvm_object instances live for the whole simulation",
     "The monitor drives the DUT pins through the virtual interface"],
    "Build runs top-down, the others bottom-up, and only run_phase takes time. Objects (transactions, sequences) are short-lived; components persist. Only the driver drives the pins.");
  q("d", "ASIC flow T06",
    "Which pair is correctly matched?",
    ["Hard IP: GDS + LEF + .lib, node-specific, placed as a black-box macro",
     "Soft IP: GDS only, node-specific",
     "Hard IP: Verilog RTL, retargetable to any node",
     "Soft IP: needs no timing closure in your flow"],
    "Hard IP (SRAM, PLL, SerDes, PHYs) is silicon-proven layout for one node. Soft IP is synthesizable RTL that you must close timing on in your flow.");
  q("d", "ASIC flow T47, T71",
    "Silicon revision A0 has a logic bug. It is fixed by rewiring pre-placed spare cells, and only metal masks change. The new revision is",
    ["A1", "B0", "B1", "A0-ECO, with no new revision name"],
    "Letters track base-layer (full-mask) spins; numbers track metal-only spins. A metal spin goes A0 → A1.");

  q("a", "Analog §II.8",
    "μ<sub>n</sub>C<sub>ox</sub> = 300 µA/V², W/L = 20, V<sub>OV</sub> = 0.2 V, in saturation. I<sub>D</sub> is",
    ["120 µA", "240 µA", "60 µA", "1.2 mA"],
    "I<sub>D</sub> = ½ × 300 µ × 20 × 0.04 = 120 µA. (240 µA forgets the ½.)");
  q("a", "Analog §II.9",
    "I<sub>D</sub> = 200 µA and V<sub>OV</sub> = 0.25 V. g<sub>m</sub> is",
    ["1.6 mS", "0.8 mS", "3.2 mS", "50 µS"],
    "g<sub>m</sub> = 2I<sub>D</sub>/V<sub>OV</sub> = 400 µA / 0.25 V = 1.6 mS.");
  q("a", "Analog §II.8",
    "An nMOS has V<sub>T</sub> = 0.4 V, V<sub>GS</sub> = 0.9 V and V<sub>DS</sub> = 0.7 V. It is in",
    ["saturation, because V<sub>DS</sub> ≥ V<sub>GS</sub> − V<sub>T</sub>",
     "triode, because V<sub>DS</sub> < V<sub>GS</sub>",
     "cutoff",
     "subthreshold"],
    "V<sub>OV</sub> = 0.5 V, and V<sub>DS</sub> = 0.7 V ≥ 0.5 V, so the device is in saturation.");
  q("a", "Analog §II.9, II.11",
    "g<sub>m</sub> = 2 mS, I<sub>D</sub> = 200 µA, λ = 0.1 V<sup>−1</sup>. The intrinsic gain is",
    ["100 V/V (40 dB)", "10 V/V (20 dB)", "1000 V/V (60 dB)", "50 V/V (34 dB)"],
    "r<sub>o</sub> = 1/(λI<sub>D</sub>) = 1/(0.1 × 200 µ) = 50 kΩ. g<sub>m</sub>r<sub>o</sub> = 2 m × 50 k = 100, and 20 log 100 = 40 dB.");
  q("a", "Analog §II.3",
    "A diode with n = 1 is biased at 2 mA at 300 K (take V<sub>T</sub> ≈ 26 mV). Its small-signal resistance is about",
    ["13 Ω", "26 Ω", "52 Ω", "350 Ω"],
    "r<sub>d</sub> = nV<sub>T</sub>/I<sub>D</sub> = 26 mV / 2 mA = 13 Ω. It is the slope at the bias point, not the static V/I.");
  q("a", "Analog §II.4, I.13",
    "C<sub>j0</sub> = 10 pF, V<sub>bi</sub> = 0.75 V, abrupt junction (m = ½), reverse bias 2.25 V. C<sub>j</sub> is",
    ["5 pF", "2.5 pF", "3.3 pF", "10 pF"],
    "1 + V<sub>R</sub>/V<sub>bi</sub> = 1 + 3 = 4, and √4 = 2, so C<sub>j</sub> = 10/2 = 5 pF.");
  q("a", "Analog §II.4",
    "Which statement about diode capacitance is correct?",
    ["Diffusion capacitance ≈ τ<sub>F</sub>I<sub>D</sub>/(nV<sub>T</sub>) grows with forward current and dominates in forward bias",
     "Depletion capacitance increases with reverse bias",
     "Diffusion capacitance dominates in reverse bias",
     "Both capacitances are independent of bias"],
    "C<sub>d</sub> = τ<sub>F</sub>g<sub>d</sub> ∝ I<sub>D</sub>, so it dominates in forward bias. Reverse bias widens the depletion region and lowers C<sub>j</sub>.");
  q("a", "Analog §II.14",
    "Subthreshold slope factor n = 1.25 at 300 K, so S ≈ 75 mV/dec. If V<sub>GS</sub> drops by 150 mV, the subthreshold current falls by about",
    ["100×", "10×", "1000×", "2×"],
    "S = 59.6 × 1.25 ≈ 75 mV/dec. 150/75 = 2 decades, which is a factor of 100.");
  q("a", "Analog §II.12",
    "V<sub>T</sub> = 0.45 V at V<sub>DS</sub> = 0.1 V and 0.39 V at V<sub>DS</sub> = 1.1 V. The DIBL is",
    ["60 mV/V", "0.6 V/V", "6 mV/V", "−60 mV/V"],
    "DIBL = (0.45 − 0.39)/(1.1 − 0.1) = 0.06/1.0 = 60 mV/V. It is positive, so V<sub>T</sub> is lower at high V<sub>DS</sub> and leakage is higher.");
  q("a", "Analog §II.10",
    "γ = 0.5 V<sup>½</sup>, 2φ<sub>F</sub> = 0.81 V, V<sub>SB</sub> = 0.88 V. The threshold rises by",
    ["0.20 V", "0.44 V", "0.40 V", "0.10 V"],
    "ΔV<sub>T</sub> = γ[√(0.81 + 0.88) − √0.81] = 0.5(√1.69 − 0.9) = 0.5(1.3 − 0.9) = 0.20 V.");
  q("a", "Analog §II.15",
    "A common-source stage has C<sub>gs</sub> = 30 fF, C<sub>gd</sub> = 4 fF and A<sub>v</sub> = −14. The Miller input capacitance is",
    ["90 fF", "86 fF", "34 fF", "116 fF"],
    "C<sub>in</sub> = C<sub>gs</sub> + C<sub>gd</sub>(1 − A<sub>v</sub>) = 30 + 4 × 15 = 90 fF. A<sub>v</sub> is negative, so the factor is 1 + |A<sub>v</sub>|.");
  q("a", "Analog §II.18",
    "A uniform wire has an Elmore delay of 100 ps. Keeping the width the same, its length is tripled. The new wire delay is",
    ["900 ps", "300 ps", "600 ps", "173 ps"],
    "R and C both scale with L, so delay ∝ L². 3² × 100 = 900 ps. This is why repeaters are inserted.");
  q("a", "Analog §II.17",
    "R<sub>sh</sub> = 0.05 Ω/□, L = 1000 µm, W = 2 µm, carrying 4 mA. The IR drop is",
    ["100 mV", "25 mV", "50 mV", "200 mV"],
    "Squares = 1000/2 = 500. R = 500 × 0.05 = 25 Ω. ΔV = 4 mA × 25 Ω = 100 mV.");
  q("a", "Analog §II.20",
    "Which statement about electromigration and IR drop is correct?",
    ["EM is a slow wear-out that fails in the field; IR drop is an immediate performance error; widening a line alone does not fix a via bottleneck",
     "EM fails on day one at wafer sort",
     "IR drop is a long-term reliability mechanism",
     "Widening the wire always fixes EM, even with a single via"],
    "EM moves metal atoms over years; IR drop costs voltage now. Current crowding at vias and constrictions sets the local J.");
  q("a", "Analog §II.21, 27",
    "A<sub>VT</sub> = 4 mV·µm, W = 4 µm, L = 1 µm. σ(ΔV<sub>T</sub>) of the pair is",
    ["2 mV", "4 mV", "1 mV", "0.5 mV"],
    "σ = A<sub>VT</sub>/√(WL) = 4/√4 = 2 mV. Quadrupling the area would halve it.");
  q("a", "Analog §27",
    "Unit devices sit at x = 0, 1, 2, 3 in a pattern A B B A. Which statement is correct?",
    ["A linear gradient cancels (Σx equal: 3 and 3), but a quadratic gradient does not (Σx²: 9 vs 5)",
     "Both linear and quadratic gradients cancel",
     "Neither cancels; only AABB cancels a linear gradient",
     "Common-centroid also removes random Pelgrom mismatch"],
    "Equal centroids cancel only first-order gradients. Random mismatch falls with area, not with placement.");
  q("a", "Analog §28, II.21",
    "WPE differs from Pelgrom mismatch because",
    ["WPE is systematic, set by distance to the well edge; Pelgrom is random and ∝ 1/√(WL)",
     "WPE is random and shrinks with area; Pelgrom is systematic",
     "Both are cancelled by common-centroid placement alone",
     "WPE affects only resistors"],
    "Well implants scatter near the resist edge, so V<sub>T</sub> depends on position. Keep matched devices at equal well-edge distances.");
  q("a", "Analog §26",
    "An I/O undershoot injects 5 mA into substrate resistance R<sub>sub</sub> = 120 Ω. The voltage across the parasitic base–emitter junction is",
    ["0.6 V: enough to forward-bias it, a latch-up risk", "0.06 V: harmless", "24 mV", "6 V"],
    "V = IR = 5 mA × 120 Ω = 0.6 V. More substrate taps (lower R<sub>sub</sub>) cut this.");
  q("a", "Analog §26",
    "Which change makes CMOS latch-up <i>more</i> likely?",
    ["Moving the substrate and well taps farther from the devices",
     "Adding grounded p+ and V<sub>DD</sub>-tied n+ guard rings",
     "Increasing n-well to n+ spacing",
     "Limiting I/O injection with proper ESD clamps"],
    "Distant taps raise R<sub>sub</sub> and R<sub>well</sub>, so a small injected current builds a bigger forward bias. The other three are the doc's countermeasures.");
  q("a", "Analog §30",
    "An LDO has V<sub>REF</sub> = 0.6 V, R<sub>1</sub> = 200 kΩ (top) and R<sub>2</sub> = 100 kΩ (bottom). V<sub>OUT</sub> is",
    ["1.8 V", "1.2 V", "0.9 V", "0.4 V"],
    "V<sub>OUT</sub> = V<sub>REF</sub>(1 + R<sub>1</sub>/R<sub>2</sub>) = 0.6 × 3 = 1.8 V.");
  q("a", "Analog §30",
    "Load step ΔI = 50 mA, loop response Δt = 2 µs, C<sub>OUT</sub> = 10 µF, ESR = 0.1 Ω. The initial droop is about",
    ["15 mV", "10 mV", "5 mV", "25 mV"],
    "ΔI·Δt/C = 50 m × 2 µ / 10 µ = 10 mV. ΔI·ESR = 50 m × 0.1 = 5 mV. Total 15 mV.");
  q("a", "Analog §30",
    "100 mV of input ripple appears as 1 mV at the LDO output. The PSRR is",
    ["40 dB", "20 dB", "100 dB", "−40 dB"],
    "PSRR = 20 log(100/1) = 20 × 2 = 40 dB. A larger number means better rejection.");
  q("a", "Analog §I.16",
    "Which statement about tape-out is correct?",
    ["A locally clean GDS can still be wrong if the stream-layer map is wrong; tape-out is a controlled release, not just a file",
     "Tape-out is complete as soon as a GDS file exists",
     "DRC-clean layout guarantees first-silicon success",
     "Layer maps are optional for foundry intake"],
    "Release needs the GDS/OASIS, layer map, top cell, checksums, reports and approvals. Tape-out success ≠ working silicon ≠ yield.");

  q("o", "ASIC flow T27",
    "Rule of thumb for hard macros in a floorplan:",
    ["Push them to the edges with halos, pins facing the core",
     "Cluster them in the centre of the core",
     "Place them after routing",
     "Let them overlap standard-cell rows"],
    "Macros go to the edges with keep-out halos, and the centre is left for logic.");
  q("o", "STA slide 136",
    "The hold signoff corner is",
    ["FF, V<sub>DD</sub> max, −40 °C, RC<sub>min</sub>",
     "SS, V<sub>DD</sub> min, 125 °C, RC<sub>max</sub>",
     "TT, nominal, 25 °C",
     "FF, V<sub>DD</sub> min, 125 °C, RC<sub>max</sub>"],
    "Hold is checked where the data path is fastest.");
  q("o", "Analog §III (trap)",
    "In layout-dependent effects, “LOD” stands for",
    ["Length of diffusion", "Low-dropout regulator", "Layout-oriented density", "Level of doping"],
    "LOD is a stress effect. LDO is the regulator; the doc warns about mixing them up.");
  q("o", "DV T07",
    "<code>randc</code> in SystemVerilog means",
    ["Cyclic random: every value occurs once before any repeats",
     "Random with a constant seed",
     "Random but constrained to be even",
     "A random clock"],
    "randc cycles through all values before repeating; rand may repeat.");
  q("o", "RTL T06",
    "In a Moore FSM the outputs depend on",
    ["the current state only", "the state and the current inputs", "the inputs only", "the next state"],
    "Moore: state only. Mealy: state and inputs.");

  /* ================================ PAPER 2 ================================ */
  startPaper("Paper 2");

  q("d", "STA slides 20–21",
    "Launch latency 0.25 ns, t<sub>cq</sub> = 0.10 ns, three gates of 0.30, 0.25 and 0.20 ns, capture latency 0.25 ns, T = 1.25 ns, t<sub>su</sub> = 0.07 ns. The setup slack is",
    ["+0.33 ns", "+0.08 ns", "+0.15 ns", "−0.33 ns"],
    "AAT = 0.25 + 0.10 + 0.75 = 1.10 ns. RAT = 0.25 + 1.25 − 0.07 = 1.43 ns. Slack = +0.33 ns. (+0.08 forgets to add the capture latency to RAT.)");
  q("d", "STA slides 40–42",
    "The capture clock arrives 0.2 ns later than the launch clock. Compared with zero skew,",
    ["setup slack improves by 0.2 ns and hold slack worsens by 0.2 ns",
     "both setup and hold improve by 0.2 ns",
     "setup worsens and hold improves",
     "neither check changes, because skew only affects power"],
    "Positive skew lengthens the effective period (T + Δt) but moves the hold requirement later. The same skew cannot help both.");
  q("d", "STA slides 22, 25, 64",
    "Launch latency 0.5 ns, capture latency 0.7 ns, t<sub>cq,min</sub> = 0.10 ns, min logic 0.12 ns, t<sub>hold</sub> = 0.05 ns. The verdict and fix are",
    ["−0.03 ns: add at least 30 ps of delay on the data path",
     "+0.17 ns: met",
     "−0.03 ns: increase the clock period",
     "+0.03 ns: met"],
    "AAT = 0.5 + 0.10 + 0.12 = 0.72 ns. Required = 0.7 + 0.05 = 0.75 ns. Slack = −0.03 ns. Changing the period never fixes hold.");
  q("d", "STA slide 43",
    "T = 2.5 ns, t<sub>su</sub> = 0.10 ns, t<sub>cq</sub> = 0.15 ns, zero skew. The largest combinational delay that still meets setup is",
    ["2.25 ns", "2.50 ns", "2.35 ns", "2.40 ns"],
    "T<sub>comb</sub> ≤ T − t<sub>su</sub> − t<sub>cq</sub> = 2.5 − 0.25 = 2.25 ns.");
  q("d", "STA slides 2–3",
    "Which statement about STA versus dynamic simulation is correct?",
    ["STA needs no input vectors, covers every path and is deliberately pessimistic",
     "STA needs a full set of test vectors to reach 100% coverage",
     "Dynamic simulation is the signoff authority for timing",
     "STA is optimistic so that silicon is faster than reported"],
    "STA propagates arrival and required times through a timing graph. With worst-case delays everywhere, a pass in STA means the silicon works.");
  q("d", "STA slides 79–82",
    "A synchronizer runs at 500 MHz (T = 2 ns) and τ = 100 ps. Adding a third flop multiplies the MTBF by about",
    ["e<sup>20</sup> ≈ 5×10<sup>8</sup>", "e<sup>2</sup> ≈ 7.4", "20", "1.5"],
    "MTBF ∝ e<sup>T<sub>met</sub>/τ</sup>, and each stage adds about one period: T/τ = 2 ns / 0.1 ns = 20, giving a factor of e<sup>20</sup>.");
  q("d", "STA slide 85",
    "A synchronised Gray pointer reads 1101. The binary value is",
    ["1001", "1101", "1011", "0110"],
    "B<sub>3</sub> = G<sub>3</sub> = 1; B<sub>2</sub> = 1⊕1 = 0; B<sub>1</sub> = 0⊕0 = 0; B<sub>0</sub> = 0⊕1 = 1 → 1001 (decimal 9).");
  q("d", "STA slide 87",
    "A one-cycle pulse from a fast domain must reach a slower domain. The correct structure is",
    ["toggle flop (pulse → level) → 2-FF synchronizer → XOR edge detect",
     "a 2-FF synchronizer directly on the pulse",
     "an asynchronous FIFO with binary pointers",
     "set_false_path, with no logic"],
    "A narrow pulse can fall between two slow edges and be missed. Converting it to a level first makes it impossible to miss. Source pulses must be at least 2 destination cycles apart.");
  q("d", "STA slide 105",
    "A 10-deep path has 3.0 ns of cell delay. Flat OCV uses late = 1.10; the AOCV table gives 1.06 at depth 10. AOCV gives back",
    ["0.12 ns", "0.30 ns", "0.18 ns", "0.04 ns"],
    "Flat: 3.0 × 1.10 = 3.30 ns. AOCV: 3.0 × 1.06 = 3.18 ns. Difference 0.12 ns.");
  q("d", "STA slides 110–111",
    "A POCV report shows nominal slack +0.12 ns and path σ = 0.05 ns, signed off at 3σ. The result is",
    ["−0.03 ns: fails at 3σ even though the nominal slack is positive",
     "+0.12 ns: met",
     "+0.27 ns: met",
     "−0.15 ns: fails"],
    "3σ slack = 0.12 − 3 × 0.05 = −0.03 ns. A large σ can fail a nominally positive path.");
  q("d", "STA slides 104–105",
    "Compared with flat OCV, AOCV derates are",
    ["higher for very short paths and lower for deep paths",
     "lower for every path",
     "the same for every depth",
     "higher for deep paths, because more gates add more variation"],
    "Relative variation falls as 1/√N, so deep paths average out. At depth 1 the AOCV late derate (1.15) is above flat 1.10.");
  q("d", "STA slide 119",
    "The guardbands are OCV 6%, IR 3%, aging 2%, jitter 2%, temperature 1% and signoff buffer 1%. On a 2 ns clock they consume",
    ["0.30 ns", "0.15 ns", "0.03 ns", "0.60 ns"],
    "The total is 15% of the period: 0.15 × 2 ns = 0.30 ns.");
  q("d", "Analog §I.11; RTL T14",
    "A block burns 10 mW of dynamic power. V<sub>DD</sub> is lowered from 1.0 V to 0.8 V and the clock is halved. The new dynamic power is",
    ["3.2 mW", "4.0 mW", "6.4 mW", "8.0 mW"],
    "P ∝ V²f: 10 × 0.64 × 0.5 = 3.2 mW.");
  q("d", "STA slides 48–49",
    "Why is an integrated clock-gating (ICG) cell built around a latch?",
    ["The latch is transparent while CLK is low and closed while it is high, so EN cannot change GCLK mid-pulse (no glitch)",
     "The latch makes the gated clock run faster",
     "The latch removes the need for a setup check on EN",
     "The latch converts the clock to a 50% duty cycle"],
    "GCLK = CLK ∧ Q<sub>latch</sub>, and Q cannot change while CLK is high. STA still checks EN setup and hold (the clock-gating check).");
  q("d", "STA slides 53–54",
    "In <code>set_input_delay</code> / <code>set_output_delay</code>, the <code>-max</code> and <code>-min</code> values are used for",
    ["-max for setup checks and -min for hold checks",
     "-max for hold checks and -min for setup checks",
     "both for setup only",
     "power analysis only"],
    "-max is the worst-case late arrival (setup); -min is the best-case early one (hold). Forgetting the min output delay is a common mistake.");
  q("d", "STA slide 67",
    "The clock edge is at 2.0 ns, the removal time is 0.1 ns, and the reset de-asserts at 2.05 ns. The removal check gives",
    ["−0.05 ns: violated", "+0.05 ns: met", "+0.15 ns: met", "−0.15 ns: violated"],
    "Slack = de-assert − (edge + T<sub>rem</sub>) = 2.05 − 2.10 = −0.05 ns. Like hold, it is fixed by delaying the release, not by changing frequency.");
  q("d", "ASIC flow T25",
    "Logical equivalence checking (LEC) between RTL and a netlist works by",
    ["mapping key points (flops, ports, black boxes) and proving each logic cone equal mathematically, with no vectors",
     "running the UVM regression on both views",
     "comparing the GDS with the schematic",
     "measuring timing on both views"],
    "LEC runs after synthesis, DFT, every PnR netlist and every ECO. SVF guide files explain renames and retiming.");
  q("d", "STA slides 46, 56, 61",
    "Which statement about <code>set_false_path</code> is correct?",
    ["It removes the path from timing entirely and outranks multicycle and max-delay exceptions, so an over-broad one can hide a real violation",
     "It still checks the path, at a shifted edge",
     "It has lower priority than set_max_delay",
     "It is the right fix for every hold violation"],
    "Priority order: false path > multicycle > max/min delay > default. Document every false path and scope it with -through.");
  q("d", "STA slides 123–124",
    "A path has +20 ps of setup slack without SI. After routing, an opposite-direction aggressor adds 35 ps of delta delay. The setup slack becomes",
    ["−15 ps", "+55 ps", "+20 ps", "−35 ps"],
    "An opposite-direction aggressor slows the victim, so it adds to the setup arrival: 20 − 35 = −15 ps. This is why designs clean before SI can fail after it.");
  q("d", "ASIC flow T53",
    "Metal-density rules (for example 20–80% per window) exist because",
    ["CMP needs uniform metal: too sparse dishes, too dense erodes, and uneven thickness shifts R and C",
     "the router cannot route above 80% density",
     "density sets the antenna ratio",
     "low density causes latch-up"],
    "CMP planarises each layer, and non-uniform density gives non-uniform thickness. Metal fill fixes sparse windows.");
  q("d", "DV T14",
    "Which statement about UVM agents is correct?",
    ["An agent bundles sequencer, driver and monitor; an active agent drives the DUT, a passive one only monitors",
     "A passive agent contains a driver that drives the pins",
     "The scoreboard is part of every agent and drives stimulus",
     "The monitor sends stimulus through the analysis port"],
    "The monitor rebuilds transactions and broadcasts them on an analysis port. The scoreboard compares expected with actual.");
  q("d", "ASIC flow T19",
    "Which fault model needs at-speed patterns, and what is its typical coverage target?",
    ["Transition fault: over 90–95%",
     "Stuck-at: over 99.9% at speed",
     "Bridging: 50%",
     "Transition fault: over 99.99%, measured at low speed"],
    "Stuck-at targets are above 99%. Transition faults catch slow-to-rise or slow-to-fall defects, so they must be launched and captured at speed.");

  q("a", "Analog §II.9",
    "β = μC<sub>ox</sub>W/L = 2 mA/V² and I<sub>D</sub> = 0.25 mA. Using g<sub>m</sub> = √(2βI<sub>D</sub>), g<sub>m</sub> is",
    ["1 mS", "0.5 mS", "2 mS", "0.71 mS"],
    "g<sub>m</sub> = √(2 × 2×10<sup>−3</sup> × 0.25×10<sup>−3</sup>) = √(10<sup>−6</sup>) = 1 mS.");
  q("a", "Analog §II.11",
    "λ = 0.05 V<sup>−1</sup> and I<sub>D</sub> = 100 µA. r<sub>o</sub> and the Early voltage are",
    ["200 kΩ and 20 V", "20 kΩ and 0.05 V", "2 MΩ and 20 V", "200 kΩ and 5 V"],
    "r<sub>o</sub> = 1/(λI<sub>D</sub>) = 1/(5×10<sup>−6</sup>) = 200 kΩ. V<sub>A</sub> = 1/λ = 20 V.");
  q("a", "Analog §II.10",
    "Which statement about the body effect is correct?",
    ["V<sub>SB</sub> > 0 widens the body depletion and raises V<sub>T</sub>; γ rises with N<sub>A</sub> and falls with C<sub>ox</sub>",
     "V<sub>SB</sub> > 0 lowers V<sub>T</sub>",
     "γ is dimensionless and independent of doping",
     "Body taps remove the intentional V<sub>SB</sub> of a source follower"],
    "γ = √(2qε<sub>s</sub>N<sub>A</sub>)/C<sub>ox</sub>, in V<sup>½</sup>. Taps fix unintended resistance, not the source follower's own V<sub>SB</sub>.");
  q("a", "Analog §II.2",
    "An ideal diode (n = 1) at 300 K has its forward voltage raised by 120 mV. Its current increases by about",
    ["100×", "10×", "2×", "1000×"],
    "With n = 1 the current rises 10× per about 60 mV (2.3V<sub>T</sub>). 120 mV is two decades, so 100×.");
  q("a", "Analog §II.3",
    "A diode with n = 2 at 0.5 mA (V<sub>T</sub> ≈ 26 mV). r<sub>d</sub> is about",
    ["104 Ω", "52 Ω", "26 Ω", "13 Ω"],
    "r<sub>d</sub> = nV<sub>T</sub>/I<sub>D</sub> = 52 mV / 0.5 mA = 104 Ω.");
  q("a", "Analog §II.4",
    "τ<sub>F</sub> = 10 ns, I<sub>D</sub> = 2.6 mA, n = 1, V<sub>T</sub> = 26 mV. The diffusion capacitance is",
    ["1 nF", "26 pF", "100 pF", "10 nF"],
    "C<sub>d</sub> = τ<sub>F</sub>I<sub>D</sub>/(nV<sub>T</sub>) = 10 ns × (2.6 mA / 26 mV) = 10 ns × 0.1 S = 1 nF.");
  q("a", "Analog §II.5",
    "Which pairing of breakdown mechanism and temperature coefficient is standard?",
    ["Zener (heavy doping, below about 5 V): negative tempco; avalanche (above about 7 V): positive tempco",
     "Zener: positive tempco; avalanche: negative tempco",
     "Both have zero tempco",
     "Breakdown is always destructive, so tempco does not matter"],
    "Breakdown is not destructive by itself if the device is rated and the power is handled. Leakage rises strongly with temperature.");
  q("a", "Analog §II.6",
    "Why does a Schottky diode switch with much less reverse-recovery charge than a pn diode?",
    ["It stores little minority-carrier charge, though it still has junction capacitance and leakage",
     "It has no junction capacitance at all",
     "Its Q<sub>rr</sub> is a fixed material constant of zero",
     "It conducts only in reverse"],
    "Q<sub>rr</sub> comes from stored minority carriers. It depends on I<sub>F</sub>, dI/dt and temperature; it is not a universal constant.");
  q("a", "Analog §II.13",
    "Effective mobility drops 20% from vertical-field scattering. A constant-mobility square-law estimate overstates I<sub>D</sub> by about",
    ["25%", "20%", "80%", "44%"],
    "The true current is 0.8× the estimate, so the estimate is 1/0.8 = 1.25× the truth, an overstatement of 25%.");
  q("a", "Analog §II.13",
    "Under strong velocity saturation, the drain current",
    ["is ∝ V<sub>OV</sub> (about WC<sub>ox</sub>V<sub>OV</sub>v<sub>sat</sub>) and nearly independent of L",
     "is ∝ V<sub>OV</sub>² and ∝ 1/L",
     "is ∝ V<sub>OV</sub>³",
     "is zero, because carriers stop moving"],
    "Doubling V<sub>OV</sub> doubles I<sub>D</sub> instead of quadrupling it, and g<sub>m</sub> becomes about WC<sub>ox</sub>v<sub>sat</sub>, a constant.");
  q("a", "Analog §II.23",
    "A 2 nm gate oxide has 1 V across it. The oxide field is",
    ["5 MV/cm", "0.5 MV/cm", "50 MV/cm", "2 MV/cm"],
    "E = V/t = 1 V / (2×10<sup>−7</sup> cm) = 5×10<sup>6</sup> V/cm.");
  q("a", "Analog §II.17",
    "R<sub>sh</sub> = 0.1 Ω/□, L = 600 µm, W = 3 µm, current 5 mA. The IR drop and I²R loss are",
    ["100 mV and 0.5 mW", "100 mV and 50 µW", "20 mV and 0.1 mW", "50 mV and 0.5 mW"],
    "Squares = 200, so R = 20 Ω. ΔV = 5 mA × 20 Ω = 100 mV. P = (5 mA)² × 20 Ω = 25×10<sup>−6</sup> × 20 = 0.5 mW.");
  q("a", "Analog §II.19; STA slide 127",
    "Which change does <i>not</i> reduce crosstalk on a victim net?",
    ["Making the aggressor's edge faster",
     "Doubling the spacing to the aggressor",
     "Inserting a grounded shield wire",
     "Upsizing the victim's driver"],
    "Injected current = C<sub>c</sub>·dV/dt, so a faster aggressor injects more. Spacing (C<sub>c</sub> ∝ 1/d), shields and a stronger victim driver all help.");
  q("a", "Analog §II.20",
    "Black's equation with n = 2: current density is halved by widening the line. MTTF becomes",
    ["4× longer", "2× longer", "4× shorter", "unchanged"],
    "MTTF ∝ J<sup>−n</sup> = J<sup>−2</sup>, and (½)<sup>−2</sup> = 4.");
  q("a", "Analog §29",
    "A device near STI has μ<sub>eff</sub> +2% and V<sub>T</sub> −4 mV at V<sub>OV</sub> = 0.2 V. Its current error is about",
    ["+6%", "−2%", "+2%", "+4%"],
    "ΔI/I ≈ Δμ/μ − 2ΔV<sub>T</sub>/V<sub>OV</sub> = 0.02 − 2(−0.004)/0.2 = 0.02 + 0.04 = +6%.");
  q("a", "Analog §28",
    "Using the doc's illustrative WPE model ΔV<sub>T</sub> = A·e<sup>−x/L<sub>W</sub></sup> with A = 40 mV and L<sub>W</sub> = 1 µm, a device 2 µm from the well edge shifts by about",
    ["5.4 mV", "14.7 mV", "20 mV", "0.8 mV"],
    "e<sup>−2</sup> ≈ 0.135, so 40 × 0.135 ≈ 5.4 mV. (14.7 mV would be e<sup>−1</sup>.)");
  q("a", "Analog §26",
    "Once a CMOS latch-up has triggered, it stops only when",
    ["the supply current is reduced below the holding current (often by cycling power)",
     "the input transient that triggered it ends",
     "the clock is stopped",
     "the temperature rises"],
    "The SCR regenerates on its own once α<sub>PNP</sub> + α<sub>NPN</sub> → 1 (β<sub>PNP</sub>β<sub>NPN</sub> ≥ 1). The symptom is supply current that stays high after the transient.");
  q("a", "Analog §30",
    "An LDO must give 3.3 V from V<sub>REF</sub> = 1.2 V with R<sub>2</sub> = 40 kΩ. R<sub>1</sub> must be",
    ["70 kΩ", "40 kΩ", "110 kΩ", "23 kΩ"],
    "1 + R<sub>1</sub>/R<sub>2</sub> = 3.3/1.2 = 2.75, so R<sub>1</sub> = 1.75 × 40 k = 70 kΩ.");
  q("a", "Analog §30",
    "C<sub>OUT</sub> = 10 µF with ESR = 0.1 Ω. The ESR zero is at about",
    ["159 kHz", "1 MHz", "15.9 kHz", "1.59 MHz"],
    "f<sub>z</sub> = 1/(2π·ESR·C) = 1/(2π × 10<sup>−6</sup>) ≈ 0.159 × 10<sup>6</sup> Hz = 159 kHz.");
  q("a", "Analog §30",
    "LDO PSRR at low frequency is set mainly by ____, and at high frequency by ____.",
    ["loop gain; parasitic feedthrough and device capacitances",
     "dropout voltage; reference noise",
     "output capacitor ESR; load current",
     "parasitic feedthrough; loop gain"],
    "Loop gain falls with frequency, so parasitic paths take over at high frequency.");
  q("a", "Analog §I.13",
    "A 0.5 nH package path carries a current edge of 2 A/ns. The voltage spike is",
    ["1 V", "0.25 V", "4 V", "10 mV"],
    "V = L·di/dt = 0.5×10<sup>−9</sup> × 2×10<sup>9</sup> = 1 V.");
  q("a", "Analog §I.2",
    "A block draws 25 mA from 1.8 V and the power budget is 60 mW. The margin left is",
    ["15 mW", "45 mW", "35 mW", "24 mW"],
    "P = 1.8 × 25 = 45 mW, and 60 − 45 = 15 mW.");
  q("a", "Analog §I.4",
    "Which statement about PDK qualification is correct?",
    ["A PDK that installs cleanly still needs DRC/LVS/PEX qualified on known-good test cells and the versions locked",
     "If the PDK installs without errors, its LVS mapping is proven correct",
     "Corner model mappings never need to be recorded",
     "Mixing PDK versions between tools is acceptable"],
    "Qualification means one-device I–V sweeps across corners, rule-deck validation on test cells, recorded tool versions and documented model limits.");

  q("o", "STA slide 136",
    "The setup signoff corner is",
    ["SS, V<sub>DD</sub> min, 125 °C (plus −40 °C for temperature inversion), RC<sub>max</sub>",
     "FF, V<sub>DD</sub> max, −40 °C, RC<sub>min</sub>",
     "TT, nominal, 25 °C only",
     "FF, V<sub>DD</sub> min, 125 °C"],
    "Setup is checked where the data path is slowest.");
  q("o", "DV T06",
    "A SystemVerilog <code>function</code>, unlike a <code>task</code>,",
    ["returns a value and cannot consume simulation time",
     "can contain # delays and @ events",
     "never returns a value",
     "must be declared inside a class"],
    "Tasks can wait (#, @, wait) and return no value.");
  q("o", "ASIC flow T61",
    "An MPW (multi-project wafer) is used because",
    ["several designs share one mask set, so prototypes are cheap",
     "it gives the highest wafer volume",
     "it skips DRC at the foundry",
     "it avoids the need for GDS"],
    "A full advanced-node mask set costs millions of dollars; an MPW shares it.");
  q("o", "ASIC flow T06",
    "An SRAM compiler macro or a PLL is normally delivered as",
    ["hard IP: GDS + LEF + .lib", "soft IP: synthesizable RTL", "an SDC file", "a UVM agent"],
    "Hard IP is fixed layout, silicon-proven and node-specific.");
  q("o", "Analog §II.2",
    "The thermal voltage kT/q at 300 K is about",
    ["25.85 mV", "0.7 V", "59.6 mV", "1.12 V"],
    "59.6 mV is 2.3kT/q per decade; 0.7 V is a typical silicon diode drop.");

  /* ================================ PAPER 3 ================================ */
  startPaper("Paper 3");

  q("d", "STA slides 19, 37",
    "At 1 GHz: t<sub>cq</sub> = 0.08 ns, logic 0.70 ns, t<sub>su</sub> = 0.05 ns, setup uncertainty 0.10 ns, zero skew. The setup slack is",
    ["+0.07 ns", "+0.17 ns", "−0.03 ns", "+0.12 ns"],
    "Slack = 1.0 − 0.05 − 0.10 − (0.08 + 0.70) = 0.85 − 0.78 = +0.07 ns. Uncertainty is subtracted from the required time.");
  q("d", "STA slides 22, 37",
    "t<sub>cq,min</sub> = 0.06 ns, min logic 0.04 ns, t<sub>hold</sub> = 0.03 ns, hold uncertainty 0.05 ns, zero skew. The hold slack is",
    ["+0.02 ns", "−0.02 ns", "+0.07 ns", "+0.12 ns"],
    "AAT = 0.10 ns. Required = 0.03 + 0.05 = 0.08 ns. Slack = +0.02 ns. Uncertainty is added to the hold requirement.");
  q("d", "STA slide 24",
    "T = 5 ns and the critical path has slack −0.5 ns. The highest frequency it can run at is about",
    ["182 MHz", "222 MHz", "200 MHz", "190 MHz"],
    "f<sub>max</sub> = 1/(T − WNS) = 1/5.5 ns ≈ 0.182 GHz = 182 MHz.");
  q("d", "STA slide 19",
    "A path with t<sub>cq</sub> + logic + t<sub>su</sub> = 0.85 ns has +0.15 ns slack at 1 GHz. At 1.25 GHz the slack is",
    ["−0.05 ns", "+0.15 ns", "−0.35 ns", "+0.05 ns"],
    "T = 1/1.25 GHz = 0.8 ns, and 0.8 − 0.85 = −0.05 ns. Raising frequency hurts only setup.");
  q("d", "STA slides 44, 57",
    "T = 2 ns. A path has <code>-setup 2 / -hold 1</code>, t<sub>cq</sub> = 0.1 ns and t<sub>su</sub> = 0.1 ns. The largest logic delay allowed is",
    ["3.8 ns", "1.8 ns", "4.0 ns", "3.9 ns"],
    "Capture moves to the 2nd edge: 2 × 2 − 0.1 − 0.1 = 3.8 ns.");
  q("d", "STA slide 83",
    "In a 4-phase req/ack handshake carrying a multi-bit bus across domains,",
    ["REQ and ACK each get a 2-FF synchronizer; the DATA bus does not, because the protocol holds it stable",
     "every DATA bit gets its own 2-FF synchronizer",
     "only DATA is synchronised; REQ and ACK cross directly",
     "no synchronizers are needed if the clocks are close in frequency"],
    "Sender: DATA then REQ. Receiver: sync REQ, sample DATA, raise ACK. Sender: sync ACK, drop REQ. Receiver: drop ACK. One datum per round trip.");
  q("d", "STA slide 142",
    "Data reaches a transparent latch at 2.3 ns; the required time (closing edge minus setup) would be 2.0 ns if it were a flop, and the latch is open 0.5 ns longer. Which statement is correct?",
    ["The path borrows 0.3 ns and passes; the next stage loses 0.3 ns",
     "It fails by 0.3 ns, because latches cannot borrow",
     "It borrows 0.5 ns, the full window",
     "It passes with no effect on the next stage"],
    "Slack = RAT + borrow window − AAT. Only the needed 0.3 ns is borrowed, and the next stage pays for it.");
  q("d", "STA slides 101–103",
    "A hold path shows −0.02 ns with OCV derates late 1.08 and early 0.92. The common clock segment is 0.4 ns. After CRPR the slack is",
    ["+0.044 ns", "+0.012 ns", "−0.02 ns", "+0.084 ns"],
    "Credit = 0.4 × (1.08 − 0.92) = 0.064 ns, and −0.02 + 0.064 = +0.044 ns. (+0.012 is the slide's ÷2 error.)");
  q("d", "STA slides 138–141",
    "A path shows −10 ps in GBA and +5 ps in PBA exhaustive mode. What should be done?",
    ["Nothing: PBA is the more accurate signoff result, so no fix is needed",
     "Insert buffers to fix the 10 ps",
     "Raise the clock period by 10 ps",
     "Run GBA again until it passes"],
    "GBA pairs worst arrival with worst slew at every node. PBA recomputes per path; typically 30–60% of GBA violations disappear.");
  q("d", "STA slides 96, 135",
    "At an advanced node and low V<sub>DD</sub>, some paths are slower at −40 °C than at 125 °C. The cause and the signoff consequence are",
    ["V<sub>T</sub> rises in the cold more than mobility improves, so setup must also be checked at SS, V<sub>DD</sub> min, −40 °C",
     "Mobility falls in the cold, so only hold needs a cold check",
     "NBTI aging, so only end-of-life models matter",
     "Nothing changes: hot is always the setup worst case"],
    "This is temperature inversion. The slides blame NBTI or falling mobility; the real cause is V<sub>T</sub> rising at low temperature, which outweighs the mobility gain at low overdrive.");
  q("d", "ASIC flow T44",
    "Average current 200 mA flows through an effective grid resistance of 0.25 Ω at V<sub>DD</sub> = 0.8 V. The static IR drop as a fraction of V<sub>DD</sub> is",
    ["6.25%: inside a typical 5–10% budget", "5%: exactly at the limit", "0.625%", "50%"],
    "ΔV = 0.2 A × 0.25 Ω = 50 mV, and 50/800 = 6.25%.");
  q("d", "STA slide 82",
    "A 3-flop synchronizer is preferred over a 2-flop one when",
    ["the destination clock is above about 500 MHz, the design is safety-critical, or τ is large",
     "the signal is a multi-bit bus",
     "the clocks are synchronous",
     "lower latency is required"],
    "The extra stage adds about T<sub>clkB</sub>/τ to the MTBF exponent, at the cost of one more cycle of latency.");
  q("d", "ASIC flow T26; Analog §I.9",
    "Standard cells occupy 1.4 mm² and the target utilisation is 70%. The core area should be about",
    ["2.0 mm²", "0.98 mm²", "1.4 mm²", "2.4 mm²"],
    "A<sub>core</sub> ≈ cell area / utilisation = 1.4/0.7 = 2.0 mm².");
  q("d", "ASIC flow T32; RTL T14",
    "2000 flops have 2 fF of clock-pin capacitance each, and the clock tree adds 6 pF of wire. At V<sub>DD</sub> = 1 V and 500 MHz (α = 1 for the clock), the clock power is",
    ["5 mW", "2.5 mW", "3 mW", "10 mW"],
    "C = 2000 × 2 fF + 6 pF = 10 pF. P = 1 × 10 pF × 1 V² × 5×10<sup>8</sup> = 5 mW.");
  q("d", "ASIC flow T17–18",
    "24,000 scan flops. With 8 balanced external chains each pattern needs 3000 shift cycles. Compression feeds 200 balanced internal chains instead. Shift time per pattern falls by",
    ["25×", "8×", "200×", "3000×"],
    "24,000/200 = 120 cycles, and 3000/120 = 25×. The deck quotes 50–100× less test data and time with compression.");
  q("d", "ASIC flow T20",
    "Which statement about MBIST is correct?",
    ["An on-chip controller writes and reads every memory cell at speed with March algorithms and produces repair data for eFuses",
     "MBIST replaces scan for logic testing",
     "MBIST only runs in the field, never at wafer sort",
     "Memories are too small to need their own test engine"],
    "Memories are often more than 50% of die area. Redundant rows and columns are mapped in through repair signatures.");
  q("d", "STA slide 90; RTL T09",
    "The recommended reset scheme is",
    ["asynchronous assert, synchronous de-assert, with one reset synchronizer per clock domain",
     "synchronous assert, asynchronous de-assert",
     "fully asynchronous assert and release",
     "a single reset synchronizer shared by all clock domains"],
    "Assertion halts immediately. Release is clocked, so no flop leaves reset at an arbitrary phase, which avoids recovery/removal failures.");
  q("d", "ASIC flow T55",
    "After metal fill is inserted, the team must",
    ["re-extract parasitics with the fill and re-run signoff STA, because fill adds capacitance",
     "skip extraction, because fill is floating",
     "re-run synthesis",
     "remove the fill before tapeout"],
    "Fill changes C and so changes timing. Timing-aware fill keeps away from critical nets.");
  q("d", "ASIC flow T48",
    "Which ECO technique needs no placement change?",
    ["A footprint-compatible V<sub>t</sub> swap (LVT ↔ HVT)",
     "Inserting a new buffer",
     "Re-floorplanning the block",
     "A full-layer spin"],
    "A V<sub>t</sub> swap keeps the cell footprint. The best ECO changes the fewest masks.");
  q("d", "RTL T06",
    "An FSM has 12 states. The minimum flops for binary encoding and the flops for one-hot encoding are",
    ["4 and 12", "3 and 12", "4 and 4", "12 and 4"],
    "Binary needs ⌈log₂12⌉ = 4 flops (2⁴ = 16 ≥ 12); one-hot needs one flop per state.");
  q("d", "RTL T05",
    "<code>always_ff @(posedge clk) begin b = a; c = b; end</code> is changed to use <code>&lt;=</code> for both. The hardware becomes",
    ["a 2-stage shift register a → b → c (with = it collapses: c gets a in the same cycle)",
     "identical, because = and &lt;= synthesise the same",
     "combinational logic",
     "a latch"],
    "Non-blocking assignments read old values, so c gets the previous b. Use &lt;= in sequential blocks and = in combinational blocks.");
  q("d", "DV T08",
    "<code>cp_op</code> has 4 bins and <code>cp_len</code> has 2 bins. <code>cross cp_op, cp_len</code> creates",
    ["8 cross bins", "6 cross bins", "4 cross bins", "2 cross bins"],
    "A cross covers every combination: 4 × 2 = 8.");

  q("a", "Analog §II.8",
    "μC<sub>ox</sub>W/L = 1 mA/V², V<sub>OV</sub> = 0.5 V, V<sub>DS</sub> = 0.2 V. I<sub>D</sub> (triode) is",
    ["80 µA", "100 µA", "125 µA", "60 µA"],
    "I<sub>D</sub> = 1 m[(0.5)(0.2) − 0.2²/2] = 1 m(0.10 − 0.02) = 80 µA. (125 µA is the saturation value.)");
  q("a", "Analog §II.8",
    "V<sub>T</sub> = 0.4 V, V<sub>GS</sub> = 0.9 V, V<sub>DS</sub> = 0.3 V. The device is in",
    ["triode", "saturation", "cutoff", "breakdown"],
    "V<sub>OV</sub> = 0.5 V > V<sub>DS</sub> = 0.3 V, so the channel is not pinched off.");
  q("a", "Analog §II.9",
    "A device in saturation has V<sub>OV</sub> = 0.1 V. Its g<sub>m</sub>/I<sub>D</sub> is",
    ["20 V<sup>−1</sup>", "10 V<sup>−1</sup>", "5 V<sup>−1</sup>", "0.05 V<sup>−1</sup>"],
    "g<sub>m</sub> = 2I<sub>D</sub>/V<sub>OV</sub>, so g<sub>m</sub>/I<sub>D</sub> = 2/0.1 = 20 V<sup>−1</sup>.");
  q("a", "Analog §II.11",
    "Without CLM, ½βV<sub>OV</sub>² = 100 µA. With λ = 0.1 V<sup>−1</sup> at V<sub>DS</sub> = 1.5 V, I<sub>D</sub> is",
    ["115 µA", "100 µA", "150 µA", "101.5 µA"],
    "I<sub>D</sub> = 100 µ × (1 + 0.1 × 1.5) = 115 µA.");
  q("a", "Analog §II.11",
    "A 50 µA mirror output has r<sub>o</sub> = 200 kΩ, and its output voltage swings 0.4 V. The current error is",
    ["4%", "2%", "0.8%", "8%"],
    "ΔI = ΔV/r<sub>o</sub> = 0.4/200 k = 2 µA, and 2/50 = 4%. A cascode or longer L reduces it.");
  q("a", "Analog §II.10",
    "g<sub>m</sub> = 1 mS, γ = 0.4 V<sup>½</sup>, 2φ<sub>F</sub> + V<sub>SB</sub> = 1.0 V. g<sub>mb</sub> is",
    ["0.2 mS", "0.4 mS", "0.1 mS", "0.8 mS"],
    "g<sub>mb</sub> = g<sub>m</sub>γ/(2√(2φ<sub>F</sub> + V<sub>SB</sub>)) = 1 m × 0.4/2 = 0.2 mS.");
  q("a", "Analog §II.1",
    "A p+n junction has N<sub>A</sub> = 10<sup>18</sup> cm<sup>−3</sup> and N<sub>D</sub> = 10<sup>15</sup> cm<sup>−3</sup>. The depletion region",
    ["lies almost entirely on the n side, with x<sub>n</sub>/x<sub>p</sub> = N<sub>A</sub>/N<sub>D</sub> = 1000",
     "lies almost entirely on the p side",
     "is split equally between the two sides",
     "has x<sub>n</sub>/x<sub>p</sub> = N<sub>D</sub>/N<sub>A</sub> = 10<sup>−3</sup>"],
    "Charge neutrality: N<sub>A</sub>x<sub>p</sub> = N<sub>D</sub>x<sub>n</sub>, so depletion extends into the lightly doped side (the one-sided approximation).");
  q("a", "Analog §II.3",
    "Which statement about a diode's small-signal resistance is correct?",
    ["r<sub>d</sub> = nV<sub>T</sub>/I<sub>D</sub> is the local slope; at high current the series resistance R<sub>s</sub> dominates the terminal value",
     "r<sub>d</sub> equals the static ratio V<sub>D</sub>/I<sub>D</sub>",
     "r<sub>d</sub> rises as bias current rises",
     "R<sub>s</sub> matters only at very low current"],
    "r<sub>term</sub> ≈ r<sub>d</sub> + R<sub>s</sub>. Since r<sub>d</sub> ∝ 1/I<sub>D</sub>, R<sub>s</sub> takes over at high current.");
  q("a", "Analog §II.5",
    "A diode in breakdown at 30 V carries 10 mA with R<sub>θJA</sub> = 60 K/W. The steady-state junction temperature rise is",
    ["18 K", "1.8 K", "5 K", "180 K"],
    "P = 30 × 0.01 = 0.3 W, and ΔT = 0.3 × 60 = 18 K. Short pulses need transient Z<sub>θ</sub> instead.");
  q("a", "Analog §II.16",
    "A gate driver supplies 0.5 A to move 10 nC of gate charge across the Miller plateau. The plateau lasts about",
    ["20 ns", "5 ns", "50 ns", "2 ns"],
    "Δt = ΔQ/I<sub>g</sub> = 10 nC / 0.5 A = 20 ns.");
  q("a", "Analog §II.16",
    "V<sub>DS</sub> = 40 V, I<sub>D</sub> = 5 A, t<sub>r</sub> = t<sub>f</sub> = 20 ns, f<sub>sw</sub> = 100 kHz. The switching loss ½V<sub>DS</sub>I<sub>D</sub>(t<sub>r</sub> + t<sub>f</sub>)f<sub>sw</sub> is",
    ["0.4 W", "0.8 W", "0.2 W", "4 W"],
    "½ × 40 × 5 = 100. × 40 ns = 4 µJ. × 100 kHz = 0.4 W.");
  q("a", "Analog §II.19",
    "A floating victim has C<sub>v</sub> = 30 fF and C<sub>c</sub> = 10 fF, with a 1 V aggressor step. Doubling the spacing halves C<sub>c</sub>. The kick goes from",
    ["0.25 V to about 0.14 V", "0.25 V to 0.125 V", "0.33 V to 0.17 V", "0.25 V to 0.20 V"],
    "Before: 10/40 = 0.25 V. After: 5/35 ≈ 0.14 V. Not exactly half, because C<sub>c</sub> is also in the denominator.");
  q("a", "Analog §I.12, II.17",
    "R<sub>sh</sub> = 0.08 Ω/□, L = 400 µm, W = 0.4 µm, total C = 2 pF. The lumped RC is",
    ["160 ps", "16 ps", "1.6 ns", "80 ps"],
    "Squares = 1000, so R = 80 Ω. RC = 80 × 2 pF = 160 ps.");
  q("a", "Analog §II.21, 27",
    "σ(ΔV<sub>T</sub>) = 3 mV at W/L = 2 µm/1 µm. Which size gives 1.5 mV?",
    ["W/L = 4 µm/2 µm", "W/L = 4 µm/1 µm", "W/L = 2 µm/2 µm", "W/L = 1 µm/0.5 µm"],
    "σ ∝ 1/√(WL). Halving σ needs 4× the area: 2 µm² → 8 µm², and 4 × 2 = 8.");
  q("a", "Analog §27",
    "V<sub>T</sub> has a linear gradient of 1 mV per unit pitch, and units sit at x = 0, 1, 2, 3. ΔV<sub>T</sub> between devices A and B for AABB versus ABBA is",
    ["2 mV vs 0 mV", "0 mV vs 2 mV", "1 mV vs 1 mV", "4 mV vs 2 mV"],
    "AABB: mean x<sub>A</sub> = 0.5, x<sub>B</sub> = 2.5, so 2 mV. ABBA: both means are 1.5, so 0 mV.");
  q("a", "Analog §29",
    "Two transistors with identical W/L sit next to different amounts of STI and diffusion edge. Which statement is correct?",
    ["Their I<sub>D</sub> and g<sub>m</sub> can differ, because stress changes mobility and V<sub>T</sub>; equalise SA/SB distances and add dummies",
     "Identical W/L guarantees identical current",
     "Making both devices wider always fixes it",
     "STI stress affects only resistors"],
    "LOD/STI stress depends on active width, trench proximity and orientation. LDE-aware LVS/PEX captures it.");
  q("a", "Analog §30",
    "A PMOS pass device has R<sub>on</sub> = 1 Ω at 150 mA, and V<sub>OUT</sub> = 3.3 V. The minimum V<sub>IN</sub> is about",
    ["3.45 V", "3.30 V", "3.15 V", "4.80 V"],
    "Dropout = I<sub>LOAD</sub>R<sub>on</sub> = 0.15 V, so V<sub>IN(min)</sub> ≈ 3.3 + 0.15 = 3.45 V.");
  q("a", "Analog §30",
    "The LDO's PSRR is 60 dB and the input carries 200 mV of ripple. The output ripple is",
    ["0.2 mV", "2 mV", "3.3 mV", "20 µV"],
    "60 dB = 1000×, and 200 mV / 1000 = 0.2 mV.");
  q("a", "Analog §30",
    "Why must LDO stability be checked at both minimum and maximum load?",
    ["R<sub>out,eff</sub> falls as load current rises, so the output pole 1/(2πR<sub>out,eff</sub>C<sub>out</sub>) moves with load",
     "The reference voltage changes with load",
     "The ESR zero disappears at light load",
     "The dropout voltage is zero at light load"],
    "The pole moves, so phase margin at unity-gain crossover changes. Check the min/max load and C<sub>OUT</sub>/ESR corners.");
  q("a", "Analog §II.24",
    "P = 1.5 W, R<sub>θJA</sub> = 50 K/W, T<sub>a</sub> = 25 °C. The steady-state T<sub>j</sub> is",
    ["100 °C", "75 °C", "50 °C", "125 °C"],
    "T<sub>j</sub> = 25 + 1.5 × 50 = 25 + 75 = 100 °C. This says nothing about local hotspots.");
  q("a", "Analog §I.3; ASIC flow T02",
    "Which technology-selection statement matches the course?",
    ["Pick the cheapest node that meets PPA; a high-voltage switch may need BCD or GaN even if the logic would be smaller in advanced CMOS",
     "Always pick the smallest feature size available",
     "Leading-edge nodes are the most analog-friendly",
     "Breakdown and safe operating area are checked after tape-out"],
    "Mature nodes (40–28 nm) are cheap and analog-friendly. Estimate breakdown and SOA before choosing devices.");
  q("a", "Analog §II.15",
    "C<sub>gs</sub> = 20 fF, C<sub>gd</sub> = 4 fF, A<sub>v</sub> = −19, source resistance 50 kΩ. The input pole is at about",
    ["32 MHz", "159 MHz", "133 MHz", "3.2 MHz"],
    "C<sub>in</sub> = 20 + 4 × 20 = 100 fF. RC = 50 k × 100 f = 5 ns. f = 1/(2π × 5 ns) = 0.159/5 ns ≈ 32 MHz. (133 MHz ignores the Miller term.)");
  q("a", "Analog §I.8",
    "Which statement about corners and Monte Carlo is correct?",
    ["Corners sample global process/voltage/temperature combinations; Monte Carlo estimates statistical variation and does not guarantee field yield",
     "A Monte Carlo pass guarantees 100% field yield",
     "Global process shifts change the ratio of matched devices",
     "Local mismatch is captured fully by the SS and FF corners"],
    "Global shifts move all devices together, so ratios hold. Local gradients and random mismatch set precision, and Monte Carlo needs enough samples and a justified distribution.");

  q("o", "RTL T10; STA slide 91",
    "The standard structure for a single-bit control signal crossing clock domains is",
    ["a 2-FF synchronizer in the destination domain", "an asynchronous FIFO", "a set_multicycle_path", "a clock-gating cell"],
    "Multi-bit data uses a FIFO or a handshake; a single bit uses 2 FF (3 FF if critical).");
  q("o", "RTL T15",
    "The AMBA bus with 5 channels and a VALID/READY handshake is",
    ["AXI", "APB", "AHB", "JTAG"],
    "Use APB for registers, AHB for moderate traffic, and AXI for high bandwidth.");
  q("o", "ASIC flow T45",
    "Electromigration failures typically appear",
    ["in the field, years later", "at wafer sort", "during synthesis", "during the first power-on"],
    "EM is a wear-out mechanism, so it is signed off against a lifetime rule of about 10 years.");
  q("o", "ASIC flow T68",
    "A shmoo plot shows pass/fail across",
    ["supply voltage × frequency", "die position × wafer", "temperature × time", "pattern count × coverage"],
    "It measures F<sub>max</sub> and V<sub>min</sub>, which feed datasheet limits and speed bins.");
  q("o", "ASIC flow T62",
    "Transistors, wells and gates are built in the",
    ["FEOL (front end of line)", "BEOL (back end of line)", "passivation step", "packaging step"],
    "FEOL makes the devices, MEOL the contacts, and BEOL the metal and vias.");

  sections.forEach((s) => { s.count = questions.filter((x) => x.s === s.id).length; });
  return { sections, questions, papers: PAPERS };
})();
