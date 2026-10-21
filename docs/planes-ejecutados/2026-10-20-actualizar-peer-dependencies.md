# Auditoría y actualización de peers

- Fecha: 2026-10-20.
- Skill: [update-lkd-dependencies](../../.agents/skills/update-lkd-dependencies/SKILL.md).
- Alcance: peers, lockfile y validación del kit; sin actualizar rangos dev ni versión 0.12.1. Rama actual main conservada por instrucción del usuario; sin commits, tags, publicación ni push.
- [Plan y aceptación](../planes-pendientes/2026-10-20-actualizar-peer-dependencies.md).

## Versiones seleccionadas

| Familia | Piso anterior | Piso nuevo |
| --- | --- | --- |
| Mantine core/dates/hooks/notifications | 9.7.1 | 9.7.3 |
| TanStack Query | 5.104.1 | 5.104.5 |
| TanStack Table | 9.2.6 | 9.3.1 |
| TanStack Virtual | 3.14.13 | 3.14.21 |
| Ky | 2.1.0 | 2.2.0 |
| Next | 16.4.0 | 16.4.2 |
| React / React DOM | 19.3.0 | 19.3.1 |
| React Hook Form | 7.89.0 | 7.90.0 |
| Zod | 4.6.5 | 4.6.7 |

Se conserva el prefijo caret. clsx 2.1.1, dayjs 1.11.23 y react-query-kit 3.4.0 ya son las versiones estables latest consultadas en npm. Node mínimo >=22.12.0 conservado; los peers consultados no lo elevan.

## Breaking changes, tipos y mejoras

- **Mantine:** [9.7.2](https://github.com/mantinedev/mantine/releases/tag/9.7.2) y [9.7.3](https://github.com/mantinedev/mantine/releases/tag/9.7.3). Corrigen readOnly en MultiSelect, Radio, Chip y Switch, eventos tras desmontaje y focus trap. El segundo argumento de Select.onChange ahora admite null; los wrappers MySelect/FormSelect heredan el tipo corregido. Consumidores con callbacks que asumían un option siempre definido deben revisar ese caso. ScrollArea agrega una variable CSS de offset. Props heredadas ya exponen las capacidades; sin nuevo wrapper.
- **React:** [19.3.1](https://github.com/react/react/releases/tag/v19.3.1) mejora el protocolo de transporte RSC. React y React DOM se mantienen alineados; el kit no implementa ese protocolo.
- **Next:** [16.4.1](https://github.com/vercel/next.js/releases/tag/v16.4.1) incluye correcciones de seguridad para use cache, imágenes SVG y Server Actions; [16.4.2](https://github.com/vercel/next.js/releases/tag/v16.4.2) corrige Turbopack y resolución de módulos. Los imports next/navigation y next/link del kit no requieren migración. Esta tarea no actualiza Next en los consumidores.
- **React Hook Form:** [7.90.0](https://github.com/react-hook-form/react-hook-form/releases/tag/v7.90.0) corrige Controller tras reset, referencias de errors, useWatch con Activity, useFieldArray e inputs editados antes de estar listo. Mejora suscripciones, watch, dirty tracking y tamaño del bundle. Los wrappers usan Controller, FormProvider y métodos públicos que reciben esos arreglos sin cambios propios.
- **Ky:** [2.2.0](https://github.com/sindresorhus/ky/releases/tag/v2.2.0) normaliza headers de hooks init a minúsculas, valida opciones inválidas con TypeError y ejecuta beforeError ante errores de lectura del body. addBodyJsonHook usa isHTTPError y devuelve los demás errores intactos, compatible con NetworkError/ResponseSizeError. No hay hooks init del kit afectados. Nuevas opciones maxResponseSize y ajustes por intento desde beforeRetry quedan disponibles directamente en Ky, sin necesidad de un wrapper nuevo.
- **TanStack Query:** [5.104.5](https://github.com/TanStack/query/releases/tag/@tanstack%2Freact-query@5.104.5) corrige recomputación de useMutationState/useIsMutating. Fallback adicional `npm diff` 5.104.1→5.104.5 para todos los cambios acumulados: implementación de snapshots y documentación/tipos. Los tipos de InfiniteData usados por el kit conservan su contrato.
- **TanStack Table:** [9.3.1](https://github.com/TanStack/table/releases/tag/@tanstack%2Freact-table@9.3.1) evita contexto AppTable desactualizado con componentes cacheados. Diff npm 9.2.6→9.3.1 revisado: suscripciones del contexto y memoización interna; MyTable usa useTable y features públicas, sin adopción de AppTable.
- **TanStack Virtual:** [3.14.21](https://github.com/TanStack/virtual/releases/tag/@tanstack%2Freact-virtual@3.14.21) actualiza virtual-core a 3.19.6. Diff npm 3.14.13→3.14.21 revisado: corrige posicionamiento directo cuando los refs de filas/contenedor se montan por separado. InfinitySelect usa useVirtualizer con sus helpers de estilos existentes; no se cambia a posicionamiento directo en esta tarea.
- **Zod:** las notas de [4.6.6](https://github.com/colinhacks/zod/releases/tag/v4.6.6) y [4.6.7](https://github.com/colinhacks/zod/releases/tag/v4.6.7) solo identifican commits; se usó `npm diff` 4.6.5→4.6.7. Las colecciones que exceden max/length se rechazan antes de validar elementos y refinamientos posteriores, reduciendo trabajo y cambiando los errores disponibles en esos casos. Se corrige circularidad de tipos de z.record/z.json en TypeScript 7.1. El kit no define esas colecciones limitadas; zodValidator conserva su política de devolver el primer error. Revisar esquemas consumidores que dependan de refinamientos con efectos secundarios o errores por elemento en colecciones sobredimensionadas.

No se detectó una migración obligatoria en componentes del kit. Los cambios de comportamiento anteriores deben comunicarse a consumidores, aunque se publiquen en versiones patch/minor de upstream.

## Resolución e instalación

- Antes de empezar, lockfile e instalación tenían Table 9.0.1 y Virtual 3.13.24, inferiores al piso peer ya declarado.
- `npm install --package-lock-only --ignore-scripts` sincroniza los peers. `npm update @tanstack/react-table @tanstack/react-virtual --package-lock-only --ignore-scripts` alinea esas dos resoluciones sin editar devDependencies.
- Instalación exacta mediante `npm ci --ignore-scripts` aprobada: 334 paquetes instalados. Los scripts de terceros no se ejecutaron.
- `npm ls --depth=0` aprobado sin peers inválidos. Informa un `@img/sharp-wasm32` extraneous local tras ci; no forma parte del paquete del kit ni se añadió a sus manifests.
- `npm audit` informa 8 vulnerabilidades (4 moderadas, 4 altas): @vitest/coverage-v8, @vitest/mocker, baseline-browser-mapping, nanoid, source-map-js, vite, vitest y ws. Incluye tooling y transitivas; no se afirma que sean todas exclusivas de desarrollo. Remediación separada, sin audit fix.

## Validación final

- `npm run lint`: aprobado, 101 archivos. Aviso preexistente: recommended de Biome deprecado; no se migra tooling en esta tarea.
- `npm run test`: 8/8 pruebas aprobadas. Son las pruebas existentes de DashboardLayout y sus integraciones; no equivalen a cobertura de todos los formularios, tablas o escenarios de consumidores.
- `npm run build`: aprobado con TypeScript y generación de declaraciones ESM/CJS. Avisos preexistentes: plugin SWC recomienda plugin-react y usa opción esbuild deprecada en Vite 8.
- `npm pack --dry-run --json`: aprobado, 355 archivos y 79.780 bytes; contiene dist/index.d.ts y el instalador de skills. No genera publicación.
- Comprobación contra HEAD: versión 0.12.1, devDependencies y dependencies sin cambios. Lockfile refleja peers nuevos y transitivas necesarias de TanStack; no se actualizó tooling general.
- `git diff --check`: aprobado.
- Resultado: actualización local completada. Sin commits, staging, push, tags ni publicación; aestrenar-web no se modifica en esta iniciativa y no se valida como consumidor.

## Publicación futura

Recomendación **minor** por elevar los mínimos soportados de peers. No se cambia la versión del kit ni su API propia. El catálogo generado no necesita regeneración porque no cambian exports, props propias ni wrappers; se actualiza únicamente la referencia mecánica de versión Mantine.
