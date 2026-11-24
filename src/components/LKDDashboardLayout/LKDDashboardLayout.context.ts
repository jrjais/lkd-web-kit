'use client'

import { createSafeContext, type GetStylesApi, type MantineBreakpoint } from '@mantine/core'
import type {
  LKDDashboardLayoutFactory,
  LKDDashboardLayoutLabels,
  LKDDashboardLayoutStylesNames,
} from './LKDDashboardLayout'
import type { LKDDashboardLayoutHeaderProps } from './LKDDashboardLayoutHeader'

export const [LKDDashboardLayoutProvider, useLKDDashboardLayoutContext] = createSafeContext<{
  getStyles: GetStylesApi<LKDDashboardLayoutFactory>
  navbarBreakpoint: MantineBreakpoint
  mobileOpened: boolean
  desktopOpened: boolean
  toggleMobile: () => void
  toggleDesktop: () => void
  closeMobile: () => void
  labels?: LKDDashboardLayoutLabels
}>('LKDDashboardLayout compound components must be rendered inside LKDDashboardLayout')

export function usePartStyles(
  selector: LKDDashboardLayoutStylesNames,
  {
    className,
    style,
    classNames,
    styles,
  }: Pick<LKDDashboardLayoutHeaderProps, 'className' | 'style' | 'classNames' | 'styles'>,
): GetStylesApi<LKDDashboardLayoutFactory> {
  const { getStyles } = useLKDDashboardLayoutContext()
  return (part) =>
    getStyles(part, {
      classNames,
      styles,
      ...(part === selector ? { className, style } : {}),
    })
}
