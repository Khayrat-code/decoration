import { useEffect, useState, type FormEvent } from 'react'
import { useLang, useT } from '../../i18n/LanguageContext'
import { supabase, TABLES } from '../../lib/supabase'
import type { InvoiceRow } from '../../lib/content'
import { ErrorAlert, EmptyState } from './bits'

type InvoiceStatus = InvoiceRow['status']

export function InvoicesManager() {
  const t = useT()
  const { lang } = useLang()
  const [items, setItems] = useState<InvoiceRow[]>([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [number, setNumber] = useState('')
  const [client, setClient] = useState('')
  const [amount, setAmount] = useState(0)
  const [status, setStatus] = useState<InvoiceStatus>('unpaid')
  const [due, setDue] = useState('')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const load = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from(TABLES.invoices)
      .select('*')
      .order('created_at', { ascending: false })
    if (error) setError(error.message)
    setItems((data as InvoiceRow[]) ?? [])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const statusLabel = (s: InvoiceStatus) =>
    s === 'paid' ? t('admin.invoicesManager.statusPaid')
    : s === 'partial' ? t('admin.invoicesManager.statusPartial')
    : t('admin.invoicesManager.statusUnpaid')

  const statusColor = (s: InvoiceStatus) =>
    s === 'paid' ? 'var(--success)' : s === 'partial' ? 'var(--accent-2)' : 'var(--danger)'

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!number.trim() || !client.trim()) return
    setSubmitting(true)
    setError(null)
    const { error: err } = await supabase.from(TABLES.invoices).insert({
      number: number.trim(),
      client: client.trim(),
      amount,
      status,
      due_date: due || null,
      notes: notes.trim() || null,
    })
    if (err) {
      setError(err.message)
    } else {
      setNumber('')
      setClient('')
      setAmount(0)
      setStatus('unpaid')
      setDue('')
      setNotes('')
      setAdding(false)
      await load()
    }
    setSubmitting(false)
  }

  const onDelete = async (item: InvoiceRow) => {
    if (!confirm(t('admin.invoicesManager.deleteConfirm', { number: item.number }))) return
    const { error: err } = await supabase.from(TABLES.invoices).delete().eq('id', item.id)
    if (err) {
      setError(err.message)
      return
    }
    setItems((arr) => arr.filter((i) => i.id !== item.id))
  }

  const onStatusChange = async (item: InvoiceRow, next: InvoiceStatus) => {
    const { error: err } = await supabase.from(TABLES.invoices).update({ status: next }).eq('id', item.id)
    if (err) {
      setError(err.message)
      return
    }
    setItems((arr) => arr.map((i) => (i.id === item.id ? { ...i, status: next } : i)))
  }

  const total = items.reduce((sum, i) => sum + Number(i.amount || 0), 0)

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
          marginBottom: 20,
        }}
      >
        <h2 style={{ fontSize: 22, fontWeight: lang === 'ar' ? 700 : 500 }}>
          {t('admin.invoicesManager.heading')}
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {items.length > 0 && (
            <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>
              {t('admin.invoicesManager.total')}: {total.toLocaleString()}
            </span>
          )}
          <button type="button" className="btn" onClick={() => setAdding((v) => !v)}>
            {t('admin.invoicesManager.addBtn')}
          </button>
        </div>
      </div>

      {error && <ErrorAlert message={error} />}

      {adding && (
        <form
          onSubmit={onSubmit}
          style={{
            background: 'var(--surface-2)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-lg)',
            padding: 24,
            marginBottom: 24,
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="inv-cols">
            <div className="field">
              <label htmlFor="inv-number">{t('admin.invoicesManager.number')}</label>
              <input id="inv-number" type="text" value={number} onChange={(e) => setNumber(e.target.value)} required />
            </div>
            <div className="field">
              <label htmlFor="inv-client">{t('admin.invoicesManager.client')}</label>
              <input id="inv-client" type="text" value={client} onChange={(e) => setClient(e.target.value)} required />
            </div>
            <div className="field">
              <label htmlFor="inv-amount">{t('admin.invoicesManager.amount')}</label>
              <input id="inv-amount" type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
            </div>
            <div className="field">
              <label htmlFor="inv-status">{t('admin.invoicesManager.status')}</label>
              <select id="inv-status" value={status} onChange={(e) => setStatus(e.target.value as InvoiceStatus)}>
                <option value="unpaid">{t('admin.invoicesManager.statusUnpaid')}</option>
                <option value="partial">{t('admin.invoicesManager.statusPartial')}</option>
                <option value="paid">{t('admin.invoicesManager.statusPaid')}</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="inv-due">{t('admin.invoicesManager.due')}</label>
              <input id="inv-due" type="date" value={due} onChange={(e) => setDue(e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label htmlFor="inv-notes">{t('admin.invoicesManager.notes')}</label>
            <textarea id="inv-notes" value={notes} onChange={(e) => setNotes(e.target.value)} style={{ minHeight: 70 }} />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="submit" className="btn" disabled={submitting}>
              {submitting ? t('admin.saving') : t('admin.save')}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => setAdding(false)}>
              {t('admin.gallery.form.cancel')}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div style={{ color: 'var(--ink-3)', padding: '32px 0' }}>…</div>
      ) : items.length === 0 ? (
        <EmptyState title={t('admin.invoicesManager.emptyTitle')} body={t('admin.invoicesManager.emptyBody')} />
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, minWidth: 720 }}>
            <thead>
              <tr>
                <Th>{t('admin.invoicesManager.number')}</Th>
                <Th>{t('admin.invoicesManager.client')}</Th>
                <Th>{t('admin.invoicesManager.amount')}</Th>
                <Th>{t('admin.invoicesManager.status')}</Th>
                <Th>{t('admin.invoicesManager.due')}</Th>
                <Th align="end"> </Th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <Td>
                    <code style={{ background: 'var(--bg-2)', padding: '3px 8px', borderRadius: 4, fontSize: 12 }}>
                      {item.number}
                    </code>
                  </Td>
                  <Td>{item.client}</Td>
                  <Td>{Number(item.amount).toLocaleString()}</Td>
                  <Td>
                    <select
                      value={item.status}
                      onChange={(e) => onStatusChange(item, e.target.value as InvoiceStatus)}
                      style={{
                        border: '1px solid var(--line-2)',
                        borderRadius: 999,
                        padding: '4px 10px',
                        fontSize: 12,
                        color: statusColor(item.status),
                        background: 'var(--surface)',
                        fontWeight: 600,
                      }}
                    >
                      <option value="unpaid">{statusLabel('unpaid')}</option>
                      <option value="partial">{statusLabel('partial')}</option>
                      <option value="paid">{statusLabel('paid')}</option>
                    </select>
                  </Td>
                  <Td>{item.due_date ? new Date(item.due_date).toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US') : '—'}</Td>
                  <Td align="end">
                    <button
                      type="button"
                      className="btn btn-danger"
                      style={{ padding: '6px 12px', fontSize: 13 }}
                      onClick={() => onDelete(item)}
                    >
                      {t('admin.gallery.deleteBtn')}
                    </button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <style>{`
        @media (max-width: 720px) {
          .inv-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

function Th({ children, align }: { children: React.ReactNode; align?: 'end' }) {
  return (
    <th
      style={{
        textAlign: align === 'end' ? 'end' : 'start',
        padding: '8px 12px',
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--ink-3)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      {children}
    </th>
  )
}

function Td({ children, align }: { children: React.ReactNode; align?: 'end' }) {
  return (
    <td
      style={{
        textAlign: align === 'end' ? 'end' : 'start',
        padding: '10px 12px',
        borderBottom: '1px solid var(--line)',
        color: 'var(--ink)',
      }}
    >
      {children}
    </td>
  )
}
