'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const PHOTOS = [
  { src: '/IMG_3890.jpeg', alt: 'La terrasse' },
  { src: '/IMG_3883.jpeg', alt: 'Plat du jour' },
  { src: '/IMG_3882.jpeg', alt: 'Sandwich & jus' },
  { src: '/IMG_3884.jpeg', alt: 'Healthy Breakfast' },
  { src: '/IMG_3885.jpeg', alt: 'Jus naturels' },
  { src: '/IMG_3886.jpeg', alt: 'Brunch Érudit' },
  { src: '/IMG_3887.jpeg', alt: 'Suggestion du chef' },
  { src: '/IMG_3889.jpeg', alt: 'Café spécialité' },
  { src: '/IMG_3891.jpeg', alt: 'Ambiance lounge' },
  { src: '/IMG_3892.jpeg', alt: 'Érudit moments' },
  { src: '/IMG_3893.jpeg', alt: 'Décoration raffinée' },
  { src: '/IMG_3894.jpeg', alt: 'Terrasse extérieure' },
]

export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null)

  const close = useCallback(() => setSelected(null), [])

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft')  setSelected((s) => s !== null ? (s - 1 + PHOTOS.length) % PHOTOS.length : null)
      if (e.key === 'ArrowRight') setSelected((s) => s !== null ? (s + 1) % PHOTOS.length : null)
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [close])

  useEffect(() => {
    document.body.style.overflow = selected !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selected])

  return (
    <section id="galerie" className="py-36 md:py-48 bg-roast">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">

        {/* Section label */}
        <div className="flex items-center gap-8 mb-24">
          <span className="text-gold text-[10px] tracking-[0.6em] uppercase shrink-0">
            Album
          </span>
          <div className="flex-1 h-px bg-divider" />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl md:text-6xl xl:text-7xl text-cream mb-16"
        >
          Galerie
        </motion.h2>

        {/* Uniform grid — 4 cols desktop, 2 mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
          {PHOTOS.map((photo, i) => (
            <motion.div
              key={photo.src}
              layoutId={`tile-${i}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              onClick={() => setSelected(i)}
              className="group relative aspect-square overflow-hidden cursor-pointer"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/30 transition-colors duration-400 flex items-end p-3">
                <span className="text-gold text-[10px] tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-1 group-hover:translate-y-0">
                  {photo.alt}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instagram */}
        <div className="flex items-center gap-8 mt-16">
          <div className="flex-1 h-px bg-divider" />
          <a
            href="https://instagram.com/erudit_connect_lounge"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.3em] uppercase text-walnut hover:text-gold transition-colors duration-300 shrink-0"
          >
            @erudit_connect_lounge
          </a>
          <div className="flex-1 h-px bg-divider" />
        </div>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-espresso/96 flex items-center justify-center"
            onClick={close}
          >
            {/* Image */}
            <motion.div
              layoutId={`tile-${selected}`}
              className="relative"
              style={{ width: 'min(90vw, 1000px)', height: 'min(85vh, 700px)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={PHOTOS[selected].src}
                alt={PHOTOS[selected].alt}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </motion.div>

            {/* Caption */}
            <motion.p
              key={`cap-${selected}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 font-serif italic text-sm text-gold"
              onClick={(e) => e.stopPropagation()}
            >
              {PHOTOS[selected].alt}
            </motion.p>

            {/* Counter */}
            <span
              className="absolute bottom-8 right-8 text-xs text-walnut tabular-nums"
              onClick={(e) => e.stopPropagation()}
            >
              {selected + 1} / {PHOTOS.length}
            </span>

            {/* Arrows */}
            {[
              { dir: 'prev', icon: ChevronLeft,  pos: 'left-4',  fn: () => setSelected((s) => s !== null ? (s - 1 + PHOTOS.length) % PHOTOS.length : 0) },
              { dir: 'next', icon: ChevronRight, pos: 'right-4', fn: () => setSelected((s) => s !== null ? (s + 1) % PHOTOS.length : 0) },
            ].map(({ dir, icon: Icon, pos, fn }) => (
              <button
                key={dir}
                onClick={(e) => { e.stopPropagation(); fn() }}
                className={`absolute ${pos} top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-walnut hover:text-gold border border-divider hover:border-gold/40 transition-colors duration-200`}
              >
                <Icon size={18} />
              </button>
            ))}

            {/* Close */}
            <button
              onClick={close}
              className="absolute top-6 right-6 w-9 h-9 flex items-center justify-center text-walnut hover:text-gold border border-divider hover:border-gold/40 transition-colors duration-200"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
