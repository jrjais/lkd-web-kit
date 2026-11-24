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
import type { LKDDashboardLayoutStylesNames } from './LKDDashboardLayout'
import { useLKDDashboardLayoutContext } from './LKDDashboardLayout.context'

export interface LKDDashboardLayoutMainProps
  extends BoxProps,
    Omit<CompoundStylesApiProps<LKDDashboardLayoutMainFactory>, 'vars'>,
    ElementProps<'main'> {}
export type LKDDashboardLayoutMainFactory = Factory<{
  props: LKDDashboardLayoutMainProps
  ref: HTMLElement
  stylesNames: LKDDashboardLayoutStylesNames
  compound: true
}>
export const LKDDashboardLayoutMain = factory<LKDDashboardLayoutMainFactory>((_props) => {
  const { className, style, classNames, styles, ...others } = useProps(
    'LKDDashboardLayoutMain',
    {},
    _props,
  )
  const { getStyles } = useLKDDashboardLayoutContext()
  return (
    <AppShell.Main {...getStyles('main', { className, style, classNames, styles })} {...others} />
  )
})

LKDDashboardLayoutMain.displayName = 'lkd-web-kit/LKDDashboardLayoutMain'
