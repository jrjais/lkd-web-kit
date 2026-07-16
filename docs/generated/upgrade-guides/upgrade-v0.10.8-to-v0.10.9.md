# Upgrade v0.10.8 to v0.10.9

## Resumen

- Se corrige el nombre de la skill publica de formularios para evitar redundancia.
- El cambio afecta solo a skills distribuidas; no hay cambios en componentes, hooks, tipos ni peers.

## Dependencias a actualizar

- `lkd-web-kit`: `0.10.9`
- Los peer dependencies no cambian en este release.

## Cambios de API o comportamiento

No hay cambios de API publica de componentes, hooks, tipos ni utilidades detectados.

Cambio en skills distribuidas:
- Antes: `lkd-rhf-lkd-forms`.
- Despues: `lkd-rhf-forms`.
- Accion requerida en consumidores: ejecutar `npx lkd-install-agent-skills` y eliminar la carpeta antigua `lkd-rhf-lkd-forms` si existe.

## Cambios requeridos por dependencias peer

No se esperan cambios en React, Mantine, Next, Zod, React Hook Form, TanStack ni Ky.

## Prompt para IA del proyecto consumidor

```text
Lee package.json, package-lock.json, AGENTS.md y la documentacion local del proyecto. Actualiza lkd-web-kit a 0.10.9 sin cambiar peers. Ejecuta npm install y luego npx lkd-install-agent-skills. Verifica que .agents/skills contenga lkd-rhf-forms y no contenga lkd-rhf-lkd-forms. Ejecuta la verificacion focalizada mas cercana al cambio y reporta archivos modificados, validaciones y bloqueos.
```