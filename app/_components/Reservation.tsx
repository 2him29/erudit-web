'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ChevronDown, Check, Loader2, Clock, Phone, Mail, MapPin } from 'lucide-react'

// ── Time slots 08:00 → 17:30 ─────────────────────────────────
const TIME_SLOTS: string[] = []
for (let h = 8; h <= 17; h++) {
  TIME_SLOTS.push(`${String(h).padStart(2, '0')}:00`)
  if (h < 17) TIME_SLOTS.push(`${String(h).padStart(2, '0')}:30`)
}
TIME_SLOTS.push('17:30')

const MONTHS_FR = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre']
const DAYS_FR   = ['Lu','Ma','Me','Je','Ve','Sa','Di']
const PHONE_RE  = /^0[5-7][0-9]{8}$/

// ── Simple input ──────────────────────────────────────────────
function Field({
  label, value, onChange, type = 'text', error,
}: {
  label: string; value: string; onChange: (v: string) => void
  type?: string; error?: string
}) {
  return (
    <div>
      <label className="block text-[10px] tracking-[0.25em] uppercase text-walnut mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-b border-divider hover:border-walnut focus:border-gold text-cream text-sm placeholder:text-walnut/30 py-3 outline-none transition-colors duration-200"
      />
      {error && <p className="mt-1.5 text-[11px] text-gold/60">{error}</p>}
    </div>
  )
}

// ── Date Picker ───────────────────────────────────────────────
function DateField({ value, onChange, error }: { value: string; onChange: (v: string) => void; error?: string }) {
  const [open, setOpen] = useState(false)
  const [view, setView] = useState(() => { const d = new Date(); d.setDate(1); return d })
  const wrapRef = useRef<HTMLDivElement>(null)
  const today = new Date(); today.setHours(0,0,0,0)

  useEffect(() => {
    const fn = (e: MouseEvent) => { if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  const y = view.getFullYear(), m = view.getMonth()
  const firstDay     = (new Date(y, m, 1).getDay() + 6) % 7
  const daysInMonth  = new Date(y, m + 1, 0).getDate()
  const selectedDate = value ? new Date(value + 'T00:00:00') : null

  const pick = (d: number) => {
    const date = new Date(y, m, d)
    if (date < today) return
    onChange(`${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`)
    setOpen(false)
  }

  const display = value
    ? (() => { const [yr,mo,da] = value.split('-'); return `${da}/${mo}/${yr}` })()
    : ''

  return (
    <div ref={wrapRef}>
      <label className="block text-[10px] tracking-[0.25em] uppercase text-walnut mb-2">Date</label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between border-b border-divider hover:border-walnut pb-3 text-sm transition-colors duration-200"
        style={{ color: value ? '#F5F0E8' : '#9C8265' }}
      >
        <span>{display || 'Choisir une date'}</span>
        <ChevronDown size={12} className="text-gold/60" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="absolute z-50 mt-2 bg-card border border-divider p-4 shadow-2xl"
            style={{ minWidth: '260px' }}
          >
            {/* Nav */}
            <div className="flex items-center justify-between mb-4">
              <button type="button" onClick={() => setView(new Date(y, m-1, 1))} className="text-walnut hover:text-gold transition-colors">
                <ChevronLeft size={14} />
              </button>
              <span className="text-xs tracking-widest uppercase text-cream">{MONTHS_FR[m]} {y}</span>
              <button type="button" onClick={() => setView(new Date(y, m+1, 1))} className="text-walnut hover:text-gold transition-colors">
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Days header */}
            <div className="grid grid-cols-7 gap-0.5 mb-2">
              {DAYS_FR.map((d) => (
                <div key={d} className="text-center text-[10px] text-walnut/50 tracking-wide">{d}</div>
              ))}
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-0.5">
              {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day  = i + 1
                const date = new Date(y, m, day)
                const past = date < today
                const sel  = selectedDate?.toDateString() === date.toDateString()
                const tod  = today.toDateString() === date.toDateString()
                return (
                  <button
                    key={day}
                    type="button"
                    disabled={past}
                    onClick={() => pick(day)}
                    className="aspect-square flex items-center justify-center text-xs transition-colors duration-150 rounded-sm"
                    style={{
                      background: sel ? '#C8962E' : 'transparent',
                      color: sel ? '#0C0905' : past ? '#3a3020' : tod ? '#C8962E' : '#F5F0E8',
                      fontWeight: sel ? 700 : 400,
                    }}
                    onMouseEnter={(e) => { if (!past && !sel) e.currentTarget.style.background = 'rgba(200,150,46,0.15)' }}
                    onMouseLeave={(e) => { if (!sel) e.currentTarget.style.background = 'transparent' }}
                  >
                    {day}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {error && <p className="mt-1.5 text-[11px] text-gold/60">{error}</p>}
    </div>
  )
}

// ── Time Picker ───────────────────────────────────────────────
function TimeField({ value, onChange, error }: { value: string; onChange: (v: string) => void; error?: string }) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fn = (e: MouseEvent) => { if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  return (
    <div ref={wrapRef}>
      <label className="block text-[10px] tracking-[0.25em] uppercase text-walnut mb-2">Heure</label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between border-b border-divider hover:border-walnut pb-3 text-sm transition-colors duration-200"
        style={{ color: value ? '#F5F0E8' : '#9C8265' }}
      >
        <span>{value || 'Choisir un créneau'}</span>
        <ChevronDown size={12} className="text-gold/60" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="absolute z-50 mt-2 bg-card border border-divider shadow-2xl overflow-hidden"
            style={{ minWidth: '160px' }}
          >
            <div className="max-h-56 overflow-y-auto scrollbar-hide">
              {TIME_SLOTS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => { onChange(t); setOpen(false) }}
                  className="w-full px-4 py-2.5 text-left text-sm transition-colors duration-150"
                  style={{ color: value === t ? '#C8962E' : '#F5F0E8', background: value === t ? 'rgba(200,150,46,0.1)' : 'transparent' }}
                  onMouseEnter={(e) => { if (value !== t) e.currentTarget.style.background = 'rgba(200,150,46,0.07)' }}
                  onMouseLeave={(e) => { if (value !== t) e.currentTarget.style.background = 'transparent' }}
                >
                  {t}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {error && <p className="mt-1.5 text-[11px] text-gold/60">{error}</p>}
    </div>
  )
}

// ── Validation ────────────────────────────────────────────────
type Form = { name: string; phone: string; date: string; time: string; guests: string }
type Errs = Partial<Record<keyof Form, string>>

function validate(f: Form): Errs {
  const e: Errs = {}
  if (!f.name.trim()) e.name = 'Requis'
  if (!PHONE_RE.test(f.phone.replace(/\s/g,''))) e.phone = 'Format invalide (ex : 0555 95 95 99)'
  if (!f.date) {
    e.date = 'Choisissez une date'
  } else {
    const d = new Date(f.date+'T00:00:00'), t = new Date(); t.setHours(0,0,0,0)
    if (d <= t) e.date = 'Date passée'
  }
  if (!f.time) e.time = 'Requis'
  return e
}

// ── Contact info ──────────────────────────────────────────────
const CONTACT = [
  { Icon: Clock,  label: "Horaires",      detail: 'Sam – Jeu  ·  8h00 – 18h00', href: null },
  { Icon: Phone,  label: 'Téléphone',     detail: '0555 95 95 99',              href: 'tel:0555959599' },
  { Icon: Mail,   label: 'E-mail',        detail: 'coffeshoperudit@gmail.com',  href: 'mailto:coffeshoperudit@gmail.com' },
  { Icon: MapPin, label: 'Adresse',       detail: 'Alger, Algérie',             href: 'https://maps.google.com/?q=36.7433,3.0406' },
]

// ── Main ──────────────────────────────────────────────────────
export default function Reservation() {
  const [form,   setForm]   = useState<Form>({ name:'', phone:'', date:'', time:'', guests:'2' })
  const [errors, setErrors] = useState<Errs>({})
  const [status, setStatus] = useState<'idle'|'loading'|'success'>('idle')

  const set = (k: keyof Form) => (v: string) => setForm((f) => ({ ...f, [k]: v }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStatus('loading')
    await new Promise((r) => setTimeout(r, 1400))
    setStatus('success')
    setTimeout(() => setStatus('idle'), 6000)
  }

  return (
    <section id="reservation" className="py-36 md:py-48 bg-roast relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_70%_30%,rgba(200,150,46,0.05),transparent)]" />

      <div className="relative max-w-7xl mx-auto px-8 lg:px-16">

        {/* Section label */}
        <div className="flex items-center gap-8 mb-24">
          <span className="text-gold text-[10px] tracking-[0.6em] uppercase shrink-0">Réservation</span>
          <div className="flex-1 h-px bg-divider" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 xl:gap-32">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-serif text-5xl md:text-6xl xl:text-7xl text-cream leading-[1.05] mb-8">
              Réservez votre<br />
              <em className="text-gold not-italic">#ChezÉrudit</em>
            </h2>
            <p className="text-walnut leading-relaxed mb-14 text-base max-w-sm">
              Garantissez votre table et profitez d&rsquo;une expérience sans attente.
              Notre équipe sera ravie de vous accueillir.
            </p>

            <div className="space-y-8 border-t border-divider pt-10">
              {CONTACT.map(({ Icon, label, detail, href }) => (
                <div key={label} className="flex items-start gap-5">
                  <Icon size={14} className="text-gold mt-0.5 shrink-0" />
                  <div>
                    <div className="text-[10px] tracking-[0.2em] uppercase text-walnut mb-1">{label}</div>
                    {href ? (
                      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                        className="text-cream text-sm hover:text-gold transition-colors duration-200">{detail}</a>
                    ) : (
                      <div className="text-cream text-sm">{detail}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-start gap-5 pt-4"
                >
                  <div className="w-12 h-12 border border-gold/40 flex items-center justify-center">
                    <Check size={18} className="text-gold" />
                  </div>
                  <h3 className="font-serif text-3xl text-cream">Réservation envoyée</h3>
                  <p className="text-walnut text-sm leading-relaxed">
                    Nous vous contacterons très bientôt pour confirmer.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={submit}
                  className="space-y-8 relative"
                >
                  <Field label="Nom complet"           value={form.name}  onChange={set('name')}  error={errors.name} />
                  <Field label="Téléphone"              value={form.phone} onChange={set('phone')} type="tel" error={errors.phone} />

                  <div className="grid grid-cols-2 gap-8 relative">
                    <DateField value={form.date} onChange={set('date')} error={errors.date} />
                    <TimeField value={form.time} onChange={set('time')} error={errors.time} />
                  </div>

                  {/* Guests */}
                  <div>
                    <label className="block text-[10px] tracking-[0.25em] uppercase text-walnut mb-2">Personnes</label>
                    <div className="relative">
                      <select
                        value={form.guests}
                        onChange={(e) => set('guests')(e.target.value)}
                        className="w-full bg-transparent border-b border-divider hover:border-walnut focus:border-gold text-cream text-sm py-3 outline-none transition-colors duration-200 pr-6"
                      >
                        {[1,2,3,4,5,6,7,8].map((n) => (
                          <option key={n} value={n}>{n} {n===1?'personne':'personnes'}</option>
                        ))}
                      </select>
                      <ChevronDown size={12} className="absolute right-0 top-1/2 -translate-y-1/2 text-gold/60 pointer-events-none" />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="group flex items-center gap-4 text-xs tracking-[0.3em] uppercase text-cream hover:text-gold transition-colors duration-300 disabled:opacity-50"
                    >
                      {status === 'loading' ? (
                        <><Loader2 size={14} className="animate-spin" /> Envoi…</>
                      ) : (
                        <>
                          <span className="w-10 h-px bg-current transition-all duration-300 group-hover:w-16" />
                          Confirmer la réservation
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
