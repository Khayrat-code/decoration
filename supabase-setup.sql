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

-- ---- 3. analytics_sessions + analytics_events (anonymous, no login) --
create table if not exists public.analytics_sessions (
  id            uuid primary key default gen_random_uuid(),
  session_id    text not null unique,
  referrer      text,
  user_agent    text,
  screen_width  integer,
  screen_height integer,
  language      text,
  country       text,
  started_at    timestamptz not null default now(),
  last_seen_at  timestamptz not null default now(),
  page_count    integer not null default 1
);

create index if not exists analytics_sessions_started_idx
  on public.analytics_sessions (started_at desc);
create index if not exists analytics_sessions_session_idx
  on public.analytics_sessions (session_id);

create table if not exists public.analytics_events (
  id          uuid primary key default gen_random_uuid(),
  session_id  text not null,
  path        text not null,
  referrer    text,
  duration_ms integer default 0,
  created_at  timestamptz not null default now()
);

create index if not exists analytics_events_session_idx
  on public.analytics_events (session_id);
create index if not exists analytics_events_created_idx
  on public.analytics_events (created_at desc);
create index if not exists analytics_events_path_idx
  on public.analytics_events (path);

-- ---- 4. Row-level security --------------------------------------------
alter table public.gallery_images       enable row level security;
alter table public.contact_submissions  enable row level security;
alter table public.analytics_sessions  enable row level security;
alter table public.analytics_events     enable row level security;

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

-- Analytics: anyone can record their own session / events.
drop policy if exists "Public upsert session" on public.analytics_sessions;
create policy "Public upsert session"
  on public.analytics_sessions
  for insert
  with check (true);

drop policy if exists "Public update session" on public.analytics_sessions;
create policy "Public update session"
  on public.analytics_sessions
  for update
  using (true)
  with check (true);

drop policy if exists "Public insert event" on public.analytics_events;
create policy "Public insert event"
  on public.analytics_events
  for insert
  with check (true);

-- Only authenticated users (the admin) can read analytics.
drop policy if exists "Admin read sessions" on public.analytics_sessions;
create policy "Admin read sessions"
  on public.analytics_sessions
  for select
  using (auth.role() = 'authenticated');

drop policy if exists "Admin read events" on public.analytics_events;
create policy "Admin read events"
  on public.analytics_events
  for select
  using (auth.role() = 'authenticated');

-- ---- 4b. site_settings (hero / services / categories visibility) ------
create table if not exists public.site_settings (
  key         text primary key,
  value       jsonb not null,
  updated_at  timestamptz not null default now()
);

alter table public.site_settings enable row level security;

drop policy if exists "Public read settings" on public.site_settings;
create policy "Public read settings"
  on public.site_settings
  for select
  using (true);

drop policy if exists "Admin write settings" on public.site_settings;
create policy "Admin write settings"
  on public.site_settings
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ---- 4c. testimonials ---------------------------------------------------
create table if not exists public.testimonials (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  body        text not null,
  rating      integer not null default 5,
  created_at  timestamptz not null default now()
);

create index if not exists testimonials_created_idx
  on public.testimonials (created_at desc);

alter table public.testimonials enable row level security;

drop policy if exists "Public read testimonials" on public.testimonials;
create policy "Public read testimonials"
  on public.testimonials
  for select
  using (true);

drop policy if exists "Admin write testimonials" on public.testimonials;
create policy "Admin write testimonials"
  on public.testimonials
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ---- 4d. invoices ---------------------------------------------------------
create table if not exists public.invoices (
  id          uuid primary key default gen_random_uuid(),
  number      text not null,
  client      text not null,
  amount      numeric not null default 0,
  status      text not null default 'unpaid',
  due_date    date,
  notes       text,
  created_at  timestamptz not null default now()
);

create index if not exists invoices_created_idx
  on public.invoices (created_at desc);

alter table public.invoices enable row level security;

drop policy if exists "Admin read invoices" on public.invoices;
create policy "Admin read invoices"
  on public.invoices
  for select
  using (auth.role() = 'authenticated');

drop policy if exists "Admin write invoices" on public.invoices;
create policy "Admin write invoices"
  on public.invoices
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ---- 4e. complaints (شكاوى واقتراحات) -----------------------------------
create table if not exists public.complaints (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  phone       text,
  type        text not null default 'complaint',
  subject     text,
  message     text not null,
  read        boolean not null default false,
  created_at  timestamptz not null default now()
);

create index if not exists complaints_created_idx
  on public.complaints (created_at desc);

alter table public.complaints enable row level security;

drop policy if exists "Public insert complaints" on public.complaints;
create policy "Public insert complaints"
  on public.complaints
  for insert
  with check (true);

drop policy if exists "Admin read complaints" on public.complaints;
create policy "Admin read complaints"
  on public.complaints
  for select
  using (auth.role() = 'authenticated');

drop policy if exists "Admin update complaints" on public.complaints;
create policy "Admin update complaints"
  on public.complaints
  for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "Admin delete complaints" on public.complaints;
create policy "Admin delete complaints"
  on public.complaints
  for delete
  using (auth.role() = 'authenticated');

-- ---- 5. updated_at trigger (gallery) ----------------------------------
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
