import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page introuvable',
}

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[color:var(--site-soft)] px-6 text-center text-[color:var(--site-brand)]">
      <p className="text-6xl font-bold">404</p>
      <h1 className="text-2xl font-semibold">Page introuvable</h1>
      <p className="max-w-md text-gray-600">
        La page que vous cherchez n’existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        className="rounded-md bg-[color:var(--site-brand)] px-6 py-3 font-medium text-white transition hover:bg-[color:var(--site-brand-hover)]"
      >
        Retour à l’accueil
      </Link>
    </main>
  )
}