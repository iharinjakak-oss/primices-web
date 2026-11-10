'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { describeError, NETWORK_ERROR } from '../lib/errors'

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

function post(path: string, body: unknown) {
  return fetch(`${process.env.API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store',
  })
}

function field(formData: FormData, name: string) {
  return String(formData.get(name) ?? '')
}

function fail(page: string, message: string): never {
  redirect(`${page}?error=${encodeURIComponent(message)}`)
}

export async function login(formData: FormData) {
  let res: Response
  try {
    res = await post('/login', {
      email: field(formData, 'email'),
      password: field(formData, 'password'),
    })
  } catch {
    fail('/login', NETWORK_ERROR)
  }

  if (!res.ok) {
    const data = await res.json().catch(() => null)
    fail('/login', describeError(res.status, data, 'Connexion impossible.'))
  }

  const data = await res.json()
  await saveToken(data.token)
  redirect('/dashboard')
}

export async function register(formData: FormData) {
  let res: Response
  try {
    res = await post('/register', {
      name: field(formData, 'name'),
      email: field(formData, 'email'),
      password: field(formData, 'password'),
      password_confirmation: field(formData, 'password_confirmation'),
    })
  } catch {
    fail('/register', NETWORK_ERROR)
  }

  if (!res.ok) {
    const data = await res.json().catch(() => null)
    fail('/register', describeError(res.status, data, 'Inscription impossible.'))
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