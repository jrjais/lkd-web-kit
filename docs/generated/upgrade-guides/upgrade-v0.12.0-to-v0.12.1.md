# Upgrade v0.12.0 to v0.12.1

## Resumen

- Actualización de peers estables compatibles.
- Tipos generados por módulo con vite-plugin-dts, sin API Extractor adicional.
- No hay cambios de API pública detectados.

## Dependencias a actualizar

- lkd-web-kit: 0.12.1
- @mantine/core, @mantine/dates, @mantine/hooks, @mantine/notifications: ^9.7.1
- @tanstack/react-query: ^5.104.1
- @tanstack/react-table: ^9.2.6
- next: ^16.4.0
- react-hook-form: ^7.89.0
- react-query-kit: ^3.4.0

Peers sin cambios: react/react-dom ^19.3.0, @tanstack/react-virtual ^3.14.13, clsx ^2.1.1, dayjs ^1.11.23, ky ^2.1.0 y zod ^4.6.5.

## Cambios de API o comportamiento

No hay cambios de API pública detectados. Antes: consolidación opcional de declaraciones en un único archivo. Después: declaraciones por módulo, con la misma entrada dist/index.d.ts. Acción requerida: ninguna en imports públicos.

## Cambios requeridos por dependencias peer

Actualizar conjuntamente React/React DOM y la familia Mantine. Tooltip ahora se oculta cuando su target queda detached; MyTable hereda ese comportamiento. MyNotifications hereda withAutoCloseProgress. No se detectaron migraciones adicionales en los usos del kit.

Consumidores anteriores a 0.11.0 deben aplicar también la guía de TanStack Table v9: createColumnHelper<MyTableFeatures, Row>(), columnas mediante helper.columns([...]) y posiciones lógicas start/end.

## Prompt para IA del proyecto consumidor

Lee AGENTS.md, package.json, lockfile y documentación local. Actualiza lkd-web-kit a 0.12.1 y los peers a los rangos anteriores; alinea toda la familia Mantine. Busca imports y usos afectados con rg. Si partes de 0.10.12, aplica además upgrade-v0.10.12-to-v0.11.0.md y las guías posteriores. Conserva las APIs públicas y adapta columnas TanStack cuando corresponda. Ejecuta npm install, npx lkd-install-agent-skills, npm run lint, npm run test y npm run build. Actualiza la documentación local del kit. Reporta archivos, validaciones y bloqueos.
