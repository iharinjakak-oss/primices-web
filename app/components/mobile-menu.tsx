'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CloseIcon, MenuIcon } from './icons'

type Item = { href: string; label: string }

export default function MobileMenu({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={open}
        className="text-white"
      >
        {open ? <CloseIcon className="h-7 w-7" /> : <MenuIcon className="h-7 w-7" />}
      </button>

      {open && (
        <nav className="absolute left-0 right-0 top-full z-20 bg-[color:var(--site-brand)] px-6 py-4 shadow-lg">
          <ul className="space-y-3">
            {items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => setOpen(false)} className="block py-1 text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  )
}