import { supabase, TABLES } from './supabase'

export async function getSetting<T>(key: string): Promise<T | null> {
  try {
    const { data, error } = await supabase
      .from(TABLES.settings)
      .select('value')
      .eq('key', key)
      .maybeSingle()
    if (error || !data) return null
    return (data.value as T) ?? null
  } catch {
    return null
  }
}

export async function setSetting(key: string, value: unknown): Promise<string | null> {
  const { error } = await supabase.from(TABLES.settings).upsert({ key, value })
  return error ? error.message : null
}
