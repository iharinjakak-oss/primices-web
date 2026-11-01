'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavLink({
  href,
  exact = false,
  children,
}: {
  href: string
  exact?: boolean
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const active = exact ? pathname === href : pathname.startsWith(href)

  return (
    <Link
      href={href}
      className={`block rounded-lg px-4 py-2.5 text-sm font-medium transition ${
        active
          ? 'bg-[color:var(--dash-primary)] text-white shadow-sm'
          : 'text-[color:var(--dash-muted)] hover:bg-[color:var(--dash-primary-light)] hover:text-[color:var(--dash-primary)]'
      }`}
    >
      {children}
    </Link>
  )
}