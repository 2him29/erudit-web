'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const TITLE = 'ÉRUDIT'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const shouldReduce = useReducedMotion()

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY    = useTransform(scrollYProgress, [0, 1], shouldReduce ? ['0%', '0%'] : ['0%', '18%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      ref={ref}
      id="accueil"
      className="relative overflow-hidden"
      style={{ minHeight: '100svh' }}
    >
      {/* Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <Image
          src="/IMG_3890.jpeg"
          alt="Érudit Connect Lounge"
          fill
          className="object-cover"
          priority
          quality={90}
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(160deg, rgba(22,21,16,.34) 0%, rgba(22,21,16,.72) 100%)' }}
        />
      </motion.div>

      {/* Content — bottom-left */}
      <motion.div
        className="absolute z-10 max-w-2xl"
        style={{ left: '5%', bottom: '8%', opacity }}
      >
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-[34px] h-px bg-terra" />
          <span
            className="font-mono uppercase"
            style={{ fontSize: '11px', letterSpacing: '.28em', color: 'rgba(246,241,231,.8)' }}
          >
            Connect Lounge · Alger
          </span>
        </div>

        {/* Title — letter by letter */}
        <div className="overflow-hidden mb-4">
          <h1
            className="font-serif font-bold leading-[.92]"
            style={{ fontSize: 'clamp(58px, 10vw, 110px)', color: '#F6F1E7', letterSpacing: '-.02em' }}
          >
            {TITLE.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: '105%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
                style={{ display: 'inline-block' }}
              >
                {char}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="font-serif italic mb-10"
          style={{ fontSize: 'clamp(17px, 2.1vw, 22px)', color: 'rgba(246,241,231,.75)' }}
        >
          &ldquo;Espace pour savourer, connecter, créer&rdquo;
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <Link
            href="#contact"
            className="inline-flex font-mono uppercase rounded-full transition-all duration-300 hover:bg-[#F6F1E7] hover:text-olive"
            style={{
              fontSize: '12px',
              letterSpacing: '.16em',
              padding: '16px 32px',
              border: '1px solid rgba(246,241,231,.55)',
              color: '#F6F1E7',
              textDecoration: 'none',
            }}
          >
            Réserver une table
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-[26px] left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2.5"
      >
        <span
          className="font-mono uppercase"
          style={{ fontSize: '9px', letterSpacing: '.34em', color: 'rgba(246,241,231,.7)' }}
        >
          Défiler
        </span>
        {shouldReduce ? (
          <div className="w-px h-[30px] bg-[#F6F1E7] opacity-70" />
        ) : (
          <span
            className="block"
            style={{
              width: '1.5px',
              height: '30px',
              background: '#F6F1E7',
              transformOrigin: 'top',
              animation: 'cuepulse 1.9s ease-in-out infinite',
            }}
          />
        )}
      </motion.div>
    </section>
  )
}
