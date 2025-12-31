# CAPITALTA

Plataforma de gestión y solicitud de créditos financieros para Constructoras, PYMEs y Personas Físicas.

## 🚀 Descripción del Proyecto

CAPITALTA es una aplicación web moderna diseñada para simplificar el proceso de solicitud de créditos. Permite a los usuarios registrarse, calcular cuotas de préstamos, enviar solicitudes con documentación adjunta y realizar un seguimiento en tiempo real del estado de sus trámites.

## 🏗️ Arquitectura Tecnológica

El proyecto está construido utilizando una arquitectura moderna y escalable:

- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS, shadcn/ui.
- **Backend**: Next.js Server Actions & API Routes.
- **Base de Datos**: PostgreSQL (vía Prisma ORM).
- **Autenticación**: NextAuth.js v4.
- **Estado**: React Query (TanStack Query) & Zustand.
- **Validación**: Zod.

## 🛠️ Guía de Instalación

Sigue estos pasos para configurar el entorno de desarrollo local:

1.  **Clonar el repositorio**:
    ```bash
    git clone https://github.com/abalderas10/proyecto-CAPITALTA.git
    cd proyecto-CAPITALTA
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno**:
    Crea un archivo `.env` en `apps/web` basándote en el ejemplo proporcionado (`.env.example`).

4.  **Inicializar Base de Datos**:
    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **Ejecutar en Desarrollo**:
    ```bash
    npm run dev
    ```

## 🔑 Variables de Entorno

Variables necesarias en `apps/web/.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/capitalta"
NEXTAUTH_SECRET="tu-secreto-seguro"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="tu-google-client-id"
GOOGLE_CLIENT_SECRET="tu-google-client-secret"
```

## 🎨 Imágenes Hero

Para las landing pages, se utilizan imágenes PNG. Para generarlas, utiliza DALL-E 3 con los siguientes prompts y guárdalas en `apps/web/public/images/`:

1.  **Constructoras** (`hero-construction.png`):
    > "Una imagen profesional de un sitio de construcción moderno y limpio. En primer plano, un arquitecto y un ingeniero revisan planos en una tablet. El fondo muestra una estructura de edificio en progreso con grúas. La paleta de colores debe ser brillante, con toques de teal y gris oscuro. Estilo fotorrealista."

2.  **PYME** (`hero-pyme.png`):
    > "Una imagen de un pequeño negocio próspero, como una cafetería o una tienda boutique. El dueño del negocio sonríe mientras atiende a un cliente. El ambiente es cálido y acogedor. La iluminación es natural y brillante, con detalles en color teal. Estilo fotorrealista."

3.  **Persona Física** (`hero-personafisica.png`):
    > "Una imagen de una familia joven y feliz frente a una casa moderna con un jardín bien cuidado. La pareja mira con orgullo su hogar. El sol brilla, creando una atmósfera de optimismo y seguridad financiera. Toques de color teal en la decoración. Estilo fotorrealista."

Nota: Las referencias en el código ya han sido actualizadas para esperar archivos `.png`.

## 📜 Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Construye la aplicación para producción.
- `npm run start`: Inicia la aplicación construida.
- `npm run lint`: Ejecuta el linter para verificar el código.

## 🚢 Despliegue

El proyecto está configurado para desplegarse automáticamente en Vercel al hacer push a la rama `main`.

---

Desarrollado con ❤️ por el equipo de CAPITALTA.
