// Erwin Public — Brand Book main app

const { useState } = React;

const Hero = () => (
  <header className="hero">
    <div className="hero-top">
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <EPMark size={28} color="#1a160f" accent="#c25a3a" />
        <span>Erwin Public · Brand System</span>
      </div>
      <div style={{ display: 'flex', gap: 24 }}>
        <span className="pill"><span className="dot"/>Version 1.0</span>
        <span>Apr 2026</span>
      </div>
    </div>

    <div className="hero-mid">
      <h1 className="hero-headline">
        Free,<br/>actually<br/><em>useful.</em>
      </h1>
      <p className="hero-statement">
        Erwin Public makes public-domain and public-access information <strong>genuinely useful</strong> to the people it was meant to serve — by building focused tools that close the gap between what is technically free and what is actually usable.
      </p>
    </div>

    <div className="hero-bottom">
      {TOOLS.map(t => (
        <div key={t.id} className="swatch">
          <span className="chip" style={{ background: t.color }}/>
          <div className="meta">
            <b>{t.name}</b>
            {t.id}
          </div>
        </div>
      ))}
    </div>
  </header>
);

const SectionTable = () => (
  <section className="section">
    <div className="container">
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 48, alignItems: 'start' }}>
        <div className="section-tag" style={{ marginBottom: 0 }}>Index</div>
        <div>
          {[
            ['01', 'The Mark', 'Parent identity & six tool glyphs'],
            ['02', 'Color', 'Six hues, one family — and a paper spine'],
            ['03', 'Typography', 'Source Serif, Public Sans, JetBrains Mono'],
            ['04', 'Voice & Tone', 'Plain, generous, never condescending'],
            ['05', 'Components', 'Buttons, inputs, cards, badges'],
            ['06', 'Construction', 'Clear space, sizing, dos and donts'],
            ['07', 'Tools in Practice', 'Sample screens for all six tools'],
          ].map(([n, t, d]) => (
            <div key={n} style={{ display: 'grid', gridTemplateColumns: '60px 220px 1fr', alignItems: 'baseline', padding: '20px 0', borderBottom: '1px solid var(--rule)' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-mute)' }}>{n}</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 500, letterSpacing: '-0.015em' }}>{t}</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 17, fontStyle: 'italic', color: 'var(--ink-soft)' }}>{d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const SectionMark = () => (
  <section className="section">
    <div className="container">
      <div className="section-tag">01 — The Mark</div>
      <h2 className="section-title">A horizon for public information.</h2>
      <p className="section-lede">
        The Erwin Public mark is a circle bisected by a horizon line. Above sits a sun — knowledge made visible. Below, faint marks suggest the ground beneath us: the records, the data, the works that already belonged to everyone but were hard to reach. The wordmark is set in Source Serif, with <em>Public</em> in italic — a quiet emphasis on what we are.
      </p>

      <div className="logo-grid">
        <div className="logo-card">
          <span className="label">Primary · light</span>
          <div className="lockup">
            <EPMark size={56} color="#1a160f" accent="#c25a3a" />
            <span className="wordmark">Erwin <span className="public">Public</span></span>
          </div>
        </div>
        <div className="logo-card dark">
          <span className="label">Primary · dark</span>
          <div className="lockup">
            <EPMark size={56} color="#f5f0e6" accent="#c25a3a" />
            <span className="wordmark">Erwin <span className="public">Public</span></span>
          </div>
        </div>
        <div className="logo-card" style={{ background: 'var(--paper-100)' }}>
          <span className="label">Mark only</span>
          <div style={{ margin: 'auto 0' }}>
            <EPMarkLarge size={140} color="#1a160f" accent="#c25a3a" />
          </div>
        </div>
        <div className="logo-card">
          <span className="label">Wordmark only</span>
          <div className="lockup" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
            <span className="wordmark" style={{ fontSize: 56 }}>Erwin <span className="public">Public</span></span>
          </div>
        </div>
      </div>

      {/* Tool lockups */}
      <h3 style={{ fontFamily: 'var(--serif)', fontSize: 28, fontWeight: 400, letterSpacing: '-0.015em', marginTop: 80, marginBottom: 8 }}>Six tools, one family.</h3>
      <p style={{ fontFamily: 'var(--serif)', fontSize: 18, fontStyle: 'italic', color: 'var(--ink-soft)', maxWidth: '60ch', margin: '0 0 32px' }}>
        Each tool earns its own glyph — drawn within the parent’s circle-and-horizon frame, in its assigned color. Read together, they form a small, deliberate civic library.
      </p>
      <div className="tool-grid">
        {TOOLS.map(t => {
          const { Glyph } = t;
          return (
            <div key={t.id} className="tool-card">
              <div className="tool-bar" style={{ background: t.color }}/>
              <div className="tool-parent">Erwin Public · {t.id}</div>
              <Glyph size={64} color={t.color}/>
              <div>
                <div className="tool-name">{t.name}</div>
                <div className="tool-desc" style={{ marginTop: 6 }}>{t.tagline}.</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

const TonalScale = ({ tool }) => {
  // Generate 5 tints by mixing the hex with paper-50 / ink
  const steps = [0.85, 0.55, 0.25, 0, -0.35];
  const labels = ['100', '300', '500', '700', '900'];
  const mix = (hex, t) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    const target = t > 0 ? [251, 248, 242] : [26, 22, 15];
    const tt = Math.abs(t);
    const nr = Math.round(r*(1-tt) + target[0]*tt);
    const ng = Math.round(g*(1-tt) + target[1]*tt);
    const nb = Math.round(b*(1-tt) + target[2]*tt);
    return '#' + [nr, ng, nb].map(x => x.toString(16).padStart(2, '0')).join('');
  };
  return (
    <div className="tonal-row">
      <div className="tonal-label">
        <div className="n">{tool.name}</div>
        <div className="t">{tool.id}</div>
      </div>
      {steps.map((s, i) => {
        const c = mix(tool.color, s);
        const dark = i >= 3;
        return (
          <div key={i} className="tonal-cell" style={{ background: c, color: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)' }}>
            <div>
              <div>{labels[i]}</div>
              <div>{c.toUpperCase()}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const SectionColor = () => (
  <section className="section">
    <div className="container">
      <div className="section-tag">02 — Color</div>
      <h2 className="section-title">Six hues, drawn from the same dye lot.</h2>
      <p className="section-lede">
        Every accent shares the same chroma and lightness band — picked by hand to feel like prints from a single press. They sit on a warm paper spine that recalls the materials of a public library: book cloth, kraft envelopes, microfiche cards. No pure white, no neon.
      </p>

      <div className="palette-strip">
        {TOOLS.map(t => (
          <div key={t.id} className="palette-cell">
            <div className="swash" style={{ background: t.color }}/>
            <div className="info">
              <div className="name">{t.name}</div>
              <div className="for">For {t.tagline.toLowerCase()}</div>
              <div className="hex">{t.color.toUpperCase()}</div>
            </div>
          </div>
        ))}
      </div>

      <h3 style={{ fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 500, letterSpacing: '-0.015em', marginTop: 48, marginBottom: 8 }}>Tonal scales</h3>
      <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--ink-soft)', marginBottom: 24 }}>Each hue resolves to five steps — for backgrounds, surfaces, lines, text, and emphasis.</p>
      <div>
        {TOOLS.map(t => <TonalScale key={t.id} tool={t}/>)}
      </div>

      <h3 style={{ fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 500, letterSpacing: '-0.015em', marginTop: 64, marginBottom: 8 }}>Paper · the spine</h3>
      <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--ink-soft)', marginBottom: 24 }}>The neutral palette every tool sits on. Used for surfaces, type, and rules.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: 1, background: 'var(--rule)', border: '1px solid var(--rule)' }}>
        {[
          ['50',  '#fbf8f2'], ['100', '#f5f0e6'], ['200', '#ebe3d3'],
          ['300', '#d9cdb6'], ['400', '#b9a988'], ['500', '#8a7a5c'],
          ['600', '#5d5340'], ['700', '#3d3527'], ['900', '#181410'],
        ].map(([n, c]) => (
          <div key={n} style={{ background: c, padding: '20px 12px', minHeight: 110, color: parseInt(n) >= 400 ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em' }}>Paper {n}</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, marginTop: 4 }}>{c.toUpperCase()}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const SectionType = () => (
  <section className="section">
    <div className="container">
      <div className="section-tag">03 — Typography</div>
      <h2 className="section-title">A serif for ideas. A sans for instructions. A mono for the file cabinet.</h2>
      <p className="section-lede">
        Three open-source, professionally-made families. Source Serif 4 carries voice; Public Sans (designed by the U.S. Web Design System) carries interface; JetBrains Mono carries metadata. None of them are precious.
      </p>

      <h3 className="type-display">Public<em> work.</em></h3>
      <div className="type-spec">Source Serif 4 · 184px · 300 / italic 400 · -0.04em</div>

      <div className="type-row">
        <div className="type-meta"><b>Display</b>Source Serif 4 · 56–132px<br/>Weight 300 · -0.035em</div>
        <h1 className="type-sample-h1">A library is the most enduring public good we know how to build.</h1>
      </div>
      <div className="type-row">
        <div className="type-meta"><b>Heading</b>Source Serif 4 · 28–48px<br/>Italic 400 · -0.015em</div>
        <h2 className="type-sample-h2">Aligned to your state’s standards — and yours.</h2>
      </div>
      <div className="type-row">
        <div className="type-meta"><b>Subheading</b>Public Sans · 22px<br/>Weight 600 · -0.01em</div>
        <h3 className="type-sample-h3">Find a record, then make it yours</h3>
      </div>
      <div className="type-row">
        <div className="type-meta"><b>Reading body</b>Source Serif 4 · 19px<br/>1.55 leading</div>
        <p className="type-sample-body">Public-domain works are an inheritance the country has already paid for. The hard part isn’t access — most of these texts have been online for twenty years. The hard part is making them legible, navigable, and ready to use without a degree in archives.</p>
      </div>
      <div className="type-row">
        <div className="type-meta"><b>UI body</b>Public Sans · 15px<br/>Weight 400 · 1.5 leading</div>
        <p className="type-sample-ui">Choose a state to see standards aligned to that curriculum. We support all 50 states plus DC. Standards are sourced from each state’s department of education and updated annually.</p>
      </div>
      <div className="type-row">
        <div className="type-meta"><b>Metadata</b>JetBrains Mono · 11–13px<br/>0.08–0.12em tracking</div>
        <p className="type-sample-mono">SOURCE · Library of Congress · Manuscript Division<br/>RIGHTS · No known U.S. copyright restrictions<br/>UPDATED · 2026-04-19 · 14:22 UTC</p>
      </div>
    </div>
  </section>
);

const SectionVoice = () => (
  <section className="section">
    <div className="container">
      <div className="section-tag">04 — Voice & Tone</div>
      <h2 className="section-title">We sound like a librarian who likes you.</h2>
      <p className="section-lede">
        Plain enough for a stranger. Specific enough to be useful. Never condescending, never bureaucratic, never breathless. We assume the reader is smart and busy.
      </p>

      <div className="voice-grid">
        <div className="voice-card we-do">
          <h4>We do say</h4>
          <p className="quote">"This map shows every property tax change in your county since 2015."</p>
          <p className="gloss">Specific. Actionable. Gives the reader something to do next.</p>
        </div>
        <div className="voice-card we-dont">
          <h4>We don’t say</h4>
          <p className="quote">"Empowering citizens through transparent, AI-driven civic data insights."</p>
          <p className="gloss">Vague. Self-congratulatory. Tells the reader nothing they can use.</p>
        </div>
        <div className="voice-card we-do">
          <h4>We do say</h4>
          <p className="quote">"This is in the public domain. Use it however you like — print it, remix it, sell it."</p>
          <p className="gloss">Permission, given clearly. No hedging.</p>
        </div>
        <div className="voice-card we-dont">
          <h4>We don’t say</h4>
          <p className="quote">"Subject to applicable usage rights, this work may be utilized."</p>
          <p className="gloss">Legalese where plain language would do.</p>
        </div>
      </div>

      <div className="principles">
        {[
          ['01', 'Plain language', 'If a 14-year-old cant read it, we rewrite it. We measure with a real grade-level test, not vibes.'],
          ['02', 'Specific over impressive', 'A real example beats a sweeping claim, every time. Show the record, show the chart, show the page.'],
          ['03', 'Permission, not promotion', 'These works are already free. We dont take credit for them. We just open the door.'],
          ['04', 'Brief, but not curt', 'Short sentences. Real punctuation. Generous explanation when something matters.'],
        ].map(([n, h, p]) => (
          <div key={n} className="principle">
            <div className="num">— {n}</div>
            <h5>{h}</h5>
            <p>{p}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const SectionComponents = () => (
  <section className="section">
    <div className="container">
      <div className="section-tag">05 — Components</div>
      <h2 className="section-title">A small kit that gets out of the way.</h2>
      <p className="section-lede">
        Every component is built from the paper spine plus one tool color. Two-pixel border radius across the board — never pill-shaped except for status badges. No drop shadows. Hierarchy comes from type and rule lines, not from elevation.
      </p>

      <div className="components-grid">
        <div className="component-block">
          <span className="lbl">Buttons</span>
          <div className="body">
            <button className="ep-btn primary">Open Library <span className="arrow">→</span></button>
            <button className="ep-btn tonal">Browse</button>
            <button className="ep-btn ghost">Cancel</button>
            <button className="ep-btn text">Read more</button>
          </div>
        </div>

        <div className="component-block">
          <span className="lbl">Tonal buttons (per tool)</span>
          <div className="body">
            {TOOLS.slice(0, 4).map(t => (
              <button key={t.id} className="ep-btn primary" style={{ background: t.color }}>{t.name}</button>
            ))}
          </div>
        </div>

        <div className="component-block">
          <span className="lbl">Inputs</span>
          <div className="body" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 12 }}>
            <div className="field-stack">
              <label className="ep-label">Search the public domain</label>
              <input className="ep-input" defaultValue="Frederick Douglass"/>
            </div>
            <div className="field-stack">
              <label className="ep-label">Your zip code</label>
              <input className="ep-input" placeholder="44106"/>
            </div>
          </div>
        </div>

        <div className="component-block">
          <span className="lbl">Badges</span>
          <div className="body">
            <span className="ep-badge" style={{ color: '#2f6b56' }}><span className="dot"/>Public domain</span>
            <span className="ep-badge" style={{ color: '#c08a2e' }}><span className="dot"/>1923 · 102 yrs</span>
            <span className="ep-badge" style={{ color: '#2b5577' }}><span className="dot"/>Verified · LoC</span>
            <span className="ep-badge" style={{ color: '#8e4c6d' }}><span className="dot"/>High-res</span>
          </div>
        </div>

        <div className="component-block">
          <span className="lbl">Card · default</span>
          <div className="body">
            <div className="ep-card">
              <div className="eyebrow">Erwin Public · Records</div>
              <h4 className="title">New housing permits in Cuyahoga County, 2018–2025</h4>
              <p className="body">A clean view of HUD permit data, with a plain-English summary. Updated quarterly.</p>
            </div>
          </div>
        </div>

        <div className="component-block">
          <span className="lbl">Card · per tool</span>
          <div className="body">
            <div className="ep-card" style={{ borderTopColor: TOOLS[1].color }}>
              <div className="eyebrow" style={{ color: TOOLS[1].color }}>Erwin Public · Library</div>
              <h4 className="title">The Souls of Black Folk</h4>
              <p className="body">W. E. B. Du Bois · 1903 · 234 pages. Plain text, EPUB, and a print-ready PDF.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const SectionConstruction = () => (
  <section className="section">
    <div className="container">
      <div className="section-tag">06 — Construction</div>
      <h2 className="section-title">Give the mark room to breathe.</h2>
      <p className="section-lede">
        The mark’s clear space equals the height of its inner sun. Never crop, recolor outside the palette, rotate, or place over busy imagery. The wordmark and mark may be used together or apart.
      </p>

      <div className="construction">
        <div className="construction-frame">
          <svg width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" style={{ maxHeight: 280 }}>
            {/* clear-space rules around the mark */}
            <g transform="translate(200 150)">
              <rect x="-100" y="-100" width="200" height="200" fill="none" stroke="#c25a3a" strokeDasharray="4 4" strokeWidth="1"/>
              <line x1="-130" y1="-50" x2="-110" y2="-50" stroke="#7a6f5a" strokeWidth="1"/>
              <line x1="110" y1="-50" x2="130" y2="-50" stroke="#7a6f5a" strokeWidth="1"/>
              <text x="-140" y="-46" fontFamily="JetBrains Mono" fontSize="10" fill="#7a6f5a" textAnchor="end">x</text>
              <text x="140" y="-46" fontFamily="JetBrains Mono" fontSize="10" fill="#7a6f5a">x</text>
              {/* the mark */}
              <g transform="translate(-50 -50)">
                <circle cx="50" cy="50" r="46" fill="none" stroke="#1a160f" strokeWidth="1.5"/>
                <line x1="4" y1="50" x2="96" y2="50" stroke="#1a160f" strokeWidth="1.5"/>
                <circle cx="50" cy="50" r="21" fill="#c25a3a"/>
              </g>
            </g>
          </svg>
        </div>
        <div className="construction-rules">
          <ul>
            <li><span className="n">01</span><span>Clear space equals one <em>x</em> — the radius of the inner sun — on all sides.</span></li>
            <li><span className="n">02</span><span>Minimum digital size is 24px tall; minimum print is 0.5 inches.</span></li>
            <li><span className="n">03</span><span>Only one tool color appears on the mark at a time. Never combine two.</span></li>
            <li><span className="n">04</span><span>The wordmark may be used alone in editorial settings; pair it with the mark in product chrome.</span></li>
            <li><span className="n">05</span><span>Don’t outline the wordmark, add drop shadows, rotate, or place on photographs.</span></li>
            <li><span className="n">06</span><span>Sub-tool lockups always read: <em>Erwin Public · Tool</em>, never <em>Tool by Erwin Public</em>.</span></li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const SectionScreens = () => {
  const [active, setActive] = useState(0);
  const screens = [TutorScreen, LibraryScreen, AtlasScreen, GalleryScreen, RecordsScreen, AlmanacScreen];
  const Active = screens[active];
  return (
    <section className="section">
      <div className="container">
        <div className="section-tag">07 — Tools in Practice</div>
        <h2 className="section-title">The system, applied.</h2>
        <p className="section-lede">
          Each tool sits inside the same scaffold — paper background, three-family type, mono metadata — but takes its color and glyph as its identity. A reader landing in any one feels at home in the rest.
        </p>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid var(--rule)' }}>
          {TOOLS.map((t, i) => {
            const { Glyph } = t;
            const isActive = active === i;
            return (
              <button key={t.id} onClick={() => setActive(i)} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 16px',
                background: isActive ? t.tint : 'transparent',
                border: '1px solid',
                borderColor: isActive ? t.color : 'var(--rule)',
                color: isActive ? t.color : 'var(--ink)',
                cursor: 'pointer',
                fontFamily: 'var(--serif)',
                fontSize: 16,
                letterSpacing: '-0.01em',
                borderRadius: 2,
                transition: 'all 0.15s',
              }}>
                <Glyph size={22} color={isActive ? t.color : 'var(--ink-soft)'}/>
                {t.name}
              </button>
            );
          })}
        </div>

        <Active/>

        <div style={{ marginTop: 24, fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--ink-mute)' }}>
          PROTOTYPE · {TOOLS[active].name.toUpperCase()} · Click another tool above to see the system shift color while keeping its bones.
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="footer">
    <div className="footer-grid">
      <div>
        <div className="brand">Erwin <em>Public</em></div>
        <p style={{ fontFamily: 'var(--serif)', fontSize: 16, lineHeight: 1.5, marginTop: 16, maxWidth: '36ch', color: 'var(--paper-300)', fontStyle: 'italic' }}>
          Free, actually useful. Founded 2026 by the Erwin family, in service of work that already belongs to the public.
        </p>
      </div>
      <div>
        <div className="col-title">Tools</div>
        <ul>{TOOLS.slice(0,3).map(t => <li key={t.id}>{t.name}</li>)}</ul>
      </div>
      <div>
        <div className="col-title">&nbsp;</div>
        <ul>{TOOLS.slice(3).map(t => <li key={t.id}>{t.name}</li>)}</ul>
      </div>
      <div>
        <div className="col-title">Brand</div>
        <ul>
          <li>Download assets</li>
          <li>Press kit</li>
          <li>Contact</li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
      <span>v1.0 · Brand System · April 2026</span>
      <span>This document is itself in the public domain.</span>
    </div>
  </footer>
);

const App = () => (
  <>
    <Hero/>
    <SectionTable/>
    <SectionMark/>
    <SectionColor/>
    <SectionType/>
    <SectionVoice/>
    <SectionComponents/>
    <SectionConstruction/>
    <SectionScreens/>
    <Footer/>
  </>
);

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
