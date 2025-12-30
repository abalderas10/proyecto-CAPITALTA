"use client"
export default function Page() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token')
    location.href = '/'
  }
  return null
}
