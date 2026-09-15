# Upgrade v0.11.1 to v0.12.0

## Resumen

- Se incorporan `DashboardLayout`, `DashboardContent` y `DashboardTitle` como API pública compatible para aplicaciones Next.js.
- Se distribuye la skill `lkd-web-dashboard-layout` para implementar el shell y sus páginas en proyectos consumidores.
- Se elevan los mínimos compatibles de varios peer dependencies; no se eliminan APIs existentes.

## Dependencias a actualizar

- `lkd-web-kit`: `0.12.0`
- `@mantine/core`, `@mantine/dates`, `@mantine/hooks`, `@mantine/notifications`: `^9.6.1`
- `react`, `react-dom`: `^19.3.0`
- `next`: `^16.3.5`
- `zod`: `^4.6.5`
- `react-hook-form`: `^7.88.0`
- `@tanstack/react-virtual`: `^3.14.13`

Permanecen sin cambios `@tanstack/react-query` `^5.102.8`, `@tanstack/react-table` `^9.2.4`, `clsx` `^2.1.1`, `dayjs` `^1.11.23`, `ky` `^2.1.0` y `react-query-kit` `^3.3.4`.

## Cambios de API o comportamiento

Antes: el paquete no ofrecía un shell completo para dashboards.

Después: exporta `DashboardLayout`, `DashboardContent`, `DashboardTitle`, sus props, tipos de navegación, configuración, labels y `classNames`. `NavItems` admite además `key?` por item.

Acción requerida: ninguna para consumidores que no adopten los nuevos componentes. Quienes usen `DashboardLayout` deben pasar navegación ya autorizada y configurar Tailwind para escanear `lkd-web-kit/dist`.

## Cambios requeridos por dependencias peer

Actualizar conjuntamente las familias React/React DOM y Mantine. No se detectaron cambios requeridos en la API existente del kit; los cambios son minor o patch dentro de los majors ya soportados. React 19.3 incorpora APIs nuevas y correcciones sin que el kit dependa de ellas.

## Skills distribuidas

Después de instalar la versión, ejecutar el instalador desde la raíz del proyecto para copiar o actualizar las skills públicas en `.agents/skills`. La nueva skill se llama `lkd-web-dashboard-layout`.

## Prompt para IA del proyecto consumidor

Lee `AGENTS.md`, `package.json`, el lockfile, la documentación local y la documentación de Next.js disponible. Actualiza `lkd-web-kit` a `0.12.0` y sus peers a los rangos exactos de esta guía, manteniendo alineados React/React DOM y los paquetes Mantine. Ejecuta el instalador `lkd-install-agent-skills` desde la raíz del proyecto. Busca con `rg` imports, layouts y usos afectados. Si el proyecto adopta el dashboard, usa `DashboardLayout` mediante un adaptador local que conserve autenticación, permisos, marca y acciones propias; usa `DashboardContent` y `DashboardTitle` en las páginas y configura Tailwind para escanear `lkd-web-kit/dist`. Ejecuta instalación, lint, typecheck si existe, tests y build. Reporta dependencias, archivos modificados, validaciones y bloqueos.
