import { getSession } from 'next-auth/react'

async function getToken() {
  if (typeof window !== 'undefined') {
    const session = await getSession()
    return session?.accessToken || null
  }
  return null
}

export async function apiGet<T = any>(path: string): Promise<T> {
  const base = process.env.NEXT_PUBLIC_API_URL || ''
  const token = await getToken()
  const r = await fetch(`${base}${path}`, { cache: 'no-store', headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) } })
  const data = await r.json()
  return data as T
}

export async function apiPost<T = any>(path: string, body: any): Promise<T> {
  const base = process.env.NEXT_PUBLIC_API_URL || ''
  const token = await getToken()
  const r = await fetch(`${base}${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify(body) })
  const data = await r.json()
  return data as T
}

export async function apiPatch<T = any>(path: string, body: any): Promise<T> {
  const base = process.env.NEXT_PUBLIC_API_URL || ''
  const token = await getToken()
  const r = await fetch(`${base}${path}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify(body) })
  const data = await r.json()
  return data as T
}

export async function apiDelete<T = any>(path: string): Promise<T> {
  const base = process.env.NEXT_PUBLIC_API_URL || ''
  const token = await getToken()
  const r = await fetch(`${base}${path}`, { method: 'DELETE', headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) } })
  const data = await r.json()
  return data as T
}
