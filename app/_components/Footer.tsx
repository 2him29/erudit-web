export default function Footer() {
  return (
    <footer style={{ background: '#2E301B', color: '#CFC8B2', padding: 'clamp(54px, 8vh, 84px) 0 0' }}>
      <div className="mx-auto" style={{ maxWidth: '1200px', padding: '0 clamp(20px, 5vw, 64px)' }}>
        <div
          className="grid"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            paddingBottom: 'clamp(40px, 6vh, 60px)',
          }}
        >
          {/* Brand */}
          <div style={{ gridColumn: '1 / -1', maxWidth: '360px' }}>
            <div
              className="font-serif"
              style={{ fontSize: '30px', letterSpacing: '.2em', color: '#F2EBDD', marginBottom: '18px' }}
            >
              ÉRUDIT
            </div>
            <p style={{ fontSize: '14.5px', lineHeight: '1.7', color: '#A8A189', marginBottom: '18px' }}>
              Un espace pensé pour savourer, se connecter et créer.
              Au cœur d&rsquo;Alger, votre havre de paix.
            </p>
            <p
              className="font-serif italic"
              style={{ fontSize: '17px', color: '#BF6A3F', marginBottom: '22px' }}
            >
              Savourer · Connecter · Créer
            </p>
            <div className="flex" style={{ gap: '12px' }}>
              {[
                { href: 'https://instagram.com/erudit_connect_lounge', label: 'IG' },
                { href: 'https://facebook.com', label: 'FB' },
              ].map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono flex items-center justify-center transition-colors hover:bg-[rgba(207,200,178,.1)]"
                  style={{
                    width: '42px', height: '42px',
                    borderRadius: '100px',
                    border: '1px solid rgba(207,200,178,.3)',
                    color: '#CFC8B2',
                    textDecoration: 'none',
                    fontSize: '11px',
                    letterSpacing: '.05em',
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Horaires */}
          <div>
            <h3
              className="font-mono uppercase"
              style={{ fontSize: '11px', letterSpacing: '.22em', color: '#F2EBDD', marginBottom: '18px' }}
            >
              Horaires
            </h3>
            <div style={{ fontSize: '14px', lineHeight: '1.9', color: '#A8A189' }}>
              <div style={{ color: '#CFC8B2' }}>Samedi – Jeudi</div>
              <div style={{ color: '#BF6A3F' }}>08h00 – 18h00</div>
              <div style={{ marginTop: '6px' }}>Vendredi : fermé</div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="font-mono uppercase"
              style={{ fontSize: '11px', letterSpacing: '.22em', color: '#F2EBDD', marginBottom: '18px' }}
            >
              Contact
            </h3>
            <div className="flex flex-col" style={{ gap: '10px', fontSize: '14px' }}>
              {[
                { href: 'tel:0555959599', label: '0555 95 95 99' },
                { href: 'mailto:coffeshoperudit@gmail.com', label: 'coffeshoperudit@gmail.com' },
                { href: 'https://maps.google.com/?q=36.7433,3.0406', label: 'Alger, Algérie', external: true },
              ].map(({ href, label, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className="transition-colors hover:text-[#F2EBDD]"
                  style={{ color: '#A8A189', textDecoration: 'none' }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-wrap items-center justify-between font-mono"
          style={{
            borderTop: '1px solid rgba(207,200,178,.16)',
            padding: '22px 0',
            gap: '8px',
            fontSize: '11px',
            letterSpacing: '.08em',
            color: '#7E785F',
          }}
        >
          <span>© 2026 Érudit Coffee Shop · Tous droits réservés</span>
          <span>Alger · Algérie</span>
        </div>
      </div>
    </footer>
  )
}
