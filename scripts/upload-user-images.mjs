// scripts/upload-user-images.mjs
//
// Walk the user's real ToolCan Decoration photos, resize + compress with
// sharp, upload to Supabase storage, then replace the gallery_images rows
// so the site shows the real portfolio.
//
// Idempotent-ish: clears the existing rows first, then re-inserts. Safe to
// re-run if a previous attempt was interrupted.
//
// Required env vars (put in .env, never commit):
//   SUPABASE_SERVICE_KEY  — service-role key from Supabase Settings → API

import { createClient } from '@supabase/supabase-js'
import { readdirSync, statSync, existsSync, readFileSync } from 'node:fs'
import { join, extname } from 'node:path'
import sharp from 'sharp'

// Load .env if present.
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

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

// Walked from the user's folder.
const ROOT = Buffer.from(
  'C:\\Users\\khayrat\\Desktop\\free_lancer_projects\\ToolCan_decoration\\' +
    '\u0627\u0644\u0635\u0648\u0631',
  'utf8',
).toString('utf8')

// Arabic folder -> (English category, sort priority, display title prefix)
const CATEGORIES = [
  { ar: '\u063a\u0631\u0641\u0629 \u0645\u0639\u064a\u0634\u0629', en: 'Living',   prefix: 'Living',   order: 1 }, // غرفة معيشة
  { ar: '\u063a\u0631\u0641 \u0646\u0648\u0645',                 en: 'Bedroom',  prefix: 'Bedroom',  order: 2 }, // غرف نوم
  { ar: '\u0645\u0637\u0627\u0628\u062e',                         en: 'Kitchen',  prefix: 'Kitchen',  order: 3 }, // مطابخ
  { ar: '\u062d\u0645\u0627\u0645\u0627\u062a',                   en: 'Bathroom', prefix: 'Bathroom', order: 4 }, // حمامات
  { ar: '\u0635\u0627\u0644\u0629 \u0637\u0639\u0627\u0645',       en: 'Dining',   prefix: 'Dining',   order: 5 }, // صالة طعام
  { ar: '\u0645\u0643\u0627\u062a\u0628',                         en: 'Office',   prefix: 'Office',   order: 6 }, // مكاتب
  { ar: '\u063a\u0631\u0641 \u0627\u0637\u0641\u0627\u0644',       en: 'Kids',     prefix: 'Kids',     order: 7 }, // غرف اطفال
]

function logStep(n, msg) { console.log(`\n[${n}] ${msg}`) }

function collectImages() {
  const items = []
  for (const cat of CATEGORIES) {
    const p = join(ROOT, cat.ar)
    if (!existsSync(p)) continue
    const files = readdirSync(p, { withFileTypes: true })
      .filter((e) => e.isFile())
      .map((e) => e.name)
      .filter((n) => /\.(jpe?g|png|webp)$/i.test(n))
      .sort()
    files.forEach((name, i) => {
      items.push({
        absPath: join(p, name),
        category: cat.en,
        prefix: cat.prefix,
        categoryOrder: cat.order,
        filename: name,
        // Title fallback — admin can rename in dashboard.
        title: `${cat.prefix} · ${String(i + 1).padStart(2, '0')}`,
      })
    })
  }
  return items
}

async function clearExisting() {
  logStep(1, 'Clearing existing gallery rows and storage objects…')
  // List and remove all storage objects in the bucket (best-effort).
  const { data: objects, error: listErr } = await supabase.storage
    .from('gallery')
    .list('', { limit: 1000 })
  if (listErr) {
    console.log('    list warning:', listErr.message)
  } else if (objects && objects.length) {
    const paths = objects
      .filter((o) => o.name && !o.name.endsWith('/'))
      .map((o) => `${o.name}`)
    // Also pick up nested files.
    for (const o of objects) {
      if (o.name && o.name.endsWith('/')) {
        const { data: sub } = await supabase.storage.from('gallery').list(o.name, { limit: 1000 })
        for (const s of sub ?? []) {
          if (s.name && !s.name.endsWith('/')) paths.push(`${o.name}${s.name}`)
        }
      }
    }
    if (paths.length) {
      const { error: rmErr } = await supabase.storage.from('gallery').remove(paths)
      if (rmErr) console.log('    remove warning:', rmErr.message)
      else console.log(`    removed ${paths.length} storage objects`)
    }
  }

  // Delete all rows.
  const { error: delErr, count } = await supabase
    .from('gallery_images')
    .delete({ count: 'exact' })
    .gt('created_at', '1970-01-01')
  if (delErr) {
    console.log('    delete rows error:', delErr.message)
  } else {
    console.log(`    cleared ${count ?? 0} gallery row(s)`)
  }
}

async function processAndUpload(item, idx, total) {
  const ext = extname(item.filename).toLowerCase().replace('.', '')
  const outExt = 'jpg'
  const baseName = item.filename
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-zA-Z0-9_\-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40) || 'img'
  const storagePath = `projects/${item.category.toLowerCase()}/${baseName}-${Date.now()}.${outExt}`

  process.stdout.write(`  [${String(idx + 1).padStart(2, ' ')}/${total}] ${item.category.padEnd(8, ' ')} ${item.filename}…`)

  let buf
  try {
    const raw = await sharp(item.absPath, { failOn: 'none' })
      .rotate() // honor EXIF orientation
      .resize({ width: 1800, height: 1800, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 78, mozjpeg: true, progressive: true })
      .toBuffer()
    buf = raw
  } catch (e) {
    console.log(` resize failed (${e.message})`)
    return null
  }

  const { error: upErr } = await supabase.storage
    .from('gallery')
    .upload(storagePath, buf, { contentType: 'image/jpeg', upsert: true })
  if (upErr) {
    console.log(` upload failed (${upErr.message})`)
    return null
  }
  const { data: pub } = supabase.storage.from('gallery').getPublicUrl(storagePath)
  const sizeKB = Math.round(buf.length / 1024)
  console.log(` ok (${sizeKB} KB)`)
  return {
    title: item.title,
    image_url: pub.publicUrl,
    storage_path: storagePath,
    category: item.category,
    sort_order: idx + 1,
  }
}

async function uploadAll(items) {
  logStep(2, `Uploading ${items.length} image(s) (max 1800px, JPEG q78)…`)
  const rows = []
  for (let i = 0; i < items.length; i++) {
    const row = await processAndUpload(items[i], i, items.length)
    if (row) rows.push(row)
  }
  return rows
}

async function insertRows(rows) {
  if (!rows.length) {
    console.log('    no rows to insert')
    return
  }
  logStep(3, `Inserting ${rows.length} gallery row(s)…`)
  // Insert in chunks of 20 to stay under request size limits.
  for (let i = 0; i < rows.length; i += 20) {
    const chunk = rows.slice(i, i + 20)
    const { error } = await supabase.from('gallery_images').insert(chunk)
    if (error) {
      console.log(`    chunk ${i / 20 + 1} failed: ${error.message}`)
    } else {
      console.log(`    chunk ${i / 20 + 1}: ${chunk.length} row(s) inserted`)
    }
  }
}

async function main() {
  console.log('ToolCan Decoration — user image upload')
  console.log('---------------------------------------')

  if (!existsSync(ROOT)) {
    console.error('Image folder not found:', ROOT)
    process.exit(1)
  }
  const items = collectImages()
  console.log(`\nFound ${items.length} image(s) across ${CATEGORIES.length} categor(ies).`)

  await clearExisting()
  const rows = await uploadAll(items)
  await insertRows(rows)

  console.log('\nDone. Counts by category:')
  const byCat = rows.reduce((m, r) => ((m[r.category] = (m[r.category] || 0) + 1), m), {})
  for (const k of Object.keys(byCat)) console.log(`  ${k.padEnd(10, ' ')} ${byCat[k]}`)
  console.log(`  ${'TOTAL'.padEnd(10, ' ')} ${rows.length}`)
}

main().catch((e) => {
  console.error('\nUpload failed:', e?.message || e)
  process.exit(1)
})
