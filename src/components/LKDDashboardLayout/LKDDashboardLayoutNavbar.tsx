'use client'

import {
  AppShell,
  Box,
  type BoxProps,
  type CompoundStylesApiProps,
  type ElementProps,
  type Factory,
  factory,
  ScrollArea,
  Stack,
  useProps,
} from '@mantine/core'
import { usePathname } from 'next/navigation'
import { type CSSProperties, type MouseEvent, type ReactNode, useMemo, useState } from 'react'
import { MyTextInput } from '../MyTextInput'
import { NavItems, type NavItemsProps } from '../NavItems'
import {
  matchesNavigationPath,
  type NavigationMatch,
  prefixNavigationPath,
} from '../navigation-paths'
import type { LKDDashboardLayoutStylesNames } from './LKDDashboardLayout'
import { useLKDDashboardLayoutContext, usePartStyles } from './LKDDashboardLayout.context'

export interface DashboardNavItem {
  key?: string
  label: string
  href?: string
  onClick?: (event: MouseEvent<Element>) => void
  icon?: ReactNode
  rightSection?: ReactNode
  disabled?: boolean
  activePaths?: readonly string[]
  match?: NavigationMatch
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

export interface LKDDashboardLayoutNavbarProps
  extends BoxProps,
    Omit<CompoundStylesApiProps<LKDDashboardLayoutNavbarFactory>, 'vars'>,
    ElementProps<'div'> {
  navigation: readonly DashboardNavSection[]
  pathPrefix?: string
  search?: DashboardSearchConfig | false
  navbarFooter?: ReactNode
}
export type LKDDashboardLayoutNavbarFactory = Factory<{
  props: LKDDashboardLayoutNavbarProps
  ref: HTMLDivElement
  stylesNames: LKDDashboardLayoutStylesNames
  compound: true
}>
export const LKDDashboardLayoutNavbar = factory<LKDDashboardLayoutNavbarFactory>((_props) => {
  const {
    navigation,
    pathPrefix = '',
    search = false,
    navbarFooter,
    children,
    className,
    style,
    classNames,
    styles,
    ...others
  } = useProps('LKDDashboardLayoutNavbar', {}, _props)
  const { closeMobile, labels } = useLKDDashboardLayoutContext()
  const getStyles = usePartStyles('navbar', { className, style, classNames, styles })
  const pathname = usePathname()
  const [query, setQuery] = useState('')
  const sections = useMemo(() => filterSections(navigation, query), [navigation, query])
  return (
    <AppShell.Navbar {...getStyles('navbar')} {...others}>
      <Stack className="h-full gap-0">
        {search ? (
          <Box {...getStyles('search')}>
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

        <ScrollArea {...getStyles('navigation')} scrollbarSize={5} type="auto">
          <Stack className="gap-6 px-2 pt-1 pb-6">
            {sections.map((section) => (
              <Box {...getStyles('section')} key={section.key ?? section.label}>
                <p {...getStyles('sectionLabel')}>{section.label}</p>
                <NavItems
                  items={section.items.map((item) =>
                    toNavItem(item, pathname, closeMobile, getStyles('navItem'), pathPrefix),
                  )}
                />
              </Box>
            ))}

            {sections.length === 0 ? (
              <p {...getStyles('emptyMessage')}>
                {search
                  ? (search.emptyMessage ?? 'Sin resultados')
                  : (labels?.emptyNavigation ?? 'Sin elementos')}
              </p>
            ) : null}
          </Stack>
        </ScrollArea>

        {children}
        {navbarFooter ? <footer {...getStyles('navbarFooter')}>{navbarFooter}</footer> : null}
      </Stack>
    </AppShell.Navbar>
  )
})

LKDDashboardLayoutNavbar.displayName = 'lkd-web-kit/LKDDashboardLayoutNavbar'

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

const toNavItem = (
  item: DashboardNavItem,
  pathname: string,
  closeMobile: () => void,
  itemStyles: { className: string; style: CSSProperties },
  pathPrefix: string,
): NavItemsProps['items'][number] => {
  const children = item.children?.map((child) =>
    toNavItem(child, pathname, closeMobile, itemStyles, pathPrefix),
  )
  const isActive = Boolean(
    (item.href && matchesNavigationPath(pathname, item.href, item.match, pathPrefix)) ||
      item.activePaths?.some((path) =>
        matchesNavigationPath(pathname, path, item.match, pathPrefix),
      ) ||
      children?.some((child) => child.isActive),
  )
  const onClick = (event: MouseEvent<Element>) => {
    item.onClick?.(event)
    if (!event.defaultPrevented) closeMobile()
  }

  return {
    key: item.key,
    label: item.label,
    href: item.href ? prefixNavigationPath(item.href, pathPrefix) : undefined,
    leftSection: item.icon,
    rightSection: item.rightSection,
    disabled: item.disabled,
    ...itemStyles,
    isActive,
    onClick,
    children: children?.length ? <NavItems items={children} /> : undefined,
  }
}
