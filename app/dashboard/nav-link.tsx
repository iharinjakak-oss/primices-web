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
      className={`block rounded-md px-3 py-2 text-sm font-medium transition ${
        active ? 'bg-[#314077] text-white' : 'text-white/80 hover:bg-[#314077]/60 hover:text-white'
      }`}
    >
      {children}
    </Link>
  )
}