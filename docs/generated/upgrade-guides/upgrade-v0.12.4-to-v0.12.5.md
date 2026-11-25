# Upgrade v0.12.4 to v0.12.5

## Resumen

- Navbar incorpora pathPrefix para prefijar href y activePaths de forma consistente, sin duplicar prefijos ni modificar la configuración original.
- DashboardNavItem y NavItems admiten match exact/section por elemento; NavigationMatch se exporta como tipo.
- NavItems corrige activeStrategy includes: compara descendientes por segmentos. Revisar Inicio y cualquier consumidor que dependiera del marcado accidental anterior.

## Dependencias a actualizar

- lkd-web-kit: 0.12.5 (versión exacta).
- Peers: sin cambios respecto de 0.12.4, incluidos Mantine ^9.8.2, React y Next. Conservar los rangos actuales compatibles; no actualizar otros paquetes por esta guía.

## Cambios de API o comportamiento

Antes: el consumidor debía prefijar href y activePaths con el idioma antes de enviarlos al dashboard.
Después: pasar pathPrefix="/es-ar" a LKDDashboardLayout.Navbar y mantener href/activePaths originales. No combinar dos transformaciones manuales. Enlaces ya prefijados no se duplican; enlaces externos permanecen intactos y no se activan automáticamente.

Antes: todos los elementos del dashboard usaban coincidencia por sección; NavItems tenía una comparación includes invertida.
Después: match="section" reconoce ruta y descendientes por segmento; match="exact" reconoce únicamente la ruta. El valor predeterminado es section; la raíz siempre se compara exactamente. En NavItems, activeStrategy equals/includes permanece y match lo sobrescribe por elemento; isActive explícito conserva prioridad.

Acción: usar match: 'exact' en Inicio cuando deba representar una página concreta. Conservar activePaths para relaciones que no son descendientes del href; usa el match del elemento. Un hijo activo mantiene al padre activo. Query/hash/barras finales se ignoran al comparar y se preservan en enlaces. pathPrefix debe ser una ruta local que empiece por /, sin query/hash.

Ejemplo:
```tsx
const navigation = [{
  label: 'Principal',
  items: [
    { label: 'Inicio', href: '/admin/panel', match: 'exact' as const },
    { label: 'Clientes', href: '/clientes', activePaths: ['/cliente'] },
  ],
}]

<LKDDashboardLayout.Navbar navigation={navigation} pathPrefix={`/${locale}`} />
```

No hay renombres ni eliminaciones de exports. Header 56 px, navbar 200 px y burgerProps permanecen iguales.

## Cambios requeridos por dependencias peer

No se esperan cambios de peers. Validar los rangos instalados sin introducir actualizaciones ajenas.

## Prompt para IA del proyecto consumidor

Actualiza lkd-web-kit de 0.12.4 a 0.12.5. Lee AGENTS.md, package.json, lockfile y documentación local. Revisa compatibilidad de peers (sin cambios requeridos). Busca con rg los usos de LKDDashboardLayout.Navbar, NavItems, activeStrategy, activePaths y transformaciones de idioma. Sustituye el prefijado manual por pathPrefix en Navbar; conserva agrupación, permisos y rutas originales. Usa match exact para Inicio y section para listas con detalle. Revisa explícitamente el comportamiento corregido de NavItems.includes. No copies helpers internos ni regeneres skills locales si se usa marketplace. Ejecuta npm install, npm run lint, npm run test y npm run build; reporta archivos, cambios, validaciones y bloqueos. No comitees ni publiques el consumidor sin autorización.

Registro: 2026-11-24T22:39:57-04:00 (America/La_Paz). Codex/OpenAI, modelo no verificado; usuario SO hugo\hugos (fuente: whoami).
