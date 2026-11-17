import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon } from './icons'
import SocialLinks from './social-links'

const links = [
  { href: '/about-us', label: 'À propos' },
  { href: '/coaching', label: 'Coaching' },
  { href: '/testimonials', label: 'Témoignages' },
  { href: '/privacy-policy', label: 'Politique de confidentialité' },
  { href: '/blog', label: 'Blog' },
]

export default function SiteFooter() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 py-16 text-center">
        <Image
          src="/images/logo.svg"
          alt="Primices International"
          width={128}
          height={128}
          className="h-32 w-auto"
        />

        <h2 className="text-3xl font-bold uppercase tracking-wide md:text-5xl">
          Commencez votre entreprise
        </h2>

        <form
          action="/contact"
          method="get"
          className="flex w-full max-w-xl items-center gap-2 rounded-full bg-white p-2 pl-6 focus-within:ring-2 focus-within:ring-[color:var(--site-teal)]"
        >
          <label htmlFor="footer-email" className="sr-only">
            Votre email
          </label>
          <input
            id="footer-email"
            name="email"
            type="email"
            placeholder="Entrez votre email"
            className="min-w-0 flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-700 focus:outline-none"
          />
          <button
            type="submit"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Essayer maintenant
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </form>

        <div className="flex flex-col items-center gap-6 lg:flex-row">
          <SocialLinks />
          <nav aria-label="Pied de page">
            <ul className="flex flex-wrap justify-center gap-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block rounded-full border border-white/70 px-5 py-2.5 text-sm transition hover:bg-white hover:text-black"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="text-sm text-gray-400">© 2026 PRIMICES. Tous droits réservés</p>
      </div>
    </footer>
  )
}