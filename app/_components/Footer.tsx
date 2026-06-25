import Image from 'next/image'
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

function IconInstagram() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  )
}

function IconFacebook() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-espresso border-t border-divider">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="relative h-12 w-32 mb-6">
              <Image
                src="/logo.png"
                alt="Érudit Connect Lounge"
                fill
                sizes="128px"
                className="object-contain object-left"
              />
            </div>
            <p className="text-walnut text-sm leading-relaxed max-w-xs mb-7">
              Un espace pensé pour savourer, connecter et créer.
              Au cœur d&rsquo;Alger, votre havre de paix.
            </p>

            {/* Tagline */}
            <p className="font-serif text-gold/70 italic text-base mb-8">
              &ldquo;Savourer · Connecter · Créer&rdquo;
            </p>

            {/* Social */}
            <div className="flex gap-3">
              {[
                { href: 'https://instagram.com/erudit_connect_lounge', icon: IconInstagram, label: 'Instagram' },
                { href: 'https://facebook.com', icon: IconFacebook, label: 'Facebook' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-divider hover:border-gold/60 flex items-center justify-center text-walnut hover:text-gold transition-all duration-300 hover:bg-gold/5"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-cream text-[11px] font-semibold tracking-[0.25em] uppercase mb-6">
              Horaires
            </h3>
            <div className="flex items-start gap-3">
              <Clock size={13} className="text-gold mt-0.5 shrink-0" />
              <div className="text-sm space-y-1">
                <div className="text-cream">Samedi – Jeudi</div>
                <div className="text-gold font-semibold">08h00 – 18h00</div>
                <div className="text-walnut text-xs pt-1">Vendredi : Fermé</div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-cream text-[11px] font-semibold tracking-[0.25em] uppercase mb-6">
              Contact
            </h3>
            <ul className="space-y-3.5">
              {[
                { href: 'tel:0555959599', icon: Phone, label: '0555 95 95 99' },
                { href: 'mailto:coffeshoperudit@gmail.com', icon: Mail, label: 'coffeshoperudit@gmail.com' },
                {
                  href: 'https://maps.google.com/?q=36.7433,3.0406',
                  icon: MapPin,
                  label: 'Alger, Algérie',
                  external: true,
                },
              ].map(({ href, icon: Icon, label, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-3 text-walnut hover:text-gold text-sm transition-colors duration-300 group"
                  >
                    <Icon size={13} className="text-gold/60 group-hover:text-gold transition-colors shrink-0" />
                    <span className="truncate">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-divider">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-walnut/50 text-xs">
          <span>© 2025 Érudit Connect Lounge. Tous droits réservés.</span>
          <span>Alger, Algérie</span>
        </div>
      </div>
    </footer>
  )
}
