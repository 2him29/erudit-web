'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const CATEGORIES = ['Tout', 'Brunch', 'Sandwichs', 'Jus Naturels', 'Cafés & Boissons']

const ITEMS = [
  { id: 1, name: 'Healthy Breakfast',   category: 'Brunch',           description: 'Œufs brouillés, pain grillé artisanal, saucisses, fraises et confitures maison.', image: '/IMG_3884.jpeg', tag: 'Favori' },
  { id: 2, name: 'Sandwich Signature',  category: 'Sandwichs',        description: 'Pain artisanal, halloumi grillé, légumes frais du marché, pesto maison et basilic.', image: '/IMG_3882.jpeg', tag: 'Best Seller' },
  { id: 3, name: 'Jus Naturel du Jour', category: 'Jus Naturels',     description: 'Pressé à la commande avec des fruits frais de saison, sans sucre ajouté.', image: '/IMG_3885.jpeg', tag: 'Fait Maison' },
  { id: 4, name: 'Brunch Érudit',       category: 'Brunch',           description: 'Notre sélection signature — le meilleur de notre cuisine réuni en une assiette généreuse.', image: '/IMG_3886.jpeg', tag: 'Signature' },
  { id: 5, name: 'Suggestion du Chef',  category: 'Brunch',           description: "Renouvelée chaque jour selon les arrivages et l'inspiration de notre chef.", image: '/IMG_3887.jpeg', tag: 'Du Chef' },
  { id: 6, name: 'Café Spécialité',     category: 'Cafés & Boissons', description: 'Latte art, cold brew et créations maison. Chaque tasse est une expérience.', image: '/IMG_3889.jpeg', tag: 'Incontournable' },
]

export default function Menu() {
  const [active, setActive] = useState('Tout')
  const filtered = active === 'Tout' ? ITEMS : ITEMS.filter((i) => i.category === active)

  return (
    <section id="menu" className="py-36 md:py-48 bg-espresso">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">

        {/* Section label */}
        <div className="flex items-center gap-8 mb-24">
          <span className="text-gold text-[10px] tracking-[0.6em] uppercase shrink-0">
            Gastronomie
          </span>
          <div className="flex-1 h-px bg-divider" />
        </div>

        {/* Heading + tabs row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-5xl md:text-6xl xl:text-7xl text-cream"
          >
            Notre Menu
          </motion.h2>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {CATEGORIES.map((cat) => {
              const isActive = active === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className="relative pb-1 text-xs tracking-[0.2em] uppercase transition-colors duration-300"
                  style={{ color: isActive ? '#C8962E' : '#9C8265' }}
                >
                  {cat}
                  {isActive && (
                    <motion.span
                      layoutId="tab-line"
                      className="absolute bottom-0 left-0 right-0 h-px bg-gold"
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14"
          >
            {filtered.map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="group"
              >
                {/* Photo */}
                <div className="relative aspect-[4/3] overflow-hidden mb-5">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Tag */}
                  <span className="absolute bottom-4 left-4 text-[10px] tracking-[0.35em] text-gold uppercase">
                    {item.tag}
                  </span>
                </div>

                {/* Text */}
                <h3 className="font-serif text-2xl text-cream mb-2 group-hover:text-gold transition-colors duration-300">
                  {item.name}
                </h3>
                <p className="text-walnut text-sm leading-relaxed">{item.description}</p>

                {/* Underline that grows on hover */}
                <div className="mt-5 h-px bg-divider overflow-hidden">
                  <div className="h-full bg-gold scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <div className="mt-20 flex items-center gap-8">
          <div className="flex-1 h-px bg-divider" />
          <a
            href="https://restolink.dz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.3em] uppercase text-walnut hover:text-gold transition-colors duration-300 shrink-0"
          >
            Voir le menu complet →
          </a>
          <div className="flex-1 h-px bg-divider" />
        </div>

      </div>
    </section>
  )
}
