'use client'

import {
  AppShell,
  type BoxProps,
  Burger,
  type CompoundStylesApiProps,
  type ElementProps,
  type Factory,
  factory,
  Group,
  useProps,
} from '@mantine/core'
import Link from 'next/link'
import type { ReactNode } from 'react'
import type { DashboardLayoutStylesNames } from './DashboardLayout'
import { useDashboardLayoutContext, usePartStyles } from './DashboardLayout.context'

export interface DashboardLayoutHeaderProps
  extends BoxProps,
    Omit<CompoundStylesApiProps<DashboardLayoutHeaderFactory>, 'vars'>,
    ElementProps<'header'> {
  brand?: ReactNode
  brandHref?: string
  headerActions?: ReactNode
  userMenu?: ReactNode
}
export type DashboardLayoutHeaderFactory = Factory<{
  props: DashboardLayoutHeaderProps
  ref: HTMLElement
  stylesNames: DashboardLayoutStylesNames
  compound: true
}>
export const DashboardLayoutHeader = factory<DashboardLayoutHeaderFactory>((_props) => {
  const {
    brand,
    brandHref,
    headerActions,
    userMenu,
    children,
    className,
    style,
    classNames,
    styles,
    ...others
  } = useProps('DashboardLayoutHeader', {}, _props)
  const { mobileOpened, desktopOpened, toggleMobile, toggleDesktop, labels } =
    useDashboardLayoutContext()
  const getStyles = usePartStyles('header', { className, style, classNames, styles })
  const brandContent =
    brand && brandHref ? (
      <Link className="inline-flex h-full w-fit items-center" href={brandHref}>
        {brand}
      </Link>
    ) : (
      brand
    )
  return (
    <AppShell.Header {...getStyles('header')} {...others}>
      <Group {...getStyles('headerStart')} wrap="nowrap">
        <Burger
          aria-label={labels?.openMenu ?? 'Abrir menú'}
          aria-expanded={mobileOpened}
          hiddenFrom="sm"
          opened={mobileOpened}
          onClick={toggleMobile}
          size="sm"
        />
        <Burger
          aria-label={labels?.toggleMenu ?? 'Alternar menú'}
          aria-expanded={desktopOpened}
          visibleFrom="sm"
          opened={desktopOpened}
          onClick={toggleDesktop}
          size="sm"
        />
        {brandContent}
      </Group>
      <Group {...getStyles('headerEnd')} wrap="nowrap">
        {headerActions}
        {userMenu}
        {children}
      </Group>
    </AppShell.Header>
  )
})

DashboardLayoutHeader.displayName = 'lkd-web-kit/DashboardLayoutHeader'
