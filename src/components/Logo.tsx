import { useLang } from '../i18n/LanguageContext'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'full' | 'mark'
  /** "light" inverts for dark backgrounds. */
  tone?: 'default' | 'light'
}

/**
 * ToolCan brand mark.
 * - Mark only: a "T" inside a sage rounded square with a small caramel dot.
 * - Full: mark + wordmark (ToolCan / تولكان) + subtitle.
 * In Arabic the wordmark reads "تولكان" with "للديكور" beneath.
 */
export function Logo({ size = 'md', variant = 'full', tone = 'default' }: LogoProps) {
  const { lang } = useLang()
  const dims = {
    sm: { mark: 26, fontSize: 16, eyebrowSize: 7, gap: 8 },
    md: { mark: 34, fontSize: 21, eyebrowSize: 8, gap: 12 },
    lg: { mark: 48, fontSize: 30, eyebrowSize: 9, gap: 16 },
  }[size]

  const strokeW = dims.mark <= 30 ? 2.2 : 3
  const dotSize = dims.mark <= 30 ? 2.2 : 3

  const wordColor = tone === 'light' ? '#F5F1EA' : 'var(--ink)'
  const subColor = tone === 'light' ? 'rgba(245, 241, 234, 0.72)' : 'var(--ink-2)'

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: dims.gap,
        lineHeight: 1,
      }}
      aria-label={lang === 'ar' ? 'تولكان للديكور' : 'ToolCan Decoration'}
    >
      <svg
        width={dims.mark}
        height={dims.mark}
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="40" height="40" rx="7" fill="#3D4F3D" />
        <rect x="10" y="11" width="20" height={strokeW} fill="#F5F1EA" />
        <rect x="18.3" y="11" width={strokeW} height="19" fill="#F5F1EA" />
        <rect x="29" y="29" width={dotSize} height={dotSize} rx="0.5" fill="#B8835A" />
      </svg>
      {variant === 'full' && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: lang === 'ar' ? 4 : 3,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: dims.fontSize,
              fontWeight: lang === 'ar' ? 700 : 500,
              color: wordColor,
              letterSpacing: lang === 'ar' ? 0 : '-0.01em',
            }}
          >
            {lang === 'ar' ? 'تولكان' : 'ToolCan'}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: dims.eyebrowSize + 3,
              fontWeight: 500,
              letterSpacing: lang === 'ar' ? 0 : '0.22em',
              color: subColor,
              textTransform: lang === 'ar' ? 'none' : 'uppercase',
            }}
          >
            {lang === 'ar' ? 'للديكور' : 'Decoration'}
          </span>
        </div>
      )}
    </div>
  )
}
