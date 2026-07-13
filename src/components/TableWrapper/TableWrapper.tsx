import { Paper, PaperProps } from '@mantine/core'
import clsx from 'clsx'
import { ReactNode } from 'react'

export interface TableWrapperProps extends PaperProps {
  children?: ReactNode
}

const TableWrapper = ({ className, ...props }: TableWrapperProps) => (
  <Paper component="section" className={clsx('flex flex-col px-1 py-0.5', className)} {...props} />
)

export default TableWrapper
