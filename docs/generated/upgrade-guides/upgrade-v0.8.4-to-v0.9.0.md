# Upgrade v0.8.4 to v0.9.0

## Resumen

- `lkd-web-kit` sube de `0.8.4` a `0.9.0`.
- El release actualiza rangos minimos de `peerDependencies` para Mantine, React, Next, TanStack, React Hook Form y React Query Kit.
- No hay cambios de API publica detectados en componentes, props, hooks, utilidades, exports o nombres.
- Riesgo esperado: bajo a medio, centrado en compatibilidad de dependencias peer dentro de los proyectos consumidores.

## Dependencias a actualizar

Actualizar estas dependencias en el proyecto consumidor:

- `lkd-web-kit`: `0.9.0`
- `@mantine/core`: `^9.3.0`
- `@mantine/dates`: `^9.3.0`
- `@mantine/hooks`: `^9.3.0`
- `@mantine/notifications`: `^9.3.0`
- `@tanstack/react-query`: `^5.101.0`
- `@tanstack/react-virtual`: `^3.14.2`
- `next`: `^16.2.7`
- `react`: `^19.2.7`
- `react-dom`: `^19.2.7`
- `react-hook-form`: `^7.77.0`
- `react-query-kit`: `^3.3.4`

Peers que no cambian en este release:

- `clsx`: `^2.1.1`
- `ky`: `^2.0.2`
- `zod`: `^4.4.3`

## Cambios de API o comportamiento

No hay cambios de API publica detectados.

- Antes: `lkd-web-kit@0.8.4` con los mismos componentes, props, hooks, utilidades y exports publicos.
- Despues: `lkd-web-kit@0.9.0` con la misma superficie publica y peers actualizados.
- Accion requerida en consumidores: actualizar dependencias, reinstalar lockfile y ejecutar validaciones.

## Cambios requeridos por dependencias peer

- Mantine sube de `^9.1.1` a `^9.3.0`. No se detectaron cambios requeridos en wrappers `My*` ni componentes `Form*`, pero los proyectos consumidores deben validar estilos, fechas, modales/notificaciones y componentes que usen props nativas de Mantine.
- React y React DOM suben de `^19.2.5` a `^19.2.7`. No se esperan cambios de codigo si el proyecto ya esta en React 19.
- Next sube de `^16.2.4` a `^16.2.7`. Validar build, rutas y cualquier integracion propia de Next en el proyecto consumidor.
- React Hook Form sube de `^7.75.0` a `^7.77.0`. Validar formularios, submit, errores y componentes `Form*`.
- TanStack React Query sube de `^5.100.9` a `^5.101.0` y TanStack React Virtual de `^3.13.24` a `^3.14.2`. Validar queries, paginacion infinita y listas virtualizadas si el proyecto las usa.
- React Query Kit sube de `^3.3.3` a `^3.3.4`. Validar hooks de queries generados o helpers que dependan de esta libreria.
- Ky y Zod no cambian, por lo que no hay acciones nuevas esperadas para clientes HTTP ni schemas.

## Prompt para IA del proyecto consumidor

```text
Necesito migrar este proyecto consumidor de `lkd-web-kit` desde v0.8.4 a v0.9.0.

Trabaja de forma cautelosa y no hagas refactors no relacionados.

Contexto obligatorio:
1. Lee `package.json`, lockfile (`package-lock.json`, `pnpm-lock.yaml` o `yarn.lock`), `AGENTS.md` si existe y la documentacion local del proyecto.
2. Busca usos de `lkd-web-kit` con `rg "lkd-web-kit|Form[A-Z]|My[A-Z]"`.
3. Si el proyecto tiene documentacion local de componentes o arquitectura, revisala antes de editar.

Actualiza estas dependencias:
- `lkd-web-kit`: `0.9.0`
- `@mantine/core`: `^9.3.0`
- `@mantine/dates`: `^9.3.0`
- `@mantine/hooks`: `^9.3.0`
- `@mantine/notifications`: `^9.3.0`
- `@tanstack/react-query`: `^5.101.0`
- `@tanstack/react-virtual`: `^3.14.2`
- `next`: `^16.2.7`
- `react`: `^19.2.7`
- `react-dom`: `^19.2.7`
- `react-hook-form`: `^7.77.0`
- `react-query-kit`: `^3.3.4`

Mantener estos peers si ya estan presentes:
- `clsx`: `^2.1.1`
- `ky`: `^2.0.2`
- `zod`: `^4.4.3`

No hay cambios de API publica detectados en `lkd-web-kit` para este upgrade: no hay renombres de componentes, props, parametros, hooks, utilidades ni exports que debas migrar.

Aun asi, despues de instalar dependencias:
1. Ejecuta el install correspondiente del proyecto.
2. Ejecuta `npm run lint`, `npm run test` y `npm run build` si existen.
3. Corrige solo errores causados por el upgrade.
4. Valida especialmente pantallas con Mantine, formularios con React Hook Form, queries con TanStack React Query, listas virtualizadas y cualquier pagina Next afectada.
5. Reporta dependencias actualizadas, archivos modificados, validaciones ejecutadas y cualquier bloqueo.
```
