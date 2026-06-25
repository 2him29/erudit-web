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
    <section
      id="galerie"
      className="bg-cream scroll-mt-20"
      style={{ padding: 'clamp(72px, 12vh, 150px) 0' }}
    >
      <div className="mx-auto" style={{ maxWidth: '1240px', padding: '0 clamp(20px, 5vw, 64px)' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
          style={{ marginBottom: 'clamp(32px, 5vh, 52px)' }}
        >
          <p
            className="flex items-center font-mono uppercase text-terra"
            style={{ fontSize: '12px', letterSpacing: '.28em', gap: '14px', marginBottom: '22px' }}
          >
            <span className="inline-block h-px bg-terra" style={{ width: '30px' }} />
            Galerie
          </p>
          <h2
            className="font-serif font-normal text-olive leading-none"
            style={{ fontSize: 'clamp(40px, 6vw, 76px)' }}
          >
            L&rsquo;ambiance
          </h2>
        </motion.div>

        {/* CSS columns masonry */}
        <div style={{ columnWidth: 'clamp(220px, 29vw, 300px)', columnGap: '16px' }}>
          {PHOTOS.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] as const }}
              onClick={() => setSelected(i)}
              className="group relative cursor-pointer overflow-hidden"
              style={{
                breakInside: 'avoid',
                marginBottom: '16px',
                borderRadius: '16px',
                boxShadow: '0 12px 30px -22px rgba(54,56,31,.5)',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="block w-full h-auto"
              />
              <div
                className="absolute left-0 right-0 bottom-0 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-[450ms]"
                style={{ padding: '34px 18px 16px', background: 'linear-gradient(transparent, rgba(28,26,16,.72))' }}
              >
                <span className="font-serif italic text-[#F6F1E7]" style={{ fontSize: '19px' }}>
                  {photo.alt}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instagram */}
        <div className="flex items-center" style={{ gap: '22px', marginTop: 'clamp(40px, 6vh, 64px)' }}>
          <span className="flex-1 h-px" style={{ background: 'rgba(54,56,31,.16)' }} />
          <a
            href="https://instagram.com/erudit_connect_lounge"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono uppercase text-muted hover:text-terra transition-colors duration-300 whitespace-nowrap"
            style={{ fontSize: '12px', letterSpacing: '.18em' }}
          >
            @erudit_connect_lounge
          </a>
          <span className="flex-1 h-px" style={{ background: 'rgba(54,56,31,.16)' }} />
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
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: 'rgba(22,21,16,.96)' }}
            onClick={close}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
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

            <motion.p
              key={`cap-${selected}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 font-serif italic text-sm text-terra"
              onClick={(e) => e.stopPropagation()}
            >
              {PHOTOS[selected].alt}
            </motion.p>

            <span
              className="absolute bottom-8 right-8 font-mono text-xs tabular-nums"
              style={{ color: 'rgba(207,200,178,.5)' }}
              onClick={(e) => e.stopPropagation()}
            >
              {selected + 1} / {PHOTOS.length}
            </span>

            {[
              { dir: 'prev', icon: ChevronLeft,  pos: 'left-4',  fn: () => setSelected((s) => s !== null ? (s - 1 + PHOTOS.length) % PHOTOS.length : 0) },
              { dir: 'next', icon: ChevronRight, pos: 'right-4', fn: () => setSelected((s) => s !== null ? (s + 1) % PHOTOS.length : 0) },
            ].map(({ dir, icon: Icon, pos, fn }) => (
              <button
                key={dir}
                onClick={(e) => { e.stopPropagation(); fn() }}
                className={`absolute ${pos} top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full transition-colors`}
                style={{ color: 'rgba(207,200,178,.7)', border: '1px solid rgba(207,200,178,.2)' }}
              >
                <Icon size={18} />
              </button>
            ))}

            <button
              onClick={close}
              className="absolute top-6 right-6 w-9 h-9 flex items-center justify-center rounded-full transition-colors"
              style={{ color: 'rgba(207,200,178,.7)', border: '1px solid rgba(207,200,178,.2)' }}
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
