// Analog design MCQ bank (200). Source: the NITW "Semiconductor Chip Design" document and the
// Analog Design short notes. In every q(...) call the CORRECT option is listed first; the app
// shuffles the options on screen, so position in this file means nothing.
window.QUIZ_ANALOG = (() => {
  const sections = [
    { id: "a1", part: "A", title: "Lifecycle, requirements, technology and PDK", src: "Notes I.1–I.4" },
    { id: "a2", part: "A", title: "Budgets, sizing, pre-layout verification and PVT", src: "Notes I.5–I.8" },
    { id: "a3", part: "A", title: "Floorplan, layout, digital timing and parasitics", src: "Notes I.9–I.13" },
    { id: "a4", part: "A", title: "DRC/LVS/ERC, EM/IR, tape-out and after GDS", src: "Notes I.14–I.18" },
    { id: "b1", part: "B", title: "PN junction and diode", src: "Notes II.1–II.6" },
    { id: "b2", part: "B", title: "MOS threshold, square law, gm/ro, body effect", src: "Notes II.7–II.10" },
    { id: "b3", part: "B", title: "CLM, DIBL, velocity saturation, subthreshold", src: "Notes II.11–II.14" },
    { id: "b4", part: "B", title: "MOS capacitances, Miller, gate charge", src: "Notes II.15–II.16" },
    { id: "b5", part: "B", title: "Interconnect R/C, crosstalk, EM and IR drop", src: "Notes II.17–II.20" },
    { id: "b6", part: "B", title: "Matching, LDE, reliability, thermal, mirror study", src: "Notes II.21–II.25" },
    { id: "c1", part: "C", title: "CMOS latch-up", src: "Notes topic 26" },
    { id: "c2", part: "C", title: "Matching layouts, WPE, STI and LOD", src: "Notes topics 27–29" },
    { id: "c3", part: "C", title: "LDO regulator", src: "Notes topic 30" },
  ];
  const questions = [];
  const q = (s, ref, stem, o, why) =>
    questions.push({ n: questions.length + 1, s, q: stem, o, a: 0, why, ref });

  /* ===================== A1 · I.1–I.4 ===================== */
  q("a1", "I.1 Chip lifecycle",
    "The chip development flow from market need to tape-out is best described as",
    ["iterative: a verification failure can force an earlier stage to be revisited",
     "a strict one-way waterfall with no going back",
     "complete as soon as schematic simulation passes",
     "complete as soon as a GDS file exists"],
    "The process is iterative; every transition is a decision gate backed by documents, reviews and version-controlled evidence.");
  q("a1", "I.1 Chip lifecycle",
    "Which ordering of the chip lifecycle is correct?",
    ["Need → requirement → architecture → PDK qualification → design → layout → extraction/sign-off → GDS/OASIS → foundry intake",
     "Need → layout → requirement → architecture → design → GDS → sign-off → foundry intake",
     "Requirement → GDS → design → layout → architecture → sign-off → foundry intake",
     "Need → design → PDK qualification → requirement → layout → foundry intake → sign-off"],
    "Need → requirement → architecture → PDK qualification → design → layout → extraction/sign-off → GDS/OASIS → foundry intake.");
  q("a1", "I.1 Chip lifecycle",
    "A 1.0 V precision analog block meets accuracy in schematic simulation but fails after layout. The most likely cause is",
    ["interconnect parasitics added by the layout",
     "the wafer cost of the chosen foundry",
     "the numbering scheme of the requirements document",
     "too few MPW shuttle slots"],
    "The worked example: schematic accuracy can be lost to interconnect parasitics, so layout (and possibly topology) is revisited before GDS release.");
  q("a1", "I.2 Requirements",
    "A circuit draws 15 mA from a 1.8 V supply. Its power is",
    ["27 mW", "12 mW", "8.33 mW", "120 mW"],
    "P = V<sub>DD</sub>·I<sub>avg</sub> = 1.8 × 15 mA = 27 mW.");
  q("a1", "I.2 Requirements",
    "A block draws 12 mA from 1.2 V and the power budget is 20 mW. How much budget is left for margin or other blocks?",
    ["5.6 mW", "14.4 mW", "8.0 mW", "6.6 mW"],
    "P = 1.2 × 12 mA = 14.4 mW; 20 − 14.4 = 5.6 mW.");
  q("a1", "I.2 Requirements",
    "A block dissipates 10 mW while performing 10<sup>8</sup> operations per second. The energy per operation is",
    ["100 pJ", "1 nJ", "10 pJ", "1 pJ"],
    "E = P / f<sub>operation</sub> = 10 mW / 10<sup>8</sup> s<sup>−1</sup> = 10<sup>−10</sup> J = 100 pJ.");
  q("a1", "I.2 Requirements",
    "When converting customer language into a specification, the requirements team should",
    ["write verifiable metrics with units, conditions, acceptance tests and margin, separating must-haves from aspirational targets and unproven assumptions",
     "copy the customer's wording unchanged so nothing is lost",
     "keep only aspirational targets so the design is ambitious",
     "leave verification conditions to be decided after tape-out"],
    "Requirements must be measurable; must-have limits, aspirational targets and assumptions not yet proven are kept separate.");
  q("a1", "I.3 Technology selection",
    "A product needs a high-voltage power switch plus some digital control logic. The technology most likely chosen is",
    ["BCD or GaN, even though the logic would be smaller in an advanced CMOS node",
     "the most advanced FinFET CMOS node, because smaller is always better",
     "any node, since voltage does not affect technology choice",
     "RF SOI, because it has the smallest feature size"],
    "Technology is chosen on actual voltage, frequency, density, power and reliability needs; the smallest feature size is not necessarily optimal.");
  q("a1", "I.4 PDK",
    "Which of these is NOT part of a process design kit (PDK)?",
    ["the customer's product requirements document",
     "device compact models",
     "parameterized cells (PCells)",
     "DRC/LVS rule decks and extraction settings"],
    "A PDK = compact models, PCells, technology layers, rule decks and extraction settings. The PRD comes from the customer/product team.");
  q("a1", "I.4 PDK",
    "A new PDK installs without any errors. This shows that",
    ["nothing yet about correct LVS mapping or parasitic modelling: every deck must be validated on known-good cells",
     "LVS and PEX are guaranteed correct",
     "the compact models match silicon at all corners",
     "no further qualification is needed"],
    "Passing installation does not prove correct LVS mapping or parasitic modelling; qualify DRC, LVS and PEX on known-good test cells.");
  q("a1", "I.4 PDK",
    "In PDK qualification an NMOS is swept at several V<sub>DS</sub> values and threshold, g<sub>m</sub> and current are compared across TT, SS and FF. TT, SS and FF are",
    ["process model corners: typical, slow and fast devices",
     "temperature points: typical, sub-zero and full-hot",
     "test structures for DRC",
     "three different foundries"],
    "TT/SS/FF are model corners (NMOS/PMOS typical, slow, fast). The qualification report also locks versions and lists known limitations.");

  /* ===================== A2 · I.5–I.8 ===================== */
  q("a2", "I.5 Architecture",
    "Three blocks draw 2 mA, 3.5 mA and 1.5 mA, with 0.5 mA allowed for I/O and leakage. The total current budget is",
    ["7.5 mA", "7.0 mA", "6.5 mA", "3.5 mA"],
    "I<sub>Total</sub> = Σ I<sub>block</sub> + I/O and leakage allowance = 2 + 3.5 + 1.5 + 0.5 = 7.5 mA.");
  q("a2", "I.5 Architecture",
    "Two uncorrelated noise sources of 3 nV/√Hz and 4 nV/√Hz act at the same node. The total noise is",
    ["5 nV/√Hz", "7 nV/√Hz", "1 nV/√Hz", "12 nV/√Hz"],
    "Uncorrelated noise adds in power: v<sub>n</sub> = √(3² + 4²) = 5 nV/√Hz.");
  q("a2", "I.5 Architecture",
    "The rule v<sup>2</sup><sub>n,total</sub> = Σ v<sup>2</sup><sub>n,i</sub> is valid only when the noise sources are",
    ["uncorrelated (independent)", "fully correlated", "at the same frequency", "all thermal noise"],
    "Noise powers add only under the independence assumption; correlated sources add with a cross term.");
  q("a2", "I.5 Architecture",
    "The end-to-end gain and bandwidth of a chain of blocks",
    ["need loading and interface effects, not just the product of ideal block specs",
     "equal the product of the ideal block gains and the smallest bandwidth",
     "depend only on the first block",
     "are set by the PDK, not the architecture"],
    "Loading and interfaces change gain and bandwidth; ideal specs cannot simply be multiplied.");
  q("a2", "I.6 Sizing",
    "With β = μC<sub>ox</sub>W/L = 1 mA/V² and V<sub>OV</sub> = 0.2 V, the square-law saturation current is",
    ["20 µA", "40 µA", "200 µA", "10 µA"],
    "I<sub>D</sub> = ½ β V<sub>OV</sub>² = 0.5 × 1 mA/V² × 0.04 V² = 20 µA.");
  q("a2", "I.6 Sizing",
    "At the bias point, g<sub>m</sub> and r<sub>o</sub> are defined as",
    ["g<sub>m</sub> = ∂I<sub>D</sub>/∂V<sub>GS</sub>, r<sub>o</sub> = (∂I<sub>D</sub>/∂V<sub>DS</sub>)<sup>−1</sup>",
     "g<sub>m</sub> = I<sub>D</sub>/V<sub>GS</sub>, r<sub>o</sub> = V<sub>DS</sub>/I<sub>D</sub>",
     "g<sub>m</sub> = ∂I<sub>D</sub>/∂V<sub>DS</sub>, r<sub>o</sub> = (∂I<sub>D</sub>/∂V<sub>GS</sub>)<sup>−1</sup>",
     "g<sub>m</sub> = ∂V<sub>GS</sub>/∂I<sub>D</sub>, r<sub>o</sub> = ∂I<sub>D</sub>/∂V<sub>DS</sub>"],
    "Small-signal parameters are derivatives at the operating point, not static ratios.");
  q("a2", "I.7 Pre-layout verification",
    "R = 10 kΩ and C = 10 pF form a dominant pole. τ and f<sub>−3dB</sub> are",
    ["100 ns and 1.59 MHz", "100 ns and 10 MHz", "10 ns and 15.9 MHz", "1 µs and 159 kHz"],
    "τ = RC = 100 ns; f = 1/(2πRC) = 1/(6.283 × 10<sup>−7</sup>) ≈ 1.59 MHz.");
  q("a2", "I.7 Pre-layout verification",
    "R = 1 kΩ and C = 1 pF. The dominant-pole bandwidth is about",
    ["159 MHz", "1 GHz", "15.9 MHz", "1.59 GHz"],
    "τ = 1 ns; f = 1/(2π × 1 ns) ≈ 159 MHz.");
  q("a2", "I.7 Pre-layout verification",
    "A circuit shows a stable small-signal AC response. This",
    ["does not guarantee large-signal stability during startup or protection events",
     "guarantees stability in every condition",
     "proves the transient settling time meets spec",
     "makes transient simulation unnecessary"],
    "A stable small-signal response alone does not guarantee large-signal stability during startup or fault events.");
  q("a2", "I.7 Pre-layout verification",
    "Slew rate, overshoot and settling time are checked with which analysis?",
    ["transient", "AC", "DC operating point", "noise"],
    "Transient: startup, overshoot, settling, slew rate, disturbances, faults. DC: region, bias, headroom. AC: gain, poles, zeros.");
  q("a2", "I.8 PVT",
    "A driver with R<sub>eq</sub> = 2 kΩ charges C<sub>load</sub> = 50 fF. Using t<sub>delay</sub> ≈ 0.69 R<sub>eq</sub>C<sub>load</sub>, the delay is",
    ["69 ps", "100 ps", "50 ps", "138 ps"],
    "RC = 2 kΩ × 50 fF = 100 ps; × 0.69 (ln 2) = 69 ps.");
  q("a2", "I.8 PVT",
    "A nominal 100 ns delay grows to 125 ns at the worst characterized corner. The timing budget consumed is",
    ["25 ns", "125 ns", "20 ns", "12.5 ns"],
    "125 − 100 = 25 ns of the budget is used by PVT variation.");
  q("a2", "I.8 PVT",
    "A Monte Carlo run reports a failure rate. Which statement is correct?",
    ["It needs adequate sample size and a justified distribution and is not a guarantee of field yield",
     "It guarantees the field yield of production silicon",
     "It replaces the need for PVT corners",
     "It is valid for any number of samples"],
    "Monte Carlo estimates variability under the PDK's statistical model; it is not a field-yield guarantee.");
  q("a2", "I.8 PVT",
    "Two identical adjacent transistors at the TT corner still differ slightly and randomly. This is",
    ["local mismatch", "a global process corner", "a voltage corner", "a layout DRC error"],
    "Distinguish global process corners (all devices move together), local mismatch (random, pair to pair) and systematic layout-dependent effects.");

  /* ===================== A3 · I.9–I.13 ===================== */
  q("a3", "I.9 Floorplanning",
    "Macro areas total 2 mm² and the target utilization is 60%. The preliminary core area is",
    ["3.33 mm²", "1.2 mm²", "2.6 mm²", "5 mm²"],
    "A<sub>core</sub> ≈ Σ A<sub>blocks</sub> / utilization = 2 / 0.6 = 3.33 mm².");
  q("a3", "I.9 Floorplanning",
    "Which floorplanning practice does the course recommend?",
    ["Separate sensitive analog references from noisy digital switching and plan power return paths before detailed signal routing",
     "Route all signals first and add power later",
     "Place analog references next to the clock tree for short wires",
     "Ignore thermal regions until tape-out"],
    "Separate sensitive analog from switching digital; plan power return paths before detailed signal routing.");
  q("a3", "I.10 Analog layout",
    "For two matched devices A and B, which unit arrangement cancels a linear gradient better?",
    ["A–B–B–A", "A–A–B–B", "A–B–A–B–B–B", "B–B–A–A"],
    "ABBA is common-centroid: both centroids sit at the middle, so a linear gradient cancels. AABB does not.");
  q("a3", "I.10 Analog layout",
    "Which of these does NOT change the operating point of nominally matched transistors?",
    ["the instance name given in the schematic",
     "well proximity and STI stress",
     "orientation and diffusion edges",
     "unequal source/drain routing resistance"],
    "Orientation, well proximity, STI stress, diffusion edges, body ties, routing and thermal gradients all shift operating points.");
  q("a3", "I.10 Analog layout",
    "Unequal source routing resistance between two mirror devices causes current error mainly because it",
    ["changes the effective V<sub>GS</sub> (or V<sub>DS</sub>) of one device",
     "changes the gate oxide thickness",
     "adds a DRC violation",
     "changes the threshold implant dose"],
    "Source/drain series resistance and unequal routing change V<sub>GS</sub> or V<sub>DS</sub> and produce current error.");
  q("a3", "I.11 Digital timing",
    "Which is the setup condition used in the course?",
    ["t<sub>CQ</sub> + t<sub>comb,max</sub> + t<sub>setup</sub> ≤ T<sub>clk</sub> − t<sub>skew</sub>",
     "t<sub>CQ,min</sub> + t<sub>comb,min</sub> ≥ t<sub>hold</sub> + t<sub>skew</sub>",
     "t<sub>CQ</sub> + t<sub>comb,min</sub> ≥ T<sub>clk</sub> + t<sub>setup</sub>",
     "t<sub>setup</sub> + t<sub>hold</sub> ≤ T<sub>clk</sub>"],
    "Setup uses the max path and the clock period; hold uses the min path and does not involve T<sub>clk</sub>.");
  q("a3", "I.11 Digital timing",
    "t<sub>CQ</sub> = 0.2 ns, t<sub>comb,max</sub> = 3.5 ns, t<sub>setup</sub> = 0.1 ns and zero skew. The maximum clock frequency is about",
    ["263 MHz", "286 MHz", "250 MHz", "333 MHz"],
    "T<sub>clk,min</sub> = 0.2 + 3.5 + 0.1 = 3.8 ns → f<sub>max</sub> = 1/3.8 ns ≈ 263 MHz.");
  q("a3", "I.11 Digital timing",
    "A path has a hold violation. Which change fixes it?",
    ["adding delay in the short data path",
     "reducing the clock frequency",
     "increasing the clock period",
     "removing buffers from the data path"],
    "The hold check (t<sub>CQ,min</sub> + t<sub>comb,min</sub> ≥ t<sub>hold</sub> + skew) has no T<sub>clk</sub>, so slowing the clock does not help.");
  q("a3", "I.11 Digital timing",
    "C = 20 pF, V<sub>DD</sub> = 1 V, f = 100 MHz and α = 0.2. The dynamic power is",
    ["0.4 mW", "2 mW", "4 mW", "0.04 mW"],
    "P<sub>dyn</sub> = αCV<sub>DD</sub>²f = 0.2 × 20 pF × 1 × 10<sup>8</sup> = 0.4 mW.");
  q("a3", "I.11 Digital timing",
    "If V<sub>DD</sub> is halved and everything else stays the same, the dynamic power",
    ["falls to one quarter", "halves", "stays the same", "doubles"],
    "P<sub>dyn</sub> ∝ V<sub>DD</sub>².");
  q("a3", "I.12 Interconnect parasitics",
    "A wire of sheet resistance 0.08 Ω/□ is 500 µm long and 2 µm wide and drives 10 pF. R and the simple RC constant are",
    ["20 Ω and 200 ps", "40 Ω and 400 ps", "20 Ω and 2 ns", "10 Ω and 100 ps"],
    "500/2 = 250 squares × 0.08 = 20 Ω; RC = 20 Ω × 10 pF = 200 ps.");
  q("a3", "I.12 Interconnect parasitics",
    "Common file formats for an extracted parasitic netlist are",
    ["DSPF and SPEF", "GDSII and OASIS", "LEF and DEF", "SDC and SDF"],
    "Extraction produces DSPF/SPEF. GDSII/OASIS is the polygon database; SDC holds timing constraints.");
  q("a3", "I.13 Device and package parasitics",
    "A 2 nH package path sees di/dt = 1 A/ns. The inductive spike is",
    ["2 V", "0.5 V", "20 V", "2 mV"],
    "V = L·di/dt = 2 × 10<sup>−9</sup> × 10<sup>9</sup> = 2 V.");
  q("a3", "I.13 Device and package parasitics",
    "A 5 nH bond-wire path sees a current change of 0.2 A in 1 ns. The spike is",
    ["1 V", "0.2 V", "5 V", "25 V"],
    "di/dt = 0.2 A/ns = 2 × 10<sup>8</sup> A/s; V = 5 nH × 2 × 10<sup>8</sup> = 1 V.");

  /* ===================== A4 · I.14–I.18 ===================== */
  q("a4", "I.14 DRC/LVS/ERC",
    "Minimum width, spacing, enclosure, density and via rules are verified by",
    ["DRC", "LVS", "ERC", "PEX"],
    "DRC verifies mask-geometry rules.");
  q("a4", "I.14 DRC/LVS/ERC",
    "A metal line meets every width and spacing rule but connects to the wrong transistor pin. Which check catches it?",
    ["LVS", "DRC", "density check", "antenna check"],
    "DRC can be clean while connectivity is wrong; LVS compares the layout netlist with the schematic.");
  q("a4", "I.14 DRC/LVS/ERC",
    "Floating wells, illegal cross-domain connections and missing tie paths are flagged by",
    ["ERC", "DRC", "LVS", "STA"],
    "ERC checks electrical connectivity and domain conditions.");
  q("a4", "I.15 EM/IR",
    "A 60 mA supply current flows through 3 Ω of path resistance. The IR drop is",
    ["180 mV", "20 mV", "1.8 V", "18 mV"],
    "ΔV = IR = 60 mA × 3 Ω = 180 mV, which may be unacceptable for a 1.0 V analog block.");
  q("a4", "I.15 EM/IR",
    "40 mA flows through a 2.5 Ω supply path to a 1.0 V block. The IR drop as a fraction of the supply is",
    ["10%", "4%", "1%", "25%"],
    "ΔV = 40 mA × 2.5 Ω = 100 mV = 10% of 1.0 V.");
  q("a4", "I.15 EM/IR",
    "The allowable interconnect current density J = I/A<sub>metal</sub> depends on",
    ["the metal stack, duty cycle and temperature",
     "only the wire length",
     "only the supply voltage",
     "nothing: it is one universal number"],
    "Use current PDK EM rules; account for peak vs average current, via arrays and self-heating.");
  q("a4", "I.16 Tape-out",
    "GDSII or OASIS represents",
    ["the final polygon layout database",
     "the transistor-level netlist",
     "the timing constraints",
     "the extracted parasitic netlist"],
    "GDSII/OASIS = final polygon database; manufacturing also needs correct layers, top cell, stream-out maps and foundry documents.");
  q("a4", "I.16 Tape-out",
    "A clean GDS file exists but the stream-layer mapping is wrong. Then",
    ["the manufacturing intent can be corrupted despite a locally clean layout, so tape-out is not complete",
     "tape-out is complete because a GDS file exists",
     "the foundry automatically corrects the mapping",
     "only LVS needs to be rerun"],
    "Tape-out is a controlled release; a GDS file existing is not enough.");
  q("a4", "I.16 Tape-out",
    "Which items must be confirmed before tape-out?",
    ["top cell, units, seal ring, pad ring, density fill and ESD",
     "marketing datasheet and price list",
     "wafer-probe yield and burn-in results",
     "RTL lint and code coverage only"],
    "Confirm top cell, hierarchy, units, precision, labels, seal ring, pad ring, density fill, ESD and mandatory foundry checks.");
  q("a4", "I.17 Traceability",
    "The traceability chain used in engineering reviews is",
    ["requirement ID → design block → simulation/test ID → result → release version",
     "release version → requirement ID → layout → GDS",
     "schematic → layout → requirement → test",
     "test result → customer → architecture → PDK"],
    "Every performance claim links to an owner, a test, an environment and archived evidence.");
  q("a4", "I.17 Change control",
    "A pad is swapped at the last minute. What is affected?",
    ["pin labels, package maps, LVS, ESD behaviour, IO test assumptions and release data",
     "only the pin labels",
     "only the schematic symbol",
     "nothing, if DRC is still clean"],
    "Late changes need impact assessment and requalification of every affected check.");
  q("a4", "I.18 After GDS",
    "A simulated 10 mΩ switch misses its system performance on the board. The most likely reason is",
    ["package/PCB resistance dominates the on-resistance",
     "the GDS file was too large",
     "the DRC deck was out of date",
     "the switch was simulated at the TT corner"],
    "Post-silicon tests expose package/PCB parasitics that the chip-level simulation did not include.");
  q("a4", "I.18 After GDS",
    "Which statement is correct?",
    ["Tape-out success, first-silicon functionality, wafer yield, qualification and commercial readiness are all different milestones",
     "A successful tape-out means the product is qualified",
     "Wafer probe proves long-term reliability",
     "First silicon working means the yield is high"],
    "The course separates these milestones; wafer probe gives die-level yield and parametric distributions.");

  /* ===================== B1 · II.1–II.6 ===================== */
  q("b1", "II.1 PN junction",
    "The depletion region of a pn junction is made of",
    ["fixed ionized dopants left after carriers diffuse across and recombine",
     "free electrons and holes in equal numbers",
     "the metal contacts",
     "mobile majority carriers only"],
    "Diffusion and recombination leave fixed ionized dopants, producing the space-charge region and the internal field.");
  q("b1", "II.1 PN junction",
    "A junction has N<sub>A</sub> = 10<sup>17</sup> cm<sup>−3</sup> and N<sub>D</sub> = 10<sup>15</sup> cm<sup>−3</sup>. The ratio x<sub>n</sub>/x<sub>p</sub> is",
    ["100, so the depletion is mostly on the n side",
     "0.01, so the depletion is mostly on the p side",
     "1",
     "10"],
    "Charge neutrality N<sub>A</sub>x<sub>p</sub> = N<sub>D</sub>x<sub>n</sub> → x<sub>n</sub>/x<sub>p</sub> = N<sub>A</sub>/N<sub>D</sub> = 100. Depletion extends into the lightly doped side.");
  q("b1", "II.1 PN junction",
    "N<sub>A</sub> = N<sub>D</sub> = 10<sup>16</sup> cm<sup>−3</sup>, n<sub>i</sub> = 10<sup>10</sup> cm<sup>−3</sup>, kT/q = 25.9 mV. V<sub>bi</sub> is about",
    ["0.72 V", "0.36 V", "0.95 V", "1.10 V"],
    "V<sub>bi</sub> = (kT/q) ln(N<sub>A</sub>N<sub>D</sub>/n<sub>i</sub>²) = 0.0259 × ln(10<sup>12</sup>) = 0.0259 × 27.6 ≈ 0.72 V.");
  q("b1", "II.1 PN junction",
    "In a one-sided junction, the total potential (V<sub>bi</sub> − V<sub>D</sub>) across the depletion region is made four times larger. The width W",
    ["doubles", "quadruples", "halves", "stays the same"],
    "W ≈ √[2ε<sub>s</sub>(V<sub>bi</sub> − V<sub>D</sub>)/(qN<sub>D</sub>)], so W ∝ √(V<sub>bi</sub> − V<sub>D</sub>).");
  q("b1", "II.1 PN junction",
    "As the reverse voltage across a diode increases",
    ["W increases and the depletion capacitance drops",
     "W decreases and the capacitance rises",
     "W and the capacitance both increase",
     "nothing changes"],
    "V<sub>D</sub> becomes more negative → W grows → C<sub>j</sub> = ε/W falls.");
  q("b1", "II.2 Diode I–V",
    "The thermal voltage kT/q at 300 K is about",
    ["25.85 mV", "59.6 mV", "0.7 V", "2.585 mV"],
    "V<sub>T</sub> = kT/q ≈ 25.85 mV at 300 K.");
  q("b1", "II.2 Diode I–V",
    "n = 2, I<sub>S</sub> = 1 nA and V<sub>D</sub> = 0.60 V at 300 K. The diode current is about",
    ["0.11 mA", "11 mA", "1.1 µA", "0.11 A"],
    "nV<sub>T</sub> = 51.7 mV; 0.6/0.0517 = 11.6; e<sup>11.6</sup> ≈ 1.1 × 10<sup>5</sup>; I<sub>D</sub> ≈ 1 nA × 1.1 × 10<sup>5</sup> ≈ 0.11 mA.");
  q("b1", "II.2 Diode I–V",
    "For an ideal diode (n = 1) at 300 K, the forward voltage change for a 10× change in current is about",
    ["60 mV", "26 mV", "120 mV", "0.7 V"],
    "ΔV = nV<sub>T</sub> ln 10 = 25.85 mV × 2.303 ≈ 59.5 mV per decade.");
  q("b1", "II.2 Diode I–V",
    "At very low forward current the ______ changes the ideality factor; at high current the ______ becomes important.",
    ["recombination; series resistance",
     "series resistance; recombination",
     "avalanche; tunnelling",
     "diffusion capacitance; leakage"],
    "Moderate current: diffusion dominates (n ≈ 1). Low current: recombination (n → 2). High current: R<sub>s</sub>.");
  q("b1", "II.3 Diode r<sub>d</sub>",
    "A diode with n = 1.5 is biased at 1 mA at 300 K. Its small-signal resistance r<sub>d</sub> is",
    ["38.8 Ω", "25.9 Ω", "3.88 Ω", "600 Ω"],
    "r<sub>d</sub> = nV<sub>T</sub>/I<sub>D</sub> = 1.5 × 25.85 mV / 1 mA = 38.8 Ω.");
  q("b1", "II.3 Diode r<sub>d</sub>",
    "An ideal diode (n = 1) is biased at 2 mA at 300 K. r<sub>d</sub> is about",
    ["12.9 Ω", "25.9 Ω", "51.7 Ω", "350 Ω"],
    "r<sub>d</sub> = 25.85 mV / 2 mA ≈ 12.9 Ω.");
  q("b1", "II.3 Diode r<sub>d</sub>",
    "The diode small-signal resistance r<sub>d</sub> is",
    ["the inverse slope dV/dI at the operating point, not the static ratio V<sub>D</sub>/I<sub>D</sub>",
     "the static ratio V<sub>D</sub>/I<sub>D</sub>",
     "independent of bias current",
     "equal to the series resistance R<sub>s</sub>"],
    "r<sub>d</sub> = nV<sub>T</sub>/I<sub>D</sub> describes small changes around the bias; R<sub>s</sub> adds in series.");
  q("b1", "II.4 Diode capacitance",
    "C<sub>j0</sub> = 12 pF, V<sub>bi</sub> = 0.8 V, abrupt junction (m = ½), V<sub>D</sub> = −3.2 V. C<sub>j</sub> is",
    ["5.37 pF", "2.4 pF", "6 pF", "26.8 pF"],
    "C<sub>j</sub> = C<sub>j0</sub>/(1 − V<sub>D</sub>/V<sub>bi</sub>)<sup>½</sup> = 12/√(1 + 4) = 12/√5 = 5.37 pF.");
  q("b1", "II.4 Diode capacitance",
    "C<sub>j0</sub> = 10 pF, V<sub>bi</sub> = 0.75 V, m = ½, reverse bias 2.25 V. C<sub>j</sub> is",
    ["5 pF", "2.5 pF", "3.3 pF", "10 pF"],
    "1 + 2.25/0.75 = 4; C<sub>j</sub> = 10/√4 = 5 pF.");
  q("b1", "II.4 Diode capacitance",
    "In forward bias, the capacitance that grows in proportion to the diode current is the",
    ["diffusion capacitance C<sub>d</sub> = τ<sub>F</sub>I<sub>D</sub>/(nV<sub>T</sub>)",
     "depletion capacitance",
     "package capacitance",
     "oxide capacitance"],
    "Q<sub>d</sub> ≈ τ<sub>F</sub>I<sub>D</sub>, so C<sub>d</sub> = dQ<sub>d</sub>/dV<sub>D</sub> = τ<sub>F</sub>g<sub>d</sub> ∝ I<sub>D</sub>.");
  q("b1", "II.4 Diode capacitance",
    "τ<sub>F</sub> = 10 ns, I<sub>D</sub> = 1 mA, n = 1 at 300 K. The diffusion capacitance is about",
    ["0.39 nF", "39 pF", "3.9 nF", "10 pF"],
    "g<sub>d</sub> = 1 mA / 25.85 mV = 38.7 mS; C<sub>d</sub> = τ<sub>F</sub>g<sub>d</sub> = 10 ns × 38.7 mS ≈ 387 pF.");
  q("b1", "II.5 Breakdown",
    "Which statement about reverse breakdown is correct?",
    ["It is not inherently destructive if the device is rated for it and dissipates the power safely",
     "It always destroys the junction",
     "It only happens by Zener tunnelling",
     "It happens at the same voltage for every doping"],
    "Zener tunnelling or avalanche impact ionization, depending on doping and field; breakdown is fine within ratings.");
  q("b1", "II.5 Breakdown",
    "A diode clamps at 30 V with 10 mA of avalanche current and R<sub>θJA</sub> = 50 K/W. The steady-state junction temperature rise is",
    ["15 K", "1.5 K", "150 K", "6 K"],
    "P = 30 V × 10 mA = 0.3 W; ΔT<sub>j</sub> = P × R<sub>θJA</sub> = 0.3 × 50 = 15 K.");
  q("b1", "II.5 Breakdown",
    "For a nanosecond ESD pulse, the junction heating should be estimated with",
    ["the transient thermal impedance, not the DC thermal resistance",
     "the DC thermal resistance R<sub>θJA</sub>",
     "the steady-state I²R only",
     "the ambient temperature only"],
    "Pulse conditions need transient thermal impedance; DC R<sub>θ</sub> overestimates the rise for short pulses.");
  q("b1", "II.6 Reverse recovery",
    "A diode has I<sub>rr,peak</sub> = 4 A and t<sub>rr</sub> = 50 ns. Using the triangular approximation, Q<sub>rr</sub> is",
    ["100 nC", "200 nC", "50 nC", "12.5 nC"],
    "Q<sub>rr</sub> ≈ ½ I<sub>rr,peak</sub> t<sub>rr</sub> = 0.5 × 4 × 50 ns = 100 nC.");
  q("b1", "II.6 Reverse recovery",
    "Q<sub>rr</sub> = 30 nC and the reverse voltage is 100 V. The recovery energy per event is about",
    ["3 µJ", "0.3 µJ", "30 µJ", "3 mJ"],
    "E ≈ V<sub>R</sub> × Q<sub>rr</sub> = 100 × 30 nC = 3 µJ (rough, waveform-dependent).");
  q("b1", "II.6 Reverse recovery",
    "Schottky diodes switch fast mainly because they",
    ["store little minority-carrier charge, although they still have junction capacitance and leakage",
     "have zero junction capacitance",
     "have no leakage current",
     "use avalanche conduction"],
    "Reverse recovery comes from stored minority carriers; Schottky diodes have little of it.");

  /* ===================== B2 · II.7–II.10 ===================== */
  q("b2", "II.7 MOS capacitor",
    "The threshold voltage of a MOSFET is",
    ["a convention marking strong inversion, not an abrupt ON/OFF switch",
     "the exact voltage where current becomes zero",
     "the oxide breakdown voltage",
     "the drain saturation voltage"],
    "The gate first depletes then inverts the surface; V<sub>T</sub> is the agreed strong-inversion point. Current still flows below it.");
  q("b2", "II.7 MOS capacitor",
    "At threshold for an nMOS on a p-type body, the surface potential is approximately",
    ["2φ<sub>F</sub>", "φ<sub>F</sub>", "0", "V<sub>FB</sub>"],
    "Strong inversion is defined at ψ<sub>s</sub> ≈ 2φ<sub>F</sub>.");
  q("b2", "II.7 MOS capacitor",
    "t<sub>ox</sub> = 2 nm and ε<sub>ox</sub> = 3.45 × 10<sup>−11</sup> F/m. C<sub>ox</sub> is about",
    ["17.3 fF/µm²", "1.73 fF/µm²", "173 fF/µm²", "0.69 fF/µm²"],
    "C<sub>ox</sub> = ε<sub>ox</sub>/t<sub>ox</sub> = 3.45 × 10<sup>−11</sup>/2 × 10<sup>−9</sup> = 1.73 × 10<sup>−2</sup> F/m² = 17.3 fF/µm².");
  q("b2", "II.7 MOS capacitor",
    "N<sub>A</sub> = 10<sup>17</sup> cm<sup>−3</sup>, n<sub>i</sub> = 10<sup>10</sup> cm<sup>−3</sup>, kT/q = 25.9 mV. φ<sub>F</sub> is about",
    ["0.42 V", "0.84 V", "0.21 V", "0.72 V"],
    "φ<sub>F</sub> = (kT/q) ln(N<sub>A</sub>/n<sub>i</sub>) = 0.0259 × ln(10<sup>7</sup>) = 0.0259 × 16.1 ≈ 0.42 V.");
  q("b2", "II.7 MOS capacitor",
    "Reducing t<sub>ox</sub>",
    ["raises C<sub>ox</sub> and shrinks the depletion-charge term of V<sub>T</sub>, but is limited by oxide reliability and gate leakage",
     "lowers C<sub>ox</sub> and raises V<sub>T</sub>",
     "has no effect on V<sub>T</sub>",
     "reduces gate leakage"],
    "V<sub>T</sub> ≈ V<sub>FB</sub> + 2φ<sub>F</sub> + √(4qε<sub>s</sub>N<sub>A</sub>φ<sub>F</sub>)/C<sub>ox</sub>: larger C<sub>ox</sub> shrinks the last term.");
  q("b2", "II.8 Square law",
    "An nMOS is in saturation when",
    ["V<sub>GS</sub> > V<sub>T</sub> and V<sub>DS</sub> ≥ V<sub>GS</sub> − V<sub>T</sub>",
     "V<sub>GS</sub> > V<sub>T</sub> and V<sub>DS</sub> < V<sub>GS</sub> − V<sub>T</sub>",
     "V<sub>GS</sub> < V<sub>T</sub>",
     "V<sub>DS</sub> = 0"],
    "Pinch-off is reached near the drain when V<sub>DS</sub> ≈ V<sub>GS</sub> − V<sub>T</sub> = V<sub>OV</sub>.");
  q("b2", "II.8 Square law",
    "V<sub>GS</sub> = 1.0 V, V<sub>T</sub> = 0.4 V, V<sub>DS</sub> = 0.3 V. The nMOS is in",
    ["the triode (linear) region", "saturation", "cutoff", "breakdown"],
    "V<sub>OV</sub> = 0.6 V and V<sub>DS</sub> = 0.3 V < 0.6 V → triode.");
  q("b2", "II.8 Square law",
    "μ<sub>n</sub>C<sub>ox</sub> = 200 µA/V², W/L = 10, V<sub>OV</sub> = 0.25 V. The ideal saturation current is",
    ["62.5 µA", "125 µA", "250 µA", "31.25 µA"],
    "I<sub>D,sat</sub> = ½ × 200 × 10 × 0.25² = 62.5 µA.");
  q("b2", "II.8 Square law",
    "μ<sub>n</sub>C<sub>ox</sub> = 100 µA/V², W/L = 20, V<sub>OV</sub> = 0.3 V. The saturation current is",
    ["90 µA", "180 µA", "60 µA", "45 µA"],
    "½ × 100 × 20 × 0.09 = 90 µA.");
  q("b2", "II.8 Square law",
    "μC<sub>ox</sub>W/L = 1 mA/V², V<sub>OV</sub> = 0.5 V, V<sub>DS</sub> = 0.1 V. The triode current is",
    ["45 µA", "50 µA", "125 µA", "5 µA"],
    "I<sub>D</sub> = 1 mA/V² × [0.5 × 0.1 − 0.1²/2] = 1 m × (0.05 − 0.005) = 45 µA.");
  q("b2", "II.8 Square law",
    "In the long-channel square law, doubling the overdrive V<sub>OV</sub> multiplies the saturation current by",
    ["4", "2", "√2", "8"],
    "I<sub>D,sat</sub> ∝ V<sub>OV</sub>².");
  q("b2", "II.9 g<sub>m</sub>, r<sub>o</sub>",
    "I<sub>D</sub> = 100 µA and V<sub>OV</sub> = 0.2 V. g<sub>m</sub> is",
    ["1 mS", "0.5 mS", "2 mS", "20 µS"],
    "g<sub>m</sub> ≈ 2I<sub>D</sub>/V<sub>OV</sub> = 200 µA / 0.2 V = 1 mS.");
  q("b2", "II.9 g<sub>m</sub>, r<sub>o</sub>",
    "I<sub>D</sub> = 200 µA and V<sub>OV</sub> = 0.25 V. g<sub>m</sub> is",
    ["1.6 mS", "0.8 mS", "3.2 mS", "50 µS"],
    "g<sub>m</sub> = 2 × 200 µA / 0.25 V = 1.6 mS.");
  q("b2", "II.9 g<sub>m</sub>, r<sub>o</sub>",
    "I<sub>D</sub> = 100 µA, V<sub>OV</sub> = 0.2 V, λ = 0.08 V<sup>−1</sup>. r<sub>o</sub> and the intrinsic gain are",
    ["125 kΩ and 125 V/V (≈ 42 dB)", "125 kΩ and 62.5 V/V", "12.5 kΩ and 12.5 V/V", "80 kΩ and 80 V/V"],
    "r<sub>o</sub> = 1/(λI<sub>D</sub>) = 1/(8 × 10<sup>−6</sup>) = 125 kΩ; g<sub>m</sub>r<sub>o</sub> = 1 mS × 125 kΩ = 125 → 20 log 125 ≈ 42 dB.");
  q("b2", "II.9 g<sub>m</sub>, r<sub>o</sub>",
    "λ = 0.1 V<sup>−1</sup> and I<sub>D</sub> = 50 µA. r<sub>o</sub> is",
    ["200 kΩ", "20 kΩ", "500 kΩ", "2 MΩ"],
    "r<sub>o</sub> = 1/(0.1 × 50 µA) = 200 kΩ.");
  q("b2", "II.9 g<sub>m</sub>, r<sub>o</sub>",
    "Using g<sub>m</sub> = 2I<sub>D</sub>/V<sub>OV</sub> and r<sub>o</sub> = 1/(λI<sub>D</sub>), with λ = 0.1 V<sup>−1</sup> and V<sub>OV</sub> = 0.2 V the intrinsic gain is",
    ["100", "50", "20", "200"],
    "g<sub>m</sub>r<sub>o</sub> = 2/(λV<sub>OV</sub>) = 2/(0.02) = 100, independent of I<sub>D</sub>.");
  q("b2", "II.9 g<sub>m</sub>, r<sub>o</sub>",
    "At fixed W/L in saturation, doubling I<sub>D</sub> multiplies g<sub>m</sub> by",
    ["√2", "2", "4", "1/2"],
    "g<sub>m</sub> = √(2μC<sub>ox</sub>(W/L)I<sub>D</sub>) ∝ √I<sub>D</sub> at fixed W/L (V<sub>OV</sub> grows by √2 too).");
  q("b2", "II.10 Body effect",
    "Increasing the source-to-body reverse bias V<sub>SB</sub> of an nMOS",
    ["raises V<sub>T</sub>", "lowers V<sub>T</sub>", "does not change V<sub>T</sub>", "raises the mobility"],
    "Reverse bias enlarges the body depletion region, so more gate voltage is needed to reach inversion.");
  q("b2", "II.10 Body effect",
    "γ = 0.40 V<sup>½</sup>, 2φ<sub>F</sub> = 0.70 V, V<sub>SB</sub> = 1.0 V. The threshold shift is about",
    ["0.187 V", "0.40 V", "0.52 V", "0.093 V"],
    "ΔV<sub>T</sub> = γ[√(2φ<sub>F</sub> + V<sub>SB</sub>) − √(2φ<sub>F</sub>)] = 0.40(√1.7 − √0.7) = 0.40(1.304 − 0.837) ≈ 0.187 V.");
  q("b2", "II.10 Body effect",
    "γ = 0.5 V<sup>½</sup>, 2φ<sub>F</sub> = 0.6 V, V<sub>SB</sub> = 1.9 V. ΔV<sub>T</sub> is about",
    ["0.40 V", "0.95 V", "0.79 V", "0.25 V"],
    "0.5(√2.5 − √0.6) = 0.5(1.581 − 0.775) ≈ 0.40 V.");
  q("b2", "II.10 Body effect",
    "The body-effect coefficient γ = √(2qε<sub>s</sub>N<sub>A</sub>)/C<sub>ox</sub> becomes larger when",
    ["the body doping increases or the oxide is thicker",
     "the oxide is thinner",
     "the body doping decreases",
     "V<sub>SB</sub> increases"],
    "γ ∝ √N<sub>A</sub> and ∝ 1/C<sub>ox</sub> ∝ t<sub>ox</sub>. Its unit is V<sup>½</sup>.");
  q("b2", "II.10 Body effect",
    "γ = 0.4 V<sup>½</sup> and 2φ<sub>F</sub> + V<sub>SB</sub> = 1.0 V. g<sub>mb</sub>/g<sub>m</sub> is",
    ["0.2", "0.4", "0.1", "0.8"],
    "g<sub>mb</sub> = g<sub>m</sub>γ/[2√(2φ<sub>F</sub> + V<sub>SB</sub>)] = g<sub>m</sub> × 0.4/2 = 0.2 g<sub>m</sub>.");

  /* ===================== B3 · II.11–II.14 ===================== */
  q("b3", "II.11 Channel-length modulation",
    "Channel-length modulation happens because a higher V<sub>DS</sub>",
    ["expands the drain depletion region toward the source and shortens the effective channel",
     "increases the oxide thickness",
     "lowers the source-channel barrier",
     "saturates the carrier velocity"],
    "This gives a nonzero slope of I<sub>D</sub>–V<sub>DS</sub> in saturation: I<sub>D</sub> ∝ (1 + λV<sub>DS</sub>).");
  q("b3", "II.11 Channel-length modulation",
    "λ = 0.05 V<sup>−1</sup>. The Early-voltage analogue V<sub>A</sub> is",
    ["20 V", "5 V", "0.05 V", "50 V"],
    "V<sub>A</sub> ≈ 1/λ = 20 V.");
  q("b3", "II.11 Channel-length modulation",
    "A 100 µA mirror output has r<sub>o</sub> = 100 kΩ and its output voltage moves by 1 V. The current changes by",
    ["10 µA (a 10% error)", "1 µA (1%)", "100 µA (100%)", "0.1 µA"],
    "ΔI = ΔV/r<sub>o</sub> = 1 V / 100 kΩ = 10 µA.");
  q("b3", "II.11 Channel-length modulation",
    "Which change increases a transistor's output resistance?",
    ["a longer channel or cascoding, at a cost in headroom, area and bandwidth",
     "a shorter channel",
     "a larger drain current",
     "a thinner metal line"],
    "λ falls with L; cascode and regulated cascode raise r<sub>o</sub> but trade headroom, area and bandwidth.");
  q("b3", "II.12 DIBL",
    "Extracted V<sub>T</sub> is 0.42 V at V<sub>DS</sub> = 0.05 V and 0.32 V at V<sub>DS</sub> = 1.05 V. DIBL is",
    ["100 mV/V", "10 mV/V", "320 mV/V", "−100 mV/V"],
    "DIBL = [V<sub>T</sub>(low) − V<sub>T</sub>(high)]/[V<sub>DS,high</sub> − V<sub>DS,low</sub>] = 0.10 V / 1.00 V = 100 mV/V.");
  q("b3", "II.12 DIBL",
    "V<sub>T</sub> = 0.45 V at V<sub>DS</sub> = 0.1 V and 0.39 V at V<sub>DS</sub> = 1.1 V. DIBL is",
    ["60 mV/V", "6 mV/V", "390 mV/V", "40 mV/V"],
    "0.06 V / 1.0 V = 60 mV/V.");
  q("b3", "II.12 DIBL",
    "A positive DIBL value means",
    ["V<sub>T</sub> measured at high drain bias is lower than at low drain bias",
     "V<sub>T</sub> rises with drain bias",
     "the device has no short-channel effects",
     "the gate oxide is leaking"],
    "The drain field lowers the source-channel barrier, so the apparent threshold falls and leakage rises.");
  q("b3", "II.12 DIBL",
    "DIBL becomes stronger when",
    ["the channel is short and the gate's electrostatic control is weak",
     "the channel is long",
     "V<sub>DS</sub> is reduced",
     "the oxide is thinner and the channel longer"],
    "Short channels let the drain field reach the source barrier.");
  q("b3", "II.12 DIBL",
    "At constant V<sub>GS</sub>, a lower V<sub>T</sub> caused by DIBL makes the subthreshold current",
    ["rise exponentially", "rise linearly", "fall", "stay the same"],
    "I<sub>D,sub</sub> ∝ exp[(V<sub>GS</sub> − V<sub>T</sub>)/(nV<sub>Thermal</sub>)].");
  q("b3", "II.13 Velocity saturation",
    "Under strong velocity saturation, the drain current scales approximately as",
    ["W·C<sub>ox</sub>·V<sub>OV</sub>·v<sub>sat</sub>, linear in V<sub>OV</sub>",
     "V<sub>OV</sub>², as in the square law",
     "exp(V<sub>OV</sub>/nV<sub>T</sub>)",
     "1/V<sub>OV</sub>"],
    "Velocity no longer grows with field, so I<sub>D</sub> → WC<sub>ox</sub>V<sub>OV</sub>v<sub>sat</sub> (closer to linear).");
  q("b3", "II.13 Mobility degradation",
    "μ<sub>eff</sub> ≈ μ<sub>0</sub>/[1 + θ(V<sub>GS</sub> − V<sub>T</sub>)] with θ = 0.5 V<sup>−1</sup> and V<sub>OV</sub> = 0.4 V. μ<sub>eff</sub> is",
    ["0.83 μ<sub>0</sub>", "0.80 μ<sub>0</sub>", "0.67 μ<sub>0</sub>", "1.2 μ<sub>0</sub>"],
    "1 + 0.5 × 0.4 = 1.2; μ<sub>eff</sub> = μ<sub>0</sub>/1.2 ≈ 0.83 μ<sub>0</sub>. Caused by the strong vertical field near the oxide.");
  q("b3", "II.13 Mobility degradation",
    "Mobility drops 25% at the chosen overdrive. A square-law prediction with constant mobility overestimates I<sub>D</sub> by roughly",
    ["one-third", "one-quarter", "half", "two times"],
    "Real current is 0.75 of predicted, so the prediction is 1/0.75 = 1.33×: about one-third too high.");
  q("b3", "II.14 Subthreshold",
    "The subthreshold swing S is",
    ["the gate-voltage change needed for one decade of drain-current change",
     "the drain-voltage change per decade of current",
     "the threshold change per volt of V<sub>DS</sub>",
     "the leakage current at V<sub>GS</sub> = 0"],
    "S = (ln 10)·n·V<sub>Thermal</sub> ≈ 59.6n mV/dec at 300 K.");
  q("b3", "II.14 Subthreshold",
    "The ideal room-temperature lower limit of S for a conventional MOSFET is about",
    ["60 mV/dec", "26 mV/dec", "100 mV/dec", "0.7 V/dec"],
    "n = 1 gives 59.6 mV/dec; real devices have n > 1, so S is larger.");
  q("b3", "II.14 Subthreshold",
    "With n = 1.5 at 300 K, S is about ____ and a 178 mV drop in V<sub>GS</sub> cuts the current by ____.",
    ["89 mV/dec; 100×", "60 mV/dec; 1000×", "89 mV/dec; 10×", "39 mV/dec; 100×"],
    "S = 59.6 × 1.5 ≈ 89 mV/dec; 178 mV = 2 decades → 100×.");
  q("b3", "II.14 Subthreshold",
    "S = 80 mV/dec. Lowering V<sub>GS</sub> by 240 mV reduces the subthreshold current by",
    ["1000×", "100×", "3×", "240×"],
    "240/80 = 3 decades → 10³.");
  q("b3", "II.14 Subthreshold",
    "The ideal subthreshold swing at 400 K is about",
    ["79 mV/dec", "60 mV/dec", "45 mV/dec", "120 mV/dec"],
    "S ∝ T: 59.6 × 400/300 ≈ 79 mV/dec. Leakage gets worse when hot.");
  q("b3", "II.14 Leakage",
    "GIDL, listed among the MOSFET off-state leakage paths, stands for",
    ["gate-induced drain leakage", "gate-isolated diffusion layer", "grounded-input drain latch", "gate-implant depletion loss"],
    "Ioff = subthreshold + junction + gate tunnelling + GIDL + defect paths; measure hot, at max voltage and several body biases.");

  /* ===================== B4 · II.15–II.16 ===================== */
  q("b4", "II.15 Miller",
    "C<sub>gs</sub> = 20 fF, C<sub>gd</sub> = 5 fF, A<sub>v</sub> = −10. The Miller input capacitance is",
    ["75 fF", "70 fF", "25 fF", "55 fF"],
    "C<sub>in</sub> = C<sub>gs</sub> + C<sub>gd</sub>(1 − A<sub>v</sub>) = 20 + 5 × 11 = 75 fF.");
  q("b4", "II.15 Miller",
    "C<sub>in</sub> = 75 fF is driven from R<sub>in</sub> = 100 kΩ. The input pole is about",
    ["21.2 MHz", "133 MHz", "2.12 MHz", "7.5 MHz"],
    "f = 1/(2π × 100 kΩ × 75 fF) = 1/(4.71 × 10<sup>−8</sup>) ≈ 21.2 MHz.");
  q("b4", "II.15 Miller",
    "C<sub>gs</sub> = 50 fF, C<sub>gd</sub> = 10 fF, A<sub>v</sub> = −20. C<sub>in</sub> is",
    ["260 fF", "250 fF", "60 fF", "210 fF"],
    "50 + 10 × 21 = 260 fF.");
  q("b4", "II.15 Miller",
    "R<sub>in</sub> = 10 kΩ drives C<sub>in</sub> = 1 pF. The input pole is about",
    ["15.9 MHz", "100 MHz", "1.59 MHz", "159 MHz"],
    "1/(2π × 10<sup>4</sup> × 10<sup>−12</sup>) = 1/(6.28 × 10<sup>−8</sup>) ≈ 15.9 MHz.");
  q("b4", "II.15 Miller",
    "C<sub>gd</sub> matters more than its size suggests in a common-source stage because",
    ["the stage gain multiplies its effect at the input (Miller effect)",
     "it is always the largest capacitance",
     "it is in parallel with the load",
     "it does not depend on bias"],
    "Current through C<sub>gd</sub> depends on v<sub>in</sub> − v<sub>out</sub>, so the input sees C<sub>gd</sub>(1 − A<sub>v</sub>).");
  q("b4", "II.15 Miller",
    "The Miller approximation can fail",
    ["for nonlinear large-signal switching",
     "for small-signal linear operation",
     "when C<sub>gd</sub> is small",
     "at low frequency"],
    "It assumes a linear stage over the frequency range considered.");
  q("b4", "II.15 MOS capacitances",
    "Which capacitances does a four-terminal MOSFET have?",
    ["C<sub>gs</sub>, C<sub>gd</sub>, C<sub>gb</sub> plus source/drain junction capacitances",
     "only C<sub>gs</sub>",
     "only the oxide capacitance",
     "C<sub>gs</sub> and C<sub>ds</sub> only, independent of bias"],
    "Values depend on bias and layout; extract intrinsic plus overlap/fringing capacitance.");
  q("b4", "II.16 Gate charge",
    "For power MOSFETs, gate charge is preferred to a single C<sub>iss</sub> value because",
    ["the device capacitances vary strongly with voltage",
     "C<sub>iss</sub> is always zero",
     "gate charge does not depend on the driver",
     "power MOSFETs have no C<sub>gd</sub>"],
    "Charge integrates the bias-dependent capacitance over the switching transition.");
  q("b4", "II.16 Gate charge",
    "During the Miller plateau, the gate current mainly",
    ["moves the drain voltage through the gate-drain charge",
     "charges C<sub>gs</sub> to raise V<sub>GS</sub>",
     "flows to the substrate",
     "stops completely"],
    "V<sub>GS</sub> is flat while the gate-drain charge is supplied; drive strength sets switching speed.");
  q("b4", "II.16 Gate charge",
    "A driver supplies a constant 0.5 A to move Q<sub>gd</sub> = 12 nC. The plateau lasts",
    ["24 ns", "6 ns", "2.4 ns", "60 ns"],
    "Δt ≈ ΔQ<sub>g</sub>/I<sub>g</sub> = 12 nC / 0.5 A = 24 ns.");
  q("b4", "II.16 Gate charge",
    "Q<sub>g</sub> = 20 nC, V<sub>drive</sub> = 12 V, f<sub>sw</sub> = 500 kHz. The gate-drive loss is",
    ["0.12 W", "0.24 W", "0.012 W", "1.2 W"],
    "P<sub>gate</sub> ≈ Q<sub>g</sub>V<sub>drive</sub>f<sub>sw</sub> = 20 nC × 12 × 5 × 10<sup>5</sup> = 0.12 W.");
  q("b4", "II.16 Switching loss",
    "V<sub>DS</sub> = 400 V, I<sub>D</sub> = 10 A, t<sub>r</sub> + t<sub>f</sub> = 50 ns, f<sub>sw</sub> = 100 kHz. The linear-overlap switching loss is",
    ["10 W", "20 W", "5 W", "1 W"],
    "P<sub>sw</sub> ≈ ½ × 400 × 10 × 50 ns × 10<sup>5</sup> = 10 W.");

  /* ===================== B5 · II.17–II.20 ===================== */
  q("b5", "II.17 Sheet resistance",
    "Sheet resistance R<sub>sh</sub> of a uniform conductor of resistivity ρ and thickness t is",
    ["ρ/t, so R = R<sub>sh</sub>·L/w", "ρ·t", "ρ/(w·t)", "ρL/w"],
    "R = ρL/(wt) = (ρ/t)(L/w); L/w is the number of squares.");
  q("b5", "II.17 Sheet resistance",
    "R<sub>sh</sub> = 0.08 Ω/□, L = 800 µm, w = 4 µm, I = 2 mA. Resistance, drop and dissipation are",
    ["16 Ω, 32 mV, 64 µW", "16 Ω, 32 mV, 32 µW", "8 Ω, 16 mV, 32 µW", "32 Ω, 64 mV, 128 µW"],
    "200 squares × 0.08 = 16 Ω; ΔV = 2 mA × 16 = 32 mV; P = I²R = 4 × 10<sup>−6</sup> × 16 = 64 µW.");
  q("b5", "II.17 Sheet resistance",
    "R<sub>sh</sub> = 0.05 Ω/□, a line 2 mm long and 5 µm wide. Its resistance is",
    ["20 Ω", "10 Ω", "0.5 Ω", "50 Ω"],
    "2000/5 = 400 squares × 0.05 = 20 Ω.");
  q("b5", "II.17 Sheet resistance",
    "A 10 µm × 10 µm square and a 1 µm × 1 µm square of the same layer have resistances that are",
    ["equal", "100× apart", "10× apart", "impossible to compare"],
    "Any square has resistance R<sub>sh</sub>: that is what Ω/□ means.");
  q("b5", "II.18 RC delay",
    "A uniform wire has R = 2 kΩ and C = 300 fF. The Elmore delay (ideal source, no load) is",
    ["300 ps", "600 ps", "150 ps", "414 ps"],
    "τ<sub>Elmore</sub> ≈ ½R<sub>wire</sub>C<sub>wire</sub> = 0.5 × 2 kΩ × 300 fF = 300 ps.");
  q("b5", "II.18 RC delay",
    "A wire's length is doubled (same width and layer). Its distributed RC delay",
    ["quadruples", "doubles", "stays the same", "halves"],
    "R ∝ L and C ∝ L, so delay ∝ L².");
  q("b5", "II.18 RC delay",
    "The simplest planar estimate of wire capacitance is",
    ["C ≈ εA/d", "C ≈ εd/A", "C ≈ ρL/w", "C ≈ A/(εd)"],
    "Real wire capacitance also depends on fringing and neighbours (coupling).");
  q("b5", "II.19 Crosstalk",
    "C<sub>c</sub> = 5 fF, victim C<sub>v</sub> = 20 fF, aggressor steps 1 V, victim floating. The glitch is",
    ["0.20 V", "0.25 V", "0.80 V", "0.05 V"],
    "ΔV<sub>victim</sub> ≈ C<sub>c</sub>/(C<sub>c</sub> + C<sub>v</sub>) × ΔV<sub>ag</sub> = 5/25 × 1 = 0.20 V.");
  q("b5", "II.19 Crosstalk",
    "C<sub>c</sub> = 10 fF, C<sub>v</sub> = 30 fF and a 1.2 V aggressor step on a floating victim. The kick is",
    ["0.30 V", "0.40 V", "0.90 V", "0.12 V"],
    "10/40 × 1.2 = 0.30 V.");
  q("b5", "II.19 Crosstalk",
    "Which change makes crosstalk worse?",
    ["faster aggressor edge rates",
     "wider spacing between the wires",
     "a grounded shield between them",
     "shorter parallel run length"],
    "i<sub>c</sub> = C<sub>c</sub>·d(V<sub>ag</sub> − V<sub>victim</sub>)/dt grows with edge rate; the other three are the fixes.");
  q("b5", "II.19 Crosstalk",
    "C<sub>c</sub> = 5 fF and the aggressor rises 1 V in 100 ps with the victim held still. The injected current is",
    ["50 µA", "5 µA", "500 µA", "0.5 µA"],
    "i<sub>c</sub> = C<sub>c</sub>dV/dt = 5 fF × 10<sup>10</sup> V/s = 50 µA.");
  q("b5", "II.20 Electromigration",
    "Electromigration is",
    ["gradual metal-atom transport under high current density and temperature",
     "an immediate voltage drop on a supply rail",
     "coupling between two adjacent wires",
     "oxide breakdown under high field"],
    "EM is a long-term wear-out; IR drop is the immediate electrical error.");
  q("b5", "II.20 Electromigration",
    "I = 20 mA in a line 2 µm wide and 0.5 µm thick. The average current density is",
    ["2 × 10<sup>6</sup> A/cm²", "2 × 10<sup>4</sup> A/cm²", "2 × 10<sup>8</sup> A/cm²", "4 × 10<sup>6</sup> A/cm²"],
    "A = 1 µm² = 10<sup>−8</sup> cm²; J = 0.02/10<sup>−8</sup> = 2 × 10<sup>6</sup> A/cm².");
  q("b5", "II.20 Electromigration",
    "In Black's equation MTTF ≈ A·J<sup>−n</sup>·exp(E<sub>a</sub>/kT) with n = 2, doubling the current density",
    ["cuts MTTF to one quarter", "halves MTTF", "doubles MTTF", "does not change MTTF"],
    "MTTF ∝ J<sup>−2</sup>; raising temperature also shortens MTTF through the exponential.");
  q("b5", "II.20 Electromigration",
    "High-current metal networks most often fail",
    ["at transitions, constrictions and poorly distributed via arrays",
     "in the middle of wide uniform straps",
     "only at the bond pads",
     "only at low temperature"],
    "Current crowding makes local J higher than I/A; widening a strap alone does not fix a via bottleneck.");
  q("b5", "II.20 IR drop",
    "10 mA flows through a 50 Ω interconnect. The Joule heating is",
    ["5 mW", "0.5 W", "500 mW", "0.5 mW"],
    "P = I²R = 10<sup>−4</sup> × 50 = 5 mW.");

  /* ===================== B6 · II.21–II.25 ===================== */
  q("b6", "II.21 Pelgrom",
    "A<sub>VT</sub> = 3 mV·µm, W = 10 µm, L = 1 µm. σ(ΔV<sub>T</sub>) is about",
    ["0.95 mV", "0.3 mV", "3 mV", "9.5 mV"],
    "σ(ΔV<sub>T</sub>) ≈ A<sub>VT</sub>/√(WL) = 3/√10 ≈ 0.95 mV.");
  q("b6", "II.21 Pelgrom",
    "A<sub>VT</sub> = 4 mV·µm, W = 4 µm, L = 1 µm. σ(ΔV<sub>T</sub>) is",
    ["2 mV", "1 mV", "4 mV", "0.5 mV"],
    "4/√4 = 2 mV.");
  q("b6", "II.21 Pelgrom",
    "To halve the random threshold mismatch σ(ΔV<sub>T</sub>) of a pair, the gate area must be",
    ["multiplied by 4", "doubled", "halved", "multiplied by √2"],
    "σ ∝ 1/√(WL).");
  q("b6", "II.21 Matching",
    "σ(ΔV<sub>T</sub>) = 0.95 mV in a mirror at V<sub>OV</sub> = 0.2 V. The 1σ current mismatch from threshold alone is about",
    ["0.95%", "0.475%", "1.9%", "9.5%"],
    "ΔI/I ≈ 2ΔV<sub>T</sub>/V<sub>OV</sub> = 2 × 0.95 mV / 200 mV ≈ 0.95%.");
  q("b6", "II.21 Matching",
    "For a fixed ΔV<sub>T</sub>, the current mismatch of a mirror is worst when",
    ["the overdrive V<sub>OV</sub> is small", "the overdrive is large", "the device is in triode", "λ is zero"],
    "ΔI/I ≈ −2ΔV<sub>T</sub>/V<sub>OV</sub>: a geometry or random V<sub>T</sub> offset matters most at small overdrive.");
  q("b6", "II.21 Matching",
    "Common-centroid placement",
    ["reduces some spatial gradients but cannot remove local random mismatch",
     "removes all mismatch, random and systematic",
     "removes random mismatch but not gradients",
     "is only useful for resistors"],
    "Random (Pelgrom) mismatch is statistical and only shrinks with area.");
  q("b6", "II.22 LDE",
    "A layout-induced V<sub>T</sub> difference of 3 mV at V<sub>OV</sub> = 0.20 V gives a current mismatch of about",
    ["3%", "1.5%", "6%", "0.3%"],
    "|ΔI/I| ≈ 2ΔV<sub>T</sub>/V<sub>OV</sub> = 6 mV/200 mV = 3%. The sign depends on which device has the higher V<sub>T</sub>.");
  q("b6", "II.22 LDE",
    "ΔV<sub>T</sub> = 4 mV at V<sub>OV</sub> = 0.1 V gives a current error of about",
    ["8%", "4%", "0.8%", "16%"],
    "2 × 4/100 = 8%.");
  q("b6", "II.23 Oxide",
    "A 5 nm gate oxide has 2.5 V across it. The nominal oxide field is",
    ["5 MV/cm", "0.5 MV/cm", "50 MV/cm", "12.5 MV/cm"],
    "E<sub>ox</sub> ≈ V<sub>ox</sub>/t<sub>ox</sub> = 2.5 V / 5 × 10<sup>−7</sup> cm = 5 × 10<sup>6</sup> V/cm.");
  q("b6", "II.23 Reliability",
    "TDDB refers to",
    ["time-dependent dielectric breakdown: progressive trap formation leading to oxide failure",
     "temperature-dependent diode breakdown",
     "transient drain-to-body discharge",
     "thermal diffusion of dopant boundaries"],
    "Gate-oxide stress causes trap build-up and eventual TDDB.");
  q("b6", "II.23 ESD",
    "To evaluate an ESD pulse on a structure, the course says to use",
    ["the pulse energy E = ∫v(t)i(t)dt, since steady-state I²R is not enough",
     "steady-state I²R only",
     "the DC thermal resistance",
     "the average supply current"],
    "ESD = short high-current pulses; design is pad cells, clamps and low-impedance return paths.");
  q("b6", "II.24 Thermal",
    "A 1.5 W block with R<sub>θJA</sub> = 40 K/W at T<sub>a</sub> = 50 °C has steady-state T<sub>j</sub> of",
    ["110 °C", "60 °C", "90 °C", "80 °C"],
    "T<sub>j</sub> ≈ T<sub>a</sub> + P·R<sub>θJA</sub> = 50 + 60 = 110 °C.");
  q("b6", "II.24 Thermal",
    "2 W, R<sub>θJA</sub> = 25 K/W, T<sub>a</sub> = 25 °C. T<sub>j</sub> is",
    ["75 °C", "50 °C", "100 °C", "52 °C"],
    "25 + 2 × 25 = 75 °C.");
  q("b6", "II.24 Thermal",
    "A higher junction temperature",
    ["increases leakage and metal resistance and shortens EM lifetime",
     "reduces leakage",
     "lowers metal resistance",
     "has no effect on reliability"],
    "Evaluate EM and lifetime at worst-case T<sub>j</sub>; local hotspots can age devices first.");
  q("b6", "II.25 Mirror study",
    "In a mirror, ΔV<sub>T</sub> = +2 mV at V<sub>OV</sub> = 0.20 V, and the output sits 0.5 V above the reference with V<sub>A</sub> = 20 V. Ignoring Δβ, the first-order net error is",
    ["+0.5%", "−4.5%", "+4.5%", "−2%"],
    "ΔI/I ≈ −2ΔV<sub>T</sub>/V<sub>OV</sub> + ΔV<sub>DS</sub>/V<sub>A</sub> = −2% + 2.5% = +0.5%. Such cancellation is not robust across PVT.");
  q("b6", "II.25 Mirror study",
    "The capstone workflow places the mirror devices as",
    ["ABBA with dummies, then DRC/LVS/PEX and rerun the current error",
     "AABB with no dummies",
     "as far apart as possible",
     "on different wells to reduce coupling"],
    "PDK models → compliance range → DC/PVT/MC → ABBA + dummies → matched nets → DRC/LVS/PEX → rerun.");

  /* ===================== C1 · topic 26 ===================== */
  q("c1", "26 Latch-up",
    "Latch-up in bulk CMOS is caused by",
    ["a parasitic PNP–NPN pair forming an SCR with regenerative feedback",
     "gate-oxide breakdown",
     "electromigration in the supply rail",
     "crosstalk between clock wires"],
    "p-substrate, n-well, S/D diffusions and resistive well/substrate paths form a silicon-controlled rectifier.");
  q("c1", "26 Latch-up",
    "Once triggered, latch-up continues until",
    ["the supply current is reduced below the holding current",
     "the input transient ends",
     "the temperature drops",
     "the clock stops"],
    "The SCR stays on while current above the holding value is available.");
  q("c1", "26 Latch-up",
    "In the two-transistor model, regeneration becomes very large as",
    ["α<sub>PNP</sub> + α<sub>NPN</sub> approaches 1",
     "α<sub>PNP</sub> + α<sub>NPN</sub> approaches 0",
     "α<sub>PNP</sub> = α<sub>NPN</sub>",
     "R<sub>sub</sub> approaches 0"],
    "I<sub>SCR</sub> ∝ I<sub>trigger</sub>/[1 − (α<sub>PNP</sub> + α<sub>NPN</sub>)]. Equivalent: β<sub>PNP</sub>β<sub>NPN</sub> ≥ 1.");
  q("c1", "26 Latch-up",
    "Which of these is NOT a latch-up trigger listed in the course?",
    ["lowering the clock frequency",
     "I/O overshoot or undershoot",
     "an ESD event",
     "a power-sequencing fault"],
    "Triggers inject current whose IR drop across R<sub>sub</sub>/R<sub>well</sub> forward-biases a parasitic emitter-base junction.");
  q("c1", "26 Latch-up",
    "8 mA of injected current flows through a local substrate resistance of 75 Ω. The drop is",
    ["0.60 V", "0.06 V", "6 V", "0.11 V"],
    "V<sub>sub</sub> = I<sub>injected</sub>·R<sub>sub</sub> = 8 mA × 75 Ω = 0.60 V: enough to worry a base-emitter junction.");
  q("c1", "26 Latch-up",
    "Same 8 mA injection, but the substrate resistance is cut from 75 Ω to 15 Ω with closer taps. The drop becomes",
    ["0.12 V", "0.60 V", "0.30 V", "1.2 V"],
    "8 mA × 15 Ω = 0.12 V, far below a forward-bias threshold.");
  q("c1", "26 Latch-up",
    "5 mA is injected through R<sub>well</sub> = 140 Ω. V<sub>well</sub> is",
    ["0.70 V", "0.07 V", "28 mV", "7 V"],
    "5 mA × 140 Ω = 0.70 V.");
  q("c1", "26 Latch-up",
    "The main layout countermeasure for latch-up is",
    ["p+ substrate ties and n+ well ties close to susceptible devices, plus guard rings",
     "longer gate lengths",
     "thicker top metal",
     "removing the seal ring"],
    "Ties lower R<sub>sub</sub> and R<sub>well</sub>; guard rings collect injected carriers. Also increase n-well/substrate spacing.");
  q("c1", "26 Latch-up",
    "Guard rings are normally",
    ["grounded p+ rings and supply-connected n+ rings",
     "floating p+ rings",
     "n+ rings tied to ground",
     "polysilicon rings tied to the gate"],
    "Grounded p+ and VDD-connected n+ collect carriers, as the process allows.");
  q("c1", "26 Latch-up",
    "Which statement about guard rings is correct?",
    ["They do not guarantee latch-up immunity by themselves",
     "They make latch-up impossible",
     "They replace the need for ESD clamps",
     "They are only needed in digital blocks"],
    "Follow foundry latch-up rules and injection-current limits as well.");
  q("c1", "26 Latch-up",
    "After an input transient, a chip's supply current stays high until power is cycled. The most likely cause is",
    ["latch-up", "electromigration", "DIBL", "crosstalk"],
    "That is the latch-up signature; check hotspot location, injection polarity, tap placement and clamp behaviour.");

  /* ===================== C2 · topics 27–29 ===================== */
  q("c2", "27 Matching",
    "Random mismatch between devices",
    ["comes from microscopic variation and decreases with active area",
     "comes from temperature gradients and increases with area",
     "is cancelled completely by common-centroid layout",
     "is the same as a global process shift"],
    "Systematic mismatch comes from gradients (temperature, implant, litho, stress, orientation, routing).");
  q("c2", "27 Matching",
    "A global process shift moves all devices together. Its effect on the ratio of two matched devices is",
    ["small: ratios are largely unchanged", "large: ratios double", "it always causes 10% mismatch", "it reverses the ratio"],
    "Precision is set mostly by local gradients and random mismatch.");
  q("c2", "27 Matching",
    "Parameter p(x) = p<sub>0</sub> + gx. Units at x = 0, 1, 2, 3 are placed A A B B. p<sub>A</sub> − p<sub>B</sub> is",
    ["−2g", "0", "+2g", "−g"],
    "x̄<sub>A</sub> = 0.5, x̄<sub>B</sub> = 2.5, so Δp = g(0.5 − 2.5) = −2g.");
  q("c2", "27 Matching",
    "Same gradient, units placed A B B A at x = 0, 1, 2, 3. p<sub>A</sub> − p<sub>B</sub> is",
    ["0", "−2g", "+g", "−g"],
    "x̄<sub>A</sub> = (0 + 3)/2 = 1.5 = x̄<sub>B</sub> = (1 + 2)/2, so the linear gradient cancels.");
  q("c2", "27 Matching",
    "Common-centroid layout does not cancel a second-order (quadratic) gradient because",
    ["equal centroids (Σx) do not make Σx² equal",
     "it moves the devices too far apart",
     "it uses dummy devices",
     "Pelgrom's law forbids it"],
    "ABBA: Σx = 3 for both, but Σx² = 9 for A and 5 for B.");
  q("c2", "27 Matching",
    "Dummy devices at the ends of a matched array",
    ["give edge units similar lithographic and stress surroundings, at a cost in area and parasitics",
     "carry extra current to reduce mismatch",
     "remove random mismatch",
     "are required by DRC in every layout"],
    "Dummies equalise the edge environment.");
  q("c2", "27 Matching",
    "Kelvin connections are used for",
    ["critical low-ohmic sense resistors, separating force and sense paths",
     "clock distribution",
     "reducing latch-up",
     "density fill"],
    "Limitation: additional terminals and wiring.");
  q("c2", "27 Pelgrom",
    "A<sub>VT</sub> = 3 mV·µm with W = 10 µm and L = 2 µm. σ(ΔV<sub>T</sub>) is about",
    ["0.67 mV", "0.95 mV", "1.5 mV", "0.15 mV"],
    "3/√20 ≈ 0.67 mV. Quadrupling the area would halve it.");
  q("c2", "28 WPE",
    "The well-proximity effect exists because",
    ["high-energy well implants scatter near the photoresist edge, changing local doping and V<sub>T</sub>",
     "metal lines near the well add capacitance",
     "STI trenches stress the channel",
     "the well is biased at a different voltage"],
    "A transistor near a well edge can have a different V<sub>T</sub> from an identical one farther away.");
  q("c2", "28 WPE",
    "With the illustrative model ΔV<sub>T</sub> = A·e<sup>−x/L<sub>W</sub></sup>, A = 30 mV and L<sub>W</sub> = 1 µm, the shift at x = 0.5 µm is",
    ["18.2 mV", "15 mV", "11.0 mV", "1.49 mV"],
    "30 × e<sup>−0.5</sup> = 30 × 0.607 = 18.2 mV. At x = 3 µm it is 30e<sup>−3</sup> = 1.49 mV.");
  q("c2", "28 WPE",
    "A = 20 mV, L<sub>W</sub> = 2 µm, x = 2 µm. The modelled WPE shift is",
    ["7.36 mV", "10 mV", "2.71 mV", "14.7 mV"],
    "20 × e<sup>−1</sup> = 7.36 mV.");
  q("c2", "28 WPE",
    "WPE-induced mismatch differs from Pelgrom mismatch because it is",
    ["systematic (set by distance to the well edge), while Pelgrom mismatch is random",
     "random, while Pelgrom mismatch is systematic",
     "removed by increasing area",
     "only present in PMOS"],
    "Fix WPE by keeping matched devices at equal well-edge distances, with large shared wells and edge dummies.");
  q("c2", "29 STI/LOD",
    "STI stress mainly changes a transistor's",
    ["carrier mobility (and threshold)", "gate oxide thickness", "metal resistance", "junction breakdown voltage"],
    "Oxide-filled trenches stress the silicon; the effect depends on active width, trench proximity, diffusion edges and orientation.");
  q("c2", "29 STI/LOD",
    "Stress lowers μ<sub>eff</sub> by 3% and raises V<sub>T</sub> by 5 mV at V<sub>OV</sub> = 200 mV. ΔI<sub>D</sub>/I<sub>D</sub> is about",
    ["−8%", "−5.5%", "−3%", "+2%"],
    "ΔI/I ≈ Δμ/μ − 2ΔV<sub>T</sub>/V<sub>OV</sub> = −0.03 − 2(0.005/0.2) = −0.03 − 0.05 = −8%.");
  q("c2", "29 STI/LOD",
    "μ<sub>eff</sub> rises 2% and V<sub>T</sub> falls 2 mV at V<sub>OV</sub> = 250 mV. ΔI<sub>D</sub>/I<sub>D</sub> is about",
    ["+3.6%", "+0.4%", "+2.8%", "−3.6%"],
    "+0.02 − 2(−0.002/0.25) = +0.02 + 0.016 = +3.6%.");
  q("c2", "29 STI/LOD",
    "LOD and LDO are",
    ["different: LOD is length of diffusion (a layout effect), LDO is a low-dropout regulator (a circuit)",
     "the same thing written two ways",
     "both layout-dependent effects",
     "both voltage regulators"],
    "The course stresses this distinction twice.");

  /* ===================== C3 · topic 30 ===================== */
  q("c3", "30 LDO",
    "An LDO regulates its output with",
    ["negative feedback driving a series pass element",
     "a switching inductor and diode",
     "positive feedback through a charge pump",
     "a shunt Zener diode only"],
    "Reference → error amplifier compares V<sub>REF</sub> with βV<sub>OUT</sub> → adjusts the pass-device gate.");
  q("c3", "30 LDO",
    "V<sub>REF</sub> = 0.6 V, R<sub>1</sub> = 200 kΩ, R<sub>2</sub> = 100 kΩ. V<sub>OUT</sub> is",
    ["1.8 V", "1.2 V", "0.9 V", "0.4 V"],
    "V<sub>OUT</sub> ≈ V<sub>REF</sub>(1 + R<sub>1</sub>/R<sub>2</sub>) = 0.6 × 3 = 1.8 V.");
  q("c3", "30 LDO",
    "For the divider R<sub>1</sub> = 200 kΩ (top), R<sub>2</sub> = 100 kΩ (bottom), the feedback factor β is",
    ["1/3", "2/3", "2", "1/2"],
    "β = R<sub>2</sub>/(R<sub>1</sub> + R<sub>2</sub>) = 100/300.");
  q("c3", "30 LDO",
    "V<sub>REF</sub> = 1.2 V and a 3.3 V output is wanted. R<sub>1</sub>/R<sub>2</sub> must be",
    ["1.75", "2.75", "0.36", "1.2"],
    "3.3 = 1.2(1 + R<sub>1</sub>/R<sub>2</sub>) → R<sub>1</sub>/R<sub>2</sub> = 1.75.");
  q("c3", "30 LDO",
    "A 1.8 V LDO carries 200 mA through a pass device with R<sub>on</sub> = 0.75 Ω. Dropout and minimum V<sub>IN</sub> are",
    ["0.15 V and 1.95 V", "0.15 V and 1.65 V", "0.27 V and 2.07 V", "1.5 V and 3.3 V"],
    "V<sub>dropout</sub> ≈ I<sub>LOAD</sub>·R<sub>DS(on)</sub> = 0.2 × 0.75 = 0.15 V; V<sub>IN(min)</sub> ≈ 1.8 + 0.15 = 1.95 V.");
  q("c3", "30 LDO",
    "A 3.3 V LDO at 300 mA has R<sub>on</sub> = 0.5 Ω. The minimum input is about",
    ["3.45 V", "3.15 V", "3.8 V", "3.3 V"],
    "Dropout = 0.3 × 0.5 = 0.15 V → 3.45 V.");
  q("c3", "30 LDO",
    "The pass device most common in low-dropout CMOS designs is",
    ["a PMOS", "an NMOS source follower only", "a Zener diode", "a bipolar Darlington only"],
    "PMOS gives low dropout; NMOS and bipolar pass devices are used with different drive needs.");
  q("c3", "30 LDO",
    "R<sub>out,eff</sub> = 100 Ω and C<sub>out</sub> = 1 µF. The output pole is about",
    ["1.59 kHz", "15.9 kHz", "159 Hz", "10 kHz"],
    "f<sub>p,out</sub> ≈ 1/(2πR<sub>out,eff</sub>C<sub>out</sub>) = 1/(6.28 × 10<sup>−4</sup>) ≈ 1.59 kHz.");
  q("c3", "30 LDO",
    "C<sub>out</sub> = 10 µF with ESR = 0.1 Ω. The ESR zero is at about",
    ["159 kHz", "1.59 kHz", "15.9 kHz", "1.59 MHz"],
    "f<sub>z,ESR</sub> ≈ 1/(2π × 0.1 × 10<sup>−5</sup>) = 1/(6.28 × 10<sup>−6</sup>) ≈ 159 kHz.");
  q("c3", "30 LDO",
    "100 mV of input ripple appears as 1 mV at the output. The PSRR is",
    ["40 dB", "20 dB", "100 dB", "60 dB"],
    "PSRR = 20 log<sub>10</sub>(100/1) = 40 dB.");
  q("c3", "30 LDO",
    "At low frequency an LDO's PSRR is set mainly by ____; at high frequency by ____.",
    ["loop gain; parasitic feedthrough and device capacitances",
     "the output capacitor ESR; the reference noise",
     "the dropout voltage; the load current",
     "parasitic feedthrough; loop gain"],
    "Loop gain falls with frequency, so parasitics take over.");
  q("c3", "30 LDO",
    "V<sub>OUT</sub> changes by 2 mV when V<sub>IN</sub> steps from 2.5 V to 3.5 V at fixed load. The line regulation is",
    ["2 mV/V", "2 mV/mA", "0.5 V/V", "20 mV/V"],
    "Line regulation = ΔV<sub>OUT</sub>/ΔV<sub>IN</sub>; load regulation = ΔV<sub>OUT</sub>/ΔI<sub>LOAD</sub>.");
  q("c3", "30 LDO",
    "ΔI = 100 mA, the loop needs Δt = 5 µs to respond, C<sub>OUT</sub> = 10 µF, ESR = 30 mΩ. The initial droop is about",
    ["53 mV", "50 mV", "3 mV", "80 mV"],
    "ΔV ≈ ΔI·Δt/C<sub>OUT</sub> + ΔI·ESR = 50 mV + 3 mV = 53 mV.");
  q("c3", "30 LDO",
    "ΔI = 200 mA, Δt = 1 µs, C<sub>OUT</sub> = 10 µF, ESR = 50 mΩ. The initial droop is",
    ["30 mV", "20 mV", "10 mV", "70 mV"],
    "200 mA × 1 µs / 10 µF = 20 mV; plus 0.2 × 0.05 = 10 mV → 30 mV.");
  q("c3", "30 LDO",
    "Which LDO test checks phase margin across load, C<sub>OUT</sub> and ESR corners?",
    ["loop break / return-ratio analysis",
     "a V<sub>IN</sub> sweep at maximum load",
     "a DC operating point at no load",
     "AC ripple injection"],
    "Dropout → V<sub>IN</sub> sweep at I<sub>LOAD,max</sub>; I<sub>Q</sub> → DC op at no/light load; PSRR → ripple injection.");

  // counts
  sections.forEach((s) => { s.count = questions.filter((x) => x.s === s.id).length; });
  return { sections, questions };
})();
