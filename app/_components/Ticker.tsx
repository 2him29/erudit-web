'use client'

const WORDS = [
  'Savourer', 'Connecter', 'Créer', 'Alger', 'Érudit',
  'Coffee & Lounge', 'Jus Naturels', 'Brunch', 'Terrasse',
]

function TickerRow({ reverse = false }: { reverse?: boolean }) {
  // 4 copies ensures full coverage on any screen width
  const content = Array(4).fill(WORDS).flat()

  return (
    <div className="overflow-hidden py-3" aria-hidden>
      <div
        className={reverse ? 'animate-ticker-right flex w-max' : 'animate-ticker flex w-max'}
      >
        {content.map((word, i) => (
          <span
            key={i}
            className="whitespace-nowrap text-espresso text-[10px] font-bold tracking-[0.32em] uppercase px-6"
          >
            {word}
            <span className="ml-6 opacity-50">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Ticker() {
  return (
    <div className="bg-gold border-y border-honey/20 select-none overflow-hidden">
      <TickerRow />
    </div>
  )
}
