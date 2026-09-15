# DashboardLayout reutilizable

Estado: ejecutado.

Fecha: `2026-09-14`.

## Objetivo

Incorporar a `lkd-web-kit` un shell de dashboard reusable para aplicaciones Next.js, tomando como referencia visual ITW ERP sin trasladar sus contratos, permisos, rutas, marca ni comportamiento de sesion.

## Resultado

Se agregaron `DashboardLayout`, `DashboardContent` y `DashboardTitle` como exports publicos estables. El layout administra los estados responsive de `AppShell`, recibe marca y acciones mediante slots, soporta navegacion anidada, rutas activas por segmento, busqueda opcional sin distincion de acentos, textos configurables y reemplazos de clases.

La aplicacion consumidora conserva la responsabilidad de autorización, sesion, redirecciones, logout y contenido especifico. Los estilos predeterminados usan utilities Tailwind, por lo que el consumidor debe incluir el codigo distribuido de `lkd-web-kit` en su escaneo.

`NavItems` acepta ahora una `key` estable opcional. La version local del paquete se incremento de `0.11.1` a `0.12.0`; no se publico, commiteo ni pusheo.

## Verificacion

- `npx biome check --write src/components/DashboardLayout src/components/NavItems.tsx src/components/index.ts`: correcto.
- `npm run lint`: correcto; conserva un aviso informativo preexistente por `linter.rules.recommended` en `biome.json`.
- `npm run test`: correcto, `8` pruebas aprobadas.
- Cobertura del conjunto ejecutado: `100 %` de statements, funciones y lineas; `82.6 %` de branches.
- `npm run build`: correcto; genera ESM, CJS y declaraciones publicas.
- `npm pack --dry-run --json`: correcto; paquete `lkd-web-kit@0.12.0`, `167` entradas, con los tres componentes y `dist/index.d.ts`.
- `git diff --check`: correcto; solo informa la conversion futura de LF a CRLF configurada por Git.

## Sincronizacion de estado

- `docs/generated/lkd-web-kit.md`: actualizado con la version y la nueva superficie publica.
- `docs/backlog.md`: revisado sin cambios; la tarea no correspondia a ningun pendiente registrado.
- `docs/README.md`: revisado sin cambios; ya indexa la carpeta de planes ejecutados y no mantiene un indice por archivo.
- ITW ERP, `/programa`, `docs/PENDIENTES.txt` y sus superficies de seguimiento: revisados como no aplicables porque esta ejecucion se limita a `lkd-web-kit` y no adopta el componente en el ERP.
