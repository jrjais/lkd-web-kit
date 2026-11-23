'use client'

import { createSafeContext, type GetStylesApi } from '@mantine/core'
import type {
  DashboardLayoutFactory,
  DashboardLayoutLabels,
  DashboardLayoutStylesNames,
} from './DashboardLayout'
import type { DashboardLayoutHeaderProps } from './DashboardLayoutHeader'

export const [DashboardLayoutProvider, useDashboardLayoutContext] = createSafeContext<{
  getStyles: GetStylesApi<DashboardLayoutFactory>
  mobileOpened: boolean
  desktopOpened: boolean
  toggleMobile: () => void
  toggleDesktop: () => void
  closeMobile: () => void
  labels?: DashboardLayoutLabels
}>('DashboardLayout compound components must be rendered inside DashboardLayout')

export function usePartStyles(
  selector: DashboardLayoutStylesNames,
  {
    className,
    style,
    classNames,
    styles,
  }: Pick<DashboardLayoutHeaderProps, 'className' | 'style' | 'classNames' | 'styles'>,
): GetStylesApi<DashboardLayoutFactory> {
  const { getStyles } = useDashboardLayoutContext()
  return (part) =>
    getStyles(part, {
      classNames,
      styles,
      ...(part === selector ? { className, style } : {}),
    })
}
