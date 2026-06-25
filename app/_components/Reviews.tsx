'use client'

import { motion } from 'framer-motion'

const REVIEWS = [
  {
    name: 'Neggazi Alaasirine',
    role: 'Local Guide · 14 avis',
    time: 'il y a 3 mois',
    text: "Très belle expérience ! L'ambiance était magnifique. Notre serveur Rachid était super sympathique et accueillant. Je reviendrai avec grand plaisir.",
  },
  {
    name: 'Maria Sahoui',
    role: '2 avis · 8 photos',
    time: 'il y a 6 mois',
    text: "Je ne vais jamais au même café plus de 2 fois, mais pour Érudit je suis allée près de 5 fois. La nourriture est super bonne, les jus naturels sont excellents.",
  },
  {
    name: 'DANYA',
    role: 'Local Guide · 7 avis',
    time: 'il y a 1 mois',
    text: "Un havre de paix au milieu de la ville avec un décor raffiné et apaisant. Le petit + : une famille de tortues côté terrasse — un charme inattendu.",
  },
  {
    name: 'Damiche Sofiane',
    role: '6 avis · 5 photos',
    time: 'il y a 4 mois',
    text: "Excellent brunch. La qualité des ingrédients est parfaite. L'endroit est très mignon. Mention très spéciale au service au top — merci à Naser.",
  },
]

export default function Reviews() {
  return (
    <section
      id="avis"
      className="bg-parchment scroll-mt-20"
      style={{ padding: 'clamp(72px, 12vh, 150px) 0' }}
    >
      <div className="mx-auto" style={{ maxWidth: '1180px', padding: '0 clamp(20px, 5vw, 64px)' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
          className="flex flex-wrap items-end justify-between"
          style={{ gap: '24px', marginBottom: 'clamp(34px, 5vh, 56px)' }}
        >
          <div>
            <p
              className="flex items-center font-mono uppercase text-terra"
              style={{ fontSize: '12px', letterSpacing: '.28em', gap: '14px', marginBottom: '22px' }}
            >
              <span className="inline-block h-px bg-terra" style={{ width: '30px' }} />
              Témoignages
            </p>
            <h2
              className="font-serif font-normal text-olive leading-none"
              style={{ fontSize: 'clamp(40px, 6vw, 76px)' }}
            >
              Ce qu&rsquo;ils disent
            </h2>
          </div>
          <div className="flex items-center" style={{ gap: '10px' }}>
            <span className="text-terra" style={{ fontSize: '16px', letterSpacing: '3px' }}>★★★★★</span>
            <span className="font-mono text-muted" style={{ fontSize: '12px' }}>4.9 · Google</span>
          </div>
        </motion.div>

        {/* Cards */}
        <div
          className="grid"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(18px, 2vw, 26px)' }}
        >
          {REVIEWS.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
              className="bg-card"
              style={{ borderRadius: '20px', padding: '32px 30px', border: '1px solid rgba(54,56,31,.08)' }}
            >
              <span className="text-terra" style={{ fontSize: '14px', letterSpacing: '2px' }}>★★★★★</span>

              <blockquote
                className="font-serif font-light text-olive leading-[1.5]"
                style={{ fontSize: 'clamp(18px, 1.9vw, 21px)', margin: '18px 0 24px' }}
              >
                &ldquo;{r.text}&rdquo;
              </blockquote>

              <div
                className="flex items-center"
                style={{ gap: '14px', paddingTop: '20px', borderTop: '1px solid rgba(54,56,31,.12)' }}
              >
                <span
                  className="flex items-center justify-center shrink-0 font-serif"
                  style={{
                    width: '40px', height: '40px',
                    borderRadius: '100px',
                    background: '#36381F',
                    color: '#EFE7D6',
                    fontSize: '17px',
                  }}
                >
                  {r.name[0]}
                </span>
                <div>
                  <div className="font-semibold text-olive" style={{ fontSize: '14px' }}>{r.name}</div>
                  <div className="text-quiet" style={{ fontSize: '12px', marginTop: '2px' }}>
                    {r.role} · {r.time}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
