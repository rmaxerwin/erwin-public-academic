// Erwin Public — SVG marks
// The parent mark: a circle with a horizon line — "public seal" / sun-on-horizon
// Each tool gets a glyph in the same geometric family

const EPMark = ({ size = 44, color = 'currentColor', accent }) => (
  <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
    {/* Outer ring */}
    <circle cx="22" cy="22" r="20" stroke={color} strokeWidth="1.5" fill="none" />
    {/* Horizon */}
    <line x1="2" y1="22" x2="42" y2="22" stroke={color} strokeWidth="1.5" />
    {/* Sun above horizon */}
    <circle cx="22" cy="22" r="9" fill={accent || color} />
    {/* Lower hemisphere subtle marks */}
    <line x1="14" y1="30" x2="30" y2="30" stroke={color} strokeWidth="1" opacity="0.4" />
    <line x1="17" y1="36" x2="27" y2="36" stroke={color} strokeWidth="1" opacity="0.3" />
  </svg>
);

const EPMarkLarge = ({ size = 200, color = '#1a160f', accent = '#c25a3a' }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
    <circle cx="100" cy="100" r="92" stroke={color} strokeWidth="2.5" fill="none" />
    <line x1="8" y1="100" x2="192" y2="100" stroke={color} strokeWidth="2.5" />
    <circle cx="100" cy="100" r="42" fill={accent} />
    <line x1="60" y1="138" x2="140" y2="138" stroke={color} strokeWidth="1.5" opacity="0.4" />
    <line x1="74" y1="160" x2="126" y2="160" stroke={color} strokeWidth="1.5" opacity="0.3" />
    <line x1="86" y1="178" x2="114" y2="178" stroke={color} strokeWidth="1.5" opacity="0.2" />
  </svg>
);

// Tool glyphs — share geometric DNA: built within a 56×56 frame, 1.5px strokes,
// each places a distinct symbol over the horizon line motif.

const GlyphTutor = ({ size = 56, color = '#c25a3a' }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
    <circle cx="28" cy="28" r="26" stroke={color} strokeWidth="1.5" />
    <line x1="2" y1="28" x2="54" y2="28" stroke={color} strokeWidth="1.5" />
    {/* open book */}
    <path d="M14 22 L28 18 L42 22 L42 32 L28 28 L14 32 Z" fill={color} fillOpacity="0.18" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
    <line x1="28" y1="18" x2="28" y2="28" stroke={color} strokeWidth="1.3" />
  </svg>
);

const GlyphLibrary = ({ size = 56, color = '#6b5d3e' }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
    <circle cx="28" cy="28" r="26" stroke={color} strokeWidth="1.5" />
    <line x1="2" y1="28" x2="54" y2="28" stroke={color} strokeWidth="1.5" />
    {/* stack of books */}
    <rect x="14" y="14" width="6" height="14" stroke={color} strokeWidth="1.3" fill={color} fillOpacity="0.18"/>
    <rect x="22" y="11" width="6" height="17" stroke={color} strokeWidth="1.3" fill={color} fillOpacity="0.3"/>
    <rect x="30" y="16" width="6" height="12" stroke={color} strokeWidth="1.3" fill={color} fillOpacity="0.18"/>
    <rect x="38" y="13" width="6" height="15" stroke={color} strokeWidth="1.3" fill={color} fillOpacity="0.3"/>
  </svg>
);

const GlyphAtlas = ({ size = 56, color = '#2f6b56' }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
    <circle cx="28" cy="28" r="26" stroke={color} strokeWidth="1.5" />
    <line x1="2" y1="28" x2="54" y2="28" stroke={color} strokeWidth="1.5" />
    {/* Compass / map ticks */}
    <path d="M28 10 L32 24 L28 22 L24 24 Z" fill={color} stroke={color} strokeWidth="1" strokeLinejoin="round"/>
    <circle cx="28" cy="22" r="2" fill="none" stroke={color} strokeWidth="1"/>
    {/* meridian arc */}
    <path d="M16 28 Q 28 4 40 28" stroke={color} strokeWidth="1" fill="none" opacity="0.5"/>
  </svg>
);

const GlyphGallery = ({ size = 56, color = '#8e4c6d' }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
    <circle cx="28" cy="28" r="26" stroke={color} strokeWidth="1.5" />
    <line x1="2" y1="28" x2="54" y2="28" stroke={color} strokeWidth="1.5" />
    {/* picture frame */}
    <rect x="14" y="14" width="28" height="20" stroke={color} strokeWidth="1.3" fill={color} fillOpacity="0.15"/>
    <circle cx="22" cy="22" r="2.5" fill={color}/>
    <path d="M16 32 L23 24 L29 28 L34 22 L40 32 Z" fill={color} fillOpacity="0.6"/>
  </svg>
);

const GlyphRecords = ({ size = 56, color = '#2b5577' }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
    <circle cx="28" cy="28" r="26" stroke={color} strokeWidth="1.5" />
    <line x1="2" y1="28" x2="54" y2="28" stroke={color} strokeWidth="1.5" />
    {/* document with seal */}
    <path d="M16 12 L36 12 L40 16 L40 36 L16 36 Z" stroke={color} strokeWidth="1.3" fill={color} fillOpacity="0.15"/>
    <line x1="20" y1="20" x2="32" y2="20" stroke={color} strokeWidth="1"/>
    <line x1="20" y1="24" x2="34" y2="24" stroke={color} strokeWidth="1"/>
    <circle cx="34" cy="32" r="3" fill={color}/>
  </svg>
);

const GlyphAlmanac = ({ size = 56, color = '#c08a2e' }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
    <circle cx="28" cy="28" r="26" stroke={color} strokeWidth="1.5" />
    <line x1="2" y1="28" x2="54" y2="28" stroke={color} strokeWidth="1.5" />
    {/* sun rays / calendar */}
    <circle cx="28" cy="22" r="6" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.3"/>
    <line x1="28" y1="10" x2="28" y2="13" stroke={color} strokeWidth="1.3"/>
    <line x1="18" y1="22" x2="21" y2="22" stroke={color} strokeWidth="1.3"/>
    <line x1="35" y1="22" x2="38" y2="22" stroke={color} strokeWidth="1.3"/>
    <line x1="20" y1="14" x2="22" y2="16" stroke={color} strokeWidth="1.3"/>
    <line x1="34" y1="16" x2="36" y2="14" stroke={color} strokeWidth="1.3"/>
    {/* horizon dates */}
    <rect x="18" y="32" width="20" height="8" stroke={color} strokeWidth="1" fill="none"/>
    <line x1="24" y1="32" x2="24" y2="40" stroke={color} strokeWidth="1"/>
    <line x1="32" y1="32" x2="32" y2="40" stroke={color} strokeWidth="1"/>
  </svg>
);

const TOOLS = [
  { id: 'academic', name: 'Academic', tagline: 'State-aligned learning, free for everyone',  Glyph: GlyphTutor,   color: '#c25a3a', tint: '#f6e3d7' },
  { id: 'library',  name: 'Library',  tagline: 'Public-domain books, formatted to read',          Glyph: GlyphLibrary, color: '#6b5d3e', tint: '#ece5d0' },
  { id: 'atlas',    name: 'Atlas',    tagline: 'Local history, mapped to where you live',         Glyph: GlyphAtlas,   color: '#2f6b56', tint: '#d6e4d9' },
  { id: 'gallery', name: 'Gallery', tagline: 'Public-domain art, ready to use',         Glyph: GlyphGallery, color: '#8e4c6d', tint: '#ecd8e1' },
  { id: 'records', name: 'Records', tagline: 'Government data, made legible',           Glyph: GlyphRecords, color: '#2b5577', tint: '#d4dee8' },
  { id: 'almanac', name: 'Almanac', tagline: 'Civic facts, for the year ahead',         Glyph: GlyphAlmanac, color: '#c08a2e', tint: '#f2e2bd' },
];

Object.assign(window, {
  EPMark, EPMarkLarge,
  GlyphTutor, GlyphLibrary, GlyphAtlas, GlyphGallery, GlyphRecords, GlyphAlmanac,
  TOOLS,
});
