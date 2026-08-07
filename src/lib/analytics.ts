// src/lib/analytics.ts
//
// Anonymous visitor analytics. No login required.
//
// Strategy:
// - On first visit, mint a session_id (UUID) in localStorage and record
//   a row in `analytics_sessions` with referrer + UA + screen + lang.
// - On every route change (and on first load), insert a row into
//   `analytics_events` with the path.
// - On the route change away (or beforeunload), we update the previous
//   event with a duration estimate by writing to `analytics_sessions`.
// - All writes are fire-and-forget; failures are swallowed silently.

import { supabase, TABLES } from './supabase'

const SESSION_KEY = 'toolcan-session-id'
const STARTED_KEY = 'toolcan-session-started'
const SESSION_TTL_MS = 30 * 60 * 1000 // 30 min idle timeout

let currentPath: string | null = null
let currentEnteredAt: number | null = null
let currentSessionId: string | null = null

function getOrCreateSessionId(): string {
  try {
    const existing = localStorage.getItem(SESSION_KEY)
    const startedRaw = localStorage.getItem(STARTED_KEY)
    const started = startedRaw ? Number(startedRaw) : 0
    const now = Date.now()

    // Reuse if same session (less than 30 min idle).
    if (existing && started && now - started < SESSION_TTL_MS) {
      return existing
    }
  } catch {
    // localStorage might be blocked
  }

  // Mint a new one.
  const id = crypto.randomUUID()
  try {
    localStorage.setItem(SESSION_KEY, id)
    localStorage.setItem(STARTED_KEY, String(Date.now()))
  } catch {
    // ignore
  }
  return id
}

function deviceLabel(ua: string): string {
  if (/iPhone/i.test(ua)) return 'iPhone'
  if (/iPad/i.test(ua)) return 'iPad'
  if (/Android/i.test(ua)) return 'Android'
  if (/Macintosh/i.test(ua)) return 'Mac'
  if (/Windows/i.test(ua)) return 'Windows'
  if (/Linux/i.test(ua)) return 'Linux'
  return '—'
}

async function ensureSessionRow() {
  if (!currentSessionId) return
  try {
    const ua = navigator.userAgent
    const payload = {
      session_id: currentSessionId,
      referrer: document.referrer || null,
      user_agent: ua,
      device: deviceLabel(ua),
      screen_width: window.innerWidth,
      screen_height: window.innerHeight,
      language: navigator.language,
    }
    // Upsert on session_id
    await supabase
      .from(TABLES.analyticsSessions)
      .upsert(payload, { onConflict: 'session_id', ignoreDuplicates: true })
  } catch {
    // ignore — first time the table might not exist yet
  }
}

async function recordEvent(path: string, referrer: string | null) {
  if (!currentSessionId) return
  try {
    await supabase.from(TABLES.analyticsEvents).insert({
      session_id: currentSessionId,
      path,
      referrer,
      duration_ms: 0,
    })
    // Bump page_count + last_seen_at on the session via a direct read+update.
    // (Cheap because the session row is small; the table has at most a few
    //  hundred thousand rows even for a busy site.)
    const { data: rows } = await supabase
      .from(TABLES.analyticsSessions)
      .select('page_count')
      .eq('session_id', currentSessionId)
      .limit(1)
    const current = (rows?.[0] as { page_count?: number } | undefined)?.page_count ?? 0
    await supabase
      .from(TABLES.analyticsSessions)
      .update({
        page_count: current + 1,
        last_seen_at: new Date().toISOString(),
      })
      .eq('session_id', currentSessionId)
  } catch {
    // ignore
  }
}

async function updateLastDuration() {
  if (!currentSessionId || !currentPath || currentEnteredAt == null) return
  const duration = Math.max(0, Date.now() - currentEnteredAt)
  // We approximate by storing the duration on the most recent event row.
  try {
    // Fetch the latest event id for this session+path and patch it.
    const { data } = await supabase
      .from(TABLES.analyticsEvents)
      .select('id, created_at')
      .eq('session_id', currentSessionId)
      .eq('path', currentPath)
      .order('created_at', { ascending: false })
      .limit(1)
    if (data && data.length) {
      await supabase
        .from(TABLES.analyticsEvents)
        .update({ duration_ms: duration } as any)
        .eq('id', (data[0] as { id: string }).id)
    }
  } catch {
    // ignore
  }
}

export function initAnalytics() {
  // Don't track the admin pages.
  if (location.pathname.startsWith('/admin')) return

  currentSessionId = getOrCreateSessionId()
  void ensureSessionRow()

  const onPathChange = () => {
    const path = location.pathname + location.search
    if (path === currentPath) return
    // Persist duration of the previous path before switching.
    void updateLastDuration()
    currentPath = path
    currentEnteredAt = Date.now()
    void recordEvent(path, document.referrer || null)
  }

  // Initial event.
  onPathChange()

  // Listen for back/forward.
  window.addEventListener('popstate', onPathChange)

  // Patch in a tiny monkey-patch on history.pushState/replaceState so the
  // React Router route changes are seen.
  const origPush = history.pushState
  const origReplace = history.replaceState
  history.pushState = function (...args) {
    const r = origPush.apply(this, args as Parameters<typeof origPush>)
    window.dispatchEvent(new Event('toolcan:locationchange'))
    return r
  }
  history.replaceState = function (...args) {
    const r = origReplace.apply(this, args as Parameters<typeof origReplace>)
    window.dispatchEvent(new Event('toolcan:locationchange'))
    return r
  }
  window.addEventListener('toolcan:locationchange', onPathChange)

  // On unload, write the duration of the current page.
  const onUnload = () => {
    void updateLastDuration()
  }
  window.addEventListener('beforeunload', onUnload)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') onUnload()
  })
}
