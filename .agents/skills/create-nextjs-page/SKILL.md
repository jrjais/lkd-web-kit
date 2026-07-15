---
name: create-nextjs-page
description: Crear o refactorizar paginas de Next.js App Router manteniendo app limpio y delegando la UI a componentes de pagina en src/components/pages. Usar cuando Codex deba crear page.tsx, mover UI fuera de app, organizar subcomponentes privados de una pagina, envolver paginas con PageProviders o normalizar nombres/rutas de componentes Page en proyectos que consumen lkd-web-kit.
---

# Create Next.js Page

Usar este skill para crear o refactorizar paginas de Next.js App Router en proyectos que usan `lkd-web-kit`.

## Lectura obligatoria

1. Leer la documentacion relevante de Next.js antes de tocar rutas. Si existe `node_modules/next/dist/docs/`, usarla como fuente local.
2. Leer la documentacion local del proyecto sobre `lkd-web-kit`, componentes compartidos y patrones de UI si existe.
3. Revisar una pagina cercana antes de editar para respetar imports, providers, carga de datos, traducciones y convenciones del proyecto.

## Regla principal

- Mantener `app` como capa de routing de Next.js.
- En `app`, dejar solo `layout.tsx`, `page.tsx` y archivos especiales de Next.js cuando correspondan: `not-found.tsx`, `loading.tsx`, `error.tsx`, `route.ts`, `template.tsx`, `default.tsx` o metadata files.
- No colocar vistas, subcomponentes, hooks privados, helpers de UI, schemas, columnas de tabla ni componentes de pagina dentro de `app`.
- Colocar la UI real de cada ruta en `src/components/pages`.

## Estructura de pagina

Para una pagina simple:

```txt
src/app/[locale]/(app-layout)/development/page.tsx
src/components/pages/app/DevelopmentPage.tsx
```

Para una pagina con subcomponentes privados:

```txt
src/app/[locale]/(app-layout)/development/page.tsx
src/components/pages/app/DevelopmentPage/index.tsx
src/components/pages/app/DevelopmentPage/Header.tsx
src/components/pages/app/DevelopmentPage/helpers.ts
```

- Usar archivo plano `{PageName}Page.tsx` si el componente es de una pieza.
- Usar carpeta `{PageName}Page/index.tsx` si hay subcomponentes, helpers, schemas o piezas privadas.
- Mantener dentro de esa carpeta solo lo privado de esa pagina.
- Mover a componentes compartidos solo cuando exista reutilizacion real.

## PageProviders

Cada `page.tsx` debe retornar el componente Page envuelto con `PageProviders`.

```tsx
import PageProviders from "src/app/PageProviders";
import DevelopmentPage from "src/components/pages/app/DevelopmentPage";

const Page = async () => {
  return (
    <PageProviders>
      <DevelopmentPage />
    </PageProviders>
  );
};

export default Page;
```

- Usar el import real de `PageProviders` del proyecto si difiere del ejemplo.
- Pasar a `PageProviders` solo las props que existan y sean necesarias en ese proyecto.
- Mantener en `page.tsx` solo responsabilidades de entrypoint: params, metadata, fetch server-side, redirects/notFound y providers.
- No duplicar providers dentro del componente de pagina salvo que el proyecto tenga una razon documentada.

## Mapeo de area

Derivar `{area}` desde el route group principal cuando exista:

- `(app-layout)` -> `app`
- `(admin-layout)` -> `admin`
- `(home-layout)` -> `home`
- `(developer-layout)` -> `developer`
- `(agency-layout)` -> `agency`

Regla general:

- Si el route group termina en `-layout`, quitar ese sufijo.
- Si no termina en `-layout`, usar el nombre limpio del group sin parentesis.
- Si no hay route group claro, usar el primer segmento estable de la ruta.
- Ignorar `[locale]`, route groups y segmentos dinamicos para elegir el area.

## Nombres

- Usar PascalCase y sufijo `Page`.
- Para rutas estaticas, usar el ultimo segmento estable: `(app-layout)/development/page.tsx` -> `DevelopmentPage`.
- Para rutas dinamicas, usar el ultimo segmento estatico util y agregar `DetailPage`: `development/[development_slug]/page.tsx` -> `DevelopmentDetailPage`.
- Para rutas dinamicas anidadas, preferir el ultimo segmento estatico util: `development/[development_slug]/property/[property_slug]` -> `PropertyDetailPage`.
- Si el nombre colisiona o pierde contexto, anteponer el segmento padre: `DevelopmentPropertyDetailPage`.
- No incluir nombres de route groups, `[locale]` ni nombres de parametros como `Slug` salvo que haga falta para evitar ambiguedad real.

## Checklist

- `app` queda limpio y sin UI privada.
- `page.tsx` importa un componente desde `src/components/pages/{area}`.
- `page.tsx` envuelve siempre con `PageProviders`.
- Las props de `PageProviders` corresponden al proyecto actual, no a otro consumidor.
- El componente de pagina no usa `any`.
- Los subcomponentes privados viven junto a la pagina, no en `app`.
- Se ejecuta una verificacion focalizada cuando el cambio toca codigo de aplicacion.
