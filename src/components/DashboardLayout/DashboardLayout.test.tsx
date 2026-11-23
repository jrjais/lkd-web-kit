import { createTheme, MantineProvider } from '@mantine/core'
import { fireEvent, render, screen, within } from '@testing-library/react'
import { type ComponentProps, createRef, type ReactNode } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { DashboardLayout, type DashboardNavSection, DashboardPage, DashboardTitle } from '.'

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

describe('DashboardLayout compuesto', () => {
  it('compone las partes y comparte el estado del menú sin duplicar el shell', () => {
    const rootRef = createRef<HTMLDivElement>()
    const navbarRef = createRef<HTMLDivElement>()
    render(
      <MantineProvider>
        <DashboardLayout ref={rootRef}>
          <DashboardLayout.Header brand="Marca compuesta">Acciones</DashboardLayout.Header>
          <DashboardLayout.Navbar navigation={navigation} search={{}} ref={navbarRef} />
          <DashboardLayout.Main>
            <DashboardLayout.Page>
              <DashboardLayout.Title title="Panel compuesto" />
            </DashboardLayout.Page>
          </DashboardLayout.Main>
        </DashboardLayout>
      </MantineProvider>,
    )
    expect(rootRef.current).toContainElement(navbarRef.current)
    expect(screen.getAllByRole('main')).toHaveLength(1)
    expect(screen.getByRole('heading', { name: 'Panel compuesto' })).toBeInTheDocument()
    const burger = screen.getByRole('button', { name: 'Abrir menú' })
    fireEvent.click(burger)
    expect(burger).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(screen.getByRole('link', { name: 'Clientes' }))
    expect(burger).toHaveAttribute('aria-expanded', 'false')
    fireEvent.change(screen.getByRole('textbox', { name: 'Buscar en el menú' }), {
      target: { value: 'diario' },
    })
    expect(screen.queryByRole('link', { name: 'Clientes' })).not.toBeInTheDocument()
  })

  it('integra extend, estilos del tema, estilos locales y unstyled', () => {
    const theme = createTheme({
      components: {
        DashboardLayout: DashboardLayout.extend({
          classNames: { header: 'tema-header' },
          styles: { navItem: { color: 'rgb(1, 2, 3)' } },
        }),
      },
    })
    const { container } = render(
      <MantineProvider theme={theme}>
        <DashboardLayout unstyled>
          <DashboardLayout.Header className="local-header" />
          <DashboardLayout.Navbar
            navigation={navigation}
            classNames={{ sectionLabel: 'local-label' }}
          />
          <DashboardLayout.Main style={{ padding: 12 }}>Contenido</DashboardLayout.Main>
        </DashboardLayout>
      </MantineProvider>,
    )
    expect(container.querySelector('.tema-header')).toHaveClass('local-header')
    expect(container.querySelector('.tema-header')).not.toHaveClass('h-16')
    expect(container.querySelector('.local-label')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Clientes' })).toHaveStyle({ color: 'rgb(1, 2, 3)' })
    expect(screen.getByRole('link', { name: 'Clientes' })).not.toHaveClass('my-px')
    expect(screen.getByRole('main')).toHaveStyle({ padding: '12px' })
  })

  it('exige un padre para las partes que comparten contexto', () => {
    expect(() =>
      render(
        <MantineProvider>
          <DashboardLayout.Main />
        </MantineProvider>,
      ),
    ).toThrow('must be rendered inside DashboardLayout')
  })
})

describe('DashboardPage y DashboardTitle', () => {
  const renderWithMantine = (node: ReactNode) => render(<MantineProvider>{node}</MantineProvider>)

  it('mantienen semántica, contenido flexible y props HTML', () => {
    renderWithMantine(
      <DashboardPage aria-label="Área principal" className="contenido-extra">
        <DashboardTitle
          action={<button type="button">Crear</button>}
          className="titulo-extra"
          description={<span>Descripción</span>}
          title={<span>Panel</span>}
        />
      </DashboardPage>,
    )

    const content = screen.getByRole('region', { name: 'Área principal' })
    expect(content.tagName).toBe('SECTION')
    expect(content).toHaveClass('contenido-extra')
    expect(content).toHaveStyle({ padding: 'calc(1rem * var(--mantine-scale))', width: '100%' })
    const heading = screen.getByRole('heading', { name: 'Panel' })
    expect(heading).toBeInTheDocument()
    expect(within(content).getByText('Descripción')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Crear' })).toBeInTheDocument()
    expect(heading.closest('header')).toHaveClass('titulo-extra')
  })
})

describe('DashboardPage y DashboardTitle: Mantine', () => {
  it('aplica defaults del tema, estilos y refs sin requerir DashboardLayout', () => {
    const pageRef = createRef<HTMLElement>()
    const titleRef = createRef<HTMLElement>()
    const theme = createTheme({
      components: {
        DashboardPage: DashboardPage.extend({
          defaultProps: { p: 24, maw: 900, mx: 'auto' },
          classNames: { root: 'theme-page' },
        }),
        DashboardTitle: DashboardTitle.extend({
          classNames: { title: 'theme-title' },
          styles: { description: { color: 'rgb(1, 2, 3)' } },
        }),
      },
    })
    render(
      <MantineProvider theme={theme}>
        <DashboardPage ref={pageRef} p={0}>
          <DashboardTitle
            ref={titleRef}
            title="Panel"
            description="Detalle"
            classNames={{ action: 'local-action' }}
            action={<button type="button">Crear</button>}
          />
        </DashboardPage>
      </MantineProvider>,
    )
    expect(pageRef.current).toHaveClass('theme-page')
    expect(pageRef.current).toHaveStyle({ padding: '0rem' })
    expect(pageRef.current).toHaveStyle({
      maxWidth: 'calc(56.25rem * var(--mantine-scale))',
      marginInline: 'auto',
    })
    expect(titleRef.current?.tagName).toBe('HEADER')
    expect(screen.getByRole('heading', { name: 'Panel' })).toHaveClass('theme-title')
    expect(screen.getByText('Detalle')).toHaveStyle({ color: 'rgb(1, 2, 3)' })
    expect(screen.getByRole('button', { name: 'Crear' }).parentElement).toHaveClass('local-action')
  })

  it('admite padding responsive y permite quitar los estilos propios del encabezado', () => {
    const { container } = render(
      <MantineProvider env="default">
        <DashboardPage p={{ base: 0, sm: 24 }}>
          <DashboardTitle title="Panel" unstyled />
        </DashboardPage>
      </MantineProvider>,
    )
    expect(container.querySelector('section')).not.toHaveClass('p-4')
    expect(
      Array.from(container.querySelectorAll('style'))
        .map((style) => style.textContent)
        .join(''),
    ).toContain('padding:')
    expect(screen.getByRole('heading', { name: 'Panel' })).not.toHaveClass('text-2xl')
  })
})
