'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function saveToken(token: string) {
  const cookieStore = await cookies()

  cookieStore.set('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === 'production',
  })
}

function firstMessage(data: unknown, fallback: string): string {
  const body = data as { message?: string; errors?: Record<string, string[]> } | null

  if (body?.errors) {
    const first = Object.values(body.errors)[0]?.[0]
    if (first) {
      return first
    }
  }

  return body?.message ?? fallback
}

function fail(page: string, message: string): never {
  redirect(`${page}?error=${encodeURIComponent(message)}`)
}

export async function login(formData: FormData) {
  const email = String(formData.get('email') ?? '')
  const password = String(formData.get('password') ?? '')

  let res: Response
  try {
    res = await fetch(`${process.env.API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ email, password }),
      cache: 'no-store',
    })
  } catch {
    fail('/login', 'Serveur injoignable')
  }

  if (!res.ok) {
    const data = await res.json().catch(() => null)
    fail('/login', firstMessage(data, 'Connexion impossible.'))
  }

  const data = await res.json()
  await saveToken(data.token)
  redirect('/dashboard')
}

export async function register(formData: FormData) {
  let res: Response
  try {
    res = await fetch(`${process.env.API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: String(formData.get('name') ?? ''),
        email: String(formData.get('email') ?? ''),
        password: String(formData.get('password') ?? ''),
        password_confirmation: String(formData.get('password_confirmation') ?? ''),
      }),
      cache: 'no-store',
    })
  } catch {
    fail('/register', 'Serveur injoignable')
  }

  if (!res.ok) {
    const data = await res.json().catch(() => null)
    fail('/register', firstMessage(data, 'Inscription impossible.'))
  }

  const data = await res.json()
  await saveToken(data.token)
  redirect('/dashboard')
}

export async function logout() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (token) {
    try {
      await fetch(`${process.env.API_URL}/logout`, {
        method: 'POST',
        headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
        cache: 'no-store',
      })
    } catch {
      // si Laravel ne répond pas, on supprime quand même le cookie
    }
  }

  cookieStore.delete('token')
  redirect('/login')
}