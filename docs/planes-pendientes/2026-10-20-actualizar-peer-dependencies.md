# Actualizar peers de lkd-web-kit

- Fecha: 2026-10-20.
- Skill: `.agents/skills/update-lkd-dependencies/SKILL.md`.
- Alcance: auditar las 16 peerDependencies y aplicar versiones estables patch/minor compatibles; sincronizar lockfile e instalación para comprobar el paquete.
- Dependencias: registry npm y changelogs oficiales; Node actual 24.14.0, mínimo público conservado >=22.12.0.
- Riesgos: tipos heredados de Mantine Select; normalización y validación de opciones en Ky; validación anticipada de colecciones en Zod; diferencias entre mínimos peer y resolución dev de TanStack.
- Fuera de alcance: actualizar rangos dev/tooling, versión del kit, publicación npm, consumidores, tags, ramas, commits o push.
- Criterios: peers alineados y compatibles; lint, tests, build y pack dry-run aprobados; registro de mejoras y riesgos para consumidores.
- Estado: completado localmente. Peers y lockfile actualizados, instalación exacta, lint, 8 tests, build y pack dry-run aprobados. [Evidencia y riesgos restantes](../planes-ejecutados/2026-10-20-actualizar-peer-dependencies.md). Sin publicación ni prueba en aplicación consumidora.
