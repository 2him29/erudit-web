'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const CATEGORIES = ['Tout', 'Brunch', 'Sandwichs', 'Jus Naturels', 'Cafés & Boissons']

const ITEMS = [
  { id: 1, name: 'Healthy Breakfast',   category: 'Brunch',           description: 'Œufs brouillés, pain grillé artisanal, saucisses, fraises et confitures maison.', image: '/IMG_3884.jpeg', tag: 'Favori',        price: '1 500 DA' },
  { id: 2, name: 'Sandwich Signature',  category: 'Sandwichs',        description: 'Pain artisanal, halloumi grillé, légumes frais du marché, pesto maison et basilic.', image: '/IMG_3882.jpeg', tag: 'Best Seller',   price: '850 DA' },
  { id: 3, name: 'Jus Naturel du Jour', category: 'Jus Naturels',     description: 'Pressé à la commande avec des fruits frais de saison, sans sucre ajouté.', image: '/IMG_3885.jpeg', tag: 'Fait Maison',   price: '400 DA' },
  { id: 4, name: 'Brunch Érudit',       category: 'Brunch',           description: 'Notre sélection signature — le meilleur de notre cuisine réuni en une assiette généreuse.', image: '/IMG_3886.jpeg', tag: 'Signature',     price: '2 200 DA' },
  { id: 5, name: 'Suggestion du Chef',  category: 'Brunch',           description: "Renouvelée chaque jour selon les arrivages et l'inspiration de notre chef.", image: '/IMG_3887.jpeg', tag: 'Du Chef',       price: '1 800 DA' },
  { id: 6, name: 'Café Spécialité',     category: 'Cafés & Boissons', description: 'Latte art, cold brew et créations maison. Chaque tasse est une expérience.', image: '/IMG_3889.jpeg', tag: 'Incontournable', price: '350 DA' },
]

export default function Menu() {
  const [active, setActive] = useState('Tout')
  const filtered = active === 'Tout' ? ITEMS : ITEMS.filter((i) => i.category === active)

  return (
    <section
      id="menu"
      className="bg-parchment scroll-mt-20"
      style={{ padding: 'clamp(72px, 12vh, 150px) 0' }}
    >
      <div className="mx-auto" style={{ maxWidth: '1240px', padding: '0 clamp(20px, 5vw, 64px)' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
          className="flex flex-wrap items-end justify-between"
          style={{ gap: '28px', marginBottom: 'clamp(34px, 5vh, 56px)' }}
        >
          <div>
            <p
              className="flex items-center font-mono uppercase text-terra"
              style={{ fontSize: '12px', letterSpacing: '.28em', gap: '14px', marginBottom: '22px' }}
            >
              <span className="inline-block h-px bg-terra" style={{ width: '30px' }} />
              Gastronomie
            </p>
            <h2
              className="font-serif font-normal text-olive leading-none"
              style={{ fontSize: 'clamp(40px, 6vw, 76px)' }}
            >
              Le Menu
            </h2>
            <p className="text-muted leading-[1.7]" style={{ fontSize: '16px', marginTop: '16px', maxWidth: '440px' }}>
              Fait maison, chaque jour. Des produits frais, pressés et grillés à la commande.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap" style={{ gap: '22px' }}>
            {CATEGORIES.map((cat) => {
              const isActive = active === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className="relative font-mono uppercase transition-colors duration-300 pb-1.5"
                  style={{
                    fontSize: '12px',
                    letterSpacing: '.14em',
                    color: isActive ? '#BF6A3F' : '#6B6450',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {cat}
                  {isActive && (
                    <motion.span
                      layoutId="tab-line"
                      className="absolute left-0 right-0 bottom-0 h-px bg-terra"
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 'clamp(18px, 2vw, 28px)' }}
          >
            {filtered.map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as const }}
                className="bg-card flex flex-col overflow-hidden"
                style={{ borderRadius: '20px', border: '1px solid rgba(54,56,31,.08)' }}
              >
                {/* Photo */}
                <div className="relative overflow-hidden group" style={{ aspectRatio: '4/3' }}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <span
                    className="absolute font-mono uppercase backdrop-blur-sm"
                    style={{
                      top: '13px', left: '13px',
                      fontSize: '10px', letterSpacing: '.12em',
                      background: 'rgba(242,235,221,.92)',
                      color: '#4E5230',
                      padding: '6px 11px',
                      borderRadius: '100px',
                    }}
                  >
                    {item.tag}
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1" style={{ padding: '22px 24px 26px' }}>
                  <h3 className="font-serif font-normal text-olive" style={{ fontSize: '24px', marginBottom: '9px' }}>
                    {item.name}
                  </h3>
                  <p className="text-quiet leading-[1.6] flex-1" style={{ fontSize: '14.5px' }}>
                    {item.description}
                  </p>

                  {/* Price row */}
                  <div className="flex items-baseline" style={{ gap: '10px', marginTop: '18px' }}>
                    <span className="font-mono uppercase text-quiet" style={{ fontSize: '10px', letterSpacing: '.1em' }}>
                      dès
                    </span>
                    <span
                      className="flex-1 border-b border-dotted"
                      style={{ borderColor: 'rgba(54,56,31,.32)', transform: 'translateY(-3px)' }}
                    />
                    <span className="font-mono font-medium text-terra" style={{ fontSize: '16px' }}>
                      {item.price}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <div className="flex items-center" style={{ gap: '22px', marginTop: 'clamp(40px, 6vh, 64px)' }}>
          <span className="flex-1 h-px" style={{ background: 'rgba(54,56,31,.16)' }} />
          <a
            href="https://restolink.dz"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono uppercase text-muted hover:text-terra transition-colors duration-300 whitespace-nowrap"
            style={{ fontSize: '12px', letterSpacing: '.18em' }}
          >
            Voir la carte complète →
          </a>
          <span className="flex-1 h-px" style={{ background: 'rgba(54,56,31,.16)' }} />
        </div>

      </div>
    </section>
  )
}
