# Upgrade v0.10.2 to v0.10.3

## Resumen

- `breakpointsWithPx.xs` cambia de `576px` a `540px`.
- Se agrega `breakpointsWithPx['3xl']` con valor `1680px`.
- Las skills del paquete pasan de `.codex/skills` a `.agents/skills`.
- Riesgo esperado: bajo; revisar layouts o hooks que dependan exactamente de `xs`.

## Dependencias a actualizar

- `lkd-web-kit`: `0.10.3`
- `@mantine/core`: `^9.4.1`
- `@mantine/dates`: `^9.4.1`
- `@mantine/hooks`: `^9.4.1`
- `@mantine/notifications`: `^9.4.1`
- `@tanstack/react-query`: `^5.101.2`
- `@tanstack/react-table`: `^8.21.3`
- `@tanstack/react-virtual`: `^3.14.4`
- `clsx`: `^2.1.1`
- `ky`: `^2.0.2`
- `next`: `^16.2.9`
- `react`: `^19.2.7`
- `react-dom`: `^19.2.7`
- `react-hook-form`: `^7.80.0`
- `react-query-kit`: `^3.3.4`
- `zod`: `^4.4.3`

Los rangos peer no cambian respecto de `0.10.2`.

## Cambios de API o comportamiento

- Antes: `breakpointsWithPx.xs` era `576px`.
- Despues: `breakpointsWithPx.xs` es `540px`.
- Accion requerida en consumidores: revisar usos de `breakpointsWithPx.xs`, `useBreakpoint('xs')` y estilos sincronizados con Tailwind si dependen del corte exacto.

- Antes: no existia `breakpointsWithPx['3xl']`.
- Despues: existe `breakpointsWithPx['3xl'] = '1680px'`.
- Accion requerida en consumidores: opcional; usar `3xl` solo si el proyecto necesita layouts para pantallas anchas.

- Antes: el bin publicado era `lkd-install-codex-skills` y copiaba desde `codex/skills`.
- Despues: el bin publicado es `lkd-install-agent-skills` y copia desde `.agents/skills`.
- Accion requerida en consumidores: actualizar cualquier script interno que invoque el instalador anterior.

## Cambios requeridos por dependencias peer

No hay cambios esperados por dependencias peer. Mantener los rangos actuales y ejecutar las validaciones del proyecto consumidor.

## Prompt para IA del proyecto consumidor

Lee `package.json`, lockfile, `AGENTS.md` y la documentacion local del proyecto. Actualiza `lkd-web-kit` a `0.10.3` y conserva los peers en los rangos indicados en esta guia. Busca usos afectados con `rg "breakpointsWithPx|useBreakpoint\\('xs'|useBreakpoint\\(\"xs\"|lkd-install-codex-skills|codex/skills|\\.codex"`. Aplica estos cambios: revisar layouts que dependan de `xs: 576px`, adoptar `xs: 540px` si el proyecto sincroniza breakpoints localmente, agregar `3xl: 1680px` donde exista una copia local de breakpoints, y reemplazar scripts de `lkd-install-codex-skills` por `lkd-install-agent-skills`. Ejecuta `npm install`, `npm run lint`, `npm run test` y `npm run build`. Reporta cambios aplicados, archivos modificados, validaciones y bloqueos.
