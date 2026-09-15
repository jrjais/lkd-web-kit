# Publicar lkd-web-kit 0.12.0

Estado: ejecutado.

Fecha: `2026-09-14`.

## Objetivo

Publicar `lkd-web-kit` 0.12.0 con el nuevo dashboard reusable, peers compatibles actualizados y una skill distribuida para su adopción.

## Decisiones

- Mantener el dashboard libre de autenticación, autorización, rutas, marca e iconos propios de una aplicación.
- Distribuir `lkd-web-dashboard-layout` antes del release para incluirla en el mismo tarball.
- Actualizar sólo peer dependencies compatibles; tooling y devDependencies quedan fuera.
- Publicar mediante el workflow existente de GitHub Actions y npm Trusted Publishing.

## Resultado y evidencia

- Peer dependencies actualizados: Mantine `^9.6.1`, React/React DOM `^19.3.0`, Next `^16.3.5`, Zod `^4.6.5`, React Hook Form `^7.88.0` y TanStack Virtual `^3.14.13`.
- Compatibilidad auditada con metadata pública de npm, la publicación oficial de React 19.3 y `npm diff` para Mantine, Next, Zod, React Hook Form y TanStack Virtual. No se detectaron cambios major, engines incompatibles ni migraciones requeridas en la API existente.
- Skill `lkd-web-dashboard-layout` validada con `quick_validate.py` e instalada correctamente junto con las otras seis skills en un directorio temporal.
- `npm run lint`: correcto, con un aviso informativo preexistente sobre la futura migración de la configuración de Biome.
- `npm run test`: correcto, 8 pruebas y 100 % de statements, funciones y líneas; 82,6 % de branches.
- `npm run build`: correcto, con ESM, CJS y declaraciones.
- `npm pack --dry-run --json`: correcto; 168 entradas, incluidos los componentes Dashboard, tipos, instalador y la nueva skill.
- La instalación informó 18 vulnerabilidades transitivas de tooling, registradas en backlog y fuera del alcance aprobado de peers.

La publicación se ejecuta con el commit `release: v0.12.0`, el tag `v0.12.0` y el workflow `Publish`; su resultado externo se verifica antes de actualizar consumidores.
