---
name: lkd-web-dashboard-layout
description: Crear o refactorizar dashboards en aplicaciones Next.js App Router que consumen lkd-web-kit, usando DashboardLayout como shell, DashboardContent para el contenido y DashboardTitle para el encabezado. Usar cuando se implemente navegación lateral, búsqueda, marca, acciones de cabecera o un adaptador con sesión y permisos. No usar para páginas sin shell de dashboard.
---

# Dashboard con lkd-web-kit

Usar los componentes públicos de `lkd-web-kit`; no copiar ni recrear su `AppShell`.

## Antes de editar

1. Leer `AGENTS.md`, la documentación local de `lkd-web-kit` y la documentación de Next.js disponible en `node_modules/next/dist/docs/`.
2. Revisar el `layout.tsx`, una Page y los providers cercanos. Respetar aliases, route groups, autenticación, autorización, iconos y convenciones locales.
3. Confirmar la versión instalada y que exporta `DashboardLayout`, `DashboardContent` y `DashboardTitle`.

## Separar responsabilidades

- Mantener en un Server Component `layout.tsx` la lectura de sesión, datos, redirects y autorización de entrada.
- Crear un adaptador cliente delgado cuando la aplicación necesite transformar sesión, permisos o acciones en slots del dashboard.
- Filtrar los items autorizados antes de pasarlos a `DashboardLayout`. El kit no autentica ni autoriza.
- Pasar marca, notificaciones, menú de usuario, footer e iconos mediante slots. Usar el sistema de iconos ya instalado; no agregar una dependencia sólo por el ejemplo.
- Colocar el layout en el route group que comparten las páginas del dashboard. No envolver login, callbacks ni rutas públicas.

```tsx
// src/app/(dashboard)/layout.tsx — Server Component
import type { ReactNode } from 'react'
import { AppDashboardLayout } from '@/components/layouts/AppDashboardLayout'
import { getSession } from '@/server/session'

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getSession()
  return <AppDashboardLayout session={session}>{children}</AppDashboardLayout>
}
```

```tsx
// src/components/layouts/AppDashboardLayout.tsx — Client Component
'use client'

import {
  DashboardLayout,
  type DashboardNavItem,
  type DashboardNavSection,
} from 'lkd-web-kit'
import type { ReactNode } from 'react'

type AppNavItem = Omit<DashboardNavItem, 'children'> & {
  permission?: string
  children?: readonly AppNavItem[]
}

const navigation: readonly { label: string; items: readonly AppNavItem[] }[] = [
  {
    label: 'Principal',
    items: [
      { label: 'Inicio', href: '/inicio' },
      { label: 'Consultas', href: '/consultas', activePaths: ['/consulta'], permission: 'consults.read' },
    ],
  },
]

function visibleItems(items: readonly AppNavItem[], permissions: readonly string[]): DashboardNavItem[] {
  return items.flatMap(({ permission, children, ...item }) => {
    if (permission && !permissions.includes(permission)) return []
    const visibleChildren = children ? visibleItems(children, permissions) : undefined
    if (children && !visibleChildren?.length) return []
    return [{ ...item, children: visibleChildren }]
  })
}

export function AppDashboardLayout({ children, session }: { children: ReactNode; session: { permissions: readonly string[] } }) {
  const sections: DashboardNavSection[] = navigation.flatMap((section) => {
    const items = visibleItems(section.items, session.permissions)
    return items.length ? [{ ...section, items }] : []
  })

  return (
    <DashboardLayout
      brand={<span>Mi aplicación</span>}
      brandHref="/inicio"
      navigation={sections}
      search={{ ariaLabel: 'Buscar en el menú', placeholder: 'Buscar módulo o pantalla' }}
      headerActions={<button type="button">Notificaciones</button>}
      userMenu={<button type="button">Mi cuenta</button>}
      navbarFooter={<span>Acceso interno</span>}
    >
      {children}
    </DashboardLayout>
  )
}
```

Si existen hijos con permisos, filtrarlos recursivamente y retirar padres que queden vacíos. Usar `activePaths` para rutas relacionadas que no descienden del `href`; la coincidencia normal ya funciona por segmentos. Los items pueden usar `href`, `onClick`, `disabled`, `icon`, `rightSection` y `children`.

## Contenido de página

Mantener `page.tsx` como entrypoint de routing y renderizar la UI real desde `src/components/pages` cuando ése sea el patrón del proyecto.

```tsx
import { Button } from '@mantine/core'
import { DashboardContent, DashboardTitle } from 'lkd-web-kit'

export function CustomersPage() {
  return (
    <DashboardContent aria-label="Clientes">
      <DashboardTitle
        title="Clientes"
        description="Consulta y administra los clientes disponibles."
        action={<Button>Nuevo cliente</Button>}
      />
      <div>Contenido de la página</div>
    </DashboardContent>
  )
}
```

- `DashboardContent` renderiza un `section` y acepta props HTML y `className`.
- `DashboardTitle` renderiza un `header`; requiere `title` y acepta `description`, `action`, props HTML y `className`.
- Usar `classNames` de `DashboardLayout` sólo para adaptar una necesidad visual real, no para duplicar sus estilos base.

## Tailwind

Las clases del shell viven en el JavaScript distribuido. Detectar la versión y configuración del consumidor:

- Tailwind v3: agregar `./node_modules/lkd-web-kit/dist/**/*.{js,cjs}` a `content`.
- Tailwind v4: agregar `@source "../node_modules/lkd-web-kit/dist";` en la hoja CSS, ajustando la ruta relativa desde ese archivo.

No reemplazar una configuración que ya cubra el paquete.

## Verificación

- Comprobar navegación activa, items autorizados, búsqueda, navbar mobile y desktop, slots y páginas con/sin acción.
- Ejecutar lint, typecheck, tests y build disponibles.
- Verificar visualmente al menos una ruta desktop y una mobile cuando exista navegador local.
