# Upgrade v0.10.10 to v0.10.11

## Resumen

- Actualiza `lkd-web-kit` a `0.10.11`.
- Eleva los rangos minimos de peers de Mantine, React, Next, TanStack React Query y React Hook Form.
- Actualiza Biome a `2.5.5` como dependencia de desarrollo del paquete.
- Riesgo esperado: bajo; no se detectaron cambios de API publica.

## Dependencias a actualizar

- `lkd-web-kit`: `0.10.11`
- `@mantine/core`: `^9.5.0`
- `@mantine/dates`: `^9.5.0`
- `@mantine/hooks`: `^9.5.0`
- `@mantine/notifications`: `^9.5.0`
- `@tanstack/react-query`: `^5.101.4`
- `@tanstack/react-table`: `^8.21.3` (sin cambio)
- `@tanstack/react-virtual`: `^3.14.8`
- `clsx`: `^2.1.1` (sin cambio)
- `ky`: `^2.0.2` (sin cambio)
- `next`: `^16.2.12`
- `react`: `^19.2.8`
- `react-dom`: `^19.2.8`
- `react-hook-form`: `^7.83.0`
- `react-query-kit`: `^3.3.4` (sin cambio)
- `zod`: `^4.4.3` (sin cambio)

## Cambios de API o comportamiento

No hay cambios de API publica detectados.

## Cambios requeridos por dependencias peer

No se esperan cambios de codigo en consumidores. Actualizar las dependencias anteriores junto con el lockfile y validar el proyecto consumidor.

## Prompt para IA del proyecto consumidor

```text
Lee AGENTS.md, package.json, el lockfile y la documentacion local del proyecto antes de editar. Actualiza lkd-web-kit a 0.10.11 y sincroniza estos peers: @mantine/core, @mantine/dates, @mantine/hooks y @mantine/notifications a ^9.5.0; @tanstack/react-query a ^5.101.4; @tanstack/react-virtual a ^3.14.8; next a ^16.2.12; react y react-dom a ^19.2.8; y react-hook-form a ^7.83.0. Conserva los rangos de @tanstack/react-table, clsx, ky, react-query-kit y zod. Busca con rg imports y usos potencialmente afectados. No hay cambios de API publica esperados, pero aplica cualquier ajuste que detectes. Ejecuta npm install, npm run lint, npm run test y npm run build. Reporta cambios aplicados, archivos modificados, validaciones y bloqueos.
```
