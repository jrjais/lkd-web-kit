import { MantineProvider } from '@mantine/core'
import { fireEvent, render, screen, within } from '@testing-library/react'
import type { ComponentProps, ReactNode } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { DashboardContent, DashboardLayout, type DashboardNavSection, DashboardTitle } from '.'

let pathname = '/crm/clientes/42'

vi.mock('next/navigation', () => ({
  usePathname: () => pathname,
}))

vi.mock('next/link', () => ({
  default: ({ children, onClick, ...props }: ComponentProps<'a'>) => (
    <a
      {...props}
      onClick={(event) => {
        onClick?.(event)
        event.preventDefault()
      }}
    >
      {children}
    </a>
  ),
}))

vi.stubGlobal(
  'ResizeObserver',
  class {
    observe = vi.fn()
    unobserve = vi.fn()
    disconnect = vi.fn()
  },
)

const navigation: readonly DashboardNavSection[] = [
  {
    label: 'Gestión comercial',
    items: [
      { key: 'customers', href: '/crm/clientes', label: 'Clientes' },
      {
        href: '/reportes',
        label: 'Reportes',
        children: [{ href: '/panel', label: 'Panel diario', activePaths: ['/resumen'] }],
      },
    ],
  },
  {
    label: 'Sistema',
    items: [
      { label: 'Acción local', onClick: vi.fn() },
      { disabled: true, label: 'Deshabilitado' },
    ],
  },
]

const renderLayout = (props: Partial<Parameters<typeof DashboardLayout>[0]> = {}) =>
  render(
    <MantineProvider>
      <DashboardLayout navigation={navigation} {...props}>
        <main>Contenido</main>
      </DashboardLayout>
    </MantineProvider>,
  )

describe('DashboardLayout', () => {
  beforeEach(() => {
    pathname = '/crm/clientes/42'
  })

  it('renderiza slots y marca rutas activas por segmento', () => {
    renderLayout({
      brand: <span>Marca</span>,
      brandHref: '/inicio',
      headerActions: <button type="button">Alertas</button>,
      userMenu: <button type="button">Usuario</button>,
      navbarFooter: <span>Pie</span>,
    })

    expect(screen.getByRole('link', { name: 'Marca' })).toHaveAttribute('href', '/inicio')
    expect(screen.getByRole('button', { name: 'Alertas' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Usuario' })).toBeInTheDocument()
    expect(screen.getByText('Pie')).toBeInTheDocument()
    expect(screen.getByText('Contenido')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Clientes' })).toHaveAttribute('data-active', 'true')
  })

  it('no confunde prefijos textuales y admite activePaths', () => {
    pathname = '/crm/clientela'
    const { rerender } = renderLayout()
    expect(screen.getByRole('link', { name: 'Clientes' })).not.toHaveAttribute('data-active')

    pathname = '/resumen/hoy'
    rerender(
      <MantineProvider>
        <DashboardLayout navigation={navigation}>Contenido</DashboardLayout>
      </MantineProvider>,
    )
    expect(screen.getByRole('link', { name: 'Panel diario', hidden: true })).toHaveAttribute(
      'data-active',
      'true',
    )
  })

  it('administra ambos burgers y cierra mobile al navegar', () => {
    renderLayout({ labels: { openMenu: 'Menú móvil', toggleMenu: 'Menú de escritorio' } })
    const mobile = screen.getByRole('button', { name: 'Menú móvil' })
    const desktop = screen.getByRole('button', { name: 'Menú de escritorio' })

    expect(mobile).toHaveAttribute('aria-expanded', 'false')
    expect(desktop).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(mobile)
    fireEvent.click(desktop)
    expect(mobile).toHaveAttribute('aria-expanded', 'true')
    expect(desktop).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(screen.getByRole('link', { name: 'Clientes' }))
    expect(mobile).toHaveAttribute('aria-expanded', 'false')
  })

  it('ejecuta acciones y conserva items deshabilitados', () => {
    const onClick = vi.fn()
    renderLayout({
      navigation: [{ label: 'Acciones', items: [{ label: 'Ejecutar', onClick }] }],
    })

    fireEvent.click(screen.getByRole('button', { name: 'Ejecutar' }))
    expect(onClick).toHaveBeenCalledOnce()

    renderLayout()
    expect(screen.getByRole('button', { name: 'Deshabilitado' })).toHaveAttribute(
      'data-disabled',
      'true',
    )
  })

  it('filtra sin distinguir acentos y conserva una sección coincidente completa', () => {
    renderLayout({ search: {} })
    const searchInput = screen.getByRole('textbox', { name: 'Buscar en el menú' })

    fireEvent.change(searchInput, { target: { value: 'gestion' } })
    expect(screen.getByRole('link', { name: 'Clientes' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Reportes' })).toBeInTheDocument()

    fireEvent.change(searchInput, { target: { value: 'diario' } })
    expect(screen.queryByRole('link', { name: 'Clientes' })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Panel diario', hidden: true })).toBeInTheDocument()
  })

  it('muestra textos de búsqueda configurables y estado vacío', () => {
    renderLayout({
      search: {
        ariaLabel: 'Filtrar navegación',
        placeholder: 'Buscar opción',
        emptyMessage: 'No hay coincidencias',
        icon: <span>Icono</span>,
      },
    })
    const input = screen.getByRole('textbox', { name: 'Filtrar navegación' })
    expect(input).toHaveAttribute('placeholder', 'Buscar opción')
    expect(screen.getByText('Icono')).toBeInTheDocument()
    fireEvent.change(input, { target: { value: 'inexistente' } })
    expect(screen.getByText('No hay coincidencias')).toBeInTheDocument()
  })

  it('combina classNames públicos con los estilos predeterminados', () => {
    const { container } = renderLayout({
      classNames: {
        root: 'root-extra',
        header: 'header-extra',
        navbarFooter: 'footer-extra',
      },
      navbarFooter: 'Pie',
    })

    expect(container.querySelector('.root-extra')).toBeInTheDocument()
    expect(container.querySelector('.header-extra')).toBeInTheDocument()
    expect(container.querySelector('.footer-extra')).toBeInTheDocument()
  })
})

describe('DashboardContent y DashboardTitle', () => {
  const renderWithMantine = (node: ReactNode) => render(<MantineProvider>{node}</MantineProvider>)

  it('mantienen semántica, contenido flexible y props HTML', () => {
    renderWithMantine(
      <DashboardContent aria-label="Área principal" className="contenido-extra">
        <DashboardTitle
          action={<button type="button">Crear</button>}
          className="titulo-extra"
          description={<span>Descripción</span>}
          title={<span>Panel</span>}
        />
      </DashboardContent>,
    )

    const content = screen.getByRole('region', { name: 'Área principal' })
    expect(content.tagName).toBe('SECTION')
    expect(content).toHaveClass('w-full', 'p-4', 'contenido-extra')
    const heading = screen.getByRole('heading', { name: 'Panel' })
    expect(heading).toBeInTheDocument()
    expect(within(content).getByText('Descripción')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Crear' })).toBeInTheDocument()
    expect(heading.closest('header')).toHaveClass('titulo-extra')
  })
})
