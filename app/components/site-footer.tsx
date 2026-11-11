import Image from 'next/image'
import Link from 'next/link'

const links = [
  { href: '/about-us', label: 'À propos' },
  { href: '/coaching', label: 'Programmes' },
  { href: '/testimonials', label: 'Témoignages' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy-policy', label: 'Politique de confidentialité' },
  { href: '/legal-notice', label: 'Mentions légales' },
]

export default function SiteFooter() {
  return (
    <footer className="bg-[color:var(--site-brand)] text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-3">
        <div className="space-y-4">
          <span className="inline-block rounded-md bg-white p-1">
            <Image src="/images/logo.svg" alt="Primices International" width={48} height={48} className="h-12 w-auto" />
          </span>
          <p className="font-semibold">Commencez votre projet avec Primices</p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md bg-[color:var(--site-accent)] px-6 py-3 font-medium text-white transition hover:opacity-90"
          >
            Essayer maintenant
          </Link>
        </div>

        <nav className="md:col-span-2 md:justify-self-end">
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <p className="border-t border-white/20 py-4 text-center text-xs">© Primices International</p>
    </footer>
  )
}