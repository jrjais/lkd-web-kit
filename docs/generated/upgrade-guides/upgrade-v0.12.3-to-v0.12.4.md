# Upgrade v0.12.3 to v0.12.4

Registro: 2026-11-24T15:17:10-04:00 (America/La_Paz). Autor: Codex/OpenAI, modelo no verificado; usuario hugo\hugos (fuente: whoami).

## Resumen

- Patch 0.12.4 solicitado expresamente por el usuario, aunque contiene cambios incompatibles de API pública.
- DashboardLayout pasa a LKDDashboardLayout, incluida su familia de tipos y subcomponentes; no queda alias antiguo.
- Composición explícita, header 56 px y navbar 200 px por defecto, configuración de medidas y burgerProps visuales.
- Colores del tema Mantine y NavLink; se eliminan altura duplicada y necesidad de overrides internos para dimensiones/botones.

## Dependencias a actualizar

- `lkd-web-kit`: `0.12.4`

Peers sin cambios respecto de 0.12.3:

- `@mantine/core`: `^9.8.2`
- `@mantine/dates`: `^9.8.2`
- `@mantine/hooks`: `^9.8.2`
- `@mantine/notifications`: `^9.8.2`
- `@tanstack/react-query`: `^5.108.4`
- `@tanstack/react-table`: `^9.3.1`
- `@tanstack/react-virtual`: `^3.14.28`
- `clsx`: `^2.1.1`
- `dayjs`: `^1.11.23`
- `ky`: `^2.2.0`
- `next`: `^16.4.6`
- `react`: `^19.3.1`
- `react-dom`: `^19.3.1`
- `react-hook-form`: `^7.92.0`
- `react-query-kit`: `^3.4.0`
- `zod`: `^4.6.7`

Node continúa en >=22.12.0. Mantener alineados los paquetes Mantine del consumidor.

## Cambios de API o comportamiento

- Antes: DashboardLayout, DashboardLayoutProps/Factory/ClassNames/Labels/StylesNames, DashboardLayoutHeader/Main/Navbar y tipos relacionados.
- Después: LKDDashboardLayout y los mismos nombres con prefijo LKD. Las partes conservan .Header, .Navbar, .Main, .Page y .Title.
- Acción requerida: actualizar imports y claves de tema; quitar aliases locales como KitDashboardLayout si ya no son necesarios. DashboardPage, DashboardTitle y DashboardNavItem/Section conservan sus nombres.
- La raíz sólo recibe children, header, navbar, labels y props de Box/Styles API. Retirar navigation y los slots de la raíz; pasarlos a las partes explícitas. Header recibe brand/brandHref/headerActions/userMenu; Navbar recibe navigation/search/navbarFooter.
- header.height es 56 y navbar.width es 200 por defecto. header.height y navbar.width admiten valores responsive de AppShell; header.offset se delega a AppShell. navbar.breakpoint es una clave del tema, sm por defecto, compartida con los botones.
- Header.burgerProps acepta color, size, lineSize, transiciones y estilos. El kit protege opened, click, visibilidad y atributos accesibles. Usar color blanco sólo sobre fondo oscuro; omitirlo para el color nativo de Mantine sobre fondo claro.
- Retirar CSS que sobrescriba --app-shell-header-height/offset, --app-shell-navbar-width/offset, h-14/h-16 y selectores internos de Burger cuando sólo existan para suplir la API anterior.
- Los colores de DashboardTitle y textos neutros usan variables del tema. NavLink hereda el color primario. Usar DashboardTitle.extend() para tipografía/estilos del consumidor.

```tsx
import { LKDDashboardLayout } from 'lkd-web-kit'

<LKDDashboardLayout>
  <LKDDashboardLayout.Header brand={brand} userMenu={userMenu} burgerProps={{ color: 'white' }} />
  <LKDDashboardLayout.Navbar navigation={navigation} />
  <LKDDashboardLayout.Main>{children}</LKDDashboardLayout.Main>
</LKDDashboardLayout>
```

El ejemplo del botón blanco supone un encabezado oscuro. Para otras medidas usar header={{ height: 64 }} y navbar={{ width: 240, breakpoint: 'md' }}. La autenticación, autorización y localización de enlaces permanecen en la aplicación.

## Cambios requeridos por dependencias peer

No se modifican peers ni se detectan migraciones adicionales por dependencias. Conservar el escaneo Tailwind del dist. No regenerar skills locales duplicadas si se consume el complemento; consultar esta guía cuando las skills instaladas aún usen los nombres anteriores.

## Prompt para IA del proyecto consumidor

```text
Lee AGENTS.md, package.json, lockfile, documentación local y guía de Next.js instalada. Trabaja en la rama actual. Actualiza lkd-web-kit a 0.12.4 con npm install o el gestor del proyecto; conserva los peers indicados, sin bumps adicionales. Busca con rg DashboardLayout, KitDashboardLayout, DashboardTitle, --app-shell y mantine-Burger-root. Migra a LKDDashboardLayout y tipos/claves de tema con prefijo LKD. Compón Header, Navbar y Main explícitamente; mueve navigation/slots a su parte correspondiente. Aprovecha defaults 56/200 y quita overrides CSS internos de dimensiones, offsets y altura fija. Usa Header.burgerProps para blanco sobre fondo oscuro y color nativo sobre claro. Mueve estilos globales de DashboardTitle al tema cuando elimine wrappers locales redundantes. Conserva sesión y permisos de servidor, marca, usuario, idioma, navegación activa y escaneo Tailwind. Ejecuta npm install, npm run lint, npm run test, npm run typecheck y npm run build o sus equivalentes. Distingue errores previos de regresiones. Reporta archivos, validaciones y límites visuales. No hagas commit ni deploy si el usuario los excluye.
```
