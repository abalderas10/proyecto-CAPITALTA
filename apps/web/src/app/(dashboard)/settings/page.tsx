"use client"

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Spinner } from "@/components/ui/Spinner"
import { useToast } from "@/components/ui/use-toast"
import { Moon, Sun, Globe, Bell, Lock, Building, AlertCircle, Check } from 'lucide-react'
import { useGetCurrentUser } from '@/hooks/useUser'

interface PreferencesState {
  theme: 'light' | 'dark' | 'system'
  language: 'es' | 'en'
  emailNotifications: boolean
  pushNotifications: boolean
  alertNotifications: boolean
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const { data: session } = useSession()
  const { data: user, isLoading: userLoading } = useGetCurrentUser()
  const { toast } = useToast()

  const [preferences, setPreferences] = useState<PreferencesState>({
    theme: (theme as any) || 'system',
    language: 'es',
    emailNotifications: true,
    pushNotifications: false,
    alertNotifications: true,
  })

  const [isSaving, setIsSaving] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Cargar preferencias del localStorage
  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('userPreferences')
    if (saved) {
      try {
        setPreferences(JSON.parse(saved))
      } catch (e) {
        console.error('Error parsing preferences:', e)
      }
    }
  }, [])

  const savePreferences = async () => {
    setIsSaving(true)
    try {
      localStorage.setItem('userPreferences', JSON.stringify(preferences))
      if (preferences.theme !== theme) {
        setTheme(preferences.theme)
      }
      toast({
        title: "Preferencias guardadas",
        description: "Tus configuraciones han sido actualizadas.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron guardar las preferencias.",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (!mounted || userLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner className="h-8 w-8" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground">Personaliza tu experiencia en la aplicación</p>
      </div>

      <div className="space-y-6">
        {/* SECCIÓN 1: PREFERENCIAS DE APLICACIÓN */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="h-5 w-5" />
              Preferencias de Aplicación
            </CardTitle>
            <CardDescription>Personaliza cómo se ve y funciona la aplicación</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Tema */}
            <div className="border-b pb-6 last:border-0">
              <h3 className="text-sm font-semibold mb-3">Tema</h3>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setPreferences({ ...preferences, theme: 'light' })}
                  className={`p-4 rounded-lg border-2 transition ${
                    preferences.theme === 'light'
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Sun className="h-5 w-5 mx-auto mb-2" />
                  <p className="text-sm font-medium">Claro</p>
                </button>
                <button
                  onClick={() => setPreferences({ ...preferences, theme: 'dark' })}
                  className={`p-4 rounded-lg border-2 transition ${
                    preferences.theme === 'dark'
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Moon className="h-5 w-5 mx-auto mb-2" />
                  <p className="text-sm font-medium">Oscuro</p>
                </button>
                <button
                  onClick={() => setPreferences({ ...preferences, theme: 'system' })}
                  className={`p-4 rounded-lg border-2 transition ${
                    preferences.theme === 'system'
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Globe className="h-5 w-5 mx-auto mb-2" />
                  <p className="text-sm font-medium">Sistema</p>
                </button>
              </div>
            </div>

            {/* Idioma */}
            <div className="border-b pb-6 last:border-0">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Idioma
              </h3>
              <div className="space-y-2">
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                  <input
                    type="radio"
                    name="language"
                    value="es"
                    checked={preferences.language === 'es'}
                    onChange={(e) => setPreferences({ ...preferences, language: e.target.value as any })}
                    className="mr-3"
                  />
                  <span className="text-sm font-medium">Español</span>
                </label>
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                  <input
                    type="radio"
                    name="language"
                    value="en"
                    checked={preferences.language === 'en'}
                    onChange={(e) => setPreferences({ ...preferences, language: e.target.value as any })}
                    className="mr-3"
                  />
                  <span className="text-sm font-medium">English</span>
                </label>
              </div>
            </div>

            {/* Notificaciones */}
            <div>
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notificaciones
              </h3>
              <div className="space-y-3">
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                  <input
                    type="checkbox"
                    checked={preferences.emailNotifications}
                    onChange={(e) => setPreferences({ ...preferences, emailNotifications: e.target.checked })}
                    className="mr-3 h-4 w-4"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Notificaciones por Email</p>
                    <p className="text-xs text-muted-foreground">Recibe actualizaciones de tus solicitudes</p>
                  </div>
                </label>

                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition opacity-50 cursor-not-allowed">
                  <input
                    type="checkbox"
                    disabled
                    className="mr-3 h-4 w-4"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Notificaciones Push</p>
                    <p className="text-xs text-muted-foreground">Próximamente disponible</p>
                  </div>
                </label>

                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                  <input
                    type="checkbox"
                    checked={preferences.alertNotifications}
                    onChange={(e) => setPreferences({ ...preferences, alertNotifications: e.target.checked })}
                    className="mr-3 h-4 w-4"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Alertas Urgentes</p>
                    <p className="text-xs text-muted-foreground">Recibe alertas de cambios importantes</p>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t">
              <Button onClick={savePreferences} disabled={isSaving}>
                {isSaving && <Spinner className="mr-2 h-4 w-4" />}
                Guardar Preferencias
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* SECCIÓN 2: GESTIÓN DE ORGANIZACIÓN */}
        {user?.organizacionId && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Información de Organización
              </CardTitle>
              <CardDescription>Detalles de tu organización</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm text-blue-900">ID de Organización</p>
                    <p className="text-sm text-blue-800 mt-1 font-mono break-all">{user.organizacionId}</p>
                  </div>
                </div>
              </div>

              {user?.rol === 'ADMIN' && (
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 mt-4">
                  <p className="text-sm font-medium text-amber-900">
                    ⚙️ Como administrador, puedes gestionar la organización desde el panel de administración.
                  </p>
                </div>
              )}

              <div className="pt-4 border-t">
                <h3 className="text-sm font-semibold mb-3">Miembros</h3>
                <p className="text-sm text-muted-foreground">
                  La gestión de miembros de la organización estará disponible próximamente.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* SECCIÓN 3: SEGURIDAD */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Seguridad
            </CardTitle>
            <CardDescription>Controla la seguridad de tu cuenta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Cambio de Contraseña */}
            <div className="border-b pb-6 last:border-0">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold">Cambio de Contraseña</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Actualiza tu contraseña regularmente para mantener tu cuenta segura
                  </p>
                </div>
                <Button variant="outline" disabled className="opacity-75">
                  Cambiar
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                💡 Dirígete a <strong>Mi Perfil</strong> para cambiar tu contraseña
              </p>
            </div>

            {/* Autenticación de Dos Factores */}
            <div className="border-b pb-6 last:border-0">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold">Autenticación de Dos Factores (2FA)</h3>
                  <Badge variant="secondary" className="mt-2">Próximamente</Badge>
                </div>
                <Button variant="outline" disabled className="opacity-50">
                  Configurar
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Añade una capa extra de seguridad a tu cuenta
              </p>
            </div>

            {/* Sesiones Activas */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-sm font-semibold">Sesiones Activas</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Administra tus sesiones activas en diferentes dispositivos
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium">Navegador Actual</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Sesión activa • Hoy
                      </p>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <Check className="h-3 w-3 mr-1" />
                      Activo
                    </Badge>
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-3">
                ℹ️ La gestión avanzada de sesiones estará disponible próximamente
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
