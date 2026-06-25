'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const REVIEWS = [
  {
    name: 'Neggazi Alaasirine',
    role: 'Local Guide · 14 avis',
    text: "Très belle expérience ! L'ambiance était magnifique. Notre serveur Rachid était super sympathique et accueillant. Je reviendrai avec grand plaisir.",
    time: 'il y a 3 mois',
  },
  {
    name: 'Maria Sahoui',
    role: '2 avis · 8 photos',
    text: "Je ne vais jamais au même café plus de 2 fois, mais pour Érudit je suis allée près de 5 fois. La nourriture est super bonne, les jus naturels sont excellents.",
    time: 'il y a 6 mois',
  },
  {
    name: 'DANYA',
    role: 'Local Guide · 7 avis',
    text: "Un havre de paix au milieu de la ville avec un décor raffiné et apaisant. Le petit + : une famille de tortues côté terrasse — un charme inattendu.",
    time: 'il y a 1 mois',
  },
  {
    name: 'Damiche Sofiane',
    role: '6 avis · 5 photos',
    text: "Excellent brunch. La qualité des ingrédients est parfaite. L'endroit est très mignon. Mention très spéciale au service au top — merci à Naser.",
    time: 'il y a 4 mois',
  },
]

export default function Reviews() {
  return (
    <section id="avis" className="py-36 md:py-48 bg-espresso">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">

        {/* Section label */}
        <div className="flex items-center gap-8 mb-24">
          <span className="text-gold text-[10px] tracking-[0.6em] uppercase shrink-0">
            Témoignages
          </span>
          <div className="flex-1 h-px bg-divider" />
          {/* Rating pill */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map((i) => <Star key={i} size={11} fill="#C8962E" strokeWidth={0} />)}
            </div>
            <span className="text-walnut text-[11px]">4.9 · Google</span>
          </div>
        </div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl md:text-6xl xl:text-7xl text-cream mb-20"
        >
          Ce qu&rsquo;ils disent
        </motion.h2>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-5">
                {[1,2,3,4,5].map((s) => <Star key={s} size={12} fill="#C8962E" strokeWidth={0} />)}
              </div>

              {/* Quote */}
              <blockquote className="font-serif text-xl md:text-2xl text-cream leading-[1.55] mb-7">
                &ldquo;{r.text}&rdquo;
              </blockquote>

              {/* Attribution */}
              <div className="flex items-center gap-4 pt-6 border-t border-divider">
                <div className="w-8 h-8 bg-gold/10 border border-divider flex items-center justify-center text-gold font-serif text-sm font-bold shrink-0">
                  {r.name[0]}
                </div>
                <div>
                  <div className="text-cream text-sm font-semibold">{r.name}</div>
                  <div className="text-walnut text-xs">{r.role} · {r.time}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
