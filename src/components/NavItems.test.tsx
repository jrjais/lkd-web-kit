import { MantineProvider } from '@mantine/core'
import { render, screen } from '@testing-library/react'
import type { ComponentProps } from 'react'
import { expect, it, vi } from 'vitest'
import { NavItems } from './NavItems'

vi.mock('next/navigation', () => ({ usePathname: () => '/clientes/42' }))
vi.mock('next/link', () => ({
  default: (props: ComponentProps<'a'>) => <a {...props} />,
}))

it('uses segment descendants and respects exact matches and explicit overrides', () => {
  render(
    <MantineProvider>
      <NavItems
        items={[
          { label: 'Sección', href: '/clientes' },
          { label: 'Exacto', href: '/clientes', match: 'exact' },
          { label: 'Otro', href: '/clientes/42/extra' },
          { label: 'Inactivo', href: '/clientes', isActive: false },
          { label: 'Activo', href: '/otra', isActive: true },
        ]}
      />
    </MantineProvider>,
  )
  expect(screen.getByRole('link', { name: 'Sección' })).toHaveAttribute('data-active', 'true')
  for (const name of ['Exacto', 'Otro', 'Inactivo']) {
    expect(screen.getByRole('link', { name })).not.toHaveAttribute('data-active')
  }
  expect(screen.getByRole('link', { name: 'Activo' })).toHaveAttribute('data-active', 'true')
})

it('preserves equals strategy while allowing a per-item section match', () => {
  render(
    <MantineProvider>
      <NavItems
        activeStrategy="equals"
        items={[
          { label: 'Exacto', href: '/clientes' },
          { label: 'Sección', href: '/clientes', match: 'section' },
        ]}
      />
    </MantineProvider>,
  )
  expect(screen.getByRole('link', { name: 'Exacto' })).not.toHaveAttribute('data-active')
  expect(screen.getByRole('link', { name: 'Sección' })).toHaveAttribute('data-active', 'true')
})
