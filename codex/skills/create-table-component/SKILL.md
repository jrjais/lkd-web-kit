---
name: create-table-component
description: Crear, extraer o refactorizar tablas/listados tabulares en proyectos internos usando el patron estricto de componente encapsulado con MyTable, TableWrapper y createColumnHelper. Usar cuando Codex deba mostrar datos en tabla, mover columnas/hook de servicio a un componente de tabla, agregar paginacion, header/footer de tabla, acciones por fila, tablas verticales o adaptar una vista para no usar MyTablePagination.
---

# Create Table Component

Usar este skill para crear o refactorizar tablas del proyecto.

## Workflow obligatorio

1. Leer primero `docs/local-components.md` y `docs/lkd-web-kit.md`.
2. Si toca Next.js, leer la documentacion relevante en `node_modules/next/dist/docs/`.
3. Revisar un ejemplo cercano antes de editar; preferir `Table{EntityPlural}.tsx`.
4. Crear o mantener la tabla en un componente encapsulado junto a la vista/feature que la consume.
5. Usar `createColumnHelper<RowData>()`; no declarar `any`.
6. Usar `MyTable` para renderizar la tabla.
7. Usar `TableWrapper` como raiz visual de la tabla.
8. No usar `MyTablePagination` para nuevas tablas.

## Checklist antes de escribir columnas

- Definir si la tabla es horizontal o `variant="vertical"`.
- Definir que representa cada header: solo deben ser columnas/campos reales de la tabla.
- Distinguir contenido superior/inferior de estructura tabular: titulos, subtitulos, emails, filtros, secciones y acciones van en `TableWrapperHeader`/`TableWrapperFooter`, no en columnas falsas.
- Definir si la data representa registros completos o pares label/value. Para `variant="vertical"`, preferir registros completos con campos reales.

## Decisiones que hay que preguntar

Si el usuario no lo especifica y no se puede inferir del codigo cercano, preguntar:

- Si la tabla lleva contenido arriba de la tabla.
- Si la tabla lleva contenido abajo de la tabla.
- Si la tabla lleva paginacion.
- Si la tabla debe ser horizontal o `variant="vertical"`.

No asumir que `TableWrapperHeader` implica titulo. Usarlo para cualquier contenido superior: titulo, filtros, acciones, botones, tabs, resumen, subtitulo, email o encabezado de seccion.

No asumir que `TableWrapperFooter` implica paginacion. Usarlo para cualquier contenido inferior: paginacion, totales, leyendas, acciones o resumen.

Si hay titulo, usar `TableWrapperTitle` dentro de `TableWrapperHeader`.

Si hay paginacion, usar `TableWrapperPagination` dentro de `TableWrapperFooter`.

## Paginacion

- Usar `TableWrapperPagination`, nunca `MyTablePagination` en tablas nuevas.
- Usar `variant="short"` para paginacion compacta con texto tipo `1-10 de 15 filas`; queda alineada a la derecha por defecto.
- Para `variant="short"`, pasar siempre `pageSize`. Si los datos vienen async, usar un fallback estable como `pageSize={currentPage?.pageSize ?? 10}`.
- No armar el texto de rango en la vista si alcanza con metadata: pasar `totalRows`, `pageSize` y `currentRows`.
- Usar `text` solo como override manual del texto calculado.
- Mantener `variant="long"` o sin `variant` para la paginacion completa.

## Tablas verticales

Para `MyTable variant="vertical"`, modelar los campos como columnas reales y la data como una fila/registro completo. Los nombres de campos van en `column.header`; los valores van en `column.cell`.

No simular una tabla vertical con una columna `entry`, `{ field, value }` o un `grid` dentro de una celda.

Ejemplo:

```tsx
type UserInformationRow = {
  name: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
};

const columnHelper = createColumnHelper<UserInformationRow>();

const columns = [
  columnHelper.accessor("name", {
    header: "Nombre",
    cell: (cell) => cell.getValue() ?? "-",
  }),
  columnHelper.accessor("lastName", {
    header: "Apellido",
    cell: (cell) => cell.getValue() ?? "-",
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: (cell) => cell.getValue() ?? "-",
  }),
];

<TableWrapper>
  <TableWrapperHeader>
    <TableWrapperTitle>Informacion del usuario</TableWrapperTitle>
    <span>{user.email}</span>
    <div>Datos personales</div>
  </TableWrapperHeader>
  <MyTable columns={columns} data={[user]} variant="vertical" />
</TableWrapper>;
```

## Encapsulacion

- Mover `columns` al componente `Table{EntityPlural}`.
- Si la tabla consulta datos, mover el hook/servicio al componente de tabla.
- Si la tabla pagina, mover `pageIndex` y `setPageIndex` al componente de tabla.
- El padre solo debe pasar entradas externas reales: filtros ya aplicados, ids, callbacks o flags.
- Al cambiar filtros externos, resetear la pagina dentro del componente de tabla con `useEffect` si aplica.

## Patron base

```tsx
"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import MyTable from "src/components/ui/MyTable";
import TableWrapper, {
  TableWrapperFooter,
  TableWrapperHeader,
  TableWrapperPagination,
  TableWrapperTitle,
} from "src/components/ui/TableWrapper";

type ItemTableData = {
  id: string;
  name: string;
};

type TableItemsProps = {
  selectedFilters: Record<string, unknown>;
};

const columnHelper = createColumnHelper<ItemTableData>();

const TableItems = ({ selectedFilters }: TableItemsProps) => {
  const [pageIndex, setPageIndex] = useState(0);

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Nombre",
        cell: (cell) => cell.getValue(),
      }),
    ],
    [],
  );

  return (
    <TableWrapper>
      <TableWrapperHeader>
        <TableWrapperTitle>Items</TableWrapperTitle>
      </TableWrapperHeader>
      <MyTable columns={columns} data={[]} />
      <TableWrapperFooter>
        <TableWrapperPagination
          total={1}
          value={pageIndex + 1}
          onChange={(page) => setPageIndex(page - 1)}
        />
      </TableWrapperFooter>
    </TableWrapper>
  );
};

export default TableItems;
```

Ejemplo short:

```tsx
<TableWrapperPagination
  variant="short"
  total={pageData?.total.pages ?? 1}
  value={(pageData?.currentPage.pageIndex ?? 0) + 1}
  totalRows={pageData?.total.elements}
  pageSize={pageData?.currentPage.pageSize ?? 10}
  currentRows={pageData?.currentPage.elements}
  onChange={(page) => setPageIndex(page - 1)}
/>;
```

## Antipatrones

- No dejar columnas o hooks de servicio de la tabla en la vista padre.
- No crear wrappers nuevos si `TableWrapper` y `MyTable` alcanzan.
- No usar `Paper` directamente para la tabla cuando el patron pide `TableWrapper`.
- No usar `MyTablePagination` en codigo nuevo.
- No usar `paginationVariant` ni `paginationText` en `TableWrapperPagination`; usar `variant` y `text`.
- No calcular `1-10 de 15 filas` en la vista si `TableWrapperPagination` puede calcularlo.
- No agregar abstracciones compartidas antes de tener reutilizacion real.
- No crear `MyTableVertical` si `MyTable variant="vertical"` resuelve el caso.
- No poner titulos de seccion como "Datos personales" o "Informacion del usuario" como headers de columna.
