// Branded payment + trust icons.
//
// Inline SVGs only — no external CDNs, no fonts to download, no images to
// cache. Each icon is a small `<svg>` that renders at any size and
// respects its container's `currentColor` / background.
//
// Brand references are public logos used under fair use to identify
// accepted payment / verification methods on a merchant site.

import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function svg(
  content: React.ReactNode,
  vb: string,
  bg: string,
  fg: string,
  radius: number,
) {
  return function Icon({ size = 28, style, ...rest }: IconProps) {
    return (
      <svg
        viewBox={vb}
        width={size}
        height={(size * parseInt(vb.split(' ')[3])) / parseInt(vb.split(' ')[2])}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
        {...rest}
      >
        <rect width="100%" height="100%" rx={radius} ry={radius} fill={bg} />
        {content}
        {fg ? null : null}
      </svg>
    )
  }
}

/* ============================================================
   MADA — Saudi domestic card network
   ============================================================ */
export const MadaIcon = svg(
  <>
    <text
      x="50%"
      y="62%"
      textAnchor="middle"
      dominantBaseline="middle"
      fontFamily="'Playfair Display', Georgia, serif"
      fontSize="48"
      fontWeight="700"
      fontStyle="italic"
      letterSpacing="-2"
      fill="#FFFFFF"
    >
      mada
    </text>
  </>,
  '0 0 168 56',
  '#1B7344',
  '#FFFFFF',
  6,
)

/* ============================================================
   VISA — international card network
   ============================================================ */
export const VisaIcon = svg(
  <>
    <text
      x="50%"
      y="64%"
      textAnchor="middle"
      dominantBaseline="middle"
      fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
      fontSize="34"
      fontWeight="900"
      fontStyle="italic"
      letterSpacing="1"
      fill="#FFFFFF"
    >
      VISA
    </text>
  </>,
  '0 0 168 56',
  '#1A1F71',
  '#FFFFFF',
  6,
)

/* ============================================================
   MASTERCARD — two interlocking circles (no wordmark — keeps it
   honest and not subject to the wordmark font restrictions).
   ============================================================ */
export const MastercardIcon = svg(
  <>
    <circle cx="68" cy="28" r="20" fill="#EB001B" />
    <circle cx="100" cy="28" r="20" fill="#F79E1B" />
    <path
      d="M84 13a20 20 0 0 0 0 30 20 20 0 0 0 0-30z"
      fill="#FF5F00"
    />
  </>,
  '0 0 168 56',
  '#FFFFFF',
  '',
  6,
)

/* ============================================================
   AMEX — American Express
   ============================================================ */
export const AmexIcon = svg(
  <>
    <text
      x="50%"
      y="64%"
      textAnchor="middle"
      dominantBaseline="middle"
      fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
      fontSize="22"
      fontWeight="900"
      letterSpacing="1.5"
      fill="#FFFFFF"
    >
      AMEX
    </text>
  </>,
  '0 0 168 56',
  '#2E77BC',
  '#FFFFFF',
  6,
)

/* ============================================================
   APPLE PAY
   ============================================================ */
export const ApplePayIcon = svg(
  <>
    {/* Apple */}
    <path
      d="M58 18.6c-.7.9-1.9 1.6-3 1.5-.2-1.2.3-2.4 1-3.2.7-.9 1.9-1.6 3-1.5.1 1.2-.3 2.4-1 3.2zm1 1.6c-1.7-.1-3.1.9-3.9.9-.8 0-2-.9-3.3-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.3 2.5 1.3-.1 1.8-.9 3.4-.9 1.6 0 2 .9 3.4.8 1.4 0 2.3-1.2 3.2-2.5 1-1.4 1.4-2.8 1.4-2.9-.1 0-2.7-1-2.7-4 0-2.5 2-3.7 2.1-3.8-1.1-1.7-2.9-1.9-3.5-2z"
      fill="#FFFFFF"
    />
    {/* Pay */}
    <text
      x="76"
      y="36"
      fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
      fontSize="20"
      fontWeight="600"
      fill="#FFFFFF"
    >
      Pay
    </text>
  </>,
  '0 0 168 56',
  '#000000',
  '#FFFFFF',
  6,
)

/* ============================================================
   TABBY — Buy now, pay later
   ============================================================ */
export const TabbyIcon = svg(
  <>
    <text
      x="50%"
      y="62%"
      textAnchor="middle"
      dominantBaseline="middle"
      fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif"
      fontSize="30"
      fontWeight="700"
      letterSpacing="-1"
      fill="#FFFFFF"
    >
      tabby
    </text>
    {/* four-square dot — Tabby's signature mark */}
    <circle cx="138" cy="46" r="2" fill="#3DDC97" />
    <circle cx="146" cy="46" r="2" fill="#3DDC97" />
    <circle cx="138" cy="40" r="2" fill="#3DDC97" />
    <circle cx="146" cy="40" r="2" fill="#3DDC97" />
  </>,
  '0 0 168 56',
  '#0E1F2C',
  '#FFFFFF',
  6,
)

/* ============================================================
   TAMARA — Buy now, pay later (KSA/UAE)
   ============================================================ */
export const TamaraIcon = svg(
  <>
    <text
      x="50%"
      y="62%"
      textAnchor="middle"
      dominantBaseline="middle"
      fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif"
      fontSize="28"
      fontWeight="700"
      letterSpacing="-0.5"
      fill="#FFFFFF"
    >
      tamara
    </text>
  </>,
  '0 0 168 56',
  '#13395C',
  '#FFFFFF',
  6,
)

/* ============================================================
   BANK TRANSFER
   ============================================================ */
export const BankIcon = svg(
  <>
    <path
      d="M84 12 L112 28 H56 Z"
      fill="#FFFFFF"
    />
    <rect x="58" y="32" width="6" height="14" fill="#FFFFFF" />
    <rect x="68" y="32" width="6" height="14" fill="#FFFFFF" />
    <rect x="78" y="32" width="6" height="14" fill="#FFFFFF" />
    <rect x="88" y="32" width="6" height="14" fill="#FFFFFF" />
    <rect x="98" y="32" width="6" height="14" fill="#FFFFFF" />
    <rect x="108" y="32" width="6" height="14" fill="#FFFFFF" />
    <rect x="50" y="48" width="72" height="4" fill="#FFFFFF" />
  </>,
  '0 0 168 56',
  '#3D4F3D',
  '#FFFFFF',
  6,
)

/* ============================================================
   CASH ON DELIVERY
   ============================================================ */
export const CodIcon = svg(
  <>
    <rect x="56" y="18" width="56" height="28" rx="3" fill="#FFFFFF" />
    <rect x="56" y="22" width="56" height="6" fill="#3D4F3D" />
    <rect x="62" y="32" width="14" height="10" fill="#3D4F3D" />
  </>,
  '0 0 168 56',
  '#B8835A',
  '#FFFFFF',
  6,
)

/* ============================================================
   CR — Commercial Registration document (Saudi)
   A neutral ribbon + page icon, not a counterfeit logo.
   ============================================================ */
export const CRIcon = svg(
  <>
    <rect x="64" y="10" width="40" height="40" rx="3" fill="#FFFFFF" />
    <rect x="68" y="14" width="32" height="3" fill="#B8835A" />
    <rect x="68" y="20" width="32" height="2" fill="#3D4F3D" />
    <rect x="68" y="25" width="22" height="2" fill="#5C5C5C" />
    <rect x="68" y="30" width="26" height="2" fill="#5C5C5C" />
    <rect x="68" y="35" width="18" height="2" fill="#5C5C5C" />
    <circle cx="100" cy="44" r="4" fill="#B8835A" />
  </>,
  '0 0 168 56',
  '#3D4F3D',
  '#FFFFFF',
  6,
)

/* ============================================================
   MAWTHOOG (Trusted / Verified Business) — Saudi verification badge
   Mint shield + checkmark.
   ============================================================ */
export const MawthoogIcon = svg(
  <>
    <path
      d="M84 10 L108 18 V32 C108 42 96 50 84 52 C72 50 60 42 60 32 V18 Z"
      fill="#FFFFFF"
    />
    <path
      d="M75 32 L82 39 L94 25"
      stroke="#3D7344"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </>,
  '0 0 168 56',
  '#0E5A36',
  '#FFFFFF',
  6,
)
