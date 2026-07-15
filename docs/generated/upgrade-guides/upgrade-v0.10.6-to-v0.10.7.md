# Upgrade v0.10.6 a v0.10.7

## Resumen

- Las skills publicas pasan a `src/distributed-skills`, que es el unico origen empaquetado e instalable.
- Las skills internas de `.agents/skills` dejan de incluirse en futuras instalaciones.
- El instalador no elimina skills que ya existan en los proyectos consumidores.

## Dependencias a actualizar

- `lkd-web-kit`: `0.10.7`
- Los peer dependencies no cambian en este release.

## Cambios de API o comportamiento

No hay cambios de API publica detectados.

El comando `lkd-install-agent-skills` ahora instala las skills incluidas en `src/distributed-skills`. Las skills internas no se agregan ni actualizan en consumidores; las copias existentes se conservan.

## Cambios requeridos por dependencias peer

No se esperan cambios en React, Mantine, Next, Zod, React Hook Form, TanStack ni Ky.

## Prompt para IA del proyecto consumidor

```text
Lee package.json, el lockfile, AGENTS.md y la documentacion local del proyecto. Actualiza lkd-web-kit a 0.10.7 y conserva los peer dependencies actuales. Busca con rg los usos de lkd-web-kit y de lkd-install-agent-skills. Ejecuta npm install y luego npx lkd-install-agent-skills. No elimines skills locales existentes: el instalador actualizado solo agrega o actualiza las skills publicas. Ejecuta npm run lint, npm run test y npm run build. Reporta los cambios aplicados, archivos modificados, validaciones y bloqueos.
```
