# Upgrade v0.11.0 to v0.11.1

## Resumen

- Publica un patch de mantenimiento de `lkd-web-kit` con peers actualizados a versiones compatibles más recientes.
- No cambia la API pública de componentes, hooks, utilidades ni tipos exportados.
- Incluye un ajuste interno de build para compatibilidad con Vite/Rolldown al leer `package.json`.
- Riesgo esperado: bajo si el consumidor ya soporta Node.js `>=22.12.0` y actualiza los peers indicados.

## Dependencias a actualizar

- `lkd-web-kit`: `0.11.1`
- `@mantine/core`: `^9.6.0`
- `@mantine/dates`: `^9.6.0`
- `@mantine/hooks`: `^9.6.0`
- `@mantine/notifications`: `^9.6.0`
- `@tanstack/react-query`: `^5.102.8`
- `@tanstack/react-table`: `^9.2.4`
- `@tanstack/react-virtual`: `^3.14.10`
- `dayjs`: `^1.11.23`
- `ky`: `^2.1.0`
- `next`: `^16.3.4`
- `react-hook-form`: `^7.87.0`
- `zod`: `^4.5.4`

Peers relevantes sin cambios:

- `react`: `^19.2.8`
- `react-dom`: `^19.2.8`
- `clsx`: `^2.1.1`
- `react-query-kit`: `^3.3.4`

## Cambios de API o comportamiento

No hay cambios de API pública detectados.

El único cambio de código interno del kit es el import default de `package.json` en `vite.config.ts` para evitar fallas de build con el loader de Vite/Rolldown. No requiere acción en consumidores.

## Cambios requeridos por dependencias peer

No hay migraciones esperadas en consumidores por las nuevas versiones peer.

Notas de compatibilidad:

- Mantine `9.6.0` agrega props nuevas en Notifications como `renderNotification` y `layout="stacked"`; `MyNotifications` ya extiende `NotificationsProps`, por lo que esas mejoras quedan disponibles sin cambio de API del kit.
- Mantine `9.6.0` requiere Node.js 22 en desarrollo por cambios de `@mantine/dropzone`; `lkd-web-kit` ya exige Node.js `>=22.12.0`.
- React Hook Form `7.87.0` agrega `getErrors` y `trigger(..., { shouldTouch })`; los wrappers `Form*` actuales no requieren cambios.
- Ky `2.1.0` precisa el comportamiento de `HTTPError.data` y hace `HTTPError.options` readonly; los hooks/utilidades del kit no mutan `options`.
- Dayjs `1.11.23` contiene fixes del plugin `timezone`; el kit usa formateo core, sin acción requerida.
- Next `16.3.4`, TanStack Query `5.102.8`, TanStack Table `9.2.4`, TanStack Virtual `3.14.10` y Zod `4.5.4` son compatibles con los usos actuales del kit.

## Prompt para IA del proyecto consumidor

```text
Lee package.json, lockfile, AGENTS.md y documentacion local del proyecto.

Actualiza lkd-web-kit a 0.11.1 y asegura que los peers cumplan:
- @mantine/core ^9.6.0
- @mantine/dates ^9.6.0
- @mantine/hooks ^9.6.0
- @mantine/notifications ^9.6.0
- @tanstack/react-query ^5.102.8
- @tanstack/react-table ^9.2.4
- @tanstack/react-virtual ^3.14.10
- dayjs ^1.11.23
- ky ^2.1.0
- next ^16.3.4
- react ^19.2.8
- react-dom ^19.2.8
- react-hook-form ^7.87.0
- zod ^4.5.4

Busca usos potencialmente afectados con rg:
rg "lkd-web-kit|MyNotifications|NotificationsProps|react-hook-form|@tanstack/react-table|@tanstack/react-query|@tanstack/react-virtual|ky|zod|dayjs|next/navigation|next/link"

No hay cambios de API publica detectados en lkd-web-kit. Si el proyecto consumidor solo usa componentes, hooks y utilidades exportadas del kit, normalmente basta con actualizar dependencias y lockfile.

Verifica que el entorno use Node.js >=22.12.0.

Ejecuta npm install, npm run lint, npm run test y npm run build.

Reporta cambios aplicados, archivos modificados, validaciones ejecutadas y bloqueos.
```
