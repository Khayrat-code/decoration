interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  /** "light" inverts the colour for dark backgrounds. */
  tone?: 'default' | 'light'
  /** Hide the small swash flourish below the wordmark. */
  noFlourish?: boolean
}

/**
 * ToolCan text wordmark.
 *
 * Rebuilt to match the designer's reference samples:
 *   - High-contrast Didone-style serif (Playfair Display)
 *   - The two O's overlap ~32% of their width via negative
 *     margin so the mark reads as a single confident word
 *     rather than eight separate letters
 *   - A small curved swash sits centred under the wordmark,
 *     echoing the flourish in the designer's samples
 *   - Always renders in the brand sage colour, never in
 *     gold — that's the studio's only deviation from the
 *     reference, as requested
 *
 * `direction: ltr` + `unicode-bidi: isolate` keep the mark
 * from flipping to "NACLOOT" under the page's RTL flow.
 */
export function Logo({ size = 'md', tone = 'default', noFlourish = false }: LogoProps) {
  const dims = {
    sm: { fontSize: 20, overlap: '0.18em', flourishW: 40, flourishH: 5, flourishY: 1.5 },
    md: { fontSize: 26, overlap: '0.20em', flourishW: 54, flourishH: 6, flourishY: 1.8 },
    lg: { fontSize: 40, overlap: '0.18em', flourishW: 84, flourishH: 8, flourishY: 2.2 },
  }[size]

  const color = tone === 'light' ? '#F5F1EA' : 'var(--accent)'
  const opacity = tone === 'light' ? 0.78 : 0.55

  return (
    <span
      aria-label="ToolCan Decoration"
      style={{
        direction: 'ltr',
        unicodeBidi: 'isolate',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        lineHeight: 1,
        gap: 3,
      }}
    >
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'baseline',
          fontFamily: "'Playfair Display', 'Cormorant Garamond', 'Fraunces', Georgia, serif",
          fontSize: dims.fontSize,
          fontWeight: 500,
          letterSpacing: '0.03em',
          color,
          fontFeatureSettings: '"liga" 1, "dlig" 1, "kern" 1',
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

      {!noFlourish && (
        <svg
          aria-hidden="true"
          width={dims.flourishW}
          height={dims.flourishH}
          viewBox={`0 0 ${dims.flourishW} ${dims.flourishH}`}
          fill="none"
          stroke={color}
          strokeOpacity={opacity}
          strokeWidth="0.7"
          strokeLinecap="round"
        >
          {/* Gentle curve: starts thin on the left, dips, returns to the right.
              Echoes the swash under the wordmark in the designer's samples. */}
          <path
            d={`M 2 ${dims.flourishY} Q ${dims.flourishW / 2} ${dims.flourishH - 0.5} ${dims.flourishW - 2} ${dims.flourishY}`}
          />
        </svg>
      )}
    </span>
  )
}
