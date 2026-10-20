import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createUser, deleteUser } from '../../actions/users'

type User = { id: number; name: string; email: string; role: string }

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  if (!token) {
    redirect('/login')
  }
  const headers = { Accept: 'application/json', Authorization: `Bearer ${token}` }

  const meRes = await fetch(`${process.env.API_URL}/me`, { headers, cache: 'no-store' })
  if (!meRes.ok) {
    redirect('/login')
  }
  const me: User = await meRes.json()
  if (me.role === 'user') {
    redirect('/dashboard')
  }

  const usersRes = await fetch(`${process.env.API_URL}/users`, { headers, cache: 'no-store' })
  if (!usersRes.ok) {
    redirect('/dashboard')
  }
  const users: User[] = await usersRes.json()

  function canDelete(target: User) {
    if (target.id === me.id) return false
    if (me.role === 'admin' && target.role !== 'user') return false
    return true
  }

  return (
    <main className="min-h-screen bg-zinc-100 p-8 text-black">
      <div className="mx-auto max-w-3xl space-y-6 rounded bg-white p-6 shadow">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Gestion des utilisateurs</h1>
          <Link href="/dashboard" className="text-sm underline">Retour</Link>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2">Nom</th>
              <th className="py-2">Email</th>
              <th className="py-2">Rôle</th>
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b">
                <td className="py-2">{u.name}</td>
                <td className="py-2">{u.email}</td>
                <td className="py-2">{u.role}</td>
                <td className="py-2">
                  {canDelete(u) && (
                    <form action={deleteUser}>
                      <input type="hidden" name="id" value={u.id} />
                      <button type="submit" className="text-red-600 underline">Supprimer</button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <form action={createUser} className="space-y-3">
          <h2 className="text-lg font-semibold">Créer un utilisateur</h2>
          <input name="name" placeholder="Nom" required className="w-full rounded border border-zinc-300 px-3 py-2" />
          <input name="email" type="email" placeholder="Email" required className="w-full rounded border border-zinc-300 px-3 py-2" />
          <input name="password" type="password" placeholder="Mot de passe (8 caractères minimum)" required className="w-full rounded border border-zinc-300 px-3 py-2" />

          {me.role === 'super_admin' ? (
            <select name="role" defaultValue="user" className="w-full rounded border border-zinc-300 px-3 py-2">
              <option value="user">user</option>
              <option value="admin">admin</option>
              <option value="super_admin">super_admin</option>
            </select>
          ) : (
            <input type="hidden" name="role" value="user" />
          )}

          <button type="submit" className="rounded bg-black px-4 py-2 text-white">Créer</button>
        </form>
      </div>
    </main>
  )
}