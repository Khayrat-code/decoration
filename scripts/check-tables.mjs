// scripts/check-tables.mjs
// Quick probe: see if the tables actually exist and what's in them.

import { createClient } from '@supabase/supabase-js'
import { readFileSync, existsSync } from 'node:fs'

try {
  if (existsSync('.env')) {
    for (const line of readFileSync('.env', 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/)
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2]
    }
  }
} catch {
  // ignore
}

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://fpmjlkqiljfwbnnljptr.supabase.co'
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY
if (!SERVICE_KEY) {
  console.error('Missing SUPABASE_SERVICE_KEY. Set it in .env or pass it as an env var.')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } })

// Try the data API (PostgREST).
console.log('--- Data API probe (PostgREST) ---')
for (const t of ['gallery_images', 'contact_submissions']) {
  const { data, error, count } = await supabase.from(t).select('*', { count: 'exact', head: true })
  console.log(`  ${t}: count=${count} error=${error?.message ?? 'none'}`)
}

// Try the raw REST endpoint with a manual fetch.
console.log('\n--- Raw REST probe ---')
for (const t of ['gallery_images', 'contact_submissions']) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${t}?select=*&limit=1`, {
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
    },
  })
  console.log(`  ${t}: status=${r.status}`)
  const text = await r.text()
  console.log(`    body: ${text.slice(0, 200)}`)
}
