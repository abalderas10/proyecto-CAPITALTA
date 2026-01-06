import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Obtener el body de la petición
    const body = await request.json()
    
    // Validar campos requeridos
    if (!body.email || !body.password || !body.nombre) {
      return NextResponse.json(
        { error: 'Email, password y nombre son requeridos' },
        { status: 400 }
      )
    }
    
    // Hacer la petición al backend real
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.capitalta.abdev.click'
    const response = await fetch(`${backendUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: body.email,
        password: body.password,
        nombre: body.nombre
      })
    })
    
    // Obtener la respuesta del backend
    const data = await response.json()
    
    // Si el backend retorna error, retornarlo con el mismo status code
    if (!response.ok) {
      return NextResponse.json(data, { status: response.status })
    }
    
    // Retornar la respuesta exitosa
    return NextResponse.json(data, { status: 200 })
    
  } catch (error: any) {
    console.error('Error en /api/register:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor', details: error.message },
      { status: 500 }
    )
  }
}
