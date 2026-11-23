# Dashboard compuesto y actualización de peers 0.12.3

Registro: 2026-11-23T14:45:16-04:00, America/La_Paz. Autor: Codex (OpenAI), modelo no verificado; usuario SO `hugo\hugos`, fuente `whoami`. Ejecución autorizada en `main`, sin crear ramas. El usuario autorizó majors y adaptaciones y solicitó expresamente un incremento patch.

## Cambios

`DashboardLayout` usa factory, useProps, useStyles y createSafeContext de Mantine. Header, Navbar, Main, Page y Title viven en archivos propios. La búsqueda y las rutas activas siguen en Navbar. Page y Title tienen Styles API independiente y refs. Se eliminan DashboardContent, DashboardContentProps y DashboardLayout.Content.

## Auditoría de peers

Metadata consultada con npm view y el script de update-lkd-dependencies el 2026-11-23. Ocho rangos suben: Mantine core/dates/hooks/notifications 9.7.3 → 9.8.2; Query 5.104.5 → 5.108.4; Virtual 3.14.21 → 3.14.28; Next 16.4.2 → 16.4.6; RHF 7.90.0 → 7.92.0. No hay majors nuevas en las versiones estables consultadas. Engines Node no cambia. Se conservan Table, clsx, dayjs, ky, React/DOM, react-query-kit y Zod porque ya están en su última estable.

Fuentes y cruce con el código:

- [Mantine 9.8](https://mantine.dev/changelog/9-8-0/) y [9.8.2](https://github.com/mantinedev/mantine/releases/tag/9.8.2): nuevas funcionalidades opcionales y fixes; npm diff confirma que los contratos de factory, AppShell, DateInput y useDisclosure revisados no cambian. Notifications agrega autoCloseProgressPosition, accesible por MyNotifications sin código adicional. Las nuevas familias opcionales no se incorporan al kit.
- [Query 5.108.4](https://github.com/TanStack/query/releases/tag/%40tanstack/react-query%405.108.4): actualización del core; npm diff revisado de useBaseQuery cambia el orden del efecto de opciones. No requiere adaptar los hooks ni react-query-kit.
- [Virtual 3.14.28](https://github.com/TanStack/virtual/releases/tag/%40tanstack/react-virtual%403.14.28): actualización del core; npm diff de src/index.tsx conserva el contrato y corrige el dispatch al inspeccionar con DevTools y el offset horizontal de window. InfinitySelect conserva su uso de useVirtualizer.
- [Next 16.4.6](https://github.com/vercel/next.js/releases/tag/v16.4.6): fixes de Turbopack y compresión de route handlers; no cambian los imports de next/link y next/navigation del kit.
- [RHF 7.92.0](https://github.com/react-hook-form/react-hook-form/releases/tag/v7.92.0): fixes de Controller, campos, estado y validación; contrastados con withController, Form y FormSubmitButton y con los tipos del paquete. No se modifica el contrato de formularios del kit.

También se ejecutó npm diff por cada paquete actualizado; no se dependió únicamente de metadata. No se actualizaron devDependencies ni tooling.

## Validación y publicación

Lint, 13 pruebas del dashboard, build con declaraciones y npm pack --dry-run antes de publicar. Las pruebas cubren composición, menú mobile/desktop, navegación activa, búsqueda, estilos, tema, refs y página independiente; no representan cobertura completa de todos los controles del kit. Los comandos de validación usan permisos para procesos nativos: la primera ejecución dentro del sandbox falló con EPERM y se repitió fuera de él.

Se regenera el catálogo desde los exports y tipos de src porque cambia la API pública. [Guía de migración](../generated/upgrade-guides/upgrade-v0.12.2-to-v0.12.3.md).

Recomendación SemVer por impacto: major, por retirar nombres públicos. Se publica 0.12.3 por instrucción expresa del usuario. Publicación prevista mediante el tag v0.12.3 y GitHub Actions con Trusted Publishing, verificado mediante el workflow exitoso de v0.12.2; no se usa npm login ni npm publish local.
