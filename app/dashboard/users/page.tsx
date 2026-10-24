import { Suspense } from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createUser } from '../../actions/users'
import FormError from '../../components/form-error'
import PasswordInput from '../../components/password-input'
import { getCurrentUser, getToken, roleLabels, type Role, type User } from '../../lib/session'
import DeleteButton from './delete-button'

export const instant = false

const badge: Record<Role, string> = {
  super_admin: 'bg-[#1A2240] text-white',
  admin: 'bg-blue-100 text-blue-800',
  user: 'bg-gray-100 text-gray-700',
}

const fieldClass =
  'block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-[#1A2240] focus:outline-none'

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const me = await getCurrentUser()

  if (me.role === 'user') {
    redirect('/dashboard')
  }

  const token = await getToken()
  const res = await fetch(`${process.env.API_URL}/users`, {
    headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })

  if (res.status === 401) {
    redirect('/login')
  }
  if (!res.ok) {
    redirect('/dashboard')
  }

  const users: User[] = await res.json()

  function canEdit(target: User) {
    return !(me.role === 'admin' && target.role !== 'user')
  }

  function canDelete(target: User) {
    if (target.id === me.id) return false
    if (me.role === 'admin' && target.role !== 'user') return false
    return true
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Gestion des utilisateurs</h1>
        <p className="text-sm text-gray-600">{users.length} compte(s) enregistré(s).</p>
      </div>

      <Suspense fallback={null}>
        <FormError searchParams={searchParams} />
      </Suspense>

      <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500">
                <th className="py-2 pr-4 font-medium">Nom</th>
                <th className="py-2 pr-4 font-medium">Email</th>
                <th className="py-2 pr-4 font-medium">Rôle</th>
                <th className="py-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-gray-100 last:border-0">
                  <td className="py-3 pr-4 font-medium">{u.name}</td>
                  <td className="py-3 pr-4">{u.email}</td>
                  <td className="py-3 pr-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${badge[u.role]}`}>
                      {roleLabels[u.role]}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-4">
                      {canEdit(u) && (
                        <Link
                          href={`/dashboard/users/${u.id}/edit`}
                          className="text-sm font-medium text-[#1A2240] hover:underline"
                        >
                          Modifier
                        </Link>
                      )}
                      {canDelete(u) && <DeleteButton id={u.id} />}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md">
        <h2 className="text-lg font-semibold">Créer un utilisateur</h2>

        <form action={createUser} className="mt-4 grid gap-4 md:grid-cols-2">
          <input name="name" placeholder="Nom" required className={fieldClass} />
          <input name="email" type="email" placeholder="Email" required className={fieldClass} />
          <PasswordInput id="new-password" name="password" placeholder="Mot de passe (8 caractères minimum)" />

          {me.role === 'super_admin' ? (
            <select name="role" defaultValue="user" className={fieldClass}>
              <option value="user">Utilisateur</option>
              <option value="admin">Administrateur</option>
              <option value="super_admin">Super administrateur</option>
            </select>
          ) : (
            <input type="hidden" name="role" value="user" />
          )}

          <div className="md:col-span-2">
            <button
              type="submit"
              className="rounded-md bg-[#1A2240] px-6 py-2 font-medium text-white transition hover:bg-[#314077]"
            >
              Créer
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}