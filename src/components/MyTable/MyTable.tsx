'use client'

import { ActionIcon, LoadingOverlay, Table, TableProps, Text, Tooltip } from '@mantine/core'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Header,
  OnChangeFn,
  Row,
  SortingState,
  TableOptions,
  useReactTable,
} from '@tanstack/react-table'
import clsx from 'clsx'
import { ComponentProps, ReactNode, useCallback, useState } from 'react'

export interface MyTableProps<T> extends Omit<TableProps, 'data'> {
  data: T[]
  columns: TableOptions<T>['columns']
  isLoading?: boolean
  onRowClick?: (row: Row<T>) => void
  minWidth?: number
  emptyMessage?: ReactNode
  enableSorting?: boolean
  manualSorting?: boolean
  onSortingChange?: OnChangeFn<SortingState>
  sorting?: SortingState
}

const MyTable = <T,>({
  data,
  columns,
  highlightOnHover,
  isLoading,
  onRowClick,
  minWidth = 720,
  emptyMessage = 'Sin datos',
  enableSorting,
  variant,
  layout,
  manualSorting,
  onSortingChange,
  sorting,
  ...props
}: MyTableProps<T>) => {
  const [theadHeight, setTheadHeight] = useState(0)
  const setTheadRef = useCallback((node: HTMLTableSectionElement | null) => {
    if (node) setTheadHeight(node.offsetHeight)
  }, [])
  const isSortingEnabled = enableSorting ?? (Boolean(sorting) || Boolean(onSortingChange))
  const table = useReactTable<T>({
    data,
    columns: columns as ColumnDef<T, unknown>[],
    enableSorting: isSortingEnabled,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: isSortingEnabled && !manualSorting ? getSortedRowModel() : undefined,
    manualSorting,
    onSortingChange,
    state: sorting ? { sorting } : undefined,
  })
  const rows = table.getRowModel().rows
  const isVertical = variant === 'vertical'
  const headersByColumnId = new Map(
    table.getFlatHeaders().map((header) => [header.column.id, header]),
  )
  const cellClassName = clsx(onRowClick && 'cursor-pointer')

  const renderHeaderContent = (header: Header<T, unknown>) => {
    const content = flexRender(header.column.columnDef.header, header.getContext())

    if (!isSortingEnabled || !header.column.getCanSort()) return content

    const sorted = header.column.getIsSorted()
    const sortLabel = sorted === 'asc' ? 'Orden ascendente' : 'Orden descendente'

    return (
      <span className="flex items-center gap-1">
        <button
          className="whitespace-nowrap font-semibold text-grey-9 text-sm"
          onClick={header.column.getToggleSortingHandler()}
          type="button"
        >
          {content}
        </button>
        {sorted ? (
          <Tooltip label={sortLabel}>
            <ActionIcon
              aria-label={sortLabel}
              onClick={header.column.getToggleSortingHandler()}
              size="sm"
              variant="subtle"
            >
              {sorted === 'asc' ? (
                <IconOrderAscending aria-hidden="true" className="size-4" />
              ) : (
                <IconOrderDescending aria-hidden="true" className="size-4" />
              )}
            </ActionIcon>
          </Tooltip>
        ) : null}
      </span>
    )
  }

  return (
    <Table.ScrollContainer minWidth={minWidth} className="relative">
      <LoadingOverlay
        visible={isLoading}
        loaderProps={{ type: 'bars' }}
        overlayProps={{ backgroundOpacity: 0.35 }}
        style={{ top: isVertical ? 0 : theadHeight }}
      />
      <Table
        variant={variant}
        layout={layout ?? (isVertical ? 'fixed' : undefined)}
        highlightOnHover={!isLoading && highlightOnHover}
        {...props}
      >
        {isVertical ? null : (
          <Table.Thead ref={setTheadRef}>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.Th key={header.id}>
                    {header.isPlaceholder ? null : renderHeaderContent(header)}
                  </Table.Th>
                ))}
              </Table.Tr>
            ))}
          </Table.Thead>
        )}
        <Table.Tbody>
          {rows.length === 0 && isLoading && (
            <Table.Tr aria-hidden="true">
              <Table.Td colSpan={isVertical ? 2 : columns.length} className="py-5">
                &nbsp;
              </Table.Td>
            </Table.Tr>
          )}
          {isVertical
            ? rows.flatMap((row) =>
                row.getVisibleCells().map((cell) => {
                  const header = headersByColumnId.get(cell.column.id)

                  return (
                    <Table.Tr key={cell.id}>
                      <Table.Th>
                        {header?.isPlaceholder || !header
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </Table.Th>
                      <Table.Td onClick={() => onRowClick?.(cell.row)} className={cellClassName}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </Table.Td>
                    </Table.Tr>
                  )
                }),
              )
            : rows.map((row) => (
                <Table.Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Table.Td
                      key={cell.id}
                      onClick={() => onRowClick?.(cell.row)}
                      className={cellClassName}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Table.Td>
                  ))}
                </Table.Tr>
              ))}
          {rows.length === 0 && !isLoading && (
            <Table.Tr>
              <Table.Td colSpan={isVertical ? 2 : columns.length} className="py-5">
                <Text c="dimmed" size="sm" ta="center">
                  {emptyMessage}
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  )
}

const IconOrderAscending = (props: ComponentProps<'svg'>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11 5.25C11.4142 5.25 11.75 5.58579 11.75 6C11.75 6.41421 11.4142 6.75 11 6.75H4C3.58579 6.75 3.25 6.41421 3.25 6C3.25 5.58579 3.58579 5.25 4 5.25H11Z"
      fill="currentColor"
    />
    <path
      d="M11 11.25C11.4142 11.25 11.75 11.5858 11.75 12C11.75 12.4142 11.4142 12.75 11 12.75H4C3.58579 12.75 3.25 12.4142 3.25 12C3.25 11.5858 3.58579 11.25 4 11.25H11Z"
      fill="currentColor"
    />
    <path
      d="M13 17.25C13.4142 17.25 13.75 17.5858 13.75 18C13.75 18.4142 13.4142 18.75 13 18.75H4C3.58579 18.75 3.25 18.4142 3.25 18C3.25 17.5858 3.58579 17.25 4 17.25H13Z"
      fill="currentColor"
    />
    <path
      d="M17.5264 5.41796C17.821 5.17765 18.2557 5.19512 18.5303 5.46972L21.5303 8.46972C21.8232 8.76261 21.8232 9.23738 21.5303 9.53027C21.2374 9.82316 20.7626 9.82316 20.4697 9.53027L18 7.06054L15.5303 9.53027C15.2374 9.82316 14.7626 9.82316 14.4697 9.53027C14.1768 9.23738 14.1768 8.76261 14.4697 8.46972L17.4697 5.46972L17.5264 5.41796Z"
      fill="currentColor"
    />
    <path
      d="M17.25 18V6C17.25 5.58579 17.5858 5.25 18 5.25C18.4142 5.25 18.75 5.58579 18.75 6V18C18.75 18.4142 18.4142 18.75 18 18.75C17.5858 18.75 17.25 18.4142 17.25 18Z"
      fill="currentColor"
    />
  </svg>
)

const IconOrderDescending = (props: ComponentProps<'svg'>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13 5.25C13.4142 5.25 13.75 5.58579 13.75 6C13.75 6.41421 13.4142 6.75 13 6.75H4C3.58579 6.75 3.25 6.41421 3.25 6C3.25 5.58579 3.58579 5.25 4 5.25H13Z"
      fill="currentColor"
    />
    <path
      d="M11 11.25C11.4142 11.25 11.75 11.5858 11.75 12C11.75 12.4142 11.4142 12.75 11 12.75H4C3.58579 12.75 3.25 12.4142 3.25 12C3.25 11.5858 3.58579 11.25 4 11.25H11Z"
      fill="currentColor"
    />
    <path
      d="M11 17.25C11.4142 17.25 11.75 17.5858 11.75 18C11.75 18.4142 11.4142 18.75 11 18.75H4C3.58579 18.75 3.25 18.4142 3.25 18C3.25 17.5858 3.58579 17.25 4 17.25H11Z"
      fill="currentColor"
    />
    <path
      d="M20.4697 14.4697C20.7626 14.1768 21.2374 14.1768 21.5303 14.4697C21.8232 14.7626 21.8232 15.2374 21.5303 15.5303L18.5303 18.5303C18.2374 18.8232 17.7626 18.8232 17.4697 18.5303L14.4697 15.5303C14.1768 15.2374 14.1768 14.7626 14.4697 14.4697C14.7626 14.1768 15.2374 14.1768 15.5303 14.4697L18 16.9395L20.4697 14.4697Z"
      fill="currentColor"
    />
    <path
      d="M17.25 18V6C17.25 5.58579 17.5858 5.25 18 5.25C18.4142 5.25 18.75 5.58579 18.75 6V18C18.75 18.4142 18.4142 18.75 18 18.75C17.5858 18.75 17.25 18.4142 17.25 18Z"
      fill="currentColor"
    />
  </svg>
)

export default MyTable
