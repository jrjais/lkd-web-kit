# Upgrade v0.9.1 to v0.9.2

## Resumen

- `lkd-web-kit` sube de `0.9.1` a `0.9.2`.
- Se actualizan rangos minimos compatibles de Mantine, TanStack, Next y React Hook Form.
- `EmptyState` queda deprecado; usar `EmptyState` de `@mantine/core` en nuevos desarrollos.
- Riesgo esperado: bajo, centrado en validar estilos Mantine, formularios y consumers que usen `EmptyState`.

## Dependencias a actualizar

Actualizar estas dependencias en el proyecto consumidor:

- `lkd-web-kit`: `0.9.2`
- `@mantine/core`: `^9.4.1`
- `@mantine/dates`: `^9.4.1`
- `@mantine/hooks`: `^9.4.1`
- `@mantine/notifications`: `^9.4.1`
- `@tanstack/react-query`: `^5.101.2`
- `@tanstack/react-virtual`: `^3.14.4`
- `next`: `^16.2.9`
- `react-hook-form`: `^7.80.0`

Peers que no cambian en este release:

- `clsx`: `^2.1.1`
- `ky`: `^2.0.2`
- `react`: `^19.2.7`
- `react-dom`: `^19.2.7`
- `react-query-kit`: `^3.3.4`
- `zod`: `^4.4.3`

## Cambios de API o comportamiento

- Antes: `EmptyState` de `lkd-web-kit` estaba disponible sin aviso.
- Despues: `EmptyState` de `lkd-web-kit` esta deprecado mediante JSDoc y documentacion.
- Accion requerida en consumidores: no es obligatorio migrar de inmediato, pero los nuevos usos deben importar y usar `EmptyState` desde `@mantine/core`.

No hay renombres, eliminaciones ni cambios de props en esta version.

## Cambios requeridos por dependencias peer

- Mantine sube de `^9.3.1` a `^9.4.1`. Validar wrappers `My*`, componentes `Form*`, fechas y notificaciones.
- TanStack React Query sube de `^5.101.0` a `^5.101.2`; no se esperan cambios de API para hooks consumidores.
- TanStack React Virtual sube de `^3.14.2` a `^3.14.4`; validar listas virtualizadas e `InfinitySelect`.
- Next sube de `^16.2.7` a `^16.2.9`; validar rutas y componentes que dependan de `next/link` o `next/navigation`.
- React Hook Form sube de `^7.78.0` a `^7.80.0`; validar submit, errores y campos controlados.

## Prompt para IA del proyecto consumidor

```text
Necesito migrar este proyecto consumidor de `lkd-web-kit` desde v0.9.1 a v0.9.2.

Trabaja de forma cautelosa y no hagas refactors no relacionados.

Contexto obligatorio:
1. Lee `package.json`, lockfile (`package-lock.json`, `pnpm-lock.yaml` o `yarn.lock`), `AGENTS.md` si existe y la documentacion local del proyecto.
2. Busca usos de `lkd-web-kit` con `rg "lkd-web-kit|EmptyState|InfinitySelect|Form[A-Z]|My[A-Z]"`.
3. Si el proyecto tiene documentacion local de componentes o arquitectura, revisala antes de editar.

Actualiza estas dependencias:
- `lkd-web-kit`: `0.9.2`
- `@mantine/core`: `^9.4.1`
- `@mantine/dates`: `^9.4.1`
- `@mantine/hooks`: `^9.4.1`
- `@mantine/notifications`: `^9.4.1`
- `@tanstack/react-query`: `^5.101.2`
- `@tanstack/react-virtual`: `^3.14.4`
- `next`: `^16.2.9`
- `react-hook-form`: `^7.80.0`

Mantener estos peers si ya estan presentes:
- `clsx`: `^2.1.1`
- `ky`: `^2.0.2`
- `react`: `^19.2.7`
- `react-dom`: `^19.2.7`
- `react-query-kit`: `^3.3.4`
- `zod`: `^4.4.3`

Cambio de API/comportamiento:
- `EmptyState` de `lkd-web-kit` esta deprecado.
- Para nuevos usos, importar `EmptyState` desde `@mantine/core`.
- No migres todos los usos existentes salvo que el proyecto lo pida; solo evita agregar nuevos usos del componente deprecado.

Despues de instalar dependencias:
1. Ejecuta el install correspondiente del proyecto.
2. Ejecuta `npm run lint`, `npm run test` y `npm run build` si existen.
3. Corrige solo errores causados por el upgrade.
4. Valida especialmente formularios con React Hook Form, componentes Mantine, queries con TanStack React Query, listas virtualizadas e imports de `EmptyState`.
5. Reporta dependencias actualizadas, archivos modificados, validaciones ejecutadas y cualquier bloqueo.
```
