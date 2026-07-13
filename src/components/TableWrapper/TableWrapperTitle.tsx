import clsx from 'clsx'
import { ComponentProps } from 'react'

export type TableWrapperTitleProps = ComponentProps<'p'>

const TableWrapperTitle = ({ className, ...props }: TableWrapperTitleProps) => (
  <p className={clsx('font-semibold text-lg', className)} {...props} />
)

export default TableWrapperTitle
