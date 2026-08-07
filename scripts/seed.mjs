// scripts/seed.mjs
//
// One-time setup using the service-role key:
//   1. Create the "gallery" storage bucket (public read).
//   2. Create the admin user (Supabase Auth).
//   3. Insert a starter set of gallery images (URLs from Unsplash, with
//      image bytes re-uploaded to your own bucket so the assets are
//      fully under your control).
//
// Usage:  npm run seed
//
// Required env vars (put in .env, never commit):
//   SUPABASE_SERVICE_KEY  — service-role key from Supabase Settings → API
//   ADMIN_EMAIL           — email for the new admin user
//   ADMIN_PASSWORD        — initial password for that user
//
// Optional:
//   SUPABASE_URL          — defaults to the ToolCan project

import { createClient } from '@supabase/supabase-js'
import { readFileSync, existsSync } from 'node:fs'

// Load .env if present (very small parser; avoids a dotenv dep).
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

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@toolcan.example'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'ToolCan2026!'

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

// Stable, hand-picked interior-design photo URLs from Unsplash.
// (We re-upload to your own bucket so the assets are yours.)
const SEED_IMAGES = [
  { title: 'Linen Living Room',     category: 'Living',   sort: 1, url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=80' },
  { title: 'Soft Studio Corner',    category: 'Living',   sort: 2, url: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1400&q=80' },
  { title: 'Oak and Brass',         category: 'Living',   sort: 3, url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1400&q=80' },
  { title: 'Reading Nook',          category: 'Living',   sort: 4, url: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1400&q=80' },
  { title: 'Morning Kitchen',       category: 'Kitchen',  sort: 5, url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1400&q=80' },
  { title: 'Plaster Wall',          category: 'Living',   sort: 6, url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1400&q=80' },
  { title: 'Plant and Window',      category: 'Outdoor',  sort: 7, url: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=1400&q=80' },
  { title: 'Soft Bedroom',          category: 'Bedroom',  sort: 8, url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1400&q=80' },
  { title: 'Workspace, Warm Light', category: 'Office',   sort: 9, url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1400&q=80' },
  { title: 'Dining, Quiet',         category: 'Living',   sort: 10, url: 'https://images.unsplash.com/photo-1565183997392-2f6f122e5912?w=1400&q=80' },
  { title: 'Bedroom at Dusk',       category: 'Bedroom',  sort: 11, url: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=1400&q=80' },
  { title: 'Stoneware on Oak',      category: 'Kitchen',  sort: 12, url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=80' },
]

function logStep(n, msg) {
  console.log(`\n[${n}] ${msg}`)
}

async function ensureBucket() {
  logStep(1, 'Ensuring storage bucket "gallery"…')
  const { data: buckets, error } = await supabase.storage.listBuckets()
  if (error) throw error
  if (buckets?.find((b) => b.name === 'gallery')) {
    console.log('    bucket already exists')
    return
  }
  const { error: createErr } = await supabase.storage.createBucket('gallery', {
    public: true,
    fileSizeLimit: 10 * 1024 * 1024, // 10 MB
  })
  if (createErr) throw createErr
  console.log('    bucket created (public, 10MB cap)')
}

async function ensureAdmin() {
  logStep(2, `Ensuring admin user ${ADMIN_EMAIL}…`)
  const { data, error } = await supabase.auth.admin.listUsers({ perPage: 1, page: 1, email: ADMIN_EMAIL })
  if (error) throw error
  const existing = data?.users?.find((u) => u.email === ADMIN_EMAIL)
  if (existing) {
    console.log('    user already exists, id =', existing.id)
    return
  }
  const { data: created, error: createErr } = await supabase.auth.admin.createUser({
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    email_confirm: true,
  })
  if (createErr) throw createErr
  console.log('    user created, id =', created.user?.id)
}

async function checkSchema() {
  logStep(3, 'Checking tables…')
  let tablesReady = true
  const { error: gErr } = await supabase.from('gallery_images').select('id', { count: 'exact', head: true })
  if (gErr) {
    if (/does not exist/i.test(gErr.message)) {
      console.log('    !! gallery_images table is missing — skipping image seeding.')
      console.log('       (bucket + admin are still being set up below.)')
      tablesReady = false
    } else {
      throw gErr
    }
  }
  if (tablesReady) {
    const { error: cErr } = await supabase.from('contact_submissions').select('id', { count: 'exact', head: true })
    if (cErr && /does not exist/i.test(cErr.message)) {
      console.log('    !! contact_submissions table is missing — skipping image seeding.')
      tablesReady = false
    } else if (cErr) {
      throw cErr
    }
  }
  return tablesReady
}

async function seedGallery() {
  logStep(4, 'Seeding starter gallery (only if currently empty)…')
  const { count, error: cntErr } = await supabase
    .from('gallery_images')
    .select('*', { count: 'exact', head: true })
  if (cntErr) {
    if (/does not exist/i.test(cntErr.message)) {
      console.log('    tables missing — run supabase-setup.sql and re-run seed to add images.')
      return
    }
    throw cntErr
  }
  if ((count ?? 0) > 0) {
    console.log(`    gallery already has ${count} item(s) — skipping.`)
    return
  }

  for (let i = 0; i < SEED_IMAGES.length; i++) {
    const seed = SEED_IMAGES[i]
    process.stdout.write(`    fetching ${i + 1}/${SEED_IMAGES.length} — ${seed.title}…`)
    let buf
    try {
      const res = await fetch(seed.url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const ab = await res.arrayBuffer()
      buf = Buffer.from(ab)
    } catch (e) {
      console.log(` skipped (${e.message})`)
      continue
    }

    const ext = (seed.url.match(/\.(jpe?g|png|webp)/i)?.[1] || 'jpg').toLowerCase()
    const path = `seed/${Date.now()}-${i + 1}.${ext}`

    const { error: upErr } = await supabase.storage
      .from('gallery')
      .upload(path, buf, { contentType: `image/${ext === 'jpg' ? 'jpeg' : ext}`, upsert: true })
    if (upErr) {
      console.log(` upload error (${upErr.message})`)
      continue
    }
    const { data: pub } = supabase.storage.from('gallery').getPublicUrl(path)

    const { error: insErr } = await supabase.from('gallery_images').insert({
      title: seed.title,
      description: null,
      image_url: pub.publicUrl,
      storage_path: path,
      category: seed.category,
      sort_order: seed.sort,
    })
    if (insErr) {
      console.log(` db error (${insErr.message})`)
      continue
    }
    console.log(' ok')
  }
}

async function main() {
  console.log('ToolCan Decoration — seed script')
  console.log('--------------------------------')
  const tablesReady = await checkSchema()
  await ensureBucket()
  await ensureAdmin()
  if (tablesReady) {
    await seedGallery()
  } else {
    console.log('\n[!] Tables not found — bucket and admin are set up, but image')
    console.log('    seeding is skipped. Run supabase-setup.sql in the Supabase')
    console.log('    SQL editor, then run `npm run seed` again to populate the gallery.')
  }
  console.log('\nAll done. Admin login:')
  console.log('   email:    ', ADMIN_EMAIL)
  console.log('   password: ', ADMIN_PASSWORD)
  console.log('Change the password from Supabase Auth → Users after first sign-in.')
}

main().catch((e) => {
  console.error('\nSeed failed:', e?.message || e)
  process.exit(1)
})
