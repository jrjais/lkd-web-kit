'use client'
import { NavLink, Stack } from '@mantine/core'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Key, MouseEvent, ReactNode } from 'react'

export interface NavItemsProps {
  items: {
    key?: Key
    leftSection?: ReactNode
    rightSection?: ReactNode
    onClick?: (e: MouseEvent<Element>) => void
    disabled?: boolean
    className?: string
    children?: ReactNode
    label: string

    // custom props
    href?: string
    isActive?: boolean
  }[]
  activeStrategy?: 'equals' | 'includes'
}

export const NavItems = ({ items, activeStrategy = 'includes' }: NavItemsProps) => {
  const pathname = usePathname()

  return (
    <Stack gap={0}>
      {items.map(({ href, isActive, key, ...navLinkProps }) => {
        if (href) {
          const active =
            isActive ?? (activeStrategy === 'equals' ? href === pathname : href.includes(pathname))
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
