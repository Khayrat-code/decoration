-- =====================================================================
-- ToolCan Decoration — Supabase setup
-- Run this ONCE in the Supabase SQL editor:
--   https://supabase.com/dashboard/project/fpmjlkqiljfwbnnljptr/sql
-- Then run `npm run seed` to create the storage bucket, the admin user,
-- and a starter set of gallery images.
-- =====================================================================

-- ---- 1. gallery_images -------------------------------------------------
create table if not exists public.gallery_images (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  description   text,
  image_url     text not null,
  storage_path  text not null,
  category      text not null default 'General',
  sort_order    integer not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists gallery_images_sort_idx
  on public.gallery_images (sort_order asc, created_at desc);

-- ---- 2. contact_submissions -------------------------------------------
create table if not exists public.contact_submissions (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  phone       text,
  message     text not null,
  read        boolean not null default false,
  created_at  timestamptz not null default now()
);

create index if not exists contact_submissions_created_idx
  on public.contact_submissions (created_at desc);

-- ---- 3. Row-level security --------------------------------------------
alter table public.gallery_images       enable row level security;
alter table public.contact_submissions  enable row level security;

-- Public read on gallery (the website shows it to everyone).
drop policy if exists "Public read gallery" on public.gallery_images;
create policy "Public read gallery"
  on public.gallery_images
  for select
  using (true);

-- Authenticated users (the admin) can write the gallery.
drop policy if exists "Admin write gallery" on public.gallery_images;
create policy "Admin write gallery"
  on public.gallery_images
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Public can submit the contact form.
drop policy if exists "Public insert contact" on public.contact_submissions;
create policy "Public insert contact"
  on public.contact_submissions
  for insert
  with check (true);

-- Only authenticated users (the admin) can read messages.
drop policy if exists "Admin read contact" on public.contact_submissions;
create policy "Admin read contact"
  on public.contact_submissions
  for select
  using (auth.role() = 'authenticated');

-- Only authenticated users can update or delete messages.
drop policy if exists "Admin update contact" on public.contact_submissions;
create policy "Admin update contact"
  on public.contact_submissions
  for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "Admin delete contact" on public.contact_submissions;
create policy "Admin delete contact"
  on public.contact_submissions
  for delete
  using (auth.role() = 'authenticated');

-- ---- 4. updated_at trigger (gallery) ----------------------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists gallery_images_set_updated_at on public.gallery_images;
create trigger gallery_images_set_updated_at
  before update on public.gallery_images
  for each row execute function public.set_updated_at();

-- =====================================================================
-- Done. Next: run `npm run seed` to create the storage bucket, the
-- admin user, and a starter set of images.
-- =====================================================================
