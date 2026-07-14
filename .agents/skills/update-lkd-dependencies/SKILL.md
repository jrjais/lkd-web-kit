---
name: update-lkd-dependencies
description: Audita y actualiza con cautela solo las peerDependencies de lkd-web-kit. Usar cuando el usuario pida revisar versiones disponibles, actualizar peers del paquete, evaluar breaking changes de React/Mantine/Next/Zod/React Hook Form/TanStack/Ky, sincronizar package-lock o preparar una recomendacion SemVer sin publicar.
---

# Actualizar dependencias LKD

## Principio

Trabaja como auditor de compatibilidad de una libreria React corporativa. No actualices a ciegas: primero descubre versiones, peers, engines y riesgos; despues edita de forma acotada y valida el paquete.

Esta skill no sube la version de `lkd-web-kit`, no crea tags y no publica en npm. Para publicar usa `$publish-lkd-web-kit`.

Esta skill es solo para `peerDependencies`. No actualices `devDependencies`, `dependencies` ni tooling interno salvo que sea estrictamente necesario para que el lockfile resuelva los peers actualizados y el usuario lo haya pedido.

## Contexto obligatorio

Antes de proponer o editar dependencias, lee:

- `AGENTS.md`
- `package.json`
- `package-lock.json`
- `docs/generated/lkd-web-kit.md`

Usa `docs/generated/lkd-web-kit.md` como fuente de verdad del catalogo publico de componentes. Si un cambio de dependencia puede afectar props, wrappers Mantine, formularios o hooks publicos, tratalo como riesgo de compatibilidad.

## Auditoria de versiones

1. Identifica todas las entradas de `peerDependencies`.
2. Consulta metadata de npm para cada paquete relevante:

```bash
npm view <pkg> version peerDependencies dependencies engines --json
```

3. Para un reporte inicial no mutante, puedes ejecutar:

```bash
node .agents/skills/update-lkd-dependencies/scripts/collect-npm-metadata.mjs
```

4. Actualiza solo a versiones estables publicadas. Evita prereleases, canary, alpha, beta, rc y next salvo instruccion explicita.
5. Mantiene alineadas familias peer que deben avanzar juntas: `react`/`react-dom`, paquetes `@mantine/*` y paquetes `@tanstack/*` cuando compartan contrato.

## Politica de riesgo

Detente y reporta antes de aplicar si encuentras:

- Cambio major en React, Mantine, Next, Zod, React Hook Form, TanStack Query o Ky.
- Cambio de `engines.node` que exceda el `>=22.12.0` actual o reduzca compatibilidad razonable.
- Peer ranges incompatibles entre dependencias del kit.
- Migraciones que obliguen a cambiar APIs publicas, props exportadas, tipos o comportamiento de componentes.

Puedes aplicar patch/minor compatibles cuando las pruebas y peers lo respalden. Para majors, aplica solo si el usuario pidio explicitamente aceptar el breaking change o si el analisis demuestra que el rango actual ya era incompatible.

Si por un breaking change tuviste que modificar props, componentes, formularios, hooks exportados o utilidades documentadas, regenera `docs/generated/lkd-web-kit.md` siguiendo estrictamente `docs/generate-lkd-web-kit-docs.md`. No edites el documento generado a mano salvo correcciones mecanicas posteriores al diff.

## Edicion y validacion

Cuando edites:

- Actualiza solo `peerDependencies` en `package.json` y sincroniza `package-lock.json`.
- Corrige drift de version entre `package.json` y `package-lock.json`; en este repo se ha visto `package.json` en `0.8.4` y lockfile en `0.8.3`.
- No cambies `version` del paquete salvo que el usuario lo pida explicitamente fuera de esta skill.
- No ejecutes `npm publish`, no crees tags y no automatices login.

Validacion minima:

```bash
npm install --package-lock-only
npm run lint
npm run test
npm run build
npm pack --dry-run
```

Si una validacion falla, arregla solo lo necesario para la actualizacion o reporta el bloqueo con el paquete responsable.

## Reporte final

Termina siempre con un resumen en espanol:

- Peer dependencies actualizadas.
- Peer dependencies retenidas y motivo.
- Breaking changes o riesgos detectados.
- Si se regenero `docs/generated/lkd-web-kit.md`, indica por que cambio la superficie publica.
- Validaciones ejecutadas y resultado.
- Recomendacion SemVer para una futura publicacion: `major`, `minor` o `patch`, con una frase de justificacion.
