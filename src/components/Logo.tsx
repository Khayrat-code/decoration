interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  /** "light" inverts the colour for dark backgrounds. */
  tone?: 'default' | 'light'
}

/**
 * ToolCan wordmark — SVG.
 *
 * Rebuilt directly from the designer's reference. The studio
 * is going for a classical Times-Roman / Georgia serif with
 * two small hand-drawn marks: a short diagonal slash under
 * the first O and a tiny caret over the A.
 *
 * The designer's reference render shows the slash sitting
 * CLEARLY UNDER the first O (a small hand-drawn mark in the
 * whitespace below the letter, not crossing through it).
 * The literal SVG coordinates that came back from the studio
 * place the line in the O's vertical range, so on most
 * rendering engines the line ends up looking like a
 * strikethrough on the O. We nudge the y coords down so the
 * mark sits in the white space below the baseline, matching
 * what the designer actually drew.
 *
 * Colour is the brand sage (default) or linen (light tone
 * for dark footers) — never the designer's gold.
 *
 * The whole mark lives in a single 600×200 viewBox so it
 * scales cleanly from 120px wide (navbar) up to 240px (footer).
 *
 * `direction: ltr` + `unicode-bidi: isolate` keep the mark
 * from flipping to "NACLOOT" under the page's RTL flow.
 */
export function Logo({ size = 'md', tone = 'default' }: LogoProps) {
  const color = tone === 'light' ? '#F5F1EA' : '#3D4F3D'
  // Width is the only thing we drive; height follows the
  // 600×200 viewBox aspect (1:3).
  const width =
    size === 'sm' ? 120 : size === 'lg' ? 240 : 168

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
        <text
          x="50%"
          y="55%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="'Times New Roman', 'Georgia', 'Liberation Serif', serif"
          fontSize="72"
          fontWeight="400"
          letterSpacing="8"
          fill={color}
        >
          T<tspan dx="-2">O</tspan><tspan dx="-2">O</tspan><tspan dx="-1">L</tspan><tspan dx="-1">C</tspan><tspan dx="-2">A</tspan><tspan dx="-1">N</tspan>
        </text>
        {/* Short diagonal slash crossing the lower-left of the first O (the designer's hand-drawn mark) */}
        <line
          x1="195"
          y1="95"
          x2="225"
          y2="125"
          stroke={color}
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        {/* Tiny caret over the A — with breathing room so it doesn't fuse with the apex at small sizes */}
        <path
          d="M 422 68 L 432 50 L 434 68"
          fill="none"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}
