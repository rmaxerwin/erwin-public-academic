// Sample screens — small believable mocks of each tool, each in its own color
// They share: top bar with parent + tool lockup, generous serif type, mono labels

const ScreenChrome = ({ url }) => (
  <div className="screen-chrome">
    <div className="dots"><span/><span/><span/></div>
    <div className="url">{url}</div>
  </div>
);

const ToolHeader = ({ tool }) => {
  const { Glyph, name, color } = tool;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '18px 28px', borderBottom: '1px solid var(--rule)',
      background: 'var(--paper-50)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <Glyph size={36} color={color} />
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-mute)' }}>Erwin Public</span>
          <span style={{ fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 500, letterSpacing: '-0.015em', marginTop: 2 }}>{name}</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 20, fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-soft)' }}>
        <span>Browse</span><span>Search</span><span>About</span>
        <span style={{ padding: '4px 10px', borderRadius: 999, background: tool.tint, color: tool.color, fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Free · Public</span>
      </div>
    </div>
  );
};

// — Tutor screen
const TutorScreen = () => {
  const tool = TOOLS[0];
  const [msg, setMsg] = React.useState('');
  const [chat, setChat] = React.useState([
    { from: 'student', text: 'Why did the colonies want independence?' },
    { from: 'tutor', text: 'Great question. Your 8th-grade Texas standard (TEKS 8.4A) asks you to identify reasons. Let\u2019s start with three: taxation without representation, the Quartering Act, and...' },
  ]);
  return (
    <div className="screen-frame" style={{ background: '#fbf8f2' }}>
      <ScreenChrome url="academic.erwinpublic.org / tutor / american-history-8" />
      <ToolHeader tool={tool} />
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', minHeight: 480 }}>
        <aside style={{ borderRight: '1px solid var(--rule)', padding: '24px 20px', background: 'var(--paper-100)' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-mute)', marginBottom: 16 }}>Standards</div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 14, lineHeight: 1.5 }}>
            {['Texas · Grade 8 · TEKS 8.4', 'Texas · Grade 8 · TEKS 8.5', 'Texas · Grade 8 · TEKS 8.6'].map((s, i) => (
              <div key={i} style={{ padding: '10px 0', borderBottom: '1px solid var(--rule)', color: i === 0 ? tool.color : 'var(--ink)', fontWeight: i === 0 ? 600 : 400 }}>{s}</div>
            ))}
          </div>
          <div style={{ marginTop: 28, padding: 14, background: tool.tint, borderRadius: 2, fontFamily: 'var(--serif)', fontSize: 13, fontStyle: 'italic', color: tool.color }}>
            Academic · Tutor — answers stay within the listed standards.
          </div>
        </aside>
        <main style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: 26, fontWeight: 400, margin: 0, marginBottom: 4, letterSpacing: '-0.015em' }}>American History · Unit 3</h3>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-mute)', marginBottom: 24 }}>Causes of the Revolution</div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {chat.map((m, i) => (
              <div key={i} style={{
                alignSelf: m.from === 'student' ? 'flex-end' : 'flex-start',
                maxWidth: '78%',
                padding: '12px 16px',
                borderRadius: 2,
                background: m.from === 'student' ? 'var(--paper-100)' : tool.tint,
                border: m.from === 'student' ? '1px solid var(--rule)' : 'none',
                fontFamily: 'var(--serif)', fontSize: 15, lineHeight: 1.5,
                color: m.from === 'tutor' ? tool.color : 'var(--ink)',
              }}>{m.text}</div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 18, paddingTop: 18, borderTop: '1px solid var(--rule)' }}>
            <input className="ep-input" placeholder="Ask about this unit\u2026" value={msg} onChange={e => setMsg(e.target.value)} />
            <button className="ep-btn primary" style={{ background: tool.color }} onClick={() => {
              if (!msg.trim()) return;
              setChat([...chat, { from: 'student', text: msg }]);
              setMsg('');
            }}>Send <span className="arrow">→</span></button>
          </div>
        </main>
      </div>
    </div>
  );
};

// — Library screen
const LibraryScreen = () => {
  const tool = TOOLS[1];
  const books = [
    { title: 'Walden', author: 'Henry David Thoreau', year: 1854 },
    { title: 'The Souls of Black Folk', author: 'W. E. B. Du Bois', year: 1903 },
    { title: 'Middlemarch', author: 'George Eliot', year: 1871 },
    { title: 'The Awakening', author: 'Kate Chopin', year: 1899 },
    { title: 'Narrative of the Life', author: 'Frederick Douglass', year: 1845 },
    { title: 'Pride and Prejudice', author: 'Jane Austen', year: 1813 },
  ];
  return (
    <div className="screen-frame">
      <ScreenChrome url="library.erwinpublic.org" />
      <ToolHeader tool={tool} />
      <div style={{ padding: '32px 28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 28 }}>
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: 32, fontWeight: 400, margin: 0, letterSpacing: '-0.02em' }}>
            <em style={{ fontStyle: 'italic', color: tool.color }}>Books</em> in the public domain
          </h3>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-mute)' }}>74,201 titles · plain text & EPUB</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {books.map((b, i) => (
            <div key={i} style={{ border: '1px solid var(--rule)', background: 'var(--paper-50)', padding: 0, display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: 100, background: i % 2 ? tool.tint : 'var(--paper-100)', position: 'relative', borderBottom: `1px solid ${tool.color}` }}>
                <div style={{ position: 'absolute', bottom: 10, left: 12, right: 12, fontFamily: 'var(--serif)', fontSize: 12, fontStyle: 'italic', color: tool.color }}>{b.year}</div>
              </div>
              <div style={{ padding: '14px 16px' }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 17, fontWeight: 500, lineHeight: 1.2, marginBottom: 4 }}>{b.title}</div>
                <div style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--ink-mute)' }}>{b.author}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// — Atlas screen
const AtlasScreen = () => {
  const tool = TOOLS[2];
  return (
    <div className="screen-frame">
      <ScreenChrome url="atlas.erwinpublic.org / philadelphia, pa" />
      <ToolHeader tool={tool} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', minHeight: 480 }}>
        <div style={{ position: 'relative', background: tool.tint, overflow: 'hidden' }}>
          {/* faux map */}
          <svg width="100%" height="100%" viewBox="0 0 600 480" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke={tool.color} strokeWidth="0.5" opacity="0.25"/>
              </pattern>
            </defs>
            <rect width="600" height="480" fill="url(#grid)"/>
            {/* river */}
            <path d="M0 200 Q 150 180, 300 220 T 600 200 L 600 280 Q 450 260, 300 280 T 0 270 Z" fill={tool.color} opacity="0.15"/>
            <path d="M0 240 Q 150 220, 300 250 T 600 240" fill="none" stroke={tool.color} strokeWidth="1.5" opacity="0.5"/>
            {/* roads */}
            <line x1="150" y1="0" x2="150" y2="480" stroke={tool.color} strokeWidth="1" opacity="0.3"/>
            <line x1="300" y1="0" x2="300" y2="480" stroke={tool.color} strokeWidth="1" opacity="0.3"/>
            <line x1="450" y1="0" x2="450" y2="480" stroke={tool.color} strokeWidth="1" opacity="0.3"/>
            <line x1="0" y1="120" x2="600" y2="120" stroke={tool.color} strokeWidth="1" opacity="0.3"/>
            <line x1="0" y1="360" x2="600" y2="360" stroke={tool.color} strokeWidth="1" opacity="0.3"/>
            {/* pins */}
            {[[180,140,'1776'],[340,90,'1812'],[420,310,'1854'],[200,380,'1901'],[490,160,'1933']].map(([x,y,year],i)=>(
              <g key={i}>
                <circle cx={x} cy={y} r="6" fill={tool.color}/>
                <circle cx={x} cy={y} r="14" fill={tool.color} opacity="0.2"/>
                <text x={x+12} y={y+4} fontFamily="JetBrains Mono" fontSize="11" fill={tool.color}>{year}</text>
              </g>
            ))}
          </svg>
        </div>
        <aside style={{ borderLeft: '1px solid var(--rule)', padding: '24px 20px', background: 'var(--paper-50)' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-mute)', marginBottom: 14 }}>5 documents · this view</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              ['1776', 'Pennsylvania Gazette, July', 'Newspaper'],
              ['1812', 'Trade ledger, Front St.', 'Ledger'],
              ['1854', 'Almshouse intake records', 'Civic'],
              ['1901', 'Schuylkill flood photographs', 'Photo'],
              ['1933', 'WPA mural commission', 'Art'],
            ].map(([y, t, k], i) => (
              <div key={i} style={{ paddingBottom: 12, borderBottom: '1px solid var(--rule)' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: tool.color, letterSpacing: '0.1em' }}>{y} · {k}</div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 15, lineHeight: 1.3, marginTop: 4 }}>{t}</div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

// — Gallery screen
const GalleryScreen = () => {
  const tool = TOOLS[3];
  const items = [
    { t: 'Still Life with Apples', a: 'Cézanne · 1893', h: 200 },
    { t: 'The Great Wave', a: 'Hokusai · 1831', h: 160 },
    { t: 'Water Lilies', a: 'Monet · 1906', h: 220 },
    { t: 'Wheatfield with Crows', a: 'van Gogh · 1890', h: 180 },
    { t: 'Self-Portrait', a: 'Rembrandt · 1659', h: 240 },
    { t: 'A Bar at the Folies-Bergère', a: 'Manet · 1882', h: 170 },
  ];
  return (
    <div className="screen-frame">
      <ScreenChrome url="gallery.erwinpublic.org" />
      <ToolHeader tool={tool} />
      <div style={{ padding: '32px 28px' }}>
        <h3 style={{ fontFamily: 'var(--serif)', fontSize: 32, fontWeight: 400, margin: 0, letterSpacing: '-0.02em', marginBottom: 8 }}>
          Pick a piece. <em style={{ fontStyle: 'italic', color: tool.color }}>Use it however you like.</em>
        </h3>
        <div style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--ink-soft)', marginBottom: 24 }}>
          Every work here is in the public domain — verified, with high-resolution downloads and ready-to-paste citations.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, gridAutoRows: 8, gridAutoFlow: 'dense' }}>
          {items.map((it, i) => (
            <div key={i} style={{ gridRow: `span ${Math.round(it.h / 8)}`, border: '1px solid var(--rule)', position: 'relative', overflow: 'hidden', background: i % 2 ? tool.tint : 'var(--paper-100)' }}>
              <div style={{ position: 'absolute', inset: 0, background: `repeating-linear-gradient(${45 + i * 30}deg, ${tool.color}22, ${tool.color}22 2px, transparent 2px, transparent 12px)` }}/>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 12, background: 'rgba(251,248,242,0.92)', borderTop: '1px solid var(--rule)' }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 14, fontStyle: 'italic', lineHeight: 1.2, marginBottom: 2 }}>{it.t}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: tool.color, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{it.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// — Records screen
const RecordsScreen = () => {
  const tool = TOOLS[4];
  return (
    <div className="screen-frame">
      <ScreenChrome url="records.erwinpublic.org / housing-permits / cuyahoga, oh" />
      <ToolHeader tool={tool} />
      <div style={{ padding: '32px 28px' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-mute)', marginBottom: 8 }}>HUD · Building Permits · 2018–2025</div>
        <h3 style={{ fontFamily: 'var(--serif)', fontSize: 32, fontWeight: 400, margin: 0, letterSpacing: '-0.02em', marginBottom: 28 }}>
          New housing permits in <em style={{ fontStyle: 'italic', color: tool.color }}>Cuyahoga County</em>
        </h3>
        {/* bar chart */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 16, alignItems: 'end', height: 200, marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--rule)' }}>
          {[62, 71, 58, 49, 84, 102, 117, 108].map((v, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: tool.color }}>{v}</div>
              <div style={{ width: '100%', height: `${v * 1.4}px`, background: tool.color, opacity: i === 7 ? 1 : 0.5 + i * 0.06 }}/>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 16, fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-mute)', textAlign: 'center' }}>
          {['2018','2019','2020','2021','2022','2023','2024','2025'].map(y => <div key={y}>{y}</div>)}
        </div>
        <div style={{ marginTop: 28, padding: 16, background: tool.tint, borderLeft: `3px solid ${tool.color}` }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: tool.color, marginBottom: 6 }}>What this means for you</div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 16, lineHeight: 1.5 }}>Permit volume is up 74% since 2020. If you own in 44106, expect appraisal pressure through 2026.</div>
        </div>
      </div>
    </div>
  );
};

// — Almanac screen
const AlmanacScreen = () => {
  const tool = TOOLS[5];
  return (
    <div className="screen-frame">
      <ScreenChrome url="almanac.erwinpublic.org / 2026" />
      <ToolHeader tool={tool} />
      <div style={{ padding: '32px 28px' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-mute)', marginBottom: 8 }}>Volume IV · For the year 2026</div>
        <h3 style={{ fontFamily: 'var(--serif)', fontSize: 36, fontWeight: 400, margin: 0, letterSpacing: '-0.02em', marginBottom: 32 }}>
          The <em style={{ fontStyle: 'italic', color: tool.color }}>Almanac</em>
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, fontFamily: 'var(--serif)', fontSize: 15, lineHeight: 1.6 }}>
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', color: tool.color, marginBottom: 12, paddingBottom: 8, borderBottom: `1px solid ${tool.color}` }}>ELECTIONS · NATIONAL</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}><span>Midterm general</span><span style={{ fontFamily: 'var(--mono)' }}>Nov 3</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}><span>Voter registration deadline (avg)</span><span style={{ fontFamily: 'var(--mono)' }}>Oct 5</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}><span>FAFSA opens</span><span style={{ fontFamily: 'var(--mono)' }}>Oct 1</span></div>

            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', color: tool.color, marginTop: 24, marginBottom: 12, paddingBottom: 8, borderBottom: `1px solid ${tool.color}` }}>FILING DEADLINES</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}><span>Federal income tax</span><span style={{ fontFamily: 'var(--mono)' }}>Apr 15</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}><span>Property tax (varies)</span><span style={{ fontFamily: 'var(--mono)' }}>Jan 31</span></div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', color: tool.color, marginBottom: 12, paddingBottom: 8, borderBottom: `1px solid ${tool.color}` }}>BENEFITS WINDOWS</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}><span>Medicare open enrollment</span><span style={{ fontFamily: 'var(--mono)' }}>Oct 15 – Dec 7</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}><span>Marketplace open enrollment</span><span style={{ fontFamily: 'var(--mono)' }}>Nov 1 – Jan 15</span></div>

            <div style={{ marginTop: 24, padding: 16, background: tool.tint, fontStyle: 'italic', fontSize: 14, color: tool.color }}>
              Customized for your zip code. Subscribe and we’ll mail you a printed copy in December.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, {
  TutorScreen, LibraryScreen, AtlasScreen,
  GalleryScreen, RecordsScreen, AlmanacScreen,
});
