# npm Trusted Publishing para lkd-web-kit

Usa esta referencia cuando el usuario quiera publicar sin `npm login` interactivo o cuando falte `.github/workflows/publish.yml`.

## Configuracion esperada en npm

Un maintainer/admin del paquete debe configurar Trusted Publishing en npm con estos datos:

- Package: `lkd-web-kit`
- Provider: GitHub Actions
- Repository owner/name: `jrjais/lkd-web-kit`
- Workflow file: `publish.yml`
- Environment: dejar vacio salvo que el repo use environments protegidos

Si npm rechaza la configuracion por permisos, detenerse. No intentes automatizar el navegador ni pedir credenciales. Indica que debe hacerlo una cuenta con permisos de maintainer/admin sobre el paquete.

## Workflow recomendado

Crea `.github/workflows/publish.yml` si no existe:

```yaml
name: Publish

on:
  push:
    tags:
      - "v*.*.*"

permissions:
  contents: read
  id-token: write

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "22.x"
          registry-url: "https://registry.npmjs.org"

      - name: Install
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Test
        run: npm run test

      - name: Build
        run: npm run build

      - name: Pack dry run
        run: npm pack --dry-run

      - name: Publish
        run: npm publish --provenance
```

## Primer release

Antes de empujar el tag:

1. Confirma que el paquete existe en npm.
2. Confirma que Trusted Publishing esta configurado para el workflow exacto.
3. Confirma que `package.json` no necesita `publishConfig.access` especial. Para este paquete no scoped, normalmente no hace falta.
4. Empuja primero el commit de release y luego el tag `vX.Y.Z`.

## Fallback con token

Usa `NPM_TOKEN` solo si Trusted Publishing no es viable. Debe ser un automation token guardado como secreto de GitHub Actions. En ese caso:

- Mantener `permissions.contents: read`.
- Eliminar `id-token: write` si no se usa provenance por OIDC.
- Agregar `NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}` al paso `npm publish`.

No guardar tokens en `.npmrc`, `package.json`, logs, scripts ni archivos del repo.
