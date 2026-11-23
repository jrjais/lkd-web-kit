# Upgrade v0.12.2 to v0.12.3

Registro: 2026-11-23T14:45:16-04:00, America/La_Paz. Autor: Codex (OpenAI), modelo no verificado; usuario SO `hugo\hugos`, obtenido mediante `whoami`. Versión patch solicitada expresamente por el usuario, aunque elimina nombres públicos y exige migración.

## Resumen

- `DashboardLayout` admite composición con `.Header`, `.Navbar` y `.Main`, con contexto seguro y Styles API de Mantine. Cada componente tiene su archivo.
- `DashboardContent` se reemplaza por `DashboardPage` / `DashboardLayout.Page`. Se eliminan los aliases anteriores.
- `DashboardPage` y `DashboardTitle` usan `factory`, `useProps`, refs y `.extend()`. La página admite padding responsive, `maw` y `mx`; el título expone selectores internos.
- Se actualizan ocho peers dentro de sus majors actuales. El bump solicitado no implica compatibilidad de los imports eliminados.

## Dependencias a actualizar

- `lkd-web-kit`: `0.12.3`
- `@mantine/core`, `@mantine/dates`, `@mantine/hooks`, `@mantine/notifications`: `^9.8.2`
- `@tanstack/react-query`: `^5.108.4`
- `@tanstack/react-virtual`: `^3.14.28`
- `next`: `^16.4.6`
- `react-hook-form`: `^7.92.0`

Peers sin cambios: `@tanstack/react-table: ^9.3.1`, `clsx: ^2.1.1`, `dayjs: ^1.11.23`, `ky: ^2.2.0`, `react: ^19.3.1`, `react-dom: ^19.3.1`, `react-query-kit: ^3.4.0`, `zod: ^4.6.7`. Mantener alineados todos los paquetes Mantine del consumidor, incluidos charts si se usa. Node sigue en `>=22.12.0`.

## Cambios de API o comportamiento

- Antes: `DashboardContent`, `DashboardContentProps`, `DashboardLayout.Content`.
- Después: `DashboardPage`, `DashboardPageProps`, `DashboardLayout.Page`.
- Acción requerida: reemplazar todos los imports, tipos y JSX antiguos; no quedan aliases de compatibilidad.
- `DashboardPage` renderiza `section`, tiene `p={16}` y `w="100%"` por defecto. El padding ahora se configura con `p`, también responsive, en lugar de depender de `p-4`.
- `DashboardTitle` conserva `title`, `description` y `action`. Sus selectores son `root`, `body`, `title`, `description` y `action`. Reemplazar selectores CSS que dependan de la estructura DOM por `classNames` o `styles`.
- `DashboardPage` y `DashboardTitle` funcionan sin el contexto de `DashboardLayout`; sus opciones de tema se registran con sus nombres independientes.

Composición recomendada en un Client Component:

```tsx
<DashboardLayout>
  <DashboardLayout.Header brand="Mi aplicación" userMenu={<UserMenu />} />
  <DashboardLayout.Navbar navigation={navigation} search={{}} />
  <DashboardLayout.Main>{children}</DashboardLayout.Main>
</DashboardLayout>
```

Dentro de una página, usar `DashboardPage` y `DashboardTitle` como imports independientes, especialmente desde Server Components. En Client Components también se pueden usar `.Page` y `.Title`. No pasar `navigation` a la raíz cuando se compone explícitamente: ese prop conserva el armado automático anterior. Header, Navbar y Main requieren su raíz.

## Cambios requeridos por dependencias peer

No se detectaron migraciones obligatorias por los peers en los wrappers utilizados. Las mejoras de Notifications ya se exponen mediante props heredadas. Mantine debe estar alineado en una sola versión. Revisar formularios, virtualización y navegación en consumidores; la compilación del kit no sustituye esas pruebas.

## Prompt para IA del proyecto consumidor

```text
Lee AGENTS.md, package.json, el lockfile, la documentación local y la documentación de Next.js instalada. Trabaja en la rama actual. Actualiza lkd-web-kit a 0.12.3 y alinea sus peers a los rangos exactos de esta guía; respeta el gestor de paquetes del proyecto (npm install o el equivalente pnpm). Busca con rg DashboardContent, DashboardContentProps, DashboardLayout.Content, DashboardLayout y DashboardTitle. Sustituye los tres nombres eliminados por DashboardPage, DashboardPageProps y DashboardLayout.Page. Migra los adaptadores cliente del dashboard a Header, Navbar y Main, preservando sesión, autorización, navegación, marca, acciones y providers. Conserva la verificación de sesión en Server Components. Cambia los selectores DOM del título por classNames/styles públicos. No dupliques AppShell. Mantén el escaneo Tailwind del dist del kit. Ejecuta lint, typecheck, tests y build (npm run lint, npm run test, npm run build o equivalentes pnpm), y verifica desktop/mobile cuando sea posible. Reporta archivos, validaciones y bloqueos.
```
