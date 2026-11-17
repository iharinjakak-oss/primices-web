import Image from 'next/image'
import Link from 'next/link'
import { UserIcon } from './icons'
import MobileMenu from './mobile-menu'

const items = [
  { href: '/about-us', label: 'À propos' },
  { href: '/coaching', label: 'Programmes' },
  { href: '/testimonials', label: 'Témoignages' },
  { href: '/privacy-policy', label: 'Confidentialité' },
  { href: '/blog', label: 'Blog' },
]

export default function SiteHeader() {
  return (
    <header className="relative bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/logo.svg" alt="" width={48} height={48} className="h-12 w-auto" />
          <span className="font-bold leading-tight tracking-widest">
            <span className="block text-lg text-[color:var(--site-gold)]">PRIMICES</span>
            <span className="block text-sm text-[color:var(--site-teal)]">INTERNATIONAL</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-gray-700 transition hover:text-[color:var(--site-teal)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/contact"
            className="rounded-full bg-[color:var(--site-teal)] px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Contact
          </Link>
          <Link
            href="/login"
            aria-label="Connexion"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition hover:border-[color:var(--site-teal)] hover:text-[color:var(--site-teal)]"
          >
            <UserIcon className="h-5 w-5" />
          </Link>
        </div>

        <MobileMenu
          items={[...items, { href: '/contact', label: 'Contact' }, { href: '/login', label: 'Connexion' }]}
        />
      </div>
    </header>
  )
}