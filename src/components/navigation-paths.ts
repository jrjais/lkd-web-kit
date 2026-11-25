export type NavigationMatch = 'exact' | 'section'

const isLocalPath = (value: string) =>
  value.startsWith('/') && !value.startsWith('//') && !value.includes('\\')

const pathnameOf = (value: string) => value.split(/[?#]/, 1)[0].replace(/\/+$/, '') || '/'

const normalizePrefix = (prefix: string) => {
  if (!prefix || prefix === '/') return ''
  if (!isLocalPath(prefix) || /[?#]/.test(prefix)) {
    throw new Error('pathPrefix must be a root-relative path without query or hash')
  }
  return pathnameOf(prefix)
}

export const prefixNavigationPath = (href: string, pathPrefix = '') => {
  const prefix = normalizePrefix(pathPrefix)
  if (!prefix || !isLocalPath(href)) return href
  const pathname = pathnameOf(href)
  if (pathname === prefix || pathname.startsWith(`${prefix}/`)) return href
  return `${prefix}${href}`
}

export const matchesNavigationPath = (
  pathname: string,
  href: string,
  match: NavigationMatch = 'section',
  pathPrefix = '',
): boolean => {
  if (!isLocalPath(pathname) || !isLocalPath(href)) return false
  const prefix = normalizePrefix(pathPrefix)
  const route = pathnameOf(prefixNavigationPath(href, prefix))
  const current = pathnameOf(pathname)
  const rootRoute = pathnameOf(href) === '/' || route === prefix
  return (
    current === route ||
    (match === 'section' && route !== '/' && !rootRoute && current.startsWith(`${route}/`))
  )
}
