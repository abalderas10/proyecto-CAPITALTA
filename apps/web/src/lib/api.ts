export async function apiGet(path: string) {
  const base = process.env.NEXT_PUBLIC_API_URL || ''
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  const r = await fetch(`${base}${path}`, { cache: 'no-store', headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) } })
  return r.json()
}

export async function apiPost(path: string, body: any) {
  const base = process.env.NEXT_PUBLIC_API_URL || ''
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  const r = await fetch(`${base}${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify(body) })
  return r.json()
}

export async function apiPatch(path: string, body: any) {
  const base = process.env.NEXT_PUBLIC_API_URL || ''
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  const r = await fetch(`${base}${path}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify(body) })
  return r.json()
}
