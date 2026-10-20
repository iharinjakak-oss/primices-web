'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function getToken() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  if (!token) {
    redirect('/login')
  }
  return token
}

function back(message: string): never {
  redirect('/dashboard/users?error=' + encodeURIComponent(message))
}

export async function createUser(formData: FormData) {
  const token = await getToken()

  const res = await fetch(`${process.env.API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      password: String(formData.get('password') ?? ''),
      role: String(formData.get('role') ?? 'user'),
    }),
    cache: 'no-store',
  })

  if (!res.ok) {
    const data = await res.json().catch(() => null)
    const firstError = data?.errors ? (Object.values(data.errors)[0] as string[])[0] : null
    back(firstError ?? data?.message ?? 'Création impossible.')
  }

  redirect('/dashboard/users')
}

export async function deleteUser(formData: FormData) {
  const token = await getToken()
  const id = String(formData.get('id') ?? '')

  const res = await fetch(`${process.env.API_URL}/users/${id}`, {
    method: 'DELETE',
    headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })

  if (!res.ok) {
    const data = await res.json().catch(() => null)
    back(data?.message ?? 'Suppression impossible.')
  }

  redirect('/dashboard/users')
}