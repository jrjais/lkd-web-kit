# Upgrade v0.10.4 to v0.10.5

## Resumen

- `Container` ahora define `w: '100%'` como default prop del tema base.
- No se agregan componentes, exports ni dependencias nuevas.
- Riesgo esperado: bajo; el cambio solo ajusta el ancho por defecto de `Container`.

## Dependencias a actualizar

- `lkd-web-kit`: `0.10.5`
- `@mantine/core`: `^9.4.1` (sin cambios)
- `@mantine/dates`: `^9.4.1` (sin cambios)
- `@mantine/hooks`: `^9.4.1` (sin cambios)
- `@mantine/notifications`: `^9.4.1` (sin cambios)
- `react`: `^19.2.7` (sin cambios)
- `react-dom`: `^19.2.7` (sin cambios)
- `next`: `^16.2.9` (sin cambios)

## Cambios de API o comportamiento

- Antes: `Container` tenia defaults `size: 'xl'` y `px: 'md'`.
- Despues: `Container` tiene defaults `size: 'xl'`, `px: 'md'` y `w: '100%'`.
- Accion requerida en consumidores: revisar usos que dependan de un ancho automatico distinto y sobrescribir `w` localmente si corresponde.

No hay cambios de API publica detectados.

## Cambios requeridos por dependencias peer

No hay cambios esperados por dependencias peer. Los rangos de React, Mantine, Next, Zod, React Hook Form, TanStack, Ky y demas peers se mantienen.

## Prompt para IA del proyecto consumidor

Lee `package.json`, lockfile, `AGENTS.md` y la documentacion local del proyecto. Actualiza `lkd-web-kit` a `0.10.5` manteniendo los peers existentes. Busca imports y usos afectados con `rg "Container|lkd-web-kit"`. Aplica solo los cambios necesarios por el nuevo default `Container.w = '100%'`; si algun uso dependia de otro ancho, sobrescribe `w` localmente. Ejecuta `npm install`, `npm run lint`, `npm run test` y `npm run build`. Reporta cambios aplicados, archivos modificados, validaciones y bloqueos.
