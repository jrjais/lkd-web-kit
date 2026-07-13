import { Pagination, PaginationProps } from '@mantine/core'

type TableWrapperPaginationBaseProps = Omit<
  PaginationProps,
  'boundaries' | 'siblings' | 'withControls' | 'withEdges' | 'variant'
> & {
  text?: string
  totalRows?: number
  currentRows?: number
}

export type TableWrapperPaginationProps =
  | (TableWrapperPaginationBaseProps & {
      variant?: 'long'
      pageSize?: number
    })
  | (TableWrapperPaginationBaseProps & {
      variant: 'short'
      pageSize: number
    })

const TableWrapperPagination = ({
  variant = 'long',
  text,
  totalRows = 15,
  pageSize = 10,
  currentRows = pageSize,
  value = 1,
  ...props
}: TableWrapperPaginationProps) => {
  if (variant === 'short') {
    const start = totalRows > 0 ? (value - 1) * pageSize + 1 : 0
    const end = Math.min(start + currentRows - 1, totalRows)

    return (
      <div className="flex w-full items-center justify-end gap-3">
        <span className="text-grey-7 text-sm">
          {text ?? `${start}-${end} de ${totalRows} filas`}
        </span>
        <Pagination withPages={false} value={value} {...props} />
      </div>
    )
  }

  return (
    <Pagination
      boundaries={0}
      siblings={2}
      withEdges
      classNames={{ dots: 'hidden' }}
      value={value}
      {...props}
    />
  )
}

export default TableWrapperPagination
