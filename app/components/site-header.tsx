import Image from 'next/image'
import Link from 'next/link'
import MobileMenu from './mobile-menu'

const items = [
  { href: '/about-us', label: 'À propos' },
  { href: '/coaching', label: 'Programmes' },
  { href: '/testimonials', label: 'Témoignages' },
  { href: '/faq', label: 'FAQ' },
]

export default function SiteHeader() {
  return (
    <header className="relative bg-[color:var(--site-brand)] text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="rounded-md bg-white p-1">
            <Image src="/images/logo.svg" alt="" width={40} height={40} className="h-10 w-auto" />
          </span>
          <span className="text-sm font-bold leading-tight tracking-wide">
            PRIMICES
            <br />
            INTERNATIONAL
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm hover:underline">
              {item.label}
            </Link>
          ))}
          <Link href="/login" className="text-sm hover:underline">
            Connexion
          </Link>
          <Link
            href="/contact"
            className="rounded-md border border-white px-4 py-2 text-sm font-medium transition hover:bg-white hover:text-[color:var(--site-brand)]"
          >
            Contact
          </Link>
        </nav>

        <MobileMenu items={[...items, { href: '/login', label: 'Connexion' }, { href: '/contact', label: 'Contact' }]} />
      </div>
    </header>
  )
}