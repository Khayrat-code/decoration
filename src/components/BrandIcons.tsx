// Payment + trust badges.
//
// International/regional card & BNPL logos are the *real* brand marks —
// downloaded from Wikimedia Commons (freely licensed, exactly for this
// "accepted payment methods" use case) and self-hosted under
// /public/payments/ so the footer never depends on an external CDN.
// Tabby and Tamara have no public vector asset, so their wordmarks are
// hand-set in the brand's real colour.
//
// Every payment logo renders inside `PaymentBadge` — a small white
// "merchant badge" card (the convention used by virtually every KSA
// e-commerce footer, incl. zarva.sa) so each logo reads clearly against
// the dark footer background regardless of the brand's own palette.

export function PaymentBadge({
  src,
  label,
  pad = 10,
}: {
  src: string
  label: string
  pad?: number
}) {
  return (
    <span
      className="pay-badge"
      title={label}
      aria-label={label}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 64,
        height: 40,
        borderRadius: 8,
        background: '#FFFFFF',
        border: '1px solid rgba(0,0,0,0.06)',
        padding: pad,
        boxSizing: 'border-box',
        flexShrink: 0,
      }}
    >
      <img
        src={src}
        alt={label}
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
      />
    </span>
  )
}

/** Same badge shell, for a generic (non-image) icon — e.g. bank transfer, COD. */
export function IconBadge({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <span
      className="pay-badge"
      title={label}
      aria-label={label}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 64,
        height: 40,
        borderRadius: 8,
        background: '#FFFFFF',
        border: '1px solid rgba(0,0,0,0.06)',
        color: '#3D4F3D',
        flexShrink: 0,
      }}
    >
      {children}
    </span>
  )
}

/* ============================================================
   Non-brand icons — generic marks we control ourselves, so no
   trademark-accuracy concerns. Drawn with the site's own tokens.
   ============================================================ */

export function BankIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 L21 8.5 H3 Z" />
      <path d="M5 8.5V18M9 8.5V18M12 8.5V18M15 8.5V18M19 8.5V18" />
      <path d="M3 18h18" />
      <path d="M3 21h18" />
    </svg>
  )
}

export function CodIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <circle cx="12" cy="12" r="3" />
      <path d="M6.5 6v0M17.5 18v0" />
    </svg>
  )
}

/* ============================================================
   CR — Commercial Registration document (Saudi)
   A neutral document + ribbon icon, not a counterfeit logo.
   ============================================================ */
export function CRIcon({ size = 36 }: { size?: number }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        borderRadius: 8,
        background: 'rgba(245, 241, 234, 0.08)',
        border: '1px solid rgba(245, 241, 234, 0.18)',
        flexShrink: 0,
      }}
    >
      <svg viewBox="0 0 24 24" width={size * 0.56} height={size * 0.56} fill="none">
        <rect x="4" y="2.5" width="16" height="19" rx="1.5" fill="#F5F1EA" />
        <rect x="6.5" y="6" width="11" height="1.6" fill="#B8835A" />
        <rect x="6.5" y="9.4" width="11" height="1" fill="#3D4F3D" />
        <rect x="6.5" y="12.4" width="7.5" height="1" fill="#8E8E8E" />
        <rect x="6.5" y="15.4" width="9" height="1" fill="#8E8E8E" />
        <circle cx="15.5" cy="18.8" r="1.6" fill="#B8835A" />
      </svg>
    </span>
  )
}

/* ============================================================
   MAWTHOOG (موثوق — Trusted / Verified Business) — Saudi
   verification seal. Mint shield + checkmark.
   ============================================================ */
export function MawthoogIcon({ size = 36 }: { size?: number }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        borderRadius: 999,
        background: '#0E5A36',
        flexShrink: 0,
      }}
    >
      <svg viewBox="0 0 24 24" width={size * 0.56} height={size * 0.56} fill="none">
        <path
          d="M12 2.5 L19.5 5.5 V11.5 C19.5 16 15.5 19.5 12 20.5 C8.5 19.5 4.5 16 4.5 11.5 V5.5 Z"
          fill="#F5F1EA"
        />
        <path
          d="M8.3 12 L11 14.7 L15.7 9.5"
          stroke="#0E5A36"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </span>
  )
}
