'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const LETTERS = 'ÉRUDIT'.split('')

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const shouldReduce = useReducedMotion()

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY      = useTransform(scrollYProgress, [0, 1], shouldReduce ? ['0%','0%'] : ['0%', '18%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])
  const opacity  = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      ref={ref}
      id="accueil"
      className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <Image
          src="/IMG_3890.jpeg"
          alt="Érudit Connect Lounge — terrasse"
          fill
          className="object-cover"
          priority
          quality={90}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/60 via-espresso/40 to-espresso" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto w-full"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-gold text-[10px] tracking-[0.5em] uppercase mb-10 font-sans"
        >
          Connect Lounge · Alger
        </motion.p>

        {/* Title */}
        <div className="flex justify-center items-end gap-[0.02em] overflow-hidden mb-4">
          {LETTERS.map((char, i) => (
            <motion.span
              key={i}
              initial={{ y: '105%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.35 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif font-bold text-cream leading-none"
              style={{ fontSize: 'clamp(5rem, 13vw, 11rem)', display: 'inline-block' }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="w-20 h-px bg-gold/60 mx-auto mb-7"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="font-serif text-lg md:text-xl text-walnut italic mb-14"
        >
          &ldquo;Espace pour savourer, connecter, créer&rdquo;
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center"
        >
          <Link
            href="#reservation"
            className="text-xs tracking-[0.3em] uppercase px-10 py-4 bg-gold text-espresso font-semibold hover:bg-honey transition-colors duration-300"
          >
            Réserver une table
          </Link>
          <Link
            href="#menu"
            className="text-xs tracking-[0.3em] uppercase px-10 py-4 border border-cream/20 text-cream/70 hover:border-gold/50 hover:text-gold transition-colors duration-300"
          >
            Voir le menu
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span className="text-walnut/50 text-[9px] tracking-[0.4em] uppercase">Défiler</span>
        {shouldReduce ? (
          <div className="w-px h-6 bg-gold/40" />
        ) : (
          <motion.div
            className="w-px bg-gold"
            animate={{ height: [0, 24, 0], opacity: [0, 0.8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </motion.div>
    </section>
  )
}
