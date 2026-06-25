'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const STATS = [
  { value: '5★',     label: 'sur Google' },
  { value: '5×',     label: 'visite moy.' },
  { value: 'Sam–Jeu', label: '8h – 18h' },
]

export default function About() {
  const ref = useRef<HTMLElement>(null)

  return (
    <section ref={ref} id="about" className="py-36 md:py-48 bg-roast">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">

        {/* Section label row */}
        <div className="flex items-center gap-8 mb-24">
          <span className="text-gold text-[10px] tracking-[0.6em] uppercase shrink-0">
            Notre Univers
          </span>
          <div className="flex-1 h-px bg-divider" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 xl:gap-32 items-center">

          {/* ── Text ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-serif text-5xl md:text-6xl xl:text-7xl text-cream leading-[1.05] mb-10">
              Un havre de paix<br />
              <em className="text-gold not-italic">au cœur d&rsquo;Alger</em>
            </h2>

            <div className="space-y-5 text-walnut text-base md:text-lg leading-[1.85] max-w-lg">
              <p>
                Érudit Connect Lounge est bien plus qu&rsquo;un café. C&rsquo;est un espace
                pensé pour les professionnels, les créatifs et les épicuriens qui cherchent
                à se retrouver, travailler ou simplement savourer un moment d&rsquo;exception.
              </p>
              <p>
                Décoration raffinée, cuisine savoureuse, jus naturels d&rsquo;exception et
                un service impeccable &mdash; chaque visite devient un souvenir inoubliable.
                Profitez aussi de notre terrasse ombragée, où une petite famille de tortues
                vous attend.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-0 mt-16 pt-10 border-t border-divider">
              {STATS.map((s, i) => (
                <div key={i} className={i > 0 ? 'pl-8 border-l border-divider' : ''}>
                  <div className="font-serif text-4xl xl:text-5xl text-gold leading-none mb-2">
                    {s.value}
                  </div>
                  <div className="text-walnut text-[11px] tracking-[0.2em] uppercase">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Image ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/IMG_3882.jpeg"
                alt="Sandwich & jus naturel chez Érudit"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 to-transparent" />
            </div>

            {/* Small accent image — desktop only */}
            <div className="absolute -bottom-8 -left-8 w-2/5 aspect-square overflow-hidden border border-divider hidden xl:block">
              <Image
                src="/IMG_3884.jpeg"
                alt="Healthy Breakfast"
                fill
                className="object-cover"
                sizes="20vw"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
