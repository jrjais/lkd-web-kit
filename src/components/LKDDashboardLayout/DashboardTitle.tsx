'use client'

import {
  Box,
  type BoxProps,
  type ElementProps,
  type Factory,
  factory,
  Group,
  type StylesApiProps,
  useProps,
  useStyles,
} from '@mantine/core'
import type { ReactNode } from 'react'

export interface DashboardTitleProps
  extends BoxProps,
    StylesApiProps<DashboardTitleFactory>,
    ElementProps<'header', 'title'> {
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
}
export type DashboardTitleStylesNames = 'root' | 'body' | 'title' | 'description' | 'action'
export type DashboardTitleFactory = Factory<{
  props: DashboardTitleProps
  ref: HTMLElement
  stylesNames: DashboardTitleStylesNames
}>

const classes = {
  root: 'mb-5 flex w-full flex-wrap items-center justify-between gap-3',
  body: 'min-w-0',
  title: 'm-0 font-semibold text-2xl leading-tight text-[var(--mantine-color-text)]',
  description: 'mt-1.5 text-sm leading-relaxed text-[var(--mantine-color-dimmed)]',
  action: 'flex shrink-0 flex-wrap items-center gap-2',
}

export const DashboardTitle = factory<DashboardTitleFactory>((_props) => {
  const props = useProps('DashboardTitle', {}, _props)
  const {
    title,
    description,
    action,
    children,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    attributes,
    ...others
  } = props
  const getStyles = useStyles<DashboardTitleFactory>({
    name: 'DashboardTitle',
    classes,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    attributes,
  })
  return (
    <Box component="header" {...getStyles('root')} {...others}>
      <Box {...getStyles('body')}>
        <h1 {...getStyles('title')}>{title}</h1>
        {description ? <Box {...getStyles('description')}>{description}</Box> : null}
      </Box>
      {action ? <Group {...getStyles('action')}>{action}</Group> : null}
      {children}
    </Box>
  )
})

DashboardTitle.displayName = 'lkd-web-kit/DashboardTitle'
DashboardTitle.classes = classes
