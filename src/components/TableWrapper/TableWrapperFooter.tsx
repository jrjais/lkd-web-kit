import clsx from 'clsx'
import { ComponentProps } from 'react'

export type TableWrapperFooterProps = ComponentProps<'footer'>

const TableWrapperFooter = ({ className, ...props }: TableWrapperFooterProps) => (
  <footer className={clsx('mt-3 flex justify-center p-2', className)} {...props} />
)

export default TableWrapperFooter
