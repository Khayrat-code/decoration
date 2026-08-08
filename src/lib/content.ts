import T from '../i18n/translations'

export interface LocalizedText {
  ar: string
  en: string
}

export interface HeroSlide {
  subtitle: LocalizedText
  title: LocalizedText
  highlight: LocalizedText
  description: LocalizedText
}

export interface HeroStats {
  years: number
  designers: number
  satisfaction: number
}

export interface HeroSettings {
  slides: HeroSlide[]
  stats: HeroStats
}

export interface ServiceItem {
  id: string
  title: LocalizedText
  description: LocalizedText
}

export interface TestimonialRow {
  id: string
  name: string
  body: string
  rating: number
  created_at: string
}

export interface InvoiceRow {
  id: string
  number: string
  client: string
  amount: number
  status: 'paid' | 'unpaid' | 'partial'
  due_date: string | null
  notes: string | null
  created_at: string
}

export const DEFAULT_HERO: HeroSettings = {
  slides: T.home.hero.slides.map((s) => ({
    subtitle: { ar: s.subtitle.ar, en: s.subtitle.en },
    title: { ar: s.title.ar, en: s.title.en },
    highlight: { ar: s.highlight.ar, en: s.highlight.en },
    description: { ar: s.description.ar, en: s.description.en },
  })),
  stats: { years: 8, designers: 5, satisfaction: 98 },
}

export const DEFAULT_SERVICES: ServiceItem[] = T.home.services.items.map((s, i) => ({
  id: `service-${i + 1}`,
  title: { ar: s.title.ar, en: s.title.en },
  description: { ar: s.description.ar, en: s.description.en },
}))

export function normalizeHero(raw: Partial<HeroSettings> | null | undefined): HeroSettings {
  if (!raw) return DEFAULT_HERO
  const slides =
    Array.isArray(raw.slides) && raw.slides.length > 0
      ? DEFAULT_HERO.slides.map((d, i) => {
          const r = raw.slides?.[i]
          if (!r) return d
          return {
            subtitle: { ...d.subtitle, ...r.subtitle },
            title: { ...d.title, ...r.title },
            highlight: { ...d.highlight, ...r.highlight },
            description: { ...d.description, ...r.description },
          }
        })
      : DEFAULT_HERO.slides
  return { slides, stats: { ...DEFAULT_HERO.stats, ...(raw.stats ?? {}) } }
}

export function normalizeServices(raw: ServiceItem[] | null | undefined): ServiceItem[] {
  if (!Array.isArray(raw) || raw.length === 0) return DEFAULT_SERVICES
  return DEFAULT_SERVICES.map((d, i) => {
    const r = raw[i]
    if (!r) return d
    return {
      id: d.id,
      title: { ...d.title, ...r.title },
      description: { ...d.description, ...r.description },
    }
  })
}
