# Actualización de peerDependencies

Fecha: 2026-10-07. Estado: ejecutado.

Skills: update-lkd-dependencies y ponytail. Versión 0.12.0 conservada; rama main. Cambio local ajeno de la skill de tablas preservado.

| Peer | Anterior | Nuevo |
| --- | --- | --- |
| @mantine/core, dates, hooks, notifications | ^9.6.1 | ^9.7.1 |
| @tanstack/react-query | ^5.102.8 | ^5.104.1 |
| @tanstack/react-table | ^9.2.4 | ^9.2.6 |
| next | ^16.3.5 | ^16.4.0 |
| react-hook-form | ^7.88.0 | ^7.89.0 |
| react-query-kit | ^3.3.4 | ^3.4.0 |

Retenidos por estar en la última estable consultada: React/React DOM, React Virtual, clsx, Dayjs, Ky y Zod. Peers y engines compatibles con Node >=22.12.0.

## Auditoría y compatibilidad

Metadata consultada con el script de la skill. El primer intento falló con spawn EPERM; la ejecución autorizada funcionó.

- [Mantine 9.7](https://mantine.dev/changelog/9-7-0/): nuevos Tour/Toolbar/Toggle y variantes light. Notifications agrega progreso de autocierre, heredado por MyNotifications sin adaptación. Tooltip ahora oculta targets detached, también en el ordenamiento de MyTable. HoverCard y ActionBar cambian comportamiento pero no se usan en el kit. AppShell resize es opcional y no se activa. npm diff cubrió los cuatro paquetes hasta 9.7.1.
- [Next 16.4](https://github.com/vercel/next.js/releases/tag/v16.4.0): navegación, prefetch y compilación. npm diff de link.d.ts/navigation.d.ts no mostró cambios; imports del kit compatibles.
- [React Hook Form 7.89](https://github.com/react-hook-form/react-hook-form/releases/tag/v7.89.0): correcciones de Controller, validación, reset, touched y errores diferidos. Diff de tipos agrega campo interno opcional _c; wrappers compatibles.
- TanStack Query/Table y React Query Kit: páginas de releases no disponibles; fallback npm diff de paquetes y tipos. Table exporta tipos App adicionales; Query amplía documentación y tipos internos. React Query Kit agrega Register.strictVariables opt-in; InfiniteQueryHookResult sigue compatible. Los usos reales compilaron sin migración.

No se modificaron componentes ni se regeneró el catálogo porque la API propia permanece igual. Recomendación SemVer para publicación futura: minor por elevar pisos de peers; no se cambió la versión del kit.

## Generación de tipos sin dependencias adicionales

A pedido del usuario se retiró API Extractor de package.json, lockfile e instalación. Se reemplazó dts({ bundleTypes: true }) por dts() en vite.config.ts. Las declaraciones se generan por módulo y dist/index.d.ts conserva la entrada pública. La consolidación en un único archivo no es necesaria. La declaración explícita del extractor aplicada inicialmente quedó descartada.

Se instalaron temporalmente mínimos TanStack sin guardar para comprobar compatibilidad de tipos. Después se reinstaló el lockfile y se repitieron tests/build; rangos dev de TanStack conservados.

## Validación

- npm install --package-lock-only: correcto.
- npm ci --ignore-scripts: instalación comprobada durante la actualización; npm install --ignore-scripts final eliminó el extractor y sus 51 paquetes.
- npm run lint: correcto, 101 archivos; nota preexistente de Biome recommended deprecado.
- npm run test: 8 tests correctos, también con tooling del lockfile.
- npm run build final sin extractor: correcto, declaraciones por módulo. Solo aviso preexistente de SWC/esbuild.
- npm pack --dry-run --json: correcto.
- Instalación final sin extractor: 9 vulnerabilidades, 4 moderadas y 5 altas; remediación separada pendiente.

Sin publicación, tags ni push.

- Verificación con TypeScript: 160 exports públicos coinciden con src y 258 referencias de declaraciones resuelven sin aliases privados src/.
- npm pack --dry-run: 355 archivos, 79785 bytes; incluye dist/index.d.ts.

