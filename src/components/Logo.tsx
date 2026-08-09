interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  /** "light" inverts the colour for dark backgrounds. */
  tone?: 'default' | 'light'
}

/**
 * ToolCan text wordmark.
 *
 * Renders "TOOLCAN" as elegant serif capitals in the brand sage
 * colour. The two O's are visually drawn as overlapping glyphs
 * (using a negative-margin trick) so the mark reads as a single
 * confident word rather than eight separate letters — closer to
 * the studio's preferred reference look.
 *
 * The brand name is the brand name, so this never transliterates
 * to Arabic, regardless of the active UI language.
 */
export function Logo({ size = 'md', tone = 'default' }: LogoProps) {
  const dims = {
    sm: { fontSize: 18, overlap: '0.18em' },
    md: { fontSize: 23, overlap: '0.18em' },
    lg: { fontSize: 34, overlap: '0.16em' },
  }[size]

  const color = tone === 'light' ? '#F5F1EA' : 'var(--accent)'

  return (
    <span
      aria-label="ToolCan Decoration"
      // The brand name is always read L→R regardless of the page
      // direction. `unicode-bidi: isolate` keeps it out of the
      // surrounding RTL flow so it never flips to "NACLOOT".
      style={{
        direction: 'ltr',
        unicodeBidi: 'isolate',
        display: 'inline-flex',
        alignItems: 'baseline',
        lineHeight: 1,
        fontFamily: "'Fraunces', 'Cormorant Garamond', Georgia, serif",
        fontSize: dims.fontSize,
        fontWeight: 500,
        letterSpacing: '0.06em',
        color,
        fontFeatureSettings: '"liga" 1, "dlig" 1',
      }}
    >
      <span style={{ display: 'inline-block' }}>T</span>
      <span
        aria-hidden="true"
        style={{
          display: 'inline-block',
          marginInlineStart: `-${dims.overlap}`,
        }}
      >
        O
      </span>
      <span
        aria-hidden="true"
        style={{
          display: 'inline-block',
          marginInlineStart: `-${dims.overlap}`,
        }}
      >
        O
      </span>
      <span style={{ display: 'inline-block' }}>LCAN</span>
    </span>
  )
}
