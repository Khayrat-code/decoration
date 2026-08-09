// scripts/upload-covers.mjs
//
// Upload 7 cover images from C:\Users\khayrat\Downloads\arr to
// the `gallery` bucket under `covers/` with predictable filenames,
// so the ShowcaseStrip can hardcode the URLs in the order the
// user wants:
//   1 living, 2 bedroom, 3 office, 4 kitchen, 5 kids, 6 dining, 7 bathroom
//
// Required env (put in .env, never commit):
//   SUPABASE_SERVICE_KEY

import { createClient } from '@supabase/supabase-js'
import { readFileSync, existsSync } from 'node:fs'
import sharp from 'sharp'

try {
  if (existsSync('.env')) {
    for (const line of readFileSync('.env', 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/)
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2]
    }
  }
} catch {}

const SUPABASE_URL =
  process.env.SUPABASE_URL || 'https://fpmjlkqiljfwbnnljptr.supabase.co'
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY
if (!SERVICE_KEY) {
  console.error('Missing SUPABASE_SERVICE_KEY in .env')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

// (source filename, storage key)  in the order the user wants
const COVERS = [
  { src: 'C:\\Users\\khayrat\\Downloads\\arr\\غرفة معيشة.jpeg',  storage: 'covers/1-living.jpg'   },
  { src: 'C:\\Users\\khayrat\\Downloads\\arr\\غرفة نوم.jpeg',     storage: 'covers/2-bedroom.jpg' },
  { src: 'C:\\Users\\khayrat\\Downloads\\arr\\مكتب.jpeg',         storage: 'covers/3-office.jpg'  },
  { src: 'C:\\Users\\khayrat\\Downloads\\arr\\مطبخ.jpeg',         storage: 'covers/4-kitchen.jpg' },
  { src: 'C:\\Users\\khayrat\\Downloads\\arr\\غرفة أطفال.jpeg',   storage: 'covers/5-kids.jpg'    },
  { src: 'C:\\Users\\khayrat\\Downloads\\arr\\صالة طعام.jpeg',    storage: 'covers/6-dining.jpg'  },
  { src: 'C:\\Users\\khayrat\\Downloads\\arr\\دورة مياه.jpeg',    storage: 'covers/7-bathroom.jpg' },
]

for (const c of COVERS) {
  if (!existsSync(c.src)) {
    console.error('Missing source file:', c.src)
    process.exit(1)
  }
  // Re-encode as JPEG q=82, max 1920px wide. Keep the visual fidelity but
  // make the bundle lighter.
  const buf = await sharp(c.src)
    .rotate() // honor EXIF orientation
    .resize({ width: 1920, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer()
  const { error } = await supabase.storage
    .from('gallery')
    .upload(c.storage, buf, {
      cacheControl: '31536000',
      upsert: true,
      contentType: 'image/jpeg',
    })
  if (error) {
    console.error(`Failed ${c.storage}:`, error.message)
    process.exit(1)
  }
  const { data: pub } = supabase.storage.from('gallery').getPublicUrl(c.storage)
  console.log(`OK  ${c.storage}  →  ${pub.publicUrl}  (${(buf.length / 1024).toFixed(0)} KB)`)
}

console.log('\nAll covers uploaded.')
