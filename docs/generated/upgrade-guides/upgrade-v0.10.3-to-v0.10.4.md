# Upgrade v0.10.3 to v0.10.4

## Resumen

- `Container` de Mantine queda configurado desde `myDefaultTheme`.
- Se agregan tamanos custom para `Container`: `xs`, `sm`, `md`, `lg` y `xl`.
- `Container` usa por defecto `size="xl"` y `px="md"`.
- Riesgo esperado: bajo; revisar wrappers locales de `Container` y reemplazarlos por `@mantine/core`.

## Dependencias a actualizar

- `lkd-web-kit`: `0.10.4`
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

Los rangos peer no cambian respecto de `0.10.3`.

## Cambios de API o comportamiento

- Antes: proyectos consumidores solian definir wrappers locales para anchos de `Container`.
- Despues: `Container` de `@mantine/core` ya recibe defaults desde `createLkdTheme`.
- Accion requerida en consumidores: reemplazar wrappers locales equivalentes por `Container` de `@mantine/core`.

- Antes: el ancho default local de aestrenar era equivalente a `1652px`.
- Despues: `Container` usa `size="xl"` por defecto, donde `xl = 1652px`.
- Accion requerida en consumidores: no agregar `size` si se quiere conservar el ancho default.

- Antes: algunos wrappers podian exponer `size="full"`.
- Despues: usar la prop nativa `fluid` de `Container`.
- Accion requerida en consumidores: reemplazar `size="full"` por `fluid`.

## Cambios requeridos por dependencias peer

No hay cambios esperados por dependencias peer. Mantener los rangos actuales y ejecutar las validaciones del proyecto consumidor.

## Prompt para IA del proyecto consumidor

Lee `package.json`, lockfile, `AGENTS.md` y documentacion local del proyecto. Actualiza `lkd-web-kit` a `0.10.4` y conserva los peers en los rangos indicados en esta guia. Busca usos afectados con `rg "src/components/ui/Container|Container.*src/components/ui|size=\\\"full\\\"|size='full'"`. Reemplaza wrappers locales de `Container` por `Container` de `@mantine/core`; si el wrapper usaba `as`, reemplazalo por `component`; si usaba `size="full"`, reemplazalo por `fluid`. Mantene los usos sin `size` para conservar el default `xl = 1652px`. Ejecuta `npm install`, `npm run lint`, `npm run test` y `npm run build`. Reporta cambios aplicados, archivos modificados, validaciones y bloqueos.
