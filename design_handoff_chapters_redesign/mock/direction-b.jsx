/* global React, Marker, Chip, Pill, Scene, Annot, Megastat */

// =====================================================
// DIRECTION B — Magazine Asymmetric
// Each chapter gets a layout matched to its content.
// Editorial type (Instrument Serif italic), big numerals,
// megastats, side-margin annotations.
// =====================================================

// ───── Chapter I — HEC Paris (Foundation)
// Mirror of Bearingpoint: editorial column LEFT, full-bleed scene RIGHT.
function B_Foundation() {
  return (
    <section className="ch" style={{ background: "var(--paper)" }}>
      <span className="B-numeral" style={{ bottom: -160, left: -40, right: "auto", color: "rgba(19,102,176,0.07)" }}>I</span>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 560px", height: "100%", gap: 0 }}>
        {/* editorial column */}
        <div style={{ padding: "56px 56px 48px", display: "flex", flexDirection: "column", gap: 22, position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Marker num="I" label="Chapter I · Foundation" />
            <Chip>Active · since 2023</Chip>
          </div>
          <h2 className="B-title" style={{ fontSize: 96 }}>
            hec <em>paris.</em>
          </h2>
          <p className="ch-lede" style={{ maxWidth: 50 + "ch" }}>
            Master in Management at <a href="#">HEC Paris</a>, ranked #1
            worldwide by the Financial Times in 2025. Before that, three years
            in a French preparatory class (CPGE ECS), top 100 out of 9,000
            candidates at the national entrance exam. One semester at Thammasat
            in Bangkok. Currently on a gap year to ship.
          </p>
          <div className="stats">
            <Pill><b>#1</b>&nbsp;worldwide · FT 2025</Pill>
            <Pill><b>top 100</b>&nbsp;/ 9,000 candidates</Pill>
            <Pill><b>3 years</b>&nbsp;CPGE ECS</Pill>
            <Pill ghost>Thammasat · Bangkok</Pill>
          </div>
          <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 14 }}>
            <Annot idx="i." lead="Master in Management — and a gap year to ship.">
              Three years of CPGE before HEC, one semester abroad at Thammasat,
              and right now a deliberate break from the classroom to build
              real products. The credentials are nice; the gap year is the
              part I actually wanted.
            </Annot>
            <Annot idx="ii." lead="Vice-President of the Ski Club at HEC.">
              Leading a team of 11, managing a €75K annual budget, organizing
              trips for 300+ students each year. The closest thing to running
              a small operation while still in school.
            </Annot>
          </div>
        </div>

        {/* full-bleed scene */}
        <div style={{ position: "relative", overflow: "hidden", background: "#0e2440" }}>
          <img className="pixelated" src="assets/foundation.png" alt=""
               style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{
            position: "absolute", right: 24, bottom: 24, color: "#fff", textAlign: "right",
            fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.16em", textTransform: "uppercase",
            display: "flex", flexDirection: "column", gap: 6,
          }}>
            <span style={{ opacity: 0.7 }}>HEC Paris · Jouy-en-Josas</span>
            <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 22, letterSpacing: "-0.01em", textTransform: "none" }}>
              Where the story starts.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ───── Chapter II — Bearingpoint
// Split-screen: full-height pixel scene left, narrow editorial column right.
function B_Bearingpoint() {
  return (
    <section className="ch" style={{ background: "var(--sky-50)" }}>
      <span className="B-numeral" style={{ bottom: -160, right: -60, color: "rgba(19,102,176,0.07)" }}>II</span>
      <div style={{ display: "grid", gridTemplateColumns: "560px 1fr", height: "100%", gap: 0 }}>
        {/* full-bleed scene */}
        <div style={{ position: "relative", overflow: "hidden", background: "#0e2440" }}>
          <img className="pixelated" src="assets/corporate-lab.png" alt=""
               style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{
            position: "absolute", left: 24, bottom: 24, color: "#fff",
            fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.16em", textTransform: "uppercase",
            display: "flex", flexDirection: "column", gap: 6,
          }}>
            <span style={{ opacity: 0.7 }}>BearingPoint · Paris</span>
            <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 22, letterSpacing: "-0.01em", textTransform: "none" }}>
              Six months in the public sector.
            </span>
          </div>
        </div>

        {/* editorial column */}
        <div style={{ padding: "56px 56px 48px", display: "flex", flexDirection: "column", gap: 24, position: "relative", zIndex: 1 }}>
          <Marker num="II" label="Chapter II · Consulting" />
          <h2 className="B-title" style={{ fontSize: 88 }}>
            bearing<br/><em>point.</em>
          </h2>
          <p className="ch-lede" style={{ maxWidth: 44 + "ch" }}>
            Digital transformation for public-sector clients — a major French
            public health organization and a top-tier university. Helping large
            institutions modernize how their IS serves thousands of people.
          </p>
          <div className="stats">
            <Pill><b>3-year</b>&nbsp;master plan</Pill>
            <Pill><b>5,000+</b>&nbsp;users</Pill>
            <Pill><b>12+</b>&nbsp;initiatives</Pill>
            <Pill><b>15+</b>&nbsp;workshops</Pill>
          </div>
          <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 16 }}>
            <Annot idx="i." lead="Co-authored a 3-year digital master plan, presented to C-level.">
              Diagnostic of the IT landscape, target architecture, prioritization
              of 12+ initiatives. Moved execs from a fragmented view to a
              shared roadmap with clearer investment calls.
            </Annot>
            <Annot idx="ii." lead="Deployed an IS used by 5,000+ internal users.">
              Defined needs, journeys, requirements; ran 15+ user workshops.
              A digital project wins because the process is clear and change
              is managed properly — not because the tool is well designed.
            </Annot>
          </div>
        </div>
      </div>
    </section>
  );
}

// ───── Chapter III — Rocapine
// Megastats row across the top; title block; scene & annotations below.
function B_Rocapine() {
  return (
    <section className="ch" style={{ background: "var(--paper)" }}>
      <span className="B-numeral" style={{ bottom: -180, right: -40 }}>III</span>
      <div className="ch__inner" style={{ padding: "44px 56px", gap: 20, position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Marker num="III" label="Chapter III · Product · Rocapine" />
          <Chip>Active · publishing PM · since jan 2026</Chip>
        </div>

        {/* megastat strip */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32, paddingTop: 8, paddingBottom: 14, borderTop: "1px solid var(--ink-20)", borderBottom: "1px solid var(--ink-20)" }}>
          <Megastat num="$5.6M" label="annualized revenue" />
          <Megastat num="315K"  label="monthly active users" />
          <Megastat num="14"    label="active studios" />
          <Megastat num="6"     label="apps shipped" />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 480px", gap: 36, flex: 1, minHeight: 0 }}>
          {/* left: title + lede + annotations */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <h2 className="B-title" style={{ fontSize: 84 }}>
              <em>rocapine.</em>
            </h2>
            <p className="ch-lede" style={{ maxWidth: 50 + "ch" }}>
              Product Manager at <a href="#">Rocapine</a>, a mobile app
              publisher in wellness. We ship low-cost demos, test
              distribution, and scale what performs — GenAI-powered
              personalization across mental health, fitness, nutrition, sleep.
              I own end-to-end product on 6 consumer iOS apps: concept, MVP
              specs, App Store launch, growth experiments, cohort analyses,
              and the LTV calls to scale vs. kill.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: "auto" }}>
              <Annot idx="i." lead="Built Scouty, our internal CRM, from scratch.">
                Designed and coded it in ~4 weeks. ~3× partner sourcing
                throughput, used daily by the whole publishing team. When I
                see a recurring problem, I&apos;d rather build the fix than
                document it.
              </Annot>
              <Annot idx="ii." lead="Shipped 6 apps alongside the strategy work.">
                Not to replace dev studios — to actually understand what it
                takes to build, test, iterate. The best PMs in consumer are
                the ones who could ship the v1 themselves.
              </Annot>
            </div>
          </div>

          {/* right: scene */}
          <div style={{ position: "relative", minHeight: 0 }}>
            <Scene
              src="assets/builder-studio.png"
              alt="Pixel-art workshop with floating smartphones."
              tag="ship · test · scale"
              style={{ height: "100%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ───── Chapter IV — Side projects
// Dark editorial: title hero left, 2 large editorial project blocks right.
function B_Shipping() {
  return (
    <section className="ch ch--dark">
      <span className="B-numeral" style={{ bottom: -150, left: -50, right: "auto", color: "rgba(255,255,255,0.04)" }}>IV</span>
      <div className="ch__inner" style={{ padding: "56px 64px", gap: 22, position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 40, height: "100%" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <Marker num="IV" label="Chapter IV · Side projects" />
            <h2 className="B-title" style={{ fontSize: 84 }}>
              side<br/><em>projects.</em>
            </h2>
            <p className="ch-lede">
              Where I learn the stack outside of work — solo, evenings and
              weekends, no excuses. Cursor + Claude Code, ship to TestFlight,
              put it in front of real users.
            </p>
            <div className="stats" style={{ marginTop: 8 }}>
              <Pill dot><b>2</b>&nbsp;active builds</Pill>
              <Pill ghost>solo</Pill>
            </div>
            <div style={{ flex: 1, marginTop: 10, minHeight: 0, opacity: 0.9 }}>
              <Scene src="assets/shipping.png" alt="Pixel-art night workshop." />
            </div>
          </div>

          {/* two project cards — matches portfolio's existing ProjectCard style */}
          <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: 18 }}>
            <ProjectCard
              name="Vibo"
              status="Building"
              summary="The Duolingo for vibe-coding. Mobile app teaching non-technical users to build software with AI tools: daily AI news in short digestible briefs, then interactive exercises to test comprehension and reinforce learning through spaced repetition."
              stack={["React Native", "Expo", "TypeScript"]}
              foot="solo build · product · gtm"
            />
            <ProjectCard
              name="Scouty"
              status="Internal tool"
              done
              summary="Custom CRM built from scratch for Rocapine's publishing team. Replaced scattered spreadsheets with a single source of truth for every studio interaction. Used daily by the team, scaled partner sourcing throughput ~3×."
              stack={["~4 weeks build", "in production", "~3× throughput"]}
              foot="daily-driver · ~3× throughput"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ───── Chapter V — About me
// 8 values typographic 2-column list with category banding.
const VALUES_B = [
  { cat: "drive",  title: "Ambition",       body: "Working on meaningful projects with people who aim high." },
  { cat: "drive",  title: "Hard work",      body: "Taking ownership and executing with discipline." },
  { cat: "drive",  title: "Momentum",       body: "Testing, shipping, iterating, and learning fast." },
  { cat: "drive",  title: "High standards", body: "Doing things seriously, clearly, and with care." },
  { cat: "craft",  title: "Curiosity",      body: "Constantly learning across product, growth, business, and tech." },
  { cat: "craft",  title: "Product taste",  body: "Caring about design, UX, positioning, and the small details that make a product great." },
  { cat: "people", title: "Great minds",    body: "Surrounding myself with smart, driven, and inspiring people." },
  { cat: "people", title: "Sociability",    body: "Building strong relationships and enjoying collaborative environments." },
];

function B_About() {
  return (
    <section className="ch" style={{ background: "#fff" }}>
      <span className="B-numeral B-num--smaller" style={{ bottom: -100, right: -30 }}>V</span>
      <div className="ch__inner" style={{ padding: "48px 64px", gap: 20, position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 720 }}>
            <Marker num="V" label="Chapter V · About me" />
            <h2 className="B-title" style={{ fontSize: 96 }}>
              how I <em>work,</em><br/>what I <em>value.</em>
            </h2>
          </div>
          <div style={{ display: "flex", gap: 24, alignItems: "flex-end" }}>
            <div className="label" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
              eight values · three lenses
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, columnGap: 48, marginTop: 6 }}>
          {VALUES_B.map((v, i) => (
            <div key={v.title} className="vB">
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span className="value__num">{String(i + 1).padStart(2,"0")} · {v.cat}</span>
                <h3 className="vB__title">{v.title}</h3>
              </div>
              <p className="vB__body">{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ───── Chapter VI — What's next
// Single-column editorial pull-quote with a small inset scene + open-to card.
function B_WhatsNext() {
  return (
    <section className="ch" style={{ background: "var(--sky-50)" }}>
      <span className="B-numeral" style={{ bottom: -150, right: -50, color: "rgba(19,102,176,0.08)" }}>VI</span>
      <div className="ch__inner" style={{ padding: "56px 80px", position: "relative", zIndex: 1, justifyContent: "space-between" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 40 }}>
          <Marker num="VI" label="Chapter VI · What's next" />
          <div style={{ display: "flex", gap: 8 }}>
            <Pill dot><b>Open to</b>&nbsp;good conversations</Pill>
            <Pill ghost>San Francisco · relocating</Pill>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 56, alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <h2 className="B-title" style={{ fontSize: 64, lineHeight: 1.04, maxWidth: 18 + "ch" }}>
              Still <em>figuring it out,</em> honestly.
            </h2>
            <p style={{ fontSize: 19, lineHeight: 1.5, color: "var(--ink-80)", margin: 0, maxWidth: 56 + "ch" }}>
              What I know: the next few years are about{" "}
              <em style={{ fontFamily: "var(--font-serif)", color: "var(--sky-700)" }}>building things real people want to use</em>,
              and being around teams who make that look easy.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--ink-60)", margin: 0, maxWidth: 56 + "ch" }}>
              What pulls me in: consumer products, growth that compounds,
              software that feels personal. Mostly though, it&apos;s about
              working with people who care a stupid amount about what
              they&apos;re making. The fun part isn&apos;t picking a label —
              it&apos;s getting in the middle of something ambitious and
              shipping. I&apos;ll figure out the rest.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ aspectRatio: "4/3" }}>
              <Scene src="assets/whats-next.png" alt="Pixel-art sunrise." />
            </div>
            <div style={{ background: "#fff", border: "1px solid var(--ink-10)", borderRadius: 16, padding: "16px 18px", boxShadow: "0 4px 18px -10px rgba(15,30,50,0.1)" }}>
              <div className="label" style={{ marginBottom: 8 }}>long-term</div>
              <p style={{ margin: 0, fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 22, color: "var(--ink)", letterSpacing: "-0.01em", lineHeight: 1.2 }}>
                Building my own.
              </p>
            </div>
          </div>
        </div>

        <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", color: "var(--ink-40)", textTransform: "uppercase", margin: 0 }}>
          end of the deck · next: let&apos;s talk →
        </p>
      </div>
    </section>
  );
}

Object.assign(window, {
  B_Foundation, B_Bearingpoint, B_Rocapine, B_Shipping, B_About, B_WhatsNext,
});
