'use client'

const WORDS = [
  'Savourer', 'Connecter', 'Créer', 'Alger', 'Érudit',
  'Coffee & Lounge', 'Jus Naturels', 'Brunch', 'Terrasse',
]

export default function Ticker() {
  const items = [...WORDS, ...WORDS]

  return (
    <div
      className="overflow-hidden select-none"
      style={{ background: '#36381F', padding: '17px 0' }}
      aria-hidden
    >
      <div className="animate-marquee flex w-max items-center">
        {items.map((word, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span
              className="font-serif italic"
              style={{ padding: '0 30px', fontSize: 'clamp(17px, 2.2vw, 22px)', color: '#EFE7D6' }}
            >
              {word}
            </span>
            <span style={{ color: '#BF6A3F', fontSize: '13px' }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
