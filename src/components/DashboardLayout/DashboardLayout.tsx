'use client'

import {
  AppShell,
  type BoxProps,
  type ElementProps,
  type Factory,
  factory,
  type StylesApiProps,
  useProps,
  useStyles,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import type { ReactNode } from 'react'
import { DashboardLayoutProvider } from './DashboardLayout.context'
import { DashboardLayoutHeader } from './DashboardLayoutHeader'
import { DashboardLayoutMain } from './DashboardLayoutMain'
import {
  DashboardLayoutNavbar,
  type DashboardNavSection,
  type DashboardSearchConfig,
} from './DashboardLayoutNavbar'
import { DashboardPage } from './DashboardPage'
import { DashboardTitle } from './DashboardTitle'

export interface DashboardLayoutClassNames {
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

export interface DashboardLayoutLabels {
  openMenu?: string
  toggleMenu?: string
  emptyNavigation?: string
}

export interface DashboardLayoutProps
  extends BoxProps,
    StylesApiProps<DashboardLayoutFactory>,
    ElementProps<'div'> {
  children: ReactNode
  navigation?: readonly DashboardNavSection[]
  brand?: ReactNode
  brandHref?: string
  headerActions?: ReactNode
  userMenu?: ReactNode
  navbarFooter?: ReactNode
  search?: DashboardSearchConfig | false
  labels?: DashboardLayoutLabels
}

export type DashboardLayoutStylesNames = keyof DashboardLayoutClassNames

export type DashboardLayoutFactory = Factory<{
  props: DashboardLayoutProps
  ref: HTMLDivElement
  stylesNames: DashboardLayoutStylesNames
  staticComponents: {
    Header: typeof DashboardLayoutHeader
    Navbar: typeof DashboardLayoutNavbar
    Main: typeof DashboardLayoutMain
    Page: typeof DashboardPage
    Title: typeof DashboardTitle
  }
}>

const classes = {
  header: 'flex h-16 items-center justify-between px-4 md:px-5',
  headerStart: 'h-full gap-3',
  headerEnd: 'h-full gap-2',
  search: 'px-4 py-3',
  navigation: 'min-h-0 flex-1',
  sectionLabel:
    'mb-1.5 px-2.5 font-extrabold text-[0.625rem] text-gray-600 uppercase tracking-[0.085em]',
  emptyMessage: 'px-2 py-8 text-center font-semibold text-gray-600 text-sm',
  navbarFooter: 'border-gray-200 border-t bg-gray-50 p-3',
  root: 'min-h-dvh',
  navItem:
    'my-px min-h-9 rounded-lg py-1.5 font-medium text-[0.8125rem] hover:bg-gray-50 data-active:bg-orange-50 data-active:font-bold data-active:text-orange-600',
  navbar: '',
  main: '',
  section: '',
}

export const DashboardLayout = factory<DashboardLayoutFactory>((_props) => {
  const props = useProps('DashboardLayout', {}, _props)
  const {
    children,
    navigation,
    brand,
    brandHref,
    headerActions,
    userMenu,
    navbarFooter,
    search,
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
  const [mobileOpened, { close: closeMobile, toggle: toggleMobile }] = useDisclosure()
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true)
  const getStyles = useStyles<DashboardLayoutFactory>({
    name: 'DashboardLayout',
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
    <DashboardLayoutProvider
      value={{
        getStyles,
        mobileOpened,
        desktopOpened,
        toggleMobile,
        toggleDesktop,
        closeMobile,
        labels,
      }}
    >
      <AppShell
        header={{ height: 64 }}
        navbar={{
          width: 272,
          breakpoint: 'sm',
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
        {...getStyles('root')}
        {...others}
      >
        {navigation !== undefined ? (
          <>
            <DashboardLayoutHeader
              brand={brand}
              brandHref={brandHref}
              headerActions={headerActions}
              userMenu={userMenu}
            />
            <DashboardLayoutNavbar
              navigation={navigation}
              search={search}
              navbarFooter={navbarFooter}
            />
            <DashboardLayoutMain>{children}</DashboardLayoutMain>
          </>
        ) : (
          children
        )}
      </AppShell>
    </DashboardLayoutProvider>
  )
})

DashboardLayout.displayName = 'lkd-web-kit/DashboardLayout'
DashboardLayout.classes = classes
DashboardLayout.Header = DashboardLayoutHeader
DashboardLayout.Navbar = DashboardLayoutNavbar
DashboardLayout.Main = DashboardLayoutMain
DashboardLayout.Page = DashboardPage
DashboardLayout.Title = DashboardTitle
