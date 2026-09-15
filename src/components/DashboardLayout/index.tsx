'use client'

import { AppShell, Box, Burger, Group, ScrollArea, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { MouseEvent, ReactNode } from 'react'
import { useMemo, useState } from 'react'
import { MyTextInput } from '../MyTextInput'
import { NavItems, type NavItemsProps } from '../NavItems'

export { DashboardContent, type DashboardContentProps } from './DashboardContent'
export { DashboardTitle, type DashboardTitleProps } from './DashboardTitle'

export interface DashboardNavItem {
  key?: string
  label: string
  href?: string
  onClick?: (event: MouseEvent<Element>) => void
  icon?: ReactNode
  rightSection?: ReactNode
  disabled?: boolean
  activePaths?: readonly string[]
  children?: readonly DashboardNavItem[]
}

export interface DashboardNavSection {
  key?: string
  label: string
  items: readonly DashboardNavItem[]
}

export interface DashboardSearchConfig {
  ariaLabel?: string
  placeholder?: string
  emptyMessage?: string
  icon?: ReactNode
}

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

export interface DashboardLayoutProps {
  children: ReactNode
  navigation: readonly DashboardNavSection[]
  brand?: ReactNode
  brandHref?: string
  headerActions?: ReactNode
  userMenu?: ReactNode
  navbarFooter?: ReactNode
  search?: DashboardSearchConfig | false
  classNames?: DashboardLayoutClassNames
  labels?: DashboardLayoutLabels
}

export const DashboardLayout = ({
  children,
  navigation,
  brand,
  brandHref,
  headerActions,
  userMenu,
  navbarFooter,
  search = false,
  classNames,
  labels,
}: DashboardLayoutProps) => {
  const [mobileOpened, { close: closeMobile, toggle: toggleMobile }] = useDisclosure()
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true)
  const pathname = usePathname()
  const [query, setQuery] = useState('')
  const sections = useMemo(() => filterSections(navigation, query), [navigation, query])
  const brandContent =
    brand && brandHref ? (
      <Link className="inline-flex h-full w-fit items-center" href={brandHref}>
        {brand}
      </Link>
    ) : (
      brand
    )

  return (
    <AppShell
      header={{ height: 64 }}
      navbar={{
        width: 272,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      className={clsx('min-h-dvh', classNames?.root)}
    >
      <AppShell.Header
        className={clsx('flex h-16 items-center justify-between px-4 md:px-5', classNames?.header)}
      >
        <Group className={clsx('h-full gap-3', classNames?.headerStart)} wrap="nowrap">
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
        <Group className={clsx('h-full gap-2', classNames?.headerEnd)} wrap="nowrap">
          {headerActions}
          {userMenu}
        </Group>
      </AppShell.Header>

      <AppShell.Navbar className={classNames?.navbar}>
        <Stack className="h-full gap-0">
          {search ? (
            <Box className={clsx('px-4 py-3', classNames?.search)}>
              <MyTextInput
                aria-label={search.ariaLabel ?? 'Buscar en el menú'}
                leftSection={search.icon}
                onChange={(event) => setQuery(event.currentTarget.value)}
                placeholder={search.placeholder ?? 'Buscar módulo o pantalla'}
                size="xs"
                value={query}
              />
            </Box>
          ) : null}

          <ScrollArea
            className={clsx('min-h-0 flex-1', classNames?.navigation)}
            scrollbarSize={5}
            type="auto"
          >
            <Stack className="gap-6 px-2 pt-1 pb-6">
              {sections.map((section) => (
                <Box className={classNames?.section} key={section.key ?? section.label}>
                  <p
                    className={clsx(
                      'mb-1.5 px-2.5 font-extrabold text-[0.625rem] text-gray-600 uppercase tracking-[0.085em]',
                      classNames?.sectionLabel,
                    )}
                  >
                    {section.label}
                  </p>
                  <NavItems
                    items={section.items.map((item) =>
                      toNavItem(item, pathname, closeMobile, classNames?.navItem),
                    )}
                  />
                </Box>
              ))}

              {sections.length === 0 ? (
                <p
                  className={clsx(
                    'px-2 py-8 text-center font-semibold text-gray-600 text-sm',
                    classNames?.emptyMessage,
                  )}
                >
                  {search
                    ? (search.emptyMessage ?? 'Sin resultados')
                    : (labels?.emptyNavigation ?? 'Sin elementos')}
                </p>
              ) : null}
            </Stack>
          </ScrollArea>

          {navbarFooter ? (
            <footer
              className={clsx('border-gray-200 border-t bg-gray-50 p-3', classNames?.navbarFooter)}
            >
              {navbarFooter}
            </footer>
          ) : null}
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main className={classNames?.main}>{children}</AppShell.Main>
    </AppShell>
  )
}

const filterSections = (
  sections: readonly DashboardNavSection[],
  query: string,
): DashboardNavSection[] => {
  const normalizedQuery = normalize(query)
  if (!normalizedQuery) return [...sections]

  return sections.flatMap((section) => {
    const items = normalize(section.label).includes(normalizedQuery)
      ? [...section.items]
      : filterItems(section.items, normalizedQuery)
    return items.length ? [{ ...section, items }] : []
  })
}

const filterItems = (items: readonly DashboardNavItem[], query: string): DashboardNavItem[] =>
  items.flatMap((item) => {
    if (normalize(item.label).includes(query)) return [item]
    const children = item.children ? filterItems(item.children, query) : []
    return children.length ? [{ ...item, children }] : []
  })

const normalize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('es')

const routeMatches = (pathname: string, route: string) => {
  const normalizedRoute = route !== '/' ? route.replace(/\/$/, '') : route
  return (
    pathname === normalizedRoute ||
    (normalizedRoute !== '/' && pathname.startsWith(`${normalizedRoute}/`))
  )
}

const toNavItem = (
  item: DashboardNavItem,
  pathname: string,
  closeMobile: () => void,
  className?: string,
): NavItemsProps['items'][number] => {
  const children = item.children?.map((child) => toNavItem(child, pathname, closeMobile, className))
  const isActive = Boolean(
    (item.href && routeMatches(pathname, item.href)) ||
      item.activePaths?.some((path) => routeMatches(pathname, path)) ||
      children?.some((child) => child.isActive),
  )
  const onClick = (event: MouseEvent<Element>) => {
    item.onClick?.(event)
    if (!event.defaultPrevented) closeMobile()
  }

  return {
    key: item.key,
    label: item.label,
    href: item.href,
    leftSection: item.icon,
    rightSection: item.rightSection,
    disabled: item.disabled,
    className: clsx(
      'my-px min-h-9 rounded-lg py-1.5 font-medium text-[0.8125rem] hover:bg-gray-50 data-active:bg-orange-50 data-active:font-bold data-active:text-orange-600',
      className,
    ),
    isActive,
    onClick,
    children: children?.length ? <NavItems items={children} /> : undefined,
  }
}
