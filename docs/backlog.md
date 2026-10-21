# Backlog

Pendientes, deuda tecnica, riesgos e ideas del proyecto.

## Pendientes

- Completar backlog inicial del proyecto.

## Deuda tecnica

- 2026-10-20: remediar 8 vulnerabilidades (4 moderadas y 4 altas) de tooling y transitivas: @vitest/coverage-v8, @vitest/mocker, baseline-browser-mapping, nanoid, source-map-js, vite, vitest y ws. Comunicar cambios de Select.onChange, Ky y colecciones Zod antes de adoptar en consumidores; planificar esa validación y la adopción de Next con los parches de seguridad. [Evidencia](planes-ejecutados/2026-10-20-actualizar-peer-dependencies.md).
- 2026-10-20: tarea separada de tooling para migrar la configuración deprecated de Biome y evaluar @vitejs/plugin-react frente a SWC/esbuild en Vite 8. Sin cambios en esta actualización de peers.

- Revisar documentacion funcional y arquitectura vigente.
- Remediar vulnerabilidades de tooling reportadas por `npm install --package-lock-only` el `2026-09-14`: `18` totales, `10` moderadas y `8` altas. Requiere una tarea separada porque implica `devDependencies`/tooling fuera del alcance de actualización de peers.

- 2026-10-07: remediar 9 vulnerabilidades de tooling (4 moderadas, 5 altas) y revisar rangos dev/peer de TanStack. API Extractor fue eliminado. [Evidencia](planes-ejecutados/2026-10-07-actualizar-peer-dependencies.md).
