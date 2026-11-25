import { describe, expect, it } from 'vitest'
import { matchesNavigationPath, prefixNavigationPath } from './navigation-paths'

describe('navigation paths', () => {
  it.each([
    ['/clientes?tab=1#datos', '/es-ar/', '/es-ar/clientes?tab=1#datos'],
    ['/es-ar/clientes', '/es-ar', '/es-ar/clientes'],
    ['/es-arbol', '/es-ar', '/es-ar/es-arbol'],
    ['/', '/es-ar', '/es-ar/'],
    ['/clientes', '/', '/clientes'],
    ['/clientes', '', '/clientes'],
    ['https://example.com/clientes', '/es-ar', 'https://example.com/clientes'],
    ['//example.com/clientes', '/es-ar', '//example.com/clientes'],
    ['mailto:test@example.com', '/es-ar', 'mailto:test@example.com'],
  ])('prefixes %s with %s', (href, prefix, expected) => {
    expect(prefixNavigationPath(href, prefix)).toBe(expected)
  })

  it.each([
    ['/clientes/42', '/clientes', 'section', '', true],
    ['/clientes/42', '/clientes', 'exact', '', false],
    ['/clientes', '/clientes/42', 'section', '', false],
    ['/clientela', '/cliente', 'section', '', false],
    ['/clientes/', '/clientes?tab=1#datos', 'exact', '', true],
    ['/es-ar/resumen/hoy', '/resumen', 'section', '/es-ar', true],
    ['/es-ar', '/', 'section', '/es-ar', true],
    ['/es-ar/clientes', '/', 'section', '/es-ar', false],
    ['/clientes', '/', 'section', '', false],
    ['/es-ar/clientes', '/es-ar', 'section', '/es-ar', false],
    ['/clientes', 'https://example.com/clientes', 'section', '', false],
    ['/clientes', '//example.com/clientes', 'section', '', false],
  ] as const)('matches %s against %s (%s)', (pathname, href, match, prefix, expected) => {
    expect(matchesNavigationPath(pathname, href, match, prefix)).toBe(expected)
  })

  it.each(['es-ar', '//example.com', '/es-ar?tab=1', '/es-ar#menu'])(
    'rejects invalid prefix %s',
    (prefix) => {
      expect(() => prefixNavigationPath('/clientes', prefix)).toThrow('pathPrefix')
    },
  )
})
