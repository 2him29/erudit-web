'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const STATS = [
  { value: '4.9', label: 'note Google' },
  { value: '5×',  label: 'on y revient' },
  { value: '8–18h', label: 'Sam au Jeu' },
]

export default function About() {
  return (
    <section
      id="apropos"
      className="bg-cream scroll-mt-20"
      style={{ padding: 'clamp(72px, 12vh, 150px) 0' }}
    >
      <div className="mx-auto" style={{ maxWidth: '1200px', padding: '0 clamp(20px, 5vw, 64px)' }}>
        <div className="grid md:grid-cols-2 items-center" style={{ gap: 'clamp(40px, 7vw, 96px)' }}>

          {/* ── Text ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <p
              className="flex items-center font-mono uppercase text-terra"
              style={{ fontSize: '12px', letterSpacing: '.28em', gap: '12px', marginBottom: '26px' }}
            >
              <span className="flex items-center" style={{ gap: '4px' }}>
                <span className="inline-block h-px bg-terra" style={{ width: '16px' }} />
                <span className="inline-block h-px bg-terra" style={{ width: '16px' }} />
              </span>
              Notre Univers
            </p>

            <h2
              className="font-serif font-normal text-olive leading-[1.04]"
              style={{ fontSize: 'clamp(38px, 5.4vw, 68px)', marginBottom: '30px' }}
            >
              Un havre de paix<br />
              <em className="text-terra not-italic">au cœur d&rsquo;Alger</em>
            </h2>

            <div
              className="flex flex-col text-muted leading-[1.8]"
              style={{ gap: '18px', maxWidth: '480px', fontSize: 'clamp(15px, 1.6vw, 17px)' }}
            >
              <p>
                Érudit Coffee Shop, c&rsquo;est bien plus qu&rsquo;un café. Un lieu pensé pour les créatifs,
                les professionnels et les épicuriens — pour se retrouver, travailler, ou simplement
                savourer un moment d&rsquo;exception.
              </p>
              <p>
                Lumière douce, bambou, coussins terracotta et une cuisine généreuse. Sur la terrasse
                ombragée, une petite famille de tortues veille tranquillement sur vos après-midis.
              </p>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-3"
              style={{
                gap: '18px',
                marginTop: '42px',
                paddingTop: '34px',
                borderTop: '1px solid rgba(54,56,31,.16)',
              }}
            >
              {STATS.map((s, i) => (
                <div
                  key={i}
                  style={i > 0 ? { paddingLeft: '18px', borderLeft: '1px solid rgba(54,56,31,.16)' } : {}}
                >
                  <div
                    className="font-serif text-terra leading-none"
                    style={{ fontSize: 'clamp(30px, 4vw, 46px)' }}
                  >
                    {s.value}
                  </div>
                  <div
                    className="font-mono uppercase text-quiet"
                    style={{ fontSize: '11px', letterSpacing: '.1em', marginTop: '6px' }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Images ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const }}
            className="relative"
          >
            {/* Main image */}
            <div
              className="relative overflow-hidden"
              style={{
                aspectRatio: '4/5',
                borderRadius: '24px',
                boxShadow: '0 30px 60px -34px rgba(54,56,31,.5)',
              }}
            >
              <Image
                src="/IMG_3892.jpeg"
                alt="La terrasse cosy d'Érudit"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 45vw"
              />
            </div>

            {/* Accent image */}
            <div
              className="absolute overflow-hidden"
              style={{
                left: '-26px',
                bottom: '-30px',
                width: '44%',
                aspectRatio: '1',
                borderRadius: '18px',
                border: '7px solid #F2EBDD',
                boxShadow: '0 20px 40px -22px rgba(54,56,31,.5)',
              }}
            >
              <Image
                src="/IMG_3884.jpeg"
                alt="Healthy Breakfast"
                fill
                className="object-cover"
                sizes="20vw"
              />
              {/* Caption overlay */}
              <div
                className="absolute bottom-0 left-0 right-0"
                style={{ padding: '28px 14px 14px', background: 'linear-gradient(transparent, rgba(54,56,31,.65))' }}
              >
                <span
                  className="font-serif text-[#F6F1E7] leading-[1.2] block"
                  style={{ fontSize: '13px' }}
                >
                  Healthy<br />Breakfast
                </span>
              </div>
            </div>

            {/* Decorative circle */}
            <div
              className="absolute opacity-50"
              style={{
                right: '-14px',
                top: '-14px',
                width: '84px',
                height: '84px',
                border: '1px solid #BF6A3F',
                borderRadius: '100px',
              }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
