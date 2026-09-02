# Actualizar peerDependencies de lkd-web-kit

Estado: ejecutado.

Fecha: `2026-09-02`.

## Objetivo

Actualizar con cautela las `peerDependencies` de `lkd-web-kit` a las últimas versiones estables compatibles, sin publicar, sin crear tag y sin cambiar la versión del paquete.

## Resultado

Se actualizaron los peers compatibles de Mantine, TanStack, Dayjs, Ky, Next, React Hook Form y Zod. Se mantuvieron sin cambios React, React DOM, `clsx` y `react-query-kit` porque ya estaban en la versión estable actual o no tenían actualización publicada.

También se ajustó `vite.config.ts` para importar `package.json` como default y luego desestructurar `dependencies` y `peerDependencies`; el loader de Vite/Rolldown ya no acepta esos imports nombrados desde JSON.

## Auditoría de cambios

- Mantine `9.6.0`: agrega opciones nuevas en Notifications (`renderNotification`, `layout="stacked"`) y componentes/props nuevos. `MyNotifications` extiende `NotificationsProps` y propaga props, por lo que no necesita cambio. La nota de Node.js 22 afecta al entorno de desarrollo y el paquete ya declara `>=22.12.0`.
- TanStack Query `5.102.8`: contiene cambios menores/parches dentro de v5. `lkd-web-kit` usa principalmente tipos `InfiniteData`, por lo que no requiere migración.
- TanStack Table `9.2.4`: los cambios desde `9.0.1` son parches/dependencias del core. El salto mayor a v9 ya estaba aplicado antes de esta tarea; no aparece una migración nueva para el uso actual de `MyTable`.
- TanStack Virtual `3.14.10`: parche de dependencia del core. `InfinitySelect` y `virtual-styles` no usan las APIs nuevas de `directDomUpdates`, así que no requieren cambio.
- Dayjs `1.11.23`: parches del plugin `timezone`; el kit usa formateo core en `date-format.ts`, sin migración.
- Ky `2.1.0`: endurece/precisa `HTTPError.data`, agrega `NetworkError`/helpers documentados y vuelve readonly `HTTPError.options`. `addBodyJsonHook` no muta `options`, así que no requiere cambio.
- Next `16.3.4`: el diff público relevante para el kit es actualización de `@next/env`, SWC y `sharp`. Los imports usados (`next/link`, `next/navigation`) no cambiaron en los tipos revisados.
- React Hook Form `7.87.0`: agrega `trigger(..., { shouldTouch })`, `getErrors` en `UseFormReturn`, correcciones de Controller y de resolución `react-server` en Next. Los wrappers actuales siguen compilando sin cambios.
- Zod `4.5.4`: agrega `zod/compile` y ajustes internos de parseo/memoización/defaults. Los helpers del kit usan `ZodType`, `safeParse`, `z.NEVER` y `z.config`, que siguen compatibles.

## Verificación

- `node .agents/skills/update-lkd-dependencies/scripts/collect-npm-metadata.mjs`: metadata consultada con npm.
- `npm install --package-lock-only`: lockfile sincronizado.
- `npm run lint`: correcto; mantiene una nota informativa preexistente de Biome sobre `recommended`.
- `npm run test`: correcto; no hay archivos de test y aplica `--passWithNoTests`.
- `npm run build`: correcto.
- `npm pack --dry-run`: correcto; tarball `lkd-web-kit-0.11.0.tgz`, `161` archivos, `58.3 kB`.

## Riesgos y pendientes

- No se regeneró `docs/generated/lkd-web-kit.md` porque no cambió la superficie pública de componentes, props, formularios, hooks ni utilidades.
- `npm audit --json` informa `14` vulnerabilidades en tooling/transitivas: `6` moderadas y `8` altas. Se registró como deuda separada porque corregirlas requiere tocar `devDependencies`/tooling, fuera del alcance de esta skill.
- Recomendación SemVer para publicar: `minor`, porque se elevan pisos de peers aunque no cambie la API pública.
