import clsx from 'clsx'
import { ComponentProps } from 'react'

export type TableWrapperHeaderProps = ComponentProps<'header'>

const TableWrapperHeader = ({ className, ...props }: TableWrapperHeaderProps) => (
  <header className={clsx('p-2', className)} {...props} />
)

export default TableWrapperHeader
