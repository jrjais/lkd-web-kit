'use client'

import {
  AppShell,
  type BoxProps,
  type CompoundStylesApiProps,
  type ElementProps,
  type Factory,
  factory,
  useProps,
} from '@mantine/core'
import type { DashboardLayoutStylesNames } from './DashboardLayout'
import { useDashboardLayoutContext } from './DashboardLayout.context'

export interface DashboardLayoutMainProps
  extends BoxProps,
    Omit<CompoundStylesApiProps<DashboardLayoutMainFactory>, 'vars'>,
    ElementProps<'main'> {}
export type DashboardLayoutMainFactory = Factory<{
  props: DashboardLayoutMainProps
  ref: HTMLElement
  stylesNames: DashboardLayoutStylesNames
  compound: true
}>
export const DashboardLayoutMain = factory<DashboardLayoutMainFactory>((_props) => {
  const { className, style, classNames, styles, ...others } = useProps(
    'DashboardLayoutMain',
    {},
    _props,
  )
  const { getStyles } = useDashboardLayoutContext()
  return (
    <AppShell.Main {...getStyles('main', { className, style, classNames, styles })} {...others} />
  )
})

DashboardLayoutMain.displayName = 'lkd-web-kit/DashboardLayoutMain'
