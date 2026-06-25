'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { href: '#menu',        label: 'Menu' },
  { href: '#galerie',     label: 'Galerie' },
  { href: '#avis',        label: 'Avis' },
  { href: '#reservation', label: 'Réservation' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-roast/95 backdrop-blur-md border-b border-divider py-3 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
            : 'bg-transparent py-6'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative h-14 w-36 shrink-0">
            <Image
              src="/logo.png"
              alt="Érudit Connect Lounge"
              fill
              sizes="144px"
              className="object-contain object-left"
              priority
            />
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="relative text-walnut hover:text-cream text-xs tracking-[0.2em] uppercase font-medium transition-colors duration-300 group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-400" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA + mobile burger */}
          <div className="flex items-center gap-4">
            <Link
              href="#reservation"
              className="hidden md:inline-flex items-center gap-2 border border-gold/70 hover:border-gold text-gold hover:text-espresso hover:bg-gold text-[11px] font-semibold tracking-[0.25em] uppercase px-7 py-2.5 rounded-full transition-all duration-300 hover:shadow-[0_0_24px_rgba(200,150,46,0.35)]"
            >
              Réserver
            </Link>

            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-cream p-1.5 -mr-1"
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-espresso/98 flex flex-col items-center justify-center gap-2"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 28 }}
                transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-serif text-4xl text-cream hover:text-gold transition-colors duration-300 text-center"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.07 + 0.05 }}
              className="mt-8"
            >
              <Link
                href="#reservation"
                onClick={() => setOpen(false)}
                className="inline-flex bg-gold hover:bg-honey text-espresso text-sm font-bold tracking-[0.2em] uppercase px-10 py-4 rounded-full transition-colors"
              >
                Réserver une table
              </Link>
            </motion.div>

            {/* Subtle gold glow bottom */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
