"use client"

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Badge } from "@/components/ui/Badge"
import { Spinner } from "@/components/ui/Spinner"
import { useToast } from "@/components/ui/use-toast"
import { User, Mail, Shield, Calendar, Lock } from 'lucide-react'
import { useGetCurrentUser, useUpdateUser } from '@/hooks/useUser'

export default function PerfilPage() {
  const { data: user, isLoading } = useGetCurrentUser()
  const updateUser = useUpdateUser()
  const { toast } = useToast()

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    password: '',
    confirmPassword: ''
  })

  // Inicializar formulario cuando carguen los datos del usuario
  useEffect(() => {
    if (user) {
      setFormData(prev => ({ ...prev, nombre: user.nombre }))
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password && formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error de validación",
        description: "Las contraseñas no coinciden",
      })
      return
    }

    if (!formData.nombre.trim()) {
      toast({
        variant: "destructive",
        title: "Error de validación",
        description: "El nombre no puede estar vacío",
      })
      return
    }

    try {
      const updateData: any = {}
      if (formData.nombre !== user?.nombre) {
        updateData.nombre = formData.nombre
      }
      if (formData.password) {
        updateData.password = formData.password
      }

      if (Object.keys(updateData).length === 0) {
        toast({
          title: "Nada que actualizar",
          description: "No has realizado cambios.",
        })
        setIsEditing(false)
        return
      }

      await updateUser.mutateAsync({
        id: user!.id,
        data: updateData
      })

      toast({
        title: "Perfil actualizado",
        description: "Tus cambios han sido guardados correctamente.",
      })

      setIsEditing(false)
      setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }))
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "No se pudo actualizar el perfil",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner className="h-8 w-8" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mi Perfil</h1>
        <p className="text-muted-foreground">Gestiona tu información personal</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
              <CardDescription>Actualiza tus datos de perfil</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre Completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="nombre"
                      className="pl-10"
                      value={formData.nombre}
                      onChange={handleChange}
                      disabled={!isEditing}
                      required
                      minLength={2}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      className="pl-10"
                      value={user?.email || ''}
                      disabled
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    El correo no puede ser modificado
                  </p>
                </div>

                {isEditing && (
                  <>
                    <div className="border-t pt-4 mt-4">
                      <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Cambiar Contraseña (Opcional)
                      </h3>

                      <div className="space-y-2">
                        <Label htmlFor="password">Nueva Contraseña</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Dejar vacío para no cambiar"
                          value={formData.password}
                          onChange={handleChange}
                          minLength={8}
                        />
                        <p className="text-xs text-muted-foreground">
                          Mínimo 8 caracteres
                        </p>
                      </div>

                      <div className="space-y-2 mt-3">
                        <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirmar nueva contraseña"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          minLength={8}
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="flex gap-2 pt-4 border-t">
                  {!isEditing ? (
                    <Button type="button" onClick={() => setIsEditing(true)}>
                      Editar Perfil
                    </Button>
                  ) : (
                    <>
                      <Button type="submit" disabled={updateUser.isPending}>
                        {updateUser.isPending && <Spinner className="mr-2 h-4 w-4" />}
                        Guardar Cambios
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsEditing(false)
                          setFormData({
                            nombre: user?.nombre || '',
                            password: '',
                            confirmPassword: ''
                          })
                        }}
                      >
                        Cancelar
                      </Button>
                    </>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Detalles de Cuenta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-muted-foreground mt-1" />
                <div>
                  <p className="text-sm font-medium">Rol</p>
                  <Badge variant="secondary" className="mt-1">
                    {user?.rol === 'CLIENTE' && 'Cliente'}
                    {user?.rol === 'ANALISTA' && 'Analista'}
                    {user?.rol === 'ADMIN' && 'Administrador'}
                  </Badge>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-4 border-t">
                <Calendar className="h-5 w-5 text-muted-foreground mt-1" />
                <div>
                  <p className="text-sm font-medium">Fecha de Registro</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('es-MX', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 'N/A'}
                  </p>
                </div>
              </div>

              {user?.organizacionId && (
                <div className="flex items-start gap-3 pt-4 border-t">
                  <User className="h-5 w-5 text-muted-foreground mt-1" />
                  <div>
                    <p className="text-sm font-medium">ID de Organización</p>
                    <p className="text-xs text-muted-foreground mt-1 break-all">
                      {user.organizacionId}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
