'use client'

import {
  AppShell,
  type BoxProps,
  Burger,
  type BurgerProps,
  type CompoundStylesApiProps,
  type ElementProps,
  type Factory,
  factory,
  Group,
  useProps,
} from '@mantine/core'
import Link from 'next/link'
import type { ReactNode } from 'react'
import type { LKDDashboardLayoutStylesNames } from './LKDDashboardLayout'
import { useLKDDashboardLayoutContext, usePartStyles } from './LKDDashboardLayout.context'

export type LKDDashboardLayoutBurgerProps = Pick<
  BurgerProps,
  | 'color'
  | 'size'
  | 'lineSize'
  | 'transitionDuration'
  | 'transitionTimingFunction'
  | 'className'
  | 'classNames'
  | 'style'
  | 'styles'
  | 'vars'
  | 'unstyled'
>

export interface LKDDashboardLayoutHeaderProps
  extends BoxProps,
    Omit<CompoundStylesApiProps<LKDDashboardLayoutHeaderFactory>, 'vars'>,
    ElementProps<'header'> {
  burgerProps?: LKDDashboardLayoutBurgerProps
  brand?: ReactNode
  brandHref?: string
  headerActions?: ReactNode
  userMenu?: ReactNode
}
export type LKDDashboardLayoutHeaderFactory = Factory<{
  props: LKDDashboardLayoutHeaderProps
  ref: HTMLElement
  stylesNames: LKDDashboardLayoutStylesNames
  compound: true
}>
export const LKDDashboardLayoutHeader = factory<LKDDashboardLayoutHeaderFactory>((_props) => {
  const {
    burgerProps,
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
  } = useProps('LKDDashboardLayoutHeader', {}, _props)
  const { mobileOpened, desktopOpened, toggleMobile, toggleDesktop, labels, navbarBreakpoint } =
    useLKDDashboardLayoutContext()
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
          size="sm"
          {...burgerProps}
          aria-label={labels?.openMenu ?? 'Abrir menú'}
          aria-expanded={mobileOpened}
          hiddenFrom={navbarBreakpoint}
          opened={mobileOpened}
          onClick={toggleMobile}
        />
        <Burger
          size="sm"
          {...burgerProps}
          aria-label={labels?.toggleMenu ?? 'Alternar menú'}
          aria-expanded={desktopOpened}
          visibleFrom={navbarBreakpoint}
          opened={desktopOpened}
          onClick={toggleDesktop}
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

LKDDashboardLayoutHeader.displayName = 'lkd-web-kit/LKDDashboardLayoutHeader'
