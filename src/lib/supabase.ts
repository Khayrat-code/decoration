import { createClient } from '@supabase/supabase-js'

// Supabase project config — these are the project-level anon key.
// The service-role key is used only by the seed/admin scripts (see scripts/seed.mjs).
const SUPABASE_URL = 'https://fpmjlkqiljfwbnnljptr.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwbWpsa3FpbGpmd2JubmxqcHRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYxMjI0NTksImV4cCI6MjEwMTY5ODQ1OX0.gIE4R0wX2_dYUK9aLQ9OfneO_Wjhyy7dt_XPPLgh3rI'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: 'toolcan-auth',
  },
})

// Database table names — keep in one place so we can rename easily.
export const TABLES = {
  gallery: 'gallery_images',
  contact: 'contact_submissions',
  analyticsSessions: 'analytics_sessions',
  analyticsEvents: 'analytics_events',
  settings: 'site_settings',
  testimonials: 'testimonials',
  invoices: 'invoices',
} as const

export const BUCKETS = {
  gallery: 'gallery',
} as const
