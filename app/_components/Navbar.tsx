'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const NAV_LINKS = [
  { href: '#menu',    label: 'Menu' },
  { href: '#galerie', label: 'Galerie' },
  { href: '#avis',    label: 'Avis' },
  { href: '#contact', label: 'Nous Trouver' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-cream/98 backdrop-blur-md shadow-sm'
            : 'bg-cream/95 backdrop-blur-sm'
        }`}
        style={{ borderBottom: '1px solid rgba(54,56,31,.1)' }}
      >
        <nav
          className="mx-auto flex items-center justify-between"
          style={{ maxWidth: '1400px', padding: '0 clamp(24px, 4vw, 56px)', height: '68px' }}
        >
          {/* Logo: ÉRUDIT | COFFEE SHOP */}
          <Link href="/" className="flex items-center shrink-0" style={{ gap: '14px' }}>
            <span
              className="font-serif text-olive"
              style={{ fontSize: '26px', letterSpacing: '.06em', lineHeight: 1 }}
            >
              ÉRUDIT
            </span>
            <span
              className="block bg-olive/25"
              style={{ width: '1px', height: '28px' }}
            />
            <span
              className="font-mono uppercase text-olive/55 leading-[1.35]"
              style={{ fontSize: '9px', letterSpacing: '.22em' }}
            >
              COFFEE<br />SHOP
            </span>
          </Link>

          {/* Desktop nav — pipe separated */}
          <ul className="hidden md:flex items-center">
            {NAV_LINKS.map((link, i) => (
              <li key={link.href} className="flex items-center">
                {i > 0 && (
                  <span
                    className="text-olive/30 font-mono select-none"
                    style={{ fontSize: '12px', margin: '0 20px' }}
                  >
                    |
                  </span>
                )}
                <Link
                  href={link.href}
                  className="font-mono uppercase text-muted hover:text-olive transition-colors duration-300"
                  style={{ fontSize: '11px', letterSpacing: '.18em' }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA + burger */}
          <div className="flex items-center gap-4">
            <Link
              href="#contact"
              className="hidden md:inline-flex font-mono uppercase text-olive hover:bg-olive hover:text-cream transition-all duration-300"
              style={{
                fontSize: '11px',
                letterSpacing: '.2em',
                padding: '10px 22px',
                border: '1px solid rgba(54,56,31,.45)',
              }}
            >
              Réserver
            </Link>

            <button
              onClick={() => setOpen(!open)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-olive border border-olive/25 rounded-full hover:bg-olive/5 transition-colors"
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {open ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <line x1="1" y1="1" x2="13" y2="13" />
                  <line x1="13" y1="1" x2="1" y2="13" />
                </svg>
              ) : (
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <line x1="0" y1="1" x2="16" y2="1" />
                  <line x1="0" y1="9" x2="16" y2="9" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-cream flex flex-col items-center justify-center gap-1"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
              >
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-serif text-4xl text-olive hover:text-terra transition-colors duration-300 text-center"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.06 + 0.05 }}
              className="mt-8"
            >
              <Link
                href="#contact"
                onClick={() => setOpen(false)}
                className="inline-flex font-mono uppercase text-olive border border-olive/45 px-10 py-4 transition-colors hover:bg-olive hover:text-cream"
                style={{ fontSize: '11px', letterSpacing: '.2em' }}
              >
                Réserver
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
