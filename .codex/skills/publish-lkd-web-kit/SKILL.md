---
name: publish-lkd-web-kit
description: Versiona y publica lkd-web-kit en npm mediante GitHub Actions y Trusted Publishing. Usar cuando el usuario pida subir la version del paquete, preparar un release, crear el tag vX.Y.Z, configurar el workflow de publicacion o publicar sin login interactivo del navegador.
---

# Publicar LKD Web Kit

## Principio

Publica solo desde un estado validado y reproducible. No automatices `npm login` en navegador. La ruta preferida es GitHub Actions con npm Trusted Publishing y `npm publish --provenance`.

Para actualizar dependencias antes del release, usa `$update-lkd-dependencies`.

## Preflight obligatorio

Antes de cambiar version o crear tags:

1. Lee `AGENTS.md`, `package.json`, `package-lock.json` y `docs/generated/lkd-web-kit.md`.
2. Ejecuta `git status --short` y confirma que el worktree esta limpio o que solo contiene cambios esperados para el release.
3. Verifica que `package.json` y `package-lock.json` declaran la misma version del paquete.
4. Revisa si existe `.github/workflows/publish.yml`.
5. Si Trusted Publishing no esta configurado en npm, lee `references/npm-trusted-publishing.md` y detente antes de publicar hasta que un maintainer/admin lo habilite.
6. Identifica la version anterior publicada/local y la version nueva objetivo; las necesitaras para la upgrade guide.

## Versionado SemVer cauteloso

Elige el bump por impacto publico:

- `major`: cambia compatibilidad publica, elimina APIs, altera contratos de componentes, o hace incompatible algun rango peer importante.
- `minor`: agrega soporte compatible, nuevos componentes, nuevas props compatibles o amplia peers sin romper consumers.
- `patch`: mantenimiento, fixes internos, ajustes de build o dependencia compatible sin impacto publico.

Si el usuario da una version exacta, usala solo si es SemVer valida y mayor que la version publicada/local.

Aplica la version sin crear tag automaticamente:

```bash
npm version <major|minor|patch> --no-git-tag-version
```

o:

```bash
npm version <x.y.z> --no-git-tag-version
```

## Validacion de release

Ejecuta siempre:

```bash
npm run lint
npm run test
npm run build
npm pack --dry-run
```

No continues si falla una validacion. Corrige el problema si esta dentro del alcance del release; si no, reporta el bloqueo.

## Upgrade guide obligatoria

Antes de crear el commit/tag de release, crea una guia de migracion para consumidores en:

```text
docs/generated/upgrade-guides/upgrade-v<version-anterior>-to-v<version-nueva>.md
```

Ejemplo:

```text
docs/generated/upgrade-guides/upgrade-v0.8.1-to-v0.9.0.md
```

La guia debe estar en espanol y contener un prompt listo para copiar y pegar en la IA del proyecto consumidor. Usa esta estructura:

```md
# Upgrade v<version-anterior> to v<version-nueva>

## Resumen

Describe en 2-4 bullets que cambia en `lkd-web-kit` y el riesgo esperado.

## Dependencias a actualizar

Lista exacta de paquetes y rangos/versiones requeridas:
- `lkd-web-kit`: `<version-nueva>`
- `<peer>`: `<rango-nuevo>`

Indica tambien peers que no cambian si son relevantes para evitar confusion.

## Cambios de API o comportamiento

Si hubo cambios de nombres, componentes, props, parametros, tipos, exports, hooks, utils o comportamiento, especifica:
- Antes: `...`
- Despues: `...`
- Accion requerida en consumidores: `...`

Si no hubo cambios de API publica, escribe explicitamente: `No hay cambios de API publica detectados.`

## Cambios requeridos por dependencias peer

Explica si las nuevas versiones de React, Mantine, Next, Zod, React Hook Form, TanStack, Ky u otros peers requieren cambios en los proyectos consumidores. Si no hay cambios esperados, declaralo explicitamente.

## Prompt para IA del proyecto consumidor

Incluye un prompt completo que instruya a la IA del proyecto consumidor a:
- Leer `package.json`, lockfile, `AGENTS.md` y documentacion local del proyecto.
- Actualizar `lkd-web-kit` y peers a los rangos indicados.
- Buscar imports/usos afectados con `rg`.
- Aplicar cambios de API descritos en esta guia.
- Ejecutar `npm install`, `npm run lint`, `npm run test` y `npm run build`.
- Reportar cambios aplicados, archivos modificados, validaciones y bloqueos.
```

Reglas:

- No inventes breaking changes. Si no hay cambios de nombres, parametros o props, dilo.
- Si `docs/generated/lkd-web-kit.md` cambio por superficie publica nueva, usa ese diff como fuente para la seccion de API.
- Si solo cambiaron peers, aun asi crea la guia y enfocate en dependencias y validaciones para consumidores.
- La guia forma parte del release y debe entrar en el mismo commit `release: vX.Y.Z`.

## Commit, tag y publicacion

1. Revisa el diff final y confirma que incluye la upgrade guide correspondiente y solo cambios esperados.
2. Crea un commit de release con el formato:

```bash
git commit -m "release: vX.Y.Z"
```

3. Crea el tag:

```bash
git tag vX.Y.Z
```

4. Empuja commit y tag solo cuando el usuario haya pedido publicar:

```bash
git push origin HEAD
git push origin vX.Y.Z
```

5. La publicacion debe ocurrir en GitHub Actions por el trigger del tag. No ejecutes `npm publish` localmente salvo instruccion explicita y consciente del usuario.

## Reporte final

Reporta en espanol:

- Version anterior y nueva.
- Tipo de bump y justificacion.
- Ruta de la upgrade guide generada.
- Validaciones ejecutadas.
- Commit/tag creados o pendientes.
- Estado del workflow de Trusted Publishing y si queda algun paso manual en npm.
