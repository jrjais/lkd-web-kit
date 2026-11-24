'use client'

import {
  AppShell,
  type AppShellProps,
  type BoxProps,
  type ElementProps,
  type Factory,
  factory,
  type MantineBreakpoint,
  type StylesApiProps,
  useProps,
  useStyles,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import type { ReactNode } from 'react'
import { DashboardPage } from './DashboardPage'
import { DashboardTitle } from './DashboardTitle'
import { LKDDashboardLayoutProvider } from './LKDDashboardLayout.context'
import { LKDDashboardLayoutHeader } from './LKDDashboardLayoutHeader'
import { LKDDashboardLayoutMain } from './LKDDashboardLayoutMain'
import { LKDDashboardLayoutNavbar } from './LKDDashboardLayoutNavbar'

export interface LKDDashboardLayoutClassNames {
  root?: string
  header?: string
  headerStart?: string
  headerEnd?: string
  navbar?: string
  search?: string
  navigation?: string
  section?: string
  sectionLabel?: string
  navItem?: string
  emptyMessage?: string
  navbarFooter?: string
  main?: string
}

export interface LKDDashboardLayoutLabels {
  openMenu?: string
  toggleMenu?: string
  emptyNavigation?: string
}

export type LKDDashboardLayoutHeaderConfig = Partial<
  Pick<NonNullable<AppShellProps['header']>, 'height' | 'offset'>
>

export type LKDDashboardLayoutNavbarConfig = Partial<
  Pick<NonNullable<AppShellProps['navbar']>, 'width'>
> & { breakpoint?: MantineBreakpoint }

export interface LKDDashboardLayoutProps
  extends BoxProps,
    StylesApiProps<LKDDashboardLayoutFactory>,
    ElementProps<'div'> {
  children: ReactNode
  header?: LKDDashboardLayoutHeaderConfig
  navbar?: LKDDashboardLayoutNavbarConfig
  labels?: LKDDashboardLayoutLabels
}

export type LKDDashboardLayoutStylesNames = keyof LKDDashboardLayoutClassNames

export type LKDDashboardLayoutFactory = Factory<{
  props: LKDDashboardLayoutProps
  ref: HTMLDivElement
  stylesNames: LKDDashboardLayoutStylesNames
  staticComponents: {
    Header: typeof LKDDashboardLayoutHeader
    Navbar: typeof LKDDashboardLayoutNavbar
    Main: typeof LKDDashboardLayoutMain
    Page: typeof DashboardPage
    Title: typeof DashboardTitle
  }
}>

const classes = {
  header: 'flex items-center justify-between px-4 md:px-5',
  headerStart: 'h-full gap-3',
  headerEnd: 'h-full gap-2',
  search: 'px-4 py-3',
  navigation: 'min-h-0 flex-1',
  sectionLabel:
    'mb-1.5 px-2.5 font-extrabold text-[0.625rem] text-[var(--mantine-color-dimmed)] uppercase tracking-[0.085em]',
  emptyMessage: 'px-2 py-8 text-center font-semibold text-[var(--mantine-color-dimmed)] text-sm',
  navbarFooter:
    'border-[var(--mantine-color-default-border)] border-t bg-[var(--mantine-color-default-hover)] p-3',
  root: 'min-h-dvh',
  navItem: 'my-px min-h-9 rounded-lg py-1.5 font-medium text-[0.8125rem] data-active:font-bold',
  navbar: '',
  main: '',
  section: '',
}

export const LKDDashboardLayout = factory<LKDDashboardLayoutFactory>((_props) => {
  const props = useProps('LKDDashboardLayout', {}, _props)
  const {
    children,
    header,
    navbar,
    labels,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    attributes,
    ...others
  } = props
  const navbarBreakpoint = navbar?.breakpoint ?? 'sm'
  const [mobileOpened, { close: closeMobile, toggle: toggleMobile }] = useDisclosure()
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true)
  const getStyles = useStyles<LKDDashboardLayoutFactory>({
    name: 'LKDDashboardLayout',
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
    <LKDDashboardLayoutProvider
      value={{
        getStyles,
        navbarBreakpoint,
        mobileOpened,
        desktopOpened,
        toggleMobile,
        toggleDesktop,
        closeMobile,
        labels,
      }}
    >
      <AppShell
        header={{ height: header?.height ?? 56, offset: header?.offset ?? true }}
        navbar={{
          width: navbar?.width ?? 200,
          breakpoint: navbarBreakpoint,
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
        {...getStyles('root')}
        {...others}
      >
        {children}
      </AppShell>
    </LKDDashboardLayoutProvider>
  )
})

LKDDashboardLayout.displayName = 'lkd-web-kit/LKDDashboardLayout'
LKDDashboardLayout.classes = classes
LKDDashboardLayout.Header = LKDDashboardLayoutHeader
LKDDashboardLayout.Navbar = LKDDashboardLayoutNavbar
LKDDashboardLayout.Main = LKDDashboardLayoutMain
LKDDashboardLayout.Page = DashboardPage
LKDDashboardLayout.Title = DashboardTitle
