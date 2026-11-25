'use client'
import { NavLink, Stack } from '@mantine/core'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { CSSProperties, Key, MouseEvent, ReactNode } from 'react'
import { matchesNavigationPath, type NavigationMatch } from './navigation-paths'

export type { NavigationMatch } from './navigation-paths'

export interface NavItemsProps {
  items: {
    key?: Key
    leftSection?: ReactNode
    rightSection?: ReactNode
    onClick?: (e: MouseEvent<Element>) => void
    disabled?: boolean
    className?: string
    style?: CSSProperties
    children?: ReactNode
    label: string

    // custom props
    href?: string
    isActive?: boolean
    match?: NavigationMatch
  }[]
  activeStrategy?: 'equals' | 'includes'
}

export const NavItems = ({ items, activeStrategy = 'includes' }: NavItemsProps) => {
  const pathname = usePathname()

  return (
    <Stack gap={0}>
      {items.map(({ href, isActive, match, key, ...navLinkProps }) => {
        if (href) {
          const active =
            isActive ??
            matchesNavigationPath(
              pathname,
              href,
              match ?? (activeStrategy === 'equals' ? 'exact' : 'section'),
            )
          return (
            <NavLink
              active={active}
              key={key ?? navLinkProps.label}
              component={Link}
              prefetch={false}
              href={href}
              {...navLinkProps}
            />
          )
        }

        return (
          <NavLink
            key={key ?? navLinkProps.label}
            active={isActive}
            component="button"
            {...navLinkProps}
          />
        )
      })}
    </Stack>
  )
}
