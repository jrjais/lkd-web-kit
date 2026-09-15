import clsx from 'clsx'
import type { ComponentPropsWithRef, ReactNode } from 'react'

export interface DashboardTitleProps extends Omit<ComponentPropsWithRef<'header'>, 'title'> {
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
}

export const DashboardTitle = ({
  title,
  description,
  action,
  className,
  ...props
}: DashboardTitleProps) => (
  <header
    className={clsx('mb-5 flex w-full flex-wrap items-center justify-between gap-3', className)}
    {...props}
  >
    <div className="min-w-0">
      <h1 className="m-0 font-semibold text-2xl leading-tight text-slate-950">{title}</h1>
      {description ? (
        <div className="mt-1.5 text-sm leading-relaxed text-slate-600">{description}</div>
      ) : null}
    </div>
    {action ? <div className="flex shrink-0 flex-wrap items-center gap-2">{action}</div> : null}
  </header>
)
