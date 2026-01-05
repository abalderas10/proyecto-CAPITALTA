# 📊 Dashboard de Capitalta - Explicación Completa

## 🎯 Resumen General

El dashboard de Capitalta es una **interfaz administrativa** construida con Next.js 14, diseñada para que analistas y administradores gestionen solicitudes de crédito. Utiliza un **sistema de roles (RBAC)** que controla qué puede ver y hacer cada usuario.

---

## 🏗️ Arquitectura del Dashboard

```
┌─────────────────────────────────────────────────┐
│         LAYOUT DEL DASHBOARD                    │
│  ┌──────────────┬──────────────────────────┐   │
│  │              │                          │   │
│  │   SIDEBAR    │    MAIN CONTENT         │   │
│  │              │                          │   │
│  │  • Dashboard │    ┌──────────────┐     │   │
│  │  • Solicitud │    │  Dashboard   │     │   │
│  │  • Perfil    │    │   (Gráficas) │     │   │
│  │  • Settings  │    └──────────────┘     │   │
│  │              │                          │   │
│  │              │    ┌──────────────┐     │   │
│  │              │    │ Solicitudes  │     │   │
│  │              │    │   (Tabla)    │     │   │
│  │              │    └──────────────┘     │   │
│  └──────────────┴──────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

---

## 🚪 Sistema de Autenticación y Roles

### 1. Flujo de Autenticación

```typescript
// 1. Usuario accede a /dashboard
// 2. Layout verifica sesión (NextAuth)
const session = await getServerSession(authOptions)

// 3. Si NO hay sesión → Redirect a /login
if (!session) {
  redirect('/login')
}

// 4. Si hay sesión → Verifica roles permitidos
<RequireAuth allowedRoles={["ANALISTA", "ADMIN"]}>
  {/* Contenido del dashboard */}
</RequireAuth>
```

### 2. Componente RequireAuth

**Ubicación**: `src/components/RequireAuth.tsx`

Este componente es el **guardián del dashboard**. Controla quién puede acceder.

```typescript
export function RequireAuth({
  children,
  allowedRoles
}: {
  children: React.ReactNode
  allowedRoles?: string[]
}) {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Si está cargando → Mostrar spinner
  if (status === 'loading') {
    return <Spinner />
  }

  // Si no está autenticado → Redirect a login
  if (status === 'unauthenticated') {
    router.push('/login')
    return null
  }

  // Si está autenticado pero no tiene el rol correcto
  if (allowedRoles && !allowedRoles.includes(session.user.rol)) {
    return (
      <div>
        <h1>Acceso Denegado</h1>
        <p>No tienes permisos suficientes</p>
      </div>
    )
  }

  // Todo OK → Renderizar contenido
  return <>{children}</>
}
```

**Ejemplo de uso**:
```tsx
// Solo ANALISTAS y ADMINS pueden ver esto
<RequireAuth allowedRoles={["ANALISTA", "ADMIN"]}>
  <Dashboard />
</RequireAuth>

// Solo ADMINS pueden ver esto
<RequireAuth allowedRoles={["ADMIN"]}>
  <GestionUsuarios />
</RequireAuth>
```

---

## 📂 Estructura de Archivos del Dashboard

```
apps/web/src/app/(dashboard)/
├── layout.tsx                    # Layout principal con sidebar
├── dashboard/
│   ├── page.tsx                  # Página principal del dashboard
│   ├── solicitudes/
│   │   ├── page.tsx              # Lista de solicitudes
│   │   ├── columns.tsx           # Definición de columnas de tabla
│   │   └── [id]/
│   │       └── page.tsx          # Detalle de solicitud
│   ├── perfil/
│   │   └── page.tsx              # Perfil del usuario
│   └── settings/
│       └── page.tsx              # Configuración
└── solicitudes/
    ├── page.tsx                  # Vista alternativa de solicitudes
    └── [id]/
        └── page.tsx              # Detalle alternativo
```

---

## 🎨 Componentes del Dashboard

### 1. Layout Principal

**Archivo**: `(dashboard)/layout.tsx`

```typescript
export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions)

  // Redirect si no hay sesión
  if (!session) {
    redirect('/login')
  }

  // Definir items del sidebar
  const sidebarItems = [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "Solicitudes", href: "/dashboard/solicitudes", icon: FileText },
    { title: "Perfil", href: "/dashboard/perfil", icon: User },
    { title: "Configuración", href: "/dashboard/settings", icon: Settings },
  ]

  return (
    <RequireAuth allowedRoles={["ANALISTA", "ADMIN"]}>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar items={sidebarItems} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header con nombre y rol del usuario */}
          <header>
            <h1>Capitalta Admin</h1>
            <div>
              <p>{session.user?.name}</p>
              <p>{session.user?.rol}</p>
              <LogoutButton />
            </div>
          </header>

          {/* Contenido dinámico */}
          <main>
            {children}
          </main>
        </div>
      </div>
    </RequireAuth>
  )
}
```

**Características**:
- ✅ Verifica autenticación en el servidor (SSR)
- ✅ Muestra nombre y rol del usuario
- ✅ Sidebar con navegación
- ✅ Header con botón de logout
- ✅ Protección con RequireAuth

---

### 2. Página Principal del Dashboard

**Archivo**: `dashboard/page.tsx`

Esta es la página que ven ANALISTAS y ADMINS cuando acceden.

#### Secciones del Dashboard:

##### A) Tarjetas de Estadísticas (KPIs)

```typescript
const stats = [
  {
    title: "Solicitudes Totales",
    value: "156",
    icon: FileText,
    color: "text-blue-500"
  },
  {
    title: "Monto Total",
    value: "$15.2M",
    icon: DollarSign,
    color: "text-green-500"
  },
  {
    title: "Tasa Aprobación",
    value: "68%",
    icon: TrendingUp,
    color: "text-purple-500"
  },
  {
    title: "En Revisión",
    value: "12",
    icon: AlertCircle,
    color: "text-red-500"
  },
]
```

**Visualización**:
```
┌──────────────────┬──────────────────┬──────────────────┬──────────────────┐
│ Solicitudes      │ Monto Total      │ Tasa Aprobación  │ En Revisión      │
│ Totales          │                  │                  │                  │
│                  │                  │                  │                  │
│   📄  156        │   💰  $15.2M     │   📈  68%        │   ⚠️  12         │
│                  │                  │                  │                  │
│ Totales          │ En pipeline      │ Histórico        │ Requieren        │
│ registradas      │                  │                  │ atención         │
└──────────────────┴──────────────────┴──────────────────┴──────────────────┘
```

##### B) Gráfica de Barras: Monto por Producto

```typescript
// Calcula el monto total por tipo de producto
const productMap = solicitudes.reduce((acc, curr) => {
  const prod = curr.producto || 'Otro';
  acc[prod] = (acc[prod] || 0) + Number(curr.monto);
  return acc;
}, {})

// Resultado ejemplo:
{
  "Crédito Constructora": 5000000,
  "Crédito PYME": 3000000,
  "Crédito Personal": 1500000
}
```

**Visualización**:
```
Monto por Producto
┌─────────────────────────────────┐
│                            $5M  ▮│
│                                  │
│                    $3M      ▮    │
│                                  │
│            $1.5M   ▮             │
│                                  │
└─────────────────────────────────┘
  Constructora  PYME  Personal
```

##### C) Gráfica de Pastel: Estado de Solicitudes

```typescript
// Cuenta solicitudes por estado
const statusMap = {
  'PENDIENTE': 45,
  'REVISION': 32,
  'APROBADO': 68,
  'RECHAZADO': 11
}
```

**Visualización**:
```
Estado de Solicitudes
       ╭─────────╮
      ╱ PENDIENTE╲
     ╱ 45 (29%)   ╲
    ╱──────────────╲
   │                │
   │   APROBADO    │
   │   68 (43%)    │
    ╲──────────────╱
     ╲  REVISION  ╱
      ╲ 32 (20%) ╱
       ╰─────────╯
```

##### D) Actividad Reciente

Lista de las últimas 5 solicitudes creadas:

```typescript
const recentActivity = [
  {
    title: "Nueva solicitud: Crédito Constructora",
    desc: "Constructora ABC - $500,000.00",
    time: "hace 2 horas",
    urgent: true  // Si está en REVISION
  },
  // ...
]
```

**Visualización**:
```
Actividad Reciente
┌──────────────────────────────────────────┐
│ 🔔 Nueva solicitud: Crédito Constructora │
│    Constructora ABC - $500,000.00        │
│    hace 2 horas                          │
├──────────────────────────────────────────┤
│ 🔔 Nueva solicitud: Crédito PYME        │
│    PYME XYZ - $200,000.00               │
│    hace 5 horas                          │
└──────────────────────────────────────────┘
```

---

### 3. Lista de Solicitudes

**Archivo**: `dashboard/solicitudes/page.tsx`

Esta página muestra una **tabla completa** de todas las solicitudes.

```typescript
export default function SolicitudesPage() {
  const [page, setPage] = useState(1)

  // Hook para obtener solicitudes del API
  const { data, isLoading, isError } = useGetSolicitudes({
    page,
    pageSize: 10
  })

  if (isLoading) return <Spinner />
  if (isError) return <div>Error al cargar</div>

  return (
    <div>
      <h1>Solicitudes</h1>
      <DataTable
        columns={columns}
        data={data?.items || []}
        searchKey="cliente"
      />
    </div>
  )
}
```

#### Columnas de la Tabla

**Archivo**: `dashboard/solicitudes/columns.tsx`

```typescript
export const columns: ColumnDef<Solicitud>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "cliente",
    header: "Cliente",
    // Con ordenamiento
  },
  {
    accessorKey: "producto",
    header: "Producto",
  },
  {
    accessorKey: "monto",
    header: "Monto",
    cell: ({ row }) => {
      // Formatea como moneda mexicana
      const formatted = new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
      }).format(row.getValue("monto"))

      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.getValue("status")

      // Badge con colores según estado
      return <Badge variant={getVariant(status)}>{status}</Badge>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Button asChild>
        <Link href={`/dashboard/solicitudes/${row.original.id}`}>
          Ver Detalle
        </Link>
      </Button>
    ),
  },
]
```

**Visualización de la Tabla**:

```
┌──────────┬─────────────────┬────────────────┬──────────────┬─────────────┬────────────┬─────────┐
│ ID       │ Cliente         │ Producto       │ Monto        │ Estado      │ Fecha      │ Acción  │
├──────────┼─────────────────┼────────────────┼──────────────┼─────────────┼────────────┼─────────┤
│ cmk1...  │ Constructor ABC │ Crédito Const. │ $500,000.00  │ 🟡 REVISION │ 05/01/2026 │ Ver >>> │
├──────────┼─────────────────┼────────────────┼──────────────┼─────────────┼────────────┼─────────┤
│ cmk2...  │ PYME XYZ        │ Crédito PYME   │ $200,000.00  │ ✅ APROBADO │ 04/01/2026 │ Ver >>> │
├──────────┼─────────────────┼────────────────┼──────────────┼─────────────┼────────────┼─────────┤
│ cmk3...  │ Juan Pérez      │ Crédito Pers.  │ $50,000.00   │ ⏳ PENDIENTE│ 03/01/2026 │ Ver >>> │
└──────────┴─────────────────┴────────────────┴──────────────┴─────────────┴────────────┴─────────┘

                              Mostrando 1-10 de 156 registros
                              [ < ] [ 1 ] [ 2 ] [ 3 ] ... [ 16 ] [ > ]
```

**Características**:
- ✅ Paginación (10 por página)
- ✅ Búsqueda por cliente
- ✅ Ordenamiento por columnas
- ✅ Formato de moneda automático
- ✅ Badges de colores por estado
- ✅ Link directo a detalle

---

## 🔐 Gestión de Roles en el Dashboard

### Configuración Actual

**En el Layout** (`layout.tsx` línea 30):
```typescript
<RequireAuth allowedRoles={["ANALISTA", "ADMIN"]}>
```

Esto significa que **SOLO** usuarios con rol `ANALISTA` o `ADMIN` pueden acceder al dashboard.

### ¿Qué Ve Cada Rol?

#### 🔵 CLIENTE

**Acceso al Dashboard**: ❌ **NO TIENE ACCESO**

Si un CLIENTE intenta acceder a `/dashboard`, verá:
```
┌─────────────────────────────────┐
│     🚫 Acceso Denegado          │
│                                 │
│  No tienes permisos suficientes │
│  para acceder a esta página.    │
│                                 │
│     [ Volver al Inicio ]        │
└─────────────────────────────────┘
```

**Lo que SÍ puede hacer un CLIENTE**:
- Ver sus propias solicitudes vía API
- Crear nuevas solicitudes
- Subir documentos
- Ver estado de sus solicitudes

**Pero NO en el dashboard administrativo**.

---

#### 🟢 ANALISTA

**Acceso al Dashboard**: ✅ **COMPLETO**

**Lo que ve en el Dashboard**:

1. **Página Principal** (`/dashboard`)
   - ✅ Estadísticas generales
   - ✅ Gráficas de monto por producto
   - ✅ Gráficas de estados
   - ✅ Actividad reciente

2. **Lista de Solicitudes** (`/dashboard/solicitudes`)
   - ✅ **VE TODAS LAS SOLICITUDES** (de todos los clientes)
   - ✅ Puede filtrar y buscar
   - ✅ Puede ordenar por columnas

3. **Detalle de Solicitud** (`/dashboard/solicitudes/:id`)
   - ✅ Ver todos los detalles
   - ✅ Ver documentos adjuntos
   - ✅ Ver garantías
   - ✅ Ver historial de eventos
   - ✅ **Cambiar estado** (EN_REVISION → APROBADA/RECHAZADA)
   - ✅ **Agregar notas**

4. **Limitaciones**:
   - ❌ NO puede gestionar usuarios
   - ❌ NO puede ver lista de todos los usuarios
   - ❌ NO puede eliminar usuarios

**Sidebar del Analista**:
```
┌─────────────────────┐
│ Menu                │
│                     │
│ 📊 Dashboard        │
│ 📄 Solicitudes      │
│ 👤 Perfil           │
│ ⚙️  Configuración   │
│                     │
└─────────────────────┘
```

---

#### 🔴 ADMIN

**Acceso al Dashboard**: ✅ **COMPLETO + GESTIÓN DE USUARIOS**

**Todo lo que puede ANALISTA +**:

5. **Gestión de Usuarios** (futuro)
   - ✅ Ver lista de todos los usuarios
   - ✅ Crear nuevos usuarios
   - ✅ Editar usuarios
   - ✅ Eliminar usuarios (soft delete)
   - ✅ Cambiar roles

6. **Configuración Avanzada** (futuro)
   - ✅ Configurar parámetros del sistema
   - ✅ Ver logs de auditoría
   - ✅ Configurar reglas de crédito

**Sidebar del Admin** (con más opciones):
```
┌─────────────────────┐
│ Menu                │
│                     │
│ 📊 Dashboard        │
│ 📄 Solicitudes      │
│ 👥 Usuarios         │ ← Solo ADMIN
│ 📋 Audit Logs       │ ← Solo ADMIN
│ 👤 Perfil           │
│ ⚙️  Configuración   │
│                     │
└─────────────────────┘
```

---

## 🔄 Flujo de Datos en el Dashboard

### 1. Carga de Datos con React Query

```typescript
// Hook personalizado
export const useGetSolicitudes = (params) => {
  return useQuery({
    queryKey: ['solicitudes', params],
    queryFn: () => apiGet(`/solicitudes?${params}`),
    staleTime: 5 * 60 * 1000, // Cache 5 minutos
  })
}
```

**Flujo**:
```
Component            React Query         API                Backend
   │                     │                 │                    │
   │ useGetSolicitudes   │                 │                    │
   ├──────────────────>  │                 │                    │
   │                     │                 │                    │
   │                     │ GET /solicitudes│                    │
   │                     ├─────────────────>                    │
   │                     │                 │ fetch + JWT        │
   │                     │                 ├──────────────────> │
   │                     │                 │                    │
   │                     │                 │ JSON response      │
   │                     │                 │<─────────────────  │
   │                     │ Cache + return  │                    │
   │ <──────────────────┤                 │                    │
   │                     │                 │                    │
   │ render data         │                 │                    │
```

**Ventajas de React Query**:
- ✅ Caché automático (5 minutos)
- ✅ Refetch automático
- ✅ Loading states
- ✅ Error handling
- ✅ Optimistic updates

---

### 2. Backend Filtra por Rol

**En el Backend** (`apps/api/src/routes/solicitudes.ts`):

```typescript
app.get('/solicitudes', { preHandler: ensureAuth }, async (req, reply) => {
  const user = req.user
  const where = {}

  // ⚠️ IMPORTANTE: CLIENTES solo ven sus solicitudes
  if (user.rol === 'CLIENTE') {
    where.clienteId = user.sub
  }

  // ANALISTAS y ADMINS ven TODAS las solicitudes
  // (no se agrega filtro)

  const solicitudes = await prisma.solicitud.findMany({ where })

  return { items: solicitudes, total: solicitudes.length }
})
```

**Resultado**:
- **CLIENTE** con ID `cmk1abc`: Solo ve solicitudes donde `clienteId = 'cmk1abc'`
- **ANALISTA** o **ADMIN**: Ve TODAS las solicitudes

---

## 🎨 Componentes UI Utilizados

El dashboard usa **shadcn/ui**, una colección de componentes React con Tailwind CSS.

### Componentes Principales:

1. **Card** - Tarjetas de estadísticas
```tsx
<Card>
  <CardHeader>
    <CardTitle>Solicitudes Totales</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="text-2xl font-bold">156</div>
  </CardContent>
</Card>
```

2. **DataTable** - Tabla de datos con paginación y filtros
```tsx
<DataTable
  columns={columns}
  data={solicitudes}
  searchKey="cliente"
/>
```

3. **Badge** - Indicadores de estado
```tsx
<Badge variant="success">APROBADO</Badge>
<Badge variant="warning">PENDIENTE</Badge>
<Badge variant="destructive">RECHAZADO</Badge>
```

4. **Button** - Botones interactivos
```tsx
<Button variant="primary" onClick={handleClick}>
  Aprobar Solicitud
</Button>
```

5. **Charts** - Gráficas con Recharts
```tsx
<BarChart data={productData}>
  <Bar dataKey="amount" fill="#0f172a" />
</BarChart>
```

---

## 🔮 Mejoras Futuras Recomendadas

### 1. Roles Dinámicos en el Sidebar

```typescript
// layout.tsx
const getSidebarItems = (rol: string) => {
  const baseItems = [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "Solicitudes", href: "/dashboard/solicitudes", icon: FileText },
  ]

  // Solo para ADMIN
  if (rol === 'ADMIN') {
    baseItems.push(
      { title: "Usuarios", href: "/dashboard/usuarios", icon: Users },
      { title: "Audit Logs", href: "/dashboard/logs", icon: FileText }
    )
  }

  baseItems.push(
    { title: "Perfil", href: "/dashboard/perfil", icon: User },
    { title: "Configuración", href: "/dashboard/settings", icon: Settings }
  )

  return baseItems
}

// Uso
const sidebarItems = getSidebarItems(session.user.rol)
```

### 2. Dashboard para CLIENTES

Crear un dashboard diferente para clientes:

```typescript
// app/(cliente-dashboard)/layout.tsx
<RequireAuth allowedRoles={["CLIENTE"]}>
  <ClienteDashboard>
    {/* Solo sus solicitudes */}
    {/* Calculadora de crédito */}
    {/* Historial de pagos */}
  </ClienteDashboard>
</RequireAuth>
```

### 3. Permisos Granulares

```typescript
// utils/permissions.ts
const permissions = {
  CLIENTE: ['view_own_solicitudes', 'create_solicitud'],
  ANALISTA: ['view_all_solicitudes', 'update_status', 'add_notes'],
  ADMIN: ['*'] // Todos los permisos
}

export const hasPermission = (rol: string, permission: string) => {
  return permissions[rol]?.includes(permission) ||
         permissions[rol]?.includes('*')
}

// Uso en componentes
{hasPermission(user.rol, 'update_status') && (
  <Button onClick={updateStatus}>Cambiar Estado</Button>
)}
```

### 4. Notificaciones en Tiempo Real

```typescript
// Usar WebSockets o Server-Sent Events
useEffect(() => {
  const ws = new WebSocket('wss://api.capitalta.abdev.click/ws')

  ws.onmessage = (event) => {
    const notification = JSON.parse(event.data)
    if (notification.type === 'nueva_solicitud') {
      showToast('Nueva solicitud recibida')
      queryClient.invalidateQueries(['solicitudes'])
    }
  }
}, [])
```

---

## 📊 Resumen Visual de Permisos

```
┌────────────────────────────────────────────────────────────────┐
│                    MATRIZ DE PERMISOS                          │
├────────────────────┬───────────┬──────────────┬────────────────┤
│ Funcionalidad      │  CLIENTE  │   ANALISTA   │     ADMIN      │
├────────────────────┼───────────┼──────────────┼────────────────┤
│ Ver Dashboard      │    ❌     │      ✅      │       ✅       │
│ Ver Solicitudes    │ Solo suyas│   Todas      │    Todas       │
│ Crear Solicitud    │    ✅     │      ❌      │       ✅       │
│ Cambiar Estado     │    ❌     │      ✅      │       ✅       │
│ Agregar Notas      │    ❌     │      ✅      │       ✅       │
│ Ver Usuarios       │    ❌     │      ❌      │       ✅       │
│ Gestionar Usuarios │    ❌     │      ❌      │       ✅       │
│ Ver Audit Logs     │    ❌     │      ❌      │       ✅       │
│ Configuración      │ Básica    │   Básica     │    Completa    │
└────────────────────┴───────────┴──────────────┴────────────────┘
```

---

## 🎓 Conclusión

El dashboard de Capitalta es una interfaz administrativa robusta que:

1. **Protege el acceso** con autenticación y roles
2. **Filtra datos** según el rol del usuario
3. **Muestra visualizaciones** útiles para toma de decisiones
4. **Es extensible** para agregar más funcionalidades

**Flujo Completo**:
```
Usuario → Login → Verifica Rol →
  ├─ CLIENTE  → ❌ Dashboard (redirect a su área)
  ├─ ANALISTA → ✅ Dashboard + Gestión de Solicitudes
  └─ ADMIN    → ✅ Dashboard + Gestión de Solicitudes + Usuarios
```

---

¿Necesitas más detalles sobre algún aspecto específico del dashboard?
