'use client';
import { NavLink, Stack } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MouseEvent, ReactNode } from 'react';

export interface NavItemsProps {
  items: {
    leftSection?: ReactNode;
    rightSection?: ReactNode;
    onClick?: (e: MouseEvent<Element>) => void;
    disabled?: boolean;
    className?: string;
    children?: ReactNode;
    label: string;

    // custom props
    href?: string;
    isActive?: boolean;
  }[];
}

export const NavItems = ({ items }: NavItemsProps) => {
  const pathname = usePathname();

  return (
    <Stack gap={0}>
      {items.map(({ href, isActive, ...navLinkProps }) => {
        if (href) {
          const active = isActive ?? href.includes(pathname);
          return (
            <NavLink
              active={active}
              key={navLinkProps.label}
              component={Link}
              prefetch={false}
              href={href}
              {...navLinkProps}
            />
          );
        }

        return (
          <NavLink
            key={navLinkProps.label}
            active={isActive}
            component="button"
            {...navLinkProps}
          />
        );
      })}
    </Stack>
  );
};
