import { useEffect, useCallback } from 'react'

interface LightboxProps {
  src: string
  alt: string
  title?: string
  description?: string
  onClose: () => void
}

/**
 * Click-driven lightbox. No mouse-motion, no parallax, no hover.
 * Opens instantly, closes on backdrop click, X button, or Escape.
 */
export function Lightbox({ src, alt, title, description, onClose }: LightboxProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Image preview'}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(20, 22, 20, 0.92)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          maxWidth: 'min(1100px, 95vw)',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: -8,
            right: -8,
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: '1px solid rgba(245, 241, 234, 0.4)',
            background: 'rgba(20, 22, 20, 0.6)',
            color: '#F5F1EA',
            fontSize: 18,
            cursor: 'pointer',
            fontFamily: 'inherit',
            zIndex: 1,
          }}
        >
          ✕
        </button>
        <img
          src={src}
          alt={alt}
          style={{
            maxWidth: '100%',
            maxHeight: '78vh',
            objectFit: 'contain',
            borderRadius: 4,
            background: '#0F110F',
          }}
        />
        {(title || description) && (
          <div
            style={{
              color: '#E5DFD3',
              textAlign: 'center',
              maxWidth: 720,
              padding: '0 8px',
            }}
          >
            {title && (
              <div
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: 20,
                  fontWeight: 500,
                  marginBottom: 6,
                }}
              >
                {title}
              </div>
            )}
            {description && (
              <div style={{ fontSize: 14, color: '#C7C2B5', lineHeight: 1.6 }}>
                {description}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
