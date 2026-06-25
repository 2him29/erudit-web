'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const DETAILS = [
  {
    label: 'Horaires',
    content: (
      <div>
        <div className="text-olive" style={{ fontSize: '16px' }}>
          Samedi – Jeudi · <span className="text-terra font-semibold">08h – 18h</span>
        </div>
        <div className="text-quiet" style={{ fontSize: '13px', marginTop: '3px' }}>Vendredi : fermé</div>
      </div>
    ),
  },
  {
    label: 'Adresse',
    content: <span className="text-olive" style={{ fontSize: '16px' }}>Alger, Algérie</span>,
  },
  {
    label: 'Tél',
    content: (
      <a href="tel:0555959599" className="text-olive hover:text-terra transition-colors" style={{ fontSize: '16px' }}>
        0555 95 95 99
      </a>
    ),
  },
  {
    label: 'Email',
    content: (
      <a href="mailto:coffeshoperudit@gmail.com" className="text-olive hover:text-terra transition-colors" style={{ fontSize: '16px' }}>
        coffeshoperudit@gmail.com
      </a>
    ),
  },
]

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-cream scroll-mt-20"
      style={{ padding: 'clamp(72px, 12vh, 150px) 0' }}
    >
      <div className="mx-auto" style={{ maxWidth: '1200px', padding: '0 clamp(20px, 5vw, 64px)' }}>
        <div className="grid md:grid-cols-2 items-center" style={{ gap: 'clamp(36px, 5vw, 72px)' }}>

          {/* ── Info ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <p
              className="flex items-center font-mono uppercase text-terra"
              style={{ fontSize: '12px', letterSpacing: '.28em', gap: '14px', marginBottom: '22px' }}
            >
              <span className="inline-block h-px bg-terra" style={{ width: '30px' }} />
              Nous trouver
            </p>

            <h2
              className="font-serif font-normal text-olive leading-[1.04]"
              style={{ fontSize: 'clamp(38px, 5.4vw, 66px)', marginBottom: '30px' }}
            >
              Passez nous<br />
              voir <em className="text-terra not-italic">bientôt</em>
            </h2>

            {/* Details */}
            <div className="flex flex-col" style={{ gap: '18px', marginBottom: '34px' }}>
              {DETAILS.map(({ label, content }) => (
                <div key={label} className="flex items-baseline" style={{ gap: '16px' }}>
                  <span
                    className="font-mono uppercase text-quiet shrink-0"
                    style={{ fontSize: '11px', letterSpacing: '.1em', width: '84px' }}
                  >
                    {label}
                  </span>
                  {content}
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap" style={{ gap: '14px' }}>
              <a
                href="https://maps.google.com/?q=36.7433,3.0406"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono uppercase transition-all duration-300 hover:opacity-90"
                style={{
                  background: '#36381F',
                  color: '#EFE7D6',
                  textDecoration: 'none',
                  padding: '15px 30px',
                  borderRadius: '100px',
                  fontSize: '12px',
                  letterSpacing: '.16em',
                }}
              >
                Itinéraire
              </a>
              <a
                href="tel:0555959599"
                className="font-mono uppercase transition-all duration-300 hover:bg-olive hover:text-cream"
                style={{
                  background: 'transparent',
                  color: '#36381F',
                  textDecoration: 'none',
                  padding: '15px 30px',
                  borderRadius: '100px',
                  border: '1px solid rgba(54,56,31,.4)',
                  fontSize: '12px',
                  letterSpacing: '.16em',
                }}
              >
                Appeler
              </a>
            </div>
          </motion.div>

          {/* ── Image ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, delay: 0.12, ease: [0.22, 1, 0.36, 1] as const }}
            className="relative"
          >
            <div
              className="relative overflow-hidden"
              style={{
                aspectRatio: '4/5',
                borderRadius: '24px',
                boxShadow: '0 30px 60px -34px rgba(54,56,31,.5)',
              }}
            >
              <Image
                src="/IMG_3894.jpeg"
                alt="L'entrée d'Érudit"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 45vw"
              />
            </div>

            {/* Location card overlay */}
            <div
              className="absolute flex items-center justify-between"
              style={{
                left: '22px', right: '22px', bottom: '22px',
                background: 'rgba(242,235,221,.94)',
                backdropFilter: 'blur(6px)',
                borderRadius: '16px',
                padding: '18px 22px',
                gap: '14px',
              }}
            >
              <div>
                <div className="font-serif text-olive" style={{ fontSize: '20px' }}>
                  Érudit Connect Lounge
                </div>
                <div
                  className="font-mono uppercase text-quiet"
                  style={{ fontSize: '11px', letterSpacing: '.1em', marginTop: '4px' }}
                >
                  Alger · Algérie
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=36.7433,3.0406"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center shrink-0 text-cream"
                style={{
                  width: '40px', height: '40px',
                  borderRadius: '100px',
                  background: '#BF6A3F',
                  fontSize: '16px',
                  textDecoration: 'none',
                }}
              >
                ➜
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
