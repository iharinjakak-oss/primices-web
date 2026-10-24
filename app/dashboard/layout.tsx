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
    <div className="min-h-screen bg-gray-100 text-[#1A2240] md:flex">
      <aside className="flex flex-col gap-4 bg-[#1A2240] p-4 text-white md:min-h-screen md:w-64 md:shrink-0 md:gap-8 md:p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-white p-1.5">
            <Image src="/images/logo.svg" alt="" width={40} height={40} className="h-10 w-auto" />
          </div>
          <span className="text-sm font-semibold leading-tight">
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

        <div className="space-y-3 border-t border-white/20 pt-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#314077] text-sm font-semibold">
              {user.name.charAt(0).toUpperCase()}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{user.name}</p>
              <p className="truncate text-xs text-white/70">{roleLabels[user.role]}</p>
            </div>
          </div>

          <form action={logout}>
            <button
              type="submit"
              className="w-full rounded-md border border-white/30 py-2 text-sm font-medium transition hover:bg-white hover:text-[#1A2240]"
            >
              Se déconnecter
            </button>
          </form>
        </div>
      </aside>

      <main className="min-w-0 flex-1 p-4 md:p-8">{children}</main>
    </div>
  )
}