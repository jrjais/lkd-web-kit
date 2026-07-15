# Upgrade v0.10.5 a v0.10.6

## Resumen

- Se incorpora la skill `create-nextjs-page` al paquete publicado.
- No hay cambios de API publica en los componentes o utilidades de `lkd-web-kit`.
- El riesgo para consumidores es bajo: solo se agregan instrucciones de trabajo para agentes.

## Dependencias a actualizar

- `lkd-web-kit`: `0.10.6`
- Los peer dependencies no cambian en este release.

## Cambios de API o comportamiento

No hay cambios de API publica detectados.

## Cambios requeridos por dependencias peer

No se esperan cambios en los proyectos consumidores: los peer dependencies de React, Mantine, Next, Zod, React Hook Form, TanStack y Ky no cambian.

## Prompt para IA del proyecto consumidor

```text
Lee package.json, el lockfile, AGENTS.md y la documentacion local del proyecto. Actualiza lkd-web-kit a 0.10.6 y conserva los peer dependencies actuales. Busca con rg los imports y usos potencialmente afectados de lkd-web-kit; no hay cambios de API publica esperados. Ejecuta npm install, npm run lint, npm run test y npm run build. Reporta los cambios aplicados, archivos modificados, validaciones y cualquier bloqueo.
```