# Upgrade v0.10.7 to v0.10.8

## Resumen

- Las skills publicas distribuidas ahora usan prefijo `lkd-` para evitar colisiones con skills locales de los proyectos consumidores.
- Se agrega la skill publica `lkd-layout-mantine-tailwind` para maquetar UI con componentes Layout de Mantine y clases Tailwind.
- El instalador `lkd-install-agent-skills` sigue copiando desde `src/distributed-skills`; las skills antiguas sin prefijo deben eliminarse manualmente si se quiere evitar duplicados.

## Dependencias a actualizar

- `lkd-web-kit`: `0.10.8`
- Los peer dependencies no cambian en este release.

## Cambios de API o comportamiento

No hay cambios de API publica de componentes, hooks, tipos ni utilidades detectados.

Cambio en skills distribuidas:
- Antes: `create-modal-component`, `create-nextjs-page`, `create-svg-icon`, `create-table-component`, `rhf-lkd-forms`.
- Despues: `lkd-create-modal-component`, `lkd-create-nextjs-page`, `lkd-create-svg-icon`, `lkd-create-table-component`, `lkd-rhf-lkd-forms`.
- Nuevo: `lkd-layout-mantine-tailwind`.
- Accion requerida en consumidores: ejecutar `npx lkd-install-agent-skills` y eliminar las carpetas antiguas sin prefijo si no deben convivir con las nuevas.

## Cambios requeridos por dependencias peer

No se esperan cambios en React, Mantine, Next, Zod, React Hook Form, TanStack ni Ky.

## Prompt para IA del proyecto consumidor

```text
Lee package.json, package-lock.json, AGENTS.md y la documentacion local del proyecto. Actualiza lkd-web-kit a 0.10.8 sin cambiar peers. Ejecuta npm install y luego npx lkd-install-agent-skills. Verifica que .agents/skills contenga las skills con prefijo lkd-: lkd-create-modal-component, lkd-create-nextjs-page, lkd-create-svg-icon, lkd-create-table-component, lkd-rhf-lkd-forms y lkd-layout-mantine-tailwind. Elimina las carpetas antiguas sin prefijo solo si fueron reemplazadas por las nuevas distribuidas. Ejecuta npm run lint, npm run test y npm run build segun el riesgo del proyecto. Reporta cambios aplicados, archivos modificados, validaciones y bloqueos.
```