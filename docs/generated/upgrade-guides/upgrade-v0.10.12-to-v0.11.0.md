# Upgrade v0.10.12 to v0.11.0

## Resumen

- Actualiza peers principales, incluyendo Next.js `^16.3.0`, Mantine `^9.5.1` y TanStack Table `^9.0.1`.
- Migra `MyTable` a TanStack Table v9.
- Agrega soporte para columnas sticky/pinned mediante la prop `pinnedColumns`.

## Dependencias a actualizar

- `lkd-web-kit`: `0.11.0`
- `@tanstack/react-table`: `^9.0.1`
- `@tanstack/react-virtual`: `^3.14.9`
- `@tanstack/react-query`: `^5.101.4`
- `next`: `^16.3.0`
- `@mantine/core`: `^9.5.1`
- `@mantine/dates`: `^9.5.1`
- `@mantine/hooks`: `^9.5.1`
- `@mantine/notifications`: `^9.5.1`
- `ky`: `^2.0.2`
- `react-hook-form`: `^7.84.0`
- `zod`: `^4.4.3`

Peers relevantes sin cambios funcionales:

- `react`: `^19.2.8`
- `react-dom`: `^19.2.8`
- `clsx`: `^2.1.1`
- `dayjs`: `^1.11.21`
- `react-query-kit`: `^3.3.4`

## Cambios de API o comportamiento

- `MyTable` ahora expone `pinnedColumns?: Partial<ColumnPinningState>`.
- Para fijar una columna de acciones a la derecha logica, usa `pinnedColumns={{ end: ["actions"] }}`.
- TanStack Table v9 usa posiciones logicas `start` y `end`; no uses `left` y `right` en configuracion nueva.
- Las columnas sticky necesitan un `id` estable. Para acciones, usa `id: "actions"`.
- Define `size` en columnas sticky compactas para mantener offsets y ancho consistentes.
- Si tipas columnas con TanStack, importa `MyTableFeatures` desde `lkd-web-kit` y usa `createColumnHelper<MyTableFeatures, Row>()`.

Ejemplo:

```tsx
import { createColumnHelper } from '@tanstack/react-table'
import { MyTable, type MyTableFeatures } from 'lkd-web-kit'

type Row = {
  id: string
  name: string
}

const columnHelper = createColumnHelper<MyTableFeatures, Row>()

const columns = columnHelper.columns([
  columnHelper.accessor('name', {
    header: 'Nombre',
  }),
  columnHelper.display({
    id: 'actions',
    header: '',
    cell: () => null,
    size: 96,
  }),
])

export function UsersTable({ data }: { data: Row[] }) {
  return <MyTable columns={columns} data={data} pinnedColumns={{ end: ['actions'] }} />
}
```

## Cambios requeridos por TanStack Table v9

- Si el consumidor solo usa `MyTable`, normalmente basta con actualizar dependencias y, si corresponde, pasar `pinnedColumns`.
- Si el consumidor usa APIs directas de TanStack Table, migra los usos v8 a v9:
  - `useReactTable` pasa a `useTable`.
  - `getSortedRowModel` pasa a `tableFeatures({ rowSortingFeature, sortedRowModel: createSortedRowModel() })`.
  - `getCoreRowModel` ya no se configura manualmente.
  - `ColumnPinningState` usa `start` y `end`.

## Prompt para IA del proyecto consumidor

```text
Lee package.json, lockfile, AGENTS.md y la documentacion local del proyecto.

Actualiza lkd-web-kit a 0.11.0 y asegura que los peers cumplan:
- @tanstack/react-table ^9.0.1
- @tanstack/react-virtual ^3.14.9
- @tanstack/react-query ^5.101.4
- next ^16.3.0
- @mantine/core, @mantine/dates, @mantine/hooks y @mantine/notifications ^9.5.1
- ky ^2.0.2
- react-hook-form ^7.84.0
- zod ^4.4.3

Busca usos afectados con rg:
rg "MyTable|createColumnHelper|@tanstack/react-table|useReactTable|getSortedRowModel|getCoreRowModel|columnPinning|pinnedColumns|left|right"

Aplica estos cambios:
- En tablas con columna de acciones sticky, asegura que la columna tenga id "actions" y size estable.
- Pasa pinnedColumns={{ end: ["actions"] }} a MyTable cuando la columna de acciones deba quedar fija.
- Si tipas columnas TanStack, usa createColumnHelper<MyTableFeatures, Row>() e importa MyTableFeatures desde lkd-web-kit.
- Migra APIs directas de TanStack Table v8 a v9 solo donde existan.

Ejecuta npm install, npm run lint, npm run test y npm run build.

Reporta cambios aplicados, archivos modificados, validaciones ejecutadas y bloqueos.
```
