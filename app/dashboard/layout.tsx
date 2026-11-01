import Image from 'next/image'
import { logout } from '../actions/auth'
import { getCurrentUser, roleLabels } from '../lib/session'
import NavLink from './nav-link'

export const instant = false

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()
  const isAdmin = user.role !== 'user'

  return (
    <div className="min-h-screen bg-[color:var(--dash-bg)] text-[color:var(--dash-text)] md:flex">
      <aside className="flex flex-col gap-4 border-b border-gray-200 bg-white p-4 md:min-h-screen md:w-64 md:shrink-0 md:gap-8 md:border-b-0 md:border-r md:p-6">
        <div className="flex items-center gap-3">
          <Image src="/images/logo.svg" alt="" width={40} height={40} className="h-10 w-auto" />
          <span className="text-sm font-bold leading-tight">
            PRIMICES
            <br />
            INTERNATIONAL
          </span>
        </div>

        <nav className="flex gap-2 md:flex-1 md:flex-col">
          <NavLink href="/dashboard" exact>
            Tableau de bord
          </NavLink>
          {isAdmin && <NavLink href="/dashboard/users">Utilisateurs</NavLink>}
        </nav>

        <form action={logout}>
          <button
            type="submit"
            className="w-full rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-[color:var(--dash-muted)] transition hover:border-[color:var(--dash-danger)] hover:text-[color:var(--dash-danger)]"
          >
            Se déconnecter
          </button>
        </form>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-end gap-3 bg-white px-4 py-3 shadow-sm md:px-8">
          <div className="text-right">
            <p className="text-sm font-semibold">{user.name}</p>
            <p className="text-xs text-[color:var(--dash-muted)]">{roleLabels[user.role]}</p>
          </div>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--dash-primary-light)] text-sm font-semibold text-[color:var(--dash-primary)]">
            {user.name.charAt(0).toUpperCase()}
          </span>
        </header>

        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  )
}