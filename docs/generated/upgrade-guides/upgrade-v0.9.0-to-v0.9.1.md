# Upgrade v0.9.0 to v0.9.1

## Resumen

- `lkd-web-kit` sube de `0.9.0` a `0.9.1`.
- `InfinitySelect` adopta `useVirtualizedCombobox` de Mantine para mejorar navegacion por teclado en listas virtualizadas.
- Se actualizan rangos minimos compatibles de Mantine y React Hook Form.
- Riesgo esperado: bajo, centrado en validar selects infinitos, formularios y estilos Mantine en proyectos consumidores.

## Dependencias a actualizar

Actualizar estas dependencias en el proyecto consumidor:

- `lkd-web-kit`: `0.9.1`
- `@mantine/core`: `^9.3.1`
- `@mantine/dates`: `^9.3.1`
- `@mantine/hooks`: `^9.3.1`
- `@mantine/notifications`: `^9.3.1`
- `react-hook-form`: `^7.78.0`

Peers que no cambian en este release:

- `@tanstack/react-query`: `^5.101.0`
- `@tanstack/react-virtual`: `^3.14.2`
- `clsx`: `^2.1.1`
- `ky`: `^2.0.2`
- `next`: `^16.2.7`
- `react`: `^19.2.7`
- `react-dom`: `^19.2.7`
- `react-query-kit`: `^3.3.4`
- `zod`: `^4.4.3`

## Cambios de API o comportamiento

No hay cambios de API publica detectados.

- Antes: `InfinitySelect` usaba `useCombobox` con renderizado virtualizado por TanStack.
- Despues: `InfinitySelect` usa `useVirtualizedCombobox` y controla indices activos/seleccionados para que la navegacion por teclado funcione correctamente con opciones no montadas en el DOM.
- Accion requerida en consumidores: no se esperan cambios de codigo; validar flujos que usen `InfinitySelect` y `FormInfinitySelect`.

## Cambios requeridos por dependencias peer

- Mantine sube de `^9.3.0` a `^9.3.1`. No se detectaron cambios requeridos en wrappers `My*` ni componentes `Form*`; validar estilos, fechas, notificaciones y componentes que usen props nativas de Mantine.
- React Hook Form sube de `^7.77.0` a `^7.78.0`. No se esperan cambios de API para los componentes `Form*`; validar submit, errores y campos controlados.
- El resto de peers se mantiene sin cambios, por lo que no hay acciones nuevas esperadas para React, Next, TanStack, Ky, React Query Kit, clsx ni Zod.

## Prompt para IA del proyecto consumidor

```text
Necesito migrar este proyecto consumidor de `lkd-web-kit` desde v0.9.0 a v0.9.1.

Trabaja de forma cautelosa y no hagas refactors no relacionados.

Contexto obligatorio:
1. Lee `package.json`, lockfile (`package-lock.json`, `pnpm-lock.yaml` o `yarn.lock`), `AGENTS.md` si existe y la documentacion local del proyecto.
2. Busca usos de `lkd-web-kit` con `rg "lkd-web-kit|InfinitySelect|FormInfinitySelect|Form[A-Z]|My[A-Z]"`.
3. Si el proyecto tiene documentacion local de componentes o arquitectura, revisala antes de editar.

Actualiza estas dependencias:
- `lkd-web-kit`: `0.9.1`
- `@mantine/core`: `^9.3.1`
- `@mantine/dates`: `^9.3.1`
- `@mantine/hooks`: `^9.3.1`
- `@mantine/notifications`: `^9.3.1`
- `react-hook-form`: `^7.78.0`

Mantener estos peers si ya estan presentes:
- `@tanstack/react-query`: `^5.101.0`
- `@tanstack/react-virtual`: `^3.14.2`
- `clsx`: `^2.1.1`
- `ky`: `^2.0.2`
- `next`: `^16.2.7`
- `react`: `^19.2.7`
- `react-dom`: `^19.2.7`
- `react-query-kit`: `^3.3.4`
- `zod`: `^4.4.3`

No hay cambios de API publica detectados: no hay renombres de componentes, props, parametros, hooks, utilidades ni exports que debas migrar.

Aun asi, despues de instalar dependencias:
1. Ejecuta el install correspondiente del proyecto.
2. Ejecuta `npm run lint`, `npm run test` y `npm run build` si existen.
3. Corrige solo errores causados por el upgrade.
4. Valida especialmente selects infinitos, navegacion por teclado en `InfinitySelect`, formularios con React Hook Form, queries con TanStack React Query y listas virtualizadas.
5. Reporta dependencias actualizadas, archivos modificados, validaciones ejecutadas y cualquier bloqueo.
```
