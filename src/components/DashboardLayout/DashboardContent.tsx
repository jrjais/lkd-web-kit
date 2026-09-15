import clsx from 'clsx'
import type { ComponentProps } from 'react'

export type DashboardContentProps = ComponentProps<'section'>

export const DashboardContent = ({ className, ...props }: DashboardContentProps) => (
  <section className={clsx('w-full p-4', className)} {...props} />
)
