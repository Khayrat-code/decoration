interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  /** "light" inverts the colour for dark backgrounds. */
  tone?: 'default' | 'light'
}

/**
 * ToolCan wordmark — SVG.
 *
 * The studio picked the designer's "Didone luxury" exploration
 * (high-contrast Didone serif + a thin calligraphic hairline
 * arching over the OO). The Didone feel — thin horizontals,
 * thick verticals, sharp serifs — gives the wordmark the
 * quiet-considered luxury tone the brief calls for.
 *
 * Built as a single 600×200 viewBox so the same source scales
 * from 120px (navbar) to 240px (footer) without re-tuning.
 *
 * `direction: ltr` + `unicode-bidi: isolate` keep the mark
 * from flipping to "NACLOOT" under the page's RTL flow.
 */
export function Logo({ size = 'md', tone = 'default' }: LogoProps) {
  const color = tone === 'light' ? '#F5F1EA' : '#3D4F3D'
  const width = size === 'sm' ? 120 : size === 'lg' ? 240 : 168

  return (
    <span
      aria-label="ToolCan Decoration"
      style={{
        direction: 'ltr',
        unicodeBidi: 'isolate',
        display: 'inline-block',
        lineHeight: 0,
      }}
    >
      <svg
        viewBox="0 0 600 200"
        width={width}
        height={width / 3}
        role="img"
        aria-hidden="true"
      >
        {/* Wordmark — Playfair Display (a high-contrast Didone) with tight kerning */}
        <text
          x="50%"
          y="58%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="'Playfair Display', 'Bodoni 72', 'Didot', 'Georgia', serif"
          fontSize="78"
          fontWeight="500"
          fontStyle="normal"
          letterSpacing="2"
          fill={color}
        >
          TOOLCAN
        </text>

        {/* Hairline flourish — thin calligraphic curve arching over the OO.
            A single cubic curve, with a tiny uptick at the right tip that
            echoes the designer's hand-drawn ending. */}
        <path
          d="M 175 55 C 215 30, 260 22, 300 30 C 340 38, 375 50, 420 56"
          fill="none"
          stroke={color}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        {/* Tiny flick at the right tip of the flourish */}
        <path
          d="M 420 56 L 432 50 L 426 60"
          fill="none"
          stroke={color}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}
