interface WhatsAppButtonProps {
  /** Localised tooltip. */
  label?: string
}

/**
 * Floating WhatsApp contact button.
 *
 * The number is the studio's Saudi mobile line (0590970028). We
 * strip the leading 0 and prepend the country code (966) so the
 * link works from any locale, and the click opens WhatsApp in a
 * new tab (or the app on mobile).
 *
 * Position:
 *   - LTR: bottom-right
 *   - RTL: bottom-left  (mirrored via logical `insetInlineEnd`)
 *
 * No mouse-driven motion: a tiny `whileInView`-style entry is
 * skipped because the button is always in view. It only has the
 * standard focus ring for keyboard users.
 */
export function WhatsAppButton({ label = 'WhatsApp' }: WhatsAppButtonProps) {
  const phone = '966590970028' // 0590970028 → +966 59 097 0028
  const href = `https://wa.me/${phone}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="wa-fab"
    >
      <svg
        viewBox="0 0 24 24"
        width="26"
        height="26"
        aria-hidden="true"
        fill="currentColor"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
      </svg>

      <style>{`
        .wa-fab {
          position: fixed;
          inset-inline-end: 20px;
          inset-block-end: 20px;
          z-index: 80;
          width: 54px;
          height: 54px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          background: #25D366;
          border-radius: 999px;
          box-shadow:
            0 10px 28px -10px rgba(37, 211, 102, 0.55),
            0 2px 6px rgba(0, 0, 0, 0.12);
          text-decoration: none;
          transition:
            background-color 200ms var(--ease-out-soft),
            transform   200ms var(--ease-out-soft),
            box-shadow  200ms var(--ease-out-soft);
        }
        .wa-fab:hover {
          background: #1ebe5d;
          color: #fff;
          transform: translateY(-1px);
        }
        .wa-fab:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 3px;
        }
        @media (max-width: 520px) {
          .wa-fab {
            inset-inline-end: 14px;
            inset-block-end: 14px;
            width: 50px;
            height: 50px;
          }
        }
      `}</style>
    </a>
  )
}
