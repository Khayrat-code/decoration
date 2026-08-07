// scripts/list-user-images.mjs
// Walks the user's decoration images folder. Path is hard-coded with UTF-8.
import { readdirSync, statSync, existsSync } from 'node:fs'
import { join } from 'node:path'

// Use Buffer.from with explicit UTF-8 bytes to avoid any codepage weirdness.
const ROOT = Buffer.from(
  'C:\\Users\\khayrat\\Desktop\\free_lancer_projects\\ToolCan_decoration\\' +
    '\u0627\u0644\u0635\u0648\u0631',
  'utf8',
).toString('utf8')

const map = {
  '\u062d\u0645\u0627\u0645\u0627\u062a': 'Bathrooms', // حمامات
  '\u0635\u0627\u0644\u0629 \u0637\u0639\u0627\u0645': 'Dining', // صالة طعام
  '\u063a\u0631\u0641 \u0627\u0637\u0641\u0627\u0644': 'Kids', // غرف اطفال
  '\u063a\u0631\u0641 \u0646\u0648\u0645': 'Bedrooms', // غرف نوم
  '\u063a\u0631\u0641\u0629 \u0645\u0639\u064a\u0634\u0629': 'Living', // غرفة معيشة
  '\u0645\u0637\u0627\u0628\u062e': 'Kitchens', // مطابخ
  '\u0645\u0643\u0627\u062a\u0628': 'Offices', // مكاتب
}

console.log('Root path:', ROOT)
if (!existsSync(ROOT)) {
  console.error('Root folder missing!')
  process.exit(1)
}

let total = 0
for (const ar of Object.keys(map)) {
  const p = join(ROOT, ar)
  if (!existsSync(p)) {
    console.log(`[missing] ${map[ar]}  (${ar})`)
    continue
  }
  const entries = readdirSync(p, { withFileTypes: true })
  const files = entries
    .filter((e) => e.isFile())
    .map((e) => ({ name: e.name, ...statSync(join(p, e.name)) }))
  console.log(`\n=== ${map[ar]} (${ar}) — ${files.length} files ===`)
  files.forEach((f, i) => {
    console.log(
      `  ${String(i + 1).padStart(3, ' ')}  ${(f.size / 1024 / 1024).toFixed(2).padStart(7, ' ')} MB  ${f.name}`,
    )
  })
  total += files.length
}
console.log(`\nGrand total: ${total} files`)
