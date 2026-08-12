export const BUSINESS = {
  phoneDisplay: '0590970028',
  phoneHref: 'tel:+966590970028',
  whatsappHref: 'https://wa.me/966590970028',
  email: 'Toolcan.sa@gmail.com',
  address: {
    ar: 'الرياض، المملكة العربية السعودية',
    en: 'Riyadh, Saudi Arabia',
  },
  cr: '1010000000',
  socials: [
    { key: 'tiktok', href: 'https://www.tiktok.com/@toolcan.sa' },
    { key: 'snap', href: 'https://www.snapchat.com/add/toolcan.sa' },
    { key: 'instagram', href: 'https://www.instagram.com/toolcan.sa' },
    { key: 'x', href: 'https://x.com/toolcan_' },
  ],
} as const

export type SocialKey = (typeof BUSINESS.socials)[number]['key']
