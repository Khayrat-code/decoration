# ToolCan Decoration

A quiet, considered website for **ToolCan — Decoration**, in **Arabic** (default, RTL) with an English toggle. No mouse-driven motion, no scroll-triggered effects, no hover transforms. A calm grid of rooms, a contact form, and an admin dashboard to look after the lot.

## Stack

- **Vite + React + TypeScript** (custom CSS — no UI framework, no templates)
- **Supabase** for auth, database, and image storage
- **React Router** for routing
- **Framer Motion** for entrance / scroll-triggered reveals (not mouse-driven)
- **Yet Another React Lightbox** for the gallery
- **Lucide React** for icons
- **Sharp** for image processing
- Hand-crafted SVG **logo + favicon**

## Brand

- **Colors:** warm linen background, deep-sage accent, soft caramel secondary. Defined as CSS custom properties in `src/styles/global.css`.
- **Logo:** inline SVG — a "T" inside a sage rounded square, with a small caramel dot. See `src/components/Logo.tsx`.
- **Favicon:** same mark, sized for browser tabs (`public/favicon.svg`).
- **Fonts:** Fraunces + Inter (English) / Amiri + Tajawal (Arabic). Loaded from Google Fonts.

## Layout

```
public/
  favicon.svg              Brand mark for browser tabs
src/
  components/              Navbar, Footer, Layout, GalleryGrid, Lightbox, …
  pages/                   Home, Gallery, Contact, AdminLogin, AdminDashboard
  i18n/                    translations.ts (ar/en) + LanguageContext.tsx
  lib/supabase.ts          Supabase client (anon key, public-by-design)
  styles/global.css        All design tokens + base styles
scripts/
  seed.mjs                 First-time setup: bucket, admin user, seed images
  upload-user-images.mjs   Re-processes your local images and replaces the gallery
  check-tables.mjs         Quick DB probe
supabase-setup.sql         Schema + RLS — run this in the Supabase SQL editor
```

## First-time setup

1. **Copy environment file**
   ```bash
   cp .env.example .env
   ```
   Fill in `SUPABASE_SERVICE_KEY` (from Supabase → Settings → API) plus the admin email/password you want.

2. **Run the SQL** in the Supabase SQL editor:
   https://supabase.com/dashboard/project/fpmjlkqiljfwbnnljptr/sql
   Paste the contents of `supabase-setup.sql` and click *Run*. This creates the `gallery_images` and `contact_submissions` tables and the row-level security policies.

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Seed Supabase** (creates the storage bucket, the admin user, and a starter set of images)
   ```bash
   npm run seed
   ```
   The script prints the admin email and password it just created (or whatever you put in `.env`).

5. **Re-process the user's real images** (one-off — uploads the photos in the user's `الصور` folder to the bucket, replaces the gallery rows)
   ```bash
   node scripts/upload-user-images.mjs
   ```
   The path to the user's folder is hard-coded in the script.

6. **Build / preview locally**
   ```bash
   npm run build
   npm run preview
   ```

7. **Deploy** — build output goes to `dist/`. The included `vercel.json` rewrites all paths to `/` so client-side routing works on Vercel.

## Admin

Visit `/admin/login` and sign in with the email/password from your `.env`. From the dashboard you can:

- **Gallery** — upload new images (files go to the `gallery` storage bucket), edit titles / categories / descriptions / sort order, delete.
- **Messages** — read contact-form submissions, mark them read, delete.

## Internationalization

- Default language: **Arabic (RTL)**.
- Language toggle in the navbar (`EN` / `AR` pill).
- Choice persists in `localStorage` (`toolcan-lang`).
- Add new strings in `src/i18n/translations.ts`. The hook is `useT()` for dot-path access; `useLang()` for the language-aware category name and other helpers.

## No-motion guarantee

The site intentionally has:

- **No** hover transforms, scale, translate, or rotate
- **No** parallax, scroll-jacking, or scroll-triggered reveals triggered by the mouse
- **No** mouse-follow effects or cursor-driven visuals

The only animation in the entire stylesheet is a 360ms opacity fade on route changes (`.page-fade`). Framer Motion's `whileInView` is used to fade elements in as they enter the viewport — that's scroll-driven, not mouse-driven. Focus rings are kept for keyboard accessibility.

## Notes

- The Supabase **anon key** is committed to `src/lib/supabase.ts` by design (anon keys are meant to be public; RLS policies are what protects your data).
- The **service-role key** must be loaded from `.env`. Never commit `.env`.
- The default admin password is `ToolCan2026!` — change it from Supabase → Authentication → Users before going live.

## License

© ToolCan. All rights reserved.
